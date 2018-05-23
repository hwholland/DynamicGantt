/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./BarInPageEnabler','./library','sap/ui/core/Control'],function(q,B,l,C){"use strict";var a=C.extend("sap.m.Bar",{metadata:{interfaces:["sap.m.IBar"],library:"sap.m",properties:{enableFlexBox:{type:"boolean",group:"Misc",defaultValue:false,deprecated:true},translucent:{type:"boolean",group:"Appearance",defaultValue:false,deprecated:true},design:{type:"sap.m.BarDesign",group:"Appearance",defaultValue:sap.m.BarDesign.Auto}},aggregations:{contentLeft:{type:"sap.ui.core.Control",multiple:true,singularName:"contentLeft"},contentMiddle:{type:"sap.ui.core.Control",multiple:true,singularName:"contentMiddle"},contentRight:{type:"sap.ui.core.Control",multiple:true,singularName:"contentRight"}},designtime:true}});a.prototype.onBeforeRendering=function(){this._removeAllListeners();};a.prototype.onAfterRendering=function(){this._handleResize();};a.prototype.init=function(){this.data("sap-ui-fastnavgroup","true",true);};a.prototype.exit=function(){this._removeAllListeners();if(this._oflexBox){this._oflexBox.destroy();this._oflexBox=null;}this._$MidBarPlaceHolder=null;this._$RightBar=null;this._$LeftBar=null;};a._aResizeHandlers=["_sResizeListenerId","_sResizeListenerIdMid","_sResizeListenerIdRight","_sResizeListenerIdLeft"];a.prototype._removeAllListeners=function(){var t=this;a._aResizeHandlers.forEach(function(i){t._removeListenerFailsave(i);});};a.prototype._removeListenerFailsave=function(L){if(this[L]){sap.ui.core.ResizeHandler.deregister(this[L]);this[L]=null;}};a.prototype._handleResize=function(){this._removeAllListeners();var c=!!this.getContentLeft().length,b=!!this.getContentMiddle().length,d=!!this.getContentRight().length;if(!this.getVisible()){return;}if(!c&&!b&&!d){return;}this._$LeftBar=this.$("BarLeft");this._$RightBar=this.$("BarRight");this._$MidBarPlaceHolder=this.$("BarPH");this._updatePosition(c,b,d);this._sResizeListenerId=sap.ui.core.ResizeHandler.register(this.getDomRef(),q.proxy(this._handleResize,this));if(this.getEnableFlexBox()){return;}if(c){this._sResizeListenerIdLeft=sap.ui.core.ResizeHandler.register(this._$LeftBar[0],q.proxy(this._handleResize,this));}if(b){this._sResizeListenerIdMid=sap.ui.core.ResizeHandler.register(this._$MidBarPlaceHolder[0],q.proxy(this._handleResize,this));}if(d){this._sResizeListenerIdRight=sap.ui.core.ResizeHandler.register(this._$RightBar[0],q.proxy(this._handleResize,this));}};a.prototype._updatePosition=function(c,b,d){if(!c&&!d&&b){return;}if(c&&!b&&!d){return;}if(!c&&!b&&d){return;}var i=this.$().outerWidth(true);this._$RightBar.css({width:""});this._$LeftBar.css({width:""});this._$MidBarPlaceHolder.css({position:"",width:"",visibility:'hidden'});var r=this._$RightBar.outerWidth(true);if(r>i){if(c){this._$LeftBar.css({width:"0px"});}if(b){this._$MidBarPlaceHolder.css({width:"0px"});}this._$RightBar.css({width:i+"px"});return;}var L=this._getBarContainerWidth(this._$LeftBar);if(i<(L+r)){L=i-r;this._$LeftBar.css({width:L+"px"});this._$MidBarPlaceHolder.css({width:"0px"});return;}this._$MidBarPlaceHolder.css(this._getMidBarCss(r,i,L));};a.prototype._getMidBarCss=function(r,b,L){var m=this._$MidBarPlaceHolder.outerWidth(true),R=sap.ui.getCore().getConfiguration().getRTL(),s=R?"right":"left",M={visibility:""};if(this.getEnableFlexBox()){m=b-L-r-parseInt(this._$MidBarPlaceHolder.css('margin-left'),10)-parseInt(this._$MidBarPlaceHolder.css('margin-right'),10);M.position="absolute";M.width=m+"px";M[s]=L;return M;}var S=b-L-r,i=(b/2)-(m/2),c=L>i,d=(b/2)+(m/2),e=(b-r)<d;if(S>0&&(c||e)){M.position="absolute";M.width=S+"px";M.left=R?r:L;}return M;};a.prototype._getBarContainerWidth=function(c){var i,b=0,d=c.children(),e=0;if(sap.ui.Device.browser.webkit||sap.ui.Device.browser.firefox||sap.ui.Device.browser.edge){for(i=0;i<d.length;i++){e+=q(d[i]).outerWidth(true);}b=c.outerWidth(true);}else{var o;for(i=0;i<d.length;i++){o=window.getComputedStyle(d[i]);if(o.width=="auto"){e+=q(d[i]).width()+1;}else{e+=parseFloat(o.width);}e+=parseFloat(o.marginLeft);e+=parseFloat(o.marginRight);e+=parseFloat(o.paddingLeft);e+=parseFloat(o.paddingRight);}var f=window.getComputedStyle(c[0]);b+=parseFloat(f.width);b+=parseFloat(f.marginLeft);b+=parseFloat(f.marginRight);b+=parseFloat(f.paddingLeft);b+=parseFloat(f.paddingRight);}if(b<e){b=e;}return b;};a.prototype.isContextSensitive=B.prototype.isContextSensitive;a.prototype.setHTMLTag=B.prototype.setHTMLTag;a.prototype.getHTMLTag=B.prototype.getHTMLTag;a.prototype.applyTagAndContextClassFor=B.prototype.applyTagAndContextClassFor;a.prototype._setLandmarkInfo=B.prototype._setLandmarkInfo;a.prototype._writeLandmarkInfo=B.prototype._writeLandmarkInfo;return a;},true);
