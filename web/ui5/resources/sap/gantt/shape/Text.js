/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/gantt/shape/Shape","sap/gantt/misc/Utility","sap/gantt/misc/Format","sap/ui/core/Core"],function(S,U,F,C){"use strict";var T=S.extend("sap.gantt.shape.Text",{metadata:{properties:{tag:{type:"string",defaultValue:"text"},text:{type:"string"},x:{type:"number"},y:{type:"number"},fontSize:{type:"number",defaultValue:10},textAnchor:{type:"string",defaultValue:"start"},fontFamily:{type:"string"},wrapWidth:{type:"number",defaultValue:-1},wrapDy:{type:"number",defaultValue:20},truncateWidth:{type:"number",defaultValue:-1},ellipsisWidth:{type:"number",defaultValue:12}}}});T.prototype.getX=function(d,r){if(this.mShapeConfig.hasShapeProperty("x")){return this._configFirst("x",d);}var t=this.getTime(d,r);var a=this.getAxisTime();var x=a.timeToView(F.abapTimestampToDate(t));if(!jQuery.isNumeric(x)){x=a.timeToView(0).toFixed(1);}return x;};T.prototype.getY=function(d,r){if(this.mShapeConfig.hasShapeProperty("y")){return this._configFirst("y",d);}return this.getRowYCenter(d,r)+this.getFontSize(d,r)/2;};T.prototype.getText=function(d){return this._configFirst("text",d);};T.prototype.getTextAnchor=function(d){return this._configFirst("textAnchor",d);};T.prototype.getFontSize=function(d){return this._configFirst("fontSize",d,true);};T.prototype.getFontFamily=function(d){return this._configFirst("fontFamily",d,true);};T.prototype.getWrapWidth=function(d){return this._configFirst("wrapWidth",d);};T.prototype.getWrapDy=function(d){return this._configFirst("wrapDy",d);};T.prototype.getTruncateWidth=function(d){return this._configFirst("truncateWidth",d);};T.prototype.getEllipsisWidth=function(d){return this._configFirst("ellipsisWidth",d);};return T;},true);
