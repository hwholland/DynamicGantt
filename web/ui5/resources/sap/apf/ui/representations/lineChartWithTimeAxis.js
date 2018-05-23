/*!
 * SAP APF Analysis Path Framework
 * 
 * (c) Copyright 2012-2014 SAP SE. All rights reserved
 */
jQuery.sap.declare("sap.apf.ui.representations.lineChartWithTimeAxis");jQuery.sap.require("sap.apf.ui.representations.BaseVizFrameChartRepresentation");
sap.apf.ui.representations.lineChartWithTimeAxis=function(a,p){sap.apf.ui.representations.BaseVizFrameChartRepresentation.apply(this,[a,p]);this.type=sap.apf.ui.utils.CONSTANTS.representationTypes.LINE_CHART_WITH_TIME_AXIS;this.chartType=sap.apf.ui.utils.CONSTANTS.vizFrameChartTypes.LINE_CHART_WITH_TIME_AXIS;this.setDateType();this._addDefaultKind();};
sap.apf.ui.representations.lineChartWithTimeAxis.prototype=Object.create(sap.apf.ui.representations.BaseVizFrameChartRepresentation.prototype);sap.apf.ui.representations.lineChartWithTimeAxis.prototype.constructor=sap.apf.ui.representations.lineChartWithTimeAxis;
sap.apf.ui.representations.lineChartWithTimeAxis.prototype.setDateType=function(){this.parameter.dimensions[0].dataType="date";};
sap.apf.ui.representations.lineChartWithTimeAxis.prototype._addDefaultKind=function(){this.parameter.measures.forEach(function(m){if(m.kind===undefined){m.kind=sap.apf.core.constants.representationMetadata.kind.YAXIS;}});this.parameter.dimensions.forEach(function(d,i){if(d.kind===undefined){d.kind=i===0?sap.apf.core.constants.representationMetadata.kind.XAXIS:sap.apf.core.constants.representationMetadata.kind.LEGEND;}});};
sap.apf.ui.representations.lineChartWithTimeAxis.prototype.setVizPropsForSpecificRepresentation=function(){this.chart.setVizProperties({timeAxis:{visible:true,title:{visible:true},label:{visible:true}},plotArea:{window:{start:"firstDataPoint",end:"lastDataPoint"}}});};
sap.apf.ui.representations.lineChartWithTimeAxis.prototype.setVizPropsOfThumbnailForSpecificRepresentation=function(){this.thumbnailChart.setVizProperties({timeAxis:{visible:false,title:{visible:false}},plotArea:{window:{start:"firstDataPoint",end:"lastDataPoint"}}});};
sap.apf.ui.representations.lineChartWithTimeAxis.prototype.getAxisFeedItemId=function(k){var s=sap.apf.core.constants.representationMetadata.kind;var a;switch(k){case s.XAXIS:a=sap.apf.core.constants.vizFrame.feedItemTypes.TIMEAXIS;break;case s.YAXIS:a=sap.apf.core.constants.vizFrame.feedItemTypes.VALUEAXIS;break;case s.LEGEND:a=sap.apf.core.constants.vizFrame.feedItemTypes.COLOR;break;default:break;}return a;};