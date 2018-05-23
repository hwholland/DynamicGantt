sap.ui.require.preload({
	"web/ui5/test-resources/sap/m/demokit/sample/ObjectNumber/C.controller.js": "sap.ui.define([\"jquery.sap.global\",\"sap/ui/core/mvc/Controller\",\"sap/ui/model/json/JSONModel\"],function(e,o,s){\"use strict\";return o.extend(\"sap.m.sample.ObjectNumber.C\",{onInit:function(o){var t=new s(e.sap.getModulePath(\"sap.ui.demo.mock\",\"/products.json\"));this.getView().setModel(t)}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/ObjectNumber/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.m.sample.ObjectNumber.Component\",{metadata:{rootView:\"sap.m.sample.ObjectNumber.V\",dependencies:{libs:[\"sap.m\",\"sap.ui.layout\"]},config:{sample:{files:[\"V.view.xml\",\"C.controller.js\"]}}}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/ObjectNumber/V.view.xml": "<mvc:View\n\tcontrollerName=\"sap.m.sample.ObjectNumber.C\"\n\txmlns:l=\"sap.ui.layout\"\n\txmlns:mvc=\"sap.ui.core.mvc\"\n\txmlns=\"sap.m\"><l:VerticalLayout\n\t\tclass=\"sapUiContentPadding\"\n\t\twidth=\"100%\"><l:content><ObjectNumber\n\t\t\t\tclass=\"sapUiSmallMarginBottom\"\n\t\t\t\tbinding=\"{/ProductCollection/0}\"\n\t\t\t\tnumber=\"{\n\t\t\t\t\t\tparts:[{path:'Price'},{path:'CurrencyCode'}],\n\t\t\t\t\t\ttype: 'sap.ui.model.type.Currency',\n\t\t\t\t\t\tformatOptions: {showMeasure: false}\n\t\t\t\t\t}\"\n\t\t\t\tunit=\"{CurrencyCode}\" /><ObjectNumber\n\t\t\t\tclass=\"sapUiSmallMarginBottom\"\n\t\t\t\tbinding=\"{/ProductCollection/1}\"\n\t\t\t\tnumber=\"{\n\t\t\t\t\t\tparts:[{path:'Price'},{path:'CurrencyCode'}],\n\t\t\t\t\t\ttype: 'sap.ui.model.type.Currency',\n\t\t\t\t\t\tformatOptions: {showMeasure: false}\n\t\t\t\t\t}\"\n\t\t\t\tunit=\"{CurrencyCode}\"\n\t\t\t\tstate=\"Error\" /><ObjectNumber\n\t\t\t\tclass=\"sapUiSmallMarginBottom\"\n\t\t\t\tbinding=\"{/ProductCollection/2}\"\n\t\t\t\tnumber=\"{\n\t\t\t\t\t\tparts:[{path:'Price'},{path:'CurrencyCode'}],\n\t\t\t\t\t\ttype: 'sap.ui.model.type.Currency',\n\t\t\t\t\t\tformatOptions: {showMeasure: false}\n\t\t\t\t\t}\"\n\t\t\t\tunit=\"{CurrencyCode}\"\n\t\t\t\tstate=\"Warning\" /><ObjectNumber\n\t\t\t\tclass=\"sapUiSmallMarginBottom\"\n\t\t\t\tbinding=\"{/ProductCollection/3}\"\n\t\t\t\tnumber=\"{\n\t\t\t\t\t\tparts:[{path:'Price'},{path:'CurrencyCode'}],\n\t\t\t\t\t\ttype: 'sap.ui.model.type.Currency',\n\t\t\t\t\t\tformatOptions: {showMeasure: false}\n\t\t\t\t\t}\"\n\t\t\t\tunit=\"{CurrencyCode}\"\n\t\t\t\tstate=\"Success\" /></l:content></l:VerticalLayout></mvc:View>"
}, "web/ui5/test-resources/sap/m/demokit/sample/ObjectNumber/Component-preload");