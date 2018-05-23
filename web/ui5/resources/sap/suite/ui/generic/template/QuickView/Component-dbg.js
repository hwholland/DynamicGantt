sap.ui.define(["sap/suite/ui/generic/template/lib/TemplateAssembler", "../js/AnnotationHelper", "../js/QuickTemplates/AnnotationHelper"], function(TemplateAssembler, AnnotationHelper, QCAnnotationHelper) {
	"use strict";

	function getMethods(oComponent, oComponentUtils) {
		return {};
	}

	return TemplateAssembler.getTemplateComponent(getMethods,
		"sap.suite.ui.generic.template.QuickView.Component", {

			metadata: {
				library: "sap.suite.ui.generic.template",
				properties: {
					"templateName": {
						"type": "string",
						"defaultValue": "sap.suite.ui.generic.template.QuickView.view.QuickView"
					}
				},
				"manifest": "json"

			}
		});

});
