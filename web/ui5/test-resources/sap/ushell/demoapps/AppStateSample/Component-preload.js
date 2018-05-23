sap.ui.require.preload({
	"web/ui5/test-resources/sap/ushell/demoapps/AppStateSample/Component.js": "!function(){\"use strict\";jQuery.sap.declare(\"sap.ushell.demo.AppStateSample.Component\"),jQuery.sap.require(\"sap.ui.core.UIComponent\"),sap.ui.core.UIComponent.extend(\"sap.ushell.demo.AppStateSample.Component\",{metadata:{library:\"sap.ushell.demo.AppStateSample\",version:\"@version@\",includes:[\"css/style.css\"],dependencies:{libs:[\"sap.m\"],components:[]},config:{title:\"Application state sample\",icon:\"sap-icon://Fiori2/F0002\",favIcon:\"/sap/public/bc/ui5_ui5/resources/sap/ca/ui/themes/base/img/favicon/F0002_My_Accounts.ico\",homeScreenIconPhone:\"/sap/public/bc/ui5_ui5/resources/sap/ca/ui/themes/base/img/launchicon/F0002_My_Accounts/57_iPhone_Desktop_Launch.png\",\"homeScreenIconPhone@2\":\"/sap/public/bc/ui5_ui5/resources/sap/ca/ui/themes/base/img/launchicon/F0002_My_Accounts/114_iPhone-Retina_Web_Clip.png\",homeScreenIconTablet:\"/sap/public/bc/ui5_ui5/resources/sap/ca/ui/themes/base/img/launchicon/F0002_My_Accounts/72_iPad_Desktop_Launch.png\",\"homeScreenIconTablet@2\":\"/sap/public/bc/ui5_ui5/resources/sap/ca/ui/themes/base/img/launchicon/F0002_My_Accounts/144_iPad_Retina_Web_Clip.png\",startupImage320x460:\"/sap/public/bc/ui5_ui5/resources/sap/ca/ui/themes/base/img/splashscreen/320_x_460.png\",startupImage640x920:\"/sap/public/bc/ui5_ui5/resources/sap/ca/ui/themes/base/img/splashscreen/640_x_920.png\",startupImage640x1096:\"/sap/public/bc/ui5_ui5/resources/sap/ca/ui/themes/base/img/splashscreen/640_x_1096.png\",startupImage768x1004:\"/sap/public/bc/ui5_ui5/resources/sap/ca/ui/themes/base/img/splashscreen/768_x_1004.png\",startupImage748x1024:\"/sap/public/bc/ui5_ui5/resources/sap/ca/ui/themes/base/img/splashscreen/1024_x_748.png\",startupImage1536x2008:\"/sap/public/bc/ui5_ui5/resources/sap/ca/ui/themes/base/img/splashscreen/1536_x_2008.png\",startupImage1496x2048:\"/sap/public/bc/ui5_ui5/resources/sap/ca/ui/themes/base/img/splashscreen/2048_x_1496.png\"},routing:{config:{viewType:\"XML\",viewPath:\"\",targetControl:\"app\",targetAggregation:\"detailPages\",clearTarget:!1,transition:\"slide\",callback:function(e,t,a,p,s){jQuery.sap.log.info(\"CallBack in instance #\"+s.oController.getMyComponent().INSTANCECOUNTER),s.oController.getMyComponent().extractInnerAppStateFromURL(t.iAppState,a.name),p.toDetail(s.getId())}},routes:[{pattern:\"ShowCollection/sap-iapp-state={iAppState}\",view:\"sap.ushell.demo.AppStateSample.view.CatIcons\",name:\"toCatIcons\"},{pattern:\":all*:\",view:\"sap.ushell.demo.AppStateSample.view.CatIcons\",name:\"catchall\"}]}},getAutoPrefixId:function(){return!0},createContent:function(){var e=sap.ui.view({type:sap.ui.core.mvc.ViewType.XML,viewName:\"sap.ushell.demo.AppStateSample.Main\"});return this.oMainView=e,e},extractInnerAppStateFromURL:function(e,t){var a=this;e!==this.getInnerAppStateKey()?(a.createANewAppStateModel(),jQuery.sap.log.info(\"applying inner app state \"+e+\" in instance #\"+a.INSTANCECOUNTER),this.oCrossAppStatePromise.done(function(){sap.ushell.Container.getService(\"CrossApplicationNavigation\").getAppState(a,e).done(function(e){a.updateModelFromAppstate(a.oAppStateModel,e,\"Setting filter value from InnerAppState\"),a.oInnerAppStatePromise.resolve(t)})}),a.oInnerAppStatePromise.done(function(){a.setInnerAppStateIntoInnerAppHash(t)})):this.oInnerAppStatePromise.resolve(t)},getInnerAppStateKey:function(){return this.oAppState&&this.oAppState.getKey()||\" key not set yet \"},updateModelFromAppstate:function(e,t,a){var p=t.getData();return!(!p||JSON.stringify(p)===JSON.stringify(e.getProperty(\"/appState\"))||!e)&&(jQuery.sap.log.info(a+\" in instance #\"+this.INSTANCECOUNTER),e.setProperty(\"/appState\",p),!0)},updateAppStateFromAppStateModel:function(){var e;e=this.oAppStateModel.getProperty(\"/appState\"),this.oAppState.setData(e),this.oAppState.save().fail(function(){jQuery.sap.log.error(\"saving of application state failed\")})},markOurComponent:function(){sap.ushell.demo.AppStateSample.Component.INSTANCECOUNTER=(sap.ushell.demo.AppStateSample.Component.INSTANCECOUNTER||0)+1,this.INSTANCECOUNTER=sap.ushell.demo.AppStateSample.Component.INSTANCECOUNTER},createANewAppStateModel:function(){this.oAppState=sap.ushell.Container.getService(\"CrossApplicationNavigation\").createEmptyAppState(this),this.calculateCrossAppLinks(),jQuery.sap.log.info(\"Create a new appstate model \"+this.oAppState.getKey()+\" in instance #\"+this.INSTANCECOUNTER)},init:function(){var e=this;sap.ushell.Container.getService(\"CrossApplicationNavigation\");jQuery.sap.log.setLevel(jQuery.sap.log.Level.INFO),this.markOurComponent(),this.oAppStateModel=new sap.ui.model.json.JSONModel({appState:{filter:\"\",CollectionName:sap.ui.core.IconPool.getIconCollectionNames()[0]||\"no collection name\"}}),this.setModel(this.oAppStateModel,\"AppState\"),this.oNavTargetsModel=new sap.ui.model.json.JSONModel({toOurAppWithState:\"\",toOurAppNoState:\"\"}),this.setModel(this.oNavTargetsModel,\"navTargets\"),sap.ui.core.UIComponent.prototype.init.apply(this,arguments),this.oCrossAppStatePromise=new jQuery.Deferred,this.oInnerAppStatePromise=new jQuery.Deferred,this.oAppState=sap.ushell.Container.getService(\"CrossApplicationNavigation\").createEmptyAppState(this),this.calculateCrossAppLinks(),sap.ushell.Container.getService(\"CrossApplicationNavigation\").getStartupAppState(this).done(function(t){e.updateModelFromAppstate(e.oAppStateModel,t,\"Set Model from StartupAppState\"),e.oCrossAppStatePromise.resolve()}),jQuery.sap.log.info(\"Router initialized for instance #\"+e.INSTANCECOUNTER),this.getRouter().initialize(),this.oInnerAppStatePromise.done(function(t){e.updateAppStateFromAppStateModel(),e.oAppStateModel.bindTree(\"/\").attachChange(function(){e.updateAppStateFromAppStateModel()})})},setInnerAppStateIntoInnerAppHash:function(e){var t=this;\"catchall\"===e&&(e=\"toCatIcons\"),setTimeout(function(){jQuery.sap.log.info(\"Setting inner app hash \"+t.getInnerAppStateKey()+\" in URL in instance #\"+t.INSTANCECOUNTER),t.navTo(e,!0)},0)},calculateCrossAppLinks:function(){var e,t=sap.ushell.Container.getService(\"CrossApplicationNavigation\");e=t.hrefForExternal({target:{semanticObject:\"Action\",action:\"toappstatesample\"},params:{zdate:Number(new Date)},appStateKey:this.oAppState.getKey()},this)||\"\",this.oNavTargetsModel.setProperty(\"/toOurAppWithState\",e),e=t.hrefForExternal({target:{semanticObject:\"Action\",action:\"toappstatesample\"},params:{date:Number(new Date)}},this)||\"\",this.oNavTargetsModel.setProperty(\"/toOurAppNoState\",e),e=t.hrefForExternal({target:{semanticObject:\"Action\",action:\"tocrossappstatesample\"},params:{date:Number(new Date)},appStateKey:this.oAppState.getKey()},this)||\"\",this.oNavTargetsModel.setProperty(\"/toCrossAppWithState\",e)},navTo:function(e,t){jQuery.sap.log.info(\"NavTo \"+e+\"with AppStateKey\"+this.getInnerAppStateKey()+\" in URL in instance #\"+this.INSTANCECOUNTER),this.getRouter()&&this.getRouter().navTo(e,{iAppState:this.getInnerAppStateKey()},t)}})}();",
	"web/ui5/test-resources/sap/ushell/demoapps/AppStateSample/Main.controller.js": "!function(){\"use strict\";sap.ui.controller(\"sap.ushell.demo.AppStateSample.Main\",{onInit:function(){var e=sap.ui.view({type:sap.ui.core.mvc.ViewType.XML,viewName:\"sap.ushell.demo.AppStateSample.view.List\",id:\"List\"});this.byId(\"app\").addMasterPage(e)},onExit:function(){jQuery.sap.log.info(\"Main view destroyed\")}})}();",
	"web/ui5/test-resources/sap/ushell/demoapps/AppStateSample/view/CatIcons.controller.js": "!function(){\"use strict\";function e(e,t){var o,n,a=[];return(n=sap.ui.core.IconPool.getIconNames(e))&&n.forEach(function(n,p){o=\"sap-icon://\"+e+\"/\"+n,a.push({key:o,index:p+t,collectionName:e})}),a}function t(t){var o,n,a=[];if(\"Show All\"===t)for(n=sap.ui.core.IconPool.getIconCollectionNames(),o=0;o<n.length;o++)Array.prototype.push.apply(a,e(n[o],a.length+1));else Array.prototype.push.apply(a,e(t,a.length+1));return a}function o(e,o){var n,a=o.getProperty(\"/appState/filter\");n=t(o.getProperty(\"/appState/CollectionName\")),jQuery.sap.log.info(\"updateAppStateModel ... \"+a),a.split(\" \").forEach(function(e){n=n.filter(function(t){return t.key.indexOf(e)>=0})}),e.getData().icons=n,e.refresh()}function n(e,n,a){e.setSizeLimit(function(){var e,t,o=0;for(t=sap.ui.core.IconPool.getIconCollectionNames(),e=0;e<t.length;e++)o+=sap.ui.core.IconPool.getIconNames(t[e]).length;return o}()),e.setData({icons:t(n.getProperty(\"/appState/CollectionName\"))}),a.setModel(e),o(e,n)}sap.ui.controller(\"sap.ushell.demo.AppStateSample.view.CatIcons\",{onInit:function(){var e=this;this.oModel=new sap.ui.model.json.JSONModel,n(this.oModel,this.getMyComponent().getModel(\"AppState\"),this.getView()),this.getMyComponent().getModel(\"AppState\").bindProperty(\"/appState/CollectionName\").attachChange(function(){n(e.oModel,e.getMyComponent().getModel(\"AppState\"),e.getView())}),this.getView().byId(\"search\").attachLiveChange(this.handleChange.bind(this)),this.getMyComponent().getModel(\"AppState\").bindProperty(\"/appState/filter\").attachChange(function(){o(e.oModel,e.getMyComponent().getModel(\"AppState\"))}),o(this.oModel,this.getMyComponent().getModel(\"AppState\"))},handleChange:function(e){jQuery.sap.log.info(\"handleChange ...\"+e.oSource.getModel(\"AppState\").getProperty(\"/appState/filter\")),e.oSource.getModel(\"AppState\").setProperty(\"/appState/filter\",e.mParameters.newValue)},getRouter:function(){return sap.ui.core.UIComponent.getRouterFor(this)},getMyComponent:function(){var e=sap.ui.core.Component.getOwnerIdFor(this.getView());return sap.ui.component(e)}})}();",
	"web/ui5/test-resources/sap/ushell/demoapps/AppStateSample/view/List.controller.js": "!function(){\"use strict\";jQuery.sap.require(\"sap.ui.commons.Panel\"),sap.ui.controller(\"sap.ushell.demo.AppStateSample.view.List\",{onInit:function(){var t,e,o=this.oView.getContent()[0],n=sap.ushell.services.AppConfiguration,i=this;this.getView().byId(\"MasterPage\").setTitle(\"AppStateSample Instance #\"+this.getMyComponent().INSTANCECOUNTER),n&&(o.setShowFooter(!0),(t=new sap.m.ActionSheet({placement:sap.m.PlacementType.Top})).addButton(new sap.ushell.ui.footerbar.JamDiscussButton),t.addButton(new sap.ushell.ui.footerbar.JamShareButton),t.addButton(new sap.ushell.ui.footerbar.AddBookmarkButton),e=new sap.m.Button({press:function(){t.openBy(this)},icon:\"sap-icon://action\"}),n&&\"function\"==typeof n.getSettingsControl&&o.setFooter(new sap.m.Bar({contentLeft:n.getSettingsControl(),contentRight:e})),this.oModel=new sap.ui.model.json.JSONModel({icons:this.getIconCollections()}),this.getMyComponent().getModel(\"AppState\").bindProperty(\"/appState/CollectionName\").attachChange(function(){try{i.selectListItemByCollectionName(i.getMyComponent().getModel(\"AppState\").getProperty(\"/appState/CollectionName\"))}catch(t){jQuery.sap.log.warning(\"Could not excecute selectListItemByCollectionName (yet)\",t.toString(),\"sap.ushell.demo.AppStateSample.view.List\")}}),this.getView().setModel(this.oModel),i.selectListItemByCollectionName(this.getMyComponent().getModel(\"AppState\").getProperty(\"/appState/CollectionName\")))},handleCollectionItemSelect:function(t){var e=t.getSource().getSelectedItem().getBindingContext().getObject().CollectionName;e=e||\"\",t.oSource.getModel(\"AppState\").setProperty(\"/appState/CollectionName\",e),this.getMyComponent().navTo(\"toCatIcons\")},getIconCollections:function(){var t=[];return t.push({CollectionName:\"Show All\"}),sap.ui.core.IconPool.getIconCollectionNames().forEach(function(e){t.push({CollectionName:e})}),t},selectListItemByCollectionName:function(t){this.getView().byId(\"categoryList\").getItems().forEach(function(e){e.getTitle()===t&&e.setSelected(!0)})},getMyComponent:function(){var t=sap.ui.core.Component.getOwnerIdFor(this.getView());return sap.ui.component(t)},getRouter:function(){return sap.ui.core.UIComponent.getRouterFor(this)}})}();",
	"web/ui5/test-resources/sap/ushell/demoapps/AppStateSample/Main.view.xml": "<core:View xmlns:core=\"sap.ui.core\" xmlns:mvc=\"sap.ui.core.mvc\"\n\txmlns=\"sap.m\" controllerName=\"sap.ushell.demo.AppStateSample.Main\" xmlns:html=\"http://www.w3.org/1999/xhtml\"><SplitApp id=\"app\"><masterPages></masterPages><detailPages></detailPages></SplitApp></core:View>",
	"web/ui5/test-resources/sap/ushell/demoapps/AppStateSample/view/CatIcons.view.xml": "<core:View xmlns:core=\"sap.ui.core\" xmlns:mvc=\"sap.ui.core.mvc\" xmlns=\"sap.m\" xmlns:uicore=\"sap.ui.core\"\n        controllerName=\"sap.ushell.demo.AppStateSample.view.CatIcons\" xmlns:html=\"http://www.w3.org/1999/xhtml\"><Page title=\"CatIcons\" id=\"pgView2\"><content><Text text=\" Collection view ...\"></Text><VBox><Toolbar><Input id=\"search\" value=\"{AppState>/appState/filter}\"\n                type=\"Text\" placeholder=\"Enter icon search criteria, e.g. 'Suite sub' or 'Fiori7'  \" tooltip=\"split at space, search anywhere in key, AND operation  (e.g.  'SuiteInApp sub')\" /><ToolbarSpacer /><Button id=\"onClearSearch\" text=\"clear\" tooltip=\"clear search\"\n                 press=\"onClearSearch\" /></Toolbar><Table id=\"itemTable\" inset=\"false\" items=\"{path: '/icons' }\"><columns><Column width=\"2em\" hAlign=\"Center\"><Text text=\"Icon\" width=\"6em\"/></Column><Column width=\"23em\"><Text text=\"Key\" /></Column><Column width=\"15em\"><Text text=\"CollectionName\" /></Column><Column width=\"10em\" hAlign=\"Center\"><Text text=\"index\" tooltip=\"index in collection\"/></Column></columns><items><ColumnListItem><cells><uicore:Icon src=\"{key}\" tooltip=\"{key}\"\n         height=\"38px\" width=\"38px\" size =\"2rem\" /><Text text=\"{key}\" /><Text text=\"{collectionName}\" /><Text text=\"{index}\" /></cells></ColumnListItem></items></Table></VBox></content></Page></core:View>",
	"web/ui5/test-resources/sap/ushell/demoapps/AppStateSample/view/List.view.xml": "<core:View xmlns:core=\"sap.ui.core\" xmlns:mvc=\"sap.ui.core.mvc\"\n\txmlns=\"sap.m\" controllerName=\"sap.ushell.demo.AppStateSample.view.List\"\n\txmlns:html=\"http://www.w3.org/1999/xhtml\"><Page id=\"MasterPage\" title=\"AppStateSample(Master View) Instance #0\"><content><ToolbarSpacer /><ToolbarSpacer /><List id=\"categoryList\"\n\t\t         headerText=\"Icon Categories\"\n\t\t         mode=\"SingleSelectMaster\"\n\t\t         select=\"handleCollectionItemSelect\"\n\t\t\t     items=\"{/icons}\"><items><StandardListItem\n\t                    title=\"{CollectionName}\"\n\t                    type=\"Active\"\n\t                    press=\"handleCollectionItemPress\" ></StandardListItem></items></List><Panel><Title text=\"Cross Application Navigation\"></Title><content><ToolbarSpacer /><Link text=\"navigate to OTHER app, passing context\" href=\"{navTargets>/toCrossAppWithState}\" tooltip=\"Go to CrossAppState sample app, passing current state\"></Link><Link href=\"{navTargets>/toOurAppWithState}\" text=\"navigate to THIS app, passing context\"\n\t\t        tooltip=\"Restart our app, passing current state\"></Link><ToolbarSpacer /><Link href=\"{navTargets>/toOurAppNoState}\" text=\"navigate to THIS app, passing no context\"\n\t\t        tooltip=\"Restart our app, no context\"></Link></content></Panel></content></Page></core:View>"
}, "web/ui5/test-resources/sap/ushell/demoapps/AppStateSample/Component-preload");