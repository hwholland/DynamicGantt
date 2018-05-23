sap.ui.require.preload({
	"web/ui5/test-resources/sap/m/demokit/sample/PullToRefresh/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.m.sample.PullToRefresh.Component\",{metadata:{rootView:\"sap.m.sample.PullToRefresh.Page\",dependencies:{libs:[\"sap.m\"]},config:{sample:{stretch:!0,files:[\"Page.view.xml\",\"Page.controller.js\"]}}}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/PullToRefresh/Page.controller.js": "sap.ui.define([\"jquery.sap.global\",\"sap/ui/core/mvc/Controller\",\"sap/ui/model/json/JSONModel\"],function(t,e,o){\"use strict\";return e.extend(\"sap.m.sample.PullToRefresh.Page\",{onInit:function(e){this.getView().setModel(new o({ProductCollection:[]})),this._productCount=0;var u=this;t.getJSON(t.sap.getModulePath(\"sap.ui.demo.mock\",\"/products.json\"),function(t){u._productData=t,u._pushNewProduct()})},_pushNewProduct:function(){var t=this._productData.ProductCollection;if(this._productCount<t.length){var e=this.getView(),o=e.getModel().getData();o.ProductCollection.push(t[this._productCount++]),e.getModel().setData(o)}},handleRefresh:function(t){var e=this;setTimeout(function(){e.getView().byId(\"pullToRefresh\").hide(),e._pushNewProduct()},1e3)}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/PullToRefresh/Page.view.xml": "<mvc:View\n\theight=\"100%\"\n\tcontrollerName=\"sap.m.sample.PullToRefresh.Page\"\n\txmlns:mvc=\"sap.ui.core.mvc\"\n\txmlns=\"sap.m\"><Page\n\t\tshowHeader=\"false\"><content><PullToRefresh\n\t\t\t\tid=\"pullToRefresh\"\n\t\t\t\trefresh=\"handleRefresh\" /><List\n\t\t\t\tid=\"list\"\n\t\t\t\titems=\"{/ProductCollection}\" ><StandardListItem\n\t\t\t\t\ttitle=\"{Name}\"\n\t\t\t\t\tdescription=\"{ProductId}\"\n\t\t\t\t\ticon=\"{ProductPicUrl}\"\n\t\t\t\t\ticonDensityAware=\"false\"\n\t\t\t\t\ticonInset=\"false\" /></List></content></Page></mvc:View>"
}, "web/ui5/test-resources/sap/m/demokit/sample/PullToRefresh/Component-preload");