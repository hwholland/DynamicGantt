/*!
 * SAP APF Analysis Path Framework
 * 
 * (c) Copyright 2012-2014 SAP SE. All rights reserved
 */
jQuery.sap.declare("sap.apf.ui.representations.lineChartWithTwoVerticalAxes");jQuery.sap.require("sap.apf.ui.representations.BaseVizFrameChartRepresentation");(function(){"use strict";sap.apf.ui.representations.lineChartWithTwoVerticalAxes=function(a,p){sap.apf.ui.representations.BaseVizFrameChartRepresentation.apply(this,[a,p]);this.type=sap.apf.ui.utils.CONSTANTS.representationTypes.LINE_CHART_WITH_TWO_VERTICAL_AXES;this.chartType=sap.apf.ui.utils.CONSTANTS.vizFrameChartTypes.LINE_CHART_WITH_TWO_VERTICAL_AXES;this._addDefaultKind();};sap.apf.ui.representations.lineChartWithTwoVerticalAxes.prototype=Object.create(sap.apf.ui.representations.BaseVizFrameChartRepresentation.prototype);sap.apf.ui.representations.lineChartWithTwoVerticalAxes.prototype.constructor=sap.apf.ui.representations.lineChartWithTwoVerticalAxes;sap.apf.ui.representations.lineChartWithTwoVerticalAxes.prototype._addDefaultKind=function(){this.parameter.measures.forEach(function(m,i){if(m.kind===undefined){m.kind=i===0?sap.apf.core.constants.representationMetadata.kind.YAXIS:sap.apf.core.constants.representationMetadata.kind.YAXIS2;}});this.parameter.dimensions.forEach(function(d,i){if(d.kind===undefined){d.kind=i===0?sap.apf.core.constants.representationMetadata.kind.XAXIS:sap.apf.core.constants.representationMetadata.kind.LEGEND;}});};sap.apf.ui.representations.lineChartWithTwoVerticalAxes.prototype.setVizPropsForSpecificRepresentation=function(){var s=this;this.chart.attachEventOnce('renderComplete',function(){var p,S;if(!p){p=s.chart.getVizProperties().plotArea.primaryScale.autoMaxValue;}if(!S){S=s.chart.getVizProperties().plotArea.secondaryScale.autoMaxValue;}s.chart.setVizProperties({plotArea:{primaryValuesColorPalette:["#FF6030","#2FFFFF"],secondaryValuesColorPalette:["#B777FF","#00F000"],primaryScale:{fixedRange:true,maxValue:p},secondaryScale:{fixedRange:true,maxValue:S}}});_(s,p,S);});s.chart.setVizProperties({valueAxis:{title:{style:{color:"#000000"}}},valueAxis2:{visible:true,title:{visible:true,style:{color:"#000000"}},label:{visible:true}},plotArea:{primaryValuesColorPalette:["#FF6030","#2FFFFF"],secondaryValuesColorPalette:["#B777FF","#00F000"]}});};function _(s,p,S){s.thumbnailChart.setVizProperties({plotArea:{primaryValuesColorPalette:["#FF6030","#2FFFFF"],secondaryValuesColorPalette:["#B777FF","#00F000"],primaryScale:{fixedRange:true,maxValue:p},secondaryScale:{fixedRange:true,maxValue:S}}});}sap.apf.ui.representations.lineChartWithTwoVerticalAxes.prototype.setVizPropsOfThumbnailForSpecificRepresentation=function(){this.thumbnailChart.setVizProperties({valueAxis2:{visible:false,title:{visible:false}},plotArea:{primaryValuesColorPalette:["#FF6030","#2FFFFF"],secondaryValuesColorPalette:["#B777FF","#00F000"]}});};sap.apf.ui.representations.lineChartWithTwoVerticalAxes.prototype.getAxisFeedItemId=function(k){var s=sap.apf.core.constants.representationMetadata.kind;var a;switch(k){case s.XAXIS:a=sap.apf.core.constants.vizFrame.feedItemTypes.CATEGORYAXIS;break;case s.YAXIS:a=sap.apf.core.constants.vizFrame.feedItemTypes.VALUEAXIS;break;case s.YAXIS2:a=sap.apf.core.constants.vizFrame.feedItemTypes.VALUEAXIS2;break;case s.LEGEND:a=sap.apf.core.constants.vizFrame.feedItemTypes.COLOR;break;default:break;}return a;};}());
