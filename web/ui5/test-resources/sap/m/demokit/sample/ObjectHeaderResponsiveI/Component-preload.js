sap.ui.require.preload({
	"web/ui5/test-resources/sap/m/demokit/sample/ObjectHeaderResponsiveI/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.m.sample.ObjectHeaderResponsiveI.Component\",{metadata:{rootView:\"sap.m.sample.ObjectHeaderResponsiveI.Page\",dependencies:{libs:[\"sap.m\",\"sap.ui.layout\"]},config:{sample:{stretch:!0,files:[\"Page.view.xml\",\"Page.controller.js\"]}}}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/ObjectHeaderResponsiveI/Page.controller.js": "sap.ui.define([\"jquery.sap.global\",\"sap/m/MessageBox\",\"sap/ui/core/mvc/Controller\",\"sap/ui/model/json/JSONModel\"],function(e,s,o,a){\"use strict\";return o.extend(\"sap.m.sample.ObjectHeaderResponsiveI.Page\",{onInit:function(){var s=new a(e.sap.getModulePath(\"sap.ui.demo.mock\",\"/products.json\"));this.getView().setModel(s)},onPress:function(o){e.sap.require(\"sap.m.MessageBox\"),s.alert(\"Link was clicked!\")}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/ObjectHeaderResponsiveI/Page.view.xml": "<mvc:View\n\theight=\"100%\"\n\tcontrollerName=\"sap.m.sample.ObjectHeaderResponsiveI.Page\"\n\txmlns:mvc=\"sap.ui.core.mvc\"\n\txmlns:l=\"sap.ui.layout\"\n\txmlns=\"sap.m\"><ObjectHeader\n\t\tid=\"oh1\"\n\t\tresponsive=\"true\"\n\t\tfullScreenOptimized=\"true\"\n\t\tbinding=\"{/ProductCollection/0}\"\n\t\tintro=\"{Description}\"\n\t\ttitle=\"Long title truncated to 80 chars on all devices and to 50 chars on phone portrait\"\n\t\tnumber=\"{\n\t\t\tparts:[{path:'Price'},{path:'CurrencyCode'}],\n\t\t\ttype: 'sap.ui.model.type.Currency',\n\t\t\tformatOptions: {showMeasure: false}\n\t\t}\"\n\t\tnumberUnit=\"{CurrencyCode}\"\n\t\tshowMarkers=\"true\"\n\t\tmarkFlagged=\"true\"\n\t\tmarkFavorite=\"true\"\n\t\tnumberState=\"Success\"\n\t\tbackgroundDesign=\"Translucent\"><attributes><ObjectAttribute\n\t\t\t\ttitle=\"Manufacturer\"\n\t\t\t\ttext=\"{SupplierName}\"/></attributes><statuses><ObjectStatus\n\t\t\t\ttitle=\"Approval\"\n\t\t\t\ttext=\"Pending\"\n\t\t\t\tstate=\"Warning\"/></statuses><headerContainer><IconTabBar\n\t\t\t\tid=\"itb1\"\n\t\t\t\tselectedKey=\"key3\"\n\t\t\t\tupperCase=\"true\"\n\t\t\t\tclass=\"sapUiResponsiveContentPadding\"><items><IconTabFilter\n\t\t\t\t\ttext=\"Info\"\n\t\t\t\t\tcount=\"{Quantity}\"\n\t\t\t\t\tkey=\"key1\"><content><l:VerticalLayout\n\t\t\t\t\t\t\tclass=\"sapUiContentPadding\"\n\t\t\t\t\t\t\twidth=\"100%\"><l:content><Image src=\"{ProductPicUrl}\"/><Text text=\"{Width} x {Depth} x {Height} {DimUnit}\"/></l:content></l:VerticalLayout></content></IconTabFilter><IconTabFilter\n\t\t\t\t\ttext=\"Activities\"\n\t\t\t\t\tcount=\"10\"\n\t\t\t\t\tkey=\"key2\"><content><l:VerticalLayout\n\t\t\t\t\t\t\tclass=\"sapUiContentPadding\"\n\t\t\t\t\t\t\twidth=\"100%\"><l:content><Text text=\"Activity content goes here ...\"/></l:content></l:VerticalLayout></content></IconTabFilter><IconTabFilter\n\t\t\t\t\ttext=\"Attachments\"\n\t\t\t\t\tcount=\"1\"\n\t\t\t\t\tkey=\"key3\"><content><Link text=\"Attachment\" press=\"onPress\"/></content></IconTabFilter><IconTabFilter\n\t\t\t\t\ttext=\"PartnerInfo\"\n\t\t\t\t\tkey=\"key4\"\n\t\t\t\t\tcount=\"1\"><content><Link\n\t\t\t\t\t\t\ttext=\"Partner SAP SE\"\n\t\t\t\t\t\t\ttarget=\"_blank\"\n\t\t\t\t\t\t\thref=\"http://www.sap.com/\"/></content></IconTabFilter></items></IconTabBar></headerContainer></ObjectHeader></mvc:View>"
}, "web/ui5/test-resources/sap/m/demokit/sample/ObjectHeaderResponsiveI/Component-preload");