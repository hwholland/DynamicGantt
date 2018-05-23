sap.ui.require.preload({
	"web/ui5/test-resources/sap/m/demokit/sample/ListCounter/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.m.sample.ListCounter.Component\",{metadata:{rootView:\"sap.m.sample.ListCounter.List\",dependencies:{libs:[\"sap.m\"]},config:{sample:{files:[\"List.view.xml\",\"List.controller.js\"]}}}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/ListCounter/List.controller.js": "sap.ui.define([\"jquery.sap.global\",\"sap/ui/core/mvc/Controller\",\"sap/ui/model/json/JSONModel\"],function(e,o,s){\"use strict\";return o.extend(\"sap.m.sample.ListCounter.List\",{onInit:function(o){var t=new s(e.sap.getModulePath(\"sap.ui.demo.mock\",\"/products.json\"));this.getView().setModel(t)}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/ListCounter/List.view.xml": "<mvc:View\n\tcontrollerName=\"sap.m.sample.ListCounter.List\"\n\txmlns:mvc=\"sap.ui.core.mvc\"\n\txmlns=\"sap.m\"><List\n\t\theaderText=\"Products\"\n\t\titems=\"{\n\t\t\tpath: '/ProductCollection'\n\t\t}\" ><StandardListItem\n\t\t\ttitle=\"{Name}\"\n\t\t\tcounter=\"{Quantity}\"/></List></mvc:View>\n"
}, "web/ui5/test-resources/sap/m/demokit/sample/ListCounter/Component-preload");