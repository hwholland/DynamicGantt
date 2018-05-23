sap.ui
	.define(["sap/ui/core/mvc/View", "sap/ui/model/resource/ResourceModel", "sap/suite/ui/generic/template/lib/TemplateViewController",
			"sap/suite/ui/generic/template/lib/TemplateComponent", "sap/suite/ui/generic/template/lib/Application",
			"sap/suite/ui/generic/template/lib/CRUDManager", "sap/suite/ui/generic/template/lib/CommonUtils",
			"sap/suite/ui/generic/template/lib/ComponentUtils", "sap/suite/ui/generic/template/lib/CommonEventHandlers"
		],
		function(View, ResourceModel, TemplateViewController, TemplateComponent, Application, CRUDManager, CommonUtils,
			ComponentUtils, CommonEventHandlers) {
			"use strict";

			var fnAppInit; // used for temporary storage

			var mAppRegistry = {};
			var mComponentRegistry = {};
			var mControllerRegistry = {};

			var oRB; // initialized on demand
			function getText() {
				oRB = oRB || new ResourceModel({
					bundleName: "sap/suite/ui/generic/template/lib/i18n/i18n"
				}).getResourceBundle();
				return oRB.getText.apply(oRB, arguments);
			}
			
			function getAppRegistryEntry(oAppComponent, bRemove) {
				var sId = oAppComponent.getId();
				var oRet = mAppRegistry[sId];
				if (bRemove) {
					delete mAppRegistry[sId];
				}
				return oRet;
			}

			function getDialogFragmentFunction(oAppComponent) {
				return function() {
					var oAppRegistryEntry = getAppRegistryEntry(oAppComponent);
					if (oAppRegistryEntry.oActiveComponentRegistryEntry && oAppRegistryEntry.oActiveComponentRegistryEntry.oController) {
						var oView = oAppRegistryEntry.oActiveComponentRegistryEntry.oController.getView();
						var sId = oView.getId();
						return mControllerRegistry[sId].oTemplateUtils.oCommonUtils.getDialogFragment.apply(null, arguments);
					} // open: do we need a else
				};
			}

			function getComponentRegistryEntry(oComponent) {
				return mComponentRegistry[oComponent.getId()];
			}

			function fnFindView(oControl) {
				while (oControl && !(oControl instanceof View)) {
					oControl = oControl.getParent();
				}
				return oControl;
			}
			
			function fnGetComponentRegistryEntryForControl(oControl) {
				while (oControl) {
					var oView = fnFindView(oControl);
					var oController = oView && oView.getController();
					var oComponent = oController && oController.getOwnerComponent();
					if (oComponent instanceof TemplateComponent) {
						var oComponentRegistryEntry = getComponentRegistryEntry(oComponent);
						return oComponentRegistryEntry;
					} else {
						oControl = oComponent && oComponent.oContainer;
					}
				}
			}

			return {
				getTemplateController: function(getMethods, sControllerName, oControllerDefinition) {
					oControllerDefinition = oControllerDefinition || {};

					oControllerDefinition.constructor = function() {
						var oTemplateUtils = {};
						var oMethods = getMethods(oTemplateUtils, this);
						this._templateEventHandlers = Object.freeze(oMethods.handlers || {});
						this._templateFormatters = Object.freeze(oMethods.formatters || {});
						this.extensionAPI = Object.freeze(oMethods.extensionAPI || {});
						this.fnGenericOnInit = function(oController) {
							var oView = oController.getView();
							var sId = oView.getId();
							jQuery.sap.log.info("Init view " + sId + " of template " + sControllerName);
							mControllerRegistry[sId] = {
								onExit: oMethods.onExit || jQuery.noop,
								oTemplateUtils: oTemplateUtils
							};
							var oComponent = oController.getOwnerComponent();
							var oComponentRegistryEntry = getComponentRegistryEntry(oComponent);
							oTemplateUtils.oComponentUtils = oComponentRegistryEntry.utils;
							oTemplateUtils.oComponentAPI = oComponentRegistryEntry.methods.forView;
							var oAppComponent = oComponent.getAppComponent();
							var oAppRegistryEntry = getAppRegistryEntry(oAppComponent);
							var oTransactionController = oAppComponent.getTransactionController();
							oTemplateUtils.oServices = {
								oApplicationController: oAppComponent.getApplicationController(),
								oTransactionController: oTransactionController,
								oNavigationController: oAppComponent.getNavigationController(),
								oDraftController: oTransactionController.getDraftController()
							};
							oTemplateUtils.oServices.oApplicationController.registerView(oView);
							oTemplateUtils.oCommonUtils = new CommonUtils(oController, oTemplateUtils.oServices);
							oTemplateUtils.oServices.oCRUDManager = new CRUDManager(oController,
								oTemplateUtils.oComponentUtils, oTemplateUtils.oServices, oTemplateUtils.oCommonUtils, oAppRegistryEntry.oTemplateContract.oBusyHelper
							);
							oTemplateUtils.oCommonEventHandlers = new CommonEventHandlers(oController,
								oTemplateUtils.oComponentUtils, oTemplateUtils.oServices, oTemplateUtils.oCommonUtils);
							oView.addStyleClass(oTemplateUtils.oCommonUtils.getContentDensityClass());
							(oMethods.onInit || jQuery.noop)();
							// Note: This relies on the fact, that there is a 1-1 relationship between TemplateView and
							// TemplateComponent.
							// If we introduce Templates using more then one view, this must be reworked.
							oComponentRegistryEntry.fnViewRegisteredResolve(oMethods.onBeforePageDisplay || jQuery.noop);
							oComponentRegistryEntry.oController = this;
							delete oComponentRegistryEntry.fnViewRegisteredResolve;
						};
					};

					oControllerDefinition.onInit = function() {
						this.fnGenericOnInit(this);
						delete this.fnGenericOnInit;
					};
					oControllerDefinition.onExit = function() {
						var sId = this.getView().getId();
						mControllerRegistry[sId].onExit();
						delete mControllerRegistry[sId];
						jQuery.sap.log.info("View " + sId + " of template " + sControllerName + " exited");
					};

					return TemplateViewController.extend(sControllerName, oControllerDefinition);
				},

				getTemplateComponent: function(getMethods, sComponentName, oComponentDefinition) {
					oComponentDefinition = oComponentDefinition || {};

					oComponentDefinition.init = function() {
						var oComponentRegistryEntry = {};
						var oViewRegisteredPromise = new Promise(function(fnResolve) {
							oComponentRegistryEntry.fnViewRegisteredResolve = fnResolve;
						});
						(TemplateComponent.prototype.init || jQuery.noop).apply(this, arguments);
						oComponentRegistryEntry.componentName = sComponentName;
						oComponentRegistryEntry.oComponent = this;
						oComponentRegistryEntry.utils = new ComponentUtils(this, oComponentRegistryEntry);
						oComponentRegistryEntry.methods = getMethods(this, oComponentRegistryEntry.utils) || {};
						oComponentRegistryEntry.viewRegisterd = oViewRegisteredPromise;
						oComponentRegistryEntry.oGenericData = {
							mRefreshInfos: {}
						};
						mComponentRegistry[this.getId()] = oComponentRegistryEntry;
						var oOverwrite = jQuery.extend({}, oComponentRegistryEntry.methods.overwrite);
						delete oOverwrite.init;
						delete oOverwrite.exit;
						delete oOverwrite.setContainer;
						delete oOverwrite.onActivate;
						jQuery.extend(this, oOverwrite);
						(oComponentRegistryEntry.methods.init || jQuery.noop)();
					};

					oComponentDefinition.exit = function() {
						var sId = this.getId();
						var oMethods = getComponentRegistryEntry(this).methods;
						(oMethods.exit || jQuery.noop)();
						delete mComponentRegistry[sId];
						(TemplateComponent.prototype.exit || jQuery.noop).apply(this, arguments);
					};

					var sCurrentBindingPath;

					oComponentDefinition.onActivate = function(sBindingPath) {
						sCurrentBindingPath = sBindingPath;
						var oAppComponent = this.getAppComponent();
						var oAppRegistryEntry = getAppRegistryEntry(oAppComponent);
						if (oAppRegistryEntry.oActiveComponentRegistryEntry){
						    oAppRegistryEntry.oActiveComponentRegistryEntry.isActive = false;    
						}
						oAppRegistryEntry.oActiveComponentRegistryEntry = getComponentRegistryEntry(this);
						oAppRegistryEntry.oActiveComponentRegistryEntry.isActive = true;
						oAppRegistryEntry.oActiveComponentRegistryEntry.viewRegisterd.then(
							function(onBeforePageDisplay) {
								oAppRegistryEntry.oActiveComponentRegistryEntry.utils.bindComponent(sCurrentBindingPath);
								// needed to always filter the messages - triggers formatters like showMessagesButton in the xml views
								// one of the triggered formatters is getMessageCount which needs the correct new bindingPath which is set via bindComponent
								this.getModel("message").refresh(true);
								onBeforePageDisplay();
								var bUnconditionalRefresh = this.getIsRefreshRequired();
								if (bUnconditionalRefresh || !jQuery.isEmptyObject(oAppRegistryEntry.oActiveComponentRegistryEntry.oGenericData.mRefreshInfos)) {
									(oAppRegistryEntry.oActiveComponentRegistryEntry.methods.refreshBinding || jQuery.noop)(bUnconditionalRefresh, bUnconditionalRefresh ? {} :
										oAppRegistryEntry.oActiveComponentRegistryEntry.oGenericData.mRefreshInfos);
									this.setIsRefreshRequired(false);
									oAppRegistryEntry.oActiveComponentRegistryEntry.oGenericData.mRefreshInfos = {};
								}
								(oAppRegistryEntry.oActiveComponentRegistryEntry.methods.onActivate || jQuery.noop)(sBindingPath);
							}.bind(this)
						);
					};

					oComponentDefinition.setContainer = function() {
						TemplateComponent.prototype.setContainer.apply(this, arguments);
						var oComponentRegistryEntry = getComponentRegistryEntry(this);
						if (!oComponentRegistryEntry.oApplication) {
							var oAppComponent = this.getAppComponent();
							var oAppRegistryEntry = getAppRegistryEntry(oAppComponent);
							oAppRegistryEntry.oTemplateContract.oBusyHelper.setBusy(oComponentRegistryEntry.viewRegisterd, true);
							oComponentRegistryEntry.oApplication = oAppRegistryEntry.application;
						}
						(oComponentRegistryEntry.methods.setContainer || jQuery.noop)();
					};

					oComponentDefinition.onDeactivate = jQuery.noop;

					return TemplateComponent.extend(sComponentName, oComponentDefinition);
				},

				getAppComponent: function(getMethods, baseClass, sAppComponentName, oComponentDefinition) {
					oComponentDefinition = oComponentDefinition || {};

					oComponentDefinition.constructor = function() {
						var oAppRegistryEntry = {
							appComponent: this,
							oTemplateContract: {
							componentRegistry: mComponentRegistry,
							getDialogFragment: getDialogFragmentFunction(this),
							getText: getText,
							hasView: function(){
								return !!(oAppRegistryEntry.oActiveComponentRegistryEntry && oAppRegistryEntry.oActiveComponentRegistryEntry.oController);
								}
							}
						};
						oAppRegistryEntry.application = new Application(oAppRegistryEntry.oTemplateContract);
						oAppRegistryEntry.methods = getMethods(this, oAppRegistryEntry.oTemplateContract);
						var oPublicMethods = jQuery.extend({}, oAppRegistryEntry.methods.publicMethods);
						delete oPublicMethods.init;
						delete oPublicMethods.exit;
						jQuery.extend(this, oPublicMethods);
						fnAppInit = oAppRegistryEntry.methods.init || jQuery.noop;
						(baseClass.prototype.constructor || jQuery.noop).apply(this, arguments);
						mAppRegistry[this.getId()] = oAppRegistryEntry;
					};

					oComponentDefinition.init = function() {
						(baseClass.prototype.init || jQuery.noop).apply(this, arguments);
						fnAppInit();
						fnAppInit = null;
					};

					oComponentDefinition.exit = function() {
						var oRegistryEntry = getAppRegistryEntry(this, true);
						(oRegistryEntry.methods.exit || jQuery.noop)();
						(baseClass.prototype.exit || jQuery.noop).apply(this, arguments);
					};

					return baseClass.extend(sAppComponentName, oComponentDefinition);
				},

				getExtensionAPIPromise: function(oControl) {
					var oComponentRegistryEntry = fnGetComponentRegistryEntryForControl(oControl);
					if (!oComponentRegistryEntry){
						return Promise.reject();
					}
					return oComponentRegistryEntry.viewRegisterd.then(function(){
						return oComponentRegistryEntry.oController.extensionAPI;	
					});
				},

				getExtensionAPI: function(oControl) {
					var oComponentRegistryEntry = fnGetComponentRegistryEntryForControl(oControl);
					return oComponentRegistryEntry && oComponentRegistryEntry.oController && oComponentRegistryEntry.oController.extensionAPI;
				}
			};
		});