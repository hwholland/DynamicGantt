sap.ui.require.preload({
	"web/ui5/test-resources/sap/suite/ui/microchart/demokit/sample/ComparisonMicroChartInGenericTile/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return sap.ui.core.UIComponent.extend(\"sap.suite.ui.microchart.sample.ComparisonMicroChartInGenericTile.Component\",{metadata:{rootView:\"sap.suite.ui.microchart.sample.ComparisonMicroChartInGenericTile.Page\",dependencies:{libs:[\"sap.m\",\"sap.suite.ui.microchart\"]},config:{sample:{files:[\"Page.view.xml\",\"Page.controller.js\"]}}}})});",
	"web/ui5/test-resources/sap/suite/ui/microchart/demokit/sample/ComparisonMicroChartInGenericTile/Page.controller.js": "sap.ui.define([\"sap/m/MessageToast\",\"sap/ui/core/mvc/Controller\"],function(e,s){\"use strict\";return s.extend(\"sap.suite.ui.microchart.sample.ComparisonMicroChartInGenericTile.Page\",{press:function(s){e.show(\"The GenericTile is pressed.\")}})});",
	"web/ui5/test-resources/sap/suite/ui/microchart/demokit/sample/ComparisonMicroChartInGenericTile/Page.view.xml": "<mvc:View controllerName=\"sap.suite.ui.microchart.sample.ComparisonMicroChartInGenericTile.Page\"\n\txmlns=\"sap.suite.ui.microchart\" xmlns:m=\"sap.m\" xmlns:mvc=\"sap.ui.core.mvc\"><m:GenericTile header=\"Revenue Dynamics\"\n\t\tframeType=\"OneByOne\" press=\"press\"><m:tileContent><m:TileContent footer=\"Standard Mode\"><m:content><ComparisonMicroChart scale=\"M\"><data><ComparisonMicroChartData title=\"Americas\"\n\t\t\t\t\t\t\t\tvalue=\"10\" color=\"Good\" /><ComparisonMicroChartData title=\"EMEA\"\n\t\t\t\t\t\t\t\tvalue=\"50\" color=\"Good\" /><ComparisonMicroChartData title=\"APAC\"\n\t\t\t\t\t\t\t\tvalue=\"-20\" color=\"Error\" /></data></ComparisonMicroChart></m:content></m:TileContent></m:tileContent></m:GenericTile><m:GenericTile header=\"Revenue Dynamics\"\n\t\tframeType=\"TwoByOne\" press=\"press\"><m:tileContent><m:TileContent footer=\"Wide Mode\" frameType=\"TwoByOne\"><m:content><ComparisonMicroChart scale=\"M\" view=\"Wide\"><data><ComparisonMicroChartData title=\"Americas\"\n\t\t\t\t\t\t\t\tvalue=\"10\" color=\"Critical\" /><ComparisonMicroChartData title=\"EMEA\"\n\t\t\t\t\t\t\t\tvalue=\"50\" color=\"Good\" /><ComparisonMicroChartData title=\"APAC\"\n\t\t\t\t\t\t\t\tvalue=\"-20\" color=\"Error\" /></data></ComparisonMicroChart></m:content></m:TileContent></m:tileContent></m:GenericTile><m:GenericTile header=\"Comparative Annual Totals\"\n\t\tsubheader=\"Expenses By Region\" frameType=\"TwoByOne\" press=\"press\"><m:tileContent><m:TileContent footer=\"Actual and Target\" unit=\"EUR\"><m:content><m:NumericContent scale=\"M\" value=\"1.96\"\n\t\t\t\t\t\tvalueColor=\"Error\" indicator=\"Up\" /></m:content></m:TileContent><m:TileContent footer=\"Compare across regions\" unit=\"EUR\"><m:content><ComparisonMicroChart scale=\"M\"><data><ComparisonMicroChartData title=\"Americas\"\n\t\t\t\t\t\t\t\tvalue=\"234\" color=\"Good\" /><ComparisonMicroChartData title=\"EMEA\"\n\t\t\t\t\t\t\t\tvalue=\"97\" color=\"Error\" /><ComparisonMicroChartData title=\"APAC\"\n\t\t\t\t\t\t\t\tvalue=\"197\" color=\"Critical\" /></data></ComparisonMicroChart></m:content></m:TileContent></m:tileContent></m:GenericTile><m:GenericTile header=\"Comparative Annual Totals\"\n\t\tsubheader=\"By Region\" frameType=\"OneByOne\" press=\"press\"><m:tileContent><m:TileContent footer=\"Compare across regions\" unit=\"EUR\"><m:content><ComparisonMicroChart scale=\"M\"><data><ComparisonMicroChartData title=\"Americas\"\n\t\t\t\t\t\t\t\tvalue=\"234\" color=\"Good\" /><ComparisonMicroChartData title=\"EMEA\"\n\t\t\t\t\t\t\t\tvalue=\"97\" color=\"Error\" /><ComparisonMicroChartData title=\"APAC\"\n\t\t\t\t\t\t\t\tvalue=\"197\" color=\"Critical\" /></data></ComparisonMicroChart></m:content></m:TileContent></m:tileContent></m:GenericTile><m:GenericTile header=\"Comparative Annual Totals\"\n\t\tsubheader=\"Expenses By Region\" frameType=\"TwoByOne\" press=\"press\"><m:tileContent><m:TileContent footer=\"Actual and Target\" unit=\"EUR\"><m:content><m:NumericContent scale=\"M\" value=\"1.96\"\n\t\t\t\t\t\tvalueColor=\"Error\" indicator=\"Up\" /></m:content></m:TileContent><m:TileContent footer=\"Compare across regions\" unit=\"EUR\"><m:content><ComparisonMicroChart scale=\"M\"><data><ComparisonMicroChartData title=\"Americas\"\n\t\t\t\t\t\t\t\tvalue=\"234\" color=\"Good\" /><ComparisonMicroChartData title=\"EMEA\"\n\t\t\t\t\t\t\t\tvalue=\"97\" color=\"Error\" /><ComparisonMicroChartData title=\"APAC\"\n\t\t\t\t\t\t\t\tvalue=\"197\" color=\"Critical\" /></data></ComparisonMicroChart></m:content></m:TileContent></m:tileContent></m:GenericTile></mvc:View>"
}, "web/ui5/test-resources/sap/suite/ui/microchart/demokit/sample/ComparisonMicroChartInGenericTile/Component-preload");