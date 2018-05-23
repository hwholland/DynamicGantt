/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/gantt/drawer/Drawer","sap/gantt/misc/Utility","sap/ui/core/Core","sap/ui/core/IconPool","sap/ui/Device","sap/ui/thirdparty/d3"],function(D,U,C,I,a){"use strict";var S=D.extend("sap.gantt.drawer.SelectionPanel");S.prototype.drawSvg=function(t,d,T,g){if(!d){return;}this._oGanttChartWithTable=g;var e=[];for(var i=0;i<d.length;i++){if(d[i].index&&d[i].index!==0){e.push(d[i]);}}var b=t.selectAll(".sapGanttSelectionPanel");if(b.empty()){b=t.append("g").classed("sapGanttSelectionPanel",true);}if(!b.empty()){var c=$(t.node()).width();var o=g._oGanttChart._composeChartSchemeBackgroundConfig();this._drawExpandedBackground(b,c,T,e,o);this._drawExpandedContent(b,c,T,e);}};S.prototype._drawExpandedBackground=function(s,t,T,b,c){var h=s.selectAll(".sapGanttExpandChartHeader").data(b);h.enter().append("rect").classed("sapGanttExpandChartHeader",true);h.attr("x",function(){return C.getConfiguration().getRTL()?t-T+1:2;}).attr("y",function(d){return d.y;}).attr("height",function(d){return d.rowHeight-1;}).attr("width",T-2).attr("class",function(d){var f=c?c[d.chartScheme]:undefined;if(f&&f!==""){return"sapGanttExpandChartHeader "+f;}else{return"sapGanttExpandChartHeader sapGanttExpandChartHeaderBG";}});h.exit().remove();var e=s.selectAll(".sapGanttExpandChartCnt").data(b);e.enter().append("rect").classed("sapGanttExpandChartCnt",true);e.attr("x",function(){return C.getConfiguration().getRTL()?2:T+1;}).attr("y",function(d){return d.y;}).attr("height",function(d){return d.rowHeight-1;}).attr("width",t-T-3).attr("class",function(d){var f=c?c[d.chartScheme]:undefined;if(f&&f!==""){return"sapGanttExpandChartCnt "+f;}else{return"sapGanttExpandChartCnt sapGanttExpandChartCntBG";}});e.exit().remove();var B=s.selectAll("path.sapGanttExpandChartLine").data(b);B.enter().append("path").classed("sapGanttExpandChartLine",true);B.attr("d",function(d){return"M0 "+(d.y-1)+" H"+(t-1);});B.exit().remove();};S.prototype._drawExpandedContent=function(s,t,T,b){var g=this._getLevelIndentByShape;var c=[];for(var i=0;i<b.length;i++){if(b[i].index===1){var e=[];e.push(b[i]);c.push(e);}}s.selectAll("g").remove();var f=s.selectAll("g").data(c);f.enter().append("g").classed("sapGanttExpandChartContent",true);f.exit().remove();var h=f.selectAll(".sapGanttExpandChartIcon").data(function(d){return d;});h.enter().append(function(d){if(I.isIconURI(d.icon)){return document.createElementNS("http://www.w3.org/2000/svg",'text');}return document.createElementNS("http://www.w3.org/2000/svg",'image');}).classed("sapGanttExpandChartIcon",true).classed("iconFont",function(d){return I.isIconURI(d.icon);}).classed("iconImage",function(d){return!(I.isIconURI(d.icon));});f.selectAll(".iconImage").attr("xlink:href",function(d){return d.icon;}).attr("x",function(d){return C.getConfiguration().getRTL()?t-T-g(d)-17:g(d)+T;}).attr("y",function(d){return d.y+4.25;}).attr("width",16).attr("height",16);f.selectAll(".iconFont").attr("x",function(d){return C.getConfiguration().getRTL()?t-T-g(d):g(d)+T;}).attr("y",function(d){return d.y+19;}).text(function(d){var o=I.getIconInfo(d.icon);if(o){return o.content;}}).attr("font-family",function(d){var o=I.getIconInfo(d.icon);if(o){return o.fontFamily;}}).attr("font-size","16px");h.exit().remove();var j=f.selectAll("sapGanttExpandChartText").data(function(d){return d;});j.enter().append("text").classed("sapGanttExpandChartText",true);j.attr("x",function(d){return C.getConfiguration().getRTL()?t-T-g(d)-26:g(d)+T+27;}).attr("y",function(d){return d.y+16.5;}).attr("font-size",function(d){return"0.75em";}).text(function(d){return d.name;}).attr("text-anchor",(a.browser.msie||a.browser.edge)&&C.getConfiguration().getRTL()?"end":"start");j.exit().remove();var k=this;var l=f.selectAll(".sapGanttExpandChartCloseButton").data(function(d){return d;});l.enter().append("text").classed("sapGanttExpandChartCloseButton",true);l.attr("x",function(d){var p,P=jQuery(this).prev("text");if(P&&P.length>0){var B=P[0].getBoundingClientRect();if(B&&B.width>0){p=B.width;}else{p=P[0].clientWidth;}}if(isNaN(p)||p==null||p==0){p=60;}var m=C.getConfiguration().getRTL()?t-T-g(d)-p-37:g(d)+T+p+35;return m;}).attr("y",function(d){return d.y+19;}).text(function(d){var o=I.getIconInfo("decline",undefined);if(o){return o.content;}}).attr("font-family",function(d){var o=I.getIconInfo("decline",undefined);if(o){return o.fontFamily;}}).attr("font-size","14px").attr("font-weight","bolder").on("click",function(d){var B=k._oGanttChartWithTable._oTT.getBinding("rows");var r=B.getContexts(0,B.getLength());for(var i=0;i<r.length;i++){var o=r[i].getProperty();if(o&&d.id&&o.id===d.id){k._oGanttChartWithTable.handleExpandChartChange(false,[d.chartScheme],[i]);}}});l.select("title").remove();l.insert("title",":first-child").text(function(d){return sap.ui.getCore().getLibraryResourceBundle("sap.gantt").getText("TLTP_CLOSE");});l.exit().remove();};S.prototype._getLevelIndentByShape=function(s){var f=13;var m=17;var i=25;var h=0;if(s&&s.bindingObj&&s.bindingObj._aRowIndexMap&&s.rowIndex&&s.rowIndex<s.bindingObj._aRowIndexMap.length){h=s.bindingObj._aRowIndexMap[s.rowIndex].level;}if(isNaN(h)||h==null){h=0;}return m*h+i+f;};return S;},true);
