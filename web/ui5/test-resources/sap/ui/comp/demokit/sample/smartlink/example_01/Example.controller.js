sap.ui.define([
	"sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel", "sap/ui/comp/sample/smartlink/RegisterMockForCrossApplicationNavigation"
], function(Controller, JSONModel, RegisterMockForCrossApplicationNavigation) {
	"use strict";

	return Controller.extend("sap.ui.comp.sample.smartlink.example_01.Example", {

		RegisterMockForCrossApplicationNavigation: RegisterMockForCrossApplicationNavigation,

		onInit: function() {
			jQuery.sap.require("sap.ui.core.util.MockServer");
			this.oMockServer = new sap.ui.core.util.MockServer({
				rootUri: "demokit.smartlink.example_01/"
			});
			this.oMockServer.simulate("test-resources/sap/ui/comp/demokit/sample/smartlink/example_01/mockserver/metadata.xml", "test-resources/sap/ui/comp/demokit/sample/smartlink/example_01/mockserver/");
			this.oMockServer.start();

			// create and set ODATA Model
			this.oModel = new sap.ui.model.odata.ODataModel("demokit.smartlink.example_01", true);
			this.getView().setModel(this.oModel);
			this.getView().bindElement("/ProductCollection('1239102')");
		},

		onExit: function() {
			this.oMockServer.stop();
			this.oModel.destroy();
		}
	});
});
