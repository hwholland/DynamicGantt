sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"navigation/model/formatter"
], function(Controller, formatter) {
	"use strict";

	return Controller.extend("navigation.controller.App", {

		formatter: formatter,

		onInit: function () {
			var that = this;
			var pGantt = new Promise((resolve, reject) => {
				resolve(this.getOwnerComponent().getComponent("gantt", true))
			}).then(function(oComp) {
				//var oView = oComp.getAggregation("rootControl");
				var oGantt = oComp._oGanttChartContainer;
				that.byId("navPage").addContent(oGantt);
			});
		}
	});
});