(function(){
	"use strict";

	sap.ui.controller("sap.ui.rta.test.ComplexTest", {
	
		onInit : function () {
	
			jQuery.sap.require("sap.ui.core.util.MockServer");
			
			sURL = "/destinations/E91/sap/opu/odata/SAP/FAC_FINANCIAL_DOCUMENT_SRV_01/?sap-documentation=all";
			
			var oMockServer = new sap.ui.core.util.MockServer({
				rootUri : sURL
			});
			this._sResourcePath = jQuery.sap.getResourcePath("sap/ui/rta/test");
			
			oMockServer.simulate(this._sResourcePath + "/../mockserver/metadata.xml", this._sResourcePath + "/../mockserver");
	
			oMockServer.start();
			var sURL, oModel, oView;
		
			oModel = new sap.ui.model.odata.ODataModel(sURL, {
				json : true,
				loadMetadataAsync : true
			});
	
			oModel.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);
			oModel.setCountSupported(false);
			this._oModel = oModel;
	
			
			oView = this.getView();
			oView.setModel(oModel);
	
			var data = {
				readonly : false,
				mandatory : false,
				visible : true,
				enabled : true
			};
	
			var oStateModel = new sap.ui.model.json.JSONModel();
			oStateModel.setData(data);
			oView.setModel(oStateModel, "state");
	
			this.getView().byId("obheader0").bindElement("/Headers(AccountingDocument='100015012',CompanyCode='0001',FiscalYear='2015')");
			this.getView().byId("MainForm").bindElement("/Headers(AccountingDocument='100015012',CompanyCode='0001',FiscalYear='2015')");
		},
		
		_getUrlParameter : function(sParam){
			var sReturn = "";
			var sPageURL = window.location.search.substring(1);
			var sURLVariables = sPageURL.split('&');
			for (var i = 0; i < sURLVariables.length; i++) {
				var sParameterName = sURLVariables[i].split('=');
				if (sParameterName[0] == sParam) {
					sReturn = sParameterName[1];
				}
			}
			return sReturn;
		},
		
		switchToAdaptionMode : function() {
	
			jQuery.sap.require("sap.ui.rta.RuntimeAuthoring");
			var oRta = new sap.ui.rta.RuntimeAuthoring({
				rootControl : sap.ui.getCore().byId("idMain1"),
				customFieldUrl : this._sResourcePath + "/testdata/rta/CustomField.html",
				showCreateCustomField : (this._getUrlParameter("sap-ui-xx-ccf") == "true")
			});
			oRta.start();
		}
	
	
	});
	
})();