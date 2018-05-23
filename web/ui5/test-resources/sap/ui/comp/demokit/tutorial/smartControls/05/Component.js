sap.ui.define([
	'sap/ui/core/UIComponent'
], function(UIComponent) {
	"use strict";

	var Component = UIComponent.extend("sap.ui.comp.tutorial.smartControls.05.Component", {

		metadata: {
			config: {
				sample: {
					iframe: "webapp/index.html",
					stretch: true,
					files: [
						"webapp/test/service/Category.json", 
						"webapp/test/service/Currency.json",
						"webapp/test/service/metadata.xml",
						"webapp/test/service/Products.json", 
						"webapp/test/service/server.js", 
						"webapp/Component.js", 
						"webapp/index.html", 
						"webapp/manifest.json", 
						"webapp/SmartTable.controller.js", 
						"webapp/SmartTable.view.xml"
					]
				}
			}
		}
	});

	return Component;

});
