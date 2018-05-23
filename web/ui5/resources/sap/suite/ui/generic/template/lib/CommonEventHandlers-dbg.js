sap.ui.define(["sap/ui/base/Object", "sap/ui/core/format/DateFormat", "sap/m/ComboBox", "sap/m/MessageBox", "sap/m/MessageToast", "sap/m/Table",
	"sap/ui/model/Filter", "sap/ui/model/Sorter", "sap/ui/model/resource/ResourceModel", "sap/ui/comp/smartfilterbar/SmartFilterBar","sap/ui/table/AnalyticalTable", "sap/ui/table/Table"
], function(BaseObject, DateFormat, ComboBox, MessageBox, MessageToast, Table, Filter, Sorter,
	ResourceModel, SmartFilterBar, AnalyticalTable, UiTable) {

	"use strict";

	function getCustomData(oEventSource) {
		var aCustomData = oEventSource.getCustomData();
		var oCustomData = {};
		for (var i = 0; i < aCustomData.length; i++) {
			oCustomData[aCustomData[i].getKey()] = aCustomData[i].getValue();
		}
		return oCustomData;
	}

	function fnFilterObjectsFromJSON(mJSON) {
		var mFilteredJSON = {};
		for (var sPropertyName in mJSON) {
			var vAttributeValue = mJSON[sPropertyName];
			if (jQuery.type(vAttributeValue) !== "object") {
				mFilteredJSON[sPropertyName] = vAttributeValue;
			}
		}
		return mFilteredJSON;
	}

	// TODO: Check
	function fnHandleError(oError) {
		if (oError instanceof Error) {
			oError.showMessageBox();
		}
	}

	function fnGroupFunction(sPath) {
		// coding for finding the right key and label for the grouping row of a table
		// hope to replace this by core functionality soon
		var sText = "";
		var mTypeMap = []; // buffer for subsequent calls
		return function(oContext) {
			var sLabel = "";
			var sTextPath = sPath;
			var oTypeMap;
			// check for existing entry in buffer
			for (var h in mTypeMap) {
				if (mTypeMap[h].path === sPath) {
					oTypeMap = mTypeMap[h];
					break;
				}
			}
			if (!oTypeMap) {
				// not in buffer
				var oMetaModel = oContext.getModel("entitySet").getMetaModel();
				// var oMetaEntityType = oMetaModel.getObject(oMetaModel.getMetaContext(oContext.sPath).sPath);
				var oProperty = oMetaModel.getObject(oMetaModel.getMetaContext(oContext.sPath + "/" + sPath).sPath);

				if (oProperty) {
					var sFormat = " ";
					for (var k = 0; oProperty.extensions && k < oProperty.extensions.length; k++) {
						if (oProperty.extensions[k].namespace === "http://www.sap.com/Protocols/SAPData") {
							switch (oProperty.extensions[k].name) {
								case "display-format":
									sFormat = oProperty.extensions[k].value;
									break;
								case "label":
									sLabel = oProperty.extensions[k].value;
									break;
								case "text":
									var sTextProperty = oProperty.extensions[k].value;
									var aSplitPath = sPath.split("/");
									aSplitPath[aSplitPath.length - 1] = sTextProperty;
									sTextPath = aSplitPath.join("/");
									break;
								default:
									break;
							}
						}
					}
					if (sLabel === "") {
						sLabel = sPath;
					}
					// fill buffer
					oTypeMap = {
						path: sPath,
						data: {
							type: oProperty.type,
							displayFormat: sFormat,
							label: sLabel,
							textPath: sTextPath
						}
					};
					mTypeMap.push(oTypeMap);
				}
			}
			// Now it's time to fix the right label
			sLabel = oTypeMap.data.label;
			if (oTypeMap.data.textPath !== "") {
				sText = oContext.getProperty(oTypeMap.data.textPath);
				if (sText === null || sText === undefined) {
					sText = "";
				}
			} else if (oContext.getProperty(sPath) !== "") {
				sText = oContext.getProperty(sPath);
			}
			switch (oTypeMap.data.type) {
				case "Edm.DateTime":
					if (oTypeMap.data.displayFormat === "Date") {
						var dateFormat = DateFormat.getDateInstance({
							pattern: "MMM d, yyyy"
						});
						var TZOffsetMs = new Date(0).getTimezoneOffset() * 60 * 1000;
						sText = dateFormat.format(new Date(sText.getTime() + TZOffsetMs));
					}
					break;
				case "Edm.Boolean":
					if (sText === true) {
						sText = "{i18n>YES}";
					} else if (sText === false) {
						sText = "{i18n>NO}";
					}
					break;
				default:
					break;
			}
			return {
				key: sText ? sText : sPath,
				text: sLabel ? sLabel + ": " + sText : sText
			};
		};
	}

	function getMethods(oController, oComponentUtils, oServices, oCommonUtils) {

		function getDiscardDraftPopover() {
			return oCommonUtils.getDialogFragment("sap.suite.ui.generic.template.fragments.DiscardDraftPopover", {
				onDiscardConfirm: function() {
					var fnDiscardDraft = function(oActive) {
						var oDiscardPromise = oServices.oCRUDManager.deleteEntity();
						oDiscardPromise.then(function() {
							oServices.oNavigationController.setRootPageToDirty();
							oServices.oNavigationController.unbindChildren(oController.getOwnerComponent());

							if (oActive && oActive.getObject() && oActive.getObject().IsActiveEntity) {
								oServices.oNavigationController.navigateToContext(oActive, undefined, true);
							} else {
								// new document discarded, go back to previous page
								window.history.back();
							}
						});
						var oEvent = {
							discardPromise: oDiscardPromise
						};
						oComponentUtils.fire(oController, "AfterCancel", oEvent);
					};
					var oContext = oController.getView().getBindingContext();
					var oEntity = oContext.getObject();
					if (oEntity.hasOwnProperty("HasActiveEntity") && oEntity.HasActiveEntity && oEntity.hasOwnProperty("SiblingEntity")) {
						var oModel = oController.getView().getModel();
						oModel.read(oContext.getPath() + "/SiblingEntity", {
							success: function(oResponseData) {
								var oActive = oModel.getContext("/" + oModel.getKey(oResponseData));
								fnDiscardDraft(oActive);
							}
						});
					} else {
						fnDiscardDraft();
				}
				}
			}, "discard");
		}

		function storeObjectPageNavigationRelatedInformation(oEventSource) {
			var oRow = oEventSource;
			var iIdx = -1, iMaxIdx = -1;
			var bNestedObjPage = false;
			var oTable = oCommonUtils.getParentTable(oEventSource);


			if (oTable.getTable) {
				oTable = oTable.getTable();
			}

			var bIsAnalyticalTbl = oTable instanceof AnalyticalTable;

			if (!bIsAnalyticalTbl) { // up/down navigation is not enabled in the analytical table scenario

				var oData = null;
				// get the table list binding now
				var oTableBinding = oCommonUtils.getTableBinding(oTable);
				var oListBinding = oTableBinding && oTableBinding.binding;
				var aCurrContexts = null;

				if (oListBinding) {
					if (oTable instanceof UiTable) {
						// possibly a bug in the UI5 framework itself .. getCurrentContexts() only returns the contexts of selected rows in the table
						aCurrContexts = oListBinding.getContexts();
					} else if (oTable instanceof Table) {
						aCurrContexts = oListBinding.getCurrentContexts();
					}
				}

				var oContext = null;
				var aSelectedContexts = oCommonUtils.getSelectedContexts(oTable);
				var sSelectedBindingPath = null;

				if (aSelectedContexts && aSelectedContexts.length > 0) {
					sSelectedBindingPath = aSelectedContexts[0].getPath();
				} else if (oRow) {
					if (oTable instanceof Table) {
						// could be a list tab navigation - rows are not selected explicitly - can only be possible with a list/m.table navigation (by default)
						sSelectedBindingPath = oRow.getBindingContext() ? oRow.getBindingContext().sPath : null;
					}
				}


				// get index of selected item
				if (oListBinding && oListBinding.getContexts && sSelectedBindingPath) {
					aCurrContexts = oListBinding.getCurrentContexts();
					for (var i = 0; i < aCurrContexts.length; i++) {
						oContext = aCurrContexts[i];
						if (oContext.getPath() === sSelectedBindingPath) {
							iIdx = i;
							break;
						}
					}
				}

				if (oTable && iIdx !== -1) {
					iMaxIdx = oListBinding.getLength();
					var iThreshold = Math.floor(iMaxIdx / 5); // default

					if (oTable instanceof Table) {
						iThreshold = oTable.getGrowingThreshold();
					} else if (oTable instanceof UiTable) {
						iThreshold = oTable.getThreshold();
					}

					// controversial step
					var oNewListBinding = jQuery.extend({}, oListBinding);
					// controversial step over

					var sNavigationProperty = oTableBinding.path;
					// determine the "level" of the object page
					var oCurrentData = oComponentUtils.getCurrentDisplayObject().dataFromLastPage;
					if (oCurrentData && oCurrentData.nextObjectPageInfo) {
						// nested level object page navigation
						bNestedObjPage = true;
					}
					// Populate the data to be passed to the next screen
					var oNewListBindingContexts = null;

					if (oNewListBinding && oTable instanceof UiTable) {
						// possibly a bug in the UI5 framework itself .. getCurrentContexts() only returns the contexts of selected rows in the table
						oNewListBindingContexts = oNewListBinding.getContexts();
					} else if (oNewListBinding && oTable instanceof Table) {
						oNewListBindingContexts = oNewListBinding.getCurrentContexts();
					}

					oData = {
						"NavPropertyToUse": sNavigationProperty,
						"listBinding": oNewListBinding,
						"tableMaxItems": iMaxIdx,
						"growingThreshold": iThreshold,
						"nested": bNestedObjPage,
						"selectedRelativeIndex": iIdx,
						"objectPageNavigationContexts": oNewListBindingContexts,
						"startIndex": 0,
						"endIndex": oNewListBindingContexts.length - 1
					};

					var sCurrentPageTitle;
					var oTemplatePrivateModel = oTable.getModel("_templPriv");
					var oCurrentView = sap.ui.getCore().byId(oController.oView.sId);
					var sPreviousPageTitle = oTemplatePrivateModel.getProperty("/currentPageTitle", sCurrentPageTitle);
					if (!oTemplatePrivateModel.oData.complexTable) {
						sCurrentPageTitle = oCurrentView.byId("objectTypeName").getText();
					} else {
						sCurrentPageTitle = oCurrentView.byId("page-title").getText();
					}

					// Get the data store and create our stack here
					oComponentUtils.addDataForNextPage({
						"nextObjectPageInfo": oData,
						"previousPageTitle": sPreviousPageTitle,
						"currentPageTitle": sCurrentPageTitle
					});
				}
			}
		}

		// injection of $select for smart table - only subset of fields is requested (line items) but technical fields are; required as well: semantic
		// key, technical key + IsDraft / HasTwin
		function getTableQueryParameters(sEntitySet, oExistingQueryParameters) { // #ListController
			var oMetaModel = oController.getView().getModel().getMetaModel();
			var oBindingParams = oExistingQueryParameters;
			var oEntitySet = oMetaModel.getODataEntitySet(sEntitySet, false);
			var oEntityType = oMetaModel.getODataEntityType(oEntitySet.entityType, false);
			var aMandatoryFields = oEntityType.key.propertyRef;
			var i;

			var oDraftContext = oServices.oDraftController.getDraftContext();
			if (oDraftContext.isDraftEnabled(sEntitySet)) {
				aMandatoryFields = aMandatoryFields.concat(oDraftContext.getSemanticKey(sEntitySet));
				aMandatoryFields.push({
					name: "IsActiveEntity"
				}, {
					name: "HasDraftEntity"
				}, {
					name: "HasActiveEntity"
				});
			}

			if (oBindingParams.parameters.select && oBindingParams.parameters.select.length > 0) {
				// at least one select parameter
				var aSelects = oBindingParams.parameters.select.split(",");
				for (i = 0; i < aMandatoryFields.length; i++) {
					if (jQuery.inArray(aMandatoryFields[i].name, aSelects) === -1) {
						oBindingParams.parameters.select += "," + aMandatoryFields[i].name;
					}
				}
			}
			return oBindingParams;
		}

		var fnSetDraftIndicatorState, fnSetDraftIndicatorStateSaved, fnSetDraftIndicatorStateClear; // initialized on demand
		function onChange(oEvent) {
			var sProperty = oEvent.getSource().getBindingPath("value");
			var oView = oController.getView();
			var bIsDraft = oServices.oDraftController.getDraftContext().hasDraft(oView.getBindingContext());

			if (bIsDraft) {
				if (!fnSetDraftIndicatorState) {
					var oTemplatePrivateModel = oView.getModel("_templPriv");
					fnSetDraftIndicatorState = oTemplatePrivateModel.setProperty.bind(oTemplatePrivateModel, "/generic/draftIndicatorState");
					fnSetDraftIndicatorStateSaved = fnSetDraftIndicatorState.bind(null, sap.m.DraftIndicatorState.Saved);
					fnSetDraftIndicatorStateClear = fnSetDraftIndicatorState.bind(null, sap.m.DraftIndicatorState.Clear);
				}
				fnSetDraftIndicatorState(sap.m.DraftIndicatorState.Saving);
			}
			var oModifyPromise = oServices.oCRUDManager.modifyEntity(sProperty, oEvent.getSource());
			if (bIsDraft) {
				oModifyPromise.then(fnSetDraftIndicatorStateSaved, fnSetDraftIndicatorStateClear);
			}
			return oModifyPromise;
		}
		/**
		 * Return an instance of the DeleteConfirmation fragment
		 *
		 * @param {sap.m.Table} table
		 * @return {sap.m.Dialog} - returns the Delete Confirmation Dialog
		 * @private
		 */
		function getDeleteDialog(smartTable) {
			return oCommonUtils.getDialogFragment("sap.suite.ui.generic.template.ListReport.view.fragments.DeleteConfirmation", {
				onCancel: function (oEvent) {
					var oDialog = oEvent.getSource().getParent();
					oDialog.close();
				},
				onDelete: function (oEvent) {
					var oModel = oController.getView().getModel();
					var oMetaModel = oModel.getMetaModel();
					var oEntitySet = oMetaModel.getODataEntitySet(oController.getOwnerComponent().getEntitySet());
					var oEntityType = oMetaModel.getODataEntityType(oEntitySet.entityType);
					var sEntityTypeName = oEntityType["com.sap.vocabularies.UI.v1.HeaderInfo"].TypeName.String;
					var sEntityTypeNamePlural = oEntityType["com.sap.vocabularies.UI.v1.HeaderInfo"].TypeNamePlural.String;
					var sEntityTypeName_lc = sEntityTypeName.toLowerCase();
					var sEntityTypeNamePlural_lc = sEntityTypeNamePlural.toLowerCase();


					var oDialog = oEvent.getSource().getParent();
					var oDialogModel = oDialog.getModel("delete");
					var aSelectedItems = oDialogModel.getProperty("/items");
					var aPathsToBeDeleted = [];
					// determine which items to delete
					for (var i = 0; i < aSelectedItems.length; i++) {
						if (!aSelectedItems[i].draftStatus.locked) {
							if (aSelectedItems.length === oDialogModel.getProperty("/unsavedChangesItemsCount") || !aSelectedItems[i].draftStatus.unsavedChanges ||
								oDialogModel.getProperty("/checkboxSelected")) {
								aPathsToBeDeleted.push(aSelectedItems[i].context.getPath());
							}
						}
					}
					// delete
					oServices.oCRUDManager.deleteEntities(aPathsToBeDeleted).then(
						function (aFailedPath) {
							var iSuccessfullyDeleted = aPathsToBeDeleted.length - aFailedPath.length;

							if (aFailedPath.length > 0) {
								var sErrorMessage = "";
								if (iSuccessfullyDeleted > 0) {

									// successful delete
									sErrorMessage += (iSuccessfullyDeleted > 1) ?
										oCommonUtils.getText("ST_GENERIC_DELETE_SUCCESS_PLURAL_WITH_COUNT", [iSuccessfullyDeleted, sEntityTypeNamePlural_lc]) :
										oCommonUtils.getText("ST_GENERIC_DELETE_SUCCESS_WITH_COUNT", [iSuccessfullyDeleted, sEntityTypeName_lc]);

									// failed deletes
									sErrorMessage += "\n";
									sErrorMessage += (aFailedPath.length > 1) ?
										oCommonUtils.getText("ST_GENERIC_DELETE_ERROR_PLURAL_WITH_COUNT", [aFailedPath.length, sEntityTypeNamePlural_lc]) :
										oCommonUtils.getText("ST_GENERIC_DELETE_ERROR_WITH_COUNT", [aFailedPath.length, sEntityTypeName_lc]);

								} else {
									sErrorMessage = (aFailedPath.length > 1) ?
										oCommonUtils.getText("ST_GENERIC_DELETE_ERROR_PLURAL", [sEntityTypeNamePlural_lc]) :
										oCommonUtils.getText("ST_GENERIC_DELETE_ERROR", [sEntityTypeName_lc]);
								}

								MessageBox.error(sErrorMessage);

							} else {
								var sSuccessMessage = "";
								sSuccessMessage = (iSuccessfullyDeleted > 1) ?
									oCommonUtils.getText("ST_GENERIC_DELETE_SUCCESS_PLURAL", [sEntityTypeNamePlural_lc]) :
									oCommonUtils.getText("ST_GENERIC_DELETE_SUCCESS", [sEntityTypeName_lc]);

								MessageToast.show(sSuccessMessage);
							}

							smartTable.rebindTable();
						},
						function (oError) {
							// this could be a different message b/c the batch request has failed here
							MessageBox.error(oCommonUtils.getText("ST_GENERIC_DELETE_ERROR_PLURAL", [aPathsToBeDeleted.length, sEntityTypeNamePlural_lc]), {
								styleClass: oCommonUtils.getContentDensityClass()
							});

						}
					);
					oDialog.close();
				}
			}, "delete");
		}
		/**
		 * Return the data necessary for the Delete Confirmation Dialog
		 *
		 * @param [sap.m.ListItemBase] selectedItems
		 * @return {map} JSON map containing the data for the Delete Confirmation Dialog
		 * @private
		 */
		function getDataForDeleteDialog(selectedItems) {
			var oModel = oController.getView().getModel();
			var oMetaModel = oModel.getMetaModel();
			var oEntitySet = oMetaModel.getODataEntitySet(oController.getOwnerComponent().getEntitySet());
			var oEntityType = oMetaModel.getODataEntityType(oEntitySet.entityType);
			var sEntityTypeName = oEntityType["com.sap.vocabularies.UI.v1.HeaderInfo"].TypeName.String;
			var sEntityTypeNamePlural = oEntityType["com.sap.vocabularies.UI.v1.HeaderInfo"].TypeNamePlural.String;
			var sEntityTypeName_lc = sEntityTypeName.toLowerCase();
			var sEntityTypeNamePlural_lc = sEntityTypeNamePlural.toLowerCase();

			var mJSONData = {
				items: undefined,
				itemsCount: selectedItems.length,
				text: {
					title: undefined,
					shortText: undefined,
					unsavedChanges: undefined,
					longText: undefined
				},
				lockedItemsCount: 0,
				unsavedChangesItemsCount: 0,
				checkboxSelected: true
			};

			// Enhance the items with their context and draft status. Also keep track of the number of locked and unsaved items
			var aItems = [];
			for (var i = 0; i < selectedItems.length; i++) {
				var oEntity = oModel.getObject(selectedItems[i].getPath());
				var mDraftStatus = {};


				if (!oEntity.IsActiveEntity) { // if the entity is not an active entity, we can assume it is a draft
					mDraftStatus.draft = true;

				} else if (oEntity.HasDraftEntity) { // if the entity is an active entity AND has a draft entity, we can assume someone else has a draft of the entity
					var sLockedBy = oModel.getProperty("DraftAdministrativeData/InProcessByUser", selectedItems[i]);
					if (sLockedBy) { // if there is a user processing the entity, it is locked
						mDraftStatus.locked = true;
						mDraftStatus.user = sLockedBy;
						mJSONData.lockedItemsCount++;
					} else { // else the entity has unsaved changes
						mDraftStatus.unsavedChanges = true;
						mDraftStatus.user = oModel.getProperty("DraftAdministrativeData/LastChangedByUser", selectedItems[i]);
						mJSONData.unsavedChangesItemsCount++;
					}
				}
				aItems.push({
					context: selectedItems[i],
					draftStatus: mDraftStatus
				});
			}
			mJSONData.items = aItems;

			// determine Dialog title
			if (mJSONData.lockedItemsCount === mJSONData.itemsCount) {
				mJSONData.text.title = oCommonUtils.getText("ST_GENERIC_ERROR_TITLE");
			} else {
				mJSONData.text.title = (mJSONData.itemsCount > 1) ?
					oCommonUtils.getText("ST_GENERIC_DELETE_TITLE_WITH_COUNT", mJSONData.itemsCount) :
					oCommonUtils.getText("ST_GENERIC_DELETE_TITLE");
			}

			// determine unsavedChanges Checkbox text
			mJSONData.text.unsavedChanges = oCommonUtils.getText("ST_GENERIC_UNSAVED_CHANGES_CHECKBOX", sEntityTypeNamePlural_lc);

			// determine short text
			if (mJSONData.itemsCount > 1) {
				if (mJSONData.lockedItemsCount === mJSONData.itemsCount) {
					mJSONData.text.shortText = oCommonUtils.getText("ST_GENERIC_DELETE_LOCKED_PLURAL", sEntityTypeNamePlural_lc);
				} else if (mJSONData.unsavedChangesItemsCount === mJSONData.itemsCount) {
					mJSONData.text.shortText = oCommonUtils.getText("ST_GENERIC_DELETE_UNSAVED_CHANGES_PLURAL", sEntityTypeNamePlural_lc);
				} else if (mJSONData.lockedItemsCount > 0) {
					var iRemainingItems = mJSONData.itemsCount - mJSONData.lockedItemsCount;
					// 1st part of message
					mJSONData.text.shortText = (mJSONData.lockedItemsCount > 1) ?
						oCommonUtils.getText("ST_GENERIC_CURRENTLY_LOCKED_PLURAL", [mJSONData.lockedItemsCount, mJSONData.itemsCount,
							sEntityTypeNamePlural_lc
						]) :
						oCommonUtils.getText("ST_GENERIC_CURRENTLY_LOCKED", [mJSONData.itemsCount, sEntityTypeNamePlural_lc]);

					mJSONData.text.shortText += "\n";
					// 2nd part of message
					if (iRemainingItems === mJSONData.unsavedChangesItemsCount) {
						mJSONData.text.shortText += (iRemainingItems > 1) ?
							oCommonUtils.getText("ST_GENERIC_DELETE_REMAINING_UNSAVED_CHANGES_PLURAL", [sEntityTypeNamePlural_lc]) :
							oCommonUtils.getText("ST_GENERIC_DELETE_REMAINING_UNSAVED_CHANGES", [sEntityTypeName_lc]);
					} else {
						mJSONData.text.shortText += (iRemainingItems > 1) ?
							oCommonUtils.getText("ST_GENERIC_DELETE_REMAINING_PLURAL", [iRemainingItems, sEntityTypeNamePlural_lc]) :
							oCommonUtils.getText("ST_GENERIC_DELETE_REMAINING", [sEntityTypeName_lc]);
					}
				} else {
					mJSONData.text.shortText = oCommonUtils.getText("ST_GENERIC_DELETE_SELECTED_PLURAL", sEntityTypeNamePlural_lc);
				}
			} else {
				if (mJSONData.lockedItemsCount > 0) {
					mJSONData.text.shortText = oCommonUtils.getText("ST_GENERIC_DELETE_LOCKED", [sEntityTypeName, mJSONData.items[0].draftStatus.user]);
				} else if (mJSONData.unsavedChangesItemsCount > 0) {
					mJSONData.text.shortText = oCommonUtils.getText("ST_GENERIC_DELETE_UNSAVED_CHANGES", [sEntityTypeName_lc, mJSONData.items[0].draftStatus
						.user
					]);
				} else {
					mJSONData.text.shortText = oCommonUtils.getText("ST_GENERIC_DELETE_SELECTED", sEntityTypeName_lc);
				}
			}

			return mJSONData;
		}


		function fnShowError(sErrorMessageKey) {
			MessageBox.error(oCommonUtils.getText(sErrorMessageKey), {
				styleClass: oCommonUtils.getContentDensityClass()
			});
		}

		function fnNavigateIntent(oEventSource, oContext, oSmartFilterBar) {
			var oContextObject = oContext.getObject();
			var oManifestEntry = oController.getOwnerComponent().getAppComponent().getManifestEntry("sap.app");
			var oOutbound = oManifestEntry.crossNavigation.outbounds[getCustomData(oEventSource).CrossNavigation];
			var oNavigationHandler = oCommonUtils.getNavigationHandler();

			var sSelectionVariant;
			var oSelectionVariant;
			var oInnerAppState = {};
			if (oSmartFilterBar) {
				sSelectionVariant = oSmartFilterBar.getDataSuiteFormat();
				oSelectionVariant = oNavigationHandler.mixAttributesAndSelectionVariant(oContextObject, sSelectionVariant);
				var oSmartTable = oEventSource.getParent().getParent();
				oInnerAppState = {
					selectionVariant: sSelectionVariant,
					tableVariantID: oSmartTable.getCurrentVariantId()
				};
			} else {
				jQuery.extend(oContextObject, oController.getView().getBindingContext().getObject());
				oSelectionVariant = oContextObject;
			}


			oNavigationHandler.navigate(
				oOutbound.semanticObject,
				oOutbound.action,
					JSON.stringify(oSelectionVariant),
					oInnerAppState,
					fnHandleError
					);
		}

		return {
			onBeforeRebindTable: function(oEvent) {
				// For line item actions, popin display must not have a label
				var oTable = oEvent.getSource().getTable();
				if (oTable && oTable instanceof sap.m.Table) {
					var oColumns = oTable.getColumns();
					for (var iColumn = 0; iColumn < oColumns.length; iColumn++) {
						if (oColumns[iColumn].getCustomData()[0].getValue()["actionButton"] === "true") {
							oColumns[iColumn].setPopinDisplay("WithoutHeader");
						}
					}
				}
				// still open
				var oBindingParams = oEvent.getParameter("bindingParams");
				var oPage = oController.getOwnerComponent().getAggregation("rootControl");
				var oSmartTable = oEvent.getSource();
				var oTableLengthText = oPage.byId(oSmartTable.getTable().sId + "-tableLengthText");

				// oTableLengthText is only available if long table feature is activated
				if (oTableLengthText) {
					oBindingParams.length = 5;
				}
				oBindingParams.parameters = oBindingParams.parameters || {};

				var oSmartFilterBar = oController.byId(oSmartTable.getSmartFilterId());
				if (oSmartFilterBar instanceof SmartFilterBar) {
					var oCustomControl = oSmartFilterBar.getControlByKey("EditState");
					if (oCustomControl instanceof ComboBox) {
						var vDraftState = oCustomControl.getSelectedKey();
						switch (vDraftState) {
							case "1": // Unchanged
								// IsActiveDocument and siblingEntity eq null
								oBindingParams.filters.push(new Filter("IsActiveEntity", "EQ", true));
								oBindingParams.filters.push(new Filter("HasDraftEntity", "EQ", false));
								break;
							case "2": // Draft
								oBindingParams.filters.push(new Filter("IsActiveEntity", "EQ", false));
								break;
							case "3": // Locked
								oBindingParams.filters.push(new Filter("IsActiveEntity", "EQ", true));
								oBindingParams.filters.push(new Filter("SiblingEntity/IsActiveEntity", "EQ", null));
								oBindingParams.filters.push(new Filter("DraftAdministrativeData/InProcessByUser", "NE", ""));
								break;
							case "4": // Unsaved changes
								oBindingParams.filters.push(new Filter("IsActiveEntity", "EQ", true));
								oBindingParams.filters.push(new Filter("SiblingEntity/IsActiveEntity", "EQ", null));
								oBindingParams.filters.push(new Filter("DraftAdministrativeData/InProcessByUser", "EQ", ""));
								break;
							default: // All ==> Special handling for multiple multi-filters
								var oOwnMultiFilter = new sap.ui.model.Filter({
									filters: [new Filter("IsActiveEntity", "EQ", false),
										new Filter("SiblingEntity/IsActiveEntity", "EQ", null)
									],
									and: false
								});
								if (oBindingParams.filters[0] && oBindingParams.filters[0].aFilters) {
									var oSmartTableMultiFilter = oBindingParams.filters[0];
									oBindingParams.filters[0] = new sap.ui.model.Filter([oSmartTableMultiFilter, oOwnMultiFilter], true);
								} else {
									oBindingParams.filters.push(oOwnMultiFilter);
								}
								break;
						}
					}
				}

				getTableQueryParameters(oSmartTable.getEntitySet(), oBindingParams);
				var aSelect = oBindingParams.parameters.select && oBindingParams.parameters.select.split(",") || [];
				var aExpands = oBindingParams.parameters && oBindingParams.parameters.expand && oBindingParams.parameters.expand.split(",") || [];
				var sEntitySet = oSmartTable.getEntitySet();

				if (aSelect && aSelect.length > 0) {
					var oMetaModel = oSmartTable.getModel().getMetaModel();
					var oEntitySet = oMetaModel.getODataEntitySet(sEntitySet);
					var oEntityType = oMetaModel.getODataEntityType(oEntitySet.entityType);

					// Make sure sorter text property in select and expand list for grouping selection where column is not visible
					if (oTable instanceof Table) {
						
						var oSorter = oBindingParams.sorter[0];
						// Check if sorter is for Grouping
						if (oSorter && oSorter.vGroup) {
							var oSorterObject = oMetaModel.getODataProperty(oEntityType, oSorter.sPath);
							var sSorterText = oSorterObject["sap:text"] || (oSorterObject["com.sap.vocabularies.Common.v1.Text"] || "").Path || "";
							if (sSorterText) {
								if (jQuery.inArray(sSorterText, aSelect) === -1) {
									oBindingParams.parameters.select += "," + sSorterText;
									aSelect.push(sSorterText);
								}
							}
						}
					}
				}

				// check if any expand is neccessary
				for (var i = 0; i < aSelect.length; i++) {
					// check if expand is neccessary
					if (aSelect[i].indexOf("/") !== -1) {
						var aParts = aSelect[i].split("/");
						// remove property from path
						aParts.pop();
						var sNavigation = aParts.join("/");
						if (aExpands.indexOf(sNavigation) === -1) {
							aExpands.push(sNavigation);
						}
					}
				}

				// add Draft Admin Data to expand if entity is Draft and Draft Root and has Draft Admin Data
				var oDraftContext = oServices.oDraftController.getDraftContext();
				if (oDraftContext.isDraftEnabled(sEntitySet) && oDraftContext.isDraftRoot(sEntitySet)) {
					if (oDraftContext.hasDraftAdministrativeData(sEntitySet)) {

						if (aSelect && aSelect.length > 0) {
							if (aSelect.indexOf("DraftAdministrativeData") === -1) {
								oBindingParams.parameters.select = oBindingParams.parameters.select + ",DraftAdministrativeData";
							}
						}

						if (aExpands.indexOf("DraftAdministrativeData") === -1) {
							aExpands.push("DraftAdministrativeData");
						}
					}
				}

				if (aExpands.length > 0) {
					oBindingParams.parameters.expand = aExpands.join(",");
				}

				// sortOrder Annotation of presentation variant - only relevant for sap.m.Table
				var aCustomData = oSmartTable.getCustomData();
				var oCustomData = {};
				for (var k = 0; k < aCustomData.length; k++) {
					oCustomData[aCustomData[k].getKey()] = aCustomData[k].getValue();
				}
				var oTable = oSmartTable.getTable();
				var oVariant = oSmartTable.fetchVariant();
				if ((!oVariant || !oVariant.sort) && oTable instanceof Table && oCustomData.TemplateSortOrder) {
					var aSortOrder = oCustomData.TemplateSortOrder.split(", ");
					for (var j = 0; j < aSortOrder.length; j++) {
						var aSort = aSortOrder[j].split(" ");
						if (aSort.length > 1) {
							oBindingParams.sorter.push(new Sorter(aSort[0], aSort[1] === "true"));
						} else {
							oBindingParams.sorter.push(new Sorter(aSort[0]));
						}
					}
				}

				if (oTable instanceof Table) {
					// Define grouping (wiki: SmartTable FAQs)
					var oSorter = oBindingParams.sorter[0];
					// Check if sorter is for Grouping
					if (oSorter && oSorter.vGroup) {
						// Replace the Group function
						oSorter.fnGroup = fnGroupFunction(oSorter.sPath);
					}
				}
			},

			onListNavigate: function(oEventSource) {

				storeObjectPageNavigationRelatedInformation(oEventSource);

				oCommonUtils.navigateFromListItem(oEventSource.getBindingContext(), oEventSource.getParent());

			},

			onListNavigateIntent: function(oEventSource, oSmartFilterBar) {
				var oContext = oEventSource.getBindingContext();
				fnNavigateIntent(oEventSource, oContext, oSmartFilterBar);
			},

			onShowDetails: function(oEventSource){
				var oTable = oEventSource.getParent().getParent().getTable();
				var aContexts = oCommonUtils.getSelectedContexts(oTable);
				switch (aContexts.length) {
					case 0:
						fnShowError("ST_GENERIC_NO_ITEM_SELECTED");
						return;
					case 1:
						storeObjectPageNavigationRelatedInformation(oEventSource);
						oCommonUtils.navigateFromListItem(aContexts[0], oTable);
						return;
					default:
						fnShowError("ST_GENERIC_MULTIPLE_ITEMS_SELECTED");
						return;
				}
			},

			onShowDetailsIntent: function(oEventSource, oSmartFilterBar){
				var oTable = oEventSource.getParent().getParent().getTable();
				var aContexts = oCommonUtils.getSelectedContexts(oTable);
				switch (aContexts.length) {
				case 0:
					fnShowError("ST_GENERIC_NO_ITEM_SELECTED");
					return;
				case 1:
					fnNavigateIntent(oEventSource, aContexts[0], oSmartFilterBar);
					return;
				default:
					fnShowError("ST_GENERIC_MULTIPLE_ITEMS_SELECTED");
					return;
				}
			},

			onChange: onChange,

			// action triggered from tables
			// Note: oSmartFilterBar is optional
			onCallActionFromList: function(oEvent, oSmartFilterBar) {
				var oEventSource = oEvent.getSource();
				var mOutboundParameters, oInnerAppData, oResponse;
				var oSmartTable = oCommonUtils.getParentTable(oEvent.getSource());
				var oTable = oSmartTable.getTable();
				var sTablePath = oSmartTable.getTableBindingPath();
				var aContexts = oCommonUtils.getSelectedContexts(oTable);
				var oCustomData = getCustomData(oEventSource);
				var sErrorMessageKey = "";

				if (oCustomData.Type === "com.sap.vocabularies.UI.v1.DataFieldForAction") {
					//NO ITEM SELECTED: user selects no item in table --> currently not possible for actions, but might be supported in the future for actions that don't have parameters at all
					//ONE ITEM SELECTED: supported
					//MULTIPLE ITEMS SELECTED: function import actions on multiple instances - supported
					if (aContexts.length === 0) {
						sErrorMessageKey = "ST_GENERIC_NO_ITEM_SELECTED";
					} else {
						//processing allowed
						// TODO check Denver implementation
						oServices.oCRUDManager.callAction({
							functionImportPath: oCustomData.Action,
							contexts: aContexts,
							sourceControl: oTable,
							label: oCustomData.Label,
							operationGrouping: oCustomData.OperationGrouping,
							navigationProperty: ""
						}).then(function (aResponses) {
							if (aResponses && aResponses.length && aResponses.length === 1) {
								oResponse = aResponses[0];

								if (oResponse.response && oResponse.response.context && (!oResponse.actionContext || oResponse.actionContext && oResponse.response.context.getPath() !== oResponse.actionContext.getPath())){
									oServices.oNavigationController.setMeToDirty(oController.getOwnerComponent(), sTablePath);
								}
							}
						});
						return;
					}
				} else {
					// right now all kinds of processing are allowed, like com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation
					// and tried to execute via intent based navigation
					//NO ITEM SELECTED: user selects no item in table - not supported
					//ONE ITEM SELECTED: supported
					//MULTIPLE ITEMS SELECTED: navigation to multiple instances --> currently not supported
					if (aContexts.length === 0) {
						sErrorMessageKey = "ST_GENERIC_NO_ITEM_SELECTED";
					} else if (aContexts.length === 1) {
						//processing allowed
						var oNavigationHandler = oCommonUtils.getNavigationHandler();
						if (oNavigationHandler) {
							var mSemanticAttributes = {};
							if (aContexts[0]) {
								mSemanticAttributes = aContexts[0].getObject();
							}
							delete mSemanticAttributes.__metadata;
							if (oSmartFilterBar) {
								var sSelectionVariant = oSmartFilterBar.getDataSuiteFormat() || "{}";
								mSemanticAttributes = fnFilterObjectsFromJSON(mSemanticAttributes);
								mOutboundParameters = oNavigationHandler.mixAttributesAndSelectionVariant(mSemanticAttributes,
									sSelectionVariant).toJSONString();
								oInnerAppData = {
									selectionVariant: oSmartFilterBar.getDataSuiteFormat(),
									tableVariantID: oSmartTable.getCurrentVariantId()
								};
							} else {
								jQuery.extend(mSemanticAttributes, oController.getView().getBindingContext().getObject());
								mOutboundParameters = fnFilterObjectsFromJSON(mSemanticAttributes);
								mOutboundParameters = JSON.stringify(mOutboundParameters);
								oInnerAppData = {};
							}
							oNavigationHandler.navigate(oCustomData.SemanticObject, oCustomData.Action, mOutboundParameters,
								oInnerAppData, fnHandleError);
						}
						return;
					} else {
						sErrorMessageKey = "ST_GENERIC_MULTIPLE_ITEMS_SELECTED";
					}
				}
				if (sErrorMessageKey) {
					MessageBox.error(oCommonUtils.getText(sErrorMessageKey), {
						styleClass: oCommonUtils.getContentDensityClass()
					});
				}
			},

			onDiscardDraft: function(oEvent) {
				var oSource = oEvent.getSource();
				var aCustomData = oSource.getCustomData();
				var oDiscardPopover = getDiscardDraftPopover();
				var oDiscardModel = oDiscardPopover.getModel("discard");
				var sPlacement = aCustomData && aCustomData[0] ? aCustomData[0].getValue() : sap.m.PlacementType.Top;
				oDiscardModel.setProperty("/placement", sPlacement);
				var oContext = oController.getView().getBindingContext();
				var oEntity = oContext.getObject();
				var bIsCreateDraft = oEntity.hasOwnProperty("HasActiveEntity") && !oContext.getProperty("IsActiveEntity") && !oContext.getProperty(
						"HasActiveEntity");
				oDiscardModel.setProperty("/isCreateDraft", bIsCreateDraft);
				oDiscardPopover.openBy(oSource);
			},

			addEntry: function(oEvent, bSuppressNavigation) {
				var oTable = oCommonUtils.getParentTable(oEvent.getSource());
				var sTablePath = oTable.getTableBindingPath();
				var oComponent = oController.getOwnerComponent();

				// check for available changes leaving the page in non-draft case
				if (!oCommonUtils.isDraftEnabled() && oController.getView().getModel().hasPendingChanges()) {
					oCommonUtils.dataLossConfirmation(function() {

						return oServices.oCRUDManager.addEntry(oTable).then(function(oTargetInfo) {
							if (!bSuppressNavigation){
								oServices.oNavigationController.navigateToContext(oTargetInfo.newContext, oTargetInfo.tableBindingPath, false);
							}
							oServices.oNavigationController.setMeToDirty(oComponent, sTablePath);
					});

				});
					return null;
				}

				return oServices.oCRUDManager.addEntry(oTable).then(function (oTargetInfo) {
					if (!bSuppressNavigation) {
						oServices.oNavigationController.navigateToContext(oTargetInfo.newContext,
							oTargetInfo.tableBindingPath, false);
					}
					oServices.oNavigationController.setMeToDirty(oComponent, sTablePath);
				});
			},
			/**
			 * Event handler for Delete on the List Report
			 * @param {sap.ui.base.Event} oEvent
			 * @public
			 */
			deleteEntries: function(oEvent) {
				var oSmartTable = oCommonUtils.getParentTable(oEvent.getSource());
				var aSelectedItems = oCommonUtils.getSelectedContexts(oSmartTable);

				if (aSelectedItems && aSelectedItems.length > 0) {
					var mJSONData = getDataForDeleteDialog(aSelectedItems);
					var oDeleteDialog = getDeleteDialog(oSmartTable);
					var oDeleteDialogModel = oDeleteDialog.getModel("delete");

					oDeleteDialogModel.setData(mJSONData);
					oDeleteDialog.open();
				} else {
					MessageBox.error(oCommonUtils.getText("ST_GENERIC_NO_ITEM_SELECTED"), {
						styleClass: oCommonUtils.getContentDensityClass()
					});
				}
			},

			onContactDetails: function(oEvent) {
				var oPopover;
				if (oEvent.getSource().data("Location") === "Header") {
					oPopover = oEvent.getSource().getParent().getAggregation("items")[0];
				} else {
					oPopover = oEvent.getSource().getParent().getParent().getParent().getParent().getParent().getAggregation(
						"items")[1];
				}
				oPopover.bindElement(oEvent.getSource().getBindingContext().getPath());
				oPopover.openBy(oEvent.getSource());
			}
		};
	}

	return BaseObject.extend("sap.suite.ui.generic.template.lib.CommonEventHandlers", {
		constructor: function(oController, oComponentUtils, oServices, oCommonUtils) {
			jQuery.extend(this, getMethods(oController, oComponentUtils, oServices, oCommonUtils));
		}
	});
});
