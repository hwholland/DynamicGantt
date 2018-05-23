// Copyright (c) 2009-2014 SAP SE, All Rights Reserved
jQuery.sap.declare("sap.ushell.components.flp.Component");if(!window['sap-ui-debug']){try{jQuery.sap.require('sap.fiori.flp-controls');}catch(e){jQuery.sap.log.warning('flp-controls failed to load: '+e.message);}}jQuery.sap.require("sap.ui.core.UIComponent");jQuery.sap.require("sap.ushell.components.flp.CustomRouter");jQuery.sap.require("sap.ushell.components.flp.ComponentKeysHandler");sap.ui.core.UIComponent.extend("sap.ushell.components.flp.Component",{metadata:{routing:{config:{viewType:"JS",controlAggregation:"pages",controlId:"navContainerFlp",clearAggregation:false,routerClass:sap.ushell.components.flp.CustomRouter},targets:{appFinder:{viewName:"sap.ushell.components.flp.launchpad.appfinder.AppFinder"},home:{viewName:"sap.ushell.components.flp.launchpad.dashboard.DashboardContent"}},routes:[{name:"home",target:'home',pattern:"home"}]},version:"1.38.26",library:"sap.ushell.components.flp",dependencies:{libs:["sap.m"]},config:{semanticObject:'Shell',action:'home',title:sap.ushell.resources.i18n.getText("homeBtn_tooltip"),fullWidth:true,hideLightBackground:true,compactContentDensity:true,cozyContentDensity:true}},parseOldCatalogParams:function(u){"use strict";var p=jQuery.sap.getUriParameters(u).mParams,v;for(var k in p){if(p.hasOwnProperty(k)){v=p[k][0];p[k]=v.indexOf('/')!==-1?encodeURIComponent(v):v;}}return p;},handleNavigationFilter:function(n){"use strict";var s=sap.ushell.Container.getService("URLParsing").parseShellHash(n);if(s&&s.semanticObject==='shell'&&s.action==='catalog'){var p=this.parseOldCatalogParams(n);setTimeout(function(){this.getRouter().navTo('appFinder',{'menu':'catalog',filters:JSON.stringify(p)});}.bind(this),0);return this.oShellNavigation.NavigationFilterStatus.Abandon;}return this.oShellNavigation.NavigationFilterStatus.Continue;},createContent:function(){"use strict";this.oRouter=this.getRouter();this.oModel=new sap.ui.model.json.JSONModel({groups:[],animationRendered:false,tagFiltering:true,catalogSelection:true,tileActionModeEnabled:false,tileActionModeActive:false,isInDrag:false,rtl:sap.ui.getCore().getConfiguration().getRTL(),personalization:true,editTitle:false,tagList:[],selectedTags:[],userPreferences:{entries:[]},enableNotificationsPreview:false,previewNotificationItems:[]});this.oModel.setSizeLimit(10000);this.setModel(this.oModel);this.oConfig=this.getComponentData().config;this.oShellConfig=sap.ushell.renderers.fiori2.RendererExtensions.getConfiguration();var p=(this.oConfig&&(this.oConfig.enablePersonalization||this.oConfig.enablePersonalization===undefined))&&(this.oShellConfig&&this.oShellConfig.enablePersonalization||this.oShellConfig.enablePersonalization===undefined);if(p){this.oRouter.addRoute({name:"catalog",target:'appFinder',pattern:"catalog/:filters:"});this.oRouter.addRoute({name:"appFinder",target:'appFinder',pattern:"appFinder/{menu}/:filters:"});}this.oRouter.addRoute({name:"all",target:'home',pattern:":all*:"});this._setConfigurationToModel(this.oConfig);jQuery.sap.require("sap.ushell.components.flp.launchpad.DashboardManager");this.oDashboardManager=new sap.ushell.components.flp.launchpad.DashboardManager("dashboardMgr",{model:this.oModel,config:this.oConfig,router:this.oRouter});jQuery.sap.require("sap.ushell.resources");this.setModel(sap.ushell.resources.i18nModel,"i18n");var n,m=window.matchMedia("(min-width: 800px)"),h=function(a){this.oModel.setProperty("/isPhoneWidth",!a.matches);}.bind(this);if(m.addListener){m.addListener(h);h(m);}sap.ui.getCore().getEventBus().subscribe("launchpad","togglePane",this._createAndAddGroupList,this);sap.ui.getCore().getEventBus().subscribe("sap.ushell.services.UsageAnalytics","usageAnalyticsStarted",function(){jQuery.sap.require("sap.ushell.components.flp.FLPAnalytics");});this.bContactSupportEnabled=sap.ushell.Container.getService("SupportTicket").isEnabled();if(this.bContactSupportEnabled){jQuery.sap.require("sap.ushell.UserActivityLog");sap.ushell.UserActivityLog.activate();}n=this.initNavContainer();this.setInitialConfiguration();this.oShellNavigation=sap.ushell.Container.getService("ShellNavigation");this.oShellNavigation.registerNavigationFilter(jQuery.proxy(this.handleNavigationFilter,this));var H=hasher.getHash();var s=sap.ushell.Container.getService("URLParsing").parseShellHash(H);if(s&&s.semanticObject==='shell'&&s.action==='catalog'){var P=this.parseOldCatalogParams(H);var c=this.getMetadata().getConfig();this.oShellNavigation.toExternal({target:{semanticObject:c.semanticObject,action:c.action}});this.getRouter().navTo('appFinder',{'menu':'catalog',filters:JSON.stringify(P)});}return n;},_createAndAddGroupList:function(c,e,d){"use strict";if(d.currentContent&&(d.currentContent.indexOf('groupList')!==-1||!d.currentContent.length)){var C=this.oConfig,g=this.runAsOwner(function(){return this.oDashboardManager.getGroupListView(C);}.bind(this));if(!g.alreadyCreated){g.groupList.setModel(this.oModel);g.groupList.setModel(sap.ushell.resources.i18nModel,"i18n");sap.ushell.renderers.fiori2.RendererExtensions.setLeftPaneContent(g.groupList,"home");}}},_setConfigurationToModel:function(c){"use strict";var m=this.oModel,t,r=sap.ushell.Container.getRenderer('fiori2').getModelConfiguration(),e=r.enableNotificationsUI,n=sap.ushell.Container.getService("Notifications").isEnabled(),d=sap.ui.Device,E=d.system.desktop||sap.ui.Device.system.tablet||sap.ui.Device.system.combi;if(c){if(c.enableNotificationsPreview!==undefined){this.oModel.setProperty("/configEnableNotificationsPreview",c.enableNotificationsPreview);}if(c.enableNotificationsPreview&&e&&n&&E){this.oModel.setProperty("/enableNotificationsPreview",true);}if(c.enablePersonalization!==undefined&&this.oShellConfig.enablePersonalization!==undefined){m.setProperty("/personalization",c.enablePersonalization&&this.oShellConfig.enablePersonalization);}else if(c.enablePersonalization!==undefined){m.setProperty("/personalization",c.enablePersonalization);}else if(this.oShellConfig.enablePersonalization!==undefined){m.setProperty("/personalization",this.oShellConfig.enablePersonalization);}if(c.enableTagFiltering!==undefined){m.setProperty("/tagFiltering",c.enableTagFiltering);}if(c.enableLockedGroupsCompactLayout!==undefined){m.setProperty("/enableLockedGroupsCompactLayout",c.enableLockedGroupsCompactLayout);}if(c.enableCatalogSelection!==undefined){m.setProperty("/catalogSelection",c.enableCatalogSelection);}if(c.enableSearchFiltering!==undefined){m.setProperty("/searchFiltering",c.enableSearchFiltering);}if(c.enableTilesOpacity!==undefined){m.setProperty("/tilesOpacity",c.enableTilesOpacity);}if(c.enableDragIndicator!==undefined){m.setProperty("/enableDragIndicator",c.enableDragIndicator);}t=false;if(c.enableActionModeMenuButton!==undefined){m.setProperty("/actionModeMenuButtonEnabled",c.enableActionModeMenuButton);t=c.enableActionModeMenuButton;}else{m.setProperty("/actionModeMenuButtonEnabled",true);}if(c.enableRenameLockedGroup!==undefined){m.setProperty("/enableRenameLockedGroup",c.enableRenameLockedGroup);}else{m.setProperty("/enableRenameLockedGroup",false);}if(c.enableActionModeFloatingButton!==undefined){m.setProperty("/actionModeFloatingButtonEnabled",c.enableActionModeFloatingButton);t=t||c.enableActionModeFloatingButton;}else{m.setProperty("/actionModeFloatingButtonEnabled",true);}m.setProperty("/tileActionModeEnabled",t);if(c.enableTileActionsIcon!==undefined){m.setProperty("/tileActionsIconEnabled",sap.ui.Device.system.desktop?c.enableTileActionsIcon:false);}if(c.enableHideGroups!==undefined){m.setProperty("/enableHideGroups",c.enableHideGroups);}if(c.title){m.setProperty("/title",c.title);}if(c.enableEasyAccess!==undefined){m.setProperty("/enableEasyAccess",c.enableEasyAccess)}if(c.sapMenuServiceUrl!==undefined){m.setProperty("/sapMenuServiceUrl",c.sapMenuServiceUrl)}if(c.userMenuServiceUrl!==undefined){m.setProperty("/userMenuServiceUrl",c.userMenuServiceUrl)}if(c.easyAccessNumbersOfLevels!==undefined){m.setProperty("/easyAccessNumbersOfLevels",c.easyAccessNumbersOfLevels)}m.setProperty("/enableHelp",!!this.oShellConfig.enableHelp);m.setProperty("/disableSortedLockedGroups",!!c.disableSortedLockedGroups);}},initNavContainer:function(c){"use strict";var n=new sap.m.NavContainer({id:"navContainerFlp",defaultTransitionName:'show'});return n;},setInitialConfiguration:function(){"use strict";this.oRouter.initialize();sap.ushell.components.flp.ComponentKeysHandler.init(this.oModel,this.oRouter);sap.ushell.renderers.fiori2.AccessKeysHandler.registerAppKeysHandler(sap.ushell.components.flp.ComponentKeysHandler.handleFocusOnMe);var t=sap.ushell.resources.i18n,s=[];s.push({text:"Alt+H",description:t.getText("actionHomePage")});if(this.oModel.getProperty("/personalization")){s.push({text:"Alt+C",description:t.getText("actionAppFinder")});}sap.ushell.renderers.fiori2.AccessKeysHandler.registerAppShortcuts(sap.ushell.components.flp.ComponentKeysHandler.handleShortcuts,s);sap.ui.getCore().getEventBus().publish("launchpad","initialConfigurationSet");},exit:function(){"use strict";this.oDashboardManager.destroy();}});