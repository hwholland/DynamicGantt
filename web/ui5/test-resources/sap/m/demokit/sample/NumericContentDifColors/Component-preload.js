sap.ui.require.preload({
	"web/ui5/test-resources/sap/m/demokit/sample/NumericContentDifColors/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.m.sample.NumericContentDifColors.Component\",{metadata:{rootView:\"sap.m.sample.NumericContentDifColors.Page\",dependencies:{libs:[\"sap.m\"]},config:{sample:{files:[\"Page.view.xml\",\"Page.controller.js\"]}}}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/NumericContentDifColors/Page.controller.js": "sap.ui.define([\"jquery.sap.global\",\"sap/ui/core/mvc/Controller\",\"sap/m/MessageToast\"],function(e,s,n){\"use strict\";return s.extend(\"sap.m.sample.NumericContentDifColors.Page\",{press:function(e){n.show(\"The numeric content is pressed.\")}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/NumericContentDifColors/Page.view.xml": "<mvc:View controllerName=\"sap.m.sample.NumericContentDifColors.Page\"\n\txmlns=\"sap.m\" xmlns:mvc=\"sap.ui.core.mvc\"><NumericContent value=\"65.5\" scale=\"MM\"\n\t\tvalueColor=\"Neutral\" indicator=\"None\" state=\"Loaded\" class=\"sapUiSmallMargin\"\n\t\tpress=\"press\" /><NumericContent value=\"65.5\" scale=\"MM\"\n\t\tvalueColor=\"Good\" indicator=\"Up\" state=\"Loaded\" class=\"sapUiSmallMargin\"\n\t\tpress=\"press\" /><NumericContent value=\"6666\" scale=\"MM\"\n\t\tvalueColor=\"Critical\" indicator=\"Up\" state=\"Loaded\" class=\"sapUiSmallMargin\"\n\t\tpress=\"press\" /><NumericContent value=\"65.5\" scale=\"MM\"\n\t\tvalueColor=\"Error\" indicator=\"Down\" state=\"Loaded\" class=\"sapUiSmallMargin\"\n\t\tpress=\"press\" /></mvc:View>"
}, "web/ui5/test-resources/sap/m/demokit/sample/NumericContentDifColors/Component-preload");