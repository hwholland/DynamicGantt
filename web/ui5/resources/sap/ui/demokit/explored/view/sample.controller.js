/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/core/mvc/Controller"],function($,C){"use strict";return C.extend("sap.ui.demokit.explored.view.sample",{onInit:function(){this.router=sap.ui.core.UIComponent.getRouterFor(this);this.router.attachRoutePatternMatched(this.onRouteMatched,this);this._viewModel=new sap.ui.model.json.JSONModel({showNavButton:true,showNewTab:false});this.getView().setModel(this._viewModel);},onRouteMatched:function(e){if(e.getParameter("name")!=="sample"){return;}var m=this._viewModel.getData();this._sId=e.getParameter("arguments").id;var s=sap.ui.demokit.explored.data.samples[this._sId];if(!s){this.router.myNavToWithoutHash("sap.ui.demokit.explored.view.notFound","XML",false,{path:this._sId});return;}var p=this.getView().byId("page");var h=sap.ui.core.routing.History.getInstance();var P=h.getPreviousHash();m.showNavButton=sap.ui.Device.system.phone||!!P;m.previousSampleId=s.previousSampleId;m.nextSampleId=s.nextSampleId;p.setTitle("Sample: "+s.name);try{var c=this._createComponent();}catch(a){p.removeAllContent();p.addContent(new sap.m.Text({text:"Error while loading the sample: "+a}));return;}var o=(this._oComp.getMetadata())?this._oComp.getMetadata().getConfig():null;var S=o&&o.sample||{};m.showNewTab=!!S.iframe;if(S.iframe){c=this._createIframe(S.iframe);}else{this.sIFrameUrl=null;}var b=!!S.stretch;var H=b?"100%":null;p.setEnableScrolling(!b);if(c.setHeight){c.setHeight(H);}p.removeAllContent();p.addContent(c);p.scrollTo(0);this._viewModel.setData(m);},onNewTab:function(){sap.m.URLHelper.redirect(this.sIFrameUrl,true);},onPreviousSample:function(e){this.router.navTo("sample",{id:this._viewModel.getProperty("/previousSampleId")},true);},onNextSample:function(e){this.router.navTo("sample",{id:this._viewModel.getProperty("/nextSampleId")},true);},_createIframe:function(i){var s=this._sId,r=/\/([^\/]*)$/,a=/\..+$/,f,F,b;if(typeof i==="string"){f=r.exec(i);F=(f&&f.length>1?f[1]:i);b=a.exec(F)[0];var I=i.replace(a,"");I=jQuery.sap.getModulePath(s+"."+I,b||".html");var S=window.location.search,t="sap-ui-theme="+sap.ui.getCore().getConfiguration().getTheme();if(S){var R=/sap-ui-theme=[a-z0-9\-]+/;if(S.match(R)){S=S.replace(R,t);}else{S+="&"+t;}}else{S="?"+t;}this.sIFrameUrl=I+S;}else{jQuery.sap.log.error("no iframe source was provided");return;}var h=sap.ui.getCore().byId("sampleFrame");if(h){h.destroy();}h=new sap.ui.core.HTML({id:"sampleFrame",content:'<iframe src="'+this.sIFrameUrl+'" id="sampleFrame" frameBorder="0"></iframe>'}).addEventDelegate({onAfterRendering:function(){h.$().on("load",function(){var o=h.$()[0].contentWindow;o.sap.ui.getCore().attachInit(function(){var o=h.$()[0].contentWindow;o.sap.ui.getCore().applyTheme(sap.ui.getCore().getConfiguration().getTheme());o.jQuery('body').toggleClass("sapUiSizeCompact",$("body").hasClass("sapUiSizeCompact")).toggleClass("sapUiSizeCozy",$("body").hasClass("sapUiSizeCozy"));});});}});return h;},_createComponent:function(){var c='sampleComp-'+this._sId;var s=this._sId;this._oComp=sap.ui.component(c);if(this._oComp){this._oComp.destroy();}this._oComp=sap.ui.getCore().createComponent({id:c,name:s});return new sap.ui.core.ComponentContainer({component:this._oComp});},onNavBack:function(e){if(this._oComp&&this._oComp.exit){this._oComp.exit();}this.router.myNavBack("home",{});},onNavToCode:function(e){this.router.navTo("code",{id:this._sId},false);},onToggleFullScreen:function(e){sap.ui.demokit.explored.util.ToggleFullScreenHandler.updateMode(e,this.getView());}});});
