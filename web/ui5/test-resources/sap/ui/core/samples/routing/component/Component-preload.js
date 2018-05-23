sap.ui.require.preload({
	"web/ui5/test-resources/sap/ui/core/samples/routing/component/Component.js": "sap.ui.define([\"jquery.sap.global\",\"sap/ui/core/UIComponent\",\"sap/ui/core/mvc/View\",\"sap/ui/core/routing/Router\"],function(e,t,i,a){\"use strict\";return t.extend(\"NavigationWithoutMasterDetailPattern.Component\",{metadata:{library:\"NavigationWithRoutes\",version:\"1.0\",includes:[],dependencies:{libs:[\"sap.m\"],components:[],ui5version:\"1.13.1\"},routing:{config:{viewType:\"XML\",viewPath:\"NavigationWithoutMasterDetailPattern.view\",targetControl:\"app\",targetAggregation:\"pages\",clearTarget:!1},routes:[{name:\"view1\",pattern:\"FirstView/{from}\",view:\"View1\"},{name:\"view2\",pattern:\"SecondView/{from}:?query:\",view:\"View2\"},{name:\"catchall\",pattern:\":all*:\",view:\"List\",subroutes:[{name:\"detail\",pattern:\"Detail/{from}\",targetControl:\"split\",targetAggregation:\"detailPages\",view:\"Detail\",subroutes:[{name:\"detaildetail\",pattern:\"Detail/Detail/{from}\",targetControl:\"split\",targetAggregation:\"detailPages\",view:\"DetailDetail\"}]}]}]}},getAutoPrefixId:function(){return!0},createContent:function(){return sap.ui.view({type:sap.ui.core.mvc.ViewType.XML,viewName:\"NavigationWithoutMasterDetailPattern.MainXML\"})},init:function(){t.prototype.init.apply(this,arguments),this.getRouter().initialize()}})});",
	"web/ui5/test-resources/sap/ui/core/samples/routing/component/MainXML.controller.js": "sap.ui.define([\"sap/ui/core/mvc/Controller\"],function(t){\"use strict\";return t.extend(\"NavigationWithoutMasterDetailPattern.MainXML\",{})});",
	"web/ui5/test-resources/sap/ui/core/samples/routing/component/view/Detail.controller.js": "sap.ui.define([\"sap/ui/core/mvc/Controller\"],function(t){\"use strict\";return t.extend(\"NavigationWithoutMasterDetailPattern.view.Detail\",{oApplication:null,onInit:function(){}})});",
	"web/ui5/test-resources/sap/ui/core/samples/routing/component/view/DetailDetail.controller.js": "sap.ui.define([\"sap/ui/core/mvc/Controller\",\"sap/ui/core/UIComponent\"],function(t,e){\"use strict\";return t.extend(\"NavigationWithoutMasterDetailPattern.view.DetailDetail\",{oApplication:null,onInit:function(){this.getRouter().attachRouteMatched(function(t){\"detaildetail\"===t.getParameter(\"name\")&&this.getView().byId(\"text\").setText(\"detail detail coming from \"+t.getParameter(\"arguments\").from)},this)},getRouter:function(){return e.getRouterFor(this)},handleBtn1Press:function(){this.getRouter().navTo(\"view1\",{from:\"detail\"})}})});",
	"web/ui5/test-resources/sap/ui/core/samples/routing/component/view/DetailMaster.controller.js": "sap.ui.define([\"sap/ui/core/mvc/Controller\",\"sap/ui/core/UIComponent\"],function(t,e){\"use strict\";return t.extend(\"NavigationWithoutMasterDetailPattern.view.DetailMaster\",{oApplication:null,onInit:function(){this.getRouter().attachRouteMatched(function(t){\"detail\"===t.getParameter(\"name\")&&this.getView().byId(\"text\").setText(\"detail master coming from \"+t.getParameter(\"arguments\").from)},this)},getRouter:function(){return e.getRouterFor(this)},handleBtn1Press:function(){this.getRouter().navTo(\"view1\",{from:\"detail\"})}})});",
	"web/ui5/test-resources/sap/ui/core/samples/routing/component/view/List.controller.js": "sap.ui.define([\"sap/ui/core/mvc/Controller\"],function(t){\"use strict\";return t.extend(\"NavigationWithoutMasterDetailPattern.view.List\",{oApplication:null,onInit:function(){}})});",
	"web/ui5/test-resources/sap/ui/core/samples/routing/component/view/Master.controller.js": "sap.ui.define([\"sap/ui/core/mvc/Controller\",\"sap/ui/core/UIComponent\"],function(t,e){\"use strict\";return t.extend(\"NavigationWithoutMasterDetailPattern.view.Master\",{oApplication:null,onInit:function(){this.getRouter().attachRouteMatched(function(t){\"detail\"===t.getParameter(\"name\")&&this.getView().byId(\"text\").setText(\"detail coming from \"+t.getParameter(\"arguments\").from)},this)},getRouter:function(){return e.getRouterFor(this)},handleBtn1Press:function(){this.getRouter().navTo(\"view1\",{from:\"detail\"})}})});",
	"web/ui5/test-resources/sap/ui/core/samples/routing/component/view/View1.controller.js": "sap.ui.define([\"sap/ui/core/mvc/Controller\",\"sap/ui/core/UIComponent\"],function(t,e){\"use strict\";return t.extend(\"NavigationWithoutMasterDetailPattern.view.View1\",{oApplication:null,onInit:function(){this.getRouter().attachRouteMatched(function(t){\"view1\"===t.getParameter(\"name\")&&this.getView().byId(\"text\").setText(\"view1 coming from \"+t.getParameter(\"arguments\").from)},this)},getRouter:function(){return e.getRouterFor(this)},handleBtn1Press:function(){this.getRouter().navTo(\"view2\",{from:\"View 1\"})}})});",
	"web/ui5/test-resources/sap/ui/core/samples/routing/component/view/View2.controller.js": "sap.ui.define([\"sap/ui/core/mvc/Controller\",\"sap/ui/core/UIComponent\"],function(t,e){\"use strict\";return t.extend(\"NavigationWithoutMasterDetailPattern.view.View2\",{oApplication:null,onInit:function(){this.getRouter().attachRouteMatched(function(t){if(\"view2\"===t.getParameter(\"name\")){var e=this.getView().byId(\"text\"),i=\"\",n=t.getParameter(\"arguments\"),r=n.query;if(r)for(var o in i+=\". Retrieved additional query data:\",r)r.hasOwnProperty(o)&&(i+=\" \"+o+\" = \"+r[o]);e.setText(\"view2 coming from \"+n.from+i)}},this)},getRouter:function(){return e.getRouterFor(this)},handleBtn1Press:function(){this.getRouter().navTo(\"view1\",{from:\"View 2\"})},handleBtn2Press:function(){this.getRouter().navTo(\"detail\",{from:\"View 2\"})}})});",
	"web/ui5/test-resources/sap/ui/core/samples/routing/component/MainXML.view.xml": "<mvc:View xmlns:core=\"sap.ui.core\" xmlns:mvc=\"sap.ui.core.mvc\" xmlns=\"sap.m\"\n\t\tcontrollerName=\"NavigationWithoutMasterDetailPattern.MainXML\" xmlns:html=\"http://www.w3.org/1999/xhtml\"\n\t\t  xmlns:form=\"sap.ui.commons.form\"\n\t\t    xmlns:commons=\"sap.ui.commons\"\n\t\t><App id=\"app\"></App></mvc:View>",
	"web/ui5/test-resources/sap/ui/core/samples/routing/component/view/Detail.view.xml": "<mvc:View xmlns:core=\"sap.ui.core\" xmlns:mvc=\"sap.ui.core.mvc\" xmlns=\"sap.m\"\n\t\tcontrollerName=\"NavigationWithoutMasterDetailPattern.view.Detail\" xmlns:html=\"http://www.w3.org/1999/xhtml\"><Page title=\"Detail\" enableScrolling=\"false\"><content><SplitContainer id=\"split\"><masterPages><mvc:XMLView viewName=\"NavigationWithoutMasterDetailPattern.view.DetailMaster\" id=\"Master\"></mvc:XMLView></masterPages><detailPages></detailPages></SplitContainer></content></Page></mvc:View>",
	"web/ui5/test-resources/sap/ui/core/samples/routing/component/view/DetailDetail.view.xml": "<mvc:View xmlns:core=\"sap.ui.core\" xmlns:mvc=\"sap.ui.core.mvc\" xmlns=\"sap.m\"\n\t\tcontrollerName=\"NavigationWithoutMasterDetailPattern.view.DetailDetail\" xmlns:html=\"http://www.w3.org/1999/xhtml\"><Page title=\"DetailDetail\"><content><Text text=\" DetailDetail view ...\" id=\"text\"></Text><Button text=\"toView1\" press=\"handleBtn1Press\"></Button></content></Page></mvc:View>",
	"web/ui5/test-resources/sap/ui/core/samples/routing/component/view/DetailMaster.view.xml": "<mvc:View xmlns:core=\"sap.ui.core\" xmlns:mvc=\"sap.ui.core.mvc\" xmlns=\"sap.m\"\n\t\tcontrollerName=\"NavigationWithoutMasterDetailPattern.view.DetailMaster\" xmlns:html=\"http://www.w3.org/1999/xhtml\"><Page title=\"DetailMaster\"><content><Text text=\" DetailMaster view ...\" id=\"text\"></Text><Button text=\"toView1\" press=\"handleBtn1Press\"></Button></content></Page></mvc:View>",
	"web/ui5/test-resources/sap/ui/core/samples/routing/component/view/List.view.xml": "<mvc:View xmlns:core=\"sap.ui.core\" xmlns:mvc=\"sap.ui.core.mvc\"\n\txmlns=\"sap.m\" controllerName=\"NavigationWithoutMasterDetailPattern.view.List\" xmlns:form=\"sap.ui.commons.form\"\n\txmlns:html=\"http://www.w3.org/1999/xhtml\"><Page title=\"List View\" enableScrolling=\"false\"><content><SplitContainer id=\"split\"><masterPages><mvc:XMLView viewName=\"NavigationWithoutMasterDetailPattern.view.Master\" id=\"Master\"></mvc:XMLView></masterPages><detailPages></detailPages></SplitContainer></content></Page></mvc:View>",
	"web/ui5/test-resources/sap/ui/core/samples/routing/component/view/Master.view.xml": "<mvc:View xmlns:core=\"sap.ui.core\" xmlns:mvc=\"sap.ui.core.mvc\" xmlns=\"sap.m\"\n\t\tcontrollerName=\"NavigationWithoutMasterDetailPattern.view.Master\" xmlns:html=\"http://www.w3.org/1999/xhtml\"><Page title=\"Master\"><content><Text text=\" Master view ...\" id=\"text\"></Text><Button text=\"toView1\" press=\"handleBtn1Press\"></Button></content></Page></mvc:View>",
	"web/ui5/test-resources/sap/ui/core/samples/routing/component/view/View1.view.xml": "<mvc:View xmlns:core=\"sap.ui.core\" xmlns:mvc=\"sap.ui.core.mvc\" xmlns=\"sap.m\"\n\t\tcontrollerName=\"NavigationWithoutMasterDetailPattern.view.View1\" xmlns:html=\"http://www.w3.org/1999/xhtml\"><Page title=\"View1\"><content><Label text=\"on View 2\" id=\"text\"></Label><Button text=\"toView2\" press=\"handleBtn1Press\"></Button></content></Page></mvc:View>",
	"web/ui5/test-resources/sap/ui/core/samples/routing/component/view/View2.view.xml": "<mvc:View xmlns:core=\"sap.ui.core\" xmlns:mvc=\"sap.ui.core.mvc\" xmlns=\"sap.m\"\n\t\tcontrollerName=\"NavigationWithoutMasterDetailPattern.view.View2\" xmlns:html=\"http://www.w3.org/1999/xhtml\"><Page title=\"View2\"><content><Label text=\"on View 2\" id=\"text\"></Label><Button text=\"toView1\" press=\"handleBtn1Press\"></Button><Button text=\"toDetail\" press=\"handleBtn2Press\"></Button></content></Page></mvc:View>"
}, "web/ui5/test-resources/sap/ui/core/samples/routing/component/Component-preload");