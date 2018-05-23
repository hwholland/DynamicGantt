/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */

// Provides inactive support for controls
sap.ui.define(["jquery.sap.global", "sap/ui/core/UIComponent", "sap/ui/model/json/JSONModel",
		"sap/suite/ui/generic/template/extensionAPI/extensionAPI"
	],
	function(jQuery, UIComponent, JSONModel, extensionAPI) {
		"use strict";
		var ReuseComponentSupport = {},
			sJQueryDebugLogName = "sap.suite.ui.generic.template.extensionAPI.ReuseComponentSupport";

		function fnAttachContextReady(oControl, fnCallback) {
			oControl.attachEvent("modelContextChange", function() {
				var oDefaultModelBindingContext = this.getBindingContext(),
					oModel = oControl.getModel(),
					oParameter = {
						defaultModelAvailable: !!oModel,
						model: oModel,
						bindingContextPath: oDefaultModelBindingContext && oDefaultModelBindingContext.getPath(),
						bindingContext: oDefaultModelBindingContext,
						firstTime: oControl._stContext.firstTime
					};
				jQuery.sap.log.debug(oControl.getId() + ":" + oControl.getMetadata().getName() + ": modelAvailable=" + oParameter.defaultModelAvailable +
					" : context=" + oParameter.bindingContextPath, sJQueryDebugLogName);
				if (oParameter.defaultModelAvailable && oParameter.bindingContextPath && oControl._stContext.lastBindingContextPath !==
					oParameter.bindingContextPath) {
					//Remember the current binding context
					oControl._stContext.lastBindingContextPath = oParameter.bindingContextPath;
					if (oControl._stContext.firstTime) {
						oControl._stContext.extensionAPIPromise = extensionAPI.getExtensionAPIPromise(this.oContainer);
						oControl._stContext.firstTime = false;
					}
					//Context has changed
					fnCallback(oParameter, oControl._stContext.extensionAPIPromise);
				}
			});
		}

		function fnDefaultOnAttachContextReady(oParameter, oExtensionAPIPromise) {
			// Determine the callback to be called. On the first call it is this.stStart, if this function exists. On subsequent calls (or if this.stStart does not exist) it is this.stRefresh.
			var fnCurrentCallback = (oParameter.firstTime && this.stStart) || this.stRefresh;
			if (fnCurrentCallback){
				// The callback is called as soon as the extensionAPI is available. Note that the promise resolves to the extensionAPI. Thus, we finally call fnCurrentCallback(oParameter.model, oParameter.bindingContext, oExtensionAPI).
				oExtensionAPIPromise.then(fnCurrentCallback.bind(this, oParameter.model, oParameter.bindingContext));
			}
		}

		function getComponentModel() {
			/* It maybe helpful to have a model that allows to access all properties via data binding
			 * so they can be used declaratively in views of the components
			 */
			if (!this._oComponentModel) {
				this._oComponentModel = new JSONModel({});
			}
			return this._oComponentModel;
		}

		function mixInto(oComponent, sComponentModelName) {
			/* Initialize smart template context at component */
			oComponent._stContext = {
				lastBindingContextPath: "",
				firstTime: true
			};

			//Only subscribe to events if the reuse components shows interest by defining the corresponding functions
			if (oComponent.stRefresh || oComponent.stStart) {
				fnAttachContextReady(oComponent, fnDefaultOnAttachContextReady.bind(oComponent));
			}

			//Create component model in case specified
			if (sComponentModelName) {
				//overwrite set property
				oComponent.setProperty = function(sName, value) {
					/* we overwrite the set property function of UI5 to automatically update the component model
					 * but first we need to call the original (aka super in other languages)
					 */
					UIComponent.prototype.setProperty.apply(this, arguments);
					this.getComponentModel().setProperty("/" + sName, value);
					jQuery.sap.log.debug(this.getId() + ":" + this.getMetadata().getName() + ": setProperty " + sName + "=" + value, sJQueryDebugLogName);
				};
				oComponent.getComponentModel = getComponentModel.bind(oComponent);
				oComponent.setModel(oComponent.getComponentModel(), sComponentModelName);
			}
			//.........expose extensionAPI
		}

		/**
		 * Mixin function to transform a regular UIComponent instance into a reuse component for smart templates
		 *
		 * By using the mixInto method the existing component is checked if it implements the following functions:
		 * <ul>
		 *  <li>stStart(oModel, oBindingContext, oExtensionAPI) - is called when the model and the context is set for the first time above the compoenent</li>
		 *  <li>stRefresh(oModel, oBindingContext, oExtensionAPI) - is called everytime a new context is set above the component</li>
		 * </ui>
		 *
		 * @name sap.suite.ui.generic.template.extensionAPI.ReuseComponentSupport.mixInto
		 * @param {sap.ui.core.UIComponent} oComponent instance of UIComponent
		 * @param {string} componentModelName if set it will create a component model of the properties of a component and set the model to the component
		 *
		 * @private
		 */
		ReuseComponentSupport.mixInto = function(oComponent, sComponentModelName) {
		    jQuery.sap.assert(oComponent instanceof UIComponent, "ReuseComponentSupport: mixinto expects an implementation of sap.ui.core.UIComponent for", oComponent.getMetadata().getName());
			mixInto(oComponent, sComponentModelName);
		};

		return ReuseComponentSupport;
	});