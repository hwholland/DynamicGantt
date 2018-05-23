(function() {
	"use strict";
	/*global jQuery, sap */

	jQuery.sap.declare("sap.ovp.cards.linklist.Component");
	jQuery.sap.require("sap.ovp.cards.generic.Component");
	jQuery.sap.require("sap.ovp.cards.linklist.AnnotationHelper");

	sap.ovp.cards.generic.Component.extend("sap.ovp.cards.linklist.Component", {
		// use inline declaration instead of component.json to save 1 round trip

		metadata: {
			properties: {
				"contentFragment": {
					"type": "string",
					"defaultValue": "sap.ovp.cards.linklist.LinkList"
				},
				"annotationPath": {
					"type": "string",
					"defaultValue": "com.sap.vocabularies.UI.v1.HeaderInfo"
				},
				"communicationPath": {
					"type": "string",
					"defaultValue": "com.sap.vocabularies.Communication.v1.Contact"
				}				
			},

			version: "1.38.10",

			library: "sap.ovp",

			includes: [],

			dependencies: {
				libs: ["sap.m"],
				components: []
			},
			config: {},
			customizing: {
				"sap.ui.controllerExtensions": {
					"sap.ovp.cards.generic.Card": {
						controllerName: "sap.ovp.cards.linklist.LinkList"
					}
				}
			}
		},

		getCustomPreprocessor: function() {
		}
	});
})();