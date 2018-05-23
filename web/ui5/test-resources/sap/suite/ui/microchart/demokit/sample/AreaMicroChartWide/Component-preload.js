sap.ui.require.preload({
	"web/ui5/test-resources/sap/suite/ui/microchart/demokit/sample/AreaMicroChartWide/AreaMicroChartWide.controller.js": "sap.ui.define([\"sap/m/MessageToast\",\"sap/ui/core/mvc/Controller\"],function(e,r){\"use strict\";return r.extend(\"sap.suite.ui.microchart.sample.AreaMicroChartWide.AreaMicroChartWide\",{press:function(r){e.show(\"The area micro chart is pressed.\")}})});",
	"web/ui5/test-resources/sap/suite/ui/microchart/demokit/sample/AreaMicroChartWide/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return sap.ui.core.UIComponent.extend(\"sap.suite.ui.microchart.sample.AreaMicroChartWide.Component\",{metadata:{rootView:\"sap.suite.ui.microchart.sample.AreaMicroChartWide.AreaMicroChartWide\",dependencies:{libs:[\"sap.m\",\"sap.suite.ui.microchart\"]},config:{sample:{files:[\"AreaMicroChartWide.view.xml\",\"AreaMicroChartWide.controller.js\"]}}}})});",
	"web/ui5/test-resources/sap/suite/ui/microchart/demokit/sample/AreaMicroChartWide/AreaMicroChartWide.view.xml": "<mvc:View\r\n\tcontrollerName=\"sap.suite.ui.microchart.sample.AreaMicroChartWide.AreaMicroChartWide\"\r\n\txmlns=\"sap.suite.ui.microchart\"\r\n\txmlns:mvc=\"sap.ui.core.mvc\"><AreaMicroChart width=\"376px\" height=\"74px\" minXValue=\"0\" maxXValue=\"100\" minYValue=\"0\" maxYValue=\"100\"\r\n\t\tclass=\"sapUiSmallMargin\" press=\"press\" view=\"Wide\"><firstXLabel><AreaMicroChartLabel label=\"June 1\" color=\"Good\"/></firstXLabel><lastXLabel><AreaMicroChartLabel label=\"June 30\" color=\"Critical\"/></lastXLabel><firstYLabel><AreaMicroChartLabel label=\"0M\" color=\"Good\"/></firstYLabel><lastYLabel><AreaMicroChartLabel label=\"80M\" color=\"Critical\"/></lastYLabel><chart><AreaMicroChartItem><points><AreaMicroChartPoint x=\"0\" y=\"0\" /><AreaMicroChartPoint x=\"30\" y=\"20\" /><AreaMicroChartPoint x=\"60\" y=\"20\" /><AreaMicroChartPoint x=\"100\" y=\"80\" /></points></AreaMicroChartItem></chart><target><AreaMicroChartItem><points><AreaMicroChartPoint x=\"0\" y=\"0\" /><AreaMicroChartPoint x=\"30\" y=\"30\" /><AreaMicroChartPoint x=\"60\" y=\"40\" /><AreaMicroChartPoint x=\"100\" y=\"90\" /></points></AreaMicroChartItem></target><maxThreshold><AreaMicroChartItem color=\"Good\"><points><AreaMicroChartPoint x=\"0\" y=\"0\" /><AreaMicroChartPoint x=\"30\" y=\"40\" /><AreaMicroChartPoint x=\"60\" y=\"50\" /><AreaMicroChartPoint x=\"100\" y=\"100\" /></points></AreaMicroChartItem></maxThreshold><minThreshold><AreaMicroChartItem color=\"Error\"><points><AreaMicroChartPoint x=\"0\" y=\"0\" /><AreaMicroChartPoint x=\"30\" y=\"20\" /><AreaMicroChartPoint x=\"60\" y=\"30\" /><AreaMicroChartPoint x=\"100\" y=\"70\" /></points></AreaMicroChartItem></minThreshold></AreaMicroChart><AreaMicroChart width=\"376px\" height=\"74px\" minXValue=\"0\" maxXValue=\"100\" minYValue=\"0\" \r\n\t\tmaxYValue=\"100\" class=\"sapUiSmallMargin\" press=\"press\" view=\"Wide\"><firstXLabel><AreaMicroChartLabel label=\"June 1\" color=\"Good\"/></firstXLabel><lastXLabel><AreaMicroChartLabel label=\"June 30\" color=\"Good\"/></lastXLabel><firstYLabel><AreaMicroChartLabel label=\"30M\" color=\"Good\"/></firstYLabel><lastYLabel><AreaMicroChartLabel label=\"70M\" color=\"Good\"/></lastYLabel><minLabel><AreaMicroChartLabel label=\"25M\" color=\"Critical\"/></minLabel><maxLabel><AreaMicroChartLabel label=\"70M\" color=\"Good\"/></maxLabel><chart><AreaMicroChartItem><points><AreaMicroChartPoint x=\"0\" y=\"30\" /><AreaMicroChartPoint x=\"20\" y=\"45\" /><AreaMicroChartPoint x=\"40\" y=\"40\" /><AreaMicroChartPoint x=\"60\" y=\"25\" /><AreaMicroChartPoint x=\"80\" y=\"65\" /><AreaMicroChartPoint x=\"100\" y=\"70\" /></points></AreaMicroChartItem></chart><target><AreaMicroChartItem><points><AreaMicroChartPoint x=\"0\" y=\"40\" /><AreaMicroChartPoint x=\"100\" y=\"60\" /></points></AreaMicroChartItem></target><maxThreshold><AreaMicroChartItem color=\"Error\"><points><AreaMicroChartPoint x=\"0\" y=\"60\" /><AreaMicroChartPoint x=\"100\" y=\"100\" /></points></AreaMicroChartItem></maxThreshold><minThreshold><AreaMicroChartItem color=\"Error\"><points><AreaMicroChartPoint x=\"0\" y=\"20\" /><AreaMicroChartPoint x=\"100\" y=\"10\" /></points></AreaMicroChartItem></minThreshold><innerMaxThreshold><AreaMicroChartItem color=\"Good\"><points><AreaMicroChartPoint x=\"0\" y=\"50\" /><AreaMicroChartPoint x=\"100\" y=\"80\" /></points></AreaMicroChartItem></innerMaxThreshold><innerMinThreshold><AreaMicroChartItem color=\"Good\"><points><AreaMicroChartPoint x=\"0\" y=\"30\" /><AreaMicroChartPoint x=\"100\" y=\"30\" /></points></AreaMicroChartItem></innerMinThreshold></AreaMicroChart></mvc:View>"
}, "web/ui5/test-resources/sap/suite/ui/microchart/demokit/sample/AreaMicroChartWide/Component-preload");