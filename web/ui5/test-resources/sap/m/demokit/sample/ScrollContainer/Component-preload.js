sap.ui.require.preload({
	"web/ui5/test-resources/sap/m/demokit/sample/ScrollContainer/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.m.sample.ScrollContainer.Component\",{metadata:{rootView:\"sap.m.sample.ScrollContainer.ScrollContainer\",dependencies:{libs:[\"sap.m\"]},config:{sample:{stretch:!0,files:[\"ScrollContainer.view.xml\",\"ScrollContainer.controller.js\"]}}}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/ScrollContainer/ScrollContainer.controller.js": "sap.ui.define([\"jquery.sap.global\",\"sap/ui/Device\",\"sap/ui/core/mvc/Controller\",\"sap/ui/model/json/JSONModel\"],function(e,o,i,t){\"use strict\";return i.extend(\"sap.m.sample.ScrollContainer.ScrollContainer\",{onInit:function(){this.getView().setModel(new t({width:o.system.phone?\"50em\":\"100em\"}));var i=new t(e.sap.getModulePath(\"sap.ui.demo.mock\",\"/img.json\"));this.getView().setModel(i,\"img\")}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/ScrollContainer/ScrollContainer.view.xml": "<mvc:View\n\theight=\"100%\"\n\twidth=\"100%\"\n\tcontrollerName=\"sap.m.sample.ScrollContainer.ScrollContainer\"\n\txmlns:mvc=\"sap.ui.core.mvc\"\n\txmlns=\"sap.m\"><ScrollContainer\n\t\theight=\"100%\"\n\t\twidth=\"100%\"\n\t\thorizontal=\"true\"\n\t\tvertical=\"true\"\n\t\tfocusable=\"true\"><Image src=\"{img>/products/pic1}\" densityAware=\"false\" width=\"{/width}\" /></ScrollContainer></mvc:View>\n"
}, "web/ui5/test-resources/sap/m/demokit/sample/ScrollContainer/Component-preload");