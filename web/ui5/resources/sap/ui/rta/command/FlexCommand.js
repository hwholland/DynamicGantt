/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2016 SAP SE. All rights reserved
 */
sap.ui.define(['sap/ui/rta/command/BaseCommand',"sap/ui/fl/FlexControllerFactory","sap/ui/fl/changeHandler/JsControlTreeModifier","sap/ui/fl/Utils"],function(B,F,J,U){"use strict";var a=B.extend("sap.ui.rta.command.FlexCommand",{metadata:{library:"sap.ui.rta",properties:{changeHandler:{type:"object"},changeType:{type:"string"}},associations:{},events:{}}});a.FORWARD=true;a.BACKWARD=false;a.prototype.getPreparedChange=function(f){var f=(f===true||f===false)?f:true;if(f){return this._forwardPreparedChange;}else{return this._backwardPreparedChange;}};a.prototype.setPreparedChange=function(c,f){if(f){this._forwardPreparedChange=c;}else{this._backwardPreparedChange=c;}};a.prototype._executeWithElement=function(e){var c=this._getForwardFlexChange(e);var A=U.getAppComponentForControl(this.getElement());this.getChangeHandler().applyChange(c.change,c.selectorElement,{modifier:J,appComponent:A});};a.prototype._getForwardFlexChange=function(e){return{change:{},selectorElement:e};};a.prototype._undoWithElement=function(e){var p=this.getPreparedChange(a.BACKWARD);if(!p){var c=this.getChangeHandler();if(c.getInverseChange){var f=this.getPreparedChange(a.FORWARD);p={change:c.getInverseChange(f.change,f.selectorElement,J),selectorElement:f.selectorElement};this.setPreparedChange(p,a.BACKWARD);}else{p=this._getBackwardFlexChange(e);}}if(p){var A=U.getAppComponentForControl(this.getElement());this.getChangeHandler().applyChange(p.change,p.selectorElement,{modifier:J,appComponent:A});}else{jQuery.log.warning("Undo functionality not supported for element with id "+e.getId());}};a.prototype._getBackwardFlexChange=function(e){};a.prototype._completeChangeContent=function(s){var f=F.createForControl(this.getElement());return f.createChange(s,this.getElement());};return a;},true);
