sap.ui.require.preload({
	"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/07/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.m.tutorial.walkthrough.07.Component\",{metadata:{config:{sample:{iframe:\"webapp/index.html\",stretch:!0,files:[\"webapp/controller/App.controller.js\",\"webapp/view/App.view.xml\",\"webapp/index.html\"]}}}})});",
	"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/07/webapp/controller/App.controller.js": "sap.ui.define([\"sap/ui/core/mvc/Controller\",\"sap/m/MessageToast\",\"sap/ui/model/json/JSONModel\"],function(e,o,n){\"use strict\";return e.extend(\"sap.ui.demo.wt.controller.App\",{onInit:function(){var e=new n({recipient:{name:\"World\"}});this.getView().setModel(e)},onShowHello:function(){o.show(\"Hello World\")}})});",
	"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/07/webapp/view/App.view.xml": "<mvc:View\n\tcontrollerName=\"sap.ui.demo.wt.controller.App\"\n\txmlns=\"sap.m\"\n\txmlns:mvc=\"sap.ui.core.mvc\"><Button\n\t\ttext=\"Say Hello\"\n\t\tpress=\"onShowHello\" /><Input\n\t\tvalue=\"{/recipient/name}\"\n\t\tdescription=\"Hello {/recipient/name}\"\n\t\tvalueLiveUpdate=\"true\"\n\t\twidth=\"60%\" /></mvc:View>\n"
}, "web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/07/Component-preload");