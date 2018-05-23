sap.ui.require.preload({
	"web/ui5/test-resources/sap/m/demokit/sample/ObjectHeaderCondensed/C.controller.js": "sap.ui.define([\"jquery.sap.global\",\"sap/ui/core/mvc/Controller\",\"sap/ui/model/json/JSONModel\"],function(e,o,s){\"use strict\";return o.extend(\"sap.m.sample.ObjectHeaderCondensed.C\",{onInit:function(o){var n=new s(e.sap.getModulePath(\"sap.ui.demo.mock\",\"/products.json\"));this.getView().setModel(n)}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/ObjectHeaderCondensed/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.m.sample.ObjectHeaderCondensed.Component\",{metadata:{rootView:\"sap.m.sample.ObjectHeaderCondensed.V\",dependencies:{libs:[\"sap.m\",\"sap.ui.layout\"]},config:{sample:{files:[\"V.view.xml\",\"C.controller.js\"]}}}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/ObjectHeaderCondensed/V.view.xml": "<mvc:View\n\tcontrollerName=\"sap.m.sample.ObjectHeaderCondensed.C\"\n\txmlns:l=\"sap.ui.layout\"\n\txmlns:mvc=\"sap.ui.core.mvc\"\n\txmlns=\"sap.m\"><ObjectHeader\n\t\tbinding=\"{/ProductCollection/0}\"\n\t\ttitle=\"{Name}\"\n\t\tcondensed=\"true\"\n\t\tnumber=\"{\n\t\t\tparts:[{path:'Price'},{path:'CurrencyCode'}],\n\t\t\ttype: 'sap.ui.model.type.Currency',\n\t\t\tformatOptions: {showMeasure: false}\n\t\t}\"\n\t\tnumberUnit=\"{CurrencyCode}\" ><attributes><ObjectAttribute text=\"{WeightMeasure} {WeightUnit} {Width} x {Depth} x {Height} {DimUnit}\" /></attributes></ObjectHeader></mvc:View>"
}, "web/ui5/test-resources/sap/m/demokit/sample/ObjectHeaderCondensed/Component-preload");