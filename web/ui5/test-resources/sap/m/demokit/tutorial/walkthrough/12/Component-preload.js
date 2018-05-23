sap.ui.require.preload({
	"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/12/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.m.tutorial.walkthrough.12.Component\",{metadata:{config:{sample:{iframe:\"webapp/index.html\",stretch:!0,files:[\"webapp/controller/App.controller.js\",\"webapp/i18n/i18n.properties\",\"webapp/view/App.view.xml\",\"webapp/Component.js\",\"webapp/index.html\",\"webapp/manifest.json\"]}}}})});",
	"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/12/webapp/Component-preload.js": "sap.ui.require.preload({\"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/12/webapp/Component.js\":'sap.ui.define([\"sap/ui/core/UIComponent\",\"sap/ui/model/json/JSONModel\"],function(e,t){\"use strict\";return e.extend(\"sap.ui.demo.wt.Component\",{metadata:{manifest:\"json\"},init:function(){e.prototype.init.apply(this,arguments);var n=new t({recipient:{name:\"World\"}});this.setModel(n)}})});',\"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/12/webapp/controller/App.controller.js\":'sap.ui.define([\"sap/ui/core/mvc/Controller\",\"sap/m/MessageToast\"],function(e,t){\"use strict\";return e.extend(\"sap.ui.demo.wt.controller.App\",{onShowHello:function(){var e=this.getView().getModel(\"i18n\").getResourceBundle(),o=this.getView().getModel().getProperty(\"/recipient/name\"),i=e.getText(\"helloMsg\",[o]);t.show(i)}})});',\"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/12/webapp/view/App.view.xml\":'<mvc:View\\n\\tcontrollerName=\"sap.ui.demo.wt.controller.App\"\\n\\txmlns=\"sap.m\"\\n\\txmlns:mvc=\"sap.ui.core.mvc\"\\n\\tdisplayBlock=\"true\"><App><pages><Page title=\"{i18n>homePageTitle}\"><content><Panel\\n\\t\\t\\t\\t\\t\\theaderText=\"{i18n>helloPanelTitle}\"><content><Button\\n\\t\\t\\t\\t\\t\\t\\t\\ttext=\"{i18n>showHelloButtonText}\"\\n\\t\\t\\t\\t\\t\\t\\t\\tpress=\"onShowHello\" /><Input\\n\\t\\t\\t\\t\\t\\t\\t\\tvalue=\"{/recipient/name}\"\\n\\t\\t\\t\\t\\t\\t\\t\\tdescription=\"Hello {/recipient/name}\"\\n\\t\\t\\t\\t\\t\\t\\t\\tvalueLiveUpdate=\"true\"\\n\\t\\t\\t\\t\\t\\t\\t\\twidth=\"60%\" /></content></Panel></content></Page></pages></App></mvc:View>\\n',\"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/12/webapp/i18n/i18n.properties\":\"# App Descriptor\\nappTitle=SAPUI5 Walkthrough\\nappDescription=A simple walkthrough app that explains the most important concepts of SAPUI5\\n\\n# Hello Panel\\nshowHelloButtonText=Say Hello\\nhelloMsg=Hello {0}\\nhomePageTitle=SAPUI5 Walkthrough\\nhelloPanelTitle=Hello World\\n\"},\"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/12/webapp/Component-preload\");",
	"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/12/webapp/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\",\"sap/ui/model/json/JSONModel\"],function(e,t){\"use strict\";return e.extend(\"sap.ui.demo.wt.Component\",{metadata:{manifest:\"json\"},init:function(){e.prototype.init.apply(this,arguments);var n=new t({recipient:{name:\"World\"}});this.setModel(n)}})});",
	"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/12/webapp/controller/App.controller.js": "sap.ui.define([\"sap/ui/core/mvc/Controller\",\"sap/m/MessageToast\"],function(e,t){\"use strict\";return e.extend(\"sap.ui.demo.wt.controller.App\",{onShowHello:function(){var e=this.getView().getModel(\"i18n\").getResourceBundle(),o=this.getView().getModel().getProperty(\"/recipient/name\"),i=e.getText(\"helloMsg\",[o]);t.show(i)}})});",
	"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/12/webapp/view/App.view.xml": "<mvc:View\n\tcontrollerName=\"sap.ui.demo.wt.controller.App\"\n\txmlns=\"sap.m\"\n\txmlns:mvc=\"sap.ui.core.mvc\"\n\tdisplayBlock=\"true\"><App><pages><Page title=\"{i18n>homePageTitle}\"><content><Panel\n\t\t\t\t\t\theaderText=\"{i18n>helloPanelTitle}\"><content><Button\n\t\t\t\t\t\t\t\ttext=\"{i18n>showHelloButtonText}\"\n\t\t\t\t\t\t\t\tpress=\"onShowHello\" /><Input\n\t\t\t\t\t\t\t\tvalue=\"{/recipient/name}\"\n\t\t\t\t\t\t\t\tdescription=\"Hello {/recipient/name}\"\n\t\t\t\t\t\t\t\tvalueLiveUpdate=\"true\"\n\t\t\t\t\t\t\t\twidth=\"60%\" /></content></Panel></content></Page></pages></App></mvc:View>\n",
	"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/12/webapp/i18n/i18n.properties": "# App Descriptor\nappTitle=SAPUI5 Walkthrough\nappDescription=A simple walkthrough app that explains the most important concepts of SAPUI5\n\n# Hello Panel\nshowHelloButtonText=Say Hello\nhelloMsg=Hello {0}\nhomePageTitle=SAPUI5 Walkthrough\nhelloPanelTitle=Hello World\n"
}, "web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/12/Component-preload");