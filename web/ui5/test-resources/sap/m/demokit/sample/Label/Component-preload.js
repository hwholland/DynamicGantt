sap.ui.require.preload({
	"web/ui5/test-resources/sap/m/demokit/sample/Label/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.m.sample.Label.Component\",{metadata:{rootView:\"sap.m.sample.Label.LabelGroup\",dependencies:{libs:[\"sap.m\",\"sap.ui.layout\"]},config:{sample:{files:[\"LabelGroup.view.xml\"]}}}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/Label/LabelGroup.view.xml": "<mvc:View\n\txmlns:l=\"sap.ui.layout\"\n\txmlns:mvc=\"sap.ui.core.mvc\"\n\txmlns=\"sap.m\"><l:VerticalLayout\n\t\tclass=\"sapUiContentPadding\"\n\t\twidth=\"100%\"><l:content><Label text=\"Label a\" class=\"sapUiSmallMarginBottom\" /><Label text=\"Label b\" class=\"sapUiSmallMarginBottom\" /><Label text=\"Label c\" class=\"sapUiSmallMarginBottom\" /><Label text=\"Label d\" class=\"sapUiSmallMarginBottom\" design=\"Bold\" /><Label text=\"Label e\" class=\"sapUiSmallMarginBottom\" /></l:content></l:VerticalLayout></mvc:View>"
}, "web/ui5/test-resources/sap/m/demokit/sample/Label/Component-preload");