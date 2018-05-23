sap.ui.require.preload({
	"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/17/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.m.tutorial.walkthrough.17.Component\",{metadata:{config:{sample:{iframe:\"webapp/index.html\",stretch:!0,files:[\"webapp/controller/App.controller.js\",\"webapp/controller/HelloPanel.controller.js\",\"webapp/css/style.css\",\"webapp/i18n/i18n.properties\",\"webapp/view/App.view.xml\",\"webapp/view/HelloDialog.fragment.xml\",\"webapp/view/HelloPanel.view.xml\",\"webapp/Component.js\",\"webapp/index.html\",\"webapp/manifest.json\"]}}}})});",
	"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/17/webapp/Component-preload.js": "sap.ui.require.preload({\"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/17/webapp/Component.js\":'sap.ui.define([\"sap/ui/core/UIComponent\",\"sap/ui/model/json/JSONModel\"],function(e,t){\"use strict\";return e.extend(\"sap.ui.demo.wt.Component\",{metadata:{manifest:\"json\"},init:function(){e.prototype.init.apply(this,arguments);var n=new t({recipient:{name:\"World\"}});this.setModel(n)}})});',\"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/17/webapp/controller/App.controller.js\":'sap.ui.define([\"sap/ui/core/mvc/Controller\"],function(e){\"use strict\";return e.extend(\"sap.ui.demo.wt.controller.App\",{})});',\"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/17/webapp/controller/HelloPanel.controller.js\":'sap.ui.define([\"sap/ui/core/mvc/Controller\",\"sap/m/MessageToast\"],function(e,o){\"use strict\";return e.extend(\"sap.ui.demo.wt.controller.HelloPanel\",{onShowHello:function(){var e=this.getView().getModel(\"i18n\").getResourceBundle(),t=this.getView().getModel().getProperty(\"/recipient/name\"),i=e.getText(\"helloMsg\",[t]);o.show(i)},_getDialog:function(){return this._oDialog||(this._oDialog=sap.ui.xmlfragment(\"sap.ui.demo.wt.view.HelloDialog\",this),this.getView().addDependent(this._oDialog)),this._oDialog},onOpenDialog:function(){this._getDialog().open()},onCloseDialog:function(){this._getDialog().close()}})});',\"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/17/webapp/view/HelloDialog.fragment.xml\":'<core:FragmentDefinition\\n\\txmlns=\"sap.m\"\\n\\txmlns:core=\"sap.ui.core\"><Dialog\\n\\t\\ttitle=\"Hello {/recipient/name}\"><beginButton><Button\\n\\t\\t\\t\\ttext=\"{i18n>dialogCloseButtonText}\"\\n\\t\\t\\t\\tpress=\"onCloseDialog\"/></beginButton></Dialog></core:FragmentDefinition>\\n',\"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/17/webapp/view/App.view.xml\":'<mvc:View\\n\\tcontrollerName=\"sap.ui.demo.wt.controller.App\"\\n\\txmlns=\"sap.m\"\\n\\txmlns:mvc=\"sap.ui.core.mvc\"\\n\\tdisplayBlock=\"true\"><App class=\"myAppDemoWT\"><pages><Page title=\"{i18n>homePageTitle}\"><content><mvc:XMLView viewName=\"sap.ui.demo.wt.view.HelloPanel\"/></content></Page></pages></App></mvc:View>\\n',\"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/17/webapp/view/HelloPanel.view.xml\":'<mvc:View\\n\\tcontrollerName=\"sap.ui.demo.wt.controller.HelloPanel\"\\n\\txmlns=\"sap.m\"\\n\\txmlns:mvc=\"sap.ui.core.mvc\"><Panel\\n\\t\\theaderText=\"{i18n>helloPanelTitle}\"\\n\\t\\tclass=\"sapUiResponsiveMargin\"\\n\\t\\twidth=\"auto\"><content><Button\\n\\t\\t\\t\\ttext=\"{i18n>openDialogButtonText}\"\\n\\t\\t\\t\\tpress=\"onOpenDialog\"\\n\\t\\t\\t\\tclass=\"sapUiSmallMarginEnd\"/><Button\\n\\t\\t\\t\\ttext=\"{i18n>showHelloButtonText}\"\\n\\t\\t\\t\\tpress=\"onShowHello\"\\n\\t\\t\\t\\tclass=\"myCustomButton\"/><Input\\n\\t\\t\\t\\tvalue=\"{/recipient/name}\"\\n\\t\\t\\t\\tvalueLiveUpdate=\"true\"\\n\\t\\t\\t\\twidth=\"60%\"/><Text\\n\\t\\t\\t\\ttext=\"Hello {/recipient/name}\"\\n\\t\\t\\t\\tclass=\"sapUiSmallMargin sapThemeHighlight-asColor myCustomText\"/></content></Panel></mvc:View>\\n',\"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/17/webapp/i18n/i18n.properties\":\"# App Descriptor\\nappTitle=SAPUI5 Walkthrough\\nappDescription=A simple walkthrough app that explains the most important concepts of SAPUI5\\n\\n# Hello Panel\\nshowHelloButtonText=Say Hello\\nhelloMsg=Hello {0}\\nhomePageTitle=SAPUI5 Walkthrough\\nhelloPanelTitle=Hello World\\nopenDialogButtonText=Say Hello With Dialog\\ndialogCloseButtonText=Ok\\n\"},\"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/17/webapp/Component-preload\");",
	"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/17/webapp/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\",\"sap/ui/model/json/JSONModel\"],function(e,t){\"use strict\";return e.extend(\"sap.ui.demo.wt.Component\",{metadata:{manifest:\"json\"},init:function(){e.prototype.init.apply(this,arguments);var n=new t({recipient:{name:\"World\"}});this.setModel(n)}})});",
	"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/17/webapp/controller/App.controller.js": "sap.ui.define([\"sap/ui/core/mvc/Controller\"],function(e){\"use strict\";return e.extend(\"sap.ui.demo.wt.controller.App\",{})});",
	"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/17/webapp/controller/HelloPanel.controller.js": "sap.ui.define([\"sap/ui/core/mvc/Controller\",\"sap/m/MessageToast\"],function(e,o){\"use strict\";return e.extend(\"sap.ui.demo.wt.controller.HelloPanel\",{onShowHello:function(){var e=this.getView().getModel(\"i18n\").getResourceBundle(),t=this.getView().getModel().getProperty(\"/recipient/name\"),i=e.getText(\"helloMsg\",[t]);o.show(i)},_getDialog:function(){return this._oDialog||(this._oDialog=sap.ui.xmlfragment(\"sap.ui.demo.wt.view.HelloDialog\",this),this.getView().addDependent(this._oDialog)),this._oDialog},onOpenDialog:function(){this._getDialog().open()},onCloseDialog:function(){this._getDialog().close()}})});",
	"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/17/webapp/view/HelloDialog.fragment.xml": "<core:FragmentDefinition\n\txmlns=\"sap.m\"\n\txmlns:core=\"sap.ui.core\"><Dialog\n\t\ttitle=\"Hello {/recipient/name}\"><beginButton><Button\n\t\t\t\ttext=\"{i18n>dialogCloseButtonText}\"\n\t\t\t\tpress=\"onCloseDialog\"/></beginButton></Dialog></core:FragmentDefinition>\n",
	"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/17/webapp/view/App.view.xml": "<mvc:View\n\tcontrollerName=\"sap.ui.demo.wt.controller.App\"\n\txmlns=\"sap.m\"\n\txmlns:mvc=\"sap.ui.core.mvc\"\n\tdisplayBlock=\"true\"><App class=\"myAppDemoWT\"><pages><Page title=\"{i18n>homePageTitle}\"><content><mvc:XMLView viewName=\"sap.ui.demo.wt.view.HelloPanel\"/></content></Page></pages></App></mvc:View>\n",
	"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/17/webapp/view/HelloPanel.view.xml": "<mvc:View\n\tcontrollerName=\"sap.ui.demo.wt.controller.HelloPanel\"\n\txmlns=\"sap.m\"\n\txmlns:mvc=\"sap.ui.core.mvc\"><Panel\n\t\theaderText=\"{i18n>helloPanelTitle}\"\n\t\tclass=\"sapUiResponsiveMargin\"\n\t\twidth=\"auto\"><content><Button\n\t\t\t\ttext=\"{i18n>openDialogButtonText}\"\n\t\t\t\tpress=\"onOpenDialog\"\n\t\t\t\tclass=\"sapUiSmallMarginEnd\"/><Button\n\t\t\t\ttext=\"{i18n>showHelloButtonText}\"\n\t\t\t\tpress=\"onShowHello\"\n\t\t\t\tclass=\"myCustomButton\"/><Input\n\t\t\t\tvalue=\"{/recipient/name}\"\n\t\t\t\tvalueLiveUpdate=\"true\"\n\t\t\t\twidth=\"60%\"/><Text\n\t\t\t\ttext=\"Hello {/recipient/name}\"\n\t\t\t\tclass=\"sapUiSmallMargin sapThemeHighlight-asColor myCustomText\"/></content></Panel></mvc:View>\n",
	"web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/17/webapp/i18n/i18n.properties": "# App Descriptor\nappTitle=SAPUI5 Walkthrough\nappDescription=A simple walkthrough app that explains the most important concepts of SAPUI5\n\n# Hello Panel\nshowHelloButtonText=Say Hello\nhelloMsg=Hello {0}\nhomePageTitle=SAPUI5 Walkthrough\nhelloPanelTitle=Hello World\nopenDialogButtonText=Say Hello With Dialog\ndialogCloseButtonText=Ok\n"
}, "web/ui5/test-resources/sap/m/demokit/tutorial/walkthrough/17/Component-preload");