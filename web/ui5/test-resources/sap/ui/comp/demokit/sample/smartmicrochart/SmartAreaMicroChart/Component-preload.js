sap.ui.require.preload({
	"web/ui5/test-resources/sap/ui/comp/demokit/sample/smartmicrochart/SmartAreaMicroChart/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.ui.comp.sample.smartmicrochart.SmartAreaMicroChart.Component\",{metadata:{rootView:\"sap.ui.comp.sample.smartmicrochart.SmartAreaMicroChart.Page\",dependencies:{libs:[\"sap.m\",\"sap.suite.ui.microchart\"]},config:{sample:{stretch:!0,files:[\"Page.view.xml\",\"Page.controller.js\",\"/mockserver/metadataTarget.xml\",\"/mockserver/metadataMaximize.xml\",\"/mockserver/metadataMinimize.xml\",\"/mockserver/metadataNeutral.xml\",\"/mockserver/Series.json\"]}}}})});",
	"web/ui5/test-resources/sap/ui/comp/demokit/sample/smartmicrochart/SmartAreaMicroChart/Page.controller.js": "sap.ui.define([\"sap/ui/model/odata/v2/ODataModel\",\"sap/ui/core/util/MockServer\"],function(r,t){\"use strict\";return sap.ui.controller(\"sap.ui.comp.sample.smartmicrochart.SmartAreaMicroChart.Page\",{onInit:function(){this._initMockServer();var t=new r(\"smartmicrochart.SmartAreaMicroChart/neutral\",!0),e=this.getView().byId(\"NeutralSmartChart\"),i=this.getView().byId(\"unitOfMeasure\");e.setUnitOfMeasure(i),e.setModel(t);var a=new r(\"smartmicrochart.SmartAreaMicroChart/target\",!0),o=this.getView().byId(\"TargetSmartChart\"),s=this.getView().byId(\"chartTitle\");o.setChartTitle(s),o.setModel(a);var c=new r(\"smartmicrochart.SmartAreaMicroChart/maximize\",!0),m=this.getView().byId(\"MaximizeSmartChart\"),h=this.getView().byId(\"chartDescription\");m.setChartDescription(h),m.setModel(c);var M=new r(\"smartmicrochart.SmartAreaMicroChart/minimize\",!0);this.getView().byId(\"MinimizeSmartChart\").setModel(M)},onExit:function(){this._oMockServerNeutralCriticality.stop(),this._oMockServerTargetCriticality.stop(),this._oMockServerMaximizeCriticality.stop(),this._oMockServerMinimizeCriticality.stop()},_initMockServer:function(){this._oMockServerNeutralCriticality=new t({rootUri:\"smartmicrochart.SmartAreaMicroChart/neutral/\"}),this._oMockServerTargetCriticality=new t({rootUri:\"smartmicrochart.SmartAreaMicroChart/target/\"}),this._oMockServerMaximizeCriticality=new t({rootUri:\"smartmicrochart.SmartAreaMicroChart/maximize/\"}),this._oMockServerMinimizeCriticality=new t({rootUri:\"smartmicrochart.SmartAreaMicroChart/minimize/\"}),this._oMockServerNeutralCriticality.simulate(\"test-resources/sap/ui/comp/demokit/sample/smartmicrochart/SmartAreaMicroChart/mockserver/metadataNeutral.xml\",{sMockdataBaseUrl:\"test-resources/sap/ui/comp/demokit/sample/smartmicrochart/SmartAreaMicroChart/mockserver\"}),this._oMockServerTargetCriticality.simulate(\"test-resources/sap/ui/comp/demokit/sample/smartmicrochart/SmartAreaMicroChart/mockserver/metadataTarget.xml\",{sMockdataBaseUrl:\"test-resources/sap/ui/comp/demokit/sample/smartmicrochart/SmartAreaMicroChart/mockserver\"}),this._oMockServerMaximizeCriticality.simulate(\"test-resources/sap/ui/comp/demokit/sample/smartmicrochart/SmartAreaMicroChart/mockserver/metadataMaximize.xml\",{sMockdataBaseUrl:\"test-resources/sap/ui/comp/demokit/sample/smartmicrochart/SmartAreaMicroChart/mockserver\"}),this._oMockServerMinimizeCriticality.simulate(\"test-resources/sap/ui/comp/demokit/sample/smartmicrochart/SmartAreaMicroChart/mockserver/metadataMinimize.xml\",{sMockdataBaseUrl:\"test-resources/sap/ui/comp/demokit/sample/smartmicrochart/SmartAreaMicroChart/mockserver\"}),this._oMockServerNeutralCriticality.start(),this._oMockServerTargetCriticality.start(),this._oMockServerMaximizeCriticality.start(),this._oMockServerMinimizeCriticality.start()}})});",
	"web/ui5/test-resources/sap/ui/comp/demokit/sample/smartmicrochart/SmartAreaMicroChart/Page.view.xml": "<core:View xmlns:core=\"sap.ui.core\" xmlns=\"sap.ui.comp.smartmicrochart\"\n\txmlns:m=\"sap.m\" controllerName=\"sap.ui.comp.sample.smartmicrochart.SmartAreaMicroChart.Page\"><m:Page id=\"page\" title=\"SmartAreaMicroChart\" enableScrolling=\"false\"><m:Panel headerText='Criticality Calculation'><m:HBox><m:VBox class=\"sapUiContentPadding\"><m:Label text=\"Neutral - No Criticality Calculation\" /><SmartAreaMicroChart id=\"NeutralSmartChart\" entitySet=\"Series\" chartBindingPath=\"/Series\" enableAutoBinding=\"true\" /><m:Label text=\"Unit of Measure association\" design=\"Bold\" /><m:Label id=\"unitOfMeasure\" /></m:VBox><m:VBox class=\"sapUiContentPadding\"><m:Label text=\"Target Criticality\" /><SmartAreaMicroChart id=\"TargetSmartChart\" entitySet=\"Series\" enableAutoBinding=\"true\" /><m:Label text=\"Title association\" design=\"Bold\" /><m:Label id=\"chartTitle\" /></m:VBox><m:VBox class=\"sapUiContentPadding\"><m:Label text=\"Maximize Criticality\" /><SmartAreaMicroChart id=\"MaximizeSmartChart\" entitySet=\"Series\" enableAutoBinding=\"true\" /><m:Label text=\"Description association\" design=\"Bold\" /><m:Label id=\"chartDescription\" /></m:VBox><m:VBox class=\"sapUiContentPadding\"><m:Label text=\"Minimize Criticality\" /><SmartAreaMicroChart id=\"MinimizeSmartChart\" entitySet=\"Series\" enableAutoBinding=\"true\" /></m:VBox></m:HBox></m:Panel></m:Page></core:View>\n"
}, "web/ui5/test-resources/sap/ui/comp/demokit/sample/smartmicrochart/SmartAreaMicroChart/Component-preload");