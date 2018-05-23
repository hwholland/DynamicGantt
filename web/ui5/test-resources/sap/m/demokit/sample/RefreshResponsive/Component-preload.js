sap.ui.require.preload({
	"web/ui5/test-resources/sap/m/demokit/sample/RefreshResponsive/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.m.sample.RefreshResponsive.Component\",{metadata:{rootView:\"sap.m.sample.RefreshResponsive.Page\",dependencies:{libs:[\"sap.m\",\"sap.ui.layout\"]},config:{sample:{stretch:!0,files:[\"Page.view.xml\",\"Page.controller.js\"]}}}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/RefreshResponsive/Page.controller.js": "sap.ui.define([\"jquery.sap.global\",\"sap/ui/Device\",\"sap/ui/core/mvc/Controller\",\"sap/ui/model/Filter\",\"sap/ui/model/json/JSONModel\"],function(e,t,o,i,s){\"use strict\";return o.extend(\"sap.m.sample.RefreshResponsive.Page\",{onInit:function(o){var i=this.getView(),u=new s({isNoTouch:!t.support.touch,isTouch:t.support.touch});if(u.setDefaultBindingMode(\"OneWay\"),i.setModel(u,\"device\"),t.support.touch){var n=this.getView().byId(\"searchBar\");this.getView().byId(\"page\").insertAggregation(\"content\",n,1)}i.setModel(new s({ProductCollection:[]})),this._productCount=0;var r=this;e.getJSON(e.sap.getModulePath(\"sap.ui.demo.mock\",\"/products.json\"),function(e){r._productData=e,r._pushNewProduct()})},_pushNewProduct:function(){var e=this._productData.ProductCollection;if(this._productCount<e.length){var t=this.getView(),o=t.getModel().getData();o.ProductCollection.push(e[this._productCount++]),t.getModel().setData(o)}},handleRefresh:function(t){setTimeout(e.proxy(function(){this._pushNewProduct(),this.getView().byId(\"pullToRefresh\").hide();var e=this.getView().byId(\"list\"),t=this.getView().byId(\"searchField\").getValue(),o=[];t&&t.length&&o.push(new i(\"Name\",sap.ui.model.FilterOperator.Contains,t)),e.getBinding(\"items\").filter(o)},this),1e3)}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/RefreshResponsive/Page.view.xml": "<mvc:View\n\theight=\"100%\"\n\tcontrollerName=\"sap.m.sample.RefreshResponsive.Page\"\n\txmlns:l=\"sap.ui.layout\"\n\txmlns:mvc=\"sap.ui.core.mvc\"\n\txmlns=\"sap.m\"><Page\n\t\tid=\"page\"\n\t\tshowHeader=\"false\" ><subHeader><Bar\n\t\t\t\tid=\"searchBar\"><contentMiddle><SearchField\n\t\t\t\t\t\tid=\"searchField\"\n\t\t\t\t\t\tshowRefreshButton=\"{device>/isNoTouch}\"\n\t\t\t\t\t\tsearch=\"handleRefresh\"\n\t\t\t\t\t\twidth=\"100%\" ></SearchField></contentMiddle></Bar></subHeader><content><PullToRefresh\n\t\t\t\tid=\"pullToRefresh\"\n\t\t\t\tvisible=\"{device>/isTouch}\"\n\t\t\t\trefresh=\"handleRefresh\" /><List id=\"list\" items=\"{/ProductCollection}\"><StandardListItem\n\t\t\t\t\ttitle=\"{Name}\"\n\t\t\t\t\tdescription=\"{ProductId}\"\n\t\t\t\t\ticon=\"{ProductPicUrl}\"\n\t\t\t\t\ticonDensityAware=\"false\"\n\t\t\t\t\ticonInset=\"false\" /></List></content></Page></mvc:View>"
}, "web/ui5/test-resources/sap/m/demokit/sample/RefreshResponsive/Component-preload");