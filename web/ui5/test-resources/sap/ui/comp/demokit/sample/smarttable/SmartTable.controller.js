sap.ui.controller("sap.ui.comp.sample.smarttable.SmartTable", {
	onInit: function() {
		var oModel, oView;
		jQuery.sap.require("sap.ui.core.util.MockServer");
		var oMockServer = new sap.ui.core.util.MockServer({
			rootUri: "sapuicompsmarttable/"
		});
		this._oMockServer = oMockServer;
		oMockServer.simulate("test-resources/sap/ui/comp/demokit/sample/smarttable/mockserver/metadata.xml", "test-resources/sap/ui/comp/demokit/sample/smarttable/mockserver/");
		oMockServer.start();
		oModel = new sap.ui.model.odata.ODataModel("sapuicompsmarttable", true);
		oModel.setCountSupported(false);
		oView = this.getView();
		oView.setModel(oModel);
	},
	onExit: function() {
		this._oMockServer.stop();
	}
});
