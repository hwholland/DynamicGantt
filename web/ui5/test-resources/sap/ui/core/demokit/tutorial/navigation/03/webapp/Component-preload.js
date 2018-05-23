sap.ui.require.preload({
	"web/ui5/test-resources/sap/ui/core/demokit/tutorial/navigation/03/webapp/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(t){\"use strict\";return t.extend(\"sap.ui.demo.nav.Component\",{metadata:{manifest:\"json\"},init:function(){t.prototype.init.apply(this,arguments),this.getRouter().initialize()}})});",
	"web/ui5/test-resources/sap/ui/core/demokit/tutorial/navigation/03/webapp/controller/App.controller.js": "sap.ui.define([\"sap/ui/core/mvc/Controller\"],function(n){\"use strict\";return n.extend(\"sap.ui.demo.nav.controller.App\",{onInit:function(){}})});",
	"web/ui5/test-resources/sap/ui/core/demokit/tutorial/navigation/03/webapp/controller/Home.controller.js": "sap.ui.define([\"sap/ui/core/mvc/Controller\"],function(e){\"use strict\";return e.extend(\"sap.ui.demo.nav.controller.Home\",{})});",
	"web/ui5/test-resources/sap/ui/core/demokit/tutorial/navigation/03/webapp/controller/NotFound.controller.js": "sap.ui.define([\"sap/ui/core/mvc/Controller\"],function(n){\"use strict\";return n.extend(\"sap.ui.demo.nav.controller.NotFound\",{onInit:function(){}})});",
	"web/ui5/test-resources/sap/ui/core/demokit/tutorial/navigation/03/webapp/localService/mockserver.js": "sap.ui.define([\"sap/ui/core/util/MockServer\"],function(e){\"use strict\";return{init:function(){var a=jQuery.sap.getModulePath(\"sap/ui/demo/nav/manifest\",\".json\"),t=jQuery.sap.getModulePath(\"sap/ui/demo/nav/localService/mockdata\"),o=jQuery.sap.syncGetJSON(a).data[\"sap.app\"].dataSources.employeeRemote,s=jQuery.sap.getModulePath(\"sap/ui/demo/nav/\"+o.settings.localUri.replace(\".xml\",\"\"),\".xml\"),u=new e({rootUri:o.uri});e.config({autoRespond:!0,autoRespondAfter:1e3}),u.simulate(s,{sMockdataBaseUrl:t}),u.start()}}});",
	"web/ui5/test-resources/sap/ui/core/demokit/tutorial/navigation/03/webapp/view/App.view.xml": "<mvc:View\n\tcontrollerName=\"sap.ui.demo.nav.controller.App\"\n\txmlns=\"sap.m\"\n\txmlns:mvc=\"sap.ui.core.mvc\"\n\tdisplayBlock=\"true\"><App id=\"app\"/></mvc:View>\n",
	"web/ui5/test-resources/sap/ui/core/demokit/tutorial/navigation/03/webapp/view/Home.view.xml": "<mvc:View\n\tcontrollerName=\"sap.ui.demo.nav.controller.Home\"\n\txmlns=\"sap.m\"\n\txmlns:mvc=\"sap.ui.core.mvc\"><Page title=\"{i18n>homePageTitle}\" class=\"sapUiResponsiveContentPadding\"><content><Button text=\"{i18n>iWantToNavigate}\" class=\"sapUiTinyMarginEnd\"/></content></Page></mvc:View>\n",
	"web/ui5/test-resources/sap/ui/core/demokit/tutorial/navigation/03/webapp/view/NotFound.view.xml": "<mvc:View\n\tcontrollerName=\"sap.ui.demo.nav.controller.NotFound\"\n\txmlns=\"sap.m\"\n\txmlns:mvc=\"sap.ui.core.mvc\"><MessagePage\n\t\ttitle=\"{i18n>NotFound}\"\n\t\ttext=\"{i18n>NotFound.text}\"\n\t\tdescription=\"{i18n>NotFound.description}\"/></mvc:View>\n",
	"web/ui5/test-resources/sap/ui/core/demokit/tutorial/navigation/03/webapp/i18n/i18n.properties": "# App Descriptor\nappTitle=SAPUI5 Navigation\nappDescription=A simple app that explains how to use navigation and routing features of SAPUI5\n\niWantToNavigate=I want to navigate\nhomePageTitle=Home\n\nNotFound=Not Found\nNotFound.text=Sorry, but the requested resource is not available.\nNotFound.description=Please check the URL and try again.\n"
}, "web/ui5/test-resources/sap/ui/core/demokit/tutorial/navigation/03/webapp/Component-preload");