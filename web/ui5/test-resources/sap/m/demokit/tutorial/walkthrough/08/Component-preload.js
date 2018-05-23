sap.ui.require.preload({
	"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/08/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.m.tutorial.walkthrough.08.Component\",{metadata:{config:{sample:{iframe:\"webapp/index.html\",stretch:!0,files:[\"webapp/controller/App.controller.js\",\"webapp/i18n/i18n.properties\",\"webapp/view/App.view.xml\",\"webapp/index.html\"]}}}})});",
	"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/08/webapp/controller/App.controller.js": "sap.ui.define([\"sap/ui/core/mvc/Controller\",\"sap/m/MessageToast\",\"sap/ui/model/json/JSONModel\",\"sap/ui/model/resource/ResourceModel\"],function(e,t,o,i){\"use strict\";return e.extend(\"sap.ui.demo.wt.controller.App\",{onInit:function(){var e=new o({recipient:{name:\"World\"}});this.getView().setModel(e);var t=new i({bundleName:\"sap.ui.demo.wt.i18n.i18n\"});this.getView().setModel(t,\"i18n\")},onShowHello:function(){var e=this.getView().getModel(\"i18n\").getResourceBundle(),o=this.getView().getModel().getProperty(\"/recipient/name\"),i=e.getText(\"helloMsg\",[o]);t.show(i)}})});",
	"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/08/webapp/view/App.view.xml": "<mvc:View\n\tcontrollerName=\"sap.ui.demo.wt.controller.App\"\n\txmlns=\"sap.m\"\n\txmlns:mvc=\"sap.ui.core.mvc\"><Button\n\t\ttext=\"{i18n>showHelloButtonText}\"\n\t\tpress=\"onShowHello\"/><Input\n\t\tvalue=\"{/recipient/name}\"\n\t\tdescription=\"Hello {/recipient/name}\"\n\t\tvalueLiveUpdate=\"true\"\n\t\twidth=\"60%\"/></mvc:View>\n",
	"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/08/webapp/i18n/i18n.properties": "showHelloButtonText=Say Hello\nhelloMsg=Hello {0}\n"
}, "web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/08/Component-preload");