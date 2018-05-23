jQuery.sap.declare("sap.suite.ui.commons.sample.ChartContainerDimensionsMultiCharts.Component");

sap.ui.core.UIComponent.extend("sap.suite.ui.commons.sample.ChartContainerDimensionsMultiCharts.Component", {

	metadata : {
		rootView : "sap.suite.ui.commons.sample.ChartContainerDimensionsMultiCharts.ChartContainer",
		dependencies : {
			libs : [
				"sap.m",
				"sap.ui.core",
				"sap.suite.ui.commons"
			]
		},
		config : {
			sample : {
				files : [
					"ChartContainer.view.xml",
				 	"ChartContainer.controller.js",
				 	"ChartContainerData1.json",
				 	"ChartContainerData2.json",
				 	"ChartContainerData3.json"
				]
			}
		}
	}
});