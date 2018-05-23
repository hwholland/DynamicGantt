sap.ui.require.preload({
	"web/ui5/test-resources/sap/m/demokit/sample/NumericContentWithoutMargin/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.m.sample.NumericContentWithoutMargin.Component\",{metadata:{rootView:\"sap.m.sample.NumericContentWithoutMargin.Page\",dependencies:{libs:[\"sap.m\",\"sap.ui.core\"]},config:{sample:{files:[\"Page.view.xml\"]}}}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/NumericContentWithoutMargin/Page.view.xml": "<mvc:View xmlns=\"sap.m\" xmlns:mvc=\"sap.ui.core.mvc\"><Label text=\"Numeric content with margins\" /><NumericContent value=\"65.5\" scale=\"MM\"\n\t\tvalueColor=\"Neutral\" indicator=\"None\" state=\"Loaded\" class=\"sapUiSmallMargin\"\n\t\twithMargin=\"true\" /><NumericContent value=\"65.5\" scale=\"MM\"\n\t\tvalueColor=\"Good\" indicator=\"Up\" state=\"Loaded\" class=\"sapUiSmallMargin\"\n\t\twithMargin=\"true\" /><NumericContent value=\"6666\" scale=\"MM\"\n\t\tvalueColor=\"Critical\" indicator=\"Up\" state=\"Loaded\" class=\"sapUiSmallMargin\"\n\t\twithMargin=\"true\" /><NumericContent value=\"65.5\" scale=\"MM\"\n\t\tvalueColor=\"Error\" indicator=\"Down\" state=\"Loaded\" class=\"sapUiSmallMargin\"\n\t\twithMargin=\"true\" /><Label text=\"Numeric content without margins\" /><NumericContent value=\"65.5\" scale=\"MM\"\n\t\tvalueColor=\"Neutral\" indicator=\"None\" state=\"Loaded\" class=\"sapUiSmallMargin\"\n\t\twithMargin=\"false\" /><NumericContent value=\"65.5\" scale=\"MM\"\n\t\tvalueColor=\"Good\" indicator=\"Up\" state=\"Loaded\" class=\"sapUiSmallMargin\"\n\t\twithMargin=\"false\" /><NumericContent value=\"6666\" scale=\"MM\"\n\t\tvalueColor=\"Critical\" indicator=\"Up\" state=\"Loaded\" class=\"sapUiSmallMargin\"\n\t\twithMargin=\"false\" /><NumericContent value=\"65.5\" scale=\"MM\"\n\t\tvalueColor=\"Error\" indicator=\"Down\" state=\"Loaded\" class=\"sapUiSmallMargin\"\n\t\twithMargin=\"false\" /></mvc:View>"
}, "web/ui5/test-resources/sap/m/demokit/sample/NumericContentWithoutMargin/Component-preload");