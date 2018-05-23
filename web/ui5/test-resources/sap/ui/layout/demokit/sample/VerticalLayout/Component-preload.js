sap.ui.require.preload({
	"web/ui5/test-resources/sap/ui/layout/demokit/sample/VerticalLayout/C.controller.js": "sap.ui.define([\"jquery.sap.global\",\"sap/ui/Device\",\"sap/ui/core/mvc/Controller\",\"sap/ui/model/json/JSONModel\"],function(e,t,s,i){\"use strict\";return s.extend(\"sap.ui.layout.sample.VerticalLayout.C\",{onInit:function(){this.getView().setModel(new i({widthS:t.system.phone?\"2em\":\"5em\",widthM:t.system.phone?\"4em\":\"10em\",widthL:t.system.phone?\"6em\":\"15em\"}));var s=new i(e.sap.getModulePath(\"sap.ui.demo.mock\",\"/img.json\"));this.getView().setModel(s,\"img\")}})});",
	"web/ui5/test-resources/sap/ui/layout/demokit/sample/VerticalLayout/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.ui.layout.sample.VerticalLayout.Component\",{metadata:{rootView:\"sap.ui.layout.sample.VerticalLayout.V\",dependencies:{libs:[\"sap.m\",\"sap.ui.layout\"]},config:{sample:{files:[\"V.view.xml\",\"C.controller.js\"]}}}})});",
	"web/ui5/test-resources/sap/ui/layout/demokit/sample/VerticalLayout/V.view.xml": "<mvc:View\n\tcontrollerName=\"sap.ui.layout.sample.VerticalLayout.C\"\n\txmlns:l=\"sap.ui.layout\"\n\txmlns:mvc=\"sap.ui.core.mvc\"\n\txmlns=\"sap.m\"><l:VerticalLayout class=\"sapUiSmallMargin\" ><Image\n\t\t\tclass=\"sapUiSmallMarginEnd\"\n\t\t\tsrc=\"{img>/products/pic1}\"\n\t\t\tdensityAware=\"true\"\n\t\t\twidth=\"{/widthS}\"></Image><Image\n\t\t\tclass=\"sapUiSmallMarginEnd\"\n\t\t\tsrc=\"{img>/products/pic1}\"\n\t\t\tdensityAware=\"true\"\n\t\t\twidth=\"{/widthM}\"></Image><Image\n\t\t\tclass=\"sapUiSmallMarginEnd\"\n\t\t\tsrc=\"{img>/products/pic1}\"\n\t\t\tdensityAware=\"true\"\n\t\t\twidth=\"{/widthL}\"></Image></l:VerticalLayout></mvc:View>\n"
}, "web/ui5/test-resources/sap/ui/layout/demokit/sample/VerticalLayout/Component-preload");