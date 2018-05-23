sap.ui.define(["sap/ui/base/Object"], function(BaseObject) {
	"use strict";

	function getMethods(oComponent, oComponentRegistryEntry) {
		// This promise if resolved when the element binding for the header data have been read. Note that the promise
		// stored in this variable is replaced each time the function fnRebindHeaderData is called.
		// Thus, the promise allways represents the loading of the currently relevant header data.
		var oHeaderDataAvailablePromise;

		// Registry for the event handling facility (see fnAttach, fnDetach, and fnFire)
		var aEventHandlerRegistry = [];

		function getODataLoadFailedTexts() {
			var oRB = oComponent.getModel("i18n").getResourceBundle();
			return {
				dataLoadFailedTitle: oRB.getText("ST_GENERIC_ERROR_LOAD_DATA_TITLE"),
				dataLoadFailedText: oRB.getText("ST_GENERIC_ERROR_LOAD_DATA_TEXT")
			};
		}

		function fnAttach(sTemplate, sEvent, fnFunction) {
			if (typeof fnFunction !== "function") {
				throw new Error("Event handler must be a function");
			}
			aEventHandlerRegistry.push({
				template: sTemplate,
				event: sEvent,
				handler: fnFunction
			});
		}

		function fnDetach(sTemplate, sEvent, fnFunction) {
			for (var i = aEventHandlerRegistry.length; i--;) {
				if (aEventHandlerRegistry[i].handler === fnFunction && aEventHandlerRegistry[i].event === sEvent && aEventHandlerRegistry[i].template ===
					sTemplate) {
					aEventHandlerRegistry.splice(i, 1);
				}
			}
		}

		function fnFire(sTemplate, sEvent, oEvent) {
			for (var i = 0; i < aEventHandlerRegistry.length; i++) {
				if (aEventHandlerRegistry[i].event === sEvent && aEventHandlerRegistry[i].template === sTemplate) {
					aEventHandlerRegistry[i].handler(oEvent);
				}
			}
		}

		function getTemplateName(oController) {
			return oController.getMetadata().getName();
		}

		function fnFirePageDataLoaded(oCurrentDisplay) {
			oHeaderDataAvailablePromise.then(function(oContext) {
				if (oContext && !oCurrentDisplay.outdated) {
					oCurrentDisplay.promise.then(function() {
						var oView = oComponent.getAggregation("rootControl");
						fnFire(getTemplateName(oView.getController()), "PageDataLoaded", {
							context: oContext
						});
					});
				}
			});
		}
		
		function fnDataRequested(sHeaderRequestReason){
			if (oComponentRegistryEntry.isActive){
				oComponentRegistryEntry.oApplication.setBusyReason(sHeaderRequestReason, true, false);	
			}
		}

		function fnDataReceived(sHeaderRequestReason, oEvent) {
			var oData = oEvent.getParameter("data");
			// When not data parameter is received there is usually an exception
			// TODO: show backend error messages
			if (!oData) {
				var oDataLoadFailedTexts = getODataLoadFailedTexts();
				var oNavigationController = oComponent.getAppComponent().getNavigationController();
				oNavigationController.navigateToMessagePage({
					title: oDataLoadFailedTexts.dataLoadFailedTitle,
					text: oDataLoadFailedTexts.dataLoadFailedText
				});
			}
			oComponentRegistryEntry.oApplication.setBusyReason(sHeaderRequestReason, false);
		}

		function fnChange(fnResolve, oEvent) {
			fnResolve(oEvent.getSource().getBoundContext());
		}

		function fnRebindHeaderData(sBindingPath) {
			var oParameter = {};
			var oComponentData = oComponent.getComponentData();
			if (oComponentData && oComponentData.preprocessorsData && oComponentData.preprocessorsData.rootContextExpand && oComponentData.preprocessorsData
				.rootContextExpand.length) {
				oParameter.expand = oComponentData.preprocessorsData.rootContextExpand.join(",");
			}
			var sHeaderRequestReason = "HeaderRequest::" + oComponent.getId() + "::" + sBindingPath;
			oHeaderDataAvailablePromise = new Promise(function(fnResolve) {
				oComponent.getComponentContainer().bindElement({
					path: sBindingPath,
					events: {
						dataRequested: fnDataRequested.bind(null, sHeaderRequestReason),
						dataReceived: fnDataReceived.bind(null, sHeaderRequestReason),
						change: fnChange.bind(null, fnResolve)
					},
					parameters: oParameter,
					batchGroupId: "Changes", // get navigation controller constant?
					changeSetId: "Changes"
				});
			});
		}

		return {
			setEditableNDC: function(bIsEditable) {
				oComponentRegistryEntry.oApplication.setEditableNDC(bIsEditable);
			},
			getEditableNDC: function() {
				return oComponentRegistryEntry.oApplication.getEditableNDC();
			},

			getCreateMode: function(sBindingPath) {
				var oEntity;
				var oModel = oComponent.getModel();

				if (sBindingPath) {
					if (oModel) {
						oEntity = oModel.getProperty(sBindingPath);
					}
				} else {
					var oContext = oComponent.getBindingContext();
					if (oContext) {
						oEntity = oContext.getObject();
					}
				}

				// workaround until ODataModel provides method
				return !!(oEntity && oEntity.__metadata && oEntity.__metadata.created);
			},

			attach: function(oController, sEvent, fnFunction) {
				fnAttach(getTemplateName(oController), sEvent, fnFunction);
			},
			detach: function(oController, sEvent, fnFunction) {
				fnDetach(getTemplateName(oController), sEvent, fnFunction);
			},
			fire: function(oController, sEvent, oEvent) {
				fnFire(getTemplateName(oController), sEvent, oEvent);
			},

			addDataForNextPage: function(oDataBag) {
				oComponentRegistryEntry.oApplication.addDataForNextPage(oDataBag);
			},

			getCurrentDisplayObject: function() {
				return oComponentRegistryEntry.oApplication.getCurrentDisplayObject();
			},

			rebindHeaderData: fnRebindHeaderData,

			bindComponent: function(sBindingPath) {

				if (sBindingPath) {
					var oComponentContainer = oComponent.getComponentContainer();
					if (oComponentContainer) {
						var oSettings = oComponentContainer.getSettings();
						if (oSettings.routeConfig && oSettings.routeConfig.component && oSettings.routeConfig.component.list) {
							var sNavProp = oComponentContainer.getSettings().routeConfig.navigationProperty;
							/*
							 * for long table: cut off navigation property as this should not be set for the whole page - navigation
							 * property will be set in the smart table fragment (tableBindingPath)
							 */
							var sBindingPathWithoutNavProp = sBindingPath.substring(0, sBindingPath.lastIndexOf("/" + sNavProp));
							if (sBindingPathWithoutNavProp) {
								sBindingPath = sBindingPathWithoutNavProp;
							}
						}
						if (oComponentRegistryEntry.utils.getCreateMode(sBindingPath)) {
							oComponentContainer.unbindElement();
							oComponentContainer.setBindingContext(oComponentContainer.getModel().getContext(sBindingPath));
						} else {
							var oCurrentDisplay = oComponentRegistryEntry.oApplication.getCurrentDisplayObject();
							var oElementBinding = oComponentContainer.getElementBinding();
							if (oElementBinding && oElementBinding.getPath() === sBindingPath) {
								/*
								 * component is already bound to this object - no rebound to avoid that 1:1, 1:N and expands are read
								 * again
								 */
								fnFirePageDataLoaded(oCurrentDisplay);
								return false;
							}
							fnRebindHeaderData(sBindingPath);
							// set the UI model to not editable / enabled as long as the binding data is read
							var oUIModel = oComponent.getModel("ui");
							oUIModel.setProperty("/enabled", false);
							oUIModel.setProperty("/editable", false);

							fnFirePageDataLoaded(oCurrentDisplay);
						}
					}
				}
			}
		};
	}

	return BaseObject.extend("sap.suite.ui.generic.template.lib.ComponentUtils.js", {
		constructor: function(oComponent, oComponentRegistryEntry) {
			jQuery.extend(this, getMethods(oComponent, oComponentRegistryEntry));
		}
	});
});