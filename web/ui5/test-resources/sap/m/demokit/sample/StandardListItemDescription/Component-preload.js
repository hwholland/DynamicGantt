sap.ui.require.preload({
	"web/ui5/test-resources/sap/m/demokit/sample/StandardListItemDescription/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.m.sample.StandardListItemDescription.Component\",{metadata:{rootView:\"sap.m.sample.StandardListItemDescription.List\",dependencies:{libs:[\"sap.m\"]},config:{sample:{files:[\"List.view.xml\",\"List.controller.js\"]}}}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/StandardListItemDescription/List.controller.js": "sap.ui.define([\"jquery.sap.global\",\"sap/ui/core/mvc/Controller\",\"sap/ui/model/json/JSONModel\"],function(e,t,s){\"use strict\";return t.extend(\"sap.m.sample.StandardListItemDescription.List\",{onInit:function(t){var o=new s(e.sap.getModulePath(\"sap.ui.demo.mock\",\"/products.json\"));this.getView().setModel(o)}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/StandardListItemDescription/List.view.xml": "<mvc:View\n\tcontrollerName=\"sap.m.sample.StandardListItemDescription.List\"\n\txmlns:mvc=\"sap.ui.core.mvc\"\n\txmlns=\"sap.m\"><List\n\t\tid=\"ShortProductList\"\n\t\theaderText=\"Products\"\n\t\titems=\"{\n\t\t\tpath: '/ProductCollection',\n\t\t\tsorter: {\n\t\t\t\tpath: 'Name'\n\t\t\t}\n\t\t}\"><items><StandardListItem\n\t\t\t\ttitle=\"{Name}\"\n\t\t\t\tdescription=\"{ProductId}\" /></items></List></mvc:View>"
}, "web/ui5/test-resources/sap/m/demokit/sample/StandardListItemDescription/Component-preload");