sap.ui.require.preload({
	"web/ui5/test-resources/sap/m/demokit/sample/TileContent/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.m.sample.TileContent.Component\",{metadata:{rootView:\"sap.m.sample.TileContent.Page\",dependencies:{libs:[\"sap.m\"]},config:{sample:{files:[\"Page.view.xml\"]}}}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/TileContent/Page.view.xml": "<mvc:View xmlns=\"sap.m\" xmlns:mvc=\"sap.ui.core.mvc\" xmlns:l=\"sap.ui.layout\"><l:Grid containerQuery=\"true\" class=\"sapUiSmallMarginTop\"><l:content><TileContent footer=\"Current Quarter\" unit=\"EUR\" class=\"sapUiSmallMargin\"><content><NumericContent scale=\"M\" value=\"1.96\"\n\t\t\t\t\tvalueColor=\"Error\" indicator=\"Up\" /></content></TileContent><TileContent footer=\"Leave Requests\" class=\"sapUiSmallMargin\"><content><NumericContent value=\"3\"\n\t\t\t\t\ticon=\"sap-icon://travel-expense\" /></content></TileContent><TileContent footer=\"Hours since last Activity\" class=\"sapUiSmallMargin\"><content><NumericContent value=\"9\" icon=\"sap-icon://locked\" /></content></TileContent><TileContent footer=\"New Notifications\" class=\"sapUiSmallMargin\"><content><FeedContent contentText=\"@@notify Great outcome of the Presentation today. The new functionality and the new design was well received.\"\n\t\t\t\t\tsubheader=\"about 1 minute ago in Computer Market\" value=\"132\" /></content></TileContent><TileContent footer=\"August 21, 2013\" class=\"sapUiSmallMargin\"><content><NewsContent contentText=\"SAP Unveils Powerful New Player Comparison Tool Exclusively on NFL.com\"\n\t\t\t\t\tsubheader=\"SAP News\" /></content></TileContent></l:content></l:Grid></mvc:View>"
}, "web/ui5/test-resources/sap/m/demokit/sample/TileContent/Component-preload");