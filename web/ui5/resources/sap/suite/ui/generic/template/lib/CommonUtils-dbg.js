sap.ui.define(["sap/ui/base/Object", "sap/ui/Device", "sap/ui/model/json/JSONModel",
		"sap/ui/comp/smarttable/SmartTable", "sap/ui/table/Table", "sap/m/Table", "sap/m/ListBase",
		"sap/ui/generic/app/navigation/service/NavigationHandler", "sap/suite/ui/generic/template/lib/MessageUtils"], function(BaseObject, Device, JSONModel, SmartTable,
		UiTable, ResponsiveTable, ListBase, NavigationHandler, MessageUtils) {
	"use strict";

	var sContentDensityClass = (function() {
		var sCozyClass = "sapUiSizeCozy", sCompactClass = "sapUiSizeCompact", oBody = jQuery(document.body);
		if (oBody.hasClass(sCozyClass) || oBody.hasClass(sCompactClass)) { // density class is already set by the FLP
			return "";
		} else {
			return Device.support.touch ? sCozyClass : sCompactClass;
		}
	}());

	function getNavigationProperty(oPageEntries, sEntitySet) {
		for (var i in oPageEntries) {
			var oEntry = oPageEntries[i];
			if (oEntry.entitySet === sEntitySet && oEntry.component.list && oEntry.navigationProperty) {
				return oEntry.navigationProperty;
			} else if (oEntry.pages) {
				var result = getNavigationProperty(oEntry.pages, sEntitySet);
				if (result) {
					return result;
				}
			}
		}
	}

	function getMethods(oController, oServices) {

		var oNavigationHandler; // initialized on demand

		// defines a dependency from oControl to the view
		function fnAttachControlToView(oControl) {
			var oView = oController.getView();
			jQuery.sap.syncStyleClass(sContentDensityClass, oView, oControl);
			oView.addDependent(oControl);
		}

		// See documentation of
		// sap.suite.ui.generic.template.lib.CommonUtils.prototype.getSelectedContexts.getDialogFragment below
		var mFragmentStore = {}; // maps fragment names on fragment instances
		function getDialogFragment(sName, oFragmentController, sModel, fnOnFragmentCreated) {
			var oFragment = mFragmentStore[sName];
			if (!oFragment) {
				oFragment = sap.ui.xmlfragment(oController.getView().getId(), sName, oFragmentController);
				fnAttachControlToView(oFragment);
				var oModel;
				if (sModel) {
					oModel = new JSONModel();
					oFragment.setModel(oModel, sModel);
				}
				(fnOnFragmentCreated || jQuery.noop)(oFragment, oModel);
				mFragmentStore[sName] = oFragment;
			}
			return oFragment;
		}

		var oResourceBundle; // initialized on first use
		function getText() {
			oResourceBundle = oResourceBundle || oController.getOwnerComponent().getModel("i18n").getResourceBundle();
			return oResourceBundle.getText.apply(oResourceBundle, arguments);
		}

		function isDraftEnabled() {
			var oDraftContext = oServices.oDraftController.getDraftContext();
			return oDraftContext.isDraftEnabled(oController.getOwnerComponent().getEntitySet());
		}

		function getSelectedContexts(oControl) {
			var aSelectedContexts = [];
			if (oControl instanceof SmartTable) {
				oControl = oControl.getTable();
			}
			if (oControl instanceof ListBase) {
				aSelectedContexts = oControl.getSelectedContexts();
			} else if (oControl instanceof UiTable) {
				var aIndex = oControl.getSelectedIndices();
				for (var i = 0; i < aIndex.length; i++) {
					aSelectedContexts.push(oControl.getContextByIndex(aIndex[i]));
				}
			}
			return aSelectedContexts;
		}

		/*
		 * Returns a parental table of the given element or null
		 *
		 * @param {sap.ui.core.Element} oSourceControl The element where to start searching for a parental table
		 * @returns {sap.ui.table.Table|sap.m.Table|sap.ui.comp.smarttable.SmartTable} The parent table or null
		 * @public
		 */
		function getParentTable(oSourceControl){
			var oCurrentControl = oSourceControl;
			while (oCurrentControl) {
					if (oCurrentControl instanceof ResponsiveTable || oCurrentControl instanceof UiTable || oCurrentControl instanceof SmartTable) {
						return oCurrentControl;
					}

					if (oCurrentControl.getParent){
						oCurrentControl = oCurrentControl.getParent();
					} else {
						return null;
					}

				}
			return null;
		}

		/*
		 * Returns the binding of the given table
		 *
		 * @param {sap.ui.table.Table|sap.m.Table|sap.ui.comp.smarttable.SmartTable} oTable The table which's binding is to returned
		 * @returns {object} The found binding or null
		 * @public
		 */
		function getTableBinding(oTable) {
			if (oTable instanceof SmartTable) {
				oTable = oTable.getTable(); // get SmartTable's inner table first
			}

			if (oTable instanceof UiTable) {
				return oTable.getBindingInfo("rows");
			} else if (oTable instanceof ResponsiveTable) {
				return oTable.getBindingInfo("items");
			}

			return null;
		}

		/*
		 * Triggers navigation from a given list item.
		 *
		 * @param {sap.ui.model.context} selected context for navigation 
		 * @param {object} oTable The table from which navigation was triggered
		 *        control in the table
		 * @public
		 */
		function fnNavigateFromListItem(oContext, oTable) {
			var sSelectedPath = oContext.getPath();
			var oComponent = oController.getOwnerComponent();

			// binding path of component - either binding path of list (list screen e.g. /SalesOrder) or binding path of details screen (e.g.
			// /SalesOrder(123) )
			// var sPath = oComponent.getBindingContext().getPath();
			var sPath = "";
			if (oComponent.getComponentContainer().getElementBinding()) {
				sPath = oComponent.getComponentContainer().getElementBinding().getPath();
			}

			// check whether it is a navigation property binding or just a collection
			var sNavigationProperty = null;

			if (sSelectedPath.indexOf(sPath) !== 0) {
				// relative binding - table bound to navigation property e.g. Item - get binding of embedded table in details screen
				sNavigationProperty = getTableBinding(oTable).path;
			}
			oServices.oNavigationController.navigateToContext(oContext, sNavigationProperty, false);
		}

		function formatDraftLockText(IsActiveEntity, HasDraftEntity, LockedBy) {
			if (!IsActiveEntity) {
				// current assumption: is my Draft as I don't see other's draft -> TODO: to be checked
				return getText("DRAFT_OBJECT");
			} else if (HasDraftEntity) {
				return getText(LockedBy ? "LOCKED_OBJECT" : "UNSAVED_CHANGES");
			} else {
				return ""; // not visible
			}
		}

		function getDraftPopover() {
			var oDraftPopover = getDialogFragment("sap.suite.ui.generic.template.fragments.DraftAdminDataPopover", {
				formatText: function() {
					var aArgs = Array.prototype.slice.call(arguments, 1);
					var sKey = arguments[0];
					if (!sKey) {
						return "";
					}
					if (aArgs.length > 0 && (aArgs[0] === null || aArgs[0] === undefined || aArgs[0] === "")) {
						if (aArgs.length > 3 && (aArgs[3] === null || aArgs[3] === undefined || aArgs[3] === "")) {
							return (aArgs.length > 2 && (aArgs[1] === null || aArgs[1] === undefined || aArgs[1] === ""))
									? ""
									: aArgs[2];
						} else {
							return getText(sKey, aArgs[3]);
						}
					} else {
						return getText(sKey, aArgs[0]);
					}
				},
				closeDraftAdminPopover: function() {
					oDraftPopover.close();
				},
				formatDraftLockText: formatDraftLockText
			}, "admin");
			return oDraftPopover;
		}

		var fnOnDataLossConfirmed; // the current handler for data loss confirmation
		function fnDataLossConfirmation(onDataLossConfirmed) {
			// note that we must pass the event handler to a global variable, since always the version of onDataLossOK will be
			// executed which was
			// created, when fnDataLossConfirmation was called for the first time (see documentation of getDialogFragment).
			fnOnDataLossConfirmed = onDataLossConfirmed;
			var oDataLossPopup = getDialogFragment("sap.suite.ui.generic.template.fragments.DataLossPopup", {
				onDataLossOK: function() {
					oDataLossPopup.close();
					fnOnDataLossConfirmed(); // call the version of onDataLossConfirmed which is currently valid
				},
				onDataLossCancel: function() {
					oDataLossPopup.close();
				}
			});
			oDataLossPopup.open();
		}

		return {
			getNavigationProperty: getNavigationProperty,
			getText: getText,
			isDraftEnabled: isDraftEnabled,
			getNavigationHandler: function() {
				oNavigationHandler = oNavigationHandler || new NavigationHandler(oController);
				return oNavigationHandler;
			},

			executeGlobalSideEffect: function() {
				if (isDraftEnabled()) {
					var oView = oController.getView();
					oView.attachBrowserEvent(
							"keyup",
							function(oBrowswerEvent) {
								if (oBrowswerEvent.keyCode === 13 && oView.getModel("ui").getProperty("/editable")) {
									oServices.oApplicationController.executeSideEffects(oView.getBindingContext());
								}
							});
				}
			},

			getSelectedContexts: getSelectedContexts,

			navigateFromListItem: fnNavigateFromListItem,

			getCustomData: function(oEvent) {
				var aCustomData = oEvent.getSource().getCustomData();
				var oCustomData = {};
				for (var i = 0; i < aCustomData.length; i++) {
					oCustomData[aCustomData[i].getKey()] = aCustomData[i].getValue();
				}
				return oCustomData;
			},

			formatDraftLockText: formatDraftLockText,

			showDraftPopover: function(oBindingContext, oTarget) {
				var oPopover = getDraftPopover();
				var oAdminModel = oPopover.getModel("admin");
				oAdminModel.setProperty("/IsActiveEntity", oBindingContext.getProperty("IsActiveEntity"));
				oAdminModel.setProperty("/HasDraftEntity", oBindingContext.getProperty("HasDraftEntity"));
				oPopover.bindElement({
					path: oBindingContext.getPath() + "/DraftAdministrativeData"
				});
				if (oPopover.getBindingContext()) {
					oPopover.openBy(oTarget);
				} else {
					oPopover.getObjectBinding().attachDataReceived(function() {
						oPopover.openBy(oTarget);
					});
					// Todo: Error handling
				}
			},

			// provide the density class that should be used according to the environment (may be "")
			getContentDensityClass: function() {
				return sContentDensityClass;
			},

			// defines a dependency from oControl to the view
			attachControlToView: fnAttachControlToView,

			/**
			 *
			 * @function
			 * @name sap.suite.ui.generic.template.lib.CommonUtils.prototype.getSelectedContexts.getDialogFragment(sName,
			 *       oFragmentController, sModel)
			 * @param sName name of a fragment defining a dialog for the current view
			 * @param oFragmentController controller for the fragment containing event handlers and formatters used by the
			 *          fragment
			 * @param sModel optional, name of a model. If this parameter is truthy a JSON model with the given name will be
			 *          attached to the dialog
			 * @return an instance of the specififed fragment which is already attached to the current view. Note that each
			 *         fragment will only be instantiated once. Hence, when the method is called several times for the same
			 *         name the same fragment will be returned in each case. <b>Attention:</b> The parameters
			 *         <code>oFragmentController</code> and <code>sModel</code> are only evaluated when the method is
			 *         called for the first time for the specified fragment. Therefore, it is essential that the functions in
			 *         <code>oFragmentController</code> do not contain 'local state'.
			 */
			getDialogFragment: getDialogFragment,

			dataLossConfirmation: fnDataLossConfirmation,
			getParentTable: getParentTable,
			getTableBinding: getTableBinding,
			getElementCustomData: function(oElement) {
				var oCustomData = {};
				if (oElement instanceof sap.ui.core.Element) {
					oElement.getCustomData().forEach(function(oCustomDataElement) {
						oCustomData[oCustomDataElement.getKey()] = oCustomDataElement.getValue();
					});
				}
				return oCustomData;
			},
			extractODataEntityPropertiesFromODataJSONFormattedEntity: function(mEntity) {
				var mExtractedODataEntityProperties = {};
				for (var sPropertyName in mEntity) {
					var vAttributeValue = mEntity[sPropertyName];
					if (jQuery.type(vAttributeValue) !== "object") {
						mExtractedODataEntityProperties[sPropertyName] = vAttributeValue;
					}
				}
				return mExtractedODataEntityProperties;
			}

		};
	}

	return BaseObject.extend("sap.suite.ui.generic.template.lib.CommonUtils.js", {
		constructor: function(oController, oServices) {

			jQuery.extend(this, getMethods(oController, oServices));
		}
	});
});
