/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2018 SAP SE. All rights reserved
 */
jQuery.sap.declare("sap.uiext.inbox.InboxTaskDescription");jQuery.sap.declare("sap.uiext.inbox.InboxTaskDetails");jQuery.sap.declare("sap.uiext.inbox.Inbox");sap.ui.commons.FormattedTextView.extend("sap.uiext.inbox.InboxTaskDescription",{metadata:{properties:{wrapping:{type:"boolean",defaultValue:true},maxLines:{type:"int",defaultValue:1}}},renderer:function(r,c){sap.ui.commons.FormattedTextViewRenderer.render.apply(this,arguments);}});
sap.uiext.inbox.InboxTaskDescription.prototype.setMaxLines=function(v){this.setProperty('maxLines',v);var f=this.getTextDomRef();if(f){if(this.getWrapping()&&this.getMaxLines()>0){if(!this.canUseNativeLineClamp()){this.clampHeight();jQuery(f).css({"text-overflow":"ellipsis","overflow":"hidden","max-width":"100%"});}else{jQuery(f).css({"display":"-webkit-box","-webkit-box-orient":"vertical","overflow":"hidden","-webkit-line-clamp":this.getMaxLines()+""});}}else if(!this.getWrapping()){jQuery(f).css({"text-overflow":"ellipsis","overflow":"hidden","max-width":"100%","whitespace":"nowrap"});}}return this;};
sap.uiext.inbox.InboxTaskDescription.prototype.onAfterRendering=function(){var t=this.getTextDomRef();if(t){if(this.getWrapping()&&this.getMaxLines()>0){if(!this.canUseNativeLineClamp()){this.clampHeight();jQuery(t).css({"text-overflow":"ellipsis","overflow":"hidden","max-width":"100%"});}else{jQuery(t).css({"display":"-webkit-box","-webkit-box-orient":"vertical","overflow":"hidden","-webkit-line-clamp":this.getMaxLines()+""});}}else if(!this.getWrapping()){jQuery(t).css({"text-overflow":"ellipsis","overflow":"hidden","max-width":"100%","whitespace":"nowrap"});}}};
sap.uiext.inbox.InboxTaskDescription.hasNativeLineClamp=(function(){return(typeof document.documentElement.style.webkitLineClamp!='undefined');});
sap.uiext.inbox.InboxTaskDescription.prototype.canUseNativeLineClamp=function(){if(!sap.uiext.inbox.InboxTaskDescription.hasNativeLineClamp){return false;}return true;};
sap.uiext.inbox.InboxTaskDescription.prototype.getClampHeight=function(d){var t=t||this.getTextDomRef();return this.getMaxLines()*this.getLineHeight(t);};
sap.uiext.inbox.InboxTaskDescription.prototype.getTextDomRef=function(){var t=this.getDomRef();return t&&(t.firstElementChild||t);};
sap.uiext.inbox.InboxTaskDescription.prototype.getLineHeight=function(d){var t=t||this.getTextDomRef();if(!t){return;}var s=window.getComputedStyle(t),l=parseFloat(s.lineHeight);if(!l){l=parseFloat(s.fontSize)*this.normalLineHeight;}var L=Math.floor(l);return L;};
sap.uiext.inbox.InboxTaskDescription.prototype.isClamped=function(){var t=t||this.getTextDomRef();if(!t){return;}var T=this.getHtmlText(true);var c=this.getClampHeight(t);var i=i||T.length;t.textContent=T.slice(0,i);if(t.scrollHeight>c){return true;}return false;};
sap.uiext.inbox.InboxTaskDescription.prototype.removeClamp=function(){var t=t||this.getTextDomRef();if(!t){return}jQuery(t).css("-webkit-line-clamp",'');jQuery(t).css("max-height",'');jQuery(t).css("height",'auto');};
sap.ui.core.Control.extend("sap.uiext.inbox.InboxTaskDetails",{metadata:{properties:{showMore:{type:"string",defaultValue:'auto'}},aggregations:{fTV:{type:"sap.ui.commons.FormattedTextView",multiple:false,visibility:"public"},taskDescriptionLink:{type:"sap.ui.commons.Link",multiple:false,visibility:"hidden"}},events:{showMoreClick:{enablePreventDefault:true}}},init:function(){var t=this;this._oBundle=sap.ui.getCore().getLibraryResourceBundle("sap.uiext.inbox");this.setAggregation('taskDescriptionLink',new sap.ui.commons.Link({text:t._oBundle.getText("INBOX_SHOW_MORE_TEXT"),tooltip:t._oBundle.getText("INBOX_SHOW_MORE_LINK_TOOLTIP"),visible:false}).attachPress(jQuery.proxy(this.showMoreClick,this)));},renderer:{render:function(r,c){r.write("<div");r.writeControlData(c);r.addClass("inboxTaskDetails");r.writeClasses();r.write(">");r.write("<div");r.addClass("fTV");r.writeClasses();r.writeStyles();r.write(">");r.renderControl(c.getAggregation("fTV"));r.write("</div>");if(c.getAggregation('taskDescriptionLink').getVisible()){r.write("<div");r.addClass("taskDescriptionLink");r.writeClasses();r.writeStyles();r.write(">");r.renderControl(c.getAggregation("taskDescriptionLink"));r.write("</div>");}r.write("</div>");}},onAfterRendering:function(){var f=this.getAggregation('fTV');if(this.getShowMore()==='true'||(f.isClamped()&&this.getShowMore()==='auto')){this.getAggregation('taskDescriptionLink').setVisible(true);}},showMoreClick:function(e){var _=sap.ui.getCore().getLibraryResourceBundle("sap.uiext.inbox");var s=_.getText("INBOX_SHOW_MORE_TEXT");var S=_.getText("INBOX_SHOW_LESS_TEXT");if(e.getSource().getText()===s){e.getSource().setText(_.getText("INBOX_SHOW_LESS_TEXT"));e.getSource().setTooltip(_.getText("INBOX_SHOW_LESS_LINK_TOOLTIP"));this.fireShowMoreClick({text:s});}else{e.getSource().setText(s);e.getSource().setTooltip(_.getText("INBOX_SHOW_MORE_LINK_TOOLTIP"));this.fireShowMoreClick({text:S});}}});
