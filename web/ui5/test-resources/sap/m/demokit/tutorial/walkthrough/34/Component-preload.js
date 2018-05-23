sap.ui.require.preload({
	"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/34/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.m.tutorial.walkthrough.34.Component\",{metadata:{config:{sample:{iframe:\"webapp/test/mockServer.html\",stretch:!0,files:[\"webapp/control/ProductRating.js\",\"webapp/controller/App.controller.js\",\"webapp/controller/Detail.controller.js\",\"webapp/controller/HelloDialog.js\",\"webapp/controller/HelloPanel.controller.js\",\"webapp/controller/InvoiceList.controller.js\",\"webapp/css/style.css\",\"webapp/i18n/i18n.properties\",\"webapp/localService/mockdata/Invoices.json\",\"webapp/localService/metadata.xml\",\"webapp/localService/mockserver.js\",\"webapp/model/formatter.js\",\"webapp/view/App.view.xml\",\"webapp/view/Detail.view.xml\",\"webapp/view/HelloDialog.fragment.xml\",\"webapp/view/HelloPanel.view.xml\",\"webapp/view/InvoiceList.view.xml\",\"webapp/view/Overview.view.xml\",\"webapp/Component.js\",\"webapp/index.html\",\"webapp/manifest.json\",\"webapp/test/mockServer.html\",\"webapp/test/integration/pages/App.js\",\"webapp/test/integration/navigationJourney.js\",\"webapp/test/integration/opaTests.qunit.html\",\"webapp/test/unit/model/formatter.js\",\"webapp/test/unit/unitTests.qunit.html\"]}}}})});",
	"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/34/webapp/Component-preload.js": "sap.ui.require.preload({\"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/34/webapp/Component.js\":'sap.ui.define([\"sap/ui/core/UIComponent\",\"sap/ui/model/json/JSONModel\",\"sap/ui/demo/wt/controller/HelloDialog\"],function(e,t,i){\"use strict\";return e.extend(\"sap.ui.demo.wt.Component\",{metadata:{manifest:\"json\"},init:function(){e.prototype.init.apply(this,arguments);var o=new t({recipient:{name:\"World\"}});this.setModel(o),this.helloDialog=new i,this.getRouter().initialize()}})});',\"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/34/webapp/control/ProductRating.js\":'sap.ui.define([\"sap/ui/core/Control\",\"sap/m/RatingIndicator\",\"sap/m/Label\",\"sap/m/Button\"],function(t,e,i,a){\"use strict\";return t.extend(\"sap.ui.demo.wt.control.ProductRating\",{metadata:{properties:{value:{type:\"float\",defaultValue:0}},aggregations:{_rating:{type:\"sap.m.RatingIndicator\",multiple:!1,visibility:\"hidden\"},_label:{type:\"sap.m.Label\",multiple:!1,visibility:\"hidden\"},_button:{type:\"sap.m.Button\",multiple:!1,visibility:\"hidden\"}},events:{change:{parameters:{value:{type:\"int\"}}}}},init:function(){this.setAggregation(\"_rating\",new e({value:this.getValue(),iconSize:\"2rem\",visualMode:\"Half\",liveChange:this._onRate.bind(this)})),this.setAggregation(\"_label\",new i({text:\"{i18n>productRatingLabelInitial}\"}).addStyleClass(\"sapUiTinyMargin\")),this.setAggregation(\"_button\",new a({text:\"{i18n>productRatingButton}\",press:this._onSubmit.bind(this)}))},setValue:function(t){this.setProperty(\"value\",t,!0),this.getAggregation(\"_rating\").setValue(t)},_onRate:function(t){var e=this.getModel(\"i18n\").getResourceBundle(),i=t.getParameter(\"value\");this.setValue(i),this.getAggregation(\"_label\").setText(e.getText(\"productRatingLabelIndicator\",[i,t.getSource().getMaxValue()])),this.getAggregation(\"_label\").setDesign(\"Bold\")},_onSubmit:function(t){var e=this.getModel(\"i18n\").getResourceBundle();this.getAggregation(\"_rating\").setEnabled(!1),this.getAggregation(\"_label\").setText(e.getText(\"productRatingLabelFinal\")),this.getAggregation(\"_button\").setEnabled(!1),this.fireEvent(\"change\",{value:this.getValue()})},renderer:function(t,e){t.write(\"<div\"),t.writeControlData(e),t.addClass(\"myAppDemoWTProductRating\"),t.writeClasses(),t.write(\">\"),t.renderControl(e.getAggregation(\"_rating\")),t.renderControl(e.getAggregation(\"_label\")),t.renderControl(e.getAggregation(\"_button\")),t.write(\"</div>\")}})});',\"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/34/webapp/controller/App.controller.js\":'sap.ui.define([\"sap/ui/core/mvc/Controller\"],function(e){\"use strict\";return e.extend(\"sap.ui.demo.wt.controller.App\",{onOpenDialog:function(){this.getOwnerComponent().helloDialog.open(this.getView())}})});',\"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/34/webapp/controller/Detail.controller.js\":'sap.ui.define([\"sap/ui/core/mvc/Controller\",\"sap/ui/core/routing/History\",\"sap/m/MessageToast\"],function(e,t,o){\"use strict\";return e.extend(\"sap.ui.demo.wt.controller.Detail\",{onInit:function(){sap.ui.core.UIComponent.getRouterFor(this).getRoute(\"detail\").attachPatternMatched(this._onObjectMatched,this)},_onObjectMatched:function(e){this.getView().bindElement({path:\"/\"+e.getParameter(\"arguments\").invoicePath,model:\"invoice\"})},onNavBack:function(){void 0!==t.getInstance().getPreviousHash()?window.history.go(-1):sap.ui.core.UIComponent.getRouterFor(this).navTo(\"overview\")},onRatingChange:function(e){var t=e.getParameter(\"value\"),n=this.getView().getModel(\"i18n\").getResourceBundle();o.show(n.getText(\"ratingConfirmation\",[t]))}})});',\"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/34/webapp/controller/HelloDialog.js\":'sap.ui.define([\"sap/ui/base/Object\"],function(i){\"use strict\";return i.extend(\"sap.ui.demo.wt.controller.HelloDialog\",{_getDialog:function(){return this._oDialog||(this._oDialog=sap.ui.xmlfragment(\"sap.ui.demo.wt.view.HelloDialog\",this)),this._oDialog},open:function(i){var o=this._getDialog();i.addDependent(o),o.open()},onCloseDialog:function(){this._getDialog().close()}})});',\"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/34/webapp/controller/HelloPanel.controller.js\":'sap.ui.define([\"sap/ui/core/mvc/Controller\",\"sap/m/MessageToast\"],function(e,t){\"use strict\";return e.extend(\"sap.ui.demo.wt.controller.HelloPanel\",{onShowHello:function(){var e=this.getView().getModel(\"i18n\").getResourceBundle(),o=this.getView().getModel().getProperty(\"/recipient/name\"),n=e.getText(\"helloMsg\",[o]);t.show(n)},onOpenDialog:function(){this.getOwnerComponent().helloDialog.open(this.getView())}})});',\"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/34/webapp/controller/InvoiceList.controller.js\":'sap.ui.define([\"sap/ui/core/mvc/Controller\",\"sap/ui/model/json/JSONModel\",\"sap/ui/demo/wt/model/formatter\",\"sap/ui/model/Filter\",\"sap/ui/model/FilterOperator\"],function(e,t,i,o,n){\"use strict\";return e.extend(\"sap.ui.demo.wt.controller.InvoiceList\",{formatter:i,onInit:function(){var e=new t({currency:\"EUR\"});this.getView().setModel(e,\"view\")},onFilterInvoices:function(e){var t=[],i=e.getParameter(\"query\");i&&t.push(new o(\"ProductName\",n.Contains,i)),this.getView().byId(\"invoiceList\").getBinding(\"items\").filter(t)},onPress:function(e){var t=e.getSource();sap.ui.core.UIComponent.getRouterFor(this).navTo(\"detail\",{invoicePath:t.getBindingContext(\"invoice\").getPath().substr(1)})}})});',\"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/34/webapp/localService/mockserver.js\":'sap.ui.define([\"sap/ui/core/util/MockServer\"],function(e){\"use strict\";return{init:function(){var t=new e({rootUri:\"/destinations/northwind/V2/Northwind/Northwind.svc/\"}),r=jQuery.sap.getUriParameters();e.config({autoRespond:!0,autoRespondAfter:r.get(\"serverDelay\")||1e3});var a=jQuery.sap.getModulePath(\"sap.ui.demo.wt.localService\");t.simulate(a+\"/metadata.xml\",a+\"/mockdata\"),t.start()}}});',\"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/34/webapp/model/formatter.js\":'sap.ui.define([],function(){\"use strict\";return{statusText:function(e){var t=this.getView().getModel(\"i18n\").getResourceBundle();switch(e){case\"A\":return t.getText(\"invoiceStatusA\");case\"B\":return t.getText(\"invoiceStatusB\");case\"C\":return t.getText(\"invoiceStatusC\");default:return e}}}});',\"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/34/webapp/test/integration/navigationJourney.js\":'sap.ui.require([\"sap/ui/test/opaQunit\"],function(){\"use strict\";QUnit.module(\"Navigation\"),opaTest(\"Should open the hello dialog\",function(e,a,o){e.iStartMyAppInAFrame(jQuery.sap.getResourcePath(\"sap/ui/demo/app/test\",\".html\")),a.onTheAppPage.iPressTheSayHelloWithDialogButton(),o.onTheAppPage.iShouldSeeTheHelloDialog().and.iTeardownMyAppFrame()})});',\"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/34/webapp/test/integration/pages/App.js\":'sap.ui.require([\"sap/ui/test/Opa5\"],function(e){\"use strict\";e.createPageObjects({onTheAppPage:{actions:{iPressTheSayHelloWithDialogButton:function(){return this.waitFor({controlType:\"sap.m.Button\",success:function(e){e[0].$().trigger(\"tap\")},errorMessage:\"Did not find the helloDialogButton button on the app page\"})}},assertions:{iShouldSeeTheHelloDialog:function(){return this.waitFor({controlType:\"sap.m.Dialog\",success:function(){e.assert.ok(!0,\"The dialog is open\")},errorMessage:\"Did not find the dialog control\"})}}}})});',\"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/34/webapp/test/unit/model/formatter.js\":'sap.ui.require([\"sap/ui/demo/wt/model/formatter\",\"sap/ui/model/resource/ResourceModel\",\"sap/ui/thirdparty/sinon\",\"sap/ui/thirdparty/sinon-qunit\"],function(t,e){\"use strict\";QUnit.module(\"Formatting functions\",{setup:function(){this._oResourceModel=new e({bundleUrl:jQuery.sap.getModulePath(\"sap.ui.demo.wt\",\"/i18n/i18n.properties\")})},teardown:function(){this._oResourceModel.destroy()}}),QUnit.test(\"Should return the translated texts\",function(e){var s={getModel:this.stub().withArgs(\"i18n\").returns(this._oResourceModel)},o={getView:this.stub().returns(s)},r=t.statusText.bind(o);e.strictEqual(r(\"A\"),\"New\",\"The long text for status A is correct\"),e.strictEqual(r(\"B\"),\"In Progress\",\"The long text for status B is correct\"),e.strictEqual(r(\"C\"),\"Done\",\"The long text for status C is correct\"),e.strictEqual(r(\"Foo\"),\"Foo\",\"The long text for status Foo is correct\")})});',\"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/34/webapp/view/HelloDialog.fragment.xml\":'<core:FragmentDefinition\\n\\txmlns=\"sap.m\"\\n\\txmlns:core=\"sap.ui.core\"><Dialog\\n\\t\\ttitle=\"Hello {/recipient/name}\"><content><core:Icon\\n\\t\\t\\t\\tsrc=\"sap-icon://hello-world\"\\n\\t\\t\\t\\tsize=\"8rem\"\\n\\t\\t\\t\\tclass=\"sapUiMediumMargin\"/></content><beginButton><Button\\n\\t\\t\\t\\ttext=\"{i18n>dialogCloseButtonText}\"\\n\\t\\t\\t\\tpress=\"onCloseDialog\"/></beginButton></Dialog></core:FragmentDefinition>\\n',\"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/34/webapp/view/App.view.xml\":'<mvc:View\\n\\tcontrollerName=\"sap.ui.demo.wt.controller.App\"\\n\\txmlns=\"sap.m\"\\n\\txmlns:mvc=\"sap.ui.core.mvc\"\\n\\tdisplayBlock=\"true\"><App class=\"myAppDemoWT\" id=\"app\"/></mvc:View>\\n',\"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/34/webapp/view/Detail.view.xml\":'<mvc:View\\n\\tcontrollerName=\"sap.ui.demo.wt.controller.Detail\"\\n\\txmlns=\"sap.m\"\\n\\txmlns:mvc=\"sap.ui.core.mvc\"\\n\\txmlns:wt=\"sap.ui.demo.wt.control\"><Page\\n\\t\\ttitle=\"{i18n>detailPageTitle}\"\\n\\t\\tshowNavButton=\"true\"\\n\\t\\tnavButtonPress=\"onNavBack\"><ObjectHeader\\n\\t\\t\\tintro=\"{invoice>ShipperName}\"\\n\\t\\t\\ttitle=\"{invoice>ProductName}\"/><wt:ProductRating class=\"sapUiSmallMarginBeginEnd\" change=\"onRatingChange\"/></Page></mvc:View>\\n',\"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/34/webapp/view/HelloPanel.view.xml\":'<mvc:View\\n\\tcontrollerName=\"sap.ui.demo.wt.controller.HelloPanel\"\\n\\txmlns=\"sap.m\"\\n\\txmlns:mvc=\"sap.ui.core.mvc\"><Panel\\n\\t\\theaderText=\"{i18n>helloPanelTitle}\"\\n\\t\\tclass=\"sapUiResponsiveMargin\"\\n\\t\\twidth=\"auto\"><content><Button\\n\\t\\t\\t\\ticon=\"sap-icon://world\"\\n\\t\\t\\t\\ttext=\"{i18n>openDialogButtonText}\"\\n\\t\\t\\t\\tpress=\"onOpenDialog\"\\n\\t\\t\\t\\tclass=\"sapUiSmallMarginEnd\"/><Button\\n\\t\\t\\t\\ttext=\"{i18n>showHelloButtonText}\"\\n\\t\\t\\t\\tpress=\"onShowHello\"\\n\\t\\t\\t\\tclass=\"myCustomButton\"/><Input\\n\\t\\t\\t\\tvalue=\"{/recipient/name}\"\\n\\t\\t\\t\\tvalueLiveUpdate=\"true\"\\n\\t\\t\\t\\twidth=\"60%\"/><Text\\n\\t\\t\\t\\ttext=\"Hello {/recipient/name}\"\\n\\t\\t\\t\\tclass=\"sapUiSmallMargin sapThemeHighlight-asColor myCustomText\"/></content></Panel></mvc:View>\\n',\"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/34/webapp/view/InvoiceList.view.xml\":'<mvc:View\\n\\tcontrollerName=\"sap.ui.demo.wt.controller.InvoiceList\"\\n\\txmlns=\"sap.m\"\\n\\txmlns:mvc=\"sap.ui.core.mvc\"><List\\n\\t\\tid=\"invoiceList\"\\n\\t\\tclass=\"sapUiResponsiveMargin\"\\n\\t\\twidth=\"auto\"\\n\\t\\titems=\"{\\n\\t\\t\\tpath : \\'invoice>/Invoices\\',\\n\\t\\t\\tsorter : {\\n\\t\\t\\t\\tpath : \\'ShipperName\\',\\n\\t\\t\\t\\tgroup : true\\n\\t\\t\\t}\\n\\t\\t}\"><headerToolbar><Toolbar><Title text=\"{i18n>invoiceListTitle}\"/><ToolbarSpacer/><SearchField width=\"50%\" search=\"onFilterInvoices\" selectOnFocus=\"false\"/></Toolbar></headerToolbar><items><ObjectListItem\\n\\t\\t\\t\\ttitle=\"{invoice>Quantity} x {invoice>ProductName}\"\\n\\t\\t\\t\\tnumber=\"{\\n\\t\\t\\t\\t\\t\\tparts: [{path: \\'invoice>ExtendedPrice\\'}, {path: \\'view>/currency\\'}],\\n\\t\\t\\t\\t\\t\\ttype: \\'sap.ui.model.type.Currency\\',\\n\\t\\t\\t\\t\\t\\tformatOptions: {\\n\\t\\t\\t\\t\\t\\t\\tshowMeasure: false\\n\\t\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t\\t}\"\\n\\t\\t\\t\\tnumberUnit=\"{view>/currency}\"\\n\\t\\t\\t\\tnumberState=\"{=\\t${invoice>ExtendedPrice} > 50 ? \\'Error\\' : \\'Success\\' }\"\\n\\t\\t\\t\\ttype=\"Navigation\"\\n\\t\\t\\t\\tpress=\"onPress\"><firstStatus><ObjectStatus text=\"{\\n\\t\\t\\t\\t\\t\\tpath: \\'invoice>Status\\',\\n\\t\\t\\t\\t\\t\\tformatter: \\'.formatter.statusText\\'\\n\\t\\t\\t\\t\\t}\"/></firstStatus></ObjectListItem></items></List></mvc:View>\\n',\"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/34/webapp/view/Overview.view.xml\":'<mvc:View\\n\\tcontrollerName=\"sap.ui.demo.wt.controller.App\"\\n\\txmlns=\"sap.m\"\\n\\txmlns:mvc=\"sap.ui.core.mvc\"><Page title=\"{i18n>homePageTitle}\"><headerContent><Button\\n\\t\\t\\t\\ticon=\"sap-icon://hello-world\"\\n\\t\\t\\t\\tpress=\"onOpenDialog\"/></headerContent><content><mvc:XMLView viewName=\"sap.ui.demo.wt.view.HelloPanel\"/><mvc:XMLView viewName=\"sap.ui.demo.wt.view.InvoiceList\"/></content></Page></mvc:View>\\n',\"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/34/webapp/i18n/i18n.properties\":\"# App Descriptor\\nappTitle=SAPUI5 Walkthrough\\nappDescription=A simple walkthrough app that explains the most important concepts of SAPUI5\\n\\n# Hello Panel\\nshowHelloButtonText=Say Hello\\nhelloMsg=Hello {0}\\nhomePageTitle=SAPUI5 Walkthrough\\nhelloPanelTitle=Hello World\\nopenDialogButtonText=Say Hello With Dialog\\ndialogCloseButtonText=Ok\\n\\n# Invoice List\\ninvoiceListTitle=Invoices\\ninvoiceStatusA=New\\ninvoiceStatusB=In Progress\\ninvoiceStatusC=Done\\n\\n# Detail Page\\ndetailPageTitle=SAPUI5 Walkthrough - Details\\nratingConfirmation=You have rated this product with {0} stars\\n\\n# Product Rating\\nproductRatingLabelInitial=Please rate this product\\nproductRatingLabelIndicator=Your rating: {0} out of {1}\\nproductRatingLabelFinal=Thank you!\\nproductRatingButton=Rate\\n\"},\"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/34/webapp/Component-preload\");",
	"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/34/webapp/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\",\"sap/ui/model/json/JSONModel\",\"sap/ui/demo/wt/controller/HelloDialog\"],function(e,t,i){\"use strict\";return e.extend(\"sap.ui.demo.wt.Component\",{metadata:{manifest:\"json\"},init:function(){e.prototype.init.apply(this,arguments);var o=new t({recipient:{name:\"World\"}});this.setModel(o),this.helloDialog=new i,this.getRouter().initialize()}})});",
	"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/34/webapp/control/ProductRating.js": "sap.ui.define([\"sap/ui/core/Control\",\"sap/m/RatingIndicator\",\"sap/m/Label\",\"sap/m/Button\"],function(t,e,i,a){\"use strict\";return t.extend(\"sap.ui.demo.wt.control.ProductRating\",{metadata:{properties:{value:{type:\"float\",defaultValue:0}},aggregations:{_rating:{type:\"sap.m.RatingIndicator\",multiple:!1,visibility:\"hidden\"},_label:{type:\"sap.m.Label\",multiple:!1,visibility:\"hidden\"},_button:{type:\"sap.m.Button\",multiple:!1,visibility:\"hidden\"}},events:{change:{parameters:{value:{type:\"int\"}}}}},init:function(){this.setAggregation(\"_rating\",new e({value:this.getValue(),iconSize:\"2rem\",visualMode:\"Half\",liveChange:this._onRate.bind(this)})),this.setAggregation(\"_label\",new i({text:\"{i18n>productRatingLabelInitial}\"}).addStyleClass(\"sapUiTinyMargin\")),this.setAggregation(\"_button\",new a({text:\"{i18n>productRatingButton}\",press:this._onSubmit.bind(this)}))},setValue:function(t){this.setProperty(\"value\",t,!0),this.getAggregation(\"_rating\").setValue(t)},_onRate:function(t){var e=this.getModel(\"i18n\").getResourceBundle(),i=t.getParameter(\"value\");this.setValue(i),this.getAggregation(\"_label\").setText(e.getText(\"productRatingLabelIndicator\",[i,t.getSource().getMaxValue()])),this.getAggregation(\"_label\").setDesign(\"Bold\")},_onSubmit:function(t){var e=this.getModel(\"i18n\").getResourceBundle();this.getAggregation(\"_rating\").setEnabled(!1),this.getAggregation(\"_label\").setText(e.getText(\"productRatingLabelFinal\")),this.getAggregation(\"_button\").setEnabled(!1),this.fireEvent(\"change\",{value:this.getValue()})},renderer:function(t,e){t.write(\"<div\"),t.writeControlData(e),t.addClass(\"myAppDemoWTProductRating\"),t.writeClasses(),t.write(\">\"),t.renderControl(e.getAggregation(\"_rating\")),t.renderControl(e.getAggregation(\"_label\")),t.renderControl(e.getAggregation(\"_button\")),t.write(\"</div>\")}})});",
	"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/34/webapp/controller/App.controller.js": "sap.ui.define([\"sap/ui/core/mvc/Controller\"],function(e){\"use strict\";return e.extend(\"sap.ui.demo.wt.controller.App\",{onOpenDialog:function(){this.getOwnerComponent().helloDialog.open(this.getView())}})});",
	"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/34/webapp/controller/Detail.controller.js": "sap.ui.define([\"sap/ui/core/mvc/Controller\",\"sap/ui/core/routing/History\",\"sap/m/MessageToast\"],function(e,t,o){\"use strict\";return e.extend(\"sap.ui.demo.wt.controller.Detail\",{onInit:function(){sap.ui.core.UIComponent.getRouterFor(this).getRoute(\"detail\").attachPatternMatched(this._onObjectMatched,this)},_onObjectMatched:function(e){this.getView().bindElement({path:\"/\"+e.getParameter(\"arguments\").invoicePath,model:\"invoice\"})},onNavBack:function(){void 0!==t.getInstance().getPreviousHash()?window.history.go(-1):sap.ui.core.UIComponent.getRouterFor(this).navTo(\"overview\")},onRatingChange:function(e){var t=e.getParameter(\"value\"),n=this.getView().getModel(\"i18n\").getResourceBundle();o.show(n.getText(\"ratingConfirmation\",[t]))}})});",
	"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/34/webapp/controller/HelloDialog.js": "sap.ui.define([\"sap/ui/base/Object\"],function(i){\"use strict\";return i.extend(\"sap.ui.demo.wt.controller.HelloDialog\",{_getDialog:function(){return this._oDialog||(this._oDialog=sap.ui.xmlfragment(\"sap.ui.demo.wt.view.HelloDialog\",this)),this._oDialog},open:function(i){var o=this._getDialog();i.addDependent(o),o.open()},onCloseDialog:function(){this._getDialog().close()}})});",
	"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/34/webapp/controller/HelloPanel.controller.js": "sap.ui.define([\"sap/ui/core/mvc/Controller\",\"sap/m/MessageToast\"],function(e,t){\"use strict\";return e.extend(\"sap.ui.demo.wt.controller.HelloPanel\",{onShowHello:function(){var e=this.getView().getModel(\"i18n\").getResourceBundle(),o=this.getView().getModel().getProperty(\"/recipient/name\"),n=e.getText(\"helloMsg\",[o]);t.show(n)},onOpenDialog:function(){this.getOwnerComponent().helloDialog.open(this.getView())}})});",
	"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/34/webapp/controller/InvoiceList.controller.js": "sap.ui.define([\"sap/ui/core/mvc/Controller\",\"sap/ui/model/json/JSONModel\",\"sap/ui/demo/wt/model/formatter\",\"sap/ui/model/Filter\",\"sap/ui/model/FilterOperator\"],function(e,t,i,o,n){\"use strict\";return e.extend(\"sap.ui.demo.wt.controller.InvoiceList\",{formatter:i,onInit:function(){var e=new t({currency:\"EUR\"});this.getView().setModel(e,\"view\")},onFilterInvoices:function(e){var t=[],i=e.getParameter(\"query\");i&&t.push(new o(\"ProductName\",n.Contains,i)),this.getView().byId(\"invoiceList\").getBinding(\"items\").filter(t)},onPress:function(e){var t=e.getSource();sap.ui.core.UIComponent.getRouterFor(this).navTo(\"detail\",{invoicePath:t.getBindingContext(\"invoice\").getPath().substr(1)})}})});",
	"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/34/webapp/localService/mockserver.js": "sap.ui.define([\"sap/ui/core/util/MockServer\"],function(e){\"use strict\";return{init:function(){var t=new e({rootUri:\"/destinations/northwind/V2/Northwind/Northwind.svc/\"}),r=jQuery.sap.getUriParameters();e.config({autoRespond:!0,autoRespondAfter:r.get(\"serverDelay\")||1e3});var a=jQuery.sap.getModulePath(\"sap.ui.demo.wt.localService\");t.simulate(a+\"/metadata.xml\",a+\"/mockdata\"),t.start()}}});",
	"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/34/webapp/model/formatter.js": "sap.ui.define([],function(){\"use strict\";return{statusText:function(e){var t=this.getView().getModel(\"i18n\").getResourceBundle();switch(e){case\"A\":return t.getText(\"invoiceStatusA\");case\"B\":return t.getText(\"invoiceStatusB\");case\"C\":return t.getText(\"invoiceStatusC\");default:return e}}}});",
	"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/34/webapp/test/integration/navigationJourney.js": "sap.ui.require([\"sap/ui/test/opaQunit\"],function(){\"use strict\";QUnit.module(\"Navigation\"),opaTest(\"Should open the hello dialog\",function(e,a,o){e.iStartMyAppInAFrame(jQuery.sap.getResourcePath(\"sap/ui/demo/app/test\",\".html\")),a.onTheAppPage.iPressTheSayHelloWithDialogButton(),o.onTheAppPage.iShouldSeeTheHelloDialog().and.iTeardownMyAppFrame()})});",
	"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/34/webapp/test/integration/pages/App.js": "sap.ui.require([\"sap/ui/test/Opa5\"],function(e){\"use strict\";e.createPageObjects({onTheAppPage:{actions:{iPressTheSayHelloWithDialogButton:function(){return this.waitFor({controlType:\"sap.m.Button\",success:function(e){e[0].$().trigger(\"tap\")},errorMessage:\"Did not find the helloDialogButton button on the app page\"})}},assertions:{iShouldSeeTheHelloDialog:function(){return this.waitFor({controlType:\"sap.m.Dialog\",success:function(){e.assert.ok(!0,\"The dialog is open\")},errorMessage:\"Did not find the dialog control\"})}}}})});",
	"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/34/webapp/test/unit/model/formatter.js": "sap.ui.require([\"sap/ui/demo/wt/model/formatter\",\"sap/ui/model/resource/ResourceModel\",\"sap/ui/thirdparty/sinon\",\"sap/ui/thirdparty/sinon-qunit\"],function(t,e){\"use strict\";QUnit.module(\"Formatting functions\",{setup:function(){this._oResourceModel=new e({bundleUrl:jQuery.sap.getModulePath(\"sap.ui.demo.wt\",\"/i18n/i18n.properties\")})},teardown:function(){this._oResourceModel.destroy()}}),QUnit.test(\"Should return the translated texts\",function(e){var s={getModel:this.stub().withArgs(\"i18n\").returns(this._oResourceModel)},o={getView:this.stub().returns(s)},r=t.statusText.bind(o);e.strictEqual(r(\"A\"),\"New\",\"The long text for status A is correct\"),e.strictEqual(r(\"B\"),\"In Progress\",\"The long text for status B is correct\"),e.strictEqual(r(\"C\"),\"Done\",\"The long text for status C is correct\"),e.strictEqual(r(\"Foo\"),\"Foo\",\"The long text for status Foo is correct\")})});",
	"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/34/webapp/view/HelloDialog.fragment.xml": "<core:FragmentDefinition\n\txmlns=\"sap.m\"\n\txmlns:core=\"sap.ui.core\"><Dialog\n\t\ttitle=\"Hello {/recipient/name}\"><content><core:Icon\n\t\t\t\tsrc=\"sap-icon://hello-world\"\n\t\t\t\tsize=\"8rem\"\n\t\t\t\tclass=\"sapUiMediumMargin\"/></content><beginButton><Button\n\t\t\t\ttext=\"{i18n>dialogCloseButtonText}\"\n\t\t\t\tpress=\"onCloseDialog\"/></beginButton></Dialog></core:FragmentDefinition>\n",
	"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/34/webapp/view/App.view.xml": "<mvc:View\n\tcontrollerName=\"sap.ui.demo.wt.controller.App\"\n\txmlns=\"sap.m\"\n\txmlns:mvc=\"sap.ui.core.mvc\"\n\tdisplayBlock=\"true\"><App class=\"myAppDemoWT\" id=\"app\"/></mvc:View>\n",
	"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/34/webapp/view/Detail.view.xml": "<mvc:View\n\tcontrollerName=\"sap.ui.demo.wt.controller.Detail\"\n\txmlns=\"sap.m\"\n\txmlns:mvc=\"sap.ui.core.mvc\"\n\txmlns:wt=\"sap.ui.demo.wt.control\"><Page\n\t\ttitle=\"{i18n>detailPageTitle}\"\n\t\tshowNavButton=\"true\"\n\t\tnavButtonPress=\"onNavBack\"><ObjectHeader\n\t\t\tintro=\"{invoice>ShipperName}\"\n\t\t\ttitle=\"{invoice>ProductName}\"/><wt:ProductRating class=\"sapUiSmallMarginBeginEnd\" change=\"onRatingChange\"/></Page></mvc:View>\n",
	"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/34/webapp/view/HelloPanel.view.xml": "<mvc:View\n\tcontrollerName=\"sap.ui.demo.wt.controller.HelloPanel\"\n\txmlns=\"sap.m\"\n\txmlns:mvc=\"sap.ui.core.mvc\"><Panel\n\t\theaderText=\"{i18n>helloPanelTitle}\"\n\t\tclass=\"sapUiResponsiveMargin\"\n\t\twidth=\"auto\"><content><Button\n\t\t\t\ticon=\"sap-icon://world\"\n\t\t\t\ttext=\"{i18n>openDialogButtonText}\"\n\t\t\t\tpress=\"onOpenDialog\"\n\t\t\t\tclass=\"sapUiSmallMarginEnd\"/><Button\n\t\t\t\ttext=\"{i18n>showHelloButtonText}\"\n\t\t\t\tpress=\"onShowHello\"\n\t\t\t\tclass=\"myCustomButton\"/><Input\n\t\t\t\tvalue=\"{/recipient/name}\"\n\t\t\t\tvalueLiveUpdate=\"true\"\n\t\t\t\twidth=\"60%\"/><Text\n\t\t\t\ttext=\"Hello {/recipient/name}\"\n\t\t\t\tclass=\"sapUiSmallMargin sapThemeHighlight-asColor myCustomText\"/></content></Panel></mvc:View>\n",
	"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/34/webapp/view/InvoiceList.view.xml": "<mvc:View\n\tcontrollerName=\"sap.ui.demo.wt.controller.InvoiceList\"\n\txmlns=\"sap.m\"\n\txmlns:mvc=\"sap.ui.core.mvc\"><List\n\t\tid=\"invoiceList\"\n\t\tclass=\"sapUiResponsiveMargin\"\n\t\twidth=\"auto\"\n\t\titems=\"{\n\t\t\tpath : 'invoice>/Invoices',\n\t\t\tsorter : {\n\t\t\t\tpath : 'ShipperName',\n\t\t\t\tgroup : true\n\t\t\t}\n\t\t}\"><headerToolbar><Toolbar><Title text=\"{i18n>invoiceListTitle}\"/><ToolbarSpacer/><SearchField width=\"50%\" search=\"onFilterInvoices\" selectOnFocus=\"false\"/></Toolbar></headerToolbar><items><ObjectListItem\n\t\t\t\ttitle=\"{invoice>Quantity} x {invoice>ProductName}\"\n\t\t\t\tnumber=\"{\n\t\t\t\t\t\tparts: [{path: 'invoice>ExtendedPrice'}, {path: 'view>/currency'}],\n\t\t\t\t\t\ttype: 'sap.ui.model.type.Currency',\n\t\t\t\t\t\tformatOptions: {\n\t\t\t\t\t\t\tshowMeasure: false\n\t\t\t\t\t\t}\n\t\t\t\t\t}\"\n\t\t\t\tnumberUnit=\"{view>/currency}\"\n\t\t\t\tnumberState=\"{=\t${invoice>ExtendedPrice} > 50 ? 'Error' : 'Success' }\"\n\t\t\t\ttype=\"Navigation\"\n\t\t\t\tpress=\"onPress\"><firstStatus><ObjectStatus text=\"{\n\t\t\t\t\t\tpath: 'invoice>Status',\n\t\t\t\t\t\tformatter: '.formatter.statusText'\n\t\t\t\t\t}\"/></firstStatus></ObjectListItem></items></List></mvc:View>\n",
	"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/34/webapp/view/Overview.view.xml": "<mvc:View\n\tcontrollerName=\"sap.ui.demo.wt.controller.App\"\n\txmlns=\"sap.m\"\n\txmlns:mvc=\"sap.ui.core.mvc\"><Page title=\"{i18n>homePageTitle}\"><headerContent><Button\n\t\t\t\ticon=\"sap-icon://hello-world\"\n\t\t\t\tpress=\"onOpenDialog\"/></headerContent><content><mvc:XMLView viewName=\"sap.ui.demo.wt.view.HelloPanel\"/><mvc:XMLView viewName=\"sap.ui.demo.wt.view.InvoiceList\"/></content></Page></mvc:View>\n",
	"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/34/webapp/i18n/i18n.properties": "# App Descriptor\nappTitle=SAPUI5 Walkthrough\nappDescription=A simple walkthrough app that explains the most important concepts of SAPUI5\n\n# Hello Panel\nshowHelloButtonText=Say Hello\nhelloMsg=Hello {0}\nhomePageTitle=SAPUI5 Walkthrough\nhelloPanelTitle=Hello World\nopenDialogButtonText=Say Hello With Dialog\ndialogCloseButtonText=Ok\n\n# Invoice List\ninvoiceListTitle=Invoices\ninvoiceStatusA=New\ninvoiceStatusB=In Progress\ninvoiceStatusC=Done\n\n# Detail Page\ndetailPageTitle=SAPUI5 Walkthrough - Details\nratingConfirmation=You have rated this product with {0} stars\n\n# Product Rating\nproductRatingLabelInitial=Please rate this product\nproductRatingLabelIndicator=Your rating: {0} out of {1}\nproductRatingLabelFinal=Thank you!\nproductRatingButton=Rate\n"
}, "web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/34/Component-preload");