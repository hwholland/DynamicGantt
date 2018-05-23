/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */

// ----------------------------------------------------------------------------------
// Provides base class sap.suite.ui.generic.template.lib.AppComponent for all generic app components
// ----------------------------------------------------------------------------------
sap.ui.define([
	"sap/ui/core/UIComponent", "sap/m/NavContainer", "sap/ui/generic/app/ApplicationController",
	"sap/suite/ui/generic/template/lib/BusyHelper",
	"sap/suite/ui/generic/template/lib/NavigationController",
	"sap/suite/ui/generic/template/lib/TemplateAssembler",
	"sap/suite/ui/generic/template/library"
], function(UIComponent, NavContainer, ApplicationController, BusyHelper, NavigationController, TemplateAssembler) {
	"use strict";

	function getMethods(oAppComponent, oTemplateContract) {

		var oApplicationController;
		var oNavigationController;

		var oConfig; // initialized on demand
		function getConfig() {
			if (!oConfig) {
				var oMeta = oAppComponent.getMetadata();
				oConfig = oMeta.getManifestEntry("sap.ui.generic.app");
			}
			return oConfig;
		}

		return {
			init: function() {
				var oModel = oAppComponent.getModel();
				if (oModel) {
					// workaround until Modules Factory is available
					oApplicationController = new ApplicationController(oModel);
					oNavigationController = new NavigationController(oAppComponent, oTemplateContract);

					oApplicationController.attachEvent("beforeSideEffectExecution", function(oEvent){
						if (oEvent.getParameter("valueChange") || oEvent.getParameter("fieldControl")){
							var oPromise = oEvent.getParameter("promise");
							oTemplateContract.oBusyHelper.setBusy(oPromise);
						}
					});

					// Error handling for erroneous metadata request
					// TODO replace access to oModel.oMetadata with official API call when available (recheck after 03.2016)
					// TODO move error handling to central place (e.g. create new MessageUtil.js)
					if (!oModel.oMetadata || !oModel.oMetadata.isLoaded()) {
						oModel.attachMetadataFailed(
							function() {
								oNavigationController.navigateToMessagePage({
									title: oTemplateContract.getText("ST_GENERIC_ERROR_LOAD_DATA_TITLE"),
									text: oTemplateContract.getText("ST_GENERIC_ERROR_LOAD_DATA_TEXT")
								});
							});
					} else if (oModel.oMetadata.isFailed()) {
						oNavigationController.navigateToMessagePage({
							title: oTemplateContract.getText("ST_GENERIC_ERROR_LOAD_DATA_TITLE"),
							text: oTemplateContract.getText("ST_GENERIC_ERROR_LOAD_DATA_TEXT")
						});
					}
				}
				oTemplateContract.oBusyHelper.setBusyReason("initAppComponent", false);
			},
			exit: function() {
				if (oTemplateContract.oNavContainer) {
					oTemplateContract.oNavContainer.destroy();
				}
				if (oApplicationController) {
					oApplicationController.destroy();
				}
				if (oNavigationController) {
					oNavigationController.destroy();
				}
			},
			publicMethods: {
				createContent: function() {
					// Method must only be called once
					if (oTemplateContract.oNavContainer){
						return "";
					}
					// assign message model
					oAppComponent.setModel(sap.ui.getCore().getMessageManager().getMessageModel(), "message");

					oTemplateContract.oNavContainer = new NavContainer({
						id: oAppComponent.getId() + "-appContent"
					});
					oTemplateContract.oBusyHelper = new BusyHelper(oTemplateContract);
					oTemplateContract.oBusyHelper.setBusyReason("initAppComponent", true, true);
					// TODO: Check
					if (sap.ui.Device.system.desktop) {
						oTemplateContract.oNavContainer.addStyleClass("sapUiSizeCompact");
					}
					// done
					oTemplateContract.oNavContainer.attachAfterNavigate(oTemplateContract.oApplication.onAfterNavigate);
					return oTemplateContract.oNavContainer;
				},

				getConfig: getConfig,

				getTransactionController: function() {
					return oApplicationController.getTransactionController();
				},

				getApplicationController: function() {
					return oApplicationController;
				},

				/*
				 * Returns the reference to the navigation controller instance that has been created by AppComponent.
				 *
				 * @returns {sap.suite.ui.generic.template.lib.NavigationController} the navigation controller instance
				 * @public
				 */
				getNavigationController: function() {
					return oNavigationController;
				}
			}
		};
	}

	var AppComponent = TemplateAssembler.getAppComponent(getMethods, UIComponent, "sap.suite.ui.generic.template.lib.AppComponent", {
		metadata: {
			config: {
				"title": "SAP UI Application Component", // TODO: This should be set from App descriptor
				fullWidth: true
			},
			routing: {
				config: {
					routerClass: "sap.m.routing.Router",
					viewType: "XML",
					viewPath: "",
					clearTarget: false
				},
				routes: []
			},
			library: "sap.suite.ui.generic.template"
		}
	});
	delete TemplateAssembler.getAppComponent; // this method is used exactly once (in order to instantiate this class)
	return AppComponent;
});
