sap.ui.require.preload({
	"web/ui5/test-resources/sap/m/demokit/sample/ListNoData/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.m.sample.ListNoData.Component\",{metadata:{rootView:\"sap.m.sample.ListNoData.List\",dependencies:{libs:[\"sap.m\",\"sap.ui.layout\"]},config:{sample:{files:[\"List.view.xml\",\"List.controller.js\"]}}}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/ListNoData/List.controller.js": "sap.ui.define([\"jquery.sap.global\",\"sap/ui/core/mvc/Controller\",\"sap/ui/model/json/JSONModel\"],function(e,o,s){\"use strict\";return o.extend(\"sap.m.sample.ListNoData.List\",{onInit:function(o){var t=new s(e.sap.getModulePath(\"sap.ui.demo.mock\",\"/products.json\"));this.getView().setModel(t)}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/ListNoData/List.view.xml": "<mvc:View\n\tcontrollerName=\"sap.m.sample.ListNoData.List\"\n\txmlns:l=\"sap.ui.layout\"\n\txmlns:mvc=\"sap.ui.core.mvc\"\n\txmlns=\"sap.m\"><List\n\t\theaderText=\"Products\"\n\t\tnoDataText=\"No products found\" /></mvc:View>"
}, "web/ui5/test-resources/sap/m/demokit/sample/ListNoData/Component-preload");