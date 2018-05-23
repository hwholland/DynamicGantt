sap.ui.require.preload({
	"web/ui5/test-resources/sap/m/demokit/sample/Carousel/Carousel.controller.js": "sap.ui.define([\"jquery.sap.global\",\"sap/ui/core/mvc/Controller\",\"sap/ui/model/json/JSONModel\"],function(e,o,s){\"use strict\";return o.extend(\"sap.m.sample.Carousel.Carousel\",{onInit:function(o){var t=new s(e.sap.getModulePath(\"sap.ui.demo.mock\",\"/products.json\"));this.getView().setModel(t);var a=new s(e.sap.getModulePath(\"sap.ui.demo.mock\",\"/img.json\"));this.getView().setModel(a,\"img\")}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/Carousel/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.m.sample.Carousel.Component\",{metadata:{rootView:\"sap.m.sample.Carousel.Carousel\",dependencies:{libs:[\"sap.m\",\"sap.ui.layout\"]},config:{sample:{stretch:!0,files:[\"Carousel.view.xml\",\"Carousel.controller.js\"]}}}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/Carousel/Carousel.view.xml": "<mvc:View height=\"100%\" controllerName=\"sap.m.sample.Carousel.Carousel\"\n\txmlns:l=\"sap.ui.layout\" xmlns:mvc=\"sap.ui.core.mvc\" xmlns=\"sap.m\"><Carousel class=\"sapUiContentPadding\" loop=\"true\"><pages><Image src=\"{img>/products/pic1}\" alt=\"Example picture of speakers\"/><Image src=\"{img>/products/pic2}\" alt=\"Example picture of USB flash drive\"/><Image src=\"{img>/products/pic3}\" alt=\"Example picture of spotlight\"/><Image src=\"{img>/products/screw}\" alt=\"Example picture of screw\"/></pages></Carousel></mvc:View>\n"
}, "web/ui5/test-resources/sap/m/demokit/sample/Carousel/Component-preload");