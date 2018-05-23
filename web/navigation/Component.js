sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"navigation/model/models"
], function(UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("navigation.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);
			this.components = {};
			// set the device model
			this.setModel(models.createDeviceModel(), "device");
		},

		getComponent: function (sComponent, bManifest) {
            function getInstance() {
                return (new Promise((resolve, reject) => {
                    resolve(sap.ui.component({
                        name: sComponent,
                        manifest: bManifest,
                        componentData: {}
                    }));
                }));
            }
            return (new Promise((resolve, reject) => {
                if (this.components[sComponent]) {
                    resolve(this.components[sComponent]);
                } else {
                    this.components[sComponent] = getInstance();
                    resolve(this.components[sComponent]);
                }
            }));
        },
	});
});