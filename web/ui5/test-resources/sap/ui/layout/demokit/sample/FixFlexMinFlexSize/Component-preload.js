sap.ui.require.preload({
	"web/ui5/test-resources/sap/ui/layout/demokit/sample/FixFlexMinFlexSize/C.controller.js": "sap.ui.define([\"jquery.sap.global\",\"sap/ui/core/mvc/Controller\",\"sap/ui/model/json/JSONModel\"],function(e,o,i){\"use strict\";return o.extend(\"sap.ui.layout.sample.FixFlexMinFlexSize.C\",{onInit:function(o){var s=new i(e.sap.getModulePath(\"sap.ui.demo.mock\",\"/products.json\"));this.getView().setModel(s)}})});",
	"web/ui5/test-resources/sap/ui/layout/demokit/sample/FixFlexMinFlexSize/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.ui.layout.sample.FixFlexMinFlexSize.Component\",{metadata:{rootView:\"sap.ui.layout.sample.FixFlexMinFlexSize.V\",dependencies:{libs:[\"sap.ui.layout\",\"sap.m\"]},config:{sample:{stretch:!0,files:[\"V.view.xml\"]}}}})});",
	"web/ui5/test-resources/sap/ui/layout/demokit/sample/FixFlexMinFlexSize/V.view.xml": "<mvc:View\n\t\tcontrollerName=\"sap.ui.layout.sample.FixFlexMinFlexSize.C\"\n\t\txmlns:mvc=\"sap.ui.core.mvc\"\n\t\txmlns:l=\"sap.ui.layout\"\n\t\txmlns=\"sap.m\"\n\t\theight=\"100%\"><l:FixFlex minFlexSize=\"400\"><l:fixContent><ObjectHeader\n\t\t\t\t\tresponsive=\"true\"\n\t\t\t\t\tfullScreenOptimized=\"true\"\n\t\t\t\t\tbinding=\"{/ProductCollection/0}\"\n\t\t\t\t\tintro=\"{Description}\"\n\t\t\t\t\ttitle=\"Long title truncated to 80 chars on all devices and to 50 chars on phone portrait\"\n\t\t\t\t\tnumber=\"{\n\t\t\t\t\t\tparts:[{path:'Price'},{path:'CurrencyCode'}],\n\t\t\t\t\t\ttype: 'sap.ui.model.type.Currency',\n\t\t\t\t\t\tformatOptions: {showMeasure: false}\n\t\t\t\t\t}\"\n\t\t\t\t\tnumberUnit=\"{CurrencyCode}\"\n\t\t\t\t\tshowMarkers=\"true\"\n\t\t\t\t\tmarkFlagged=\"true\"\n\t\t\t\t\tmarkFavorite=\"true\"\n\t\t\t\t\tnumberState=\"Success\"\n\t\t\t\t\tbackgroundDesign=\"Translucent\"><attributes><ObjectAttribute\n\t\t\t\t\t\t\ttitle=\"Manufacturer\"\n\t\t\t\t\t\t\ttext=\"{SupplierName}\"/></attributes><statuses><ObjectStatus\n\t\t\t\t\t\t\ttitle=\"Approval\"\n\t\t\t\t\t\t\ttext=\"Pending\"\n\t\t\t\t\t\t\tstate=\"Warning\"/></statuses></ObjectHeader></l:fixContent><l:flexContent><Table id=\"idProductsTable\"\n\t\t\t\t   items=\"{\n\t\t\t\t\tpath: '/ProductCollection',\n\t\t\t\t\tsorter: {\n\t\t\t\t\t\tpath: 'Name'\n\t\t\t\t\t}\n\t\t\t\t}\"><headerToolbar><Toolbar><Title text=\"Products\" level=\"H2\"/></Toolbar></headerToolbar><columns><Column\n\t\t\t\t\t\t\twidth=\"12em\"><Text text=\"Product\"/></Column><Column\n\t\t\t\t\t\t\tminScreenWidth=\"Tablet\"\n\t\t\t\t\t\t\tdemandPopin=\"true\"><Text text=\"Supplier\"/></Column><Column\n\t\t\t\t\t\t\tminScreenWidth=\"Tablet\"\n\t\t\t\t\t\t\tdemandPopin=\"true\"\n\t\t\t\t\t\t\thAlign=\"Right\"><Text text=\"Dimensions\"/></Column><Column\n\t\t\t\t\t\t\tminScreenWidth=\"Tablet\"\n\t\t\t\t\t\t\tdemandPopin=\"true\"\n\t\t\t\t\t\t\thAlign=\"Center\"><Text text=\"Weight\"/></Column><Column\n\t\t\t\t\t\t\thAlign=\"Right\"><Text text=\"Price\"/></Column></columns><items><ColumnListItem><cells><ObjectIdentifier\n\t\t\t\t\t\t\t\t\ttitle=\"{Name}\"\n\t\t\t\t\t\t\t\t\ttext=\"{ProductId}\"/><Text\n\t\t\t\t\t\t\t\t\ttext=\"{SupplierName}\"/><Text\n\t\t\t\t\t\t\t\t\ttext=\"{Width} x {Depth} x {Height} {DimUnit}\"/><ObjectNumber\n\t\t\t\t\t\t\t\t\tnumber=\"{WeightMeasure}\"\n\t\t\t\t\t\t\t\t\tunit=\"{WeightUnit}\"/><ObjectNumber\n\t\t\t\t\t\t\t\t\tnumber=\"{\n\t\t\t\t\t\t\t\t\t\tparts:[{path:'Price'},{path:'CurrencyCode'}],\n\t\t\t\t\t\t\t\t\t\ttype: 'sap.ui.model.type.Currency',\n\t\t\t\t\t\t\t\t\t\tformatOptions: {showMeasure: false}\n\t\t\t\t\t\t\t\t\t}\"\n\t\t\t\t\t\t\t\t\tunit=\"{CurrencyCode}\" /></cells></ColumnListItem></items></Table></l:flexContent></l:FixFlex></mvc:View>\n"
}, "web/ui5/test-resources/sap/ui/layout/demokit/sample/FixFlexMinFlexSize/Component-preload");