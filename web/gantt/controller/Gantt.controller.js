sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"sap/gantt/def/SvgDefs",
	"sap/gantt/def/gradient/LinearGradient",
	"sap/gantt/def/gradient/Stop",
	"sap/gantt/shape/ext/Chevron",
	"sap/ui/core/format/DateFormat",
	"sap/gantt/def/cal/CalendarDefs",
	"sap/gantt/def/cal/Calendar",
	"sap/gantt/def/cal/TimeInterval"
], function (Controller, JSONModel, MessageToast, SvgDefs, LinearGradient, Stop, Chevron, DateFormat, CalendarDefs, Calendar, TimeInterval) {
	"use strict";

	return Controller.extend("gantt.controller.Gantt", {
		onInit: function () {
			var eventBus = sap.ui.getCore().getEventBus();
			eventBus.subscribe("channel1", "event1", this.setControl, this);
			console.log("gantt.controller.Gantt --> onInit");
			/*
			var fnGetFragments = function(oModel) {
				console.log("Promise fullfilled");
				console.log(oModel);
				var oColumns = oModel.getProperty("/columns");
				this.getOwnerComponent().getFragments(oColumns);
			}
			var pConfigModel = new Promise((resolve, reject) => {
				resolve(this.getOwnerComponent().getModel("config"));
			}).then(fnGetFragments.bind(this)).catch((sMessage) => {
				console.log("error resolving pConfigModel: " + sMessage);
			});
			*/

			/*
			var oConfigColumns = oConfigModel.getProperty("/columns");
			var pFragments = new Promise((resolve, reject) => {
				resolve(this.getOwnerComponent().getFragments(oConfigColumns));
			}).then(function(oConfig) {
				console.log("resolved");
				console.log(oConfig);
			});
			*/
		},

		onAfterRendering: function() {
			console.log("gantt.controller.Gantt --> onAfterRendering");
			
		},

		setControl: function (channel, event, data) {
			//var oControl = this.getOwnerComponent().getControl();
			console.log(data);
			console.log("setControl");
			var oPage = new sap.m.Page({
				title:"Test Page",
				content: [
					data
				]
			});
			console.log(this.getView());
			this.getView().addContent(oPage);
			this.getView()
		}

	});
});