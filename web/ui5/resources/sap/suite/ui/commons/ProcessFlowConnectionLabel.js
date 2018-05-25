/*!
 * 
		SAP UI development toolkit for HTML5 (SAPUI5)
		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(['sap/m/Button','./library','sap/ui/core/InvisibleText'],function(B,l,I){"use strict";var P=B.extend("sap.suite.ui.commons.ProcessFlowConnectionLabel",{metadata:{library:"sap.suite.ui.commons",properties:{priority:{type:"int",group:"Misc",defaultValue:0},state:{type:"sap.suite.ui.commons.ProcessFlowConnectionLabelState",group:"Appearance",defaultValue:"Neutral"}}}});P.prototype._bNavigationFocus=false;P.prototype._bSelected=false;P.prototype._bHighlighted=false;P.prototype.ACTIVE_CSS_CLASS="sapSuiteUiCommonsProcessFlowLabelActive";P.prototype.HOVER_CSS_CLASS="sapSuiteUiCommonsProcessFlowLabelHover";P.prototype.MOUSE_EVENTS="mouseenter mousedown mouseup mouseleave";P.prototype._oResBundle=null;P.prototype._bDimmed=false;P.prototype.init=function(){if(B.prototype.init){B.prototype.init.apply(this,arguments);}this.addStyleClass("sapSuiteUiCommonsProcessFlowConnectionLabel");if(!this._oResBundle){this._oResBundle=sap.ui.getCore().getLibraryResourceBundle("sap.suite.ui.commons");}};P.prototype.exit=function(){this.$().unbind(this.MOUSE_EVENTS,this._handleEvents);};P.prototype.onBeforeRendering=function(){this.$().unbind(this.MOUSE_EVENTS,this._handleEvents);this._configureStateClasses();this._setLabelWidth();this._setAriaDetails();};P.prototype.onAfterRendering=function(){if(!this.getText()){if(this.$().children().hasClass("sapMBtnIconFirst")){this.$().children().removeClass("sapMBtnIconFirst");}}this.$().bind(this.MOUSE_EVENTS,this._handleEvents.bind(this));};P.prototype._handleEvents=function(e){var p=sap.ui.require("sap/suite/ui/commons/ProcessFlow");if(!p){return;}switch(e.type){case p._mouseEvents.mouseEnter:this.$().find("*").addClass(this.HOVER_CSS_CLASS);break;case p._mouseEvents.mouseDown:this.$().find("*").removeClass(this.HOVER_CSS_CLASS);this.$().find("*").addClass(this.ACTIVE_CSS_CLASS);break;case p._mouseEvents.mouseUp:this.$().find("*").removeClass(this.ACTIVE_CSS_CLASS);this.$().find("*").addClass(this.HOVER_CSS_CLASS);break;case p._mouseEvents.mouseLeave:this.$().find("*").removeClass(this.ACTIVE_CSS_CLASS);this.$().find("*").removeClass(this.HOVER_CSS_CLASS);break;default:}};P.prototype._getNavigationFocus=function(){return this._bNavigationFocus;};P.prototype._setNavigationFocus=function(n){this._bNavigationFocus=n;};P.prototype._setSelected=function(s){this._bSelected=s;};P.prototype._getSelected=function(){return this._bSelected;};P.prototype._setHighlighted=function(h){this._bHighlighted=h;};P.prototype._getHighlighted=function(){return this._bHighlighted;};P.prototype._setDimmed=function(d){this._bDimmed=d;};P.prototype._getDimmed=function(){return this._bDimmed;};P.prototype.setWidth=function(){};P.prototype.setIconFirst=function(){};P.prototype._setLabelWidth=function(){if(this.getIcon()){if(this.getText()){this.setProperty("width","4.5rem",false);}else{this.setProperty("width","2rem",false);}}else if(this.getText()&&this.getText().length>2){this.setProperty("width","4.5rem",false);}else{this.setProperty("width","2rem",false);}};P.prototype._configureStateClasses=function(){switch(this.getState()){case l.ProcessFlowConnectionLabelState.Positive:this.addStyleClass("sapSuiteUiCommonsLabelStatePositive");break;case l.ProcessFlowConnectionLabelState.Critical:this.addStyleClass("sapSuiteUiCommonsLabelStateCritical");break;case l.ProcessFlowConnectionLabelState.Negative:this.addStyleClass("sapSuiteUiCommonsLabelStateNegative");break;default:this.addStyleClass("sapSuiteUiCommonsLabelStateNeutral");}if(this._getDimmed()&&this.getEnabled()){this.addStyleClass("sapSuiteUiCommonsLabelDimmed");}else{this.removeStyleClass("sapSuiteUiCommonsLabelDimmed");}if(this._getSelected()){this.addStyleClass("sapSuiteUiCommonsLabelSelected");}else{this.removeStyleClass("sapSuiteUiCommonsLabelSelected");}if(this._getHighlighted()){this.addStyleClass("sapSuiteUiCommonsLabelHighlighted");}else{this.removeStyleClass("sapSuiteUiCommonsLabelHighlighted");}};P.prototype._setAriaDetails=function(){var i=new I();i.setText(this._oResBundle.getText('PF_CONNECTIONLABEL'));i.toStatic();var o=new I();o.setText(this.getText());o.toStatic();if(this.getAriaLabelledBy().length===0){this.addAriaLabelledBy(i);this.addAriaLabelledBy(o);}};return P;});
