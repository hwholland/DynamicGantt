sap.ui.define(["sap/suite/ui/generic/template/lib/TemplateAssembler", "../js/AnnotationHelper", "../js/QuickTemplates/AnnotationHelper", "sap/ca/ui/utils/Lessifier"], function(TemplateAssembler, AnnotationHelper, QCAnnotationHelper, Lessifier) {
    "use strict";

    function getMethods(oComponent, oComponentUtils) {
        Lessifier.lessifyCSS("sap.suite.ui.generic.template.QuickCreate", "css/custom.css", true);
        return {};

    }

    return TemplateAssembler.getTemplateComponent(getMethods,
        "sap.suite.ui.generic.template.QuickCreate.Component", {

            metadata: {
                library: "sap.suite.ui.generic.template",
                properties: {
                    "templateName": {
                        "type": "string",
                        "defaultValue": "sap.suite.ui.generic.template.QuickCreate.view.QuickCreate"
                    }
                },
                "manifest": "json",
                "includes": ["css/custom.css"]
            }
        });

});
