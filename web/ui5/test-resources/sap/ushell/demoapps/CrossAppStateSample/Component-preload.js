sap.ui.require.preload({
	"web/ui5/test-resources/sap/ushell/demoapps/CrossAppStateSample/Component.js": "!function(){\"use strict\";jQuery.sap.declare(\"sap.ushell.demo.CrossAppStateSample.Component\"),jQuery.sap.require(\"sap.ui.core.UIComponent\"),sap.ui.core.UIComponent.extend(\"sap.ushell.demo.CrossAppStateSample.Component\",{metadata:{library:\"sap.ushell.demo.CrossAppStateSample\",version:\"@version@\",includes:[\"css/style.css\"],dependencies:{libs:[\"sap.m\"],components:[]},config:{title:\"Application state sample\",icon:\"sap-icon://Fiori2/F0002\",favIcon:\"/sap/public/bc/ui5_ui5/resources/sap/ca/ui/themes/base/img/favicon/F0002_My_Accounts.ico\",homeScreenIconPhone:\"/sap/public/bc/ui5_ui5/resources/sap/ca/ui/themes/base/img/launchicon/F0002_My_Accounts/57_iPhone_Desktop_Launch.png\",\"homeScreenIconPhone@2\":\"/sap/public/bc/ui5_ui5/resources/sap/ca/ui/themes/base/img/launchicon/F0002_My_Accounts/114_iPhone-Retina_Web_Clip.png\",homeScreenIconTablet:\"/sap/public/bc/ui5_ui5/resources/sap/ca/ui/themes/base/img/launchicon/F0002_My_Accounts/72_iPad_Desktop_Launch.png\",\"homeScreenIconTablet@2\":\"/sap/public/bc/ui5_ui5/resources/sap/ca/ui/themes/base/img/launchicon/F0002_My_Accounts/144_iPad_Retina_Web_Clip.png\",startupImage320x460:\"/sap/public/bc/ui5_ui5/resources/sap/ca/ui/themes/base/img/splashscreen/320_x_460.png\",startupImage640x920:\"/sap/public/bc/ui5_ui5/resources/sap/ca/ui/themes/base/img/splashscreen/640_x_920.png\",startupImage640x1096:\"/sap/public/bc/ui5_ui5/resources/sap/ca/ui/themes/base/img/splashscreen/640_x_1096.png\",startupImage768x1004:\"/sap/public/bc/ui5_ui5/resources/sap/ca/ui/themes/base/img/splashscreen/768_x_1004.png\",startupImage748x1024:\"/sap/public/bc/ui5_ui5/resources/sap/ca/ui/themes/base/img/splashscreen/1024_x_748.png\",startupImage1536x2008:\"/sap/public/bc/ui5_ui5/resources/sap/ca/ui/themes/base/img/splashscreen/1536_x_2008.png\",startupImage1496x2048:\"/sap/public/bc/ui5_ui5/resources/sap/ca/ui/themes/base/img/splashscreen/2048_x_1496.png\"},routing:{config:{viewType:\"XML\",viewPath:\"\",targetControl:\"app\",clearTarget:!1},routes:[{pattern:\"ShowMain\",view:\"sap.ushell.demo.CrossAppStateSample.Main\",name:\"toMain\"}]}},updateModelFromAppstate:function(e,s,a){var p=s.getData();return!(!p||JSON.stringify(p)===JSON.stringify(e.getProperty(\"/appState\"))||!e)&&(jQuery.sap.log.info(a),e.setProperty(\"/appState\",p),!0)},createContent:function(){var e=sap.ui.view({type:sap.ui.core.mvc.ViewType.XML,viewName:\"sap.ushell.demo.CrossAppStateSample.Main\"});return this.oMainView=e,e},init:function(){var e=this;jQuery.sap.log.setLevel(jQuery.sap.log.Level.INFO),this.oAppStateModel=new sap.ui.model.json.JSONModel({appState:{filter:\"\",CollectionName:\"no collection name yet\"}}),this.setModel(this.oAppStateModel,\"AppState\"),sap.ui.core.UIComponent.prototype.init.apply(this,arguments),this.getRouter().initialize(),sap.ushell.Container.getService(\"CrossApplicationNavigation\").getStartupAppState(this).done(function(s){e.updateModelFromAppstate(e.oAppStateModel,s,\"Setting values for CrossAppState of CrossAppStateSample Application\")})}})}();",
	"web/ui5/test-resources/sap/ushell/demoapps/CrossAppStateSample/Main.controller.js": "!function(){\"use strict\";function e(e,t){var o,n,p=[];return(n=sap.ui.core.IconPool.getIconNames(e))&&n.forEach(function(n,i){o=\"sap-icon://\"+e+\"/\"+n,p.push({key:o,index:i+t,collectionName:e})}),p}sap.ui.controller(\"sap.ushell.demo.CrossAppStateSample.Main\",{onInit:function(){var t,o,n=this;this.getMyComponent().getModel(\"AppState\").bindProperty(\"/appState/CollectionName\").attachChange(function(){t=n.getMyComponent().getModel(\"AppState\").getProperty(\"/appState/CollectionName\"),o=n.getMyComponent().getModel(\"AppState\").getProperty(\"/appState/filter\"),n.oModel=new sap.ui.model.json.JSONModel({icons:function(t,o){var n,p,i=[];if(\"Show All\"===t)for(p=sap.ui.core.IconPool.getIconCollectionNames(),n=0;n<p.length;n++)Array.prototype.push.apply(i,e(p[n],i.length+1));else Array.prototype.push.apply(i,e(t,i.length+1));return o.split(\" \").forEach(function(e){i=i.filter(function(t){return t.key.indexOf(e)>=0})}),i}(t,o)}),n.getView().setModel(n.oModel)}),this.getView().setModel(this.oModel)},getMyComponent:function(){var e=sap.ui.core.Component.getOwnerIdFor(this.getView());return sap.ui.component(e)}})}();",
	"web/ui5/test-resources/sap/ushell/demoapps/CrossAppStateSample/Main.view.xml": "<core:View xmlns:core=\"sap.ui.core\" xmlns:mvc=\"sap.ui.core.mvc\" xmlns:uicore=\"sap.ui.core\"\n\txmlns=\"sap.m\" controllerName=\"sap.ushell.demo.CrossAppStateSample.Main\" xmlns:html=\"http://www.w3.org/1999/xhtml\"><Panel><Title text=\"Displaying set of icons based on parameters of previous app's state\"></Title><content><Table id=\"itemTable\" inset=\"false\" items=\"{path: '/icons' }\"><columns><Column width=\"2em\" hAlign=\"Center\"><Text text=\"Icon\" width=\"6em\"/></Column><Column width=\"23em\"><Text text=\"Key\" /></Column><Column width=\"15em\"><Text text=\"CollectionName\" /></Column><Column width=\"10em\" hAlign=\"Center\"><Text text=\"index\" tooltip=\"index in collection\"/></Column></columns><items><ColumnListItem><cells><uicore:Icon src=\"{key}\" tooltip=\"{key}\" height=\"38px\" width=\"38px\" size =\"2rem\" /><Text text=\"{key}\" /><Text text=\"{collectionName}\" /><Text text=\"{index}\" /></cells></ColumnListItem></items></Table></content></Panel></core:View>"
}, "web/ui5/test-resources/sap/ushell/demoapps/CrossAppStateSample/Component-preload");