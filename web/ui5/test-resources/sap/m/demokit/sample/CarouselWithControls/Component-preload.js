sap.ui.require.preload({
	"web/ui5/test-resources/sap/m/demokit/sample/CarouselWithControls/Carousel.controller.js": "sap.ui.define([\"jquery.sap.global\",\"sap/ui/core/mvc/Controller\",\"sap/ui/model/json/JSONModel\"],function(e,o,s){\"use strict\";return o.extend(\"sap.m.sample.CarouselWithControls.Carousel\",{onInit:function(o){var t=new s(e.sap.getModulePath(\"sap.ui.demo.mock\",\"/products.json\"));this.getView().setModel(t);var a=new s(e.sap.getModulePath(\"sap.ui.demo.mock\",\"/img.json\"));this.getView().setModel(a,\"img\")}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/CarouselWithControls/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.m.sample.CarouselWithControls.Component\",{metadata:{rootView:\"sap.m.sample.CarouselWithControls.Carousel\",dependencies:{libs:[\"sap.m\",\"sap.ui.layout\"]},config:{sample:{stretch:!0,files:[\"Carousel.view.xml\",\"Carousel.controller.js\"]}}}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/CarouselWithControls/Carousel.view.xml": "<mvc:View height=\"100%\" controllerName=\"sap.m.sample.CarouselWithControls.Carousel\"\n\txmlns:l=\"sap.ui.layout\" xmlns:mvc=\"sap.ui.core.mvc\" xmlns=\"sap.m\"><Carousel class=\"sapUiContentPadding\"><pages><l:VerticalLayout><Image src=\"{img>/products/pic1}\" alt=\"Example picture of speakers\"/></l:VerticalLayout><Image src=\"{img>/products/pic2}\" alt=\"Example picture of USB flash drive\"/><Text class=\"sapUiSmallMargin\" text=\"Lorem ipsum dolor st amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat\" /><ScrollContainer height=\"100%\" width=\"100%\"\n\t\t\t\thorizontal=\"false\" vertical=\"true\"><List\n\t\t\t\t\theaderText=\"Some List Content 1\"\n\t\t\t\t\titems=\"{\n\t\t\t\t\t\tpath: '/ProductCollection'\n\t\t\t\t\t}\"><StandardListItem\n\t\t\t\t\t\ttitle=\"{Name}\" description=\"{ProductId}\"\n\t\t\t\t\t\ticon=\"{ProductPicUrl}\" iconDensityAware=\"false\"\n\t\t\t\t\t\ticonInset=\"false\" /></List></ScrollContainer><Image src=\"{img>/products/pic3}\" alt=\"Example picture of spotlight\"/></pages></Carousel></mvc:View>\n"
}, "web/ui5/test-resources/sap/m/demokit/sample/CarouselWithControls/Component-preload");