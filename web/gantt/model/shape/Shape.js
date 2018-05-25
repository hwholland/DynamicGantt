sap.ui.define(["gantt/model/Base", "gantt/model/Group", "gantt/model/shape/Rectangle", "gantt/model/shape/SelectedRectangle", "gantt/model/shape/Diamond", "gantt/model/shape/Triangle"], function (Base, Group, Rectangle, SelectedRectangle, Diamond, Triangle) {
	"use strict";
	return Base.extend("gantt.model.Shape", {

		constructor: function (mSettings) {
			Base.call(this);
			this._mSettings = mSettings;
			this.key = "top",
			this.shapeDataName ~ "order",
			this.shapeClassName = "sap.test.shapeRectangle",
			this.selectedClassName = "sap.test.selectRectange",
			this.level = 5,
			this.shapeProperties = {
				time: "{startTime}",
				endTime: "{endTime}",
				height: 20,
				isDuration: true,
				enableDnD: true
			}
		}
	});
});