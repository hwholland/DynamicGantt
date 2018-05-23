sap.ui.require.preload({
	"web/ui5/test-resources/sap/suite/ui/microchart/demokit/sample/HarveyBallMicroChartResponsive/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return sap.ui.core.UIComponent.extend(\"sap.suite.ui.microchart.sample.HarveyBallMicroChartResponsive.Component\",{metadata:{rootView:\"sap.suite.ui.microchart.sample.HarveyBallMicroChartResponsive.Page\",dependencies:{libs:[\"sap.m\",\"sap.suite.ui.microchart\"]},config:{sample:{files:[\"Page.view.xml\",\"Page.controller.js\"]}}}})});",
	"web/ui5/test-resources/sap/suite/ui/microchart/demokit/sample/HarveyBallMicroChartResponsive/Page.controller.js": "sap.ui.define([\"sap/m/MessageToast\",\"sap/ui/core/mvc/Controller\"],function(e,s){\"use strict\";return s.extend(\"sap.suite.ui.microchart.sample.HarveyBallMicroChartResponsive.Page\",{press:function(s){e.show(\"The HarveyBallMicroChart is pressed.\")}})});",
	"web/ui5/test-resources/sap/suite/ui/microchart/demokit/sample/HarveyBallMicroChartResponsive/Page.view.xml": "<mvc:View\r\n\tcontrollerName=\"sap.suite.ui.microchart.sample.HarveyBallMicroChart.HarveyBallMicroChart\"\r\n\txmlns=\"sap.suite.ui.microchart\"\r\n\txmlns:mvc=\"sap.ui.core.mvc\"\r\n\txmlns:m=\"sap.m\"><m:Label text=\"3.125rem x 3.125rem\" width=\"12.5rem\" class=\"sapUiSmallMargin\"/><m:FlexBox width=\"3.125rem\" height=\"3.125rem\" alignItems=\"Center\"><m:items><HarveyBallMicroChart isResponsive=\"true\" total=\"100\" totalScale=\"Mrd\" showTotal=\"false\" showFractions=\"false\" press=\"press\"><items><HarveyBallMicroChartItem fraction=\"85\" color=\"Critical\" fractionScale=\"Mrd\" /></items></HarveyBallMicroChart></m:items></m:FlexBox><m:Label text=\"6.25rem x 6.25rem\" width=\"12.5rem\" class=\"sapUiSmallMargin\"/><m:FlexBox width=\"6.25rem\" height=\"6.25rem\"><m:items><HarveyBallMicroChart isResponsive=\"true\" total=\"100\" totalScale=\"Mrd\" showTotal=\"true\" showFractions=\"true\" press=\"press\"><items><HarveyBallMicroChartItem fraction=\"15\" color=\"Error\" fractionScale=\"Mrd\" /></items></HarveyBallMicroChart></m:items></m:FlexBox><m:Label text=\"9.375rem x 9.375rem\" width=\"12.5rem\" class=\"sapUiSmallMargin\"/><m:FlexBox width=\"9.375rem\" height=\"9.375rem\"><m:items><HarveyBallMicroChart isResponsive=\"true\" total=\"100\" totalScale=\"Mrd\" colorPalette=\"#5cbae6\" press=\"press\"><items><HarveyBallMicroChartItem fraction=\"20\" fractionScale=\"Mrd\" /></items></HarveyBallMicroChart></m:items></m:FlexBox><m:Label text=\"12.5rem x 12.5rem\" width=\"12.5rem\" class=\"sapUiSmallMargin\"/><m:FlexBox width=\"12.5rem\" height=\"12.5rem\"><m:items><HarveyBallMicroChart isResponsive=\"true\" total=\"100\" totalScale=\"Mrd\" showTotal=\"true\" showFractions=\"true\" press=\"press\"><items><HarveyBallMicroChartItem fraction=\"63.5\" color=\"Good\" fractionScale=\"Mrd\" /></items></HarveyBallMicroChart></m:items></m:FlexBox></mvc:View>"
}, "web/ui5/test-resources/sap/suite/ui/microchart/demokit/sample/HarveyBallMicroChartResponsive/Component-preload");