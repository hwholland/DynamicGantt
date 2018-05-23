/*!
 * @copyright@
 */
sap.ui.define(["./NavError","./SelectionVariant","sap/ui/generic/app/library","sap/ui/base/Object","sap/ui/model/resource/ResourceModel","sap/ui/core/UIComponent","sap/ui/core/routing/HashChanger","jquery.sap.global"],function(E,S,N,B,R,U,H,q){"use strict";var a=B.extend("sap.ui.generic.app.navigation.service.NavigationHandler",{metadata:{publicMethods:["navigate","parseNavigation","storeInnerAppState","openSmartLinkPopover","mixAttributesAndSelectionVariant"]},constructor:function(c,p){if(!c){throw new E("NavigationHandler.INVALID_INPUT");}if(c instanceof U){this.oRouter=c.getRouter();this.oComponent=c;}else{if(typeof c.getOwnerComponent!=="function"){throw new E("NavigationHandler.INVALID_INPUT");}this.oRouter=this._getRouter(c);this.oComponent=c.getOwnerComponent();}if(this.oComponent&&this.oComponent.getAppComponent){this.oComponent=this.oComponent.getAppComponent();}if(typeof this.oRouter==="undefined"||typeof this.oComponent==="undefined"||typeof this.oComponent.getComponentData!=="function"){throw new E("NavigationHandler.INVALID_INPUT");}try{this.oCrossAppNavService=sap.ushell.Container.getService("CrossApplicationNavigation");}catch(e){q.sap.log.error("NavigationHandler: UShell service API for CrossApplicationNavigation is not available.");}this.IAPP_STATE="sap-iapp-state";this.sDefaultedParamProp="sap-ushell-defaultedParameterNames";this.sSAPSystemProp="sap-system";this._aTechnicalParamaters=[this.sSAPSystemProp,this.sDefaultedParamProp,"sap-app-id","hcpApplicationId"];this._oLastSavedInnerAppData={sAppStateKey:"",oAppData:{},iCacheHit:0,iCacheMiss:0};this._rIAppStateOld=new RegExp("/"+this.IAPP_STATE+"=([^/?]+)");this._rIAppStateOldAtStart=new RegExp("^"+this.IAPP_STATE+"=([^/?]+)");this._rIAppStateNew=new RegExp("[\?&]"+this.IAPP_STATE+"=([^&]+)");if(p===sap.ui.generic.app.navigation.service.ParamHandlingMode.URLParamWins||p===sap.ui.generic.app.navigation.service.ParamHandlingMode.InsertInSelOpt){this.sParamHandlingMode=p;}else{this.sParamHandlingMode=sap.ui.generic.app.navigation.service.ParamHandlingMode.SelVarWins;}},_getRouter:function(c){return U.getRouterFor(c);},_isTechnicalParameter:function(p){if(this._aTechnicalParamaters.indexOf(p)>=0){return true;}return false;},navigate:function(s,A,n,i,o){var b,p;if(typeof n==="string"){b=n;p=this._getURLParametersFromSelectionVariant(b);}else if(typeof n==="object"){p=n;var e=this._splitInboundNavigationParameters(new S(),p,[]).oNavigationSelVar;b=e.toJSONString();}else{throw new E("NavigationHandler.INVALID_INPUT");}var c=this;var d={target:{semanticObject:s,action:A},params:p||{}};var f=c.oCrossAppNavService.isNavigationSupported([d],c.oComponent);f.done(function(t){if(t[0].supported){var g=c.storeInnerAppState(i);g.done(function(){var O=function(j){d.appStateKey=j;c.oCrossAppNavService.toExternal(d,c.oComponent);};c._saveAppState({selectionVariant:b},O,o);});if(o){g.fail(function(h){o(h);});}}else{if(o){var h=new E("NavigationHandler.isIntentSupported.notSupported");o(h);}}});if(o){f.fail(function(){var g=c._createTechnicalError("NavigationHandler.isIntentSupported.failed");o(g);});}},parseNavigation:function(){var A=H.getInstance().getHash();var i=this._getInnerAppStateKey(A);var c=this.oComponent.getComponentData();if(c===undefined){q.sap.log.warning("The navigation Component's data was not set properly; assuming instead that no parameters are provided.");c={};}var s=c.startupParameters;var d=[];if(s&&s[this.sDefaultedParamProp]&&s[this.sDefaultedParamProp].length>0){d=JSON.parse(s[this.sDefaultedParamProp][0]);}var m=q.Deferred();var n=this;if(i){this._loadAppState(i,m);}else{var I=c["sap-xapp-state"]!==undefined;if(I){var o=this.oCrossAppNavService.getStartupAppState(this.oComponent);o.done(function(f){var e=f.getData();if(e){try{e=JSON.parse(JSON.stringify(e));}catch(x){var g=n._createTechnicalError("NavigationHandler.AppStateData.parseError");m.reject(g,s,sap.ui.generic.app.navigation.service.NavType.xAppState);return m.promise();}}if(e){var h=new S(e.selectionVariant);var b=n._splitInboundNavigationParameters(h,s,d);e.selectionVariant=b.oNavigationSelVar.toJSONString();e.oSelectionVariant=b.oNavigationSelVar;e.oDefaultedSelectionVariant=b.oDefaultedSelVar;e.bNavSelVarHasDefaultsOnly=b.bNavSelVarHasDefaultsOnly;m.resolve(e,s,sap.ui.generic.app.navigation.service.NavType.xAppState);}else{g=n._createTechnicalError("NavigationHandler.getDataFromAppState.failed");m.reject(g,s||{},sap.ui.generic.app.navigation.service.NavType.xAppState);}});o.fail(function(){var f=n._createTechnicalError("NavigationHandler.getStartupState.failed");m.reject(f,{},sap.ui.generic.app.navigation.service.NavType.xAppState);});}else{if(s){var b=n._splitInboundNavigationParameters(new S(),s,d);if(b.oNavigationSelVar.isEmpty()&&b.oDefaultedSelVar.isEmpty()){m.resolve({},s,sap.ui.generic.app.navigation.service.NavType.initial);}else{var e={};e.selectionVariant=b.oNavigationSelVar.toJSONString();e.oSelectionVariant=b.oNavigationSelVar;e.oDefaultedSelectionVariant=b.oDefaultedSelVar;e.bNavSelVarHasDefaultsOnly=b.bNavSelVarHasDefaultsOnly;m.resolve(e,s,sap.ui.generic.app.navigation.service.NavType.URLParams);}}else{m.resolve({},{},sap.ui.generic.app.navigation.service.NavType.initial);}}}return m.promise();},_splitInboundNavigationParameters:function(s,o,d){if(!q.isArray(d)){throw new E("NavigationHandler.INVALID_INPUT");}var p,i;var b={};for(p in o){if(!o.hasOwnProperty(p)){continue;}if(this._isTechnicalParameter(p)){continue;}if(typeof o[p]==="string"){b[p]=o[p];}else if(q.type(o[p])==="array"&&o[p].length===1){b[p]=o[p][0];}else if(q.type(o[p])==="array"&&o[p].length>1){b[p]=o[p];}else{throw new E("NavigationHandler.INVALID_INPUT");}}var D=new S();var n=new S();var c=s.getParameterNames().concat(s.getSelectOptionsPropertyNames());for(i=0;i<c.length;i++){p=c[i];if(p in b){if(q.inArray(p,d)>-1){n.massAddSelectOption(p,s.getValue(p));this._addParameterValues(D,p,"I","EQ",b[p]);}else{switch(this.sParamHandlingMode){case sap.ui.generic.app.navigation.service.ParamHandlingMode.SelVarWins:n.massAddSelectOption(p,s.getValue(p));break;case sap.ui.generic.app.navigation.service.ParamHandlingMode.URLParamWins:this._addParameterValues(n,p,"I","EQ",b[p]);break;case sap.ui.generic.app.navigation.service.ParamHandlingMode.InsertInSelOpt:n.massAddSelectOption(p,s.getValue(p));this._addParameterValues(n,p,"I","EQ",b[p]);break;default:throw new E("NavigationHandler.INVALID_INPUT");}}}else{if(q.inArray(p,d)>-1){D.massAddSelectOption(p,s.getValue(p));}else{n.massAddSelectOption(p,s.getValue(p));}}}for(p in b){if(q.inArray(p,c)>-1){continue;}if((q.inArray(p,d)>-1)){this._addParameterValues(D,p,"I","EQ",b[p]);}else{this._addParameterValues(n,p,"I","EQ",b[p]);}}var e=false;if(n.isEmpty()){e=true;var P=D.getSelectOptionsPropertyNames();for(i=0;i<P.length;i++){n.massAddSelectOption(P[i],D.getValue(P[i]));}}return{oNavigationSelVar:n,oDefaultedSelVar:D,bNavSelVarHasDefaultsOnly:e};},_addParameterValues:function(s,p,b,o,v){if(q.isArray(v)){for(var i=0;i<v.length;i++){s.addSelectOption(p,b,o,v[i]);}}else{s.addSelectOption(p,b,o,v);}},storeInnerAppState:function(i,I){if(typeof I!=="boolean"){I=true;}var n=this;var m=q.Deferred();var r=function(s){var c=n.oRouter.oHashChanger.getHash();var d=n._replaceInnerAppStateKey(c,s);n.oRouter.oHashChanger.replaceHash(d);};var A=this._oLastSavedInnerAppData.sAppStateKey;var b=(JSON.stringify(i)===JSON.stringify(this._oLastSavedInnerAppData.oAppData));if(b&&A){this._oLastSavedInnerAppData.iCacheHit++;r(A);m.resolve(A);return m.promise();}this._oLastSavedInnerAppData.iCacheMiss++;var o=function(s){if(!I){r(s);}n._oLastSavedInnerAppData.oAppData=i;n._oLastSavedInnerAppData.sAppStateKey=s;m.resolve(s);};var O=function(e){m.reject(e);};var s=this._saveAppState(i,o,O);if(s!==undefined){if(I){r(s);}}return m.promise();},processBeforeSmartLinkPopoverOpens:function(t,s,i){var m=q.Deferred();var b=t.semanticAttributes;var n=this;var f=function(b,s){s=s||"{}";var c=sap.ui.generic.app.navigation.service.SuppressionBehavior.raiseErrorOnNull|sap.ui.generic.app.navigation.service.SuppressionBehavior.raiseErrorOnUndefined;var M=n.mixAttributesAndSelectionVariant(b,s,c);s=M.toJSONString();b=n._getURLParametersFromSelectionVariant(M);var O=function(A){t.setSemanticAttributes(b);t.setAppStateKey(A);t.open();m.resolve(t);};var d=function(e){m.reject(e);};n._saveAppState({selectionVariant:s},O,d);};if(i){var o=this.storeInnerAppState(i,true);o.done(function(){f(b,s);});o.fail(function(e){m.reject(e);});}else{f(b,s);}return m.promise();},mixAttributesAndSelectionVariant:function(s,b,c){if(c===undefined){c=sap.ui.generic.app.navigation.service.SuppressionBehavior.standard;}var o=new S(b);var n=new S();for(var p in s){if(s.hasOwnProperty(p)){var v=s[p];if(q.type(v)==="array"||q.type(v)==="object"){v=JSON.stringify(v);}else if(q.type(v)==="date"){v=v.toJSON();}else if(q.type(v)==="number"||q.type(v)==="boolean"){v=v.toString();}if(v===""){if(c&sap.ui.generic.app.navigation.service.SuppressionBehavior.ignoreEmptyString){q.sap.log.info("Semantic attribute "+p+" is an empty string and due to the chosen Suppression Behiavour is being ignored.");continue;}}if(v===null){if(c&sap.ui.generic.app.navigation.service.SuppressionBehavior.raiseErrorOnNull){throw new E("NavigationHandler.INVALID_INPUT");}else{q.sap.log.warning("Semantic attribute "+p+" is null and ignored for mix in to selection variant");continue;}}if(v===undefined){if(c&sap.ui.generic.app.navigation.service.SuppressionBehavior.raiseErrorOnUndefined){throw new E("NavigationHandler.INVALID_INPUT");}else{q.sap.log.warning("Semantic attribute "+p+" is undefined and ignored for mix in to selection variant");continue;}}if(q.type(v)==="string"){n.addSelectOption(p,"I","EQ",v);}else{throw new E("NavigationHandler.INVALID_INPUT");}}}var P=o.getParameterNames();for(var i=0;i<P.length;i++){if(!n.getSelectOption(P[i])){n.addSelectOption(P[i],"I","EQ",o.getParameter(P[i]));}}var d=o.getSelectOptionsPropertyNames();for(i=0;i<d.length;i++){if(!n.getSelectOption(d[i])){var e=o.getSelectOption(d[i]);for(var j=0;j<e.length;j++){n.addSelectOption(d[i],e[j].Sign,e[j].Option,e[j].Low,e[j].High);}}}return n;},_ensureSelectionVariantFormatString:function(s){if(s===undefined){return undefined;}var c=s;if(typeof s==="object"){c=JSON.stringify(s);}return c;},_saveAppState:function(A,o,O){var b=this.oCrossAppNavService.createEmptyAppState(this.oComponent);var s=b.getKey();var c={selectionVariant:{},tableVariantId:"",customData:{}};if(A.selectionVariant){if(typeof A.selectionVariant==="string"){try{c.selectionVariant=JSON.parse(A.selectionVariant);}catch(x){var e=this._createTechnicalError("NavigationHandler.AppStateSave.parseError");if(O){O(e);}return undefined;}}else{c.selectionVariant=A.selectionVariant;}}if(A.tableVariantId){c.tableVariantId=A.tableVariantId;}if(A.customData){c.customData=A.customData;}b.setData(c);var d=b.save();if(o){d.done(function(){o(s);});}if(O){var n=this;d.fail(function(){e=n._createTechnicalError("NavigationHandler.AppStateSave.failed");O(e);});}return s;},_loadAppState:function(A,d){var o=this.oCrossAppNavService.getAppState(this.oComponent,A);var n=this;o.done(function(b){var c={selectionVariant:"{}",oSelectionVariant:new S(),oDefaultedSelectionVariant:new S(),bNavSelVarHasDefaultsOnly:false,tableVariantId:"",customData:{}};var e=b.getData();if(typeof e==="undefined"){var f=n._createTechnicalError("NavigationHandler.getDataFromAppState.failed");d.reject(f,{},sap.ui.generic.app.navigation.service.NavType.iAppState);}else{if(e.selectionVariant){c.selectionVariant=n._ensureSelectionVariantFormatString(e.selectionVariant);c.oSelectionVariant=new S(c.selectionVariant);}if(e.tableVariantId){c.tableVariantId=e.tableVariantId;}if(e.customData){c.customData=e.customData;}}d.resolve(c,{},sap.ui.generic.app.navigation.service.NavType.iAppState);});o.fail(function(){var e=n._createTechnicalError("NavigationHandler.getAppState.failed");d.reject(e,{},sap.ui.generic.app.navigation.service.NavType.iAppState);});},_getInnerAppStateKey:function(A){if(!A){return undefined;}var m=this._rIAppStateNew.exec(A);if(m===null){m=this._rIAppStateOld.exec(A);}if(m===null){m=this._rIAppStateOldAtStart.exec(A);}if(m===null){return undefined;}return m[1];},_replaceInnerAppStateKey:function(A,s){var n=this.IAPP_STATE+"="+s;if(!A){return"?"+n;}var f=function(A){if(A.indexOf("?")!==-1){return A+"&"+n;}return A+"?"+n;};if(!this._getInnerAppStateKey(A)){return f(A);}if(this._rIAppStateNew.test(A)){return A.replace(this._rIAppStateNew,function(b){return b.replace(/\=.*/ig,"="+s);});}var r=function(b,A){A=A.replace(b,"");return f(A);};if(this._rIAppStateOld.test(A)){return r(this._rIAppStateOld,A);}if(this._rIAppStateOldAtStart.test(A)){return r(this._rIAppStateOldAtStart,A);}return undefined;},_getURLParametersFromSelectionVariant:function(s){var u={};var i=0;if(typeof s==="string"){var o=new S(s);}else if(typeof s==="object"){o=s;}else{throw new E("NavigationHandler.INVALID_INPUT");}var b=o.getSelectOptionsPropertyNames();for(i=0;i<b.length;i++){var c=o.getSelectOption(b[i]);if(c.length===1&&c[0].Sign==="I"&&c[0].Option==="EQ"){u[b[i]]=c[0].Low;}}var p=o.getParameterNames();for(i=0;i<p.length;i++){var P=o.getParameter(p[i]);u[p[i]]=P;}return u;},_createTechnicalError:function(e){return new E(e);}});return a;});
