sap.ui.require.preload({
	"web/ui5/test-resources/sap/m/demokit/sample/PageStandardClasses/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.m.sample.PageStandardClasses.Component\",{metadata:{rootView:\"sap.m.sample.PageStandardClasses.Page\",dependencies:{libs:[\"sap.m\",\"sap.ui.layout\"]},config:{sample:{stretch:!0,files:[\"Page.view.xml\",\"Page.controller.js\"]}}}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/PageStandardClasses/Page.controller.js": "sap.ui.define([\"jquery.sap.global\",\"sap/ui/core/mvc/Controller\",\"sap/ui/model/json/JSONModel\"],function(e,t,o){\"use strict\";return t.extend(\"sap.m.sample.PageStandardClasses.Page\",{onInit:function(t){var s=new o(e.sap.getModulePath(\"sap.ui.demo.mock\",\"/products.json\"));this.getView().setModel(s),this.getView().byId(\"idPage\").bindElement(\"/ProductCollection/0\")}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/PageStandardClasses/Page.view.xml": "<mvc:View\n\theight=\"100%\"\n\tcontrollerName=\"sap.m.sample.PageStandardClasses.Page\"\n\txmlns:f=\"sap.ui.layout.form\"\n\txmlns:core=\"sap.ui.core\"\n\txmlns:mvc=\"sap.ui.core.mvc\"\n\txmlns=\"sap.m\"><Page\n\t\tid=\"idPage\"\n\t\ttitle=\" Product XY\" ><content><ObjectHeader\n\t\t\t\ttitle=\"{Name}\"\n\t\t\t\tnumber=\"{\n\t\t\t\t\tparts:[{path:'Price'},{path:'CurrencyCode'}],\n\t\t\t\t\ttype: 'sap.ui.model.type.Currency',\n\t\t\t\t\tformatOptions: {showMeasure: false}\n\t\t\t\t}\"\n\t\t\t\tnumberUnit=\"{CurrencyCode}\" ><attributes><ObjectAttribute title=\"Weight\" text=\"{WeightMeasure} {WeightUnit}\" /><ObjectAttribute title=\"Dimensions\" text=\"{Width} x {Depth} X {Height} {DimUnit}\" /></attributes><statuses><ObjectStatus title=\"Status\" text=\"In Stock\" state=\"Success\" /></statuses></ObjectHeader><IconTabBar\n\t\t\t\texpanded=\"{device>/isNoPhone}\"\n\t\t\t\tclass=\"sapUiSmallMarginBottom sapUiResponsiveContentPadding\"><items><IconTabFilter\n\t\t\t\t\t\ttext=\"Info\"><f:SimpleForm\n\t\t\t\t\t\t\tminWidth=\"1024\"\n\t\t\t\t\t\t\tmaxContainerCols=\"2\"\n\t\t\t\t\t\t\tlayout=\"ResponsiveGridLayout\" ><f:title><core:Title text=\"A Form\" /></f:title><Label text=\"Label\"/><Text text=\"Value\"/></f:SimpleForm></IconTabFilter><IconTabFilter\n\t\t\t\t\t\ttext=\"Attachments\"><List headerText=\"A List\" showSeparators=\"Inner\" ></List></IconTabFilter><IconTabFilter\n\t\t\t\t\t\ttext=\"Notes\"><FeedInput /></IconTabFilter></items></IconTabBar><f:SimpleForm\n\t\t\t\tminWidth=\"1024\"\n\t\t\t\tmaxContainerCols=\"2\"\n\t\t\t\tclass=\"sapUiForceWidthAuto sapUiResponsiveMargin\" ><f:title><core:Title text=\"A Form\" /></f:title><Label text=\"Label\"/><Text text=\"Value\"/></f:SimpleForm><List headerText=\"A List\" backgroundDesign=\"Translucent\" width=\"auto\" class=\"sapUiResponsiveMargin\"/><Table headerText=\"A Table\" width=\"auto\" class=\"sapUiResponsiveMargin\"/><Panel headerText=\"A Panel\" width=\"auto\" class=\"sapUiResponsiveMargin\"/></content></Page></mvc:View>\n"
}, "web/ui5/test-resources/sap/m/demokit/sample/PageStandardClasses/Component-preload");