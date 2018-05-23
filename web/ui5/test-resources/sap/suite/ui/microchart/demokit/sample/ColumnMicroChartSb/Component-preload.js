sap.ui.require.preload({
	"web/ui5/test-resources/sap/suite/ui/microchart/demokit/sample/ColumnMicroChartSb/ColumnMicroChartSb.controller.js": "sap.ui.define([\"sap/m/MessageToast\",\"sap/ui/core/mvc/Controller\"],function(s,e){\"use strict\";return e.extend(\"sap.suite.ui.microchart.sample.ColumnMicroChartSb.ColumnMicroChartSb\",{press:function(e){s.show(\"The column micro chart is pressed.\")}})});",
	"web/ui5/test-resources/sap/suite/ui/microchart/demokit/sample/ColumnMicroChartSb/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(o){\"use strict\";return sap.ui.core.UIComponent.extend(\"sap.suite.ui.microchart.sample.ColumnMicroChartSb.Component\",{metadata:{rootView:\"sap.suite.ui.microchart.sample.ColumnMicroChartSb.ColumnMicroChartSb\",dependencies:{libs:[\"sap.m\",\"sap.suite.ui.microchart\"]},config:{sample:{files:[\"ColumnMicroChartSb.view.xml\",\"ColumnMicroChartSb.controller.js\"]}}}})});",
	"web/ui5/test-resources/sap/suite/ui/microchart/demokit/sample/ColumnMicroChartSb/ColumnMicroChartSb.view.xml": "<mvc:View\r\n\tcontrollerName=\"sap.suite.ui.microchart.sample.ColumnMicroChartSb.ColumnMicroChartSb\"\r\n\txmlns=\"sap.suite.ui.microchart\"\r\n\txmlns:mvc=\"sap.ui.core.mvc\"><ColumnMicroChart size=\"M\" press=\"press\" class=\"sapUiSmallMargin\"><columns><ColumnMicroChartData value=\"100\" color=\"Error\" press=\"pressBar\" /><ColumnMicroChartData value=\"60\" color=\"Neutral\" press=\"pressBar\" /></columns></ColumnMicroChart><ColumnMicroChart size=\"M\" press=\"press\" class=\"sapUiSmallMargin\"><columns><ColumnMicroChartData value=\"60\" color=\"Error\" press=\"pressBar\"/><ColumnMicroChartData value=\"80\" color=\"Error\" press=\"pressBar\"/><ColumnMicroChartData value=\"100\" color=\"Error\" press=\"pressBar\"/><ColumnMicroChartData value=\"60\" color=\"Neutral\" press=\"pressBar\"/><ColumnMicroChartData value=\"55\" color=\"Neutral\" press=\"pressBar\"/><ColumnMicroChartData value=\"15\" color=\"Neutral\" press=\"pressBar\"/></columns></ColumnMicroChart><ColumnMicroChart size=\"S\" press=\"press\" class=\"sapUiSmallMargin\"><columns><ColumnMicroChartData value=\"60\" color=\"Good\" press=\"pressBar\"/><ColumnMicroChartData value=\"100\" color=\"Good\" press=\"pressBar\"/><ColumnMicroChartData value=\"-20\" color=\"Error\" press=\"pressBar\"/><ColumnMicroChartData value=\"60\" color=\"Good\" press=\"pressBar\"/><ColumnMicroChartData value=\"55\" color=\"Neutral\" press=\"pressBar\"/><ColumnMicroChartData value=\"15\" color=\"Critical\" press=\"pressBar\"/></columns></ColumnMicroChart></mvc:View>"
}, "web/ui5/test-resources/sap/suite/ui/microchart/demokit/sample/ColumnMicroChartSb/Component-preload");