/*!
 * 
 * 		SAP UI development toolkit for HTML5 (SAPUI5)
 * 		(c) Copyright 2009-2015 SAP SE. All rights reserved
 * 	
 */
jQuery.sap.declare("sap.suite.ui.commons.TileContent2X2Renderer");jQuery.sap.require("sap.ui.core.Renderer");sap.suite.ui.commons.TileContent2X2Renderer={};
sap.suite.ui.commons.TileContent2X2Renderer.render=function(r,c){var t=c.getTooltip_AsString();var a=c.getAltText?c.getAltText():"";r.write("<div");r.writeControlData(c);r.addClass("sapSuiteTileCnt");r.addClass(c._getContentType());r.addClass(c.getSize());r.addClass("ft-"+"TwoByTwo");if(t){r.writeAttributeEscaped("title",t);}r.writeAttribute("aria-describedby",c.getId()+"-info");r.writeClasses();r.write(">");this.renderContent(r,c);this.renderFooter(r,c);r.write("<div");r.writeAttribute("id",c.getId()+"-info");r.addStyle("display","none");r.writeAttribute("aria-hidden","true");r.writeStyles();r.write(">");r.writeEscaped(a);r.write("</div>");r.write("</div>");};
sap.suite.ui.commons.TileContent2X2Renderer.renderContent=function(r,c){var C=c.getContent();r.write("<div");r.addClass("sapSuiteTileCntContent");r.addClass(c.getSize());r.addClass("ft-"+"TwoByTwo");r.writeClasses();r.writeAttribute("id",c.getId()+"-content");r.write(">");if(C&&!C.hasStyleClass("sapSuiteUiTcInnerMarker")){C.addStyleClass("sapSuiteUiTcInnerMarker");}r.renderControl(C);r.write("</div>");};
sap.suite.ui.commons.TileContent2X2Renderer.renderFooter=function(r,c){var f=c._getFooterText(r,c);r.write("<div");r.addClass("sapSuiteTileCntFtrTxt");r.addClass(c.getSize());r.writeClasses();r.writeAttribute("id",c.getId()+"-footer-text");r.writeAttributeEscaped("title",f);r.write(">");r.writeEscaped(f);r.write("</div>");};
