sap.ui.require.preload({
	"web/ui5/test-resources/sap/ui/core/demokit/tutorial/navigation/05/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.ui.core.tutorial.navigation.05.Component\",{metadata:{config:{sample:{iframe:\"webapp/index.html\",stretch:!0,files:[\"webapp/controller/App.controller.js\",\"webapp/controller/BaseController.js\",\"webapp/controller/Home.controller.js\",\"webapp/controller/NotFound.controller.js\",\"webapp/i18n/i18n.properties\",\"webapp/view/App.view.xml\",\"webapp/view/Home.view.xml\",\"webapp/view/NotFound.view.xml\",\"webapp/Component.js\",\"webapp/index.html\",\"webapp/manifest.json\",\"webapp/localService/mockdata/Employees.json\",\"webapp/localService/metadata.xml\",\"webapp/localService/mockdata/Resumes.json\",\"webapp/localService/mockserver.js\"]}}}})});",
	"web/ui5/test-resources/sap/ui/core/demokit/tutorial/navigation/05/webapp/Component-preload.js": "sap.ui.require.preload({\"web/ui5/test-resources/sap/ui/core/demokit/tutorial/navigation/05/webapp/Component.js\":'sap.ui.define([\"sap/ui/core/UIComponent\"],function(t){\"use strict\";return t.extend(\"sap.ui.demo.nav.Component\",{metadata:{manifest:\"json\"},init:function(){t.prototype.init.apply(this,arguments),this.getRouter().initialize()}})});',\"web/ui5/test-resources/sap/ui/core/demokit/tutorial/navigation/05/webapp/controller/App.controller.js\":'sap.ui.define([\"sap/ui/demo/nav/controller/BaseController\"],function(n){\"use strict\";return n.extend(\"sap.ui.demo.nav.controller.App\",{onInit:function(){}})});',\"web/ui5/test-resources/sap/ui/core/demokit/tutorial/navigation/05/webapp/controller/BaseController.js\":'sap.ui.define([\"sap/ui/core/mvc/Controller\",\"sap/ui/core/routing/History\"],function(o,e){\"use strict\";return o.extend(\"sap.ui.demo.nav.controller.BaseController\",{getRouter:function(){return sap.ui.core.UIComponent.getRouterFor(this)},onNavBack:function(o){void 0!==e.getInstance().getPreviousHash()?window.history.go(-1):this.getRouter().navTo(\"appHome\",{},!0)}})});',\"web/ui5/test-resources/sap/ui/core/demokit/tutorial/navigation/05/webapp/controller/Home.controller.js\":'sap.ui.define([\"sap/ui/demo/nav/controller/BaseController\"],function(e){\"use strict\";return e.extend(\"sap.ui.demo.nav.controller.Home\",{onDisplayNotFound:function(e){this.getRouter().getTargets().display(\"notFound\",{fromTarget:\"home\"})}})});',\"web/ui5/test-resources/sap/ui/core/demokit/tutorial/navigation/05/webapp/controller/NotFound.controller.js\":'sap.ui.define([\"sap/ui/demo/nav/controller/BaseController\"],function(t){\"use strict\";return t.extend(\"sap.ui.demo.nav.controller.NotFound\",{onInit:function(){this.getRouter().getTarget(\"notFound\").attachDisplay(function(t){this._oData=t.getParameter(\"data\")},this)},onNavBack:function(a){if(this._oData&&this._oData.fromTarget)return this.getRouter().getTargets().display(this._oData.fromTarget),void delete this._oData.fromTarget;t.prototype.onNavBack.apply(this,arguments)}})});',\"web/ui5/test-resources/sap/ui/core/demokit/tutorial/navigation/05/webapp/localService/mockserver.js\":'sap.ui.define([\"sap/ui/core/util/MockServer\"],function(e){\"use strict\";return{init:function(){var a=jQuery.sap.getModulePath(\"sap/ui/demo/nav/manifest\",\".json\"),t=jQuery.sap.getModulePath(\"sap/ui/demo/nav/localService/mockdata\"),o=jQuery.sap.syncGetJSON(a).data[\"sap.app\"].dataSources.employeeRemote,s=jQuery.sap.getModulePath(\"sap/ui/demo/nav/\"+o.settings.localUri.replace(\".xml\",\"\"),\".xml\"),u=new e({rootUri:o.uri});e.config({autoRespond:!0,autoRespondAfter:1e3}),u.simulate(s,{sMockdataBaseUrl:t}),u.start()}}});',\"web/ui5/test-resources/sap/ui/core/demokit/tutorial/navigation/05/webapp/view/App.view.xml\":'<mvc:View\\n\\tcontrollerName=\"sap.ui.demo.nav.controller.App\"\\n\\txmlns=\"sap.m\"\\n\\txmlns:mvc=\"sap.ui.core.mvc\"\\n\\tdisplayBlock=\"true\"><App id=\"app\"/></mvc:View>\\n',\"web/ui5/test-resources/sap/ui/core/demokit/tutorial/navigation/05/webapp/view/Home.view.xml\":'<mvc:View\\n\\tcontrollerName=\"sap.ui.demo.nav.controller.Home\"\\n\\txmlns=\"sap.m\"\\n\\txmlns:mvc=\"sap.ui.core.mvc\"><Page title=\"{i18n>homePageTitle}\" class=\"sapUiResponsiveContentPadding\"><content><Button id=\"displayNotFoundBtn\" text=\"{i18n>DisplayNotFound}\" press=\"onDisplayNotFound\" class=\"sapUiTinyMarginEnd\"/></content></Page></mvc:View>\\n',\"web/ui5/test-resources/sap/ui/core/demokit/tutorial/navigation/05/webapp/view/NotFound.view.xml\":'<mvc:View\\n\\tcontrollerName=\"sap.ui.demo.nav.controller.NotFound\"\\n\\txmlns=\"sap.m\"\\n\\txmlns:mvc=\"sap.ui.core.mvc\"><MessagePage\\n\\t\\ttitle=\"{i18n>NotFound}\"\\n\\t\\ttext=\"{i18n>NotFound.text}\"\\n\\t\\tdescription=\"{i18n>NotFound.description}\"\\n\\t\\tshowNavButton=\"true\"\\n\\t\\tnavButtonPress=\"onNavBack\"/></mvc:View>\\n',\"web/ui5/test-resources/sap/ui/core/demokit/tutorial/navigation/05/webapp/i18n/i18n.properties\":\"# App Descriptor\\nappTitle=SAPUI5 Navigation\\nappDescription=A simple app that explains how to use navigation and routing features of SAPUI5\\n\\niWantToNavigate=I want to navigate\\nhomePageTitle=Home\\n\\nNotFound=Not Found\\nNotFound.text=Sorry, but the requested resource is not available.\\nNotFound.description=Please check the URL and try again.\\n\\nDisplayNotFound=Display Not Found\\nFlipToResume=\\n\"},\"web/ui5/test-resources/sap/ui/core/demokit/tutorial/navigation/05/webapp/Component-preload\");",
	"web/ui5/test-resources/sap/ui/core/demokit/tutorial/navigation/05/webapp/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(t){\"use strict\";return t.extend(\"sap.ui.demo.nav.Component\",{metadata:{manifest:\"json\"},init:function(){t.prototype.init.apply(this,arguments),this.getRouter().initialize()}})});",
	"web/ui5/test-resources/sap/ui/core/demokit/tutorial/navigation/05/webapp/controller/App.controller.js": "sap.ui.define([\"sap/ui/demo/nav/controller/BaseController\"],function(n){\"use strict\";return n.extend(\"sap.ui.demo.nav.controller.App\",{onInit:function(){}})});",
	"web/ui5/test-resources/sap/ui/core/demokit/tutorial/navigation/05/webapp/controller/BaseController.js": "sap.ui.define([\"sap/ui/core/mvc/Controller\",\"sap/ui/core/routing/History\"],function(o,e){\"use strict\";return o.extend(\"sap.ui.demo.nav.controller.BaseController\",{getRouter:function(){return sap.ui.core.UIComponent.getRouterFor(this)},onNavBack:function(o){void 0!==e.getInstance().getPreviousHash()?window.history.go(-1):this.getRouter().navTo(\"appHome\",{},!0)}})});",
	"web/ui5/test-resources/sap/ui/core/demokit/tutorial/navigation/05/webapp/controller/Home.controller.js": "sap.ui.define([\"sap/ui/demo/nav/controller/BaseController\"],function(e){\"use strict\";return e.extend(\"sap.ui.demo.nav.controller.Home\",{onDisplayNotFound:function(e){this.getRouter().getTargets().display(\"notFound\",{fromTarget:\"home\"})}})});",
	"web/ui5/test-resources/sap/ui/core/demokit/tutorial/navigation/05/webapp/controller/NotFound.controller.js": "sap.ui.define([\"sap/ui/demo/nav/controller/BaseController\"],function(t){\"use strict\";return t.extend(\"sap.ui.demo.nav.controller.NotFound\",{onInit:function(){this.getRouter().getTarget(\"notFound\").attachDisplay(function(t){this._oData=t.getParameter(\"data\")},this)},onNavBack:function(a){if(this._oData&&this._oData.fromTarget)return this.getRouter().getTargets().display(this._oData.fromTarget),void delete this._oData.fromTarget;t.prototype.onNavBack.apply(this,arguments)}})});",
	"web/ui5/test-resources/sap/ui/core/demokit/tutorial/navigation/05/webapp/localService/mockserver.js": "sap.ui.define([\"sap/ui/core/util/MockServer\"],function(e){\"use strict\";return{init:function(){var a=jQuery.sap.getModulePath(\"sap/ui/demo/nav/manifest\",\".json\"),t=jQuery.sap.getModulePath(\"sap/ui/demo/nav/localService/mockdata\"),o=jQuery.sap.syncGetJSON(a).data[\"sap.app\"].dataSources.employeeRemote,s=jQuery.sap.getModulePath(\"sap/ui/demo/nav/\"+o.settings.localUri.replace(\".xml\",\"\"),\".xml\"),u=new e({rootUri:o.uri});e.config({autoRespond:!0,autoRespondAfter:1e3}),u.simulate(s,{sMockdataBaseUrl:t}),u.start()}}});",
	"web/ui5/test-resources/sap/ui/core/demokit/tutorial/navigation/05/webapp/view/App.view.xml": "<mvc:View\n\tcontrollerName=\"sap.ui.demo.nav.controller.App\"\n\txmlns=\"sap.m\"\n\txmlns:mvc=\"sap.ui.core.mvc\"\n\tdisplayBlock=\"true\"><App id=\"app\"/></mvc:View>\n",
	"web/ui5/test-resources/sap/ui/core/demokit/tutorial/navigation/05/webapp/view/Home.view.xml": "<mvc:View\n\tcontrollerName=\"sap.ui.demo.nav.controller.Home\"\n\txmlns=\"sap.m\"\n\txmlns:mvc=\"sap.ui.core.mvc\"><Page title=\"{i18n>homePageTitle}\" class=\"sapUiResponsiveContentPadding\"><content><Button id=\"displayNotFoundBtn\" text=\"{i18n>DisplayNotFound}\" press=\"onDisplayNotFound\" class=\"sapUiTinyMarginEnd\"/></content></Page></mvc:View>\n",
	"web/ui5/test-resources/sap/ui/core/demokit/tutorial/navigation/05/webapp/view/NotFound.view.xml": "<mvc:View\n\tcontrollerName=\"sap.ui.demo.nav.controller.NotFound\"\n\txmlns=\"sap.m\"\n\txmlns:mvc=\"sap.ui.core.mvc\"><MessagePage\n\t\ttitle=\"{i18n>NotFound}\"\n\t\ttext=\"{i18n>NotFound.text}\"\n\t\tdescription=\"{i18n>NotFound.description}\"\n\t\tshowNavButton=\"true\"\n\t\tnavButtonPress=\"onNavBack\"/></mvc:View>\n",
	"web/ui5/test-resources/sap/ui/core/demokit/tutorial/navigation/05/webapp/i18n/i18n.properties": "# App Descriptor\nappTitle=SAPUI5 Navigation\nappDescription=A simple app that explains how to use navigation and routing features of SAPUI5\n\niWantToNavigate=I want to navigate\nhomePageTitle=Home\n\nNotFound=Not Found\nNotFound.text=Sorry, but the requested resource is not available.\nNotFound.description=Please check the URL and try again.\n\nDisplayNotFound=Display Not Found\nFlipToResume=\n"
}, "web/ui5/test-resources/sap/ui/core/demokit/tutorial/navigation/05/Component-preload");