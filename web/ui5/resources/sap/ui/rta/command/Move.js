/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2016 SAP SE. All rights reserved
 */
sap.ui.define(['jquery.sap.global','sap/ui/rta/command/FlexCommand','sap/ui/rta/controlAnalyzer/ControlAnalyzerFactory',"sap/ui/fl/changeHandler/MoveElements"],function(q,F,C,M){"use strict";var a=F.extend("sap.ui.rta.command.Move",{metadata:{library:"sap.ui.rta",properties:{movedElements:{type:"array"},target:{type:"object"},source:{type:"object"},changeType:{type:"string",defaultValue:"moveElements"}},associations:{},events:{}}});a.prototype.init=function(){this.setChangeHandler(M);};a.FORWARD=true;a.BACKWARD=false;a.prototype._getSpecificChangeInfo=function(f){var s=f?this.getSource():this.getTarget();var t=f?this.getTarget():this.getSource();var S=s.parent||sap.ui.getCore().byId(s.id);if(s.parent){s.id=s.parent.getId();delete s.parent;}if(t.parent){t.id=t.parent.getId();delete t.parent;}var m={changeType:this.getChangeType(),source:s,target:t,movedElements:[]};this.getMovedElements().forEach(function(b){m.movedElements.push({id:b.id||b.element.getId(),sourceIndex:f?b.sourceIndex:b.targetIndex,targetIndex:f?b.targetIndex:b.sourceIndex});});var c=C.getControlAnalyzerFor(S);if(c){m=c.mapSpecificChangeData("Move",m);}return{data:m,sourceParent:S};};a.prototype._getFlexChange=function(f){var s=this._getSpecificChangeInfo(f);var c=this._completeChangeContent(s.data);return{change:c,selectorElement:s.sourceParent};};a.prototype._getForwardFlexChange=function(e){return this._getFlexChange(a.FORWARD);};a.prototype._getBackwardFlexChange=function(e){return this._getFlexChange(a.BACKWARD);};a.prototype.serialize=function(){return this._getSpecificChangeInfo(a.FORWARD).data;};return a;},true);