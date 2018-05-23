jQuery.sap.require("sap.ui.core.CustomizingConfiguration");
(function() { 
	"use strict";
	// monkey patch the sap.ui.core.CustomizingConfiguration
	// as UI5 doesn't support viewExtensions for nested components we replace the
	// component in vObject
	// with the parent component. The getAppComponent function comes from the
	// component property appComponent
	// in sap.ui.generic.template.TemplateComponent.js
	var fOriginal = sap.ui.core.CustomizingConfiguration.getViewExtension;
	sap.ui.core.CustomizingConfiguration.getViewExtension = function(sViewName, sExtensionPointName, vObject) {
		// check whether a context is given and determine a componentId from it
		// - either it is a string, then this is the pre-processor use case and the
		// string is a component id
		// - or it is a view or fragment and the Id of the owner component should be
		// used
		var sComponentId = vObject && typeof vObject === "string" ? vObject : (vObject && sap.ui.core.Component
				.getOwnerIdFor(vObject));
		// retrieve the component (if an Id is known)
		var oComponent = sComponentId && sap.ui.component(sComponentId);
		// only when it inherits from TemplateComponent, ask for the AppComponent
		// instead
		if (oComponent instanceof sap.suite.ui.generic.template.lib.TemplateComponent) {
			vObject = oComponent.getAppComponent().getId();
		}
		var oResultConfig = fOriginal(sViewName, sExtensionPointName, vObject);
		return oResultConfig;
	};

	// monkey patch for controller extension
	var fOriginal2 = sap.ui.core.CustomizingConfiguration.getControllerExtension;

	sap.ui.core.CustomizingConfiguration.getControllerExtension = function(sControllerName, sComponentID) {

		var oComponent = null;
		if (sComponentID) {
			oComponent = sap.ui.component(sComponentID);

			if (oComponent instanceof sap.suite.ui.generic.template.lib.TemplateComponent) {
				oComponent = oComponent.getAppComponent();
				if (oComponent) {
					sComponentID = oComponent.getId();
				}
			}
		}
		var oResultConfig = fOriginal2(sControllerName, sComponentID);
		return oResultConfig;
	};

	sap.ui.define(["sap/ui/core/mvc/ViewType", "sap/ui/core/UIComponent", "sap/ui/model/json/JSONModel", "sap/ui/model/resource/ResourceModel",
		"sap/ui/Device", "sap/suite/ui/generic/template/js/AnnotationHelper"], 
		function(ViewType, UIComponent, JSONModel, ResourceModel, Device) {

		// This method enhances the i18n model which has been attached to the template component via the manifest.
		// For this purpose the following enhancement chain is built:
		// Generic Template texts <- Template specific texts <- Application specific texts
		// Note that the i18n model is actually replaced since the generic template texts are used as basis for this enhacement chain.
		function fnEnhanceI18nModel(oComponent) {
			var oI18NModel = new ResourceModel({ bundleName: "sap/suite/ui/generic/template/lib/i18n/i18n" });
			var oTemplateModel = oComponent.getModel("i18n");
			if (oTemplateModel){
				oI18NModel.enhance(oTemplateModel.getResourceBundle())	;
			}
			var oModelApplication = oComponent.getAppComponent().getModel("i18n|" + oComponent.getMetadata().getComponentName() + "|" + oComponent.getEntitySet());
			if (oModelApplication) {
				oI18NModel.enhance(oModelApplication.getResourceBundle());
			}
			oComponent.setModel(oI18NModel, "i18n");
		}
		
		function fnDetermineStableID(oComponent) {
			if (oComponent.getAppComponent().getMetadata().getComponentName() === "" || oComponent.getTemplateName() === "" || oComponent.getEntitySet() === "") {
				// TODO: Error Handling
			}
			return oComponent.getAppComponent().getMetadata().getComponentName() + "::" + oComponent.getTemplateName() + "::" + oComponent.getEntitySet();
		}
		
		function createParameterModel(sEntityType, oComponent) {
			var isDraftEnabled = oComponent.getAppComponent().getTransactionController().getDraftController().getDraftContext().isDraftEnabled(oComponent.getEntitySet());
			var oSettings = null;
			var oAllSettings = oComponent.getComponentContainer().getSettings(); // this should have all settings passed to the component during creation

			// create settings section in parameter model with all settings passed to
			// the component
			oSettings = jQuery.extend({}, oAllSettings);

			// remove properties not needed or available on the component itself
			delete oSettings.appComponent;
			delete oSettings.entitySet;
			delete oSettings.navigationProperty;

			return new JSONModel({
				entitySet: oComponent.getEntitySet(),
				entityType: sEntityType,
				"sap-ui-debug": window["sap-ui-debug"],
				isDraftEnabled: isDraftEnabled,
				"settings": oSettings,
				"manifest": oComponent.getAppComponent().getMetadata().getManifest()
			});
		}
		
		function createXMLView(oComponent) {
			var oView = null;		

			var oMetaModel = oComponent.getModel().getMetaModel();
			var oEntitySet = oMetaModel.getODataEntitySet(oComponent.getEntitySet());
			if (!oEntitySet || !oEntitySet.entityType) {
				// TODO: Error Handling?
				return null;
			}

			fnEnhanceI18nModel(oComponent);
			
			try {
				var sStableId = fnDetermineStableID(oComponent);
				
				oView = sap.ui.getCore().byId(sStableId);
				if (oView){
					jQuery.sap.log.warning("View with ID: " + sStableId + " already exists - old view is getting destroyed now!");
					try {
						oView.destroy();
					} catch (ex) {
						jQuery.sap.log.error("Error destroying view: " + ex);
					}
					oView = null;
				}
				
				// device model
				var oDeviceModel = new JSONModel(Device);
				oDeviceModel.setDefaultBindingMode("OneWay");
				
				oView = sap.ui.view({
					preprocessors: {
						xml: {
							bindingContexts: {
								meta: oMetaModel.createBindingContext(oMetaModel.getODataEntityType(oEntitySet.entityType, true)),
								entitySet: oMetaModel.createBindingContext(oMetaModel.getODataEntitySet(oComponent.getEntitySet(), true))
							},
							models: {
								device: oDeviceModel,
								meta: oMetaModel,
								entitySet: oMetaModel,
								parameter: createParameterModel(oEntitySet.entityType, oComponent)
							},
							preprocessorsData : oComponent.getComponentData().preprocessorsData
						}
					},
					id: sStableId,
					type: ViewType.XML,
					viewName: oComponent.getTemplateName(),
					height: "100%"
				});
			} catch (e) {
				// TODO: Error Handling?
				// forward exception
				throw e;
			}
			return oView;
		}
		
				
		return UIComponent.extend("sap.suite.ui.generic.template.lib.TemplateComponent", {

			metadata: {
				properties: {
					/**
					 * Name of template
					 */
					templateName: {
						type: "string",
						defaultValue: null
					},
					/**
					 * Entity Set
					 */
					entitySet: {
						type: "string",
						defaultValue: null
					},
					/**
					 * Navigation property of the current component
					 */
					navigationProperty: {
						type: "string",
						defaultValue: null
					},
					/**
					 * Instance of AppComponent
					 */
					appComponent: {
						type: "object",
						defaultValue: null
					},
					/**
					 * Refresh required when the component is activated
					 */
					isRefreshRequired: {
						type: "boolean",
						defaultValue: false
					},
					isLeaf: {
						type: "boolean"
					}
				},
				library: "sap.suite.ui.generic.template"
			},

			init: function() {

				(UIComponent.prototype.init || jQuery.noop).apply(this, arguments);

				var oUIModel = new JSONModel({
					editable: false,
					enabled: false
				});
				this.setModel(oUIModel, "ui");

				var oParsingSerive = sap.ushell && sap.ushell.Container && sap.ushell.Container.getService("URLParsing");

				var oTemplatePrivate = new JSONModel({
					generic: {
						crossAppNavSupport: !!oParsingSerive && oParsingSerive.isIntentUrl(document.URL),
						draftIndicatorState: sap.m.DraftIndicatorState.Clear
					}
				});
				oTemplatePrivate.setDefaultBindingMode("OneWay");
				this.setModel(oTemplatePrivate, "_templPriv");

			},
			
			// TODO: clarify with Marcel: this.oContainer
			getComponentContainer: function() {
				// TODO: align with UI5 - how to access component container
				return this.oContainer;
			},
			
			// TODO: align with UI5 - how to access component container (applies to
			// several places)
			// Overwrite method of UIComponent
			setContainer: function() {
				var oModel;
				// call overwritten setContainer (sets this.oContainer)
				UIComponent.prototype.setContainer.apply(this, arguments);
				if (this.oContainer) {
					oModel = this.oContainer.getModel();
					if (oModel) {
						oModel.getMetaModel().loaded().then(function() {
							// Do the templating once the metamodel is loaded
							this.runAsOwner(function() {
								var oView = createXMLView(this);
								this.setAggregation("rootControl", oView);
								this.oContainer.invalidate();
							}.bind(this));
						}.bind(this));
					}
				}
			},
			
			// Overwrite method of UIComponent
			getRouter: function() {
				if (this.getAppComponent()) {
					return this.getAppComponent().getRouter();
				}
				return UIComponent.prototype.getRouter.apply(this, arguments);
			}

		});
	});

})();