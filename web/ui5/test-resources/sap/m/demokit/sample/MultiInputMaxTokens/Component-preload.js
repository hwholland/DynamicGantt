sap.ui.require.preload({
	"web/ui5/test-resources/sap/m/demokit/sample/MultiInputMaxTokens/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.m.sample.MultiInputMaxTokens.Component\",{metadata:{rootView:\"sap.m.sample.MultiInputMaxTokens.Page\",dependencies:{libs:[\"sap.m\"]},config:{sample:{stretch:!0,files:[\"Page.view.xml\",\"Page.controller.js\"]}}}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/MultiInputMaxTokens/Page.controller.js": "sap.ui.define([\"jquery.sap.global\",\"sap/ui/core/mvc/Controller\",\"sap/ui/model/json/JSONModel\"],function(e,o,s){\"use strict\";return o.extend(\"sap.m.sample.MultiInputMaxTokens.Page\",{onInit:function(){var o=new s(e.sap.getModulePath(\"sap.ui.demo.mock\",\"/products.json\"));this.getView().setModel(o)}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/MultiInputMaxTokens/Page.view.xml": "<mvc:View height=\"100%\" controllerName=\"sap.m.sample.MultiInputMaxTokens.Page\"\n\txmlns:l=\"sap.ui.layout\" xmlns:core=\"sap.ui.core\" xmlns:mvc=\"sap.ui.core.mvc\"\n\txmlns=\"sap.m\"><Label text=\"No more than 2 products can be added\"  width=\"100%\"/><MultiInput\n\t\twidth=\"500px\"\n\t\tmaxTokens=\"2\"\n\t\tsuggestionItems=\"{path: '/ProductCollection', sorter: { path: 'Name' }}\"\n       \tshowValueHelp=\"false\"><core:Item key=\"{ProductId}\" text=\"{Name}\" /></MultiInput></mvc:View>"
}, "web/ui5/test-resources/sap/m/demokit/sample/MultiInputMaxTokens/Component-preload");