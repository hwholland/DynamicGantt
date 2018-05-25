/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2018 SAP SE. All rights reserved
 */
sap.ui.define(['jquery.sap.global','./library','sap/m/library'],function(q,l,M){"use strict";var B={};B.render=function(r,c){if(!c._bThemeApplied){return;}var C=c._calculateChartData();var f=+C.forecastValuePct;var s;if(c.getIsResponsive()){s="sapSuiteBMCResponsive";}else{s="sapSuiteBMCSize"+c.getSize();}var S=c.getScale();var d=sap.ui.getCore().getConfiguration().getRTL()?"right":"left";var m="sapSuiteBMCModeType"+c.getMode();var D=c.getMode()===l.BulletMicroChartModeType.Delta?c._calculateDeltaValue():0;var I=c.getActual()&&c.getActual()._isValueSet;var b=c.getShowActualValue()&&c.getSize()!==M.Size.XS&&c.getMode()===l.BulletMicroChartModeType.Actual;var a=c.getShowDeltaValue()&&c.getSize()!==M.Size.XS&&c.getMode()===l.BulletMicroChartModeType.Delta;var e=c.getShowTargetValue()&&c.getSize()!==M.Size.XS;var A=c.getActualValueLabel();var g=c.getDeltaValueLabel();var t=c.getTargetValueLabel();var h=c.getThresholds();var j=c.getAltText();var k;if(I){k="sapSuiteBMCSemanticColor"+c.getActual().getColor();}r.write("<div");r.writeControlData(c);r.addClass("sapSuiteBMC");r.addClass("sapSuiteBMCContent");r.addClass(q.sap.encodeHTML(s));if(c.hasListeners("press")){r.addClass("sapSuiteUiMicroChartPointer");r.writeAttribute("tabindex","0");}r.writeAttribute("role","presentation");r.writeAttributeEscaped("aria-label",j);r.writeClasses();if(c.getWidth()){r.addStyle("width",c.getWidth());r.writeStyles();}r.writeAttribute("id",c.getId()+"-bc-content");r.write(">");r.write("<div");r.addClass("sapSuiteBMCVerticalAlignmentContainer");r.addClass("sapSuiteBMCWholeControl");r.writeClasses();r.write(">");r.write("<div");r.addClass("sapSuiteBMCChart");r.addClass(q.sap.encodeHTML(s));r.writeClasses();r.writeAttribute("id",c.getId()+"-bc-chart");r.write(">");var v="";r.write("<div");r.addClass("sapSuiteBMCTopLabel");r.writeClasses();r.write(">");if(I&&b){var n=A?A:""+c.getActual().getValue();v=n+S;r.write("<div");r.addClass("sapSuiteBMCItemValue");r.addClass(q.sap.encodeHTML(k));r.addClass(q.sap.encodeHTML(s));r.writeClasses();r.writeStyles();r.writeAttribute("id",c.getId()+"-bc-item-value");r.write(">");r.writeEscaped(v);r.write("</div>");}else if(I&&c._isTargetValueSet&&a){var o=g?g:""+D;v=o+S;r.write("<div");r.addClass("sapSuiteBMCItemValue");r.addClass(q.sap.encodeHTML(k));r.addClass(q.sap.encodeHTML(s));r.writeClasses();r.writeStyles();r.writeAttribute("id",c.getId()+"-bc-item-value");r.write(">");r.write("&Delta;");r.writeEscaped(v);r.write("</div>");}r.write("</div>");r.write("<div");r.addClass("sapSuiteBMCChartCanvas");r.writeClasses();r.write(">");for(var i=0;i<C.thresholdsPct.length;i++){if(h[i]._isValueSet){this.renderThreshold(r,c,C.thresholdsPct[i],s);}}r.write("<div");r.writeAttribute("id",c.getId()+"-chart-bar");r.addClass("sapSuiteBMCBar");r.addClass(q.sap.encodeHTML(s));r.addClass("sapSuiteBMCScaleColor"+c.getScaleColor());r.writeClasses();r.write(">");r.write("</div>");if(I){if(c._isForecastValueSet&&c.getMode()===l.BulletMicroChartModeType.Actual){r.write("<div");r.addClass("sapSuiteBMCForecastBarValue");r.addClass(q.sap.encodeHTML(k));r.addClass(q.sap.encodeHTML(s));r.writeClasses();r.addStyle("width",f+"%");r.writeStyles();r.writeAttribute("id",c.getId()+"-forecast-bar-value");r.write("></div>");}r.write("<div");r.addClass("sapSuiteBMCBarValueMarker");r.addClass(m);if(!c.getShowValueMarker()){r.addClass("sapSuiteBMCBarValueMarkerHidden");}r.addClass(q.sap.encodeHTML(k));r.addClass(q.sap.encodeHTML(s));r.writeClasses();r.addStyle(q.sap.encodeHTML(d),q.sap.encodeHTML(parseFloat(C.actualValuePct)+parseFloat(1)+"%"));if(c.getMode()===l.BulletMicroChartModeType.Delta&&C.actualValuePct<=C.targetValuePct){r.addStyle("margin","0");}r.writeStyles();r.writeAttribute("id",c.getId()+"-bc-bar-value-marker");r.write("></div>");if(c.getMode()===l.BulletMicroChartModeType.Actual&&C.actualValuePct!==0){r.write("<div");r.addClass("sapSuiteBMCBarValue");r.addClass(q.sap.encodeHTML(k));r.addClass(q.sap.encodeHTML(s));if(c._isForecastValueSet){r.addClass("sapSuiteBMCForecast");}r.writeClasses();r.addStyle("width",q.sap.encodeHTML(C.actualValuePct+"%"));r.writeStyles();r.writeAttribute("id",c.getId()+"-bc-bar-value");r.write("></div>");}else if(c._isTargetValueSet&&c.getMode()===l.BulletMicroChartModeType.Delta){r.write("<div");r.addClass("sapSuiteBMCBarValue");r.addClass(q.sap.encodeHTML(k));r.addClass(q.sap.encodeHTML(s));r.writeClasses();r.addStyle("width",q.sap.encodeHTML(Math.abs(C.actualValuePct-C.targetValuePct)+"%"));r.addStyle(q.sap.encodeHTML(d),q.sap.encodeHTML(1+Math.min(C.actualValuePct,C.targetValuePct)+"%"));r.writeStyles();r.writeAttribute("id",c.getId()+"-bc-bar-value");r.write("></div>");}}if(c._isTargetValueSet){r.write("<div");r.addClass("sapSuiteBMCTargetBarValue");r.addClass(q.sap.encodeHTML(s));r.writeClasses();r.addStyle(q.sap.encodeHTML(d),q.sap.encodeHTML(parseFloat(C.targetValuePct).toFixed(2)+"%"));r.writeStyles();r.writeAttribute("id",c.getId()+"-bc-target-bar-value");r.write("></div>");r.write("</div>");if(e){r.write("<div");r.addClass("sapSuiteBMCBottomLabel");r.writeClasses();r.write(">");var T=t?t:""+c.getTargetValue();var p=T+S;r.write("<div");r.addClass("sapSuiteBMCTargetValue");r.addClass(q.sap.encodeHTML(s));r.writeClasses();r.writeStyles();r.writeAttribute("id",c.getId()+"-bc-target-value");r.write(">");r.writeEscaped(p);r.write("</div>");r.write("</div>");}}else{r.write("</div>");}r.write("</div>");r.write("<div");r.writeAttribute("id",c.getId()+"-info");r.writeAttribute("aria-hidden","true");r.addStyle("display","none");r.writeStyles();r.write(">");r.write("</div>");r.write("</div>");r.write("</div>");};B.renderThreshold=function(r,c,t,s){var d=sap.ui.getCore().getConfiguration().getRTL()?"right":"left",v=0.98*t.valuePct+1,C="sapSuiteBMCSemanticColor"+t.color;if(C==="sapSuiteBMCSemanticColor"+M.ValueColor.Error){r.write("<div");r.addClass("sapSuiteBMCDiamond");r.addClass(q.sap.encodeHTML(s));r.addClass(q.sap.encodeHTML(C));r.writeClasses();r.addStyle(q.sap.encodeHTML(d),q.sap.encodeHTML(v+"%"));r.writeStyles();r.write("></div>");}r.write("<div");r.addClass("sapSuiteBMCThreshold");r.addClass(q.sap.encodeHTML(s));r.addClass(q.sap.encodeHTML(C));r.writeClasses();r.addStyle(q.sap.encodeHTML(d),q.sap.encodeHTML(v+"%"));r.writeStyles();r.write("></div>");};return B;},true);
