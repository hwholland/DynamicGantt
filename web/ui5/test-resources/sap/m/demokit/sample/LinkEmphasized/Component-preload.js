sap.ui.require.preload({
	"web/ui5/test-resources/sap/m/demokit/sample/LinkEmphasized/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.m.sample.LinkEmphasized.Component\",{metadata:{rootView:\"sap.m.sample.LinkEmphasized.Link\",dependencies:{libs:[\"sap.m\"]},config:{sample:{files:[\"Link.view.xml\",\"Link.controller.js\"]}}}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/LinkEmphasized/Link.controller.js": "sap.ui.define([\"jquery.sap.global\",\"sap/ui/core/mvc/Controller\",\"sap/ui/model/json/JSONModel\"],function(e,o,s){\"use strict\";return o.extend(\"sap.m.sample.LinkEmphasized.Link\",{onInit:function(){var o=new s(e.sap.getModulePath(\"sap.ui.demo.mock\",\"/products.json\"));this.getView().setModel(o)}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/LinkEmphasized/Link.view.xml": "<mvc:View\n\tcontrollerName=\"sap.m.sample.LinkEmphasized.Link\"\n\txmlns:mvc=\"sap.ui.core.mvc\"\n\txmlns=\"sap.m\"><Table id=\"idProductsTable\"\n\t\tinset=\"false\"\n\t\titems=\"{\n\t\t\tpath: '/ProductCollection',\n\t\t\tsorter: {\n\t\t\t\tpath: 'Name'\n\t\t\t}\n\t\t}\"><headerToolbar><Toolbar><Title text=\"Products\" level=\"H2\"/></Toolbar></headerToolbar><columns><Column\n\t\t\t\twidth=\"12em\"><Text text=\"Product\" /></Column><Column\n\t\t\t\tminScreenWidth=\"Tablet\"\n\t\t\t\tdemandPopin=\"true\"><Text text=\"Supplier\" /></Column><Column\n\t\t\t\tminScreenWidth=\"Tablet\"\n\t\t\t\tdemandPopin=\"true\"\n\t\t\t\thAlign=\"Right\"><Text text=\"Dimensions\" /></Column><Column\n\t\t\t\tminScreenWidth=\"Tablet\"\n\t\t\t\tdemandPopin=\"true\"\n\t\t\t\thAlign=\"Right\"><Text text=\"Weight\" /></Column><Column\n\t\t\t\thAlign=\"Right\"><Text text=\"Price\" /></Column></columns><items><ColumnListItem><cells><Link\n\t\t\t\t\t\ttext=\"{ProductId}\"\n\t\t\t\t\t\temphasized=\"true\"\n\t\t\t\t\t\thref=\"{ProductPicUrl}\" /><Text\n\t\t\t\t\t\ttext=\"{SupplierName}\" /><Text\n\t\t\t\t\t\ttext=\"{Width} x {Depth} x {Height} {DimUnit}\" /><ObjectNumber\n\t\t\t\t\t\tnumber=\"{WeightMeasure}\"\n\t\t\t\t\t\tunit=\"{WeightUnit}\"/><ObjectNumber\n\t\t\t\t\t\tnumber=\"{\n\t\t\t\t\t\t\tparts:[{path:'Price'},{path:'CurrencyCode'}],\n\t\t\t\t\t\t\ttype: 'sap.ui.model.type.Currency',\n\t\t\t\t\t\t\tformatOptions: {showMeasure: false}\n\t\t\t\t\t\t}\"\n\t\t\t\t\t\tunit=\"{CurrencyCode}\" /></cells></ColumnListItem></items></Table></mvc:View>"
}, "web/ui5/test-resources/sap/m/demokit/sample/LinkEmphasized/Component-preload");