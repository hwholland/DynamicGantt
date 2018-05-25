/*!
 * SAP APF Analysis Path Framework
 * 
 * (c) Copyright 2012-2014 SAP AG. All rights reserved
 */
sap.ui.define(["sap/apf/core/constants"],function(c){'use strict';var r=function(){return[{"type":"representationType","id":"ColumnChart","constructor":"sap.apf.ui.representations.columnChart","picture":"sap-icon://bar-chart","label":{"type":"label","kind":"text","key":"ColumnChart"},"metadata":{"dimensions":{"supportedKinds":[{"kind":c.representationMetadata.kind.XAXIS,"defaultCount":1,"max":"*","min":"0"},{"kind":c.representationMetadata.kind.LEGEND,"defaultCount":0,"max":"*","min":"0"}]},"measures":{"supportedKinds":[{"kind":c.representationMetadata.kind.YAXIS,"defaultCount":1,"max":"*","min":"1"}]}}},{"type":"representationType","id":"BarChart","constructor":"sap.apf.ui.representations.barChart","picture":"sap-icon://horizontal-bar-chart","label":{"type":"label","kind":"text","key":"BarChart"},"metadata":{"dimensions":{"supportedKinds":[{"kind":c.representationMetadata.kind.XAXIS,"defaultCount":1,"max":"*","min":"0"},{"kind":c.representationMetadata.kind.LEGEND,"defaultCount":0,"max":"*","min":"0"}]},"measures":{"supportedKinds":[{"kind":c.representationMetadata.kind.YAXIS,"defaultCount":1,"max":"*","min":"1"}]}}},{"type":"representationType","id":"LineChart","constructor":"sap.apf.ui.representations.lineChart","picture":"sap-icon://line-chart","label":{"type":"label","kind":"text","key":"LineChart"},"metadata":{"dimensions":{"supportedKinds":[{"kind":c.representationMetadata.kind.XAXIS,"defaultCount":1,"max":"*","min":"1"},{"kind":c.representationMetadata.kind.LEGEND,"defaultCount":0,"max":"*","min":"0"}]},"measures":{"supportedKinds":[{"kind":c.representationMetadata.kind.YAXIS,"defaultCount":1,"max":"*","min":"1"}]}}},{"type":"representationType","id":"LineChartWithTwoVerticalAxes","constructor":"sap.apf.ui.representations.lineChartWithTwoVerticalAxes","picture":"sap-icon://line-chart-dual-axis","label":{"type":"label","kind":"text","key":"LineChartWithTwoVerticalAxes"},"metadata":{"dimensions":{"supportedKinds":[{"kind":c.representationMetadata.kind.XAXIS,"defaultCount":1,"max":"*","min":"1"},{"kind":c.representationMetadata.kind.LEGEND,"defaultCount":0,"max":"*","min":"0"}]},"measures":{"supportedKinds":[{"kind":c.representationMetadata.kind.YAXIS,"defaultCount":1,"max":"*","min":"1"},{"kind":c.representationMetadata.kind.YAXIS2,"defaultCount":1,"max":"*","min":"1"}]}}},{"type":"representationType","id":"LineChartWithTimeAxis","constructor":"sap.apf.ui.representations.lineChartWithTimeAxis","picture":"sap-icon://line-chart-time-axis","label":{"type":"label","kind":"text","key":"LineChartWithTimeAxis"},"metadata":{"dimensions":{"supportedKinds":[{"kind":c.representationMetadata.kind.XAXIS,"defaultCount":1,"max":"1","min":"1"},{"kind":c.representationMetadata.kind.LEGEND,"defaultCount":0,"max":"*","min":"0"}]},"measures":{"supportedKinds":[{"kind":c.representationMetadata.kind.YAXIS,"defaultCount":1,"max":"*","min":"1"}]}}},{"type":"representationType","id":"PieChart","constructor":"sap.apf.ui.representations.pieChart","picture":"sap-icon://pie-chart","label":{"type":"label","kind":"text","key":"PieChart"},"metadata":{"dimensions":{"supportedKinds":[{"kind":c.representationMetadata.kind.SECTORCOLOR,"defaultCount":1,"max":"*","min":"0"}]},"measures":{"supportedKinds":[{"kind":c.representationMetadata.kind.SECTORSIZE,"defaultCount":1,"max":"1","min":"1"}]}}},{"type":"representationType","id":"DonutChart","constructor":"sap.apf.ui.representations.donutChart","picture":"sap-icon://donut-chart","label":{"type":"label","kind":"text","key":"DonutChart"},"metadata":{"dimensions":{"supportedKinds":[{"kind":c.representationMetadata.kind.SECTORCOLOR,"defaultCount":1,"max":"*","min":"0"}]},"measures":{"supportedKinds":[{"kind":c.representationMetadata.kind.SECTORSIZE,"defaultCount":1,"max":"*","min":"1"}]}}},{"type":"representationType","id":"ScatterPlotChart","constructor":"sap.apf.ui.representations.scatterPlotChart","picture":"sap-icon://scatter-chart","label":{"type":"label","kind":"text","key":"ScatterPlotChart"},"metadata":{"dimensions":{"supportedKinds":[{"kind":c.representationMetadata.kind.REGIONCOLOR,"defaultCount":0,"max":"*","min":"0"},{"kind":c.representationMetadata.kind.REGIONSHAPE,"defaultCount":0,"max":"*","min":"0"}]},"measures":{"supportedKinds":[{"kind":c.representationMetadata.kind.XAXIS,"defaultCount":1,"max":"1","min":"1"},{"kind":c.representationMetadata.kind.YAXIS,"defaultCount":1,"max":"1","min":"1"}]},"sortable":false}},{"type":"representationType","id":"BubbleChart","constructor":"sap.apf.ui.representations.bubbleChart","picture":"sap-icon://bubble-chart","label":{"type":"label","kind":"text","key":"BubbleChart"},"metadata":{"dimensions":{"supportedKinds":[{"kind":c.representationMetadata.kind.REGIONCOLOR,"defaultCount":0,"max":"*","min":"0"},{"kind":c.representationMetadata.kind.REGIONSHAPE,"defaultCount":0,"max":"*","min":"0"}]},"measures":{"supportedKinds":[{"kind":c.representationMetadata.kind.XAXIS,"defaultCount":1,"max":"1","min":"1"},{"kind":c.representationMetadata.kind.YAXIS,"defaultCount":1,"max":"1","min":"1"},{"kind":c.representationMetadata.kind.BUBBLEWIDTH,"defaultCount":1,"max":"1","min":"1"}]},"sortable":false}},{"type":"representationType","id":"StackedColumnChart","constructor":"sap.apf.ui.representations.stackedColumnChart","picture":"sap-icon://vertical-stacked-chart","label":{"type":"label","kind":"text","key":"StackedColumnChart"},"metadata":{"dimensions":{"supportedKinds":[{"kind":c.representationMetadata.kind.XAXIS,"defaultCount":0,"max":"*","min":"0"},{"kind":c.representationMetadata.kind.LEGEND,"defaultCount":1,"max":"*","min":"0"}]},"measures":{"supportedKinds":[{"kind":c.representationMetadata.kind.YAXIS,"defaultCount":1,"max":"*","min":"1"}]}}},{"type":"representationType","id":"StackedBarChart","constructor":"sap.apf.ui.representations.stackedBarChart","picture":"sap-icon://horizontal-stacked-chart","label":{"type":"label","kind":"text","key":"StackedBarChart"},"metadata":{"dimensions":{"supportedKinds":[{"kind":c.representationMetadata.kind.XAXIS,"defaultCount":0,"max":"*","min":"0"},{"kind":c.representationMetadata.kind.LEGEND,"defaultCount":1,"max":"*","min":"0"}]},"measures":{"supportedKinds":[{"kind":c.representationMetadata.kind.YAXIS,"defaultCount":1,"max":"*","min":"1"}]}}},{"type":"representationType","id":"PercentageStackedColumnChart","constructor":"sap.apf.ui.representations.percentageStackedColumnChart","picture":"sap-icon://full-stacked-column-chart","label":{"type":"label","kind":"text","key":"PercentageStackedColumnChart"},"metadata":{"dimensions":{"supportedKinds":[{"kind":c.representationMetadata.kind.XAXIS,"defaultCount":0,"max":"*","min":"0"},{"kind":c.representationMetadata.kind.LEGEND,"defaultCount":1,"max":"*","min":"0"}]},"measures":{"supportedKinds":[{"kind":c.representationMetadata.kind.YAXIS,"defaultCount":1,"max":"*","min":"1"}]}}},{"type":"representationType","id":"PercentageStackedBarChart","constructor":"sap.apf.ui.representations.percentageStackedBarChart","picture":"sap-icon://full-stacked-chart","label":{"type":"label","kind":"text","key":"PercentageStackedBarChart"},"metadata":{"dimensions":{"supportedKinds":[{"kind":c.representationMetadata.kind.XAXIS,"defaultCount":0,"max":"*","min":"0"},{"kind":c.representationMetadata.kind.LEGEND,"defaultCount":1,"max":"*","min":"0"}]},"measures":{"supportedKinds":[{"kind":c.representationMetadata.kind.YAXIS,"defaultCount":1,"max":"*","min":"1"}]}}},{"type":"representationType","id":"HeatmapChart","constructor":"sap.apf.ui.representations.heatmapChart","picture":"sap-icon://heatmap-chart","label":{"type":"label","kind":"text","key":"HeatmapChart"},"metadata":{"dimensions":{"supportedKinds":[{"kind":c.representationMetadata.kind.XAXIS,"defaultCount":1,"max":"*","min":"1"},{"kind":c.representationMetadata.kind.XAXIS2,"defaultCount":1,"max":"*","min":"0"}]},"measures":{"supportedKinds":[{"kind":c.representationMetadata.kind.SECTORCOLOR,"defaultCount":1,"max":"1","min":"1"}]}}},{"type":"representationType","id":"TableRepresentation","constructor":"sap.apf.ui.representations.table","picture":"sap-icon://table-chart","label":{"type":"label","kind":"text","key":"tableView"},"metadata":{"properties":{"supportedKinds":[{"kind":c.representationMetadata.kind.COLUMN,"defaultCount":1,"max":"*","min":"1"}]}}},{"type":"representationType","id":"TreeTableRepresentation","constructor":"sap.apf.ui.representations.treeTable","picture":"sap-icon://tree","label":{"type":"label","kind":"text","key":"treeTable"},"metadata":{"hierarchicalColumn":{"supportedKinds":[{"kind":c.representationMetadata.kind.HIERARCHIALCOLUMN,"defaultCount":1,"max":"1","min":"0"}]},"properties":{"supportedKinds":[{"kind":c.representationMetadata.kind.COLUMN,"defaultCount":0,"max":"*","min":"0"}]}}},{"type":"representationType","id":"ColumnChartSorted","constructor":"sap.apf.ui.representations.columnChart","picture":"sap-icon://vertical-bar-chart","label":{"type":"label","kind":"text","key":"ColumnChartSorted"}},{"type":"representationType","id":"ColumnChartClustered","constructor":"sap.apf.ui.representations.columnChart","picture":"sap-icon://bar-chart","label":{"type":"label","kind":"text","key":"ColumnChartClustered"}},{"type":"representationType","id":"ColumnChartClusteredSorted","constructor":"sap.apf.ui.representations.columnChart","picture":"sap-icon://vertical-bar-chart-2","label":{"type":"label","kind":"text","key":"ColumnChartClusteredSorted"}},{"type":"representationType","id":"StackedColumnSorted","constructor":"sap.apf.ui.representations.stackedColumnChart","picture":"sap-icon://upstacked-chart","label":{"type":"label","kind":"text","key":"StackedColumnSorted"}}];};return r;},true);
