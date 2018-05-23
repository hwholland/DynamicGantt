sap.ui.require.preload({
	"web/ui5/test-resources/sap/m/demokit/sample/OverflowToolbarFooter/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(o){\"use strict\";return o.extend(\"sap.m.sample.OverflowToolbarFooter.Component\",{metadata:{rootView:\"sap.m.sample.OverflowToolbarFooter.OverflowToolbar\",dependencies:{libs:[\"sap.m\"]},config:{sample:{stretch:!0,files:[\"OverflowToolbar.view.xml\",\"OverflowToolbar.controller.js\"]}}}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/OverflowToolbarFooter/OverflowToolbar.controller.js": "sap.ui.define([\"jquery.sap.global\",\"sap/ui/core/mvc/Controller\",\"sap/ui/model/Filter\",\"sap/ui/model/Sorter\",\"sap/ui/model/json/JSONModel\"],function(e,t,i,r,s){\"use strict\";return t.extend(\"sap.m.sample.OverflowToolbarFooter.OverflowToolbar\",{onInit:function(t){var i=new s(e.sap.getModulePath(\"sap.ui.demo.mock\",\"/products.json\"));this.getView().setModel(i),this.bGrouped=!1,this.bDescending=!1,this.sSearchQuery=0},onSliderMoved:function(e){var t=e.getParameter(\"value\");this.getView().byId(\"otbSubheader\").setWidth(t+\"%\"),this.getView().byId(\"otbFooter\").setWidth(t+\"%\")},_fnGroup:function(e){var t=e.getProperty(\"SupplierName\");return{key:t,text:t}},onReset:function(e){this.bGrouped=!1,this.bDescending=!1,this.sSearchQuery=0,this.byId(\"maxPrice\").setValue(\"\"),this.fnApplyFiltersAndOrdering()},onGroup:function(e){this.bGrouped=!this.bGrouped,this.fnApplyFiltersAndOrdering()},onSort:function(e){this.bDescending=!this.bDescending,this.fnApplyFiltersAndOrdering()},onFilter:function(e){this.sSearchQuery=e.getSource().getValue(),this.fnApplyFiltersAndOrdering()},fnApplyFiltersAndOrdering:function(e){var t=[],s=[];if(this.bGrouped?s.push(new r(\"SupplierName\",this.bDescending,this._fnGroup)):s.push(new r(\"Name\",this.bDescending)),this.sSearchQuery){var n=new i(\"Name\",sap.ui.model.FilterOperator.Contains,this.sSearchQuery);t.push(n)}this.byId(\"idProductsTable\").getBinding(\"items\").filter(t).sort(s)}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/OverflowToolbarFooter/OverflowToolbar.view.xml": "<mvc:View\n\theight=\"100%\"\n\tcontrollerName=\"sap.m.sample.OverflowToolbarFooter.OverflowToolbar\"\n\txmlns:mvc=\"sap.ui.core.mvc\"\n\txmlns:core=\"sap.ui.core\"\n\txmlns=\"sap.m\"><Page\n        showHeader=\"false\"\n        enableScrolling=\"false\"\n\t\tclass=\"sapUiContentPadding\"\n\t\tshowNavButton=\"false\" ><content><VBox><MessageStrip\n                    text=\"Use this slider to shrink the toolbars and observe their behavior. Note: the icon buttons display text only when in the overflow area.\"\n                    type=\"Information\"\n                    showIcon=\"true\"></MessageStrip><Slider value=\"100\" liveChange=\"onSliderMoved\"></Slider></VBox><Label/><Table id=\"idProductsTable\"\n                   items=\"{/ProductCollection}\"><headerToolbar><OverflowToolbar id=\"otbSubheader\"><ToolbarSpacer/><SearchField id=\"maxPrice\" liveChange=\"onFilter\"><layoutData><OverflowToolbarLayoutData minWidth=\"200px\" maxWidth=\"300px\" shrinkable=\"true\"/></layoutData></SearchField><Button text=\"Reset\" type=\"Transparent\" press=\"onReset\"/><OverflowToolbarButton type=\"Transparent\" text=\"Sort\" icon=\"sap-icon://sort\" press=\"onSort\"/><OverflowToolbarButton type=\"Transparent\" text=\"Group\" icon=\"sap-icon://group-2\" press=\"onGroup\"/></OverflowToolbar></headerToolbar><columns><Column width=\"12em\"><Text text=\"Product\" /></Column><Column minScreenWidth=\"Tablet\" demandPopin=\"true\"><Text text=\"Supplier\" /></Column><Column minScreenWidth=\"Tablet\" demandPopin=\"true\" hAlign=\"Right\"><Text text=\"Dimensions\" /></Column><Column hAlign=\"Right\"><Text text=\"Price\" /></Column></columns><items><ColumnListItem><cells><ObjectIdentifier title=\"{Name}\" text=\"{ProductId}\" /><Text text=\"{SupplierName}\" /><Text text=\"{Width} x {Depth} x {Height} {DimUnit}\" /><ObjectNumber\n                                    number=\"{\n\t\t\t                            parts:[{path:'Price'},{path:'CurrencyCode'}],\n\t\t\t                            type: 'sap.ui.model.type.Currency',\n\t\t                            \tformatOptions: {showMeasure: false}\n\t\t                            }\"\n                                    unit=\"{CurrencyCode}\" /></cells></ColumnListItem></items></Table></content><footer><OverflowToolbar id=\"otbFooter\"><ToolbarSpacer/><Button type=\"Accept\" text=\"Accept\"><layoutData><OverflowToolbarLayoutData moveToOverflow=\"false\" /></layoutData></Button><Button type=\"Reject\" text=\"Reject\"><layoutData><OverflowToolbarLayoutData moveToOverflow=\"false\" /></layoutData></Button><OverflowToolbarButton text=\"Delete\" icon=\"sap-icon://delete\"/><OverflowToolbarButton text=\"Edit\" icon=\"sap-icon://edit\"/><OverflowToolbarButton text=\"Add\" icon=\"sap-icon://add\"/><OverflowToolbarButton text=\"Favorite\" icon=\"sap-icon://favorite\"/><OverflowToolbarButton text=\"Flag\" icon=\"sap-icon://flag\"/></OverflowToolbar></footer></Page></mvc:View>\n"
}, "web/ui5/test-resources/sap/m/demokit/sample/OverflowToolbarFooter/Component-preload");