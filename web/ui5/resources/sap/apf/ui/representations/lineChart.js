/*!
 * SAP APF Analysis Path Framework
 * 
 * (c) Copyright 2012-2014 SAP SE. All rights reserved
 */
jQuery.sap.declare("sap.apf.ui.representations.lineChart");jQuery.sap.require("sap.apf.core.constants");jQuery.sap.require("sap.apf.ui.representations.BaseVizFrameChartRepresentation");
sap.apf.ui.representations.lineChart=function(a,p){sap.apf.ui.representations.BaseVizFrameChartRepresentation.apply(this,[a,p]);this.type=sap.apf.ui.utils.CONSTANTS.representationTypes.LINE_CHART;this.chartType=sap.apf.ui.utils.CONSTANTS.vizFrameChartTypes.LINE;this._addDefaultKind();};
sap.apf.ui.representations.lineChart.prototype=Object.create(sap.apf.ui.representations.BaseVizFrameChartRepresentation.prototype);sap.apf.ui.representations.lineChart.prototype.constructor=sap.apf.ui.representations.lineChart;
sap.apf.ui.representations.lineChart.prototype._addDefaultKind=function(){this.parameter.measures.forEach(function(m){if(m.kind===undefined){m.kind=sap.apf.core.constants.representationMetadata.kind.YAXIS;}});this.parameter.dimensions.forEach(function(d,i){if(d.kind===undefined){d.kind=i===0?sap.apf.core.constants.representationMetadata.kind.XAXIS:sap.apf.core.constants.representationMetadata.kind.LEGEND;}});};
sap.apf.ui.representations.lineChart.prototype.getAxisFeedItemId=function(k){var s=sap.apf.core.constants.representationMetadata.kind;var a;switch(k){case s.XAXIS:a=sap.apf.core.constants.vizFrame.feedItemTypes.CATEGORYAXIS;break;case s.YAXIS:a=sap.apf.core.constants.vizFrame.feedItemTypes.VALUEAXIS;break;case s.LEGEND:a=sap.apf.core.constants.vizFrame.feedItemTypes.COLOR;break;default:break;}return a;};