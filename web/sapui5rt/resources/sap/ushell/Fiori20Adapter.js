// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
sap.ui.define(['sap/ui/base/Object','sap/ui/core/Component','sap/ui/core/UIComponent','sap/ui/model/resource/ResourceModel'],function(B,C,U,R){"use strict";var u;U._fnOnInstanceDestroy=function(c){if(c._fioriAdapter){c._fioriAdapter.destroy();}};var A=B.extend("AppInfo",{constructor:function(c){B.call(this);this._oComponent=c;},getDefaultTitle:function(){var t,r,m=this._oComponent.getMetadata();var a=m.getManifestEntry("sap.app");if(a&&a.title){t=a.title;if(this._isLocalizationKey(t)){r=(a.i18n||"i18n/i18n.properties");return this._getLocalized(t,r);}return t;}var o=m.getManifestEntry("sap.ui5");if(o&&o.config&&o.config.resourceBundle&&o.config.titleResource){t=o.config.titleResource;r=o.config.resourceBundle;return this._getLocalized(t,r);}return;},_getLocalized:function(t,r){var m=new R({bundleUrl:jQuery.sap.getModulePath(this._oComponent.getMetadata().getComponentName())+"/"+r});return m.getResourceBundle().getText(t.replace(/^{{/,"").replace(/}}$/,""));},_isLocalizationKey:function(t){return(t.indexOf("{{")===0)&&(t.indexOf("}}")>0);}});var H=B.extend("HeaderInfo",{constructor:function(c,o,a){B.call(this);this._oConfig=o;this._oAppInfo=a;this._aHierarchy=[];this._defaultTitle=this._oAppInfo.getDefaultTitle();this._oCurrentViewInfo={oTitleInfo:{text:this._defaultTitle}};},registerView:function(v){if(this._oConfig.bMoveTitle===false){return;}if(!v.oTitleInfo&&v.oSubTitleInfo){v.oTitleInfo=v.oSubTitleInfo;}this._oCurrentViewInfo=v;var t=this._oCurrentViewInfo.oTitleInfo?this._oCurrentViewInfo.oTitleInfo.text:undefined;if(t!==u.getTitle()){u.setTitle(t);}this._updateHierarchy();this._setBackNavigation(v.oBackButton,v.oAdaptOptions);},_setBackNavigation:function(b,a){if(a&&a.bHideBackButton===false){return;}var f;if(b){f=b.firePress.bind(b);}u.setBackNavigation(f);},_updateHierarchy:function(){if(this._oConfig.bHierarchy===false){return;}if(!this._oCurrentViewInfo){return;}var n=true,h=document.location.hash;for(var i=this._aHierarchy.length-1;i>=0;i--){var e=this._aHierarchy[i],k=(e.id===this._oCurrentViewInfo.sViewId),K=(e.intent===h);if(k||K){n=false;e=this._updateHierarchyEntry(e);this._aHierarchy[i]=e;this._aHierarchy=this._aHierarchy.slice(0,i+1);if(k){e.intent=h;}break;}}if(n){this._aHierarchy.push(this._createHierarchyEntry());}var N=[];for(var j=this._aHierarchy.length-2;j>=0;j--){N.push(this._aHierarchy[j]);}u.setHierarchy(this._deleteUndefinedProperties(N));},_createHierarchyEntry:function(){var e={id:this._oCurrentViewInfo.sViewId,title:this._oCurrentViewInfo.oTitleInfo?this._oCurrentViewInfo.oTitleInfo.text:this._defaultTitle,subtitle:this._oCurrentViewInfo.oSubTitleInfo?this._oCurrentViewInfo.oSubTitleInfo.text:undefined,intent:document.location.hash};return e;},_updateHierarchyEntry:function(e){e.id=this._oCurrentViewInfo.sViewId;e.title=this._oCurrentViewInfo.oTitleInfo?this._oCurrentViewInfo.oTitleInfo.text:this._defaultTitle;e.subtitle=this._oCurrentViewInfo.oSubTitleInfo?this._oCurrentViewInfo.oSubTitleInfo.text:undefined;return e;},_deleteUndefinedProperties:function(o){o.forEach(function(O){for(var p in O){if(O.hasOwnProperty(p)&&!O[p]&&p!=='title'){delete O[p];}}});return o;}});var F=B.extend("sap.ushell.Fiori20Adapter",{constructor:function(c,o){B.call(this);this._oComponent=c;this._oConfig=o;this._oHeaderInfo=new H(c,o,new A(c));try{jQuery.sap.require("sap.m.Fiori20Adapter");}catch(e){jQuery.sap.log.warning("Cannot enable Fiori 2.0 adaptation","sap.m.Fiori20Adapter could not be loaded","sap.ushell.Fiori20Adapter");}if(sap.m.Fiori20Adapter){sap.m.Fiori20Adapter.attachViewChange(this._onViewChange,this);}},init:function(){if(!sap.m.Fiori20Adapter){return;}jQuery.sap.measure.start("Fiori20Adapter");var c=jQuery.extend({},this._oConfig);sap.m.Fiori20Adapter.traverse(this._oComponent.getAggregation("rootControl"),c);jQuery.sap.measure.end("Fiori20Adapter");},destroy:function(){if(sap.m.Fiori20Adapter){sap.m.Fiori20Adapter.detachViewChange(this._onViewChange,this);}},_onViewChange:function(e){this._oHeaderInfo.registerView(e.getParameters());}});F.applyTo=function(c,o,a,s){var O=c instanceof U?c:C.getOwnerComponentFor(c);if(!O){O=o;}if(O&&!O._fioriAdapter){u=s;O._fioriAdapter=new F(O,a);O._fioriAdapter.init();}};return F;},false);
