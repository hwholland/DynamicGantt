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
				resolve(this.getOwnerComponent().getComponent("sap.gantt.sample.BasicGanttChart", true))
			}).then(function(oComp) {
				console.log(oComp);
				var oView = oComp.getAggregation("rootControl");
				that.byId("navPage").addContent(oView);
			});
		}
	});
});