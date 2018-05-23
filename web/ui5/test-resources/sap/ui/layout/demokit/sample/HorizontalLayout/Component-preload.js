sap.ui.require.preload({
	"web/ui5/test-resources/sap/ui/layout/demokit/sample/HorizontalLayout/C.controller.js": "sap.ui.define([\"jquery.sap.global\",\"sap/ui/Device\",\"sap/ui/core/mvc/Controller\",\"sap/ui/model/json/JSONModel\"],function(e,t,o,s){\"use strict\";return o.extend(\"sap.ui.layout.sample.HorizontalLayout.C\",{onInit:function(){this.getView().setModel(new s({widthS:t.system.phone?\"2em\":\"5em\",widthM:t.system.phone?\"4em\":\"10em\",widthL:t.system.phone?\"6em\":\"15em\"}));var o=new s(e.sap.getModulePath(\"sap.ui.demo.mock\",\"/img.json\"));this.getView().setModel(o,\"img\")}})});",
	"web/ui5/test-resources/sap/ui/layout/demokit/sample/HorizontalLayout/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.ui.layout.sample.HorizontalLayout.Component\",{metadata:{rootView:\"sap.ui.layout.sample.HorizontalLayout.V\",dependencies:{libs:[\"sap.m\",\"sap.ui.layout\"]},config:{sample:{files:[\"V.view.xml\",\"C.controller.js\"]}}}})});",
	"web/ui5/test-resources/sap/ui/layout/demokit/sample/HorizontalLayout/V.view.xml": "<mvc:View\n\tcontrollerName=\"sap.ui.layout.sample.HorizontalLayout.C\"\n\txmlns:l=\"sap.ui.layout\"\n\txmlns:mvc=\"sap.ui.core.mvc\"\n\txmlns=\"sap.m\"><l:HorizontalLayout class=\"sapUiSmallMargin\" ><Image\n\t\t\tclass=\"sapUiSmallMarginEnd\"\n\t\t\tsrc=\"{img>/products/pic1}\"\n\t\t\tdensityAware=\"true\"\n\t\t\twidth=\"{/widthS}\"></Image><Image\n\t\t\tclass=\"sapUiSmallMarginEnd\"\n\t\t\tsrc=\"{img>/products/pic1}\"\n\t\t\tdensityAware=\"true\"\n\t\t\twidth=\"{/widthM}\"></Image><Image\n\t\t\tclass=\"sapUiSmallMarginEnd\"\n\t\t\tsrc=\"{img>/products/pic1}\"\n\t\t\tdensityAware=\"true\"\n\t\t\twidth=\"{/widthL}\"></Image></l:HorizontalLayout></mvc:View>\n"
}, "web/ui5/test-resources/sap/ui/layout/demokit/sample/HorizontalLayout/Component-preload");