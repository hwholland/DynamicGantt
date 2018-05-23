sap.ui.require.preload({
	"web/ui5/test-resources/sap/m/demokit/sample/ObjectHeaderTitleActive/C.controller.js": "sap.ui.define([\"jquery.sap.global\",\"sap/ui/core/Fragment\",\"sap/ui/core/mvc/Controller\",\"sap/ui/model/json/JSONModel\"],function(e,o,t,i){\"use strict\";return t.extend(\"sap.m.sample.ObjectHeaderTitleActive.C\",{onInit:function(o){var t=new i(e.sap.getModulePath(\"sap.ui.demo.mock\",\"/products.json\"));this.getView().setModel(t)},onExit:function(){this._oPopover&&this._oPopover.destroy()},_getPopover:function(){return this._oPopover||(this._oPopover=sap.ui.xmlfragment(\"sap.m.sample.ObjectHeaderTitleActive.Popover\",this)),this._oPopover},handleTitlePress:function(e){var o=e.getParameter(\"domRef\");this._getPopover().openBy(o)}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/ObjectHeaderTitleActive/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.m.sample.ObjectHeaderTitleActive.Component\",{metadata:{rootView:\"sap.m.sample.ObjectHeaderTitleActive.V\",dependencies:{libs:[\"sap.m\",\"sap.ui.layout\"]},config:{sample:{files:[\"V.view.xml\",\"C.controller.js\",\"Popover.fragment.xml\"]}}}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/ObjectHeaderTitleActive/Popover.fragment.xml": "<core:FragmentDefinition\n\txmlns=\"sap.m\"\n\txmlns:core=\"sap.ui.core\"><ResponsivePopover\n\t\ttitle=\"About\"\n\t\tclass=\"sapUiContentPadding\"><content><Text text=\"... more content goes here\" /></content></ResponsivePopover></core:FragmentDefinition>",
	"web/ui5/test-resources/sap/m/demokit/sample/ObjectHeaderTitleActive/V.view.xml": "<mvc:View\n\tcontrollerName=\"sap.m.sample.ObjectHeaderTitleActive.C\"\n\txmlns:l=\"sap.ui.layout\"\n\txmlns:mvc=\"sap.ui.core.mvc\"\n\txmlns=\"sap.m\"><ObjectHeader\n\t\tbinding=\"{/ProductCollection/0}\"\n\t\ttitle=\"{Name}\"\n\t\ttitleActive=\"true\"\n\t\ttitlePress=\"handleTitlePress\"\n\t\tnumber=\"{\n\t\t\tparts:[{path:'Price'},{path:'CurrencyCode'}],\n\t\t\ttype: 'sap.ui.model.type.Currency',\n\t\t\tformatOptions: {showMeasure: false}\n\t\t}\"\n\t\tnumberUnit=\"{CurrencyCode}\" ><attributes><ObjectAttribute text=\"{WeightMeasure} {WeightUnit}\" /><ObjectAttribute text=\"{Width} x {Depth} x {Height} {DimUnit}\" /></attributes></ObjectHeader></mvc:View>"
}, "web/ui5/test-resources/sap/m/demokit/sample/ObjectHeaderTitleActive/Component-preload");