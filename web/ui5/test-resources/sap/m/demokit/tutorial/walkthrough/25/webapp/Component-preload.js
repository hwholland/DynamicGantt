sap.ui.require.preload({
	"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/25/webapp/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\",\"sap/ui/model/json/JSONModel\",\"sap/ui/demo/wt/controller/HelloDialog\"],function(e,o,t){\"use strict\";return e.extend(\"sap.ui.demo.wt.Component\",{metadata:{manifest:\"json\"},init:function(){e.prototype.init.apply(this,arguments);var i=new o({recipient:{name:\"World\"}});this.setModel(i),this.helloDialog=new t}})});",
	"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/25/webapp/controller/App.controller.js": "sap.ui.define([\"sap/ui/core/mvc/Controller\"],function(e){\"use strict\";return e.extend(\"sap.ui.demo.wt.controller.App\",{onOpenDialog:function(){this.getOwnerComponent().helloDialog.open(this.getView())}})});",
	"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/25/webapp/controller/HelloDialog.js": "sap.ui.define([\"sap/ui/base/Object\"],function(i){\"use strict\";return i.extend(\"sap.ui.demo.wt.controller.HelloDialog\",{_getDialog:function(){return this._oDialog||(this._oDialog=sap.ui.xmlfragment(\"sap.ui.demo.wt.view.HelloDialog\",this)),this._oDialog},open:function(i){var o=this._getDialog();i.addDependent(o),o.open()},onCloseDialog:function(){this._getDialog().close()}})});",
	"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/25/webapp/controller/HelloPanel.controller.js": "sap.ui.define([\"sap/ui/core/mvc/Controller\",\"sap/m/MessageToast\"],function(e,t){\"use strict\";return e.extend(\"sap.ui.demo.wt.controller.HelloPanel\",{onShowHello:function(){var e=this.getView().getModel(\"i18n\").getResourceBundle(),o=this.getView().getModel().getProperty(\"/recipient/name\"),n=e.getText(\"helloMsg\",[o]);t.show(n)},onOpenDialog:function(){this.getOwnerComponent().helloDialog.open(this.getView())}})});",
	"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/25/webapp/controller/InvoiceList.controller.js": "sap.ui.define([\"sap/ui/core/mvc/Controller\",\"sap/ui/model/json/JSONModel\",\"sap/ui/demo/wt/model/formatter\",\"sap/ui/model/Filter\",\"sap/ui/model/FilterOperator\"],function(e,t,i,o,r){\"use strict\";return e.extend(\"sap.ui.demo.wt.controller.InvoiceList\",{formatter:i,onInit:function(){var e=new t({currency:\"EUR\"});this.getView().setModel(e,\"view\")},onFilterInvoices:function(e){var t=[],i=e.getParameter(\"query\");i&&t.push(new o(\"ProductName\",r.Contains,i)),this.getView().byId(\"invoiceList\").getBinding(\"items\").filter(t)}})});",
	"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/25/webapp/model/formatter.js": "sap.ui.define([],function(){\"use strict\";return{statusText:function(e){var t=this.getView().getModel(\"i18n\").getResourceBundle();switch(e){case\"A\":return t.getText(\"invoiceStatusA\");case\"B\":return t.getText(\"invoiceStatusB\");case\"C\":return t.getText(\"invoiceStatusC\");default:return e}}}});",
	"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/25/webapp/view/HelloDialog.fragment.xml": "<core:FragmentDefinition\n\txmlns=\"sap.m\"\n\txmlns:core=\"sap.ui.core\"><Dialog\n\t\ttitle=\"Hello {/recipient/name}\"><content><core:Icon\n\t\t\t\tsrc=\"sap-icon://hello-world\"\n\t\t\t\tsize=\"8rem\"\n\t\t\t\tclass=\"sapUiMediumMargin\" /></content><beginButton><Button\n\t\t\t\ttext=\"{i18n>dialogCloseButtonText}\"\n\t\t\t\tpress=\"onCloseDialog\" /></beginButton></Dialog></core:FragmentDefinition>\n",
	"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/25/webapp/view/App.view.xml": "<mvc:View\n\tcontrollerName=\"sap.ui.demo.wt.controller.App\"\n\txmlns=\"sap.m\"\n\txmlns:mvc=\"sap.ui.core.mvc\"\n\tdisplayBlock=\"true\"><App class=\"myAppDemoWT\"><pages><Page title=\"{i18n>homePageTitle}\"><headerContent><Button\n\t\t\t\t\t\ticon=\"sap-icon://hello-world\"\n\t\t\t\t\t \tpress=\"onOpenDialog\" /></headerContent><content><mvc:XMLView viewName=\"sap.ui.demo.wt.view.HelloPanel\" /><mvc:XMLView viewName=\"sap.ui.demo.wt.view.InvoiceList\" /></content></Page></pages></App></mvc:View>\n",
	"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/25/webapp/view/HelloPanel.view.xml": "<mvc:View\n\tcontrollerName=\"sap.ui.demo.wt.controller.HelloPanel\"\n\txmlns=\"sap.m\"\n\txmlns:mvc=\"sap.ui.core.mvc\"><Panel\n\t\theaderText=\"{i18n>helloPanelTitle}\"\n\t\tclass=\"sapUiResponsiveMargin\"\n\t\twidth=\"auto\" ><content><Button\n\t\t\t\ticon=\"sap-icon://world\"\n\t\t\t\ttext=\"{i18n>openDialogButtonText}\"\n\t\t\t\tpress=\"onOpenDialog\"\n\t\t\t\tclass=\"sapUiSmallMarginEnd\" /><Button\n\t\t\t\ttext=\"{i18n>showHelloButtonText}\"\n\t\t\t\tpress=\"onShowHello\"\n\t\t\t\tclass=\"myCustomButton\"/><Input\n\t\t\t\tvalue=\"{/recipient/name}\"\n\t\t\t\tvalueLiveUpdate=\"true\"\n\t\t\t\twidth=\"60%\" /><Text\n\t\t\t\ttext=\"Hello {/recipient/name}\"\n\t\t\t\tclass=\"sapUiSmallMargin sapThemeHighlight-asColor myCustomText\"/></content></Panel></mvc:View>\n",
	"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/25/webapp/view/InvoiceList.view.xml": "<mvc:View\n\tcontrollerName=\"sap.ui.demo.wt.controller.InvoiceList\"\n\txmlns=\"sap.m\"\n\txmlns:mvc=\"sap.ui.core.mvc\"><List\n\t\tid=\"invoiceList\"\n\t\tclass=\"sapUiResponsiveMargin\"\n\t\twidth=\"auto\"\n\t\titems=\"{\n\t\t\tpath : 'invoice>/Invoices',\n\t\t\tsorter : {\n\t\t\t\tpath : 'ShipperName',\n\t\t\t\tgroup : true\n\t\t\t}\n\t\t}\"><headerToolbar><Toolbar><Title text=\"{i18n>invoiceListTitle}\"/><ToolbarSpacer/><SearchField width=\"50%\" search=\"onFilterInvoices\" selectOnFocus=\"false\"/></Toolbar></headerToolbar><items><ObjectListItem\n\t\t\t\ttitle=\"{invoice>Quantity} x {invoice>ProductName}\"\n\t\t\t\tnumber=\"{\n\t\t\t\t\tparts: [{path: 'invoice>ExtendedPrice'}, {path: 'view>/currency'}],\n\t\t\t\t\ttype: 'sap.ui.model.type.Currency',\n\t\t\t\t\tformatOptions: {\n\t\t\t\t\t\tshowMeasure: false\n\t\t\t\t\t}\n\t\t\t\t}\"\n\t\t\t\tnumberUnit=\"{view>/currency}\"\n\t\t\t\tnumberState=\"{=\t${invoice>ExtendedPrice} > 50 ? 'Error' : 'Success' }\"><firstStatus><ObjectStatus text=\"{\n\t\t\t\t\t\tpath: 'invoice>Status',\n\t\t\t\t\t\tformatter: '.formatter.statusText'\n\t\t\t\t\t}\"/></firstStatus></ObjectListItem></items></List></mvc:View>\n",
	"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/25/webapp/i18n/i18n.properties": "# App Descriptor\nappTitle=SAPUI5 Walkthrough\nappDescription=A simple walkthrough app that explains the most important concepts of SAPUI5\n\n# Hello Panel\nshowHelloButtonText=Say Hello\nhelloMsg=Hello {0}\nhomePageTitle=SAPUI5 Walkthrough\nhelloPanelTitle=Hello World\nopenDialogButtonText=Say Hello With Dialog\ndialogCloseButtonText=Ok\n\n# Invoice List\ninvoiceListTitle=Invoices\ninvoiceStatusA=New\ninvoiceStatusB=In Progress\ninvoiceStatusC=Done\n"
}, "web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/25/webapp/Component-preload");