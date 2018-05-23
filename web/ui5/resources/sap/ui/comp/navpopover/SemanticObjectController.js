/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2016 SAP SE. All rights reserved
 */
sap.ui.define(['jquery.sap.global','sap/ui/comp/library','sap/ui/core/Element','sap/ui/comp/personalization/Util','./Factory','sap/ui/model/json/JSONModel'],function(q,l,E,P,F,J){"use strict";var S=E.extend("sap.ui.comp.navpopover.SemanticObjectController",{metadata:{library:"sap.ui.comp",properties:{ignoredFields:{type:"string",group:"Misc",defaultValue:null},prefetchNavigationTargets:{type:"boolean",group:"Misc",defaultValue:false},fieldSemanticObjectMap:{type:"object",group:"Misc",defaultValue:null},entitySet:{type:"string",group:"Misc",defaultValue:null}},events:{navigationTargetsObtained:{parameters:{mainNavigation:{type:"sap.ui.comp.navpopover.LinkData"},actions:{type:"sap.ui.comp.navpopover.LinkData[]"},ownNavigation:{type:"sap.ui.comp.navpopover.LinkData"},semanticObject:{type:"string"},originalId:{type:"string"},show:{type:"function"}}},beforePopoverOpens:{parameters:{semanticObject:{type:"string"},semanticAttributes:{type:"object"},setSemanticAttributes:{type:"function"},setAppStateKey:{type:"function"},originalId:{type:"string"},open:{type:"function"}}},navigate:{parameters:{text:{type:"string"},href:{type:"string"},semanticObject:{type:"string"},semanticAttributes:{type:"object"},originalId:{type:"string"}}},prefetchDone:{parameters:{semanticObjects:{type:"object"}}}}}});S.oSemanticObjects={};S.bHasPrefetchedDistinctSemanticObjects=false;S.oPromise;S.prototype.init=function(){S.prefetchDistinctSemanticObjects();this._proxyOnBeforePopoverOpens=q.proxy(this._onBeforePopoverOpens,this);this._proxyOnTargetsObtained=q.proxy(this._onTargetsObtained,this);this._proxyOnNavigate=q.proxy(this._onNavigate,this);this._aRegisteredControls=[];};S.prototype.registerControl=function(s){if(s.attachBeforePopoverOpens&&!s.hasListeners("beforePopoverOpens")){s.attachBeforePopoverOpens(this._proxyOnBeforePopoverOpens);}if(s.attachNavigationTargetsObtained&&!s.hasListeners("navigationTargetsObtained")){s.attachNavigationTargetsObtained(this._proxyOnTargetsObtained);}if(s.attachInnerNavigate&&!s.hasListeners("innerNavigate")){s.attachInnerNavigate(this._proxyOnNavigate);}this._aRegisteredControls.push(s);};S.prototype.unregisterControl=function(s){if(s.detachBeforePopoverOpens){s.detachBeforePopoverOpens(this._proxyOnBeforePopoverOpens);}if(s.detachNavigationTargetsObtained){s.detachNavigationTargetsObtained(this._proxyOnTargetsObtained);}if(s.detachInnerNavigate){s.detachInnerNavigate(this._proxyOnNavigate);}this._aRegisteredControls.pop(s);};S.prototype._onBeforePopoverOpens=function(e){var p=e.getParameters();if(this.hasListeners("beforePopoverOpens")){this.fireBeforePopoverOpens({semanticObject:p.semanticObject,semanticAttributes:p.semanticAttributes,setSemanticAttributes:p.setSemanticAttributes,setAppStateKey:p.setAppStateKey,originalId:p.originalId,open:p.open});}else{p.open();}};S.prototype._onTargetsObtained=function(e){var p=e.getParameters();if(this.hasListeners("navigationTargetsObtained")){this.fireNavigationTargetsObtained({semanticObject:p.semanticObject,semanticAttributes:p.semanticAttributes,actions:p.actions,mainNavigation:p.mainNavigation,ownNavigation:p.ownNavigation,originalId:p.originalId,show:p.show});}else{p.show();}};S.prototype._onNavigate=function(e){var p=e.getParameters();this.fireNavigate({text:p.text,href:p.href,originalId:p.originalId,semanticObject:p.semanticObject,semanticAttributes:p.semanticAttributes});};S.prototype.setIgnoredState=function(s){if(s instanceof sap.ui.comp.navpopover.SmartLink){s._updateEnabled();}};S.prototype.setIgnoredFields=function(i){this.setProperty("ignoredFields",i);this._aRegisteredControls.forEach(function(r){r._updateEnabled();});return this;};S.prototype.setPrefetchNavigationTargets=function(p){this.setProperty("prefetchNavigationTargets",p);if(p!==true){return this;}var t=this;S.getDistinctSemanticObjects().then(function(s){t.firePrefetchDone({semanticObjects:s});});return this;};S.prototype.getFieldSemanticObjectMap=function(){var m=this.getProperty("fieldSemanticObjectMap");if(m){return m;}if(!this.getEntitySet()){q.sap.log.warning("FieldSemanticObjectMap is not set on SemanticObjectController, retrieval without EntitySet not possible");return null;}q.sap.require("sap.ui.comp.odata.MetadataAnalyser");var M=new sap.ui.comp.odata.MetadataAnalyser(this.getModel());m=M.getFieldSemanticObjectMap(this.getEntitySet());if(m){this.setProperty("fieldSemanticObjectMap",m,true);}return m;};S.prototype.getEntitySet=function(){var e=this.getProperty("entitySet");if(e){return e;}var p=this.getParent();while(p){if(p.getEntitySet){e=p.getEntitySet();if(e){this.setProperty("entitySet",e,true);break;}}p=p.getParent();}return e;};S.prototype.hasSemanticObjectLinks=function(s){return S.hasDistinctSemanticObject(s,S.oSemanticObjects);};S.hasDistinctSemanticObject=function(s,o){return!!o[s];};S.prefetchDistinctSemanticObjects=function(){S.getJSONModel();if(!S.bHasPrefetchedDistinctSemanticObjects){S.getDistinctSemanticObjects();}};S.getDistinctSemanticObjects=function(){if(S.bHasPrefetchedDistinctSemanticObjects){return new Promise(function(r){return r(S.oSemanticObjects);});}if(!S.oPromise){S.oPromise=new Promise(function(r){var c=F.getService("CrossApplicationNavigation");var u=F.getService("URLParsing");if(!c||!u){S.bHasPrefetchedDistinctSemanticObjects=true;return r({});}c.getDistinctSemanticObjects().done(function(s){s.forEach(function(a){S.oSemanticObjects[a]={};});var m=S.getJSONModel();m.setProperty("/distinctSemanticObjects",S.oSemanticObjects);S.bHasPrefetchedDistinctSemanticObjects=true;return r(S.oSemanticObjects);});});}return S.oPromise;};S.getJSONModel=function(){var m=sap.ui.getCore().getModel("$sapuicompSemanticObjectController_DistinctSemanticObjects");if(m&&!q.isEmptyObject(m.getData())){return m;}m=new J({distinctSemanticObjects:{}});m.setDefaultBindingMode(sap.ui.model.BindingMode.OneTime);m.setSizeLimit(1000);sap.ui.getCore().setModel(m,"$sapuicompSemanticObjectController_DistinctSemanticObjects");return m;};S.destroyDistinctSemanticObjects=function(){S.oSemanticObjects={};S.oPromise=null;S.bHasPrefetchedDistinctSemanticObjects=false;var m=sap.ui.getCore().getModel("$sapuicompSemanticObjectController_DistinctSemanticObjects");if(m){m.destroy();}};return S;},true);
