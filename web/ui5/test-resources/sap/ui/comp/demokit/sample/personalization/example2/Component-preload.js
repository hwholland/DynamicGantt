sap.ui.require.preload({
	"web/ui5/test-resources/sap/ui/comp/demokit/sample/personalization/example2/Component.js": "jQuery.sap.declare(\"sap.ui.comp.sample.personalization.example2.Component\"),sap.ui.core.UIComponent.extend(\"sap.ui.comp.sample.personalization.example2.Component\",{metadata:{rootView:\"sap.ui.comp.sample.personalization.example2.Example\",dependencies:{libs:[\"sap.m\",\"sap.ui.comp\"]},config:{sample:{files:[\"Example.view.xml\",\"Example.controller.js\",\"../mockserver/metadata.xml\"]}}}});",
	"web/ui5/test-resources/sap/ui/comp/demokit/sample/personalization/example2/Example.controller.js": "sap.ui.controller(\"sap.ui.comp.sample.personalization.example2.Example\",{onInit:function(){jQuery.sap.require(\"sap.ui.fl.FakeLrepConnector\"),sap.ui.fl.FakeLrepConnector.enableFakeConnector(\"test-resources/sap/ui/comp/demokit/sample/personalization/mockserver/component-test-changes.json\"),jQuery.sap.require(\"sap.ui.core.util.MockServer\"),this.oMockServer=new sap.ui.core.util.MockServer({rootUri:\"demokit.personalization.example2/\"}),this.oMockServer.simulate(\"test-resources/sap/ui/comp/demokit/sample/personalization/mockserver/metadata.xml\",\"test-resources/sap/ui/comp/demokit/sample/personalization/mockserver/\"),this.oMockServer.start(),this.oModel=new sap.ui.model.odata.ODataModel(\"demokit.personalization.example2\",!0),this.getView().setModel(this.oModel)},onExit:function(){this.oMockServer.stop(),this.oModel.destroy()}});",
	"web/ui5/test-resources/sap/ui/comp/demokit/sample/personalization/example2/Example.view.xml": "<core:View xmlns:core=\"sap.ui.core\" xmlns=\"sap.ui.comp.smarttable\"\r\n\txmlns:html=\"http://www.w3.org/1999/xhtml\" controllerName=\"sap.ui.comp.sample.personalization.example2.Example\"><SmartTable tableType=\"Table\" editable=\"false\"\r\n\t\tenableAutoBinding=\"true\" entitySet=\"ProductCollection\"\r\n\t\tuseVariantManagement=\"true\" persistencyKey=\"PKeyTableExample2\"\r\n\t\tuseTablePersonalisation=\"true\" header=\"ProductCollection\"\r\n\t\tshowRowCount=\"true\" useExportToExcel=\"false\" /></core:View>\r\n"
}, "web/ui5/test-resources/sap/ui/comp/demokit/sample/personalization/example2/Component-preload");