/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/base/ManagedObject','sap/ui/core/Control','sap/ui/core/mvc/Controller','sap/ui/core/library'],function(q,M,C,a,b){"use strict";var V=b.mvc.ViewType;var c=C.extend("sap.ui.core.mvc.View",{metadata:{library:"sap.ui.core",properties:{width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:'100%'},height:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},viewName:{type:"string",group:"Misc",defaultValue:null},displayBlock:{type:"boolean",group:"Appearance",defaultValue:false}},aggregations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content"}},events:{afterInit:{},beforeExit:{},afterRendering:{},beforeRendering:{}},specialSettings:{controller:'sap.ui.core.mvc.Controller',controllerName:'string',preprocessors:'Object',resourceBundleName:'string',resourceBundleUrl:'sap.ui.core.URI',resourceBundleLocale:'string',resourceBundleAlias:'string',type:'string',viewContent:'any',viewData:'any',async:{type:"boolean",defaultValue:false}}}});c._mPreprocessors={};function d(v,t){for(var i=0,l=v.mPreprocessors[t].length;i<l;i++){v.mPreprocessors[t][i]._settings={};for(var p in v.mPreprocessors[t][i]){if(p.indexOf("_")!==0){v.mPreprocessors[t][i]._settings[p]=v.mPreprocessors[t][i][p];}}}}function e(v,s){if(s.preprocessors){v.mPreprocessors=q.extend({},s.preprocessors);for(var t in v.mPreprocessors){if(!Array.isArray(v.mPreprocessors[t])){v.mPreprocessors[t]=[v.mPreprocessors[t]];}d(v,t);}}}c.prototype._initCompositeSupport=function(s){this.oViewData=s.viewData;this.sViewName=s.viewName;var t=this;e(this,s);if(s.async){this._oAsyncState={};this._oAsyncState.promise=new Promise(function(r){t._oAsyncState.resolve=r;});}var i=sap.ui.require('sap/ui/core/CustomizingConfiguration');if(i&&i.hasCustomProperties(this.sViewName,this)){this._fnSettingsPreprocessor=function(s){var l=this.getId();if(i&&l){if(t.isPrefixedId(l)){l=l.substring((t.getId()+"--").length);}var n=i.getCustomProperties(t.sViewName,l,t);if(n){s=q.extend(s,n);}}};}var p=function(l){var n=sap.ui.require("sap/ui/core/Component");var O=n&&n.getOwnerComponentFor(t);if(O){return O.runAsOwner(l);}else{return l.call();}};var I=function(){var P=f(t,s);if(P instanceof Promise){return P.then(function(){if(t.onControllerConnected){p(function(){t.onControllerConnected(t.oController);});}});}else{if(t.onControllerConnected){t.onControllerConnected(t.oController);}}};if(this.initViewSettings){if(s.async){this.initViewSettings(s).then(function(){return p(I);}).then(function(){return t.runPreprocessor("controls",t);}).then(function(){p(t.fireAfterInit.bind(t));t._oAsyncState.resolve(t);});}else{this.initViewSettings(s);I();this.runPreprocessor("controls",this,true);this.fireAfterInit();}}};c.prototype.getController=function(){return this.oController;};c.prototype.byId=function(i){return sap.ui.getCore().byId(this.createId(i));};c.prototype.createId=function(i){if(!this.isPrefixedId(i)){i=this.getId()+"--"+i;}return i;};c.prototype.getLocalId=function(i){var p=this.getId()+"--";return(i&&i.indexOf(p)===0)?i.slice(p.length):null;};c.prototype.isPrefixedId=function(i){return!!(i&&i.indexOf(this.getId()+"--")===0);};var f=function(t,s){if(!sap.ui.getCore().getConfiguration().getControllerCodeDeactivated()){var i=s.controller,n=i&&typeof i.getMetadata==="function"&&i.getMetadata().getName();if(!i&&t.getControllerName){var l=t.getControllerName();if(l){var p=sap.ui.require('sap/ui/core/CustomizingConfiguration');var r=p&&p.getControllerReplacement(l,M._sOwnerId);if(r){l=typeof r==="string"?r:r.controllerName;}i=sap.ui.controller(l,true);n=l;}}if(i){i=a.extendIfRequired(i,n,t._oAsyncState);if(i instanceof Promise){if(!t._oAsyncState){throw new Error("The view "+t.sViewName+" runs in sync mode and therefore cannot use async controller extensions!");}return i.then(function(i){t.oController=i;i.connectToView(t);});}else{t.oController=i;i.connectToView(t);}}}else{t.oController={};}};c.prototype.getViewData=function(){return this.oViewData;};c.prototype.exit=function(){this.fireBeforeExit();this.oController=null;this._oAsyncState=null;};c.prototype.onAfterRendering=function(){this.fireAfterRendering();};c.prototype.onBeforeRendering=function(){this.fireBeforeRendering();};c.prototype.clone=function(i,l){var s={},K,n;for(K in this.mProperties&&!(this.isBound&&this.isBound(K))){if(this.mProperties.hasOwnProperty(K)){s[K]=this.mProperties[K];}}n=C.prototype.clone.call(this,i,l,{cloneChildren:false,cloneBindings:true});n.applySettings(s);return n;};function g(v,s){return{name:v.sViewName,componentId:v._sOwnerId,id:v.getId(),caller:v+" ("+v.sViewName+")",sync:!!s};}function h(p,t){if(typeof p.preprocessor==="string"){q.sap.require(p.preprocessor);p.preprocessor=q.sap.getObject(p.preprocessor).process;}return p.preprocessor;}function j(G,L){var i,l,O,p=[];for(i=0,l=G.length;i<l;i++){if(G[i]._onDemand){O=G[i];}else{p.push(G[i]);}}for(i=0,l=L.length;i<l;i++){var n=!L[i].preprocessor;if(n&&O){p.unshift(q.extend(L[i],O));}else if(!n){p.push(L[i]);}}return p;}c.prototype.runPreprocessor=function(t,s,S){var v=this.getMetadata().getClass()._sType,n=g(this,S),p,G=c._mPreprocessors[v]&&c._mPreprocessors[v][t]||[],L=this.mPreprocessors&&this.mPreprocessors[t]||[],r,P,A,u;p=j(G,L);if(!S){A=function(w){return P(w,n,r);};u=Promise.resolve(s);}for(var i=0,l=p.length;i<l;i++){P=h(p[i],t);if(S&&p[i]._syncSupport===true){s=P(s,n,p[i]._settings);}else if(!S){r=p[i]._settings;u=u.then(A);}else{q.sap.log.debug("Async \""+t+"\"-preprocessor was skipped in sync view execution for "+v+"View",this.getId());}}return S?s:u;};function k(t,v){if(!c._mPreprocessors[v]){c._mPreprocessors[v]={};}if(!c._mPreprocessors[v][t]){c._mPreprocessors[v][t]=[];}}function o(v,s,t){c._mPreprocessors[s][t].forEach(function(p){if(p._onDemand){q.sap.log.error("Registration for \""+t+"\" failed, only one on-demand-preprocessor allowed",v.getMetadata().getName());return false;}});return true;}c.registerPreprocessor=function(t,p,v,s,O,S){if(typeof O!=="boolean"){S=O;O=false;}if(p){k(t,v);if(O&&!o(this,v,t)){return;}c._mPreprocessors[v][t].push({preprocessor:p,_onDemand:O,_syncSupport:s,_settings:S});q.sap.log.debug("Registered "+(O?"on-demand-":"")+"preprocessor for \""+t+"\""+(s?" with syncSupport":""),this.getMetadata().getName());}else{q.sap.log.error("Registration for \""+t+"\" failed, no preprocessor specified",this.getMetadata().getName());}};function m(p){return!!p._onDemand;}c.prototype.hasPreprocessor=function(t){var H,i,v;v=this.getMetadata().getClass()._sType;i=this.mPreprocessors&&this.mPreprocessors[t];H=c._mPreprocessors&&c._mPreprocessors[v]&&c._mPreprocessors[v][t];H=H&&!c._mPreprocessors[v][t].every(m);return!!(i||H);};sap.ui.view=function(i,v,t){var l=null,n={};if(typeof i==="object"||typeof i==="string"&&v===undefined){v=i;i=undefined;}if(v){if(typeof v==="string"){n.viewName=v;}else{n=v;}}if(i){n.id=i;}if(t){n.type=t;}var p=sap.ui.require('sap/ui/core/CustomizingConfiguration');if(p){var r=p.getViewReplacement(n.viewName,M._sOwnerId);if(r){q.sap.log.info("Customizing: View replacement for view '"+n.viewName+"' found and applied: "+r.viewName+" (type: "+r.type+")");q.extend(n,r);}else{q.sap.log.debug("Customizing: no View replacement found for view '"+n.viewName+"'.");}}if(!n.type){throw new Error("No view type specified.");}else if(n.type===V.JS){var J=sap.ui.requireSync('sap/ui/core/mvc/JSView');l=new J(n);}else if(n.type===V.JSON){var s=sap.ui.requireSync('sap/ui/core/mvc/JSONView');l=new s(n);}else if(n.type===V.XML){var X=sap.ui.requireSync('sap/ui/core/mvc/XMLView');l=new X(n);}else if(n.type===V.HTML){var H=sap.ui.requireSync('sap/ui/core/mvc/HTMLView');l=new H(n);}else if(n.type===V.Template){var T=sap.ui.requireSync('sap/ui/core/mvc/TemplateView');l=new T(n);}else{throw new Error("Unknown view type "+n.type+" specified.");}return l;};c.prototype.loaded=function(){if(!this._oAsyncState){return Promise.resolve(this);}else{return this._oAsyncState.promise;}};c._resolveEventHandler=function(n,i){var H;if(!sap.ui.getCore().getConfiguration().getControllerCodeDeactivated()){switch(n.indexOf('.')){case 0:H=i&&q.sap.getObject(n.slice(1),undefined,i);break;case-1:H=i&&i[n];if(H!=null){break;}default:H=q.sap.getObject(n);}}else{H=function(){};}if(typeof H==="function"){H._sapui_handlerName=n;return[H,i];}};return c;});