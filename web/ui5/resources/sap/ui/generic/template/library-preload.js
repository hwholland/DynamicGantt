/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2016 SAP SE. All rights reserved
    
 */
sap.ui.predefine('sap/ui/generic/template/AppComponent',['jquery.sap.global','sap/ui/core/UIComponent','sap/ui/generic/app/ApplicationController','sap/ui/generic/template/NavigationController','sap/m/NavContainer'],function(q,U,A,N,a){"use strict";
var b=U.extend("sap.ui.generic.template.AppComponent",{metadata:{config:{"title":"SAP UI Application Component",fullWidth:true},routing:{config:{routerClass:"sap.m.routing.Router",viewType:"XML",viewPath:"",clearTarget:false},routes:[]},library:"sap.ui.generic.template"}});
b.prototype.init=function(){var m;sap.ui.core.UIComponent.prototype.init.apply(this,arguments);m=this.getModel();if(m){this._oApplicationController=new A(m);this._oNavigationController=new N(this);var r=sap.ui.getCore().getLibraryResourceBundle("sap.ui.generic.template");if(!m.oMetadata||!m.oMetadata.isLoaded()){m.attachMetadataFailed((function(n){return function handler(){n.navigateToMessagePage({title:r.getText("ERROR_LOAD_DATA_TITLE"),text:r.getText("ERROR_LOAD_DATA_TEXT")});};})(this._oNavigationController));}else if(m.oMetadata.isFailed()){this._oNavigationController.navigateToMessagePage({title:r.getText("ERROR_LOAD_DATA_TITLE"),text:r.getText("ERROR_LOAD_DATA_TEXT")});}}};
b.prototype.createContent=function(){this.setModel(sap.ui.getCore().getMessageManager().getMessageModel(),"message");this._oNavContainer=new a({id:this.getId()+'-appContent'});if(sap.ui.Device.system.desktop){this._oNavContainer.addStyleClass("sapUiSizeCompact");}return this._oNavContainer;};
b.prototype.getConfig=function(){var c,m;if(!this._oConfig){m=this.getMetadata();c=m.getManifestEntry('sap.ui.generic.app');this._oConfig=c;}return this._oConfig;};
b.prototype.getTransactionController=function(){return this._oApplicationController.getTransactionController();};
b.prototype.getApplicationController=function(){return this._oApplicationController;};
b.prototype.getNavigationController=function(){return this._oNavigationController;};
b.prototype.exit=function(){if(this._oNavContainer){this._oNavContainer.destroy();}this._oNavContainer=null;if(this._oApplicationController){this._oApplicationController.destroy();}this._oApplicationController=null;if(this._oNavigationController){this._oNavigationController.destroy();}this._oNavigationController=null;};
return b;},true);
/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2016 SAP SE. All rights reserved
    
 */
sap.ui.predefine('sap/ui/generic/template/library',['jquery.sap.global','sap/ui/core/library','sap/ui/comp/library'],function(q,l,a){"use strict";sap.ui.getCore().initLibrary({name:"sap.ui.generic.template",version:"1.38.33",dependencies:["sap.ui.core","sap.ui.comp","sap.ui.generic.app"],types:[],interfaces:[],controls:[],elements:[]});return sap.ui.generic.template;},true);
jQuery.sap.registerPreloadedModules({
"name":"sap/ui/generic/template/library-preload",
"version":"2.0",
"modules":{
	"sap/ui/generic/template/manifest.json":'{\n  "_version": "1.2.0",\n  "sap.app": {\n    "_version": "1.2.0",\n    "id": "sap.ui.generic.template",\n    "type": "library",\n    "embeds": [],\n    "applicationVersion": {\n      "version": "1.38.33"\n    },\n    "title": "SAPUI5 library with artifacts for smart templates.",\n    "description": "SAPUI5 library with artifacts for smart templates.",\n    "resources": "resources.json",\n    "offline": true\n  },\n  "sap.ui": {\n    "_version": "1.1.0",\n    "technology": "UI5",\n    "supportedThemes": [\n      "base",\n      "sap_bluecrystal"\n    ]\n  },\n  "sap.ui5": {\n    "_version": "1.1.0",\n    "dependencies": {\n      "minUI5Version": "1.38",\n      "libs": {\n        "sap.ui.core": {\n          "minVersion": "1.38.33"\n        },\n        "sap.ui.comp": {\n          "minVersion": "1.38.33"\n        }\n      }\n    }\n  }\n}'
}});
