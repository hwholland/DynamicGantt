sap.ui.require.preload({
	"web/ui5/test-resources/sap/m/demokit/sample/GenericTileAsKPITile/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.m.sample.GenericTileAsKPITile.Component\",{metadata:{rootView:\"sap.m.sample.GenericTileAsKPITile.Page\",dependencies:{libs:[\"sap.m\"]},includes:[\"style.css\"],config:{sample:{files:[\"Page.view.xml\",\"Page.controller.js\",\"style.css\"]}}}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/GenericTileAsKPITile/Page.controller.js": "sap.ui.define([\"jquery.sap.global\",\"sap/ui/core/mvc/Controller\",\"sap/m/MessageToast\"],function(e,s,i){\"use strict\";return s.extend(\"sap.m.sample.GenericTileAsKPITile.Page\",{press:function(e){i.show(\"The GenericTile is pressed.\")}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/GenericTileAsKPITile/Page.view.xml": "<mvc:View controllerName=\"sap.m.sample.GenericTileAsKPITile.Page\"\n\txmlns=\"sap.m\" xmlns:mvc=\"sap.ui.core.mvc\"><GenericTile class=\"sapUiTinyMarginBegin sapUiTinyMarginTop tileLayout\" header=\"Country-Specific Profit Margin\" subheader=\"Expenses\" press=\"press\"><tileContent><TileContent unit=\"EUR\" footer=\"Current Quarter\"><content><NumericContent scale=\"M\" value=\"1.96\"\n\t\t\t\t\t\tvalueColor=\"Error\" indicator=\"Up\" /></content></TileContent></tileContent></GenericTile><GenericTile class=\"sapUiTinyMarginBegin sapUiTinyMarginTop tileLayout\" header=\"US Profit Margin\" press=\"press\"><tileContent><TileContent unit=\"Unit\"><content><NumericContent scale=\"%\" value=\"12\"\n\t\t\t\t\t\tvalueColor=\"Critical\" indicator=\"Up\"/></content></TileContent></tileContent></GenericTile></mvc:View>\n"
}, "web/ui5/test-resources/sap/m/demokit/sample/GenericTileAsKPITile/Component-preload");