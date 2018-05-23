sap.ui.require.preload({
	"web/ui5/test-resources/sap/m/demokit/sample/ActionSelect/C.controller.js": "sap.ui.define([\"jquery.sap.global\",\"sap/m/Button\",\"sap/m/MessageToast\",\"sap/ui/core/mvc/Controller\",\"sap/ui/model/json/JSONModel\"],function(e,t,s,o,n){\"use strict\";return o.extend(\"sap.m.sample.ActionSelect.C\",{onInit:function(){var o=new n(e.sap.getModulePath(\"sap.ui.demo.mock\",\"/products.json\"));this.getView().setModel(o);var a=this.getView().byId(\"select\"),i=function(e){s.show(\"Executed \"+e.getSource().getText()),a.close()};a.addButton(new t({text:\"Action 1\",press:i})),a.addButton(new t({text:\"Action 2\",press:i}))}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/ActionSelect/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.m.sample.ActionSelect.Component\",{metadata:{rootView:\"sap.m.sample.ActionSelect.V\",dependencies:{libs:[\"sap.m\",\"sap.ui.layout\"]},config:{sample:{files:[\"V.view.xml\",\"C.controller.js\"]}}}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/ActionSelect/V.view.xml": "<mvc:View\n\tcontrollerName=\"sap.m.sample.ActionSelect.C\"\n\txmlns:l=\"sap.ui.layout\"\n\txmlns:mvc=\"sap.ui.core.mvc\"\n\txmlns:core=\"sap.ui.core\"\n\txmlns=\"sap.m\"\n\tclass=\"sapUiSmallMargin\"><l:VerticalLayout><l:content><ActionSelect\n\t\t\t\tid=\"select\"\n\t\t\t\tclass=\"sapUiSmallMarginBottom\"\n\t\t\t\titems=\"{\n\t\t\t\t\tpath: '/ProductCollection',\n\t\t\t\t\tsorter: { path: 'Name' }\n\t\t\t\t}\"><items><core:Item key=\"{ProductId}\" text=\"{Name}\" /></items></ActionSelect></l:content></l:VerticalLayout></mvc:View>"
}, "web/ui5/test-resources/sap/m/demokit/sample/ActionSelect/Component-preload");