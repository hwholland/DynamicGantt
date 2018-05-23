/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./library','sap/ui/core/Control','sap/m/Text','sap/ui/core/HTML','sap/ui/core/Icon','sap/ui/core/IconPool'],function(q,l,C,T,H,I){"use strict";var N=C.extend("sap.m.NumericContent",{metadata:{library:"sap.m",properties:{"animateTextChange":{type:"boolean",group:"Misc",defaultValue:true},"formatterValue":{type:"boolean",group:"Misc",defaultValue:false},"icon":{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},"iconDescription":{type:"string",group:"Misc",defaultValue:null},"indicator":{type:"sap.m.DeviationIndicator",group:"Misc",defaultValue:sap.m.DeviationIndicator.None},"nullifyValue":{type:"boolean",group:"Misc",defaultValue:true},"scale":{type:"string",group:"Misc",defaultValue:null},"size":{type:"sap.m.Size",group:"Misc",defaultValue:sap.m.Size.Auto},"truncateValueTo":{type:"int",group:"Misc",defaultValue:4},"value":{type:"string",group:"Misc",defaultValue:null},"valueColor":{type:"sap.m.ValueColor",group:"Misc",defaultValue:sap.m.ValueColor.Neutral},"width":{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:null},"withMargin":{type:"boolean",group:"Appearance",defaultValue:true},"state":{type:"sap.m.LoadState",group:"Misc",defaultValue:sap.m.LoadState.Loaded}},events:{"press":{}}}});N.prototype.init=function(){this._rb=sap.ui.getCore().getLibraryResourceBundle("sap.m");this.setTooltip("{AltText}");};N.prototype.onBeforeRendering=function(){this.$().unbind("mouseenter",this._addTooltip);this.$().unbind("mouseleave",this._removeTooltip);};N.prototype.onAfterRendering=function(){this.$().bind("mouseenter",this._addTooltip.bind(this));this.$().bind("mouseleave",this._removeTooltip.bind(this));if(sap.m.LoadState.Loaded==this.getState()||this.getAnimateTextChange()){q.sap.byId(this.getId()).animate({opacity:"1"},1000);}};N.prototype._addTooltip=function(){this.$().attr("title",this.getTooltip_AsString());};N.prototype._removeTooltip=function(){this.$().attr("title",null);};N.prototype.exit=function(){if(this._oIcon){this._oIcon.destroy();}};N.prototype.getAltText=function(){var v=this.getValue();var s=this.getScale();var e;var m=this._rb.getText(("SEMANTIC_COLOR_"+this.getValueColor()).toUpperCase());var a="";if(this.getNullifyValue()){e="0";}else{e="";}if(this.getIconDescription()){a=a.concat(this.getIconDescription());a=a.concat("\n");}if(v){a=a.concat(v+s);}else{a=a.concat(e);}a=a.concat("\n");if(this.getIndicator()&&this.getIndicator()!=sap.m.DeviationIndicator.None){a=a.concat(this._rb.getText(("NUMERICCONTENT_DEVIATION_"+this.getIndicator()).toUpperCase()));a=a.concat("\n");}a=a.concat(m);return a;};N.prototype.getTooltip_AsString=function(){var t=this.getTooltip();var s=this.getAltText();if(typeof t==="string"||t instanceof String){s=t.split("{AltText}").join(s).split("((AltText))").join(s);return s;}if(t){return t;}else{return"";}};N.prototype.setIcon=function(u){var v=!q.sap.equal(this.getIcon(),u);if(v){if(this._oIcon){this._oIcon.destroy();this._oIcon=undefined;}if(u){this._oIcon=sap.ui.core.IconPool.createControlByURI({id:this.getId()+"-icon-image",src:u},sap.m.Image);}}this._setPointerOnIcon();return this.setProperty("icon",u);};N.prototype._setPointerOnIcon=function(){if(this._oIcon&&this.hasListeners("press")){this._oIcon.addStyleClass("sapMPointer");}else if(this._oIcon&&this._oIcon.hasStyleClass("sapMPointer")){this._oIcon.removeStyleClass("sapMPointer");}};N.prototype.ontap=function(e){if(sap.ui.Device.browser.internet_explorer){this.$().focus();}this.firePress();};N.prototype.onkeyup=function(e){if(e.which===q.sap.KeyCodes.ENTER||e.which===q.sap.KeyCodes.SPACE){this.firePress();e.preventDefault();}};N.prototype.onkeydown=function(e){if(e.which===q.sap.KeyCodes.SPACE){e.preventDefault();}};N.prototype.attachEvent=function(e,d,f,a){sap.ui.core.Control.prototype.attachEvent.call(this,e,d,f,a);if(this.hasListeners("press")){this.$().attr("tabindex",0).addClass("sapMPointer");this._setPointerOnIcon();}return this;};N.prototype.detachEvent=function(e,f,a){sap.ui.core.Control.prototype.detachEvent.call(this,e,f,a);if(!this.hasListeners("press")){this.$().removeAttr("tabindex").removeClass("sapMPointer");this._setPointerOnIcon();}return this;};N.prototype._parseFormattedValue=function(v){var t=v.replace(String.fromCharCode(8206),"").replace(String.fromCharCode(8207),"");return{scale:t.replace(/[+-., \d]*(.*)$/g,"$1").trim().replace(/\.$/,""),value:t.replace(/([+-., \d]*).*$/g,"$1").trim()};};return N;},true);
