/*!
 * (c) Copyright 2010-2017 SAP SE or an SAP affiliate company.
 */
jQuery.sap.declare("sap.zen.dsh.AnalyticGrid");jQuery.sap.require("sap.zen.dsh.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.zen.dsh.AnalyticGrid",{metadata:{library:"sap.zen.dsh",properties:{"width":{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:null},"height":{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:null},"selection":{type:"object",group:"Data",defaultValue:null},"queryName":{type:"string",group:"Data",defaultValue:null},"systemAlias":{type:"string",group:"Data",defaultValue:null},"state":{type:"string",group:"Data",defaultValue:null}},events:{"stateChange":{},"selectionChange":{}}}});sap.zen.dsh.AnalyticGrid.M_EVENTS={'stateChange':'stateChange','selectionChange':'selectionChange'};if(require&&!require.config){sap.ui._ui5loader.config({noConflict:true});}$.sap.require('sap.ui.thirdparty.URI');window.DSH_deployment=true;var sapbi_ajaxHandler=sapbi_ajaxHandler||{};window.sapbi_page=window.sapbi_page||{};sapbi_page.getParameter=sapbi_page.getParameter||function(){return"";};var sapbi_MIMES_PIXEL=sapbi_MIMES_PIXEL||"";if(!window.sap){window.sap={};}if(!sap.zen){sap.zen={};}sap.zen.doReplaceDots=true;
sap.zen.dsh.AnalyticGrid.prototype.init=function(){this.parameters={};this.dshBaseUrl=URI(sap.ui.resource("sap.zen.dsh","rt/")).absoluteTo(window.location.pathname).toString();sapbi_page.staticMimeUrlPrefix=this.dshBaseUrl;this.repositoryUrl=URI(sap.ui.resource("sap.zen.dsh","applications/")).absoluteTo(window.location.pathname).toString();};
sap.zen.dsh.AnalyticGrid.prototype._initializeInternal=function(){if(this.initialized){this.page.forceFullNonDeltaRender();return;}this.initialized=true;this._addParameter("XQUERY",this.getQueryName());jQuery.sap.require("sap.zen.dsh.rt.all");if(jQuery.sap.debug()==="true"){jQuery.sap.require("sap.zen.dsh.rt.zen_rt_firefly.js.jszip");jQuery.sap.require("sap.zen.dsh.rt.zen_rt_firefly.js.xlsx");}if(this.getState()){this._initializeInnerAppState(this.getState());}else{this._initializeSelectionVariant(this.getSelection());}var t=this;setTimeout(function(){t._createPage();},0);};
sap.zen.dsh.AnalyticGrid.prototype._createPage=function(){sap.zen.dsh.scriptLoaded=true;var t=this;var c=sap.ui.getCore().getConfiguration();var l=c.getLocale().getSAPLogonLanguage();if(!l){l=window.navigator.userLanguage||window.navigator.language;}var a="";if(document.cookie){var m=/(?:sap-usercontext=)*sap-client=(\d{3})/.exec(document.cookie);if(m&&m[1]){a=m[1];}}var u=sap.firefly.XHashMapOfStringByString.create();for(var k in this.parameters){u.put(k,this.parameters[k]);}var d=new sap.zen.DesignStudio();d.setHost(document.location.hostname);d.setPort(document.location.port);d.setProtocol(document.location.protocol.split(":")[0]);d.setClient(a);d.setLanguage(l);if(this.repositoryUrl){d.setRepositoryUrl(this.repositoryUrl);}d.setApplicationPath(this.repositoryUrl+"0ANALYTIC_GRID");d.setApplicationName("0ANALYTIC_GRID");d.setUrlParameter(u);d.setSdkLoaderPath("");d.setHanaMode(true);d.setDshControlId(t.getId());d.setStaticMimesRootPath(this.dshBaseUrl);d.setSystemAlias(this.getSystemAlias());d.setNewBW(true);this.page=d.createPage();window[t.getId()+"Buddha"]=this.page;sapbi_page=sapbi_page||{};sapbi_page.staticMimeUrlPrefix=this.dshBaseUrl;sapbi_page.getParameter=function(){return"";};sapbi_MIMES_PIXEL="";};
sap.zen.dsh.AnalyticGrid.prototype.onAfterRendering=function(){this._initializeInternal();};
sap.zen.dsh.AnalyticGrid.prototype._logoff=function(){if(!this.loggedOff){this.loggedOff=true;this._executeScript("APPLICATION.logoff();");}};
sap.zen.dsh.AnalyticGrid.prototype.exit=function(){this._logoff();var r=sap.ui.getCore().byId(this.sId+"ROOT_absolutelayout");if(r){r.destroy();}};
sap.zen.dsh.AnalyticGrid.prototype._addParameter=function(n,v){this.parameters[n]=v;};
sap.zen.dsh.AnalyticGrid.prototype._executeScript=function(s){this.page.getWindow().increaseLock();this.page&&this.page.exec&&this.page.exec(s);};
sap.zen.dsh.AnalyticGrid.prototype.setSelection=function(s){this.setProperty("selection",s,true);if(this.initialized){var n=this._buildNavParamObject(s);this.page.navigationParamObject=JSON.stringify(n);this._executeScript("GLOBAL_SCRIPT_ACTIONS.ApplyNavigationParameters();");}return this;};
sap.zen.dsh.AnalyticGrid.prototype.fireSelectionChange=function(p){this.setProperty("selection",p.selection,true);return this.fireEvent("selectionChange",p);};
sap.zen.dsh.AnalyticGrid.prototype._buildNavParamObject=function(s){function a(O,v,V){if(!v.hasOwnProperty(O)){v[O]=V;}}var n={};if(s){var p=s.Parameters;var S=s.SelectOptions;if(p){for(var b=0;b<p.length;b++){var P=p[b];n[P.PropertyName]=P.PropertyValue;}}if(S){for(var i=0;i<S.length;++i){var o=S[i];var r=o.Ranges;var f=[];for(var j=0;j<r.length;++j){var c;var R=r[j];if(["EQ","BT","GE","LE","GT","LT"].indexOf(R.Option)==-1){continue;}if(R.Sign==="I"&&R.Option==="EQ"){c=R.Low;}else{c={exclude:R.Sign==="E"||undefined,operation:R.Option,from:R.Low,to:R.High};}f.push(c);}if(f.length>0){a(o.PropertyName,n,f);}}}}return n;};
sap.zen.dsh.AnalyticGrid.prototype._initializeSelectionVariant=function(s){var n=this._buildNavParamObject(s);if(!jQuery.isEmptyObject(n)){this._addParameter("NAV_PARAMS",JSON.stringify(n));}};
sap.zen.dsh.AnalyticGrid.prototype._initializeInnerAppState=function(s){if(s){this._addParameter("NAV_INITIAL_STATE",s);}};
sap.zen.dsh.AnalyticGrid.prototype.setState=function(s){this.setProperty("state",s,true);if(this.initialized){this.page.getWindow().getContext("BookmarkInternal").applyApplicationState(s,true);this.page.forceFullNonDeltaRender();}return this;};
sap.zen.dsh.AnalyticGrid.prototype.fireStateChange=function(p){this.setProperty("state",p.state,true);return this.fireEvent("stateChange",p);}
