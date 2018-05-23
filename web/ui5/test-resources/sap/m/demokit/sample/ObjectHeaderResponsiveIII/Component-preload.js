sap.ui.require.preload({
	"web/ui5/test-resources/sap/m/demokit/sample/ObjectHeaderResponsiveIII/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.m.sample.ObjectHeaderResponsiveIII.Component\",{metadata:{rootView:\"sap.m.sample.ObjectHeaderResponsiveIII.Page\",dependencies:{libs:[\"sap.m\",\"sap.ui.layout\"]},config:{sample:{stretch:!0,files:[\"Page.view.xml\",\"Page.controller.js\"]}}}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/ObjectHeaderResponsiveIII/Page.controller.js": "sap.ui.define([\"jquery.sap.global\",\"sap/ui/core/Fragment\",\"sap/ui/core/mvc/Controller\",\"sap/ui/model/json/JSONModel\"],function(e,o,t,s){\"use strict\";return t.extend(\"sap.m.sample.ObjectHeaderResponsiveIII.Page\",{onInit:function(){var o=new s(e.sap.getModulePath(\"sap.ui.demo.mock\",\"/products.json\"));this.getView().setModel(o)},onExit:function(){this._oPopover&&this._oPopover.destroy()},_getPopover:function(){return this._oPopover||(this._oPopover=sap.ui.xmlfragment(\"sap.m.sample.ObjectHeaderResponsiveIII.Popover\",this),this.getView().addDependent(this._oPopover)),this._oPopover},handleTitlePress:function(e){var o=e.getParameter(\"domRef\");this._getPopover().openBy(o)}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/ObjectHeaderResponsiveIII/Popover.fragment.xml": "<core:FragmentDefinition\n\txmlns=\"sap.m\"\n\txmlns:core=\"sap.ui.core\"><ResponsivePopover\n\t\ttitle=\"About\"\n\t\tclass=\"sapUiContentPadding\"><content><Text text=\"... more content goes here\" /></content></ResponsivePopover></core:FragmentDefinition>",
	"web/ui5/test-resources/sap/m/demokit/sample/ObjectHeaderResponsiveIII/Page.view.xml": "<mvc:View\n\theight=\"100%\"\n\tcontrollerName=\"sap.m.sample.ObjectHeaderResponsiveIII.Page\"\n\txmlns:mvc=\"sap.ui.core.mvc\"\n\txmlns:l=\"sap.ui.layout\"\n\txmlns=\"sap.m\"><ObjectHeader\n\t\tid=\"oh1\"\n\t\tresponsive=\"true\"\n\t\tfullScreenOptimized=\"true\"\n\t\tbinding=\"{/ProductCollection/2}\"\n\t\ticon=\"{ProductPicUrl}\"\n\t\ticonAlt=\"{Name}\"\n\t\tintro=\"{Description}\"\n\t\ttitle=\"{Name}\"\n\t\ttitleActive=\"true\"\n\t\ttitlePress=\"handleTitlePress\"\n\t\tnumber=\"{\n\t\t\tparts:[{path:'Price'},{path:'CurrencyCode'}],\n\t\t\ttype: 'sap.ui.model.type.Currency',\n\t\t\tformatOptions: {showMeasure: false}\n\t\t}\"\n\t\tnumberUnit=\"{CurrencyCode}\"\n\t\tshowMarkers=\"true\"\n\t\tmarkFlagged=\"true\"\n\t\tmarkFavorite=\"true\"\n\t\tnumberState=\"Success\"\n\t\tbackgroundDesign=\"Translucent\"><attributes><ObjectAttribute\n\t\t\t\ttitle=\"ProductID\"\n\t\t\t\ttext=\"{ProductId}\"/><ObjectAttribute\n\t\t\t\ttitle=\"Manufacturer\"\n\t\t\t\ttext=\"{SupplierName}\"\n\t\t\t\tactive=\"true\"/><ObjectAttribute\n\t\t\t\ttitle=\"Category\"\n\t\t\t\ttext=\"{Category}\"/><ObjectAttribute\n\t\t\t\ttitle=\"Weight per unit\"\n\t\t\t\ttext=\"{WeightMeasure} {WeightUnit}\"/><ObjectAttribute\n\t\t\t\ttitle=\"Dimension per unit\"\n\t\t\t\ttext=\"{Width} x {Depth} x {Height} {DimUnit}\"/></attributes><statuses><ObjectStatus\n\t\t\t\ttitle=\"Approval\"\n\t\t\t\ttext=\"Pending\"\n\t\t\t\tstate=\"Warning\"/></statuses><headerContainer><IconTabBar\n\t\t\t\tid=\"itb1\"\n\t\t\t\tselectedKey=\"key3\"\n\t\t\t\tupperCase=\"true\"\n\t\t\t\tclass=\"sapUiResponsiveContentPadding\"><items><IconTabFilter\n\t\t\t\t\t\ticon=\"sap-icon://hint\"><Text text=\"Info content goes here ...\" /></IconTabFilter><IconTabFilter\n\t\t\t\t\t\ticon=\"sap-icon://attachment\"\n\t\t\t\t\t\tcount=\"3\"><Text text=\"Attachments go here ...\" /></IconTabFilter><IconTabFilter\n\t\t\t\t\t\ticon=\"sap-icon://notes\"\n\t\t\t\t\t\tcount=\"12\"><Text text=\"Notes go here ...\" /></IconTabFilter><IconTabFilter\n\t\t\t\t\t\ticon=\"sap-icon://group\"><Text text=\"People content goes here ...\" /></IconTabFilter></items></IconTabBar></headerContainer></ObjectHeader></mvc:View>\n"
}, "web/ui5/test-resources/sap/m/demokit/sample/ObjectHeaderResponsiveIII/Component-preload");