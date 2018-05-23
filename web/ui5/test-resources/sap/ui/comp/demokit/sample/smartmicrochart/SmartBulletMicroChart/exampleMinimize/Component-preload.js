sap.ui.require.preload({
	"web/ui5/test-resources/sap/ui/comp/demokit/sample/smartmicrochart/SmartBulletMicroChart/exampleMinimize/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.ui.comp.sample.smartmicrochart.SmartBulletMicroChart.exampleMinimize.Component\",{metadata:{rootView:\"sap.ui.comp.sample.smartmicrochart.SmartBulletMicroChart.exampleMinimize.Page\",dependencies:{libs:[\"sap.m\",\"sap.suite.ui.microchart\"]},config:{sample:{stretch:!0,files:[\"Page.view.xml\",\"Page.controller.js\",\"/mockserver/Products.json\",\"/mockserver/metadata.xml\"]}}}})});",
	"web/ui5/test-resources/sap/ui/comp/demokit/sample/smartmicrochart/SmartBulletMicroChart/exampleMinimize/Page.controller.js": "sap.ui.define([\"sap/ui/model/odata/v2/ODataModel\",\"sap/ui/core/util/MockServer\"],function(e,r){\"use strict\";return sap.ui.controller(\"sap.ui.comp.sample.smartmicrochart.SmartBulletMicroChart.exampleMinimize.Page\",{onInit:function(){this._initMockServer();var r=new e(\"smartmicrochart.SmartBulletMicroChart/minimize\",!0),t=this.getView().byId(\"minimizeSmartChart\");t.bindElement(\"/Products('PC')\");var i=this.getView().byId(\"minimizeSmartChartWarning\");i.bindElement(\"/Products('Mouse')\");var a=this.getView().byId(\"minimizeSmartChartError\");a.bindElement(\"/Products('Chair')\"),t.setModel(r),i.setModel(r),a.setModel(r)},onExit:function(){this._oMockServer.stop(),this._oMockServer.destroy()},_initMockServer:function(){this._oMockServer=new r({rootUri:\"smartmicrochart.SmartBulletMicroChart/minimize/\"}),this._oMockServer.simulate(\"test-resources/sap/ui/comp/demokit/sample/smartmicrochart/SmartBulletMicroChart/exampleMinimize/mockserver/metadata.xml\",{sMockdataBaseUrl:\"test-resources/sap/ui/comp/demokit/sample/smartmicrochart/SmartBulletMicroChart/exampleMinimize/mockserver\"}),this._oMockServer.start()}})});",
	"web/ui5/test-resources/sap/ui/comp/demokit/sample/smartmicrochart/SmartBulletMicroChart/exampleMinimize/Page.view.xml": "<core:View xmlns:core=\"sap.ui.core\" xmlns=\"sap.ui.comp.smartmicrochart\" xmlns:l=\"sap.ui.layout\" xmlns:m=\"sap.m\" controllerName=\"sap.ui.comp.sample.smartmicrochart.SmartBulletMicroChart.exampleMinimize.Page\"><m:Page id=\"page\" title=\"SmartBulletMicroChart criticality calculation minimize direction\" enableScrolling=\"false\"><m:Panel><l:VerticalLayout><l:content><m:Label text=\"Positive\" /><SmartBulletMicroChart id=\"minimizeSmartChart\" entitySet=\"Products\" /><m:Label text=\"Critical\" /><SmartBulletMicroChart id=\"minimizeSmartChartWarning\" entitySet=\"Products\" /><m:Label text=\"Negative\" /><SmartBulletMicroChart id=\"minimizeSmartChartError\" entitySet=\"Products\" /></l:content></l:VerticalLayout></m:Panel></m:Page></core:View>"
}, "web/ui5/test-resources/sap/ui/comp/demokit/sample/smartmicrochart/SmartBulletMicroChart/exampleMinimize/Component-preload");