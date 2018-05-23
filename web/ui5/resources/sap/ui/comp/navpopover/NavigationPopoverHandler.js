/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2016 SAP SE. All rights reserved
 */
sap.ui.define(['jquery.sap.global',"sap/ui/base/ManagedObject",'./LinkData','sap/ui/model/json/JSONModel','sap/ui/core/Control'],function(q,M,L,J,C){"use strict";var N=M.extend("sap.ui.comp.navpopover.NavigationPopoverHandler",{metadata:{library:"sap.ui.comp",properties:{semanticObject:{type:"string",defaultValue:null},semanticObjectController:{type:"any",defaultValue:null},fieldName:{type:"string",defaultValue:null},semanticObjectLabel:{type:"string",defaultValue:null},mapFieldToSemanticObject:{type:"boolean",defaultValue:true},semanticAttributes:{type:"object",visibility:"hidden",defaultValue:null}},associations:{control:{type:"sap.ui.core.Control",multiple:false}},events:{beforePopoverOpens:{parameters:{semanticObject:{type:"string"},semanticAttributes:{type:"object"},setSemanticAttributes:{type:"function"},setAppStateKey:{type:"function"},originalId:{type:"string"},open:{type:"function"}}},navigationTargetsObtained:{parameters:{mainNavigation:{type:"sap.ui.comp.navpopover.LinkData"},actions:{type:"sap.ui.comp.navpopover.LinkData[]"},ownNavigation:{type:"sap.ui.comp.navpopover.LinkData"},semanticObject:{type:"string"},originalId:{type:"string"},show:{type:"function"}}},innerNavigate:{parameters:{text:{type:"string"},href:{type:"string"},semanticObject:{type:"string"},semanticAttributes:{type:"object"},originalId:{type:"string"}}}}}});N.prototype.init=function(){this._oPopover=null;var m=new J({semanticObjectLabel:undefined,semanticObject:undefined,semanticAttributes:undefined,appStateKey:undefined});m.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);m.setSizeLimit(1000);this.setModel(m,"$sapuicompNavigationPopoverHandler");};N.prototype.updateBindingContext=function(s,S,m,u){if(this._oPopover){this._oPopover.destroy();this._oPopover=null;}C.prototype.updateBindingContext.apply(this,arguments);};N.prototype.setIgnoreOpenPopover=function(i){this.setProperty("ignoreOpenPopover",i);if(i){this.fireOmitNavigation();}};N.prototype._getPopover=function(){var t=this;this.setSemanticAttributes(this._calculateSemanticAttributes());this._createPopover();if(this.hasListeners("beforePopoverOpens")){return new Promise(function(r){t.fireBeforePopoverOpens({semanticObject:t.getSemanticObject(),semanticAttributes:t.getSemanticAttributes(),setSemanticAttributes:function(s){t.setSemanticAttributes(s);},setAppStateKey:function(a){var m=t.getModel("$sapuicompNavigationPopoverHandler");m.setProperty("/appStateKey",a);},originalId:t.getId(),open:function(){t._retrieveNavigationTargets(r);}});});}return new Promise(function(r){t._retrieveNavigationTargets(r);});};N.prototype._retrieveNavigationTargets=function(r){var t=this;var p=this._oPopover.retrieveNavigationTargets();p.then(function(R){if(t.hasListeners("navigationTargetsObtained")){t.fireNavigationTargetsObtained({mainNavigation:R.mainNavigation,actions:R.availableActions,ownNavigation:R.ownNavigation,semanticObject:t.getSemanticObject(),semanticAttributes:t.getSemanticAttributes(),originalId:t.getId(),show:function(m,o,a,e){if(m!=null&&typeof m==="string"){t._oPopover.setMainNavigationId(m);}else{e=a;a=o;o=m;}if(o){t._oPopover.setMainNavigation(o);}if(a&&a.length){t._oPopover.removeAllAvailableActions();a.forEach(function(A){t._oPopover.addAvailableAction(A);});}if(e){t._oPopover.setExtraContent(e);}}});}t._oPopover._createLinks();return r(t._oPopover);},function(e){return r(e);});};N.prototype.openPopover=function(){if(this._processingPressed){window.console.warn("NavigationPopoverHandler is still processing last press event. This press event is omitted.");return;}this._processingPressed=true;var a;this.setSemanticAttributes(this._calculateSemanticAttributes());var t=this;var o=function(){t._createPopover();if(t.getSemanticAttributes()){t._oPopover.setSemanticAttributes(t.getSemanticAttributes());}if(a){t._oPopover.setAppStateKey(a);}t._oPopover.retrieveNavTargets();};if(this.hasListeners("beforePopoverOpens")){this.fireBeforePopoverOpens({semanticObject:t.getSemanticObject(),semanticAttributes:t.getSemanticAttributes(),setSemanticAttributes:function(s){t.setSemanticAttributes(s);},setAppStateKey:function(k){a=k;},originalId:this.getId(),open:o});}else{o();}};N.prototype._onTargetsObtained=function(){var t=this;var l;if(!this._oPopover.getMainNavigation()){this._oPopover.setMainNavigation(new L({text:this.getSemanticObjectLabel()}));}this.fireNavigationTargetsObtained({actions:this._oPopover.getAvailableActions(),mainNavigation:this._oPopover.getMainNavigation(),ownNavigation:this._oPopover.getOwnNavigation(),semanticObject:this.getSemanticObject(),semanticAttributes:this.getSemanticAttributes(),originalId:this.getId(),show:function(m,o,a,e){if(m!=null&&typeof m==="string"){t._oPopover.setMainNavigationId(m);}else{e=a;a=o;o=m;}if(o){t._oPopover.setMainNavigation(o);}if(a){t._oPopover.removeAllAvailableActions();if(a&&a.length){var i,b=a.length;for(i=0;i<b;i++){t._oPopover.addAvailableAction(a[i]);}}}if(e){t._oPopover.setExtraContent(e);}l=t._oPopover.getDirectLink();if(l){t._processingPressed=true;window.location.href=l.getHref();}else{t._oPopover.show();t._processingPressed=false;}}});if(!this.hasListeners("navigationTargetsObtained")){l=this._oPopover.getDirectLink();if(l){this._processingPressed=true;window.location.href=l.getHref();}else{this._oPopover.show();this._processingPressed=false;}}};N.prototype._onNavigate=function(e){var p=e.getParameters();this.fireInnerNavigate({text:p.text,href:p.href,originalId:this.getId(),semanticObject:this.getSemanticObject(),semanticAttributes:this.getSemanticAttributes()});};N.prototype._createPopover=function(){if(!this._oPopover){q.sap.require("sap.ui.comp.navpopover.NavigationPopover");var a=sap.ui.require("sap/ui/comp/navpopover/NavigationPopover");this._oPopover=new a({title:"{/semanticObjectLabel}",mainNavigationId:this.getSemanticObjectValue(),semanticObjectName:"{/semanticObject}",semanticAttributes:"{/semanticAttributes}",appStateKey:"{/appStateKey}",component:this._getComponent(),targetsObtained:q.proxy(this._onTargetsObtained,this),navigate:q.proxy(this._onNavigate,this)});this._oPopover.setModel(this.getModel("$sapuicompNavigationPopoverHandler"));this._oPopover.setSource(this.getControl());}};N.prototype._getComponent=function(){var h=this.getControl();if(h){var p=h.getParent();while(p){if(p instanceof sap.ui.core.Component){return p;}p=p.getParent();}}return null;};N.prototype._calculateSemanticAttributes=function(){var c=this.getBindingContext()||(this.getControl()&&this.getControl().getBindingContext());if(!c){return null;}var r={};var s=this.getFieldName();var c=c.getObject(c.getPath());for(var a in c){if(a==="__metadata"){continue;}if(!c[a]){continue;}var S=this._mapFieldToSemanticObject(a);if(a===s&&this.getSemanticObject()){S=this.getSemanticObject();}if(S===this.getSemanticObject()&&!this.getMapFieldToSemanticObject()){S=a;}var A=c[a];if(r[S]){if(c[s]){A=c[s];}}r[S]=A;}return r;};N.prototype.setSemanticObjectLabel=function(l){var m=this.getModel("$sapuicompNavigationPopoverHandler");this.setProperty("semanticObjectLabel",l);m.setProperty("/semanticObjectLabel",l);return this;};N.prototype.setSemanticObject=function(s){var m=this.getModel("$sapuicompNavigationPopoverHandler");this.setProperty("semanticObject",s);m.setProperty("/semanticObject",s);return this;};N.prototype.setSemanticAttributes=function(s){var m=this.getModel("$sapuicompNavigationPopoverHandler");this.setProperty("semanticAttributes",s);m.setProperty("/semanticAttributes",s);return this;};N.prototype.setFieldName=function(f){this.setProperty("fieldName",f);var s=this.getSemanticObjectController();if(s){s.setIgnoredState(this);}};N.prototype.getControl=function(){var c=this.getAssociation("control");if(typeof c==="string"){c=sap.ui.getCore().byId(c);}return c;};N.prototype.setSemanticObjectController=function(c){var o=this.getProperty("semanticObjectController");if(o){o.unregisterControl(this);}this.setProperty("semanticObjectController",c,true);if(c){c.registerControl(this);}this.setSemanticAttributes(null);};N.prototype.getSemanticObjectController=function(){var c=this.getProperty("semanticObjectController");if(!c){var p=this.getParent();while(p){if(p.getSemanticObjectController){c=p.getSemanticObjectController();if(c){this.setSemanticObjectController(c);break;}}p=p.getParent();}}return c;};N.prototype._mapFieldToSemanticObject=function(f){var s=this.getSemanticObjectController();if(!s){return f;}var m=s.getFieldSemanticObjectMap();if(!m){return f;}return m[f]||f;};N.prototype.getSemanticObjectValue=function(){this.setSemanticAttributes(this._calculateSemanticAttributes());var s=this.getSemanticAttributes();if(s){var S=this.getSemanticObject();return s[S];}return null;};N.prototype.exit=function(){var s=this.getSemanticObjectController();if(s){s.unregisterControl(this);}if(this._oPopover){this._oPopover.destroy();this._oPopover=null;}};return N;},true);
