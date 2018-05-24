sap.ui.define(["sap/ui/core/UIComponent", "sap/ui/model/json/JSONModel", "gantt/model/models", "sap/ui/table/Column", "sap/gantt/config/Shape"],
	function (UIComponent, JSONModel, models, Column, Shape) {
		"use strict";

		/**
		 * @augments	sap.ui.core.UIComponent
		 * @class		web.gantt.Component
		 */
		return UIComponent.extend("gantt.Component", {

			metadata: {
				manifest: "json"
			},

			init: function () {
				//jQuery.sap.require("sap.gantt.def.cal.Calendar");
				//jQuery.sap.require("sap.gantt.def.cal.CalendarDefs");
				//jQuery.sap.require("sap.gantt.def.cal.TimeInterval");
				// call the base component's init function
				UIComponent.prototype.init.apply(this, arguments);
				this.setModel(models.createDeviceModel(), "device");
				this._oConfig = this.getModel("config");
				this._oData = this.getModel("data");
				// begin building the UI control
				this.getChartContainer();
				this.getGanttChartWithTable();

				var oModel = new JSONModel();
				var oGantt = new JSONModel();

				var fnBindColumns = function (oConfig) {
					oModel.setProperty("/columns", oConfig);
					this.getGanttColumns(oModel);
				};

				var fnGetFragments = function (oEvent) {
					var oColumns = oModel.getProperty("/columns");
					new Promise((resolve, reject) => {
						resolve(this.getFragments(oColumns));
					}).then(fnBindColumns.bind(this)).catch((sMessage) => {
						console.log("error getting fragments: " + sMessage);
					});
				};

				oModel.attachEventOnce("requestCompleted", fnGetFragments, this);
				oModel.loadData("../gantt/model/config.json");

				var fnBindRows = function (oEvent) {
					this.getGanttRowBinding(oGantt);
					this.getGanttRelationshipBinding(oGantt);
					//this.setCalendarDef();
					this._oGanttChartWithTable.setShapeDataNames(["order"]);
					this._oGanttChartWithTable.setShapes(this._configShape());
					//this.configure();
					this.setChartToContainer();
				};

				oGantt.attachEventOnce("requestCompleted", fnBindRows, this);
				oGantt.loadData("../gantt/model/data.json");

				console.log(this);

				if (Object.getOwnPropertyNames(this.oComponentData).length === 0) {
					this.configure();
				}


			},

			//////////////////////////////////////////////////////////////////////////////////////////////////////
			//										INSTANTIATION FUNCTIONS									    //
			//////////////////////////////////////////////////////////////////////////////////////////////////////

			/**
			 * @method getFragments
			 * @memberof web.gantt.Component
			 * @param  {Object} oConfig JSON model containing configuration settings
			 * @return {Object} Returns the model after replacing the fragment reference with an instantiated control
			 */
			getFragments: function (oConfig) {
				return (new Promise((resolve, reject) => {
					for (var i = 0; i < oConfig.length; i++) {
						var oTemplate = oConfig[i].template;
						var oFragment = sap.ui.xmlfragment("gantt.fragment." + oTemplate.fragment, this);
						var aProperties = Object.getOwnPropertyNames(oTemplate.binding);
						for (var j = 0; j < aProperties.length; j++) {
							var sProperty = aProperties[j];
							oFragment.bindProperty(sProperty, oTemplate.binding[sProperty]);
						}
						if (this.view) {
							this.view.addDependent(oFragment);
						}
						oConfig[i].template = oFragment;
					}
					resolve(oConfig);
				}));

			},

			/**
			 * @method getChartContainer
			 * @description	The GanttChartContainer is a parent control to house one or more Gantt charts in a page.  It handles the relationship between the Gantt chart's visual effects/rendering --> with any tree table that may be included
			 * @memberof web.gantt.Component
			 * @return {Object} User-interface control (sap.gantt.GanttChartContainer)
			 */
			getChartContainer: function () {
				var oGanttChartContainer = new sap.gantt.GanttChartContainer("GanttChartContainer", {
					height:"1000px"
				});
				this._oGanttChartContainer = oGanttChartContainer;
				return (oGanttChartContainer);
			},

			/**
			 * @method getGanttChartWithTable
			 * @memberOf web.gantt.Component
			 * @return {Object} sap.gantt.GanttChartWithTable UI Control
			 */
			getGanttChartWithTable: function () {
				var oGanttChartWithTable = new sap.gantt.GanttChartWithTable({
					baseRowHeight: 50
					//chartSchemes: sap.gantt.config.ChartScheme[],
					//objectTypes: sap.gantt.config.Mode[],
					//modes: sap.gantt.config.Mode[]
				});
				this._oGanttChartWithTable = oGanttChartWithTable;
				return (oGanttChartWithTable);
			},

			/**
			 * @function getGanttColumns
			 * @memberOf web.gantt.Component
			 * @param  {Object} oModel JSON model with configuration settings for the column binding
			 * @return void
			 */
			getGanttColumns: function (oModel) {
				this._oGanttChartWithTable.setModel(oModel, "config");
				this._oGanttChartWithTable.bindAggregation("columns", {
					path: "config>/columns",
					factory: function (sId, oContext) {
						var oColumnName = oContext.getObject().oColumnName;
						return new Column({
							label: oContext.getObject().label,
							template: oContext.getObject().template,
							visible: oContext.getObject().visible,
							sortProperty: oContext.getObject().sortProperty,
							filterProperty: oContext.getObject().filterProperty,
							width: oContext.getObject().width
						});
					}
				});
			},

			getGanttRowBinding: function (oModel) {
				this._oGanttChartWithTable.setModel(oModel, "data");
				this._oGanttChartWithTable.bindAggregation("rows", {
					path: "data>/root",
					parameters: {
						arrayNames: ["children"]
					}
				});
			},

			getGanttRelationshipBinding: function (oModel) {
				this._oGanttChartWithTable.bindAggregation("relationships", {
					path: "data>/root/relationship"
				});
			},

			setChartToContainer: function () {
				this._oGanttChartContainer.addGanttChart(this._oGanttChartWithTable);
				//return(this._oGanttChartContainer);
				var customData = {
					property: "value"
				}; // anything you eventually want to pass
				var eventBus = sap.ui.getCore().getEventBus();
				eventBus.publish("channel1", "event1", this._oGanttChartWithTable);
			},

			//////////////////////////////////////////////////////////////////////////////////////////////////////
			//								AUTOMATIC CONFIGURATION FUNCTIONS									//
			//////////////////////////////////////////////////////////////////////////////////////////////////////

			/*
			 * Configuration of Shape.
			 * @private
			 * @returns {Array} aShapes
			 */
			_configShape: function () {
			
				var oOrderShape = new sap.gantt.config.Shape({
					key: "activity",
					shapeClassName: "sap.gantt.shape.Rectangle",
					shapeDataName: "activity",
					level: 10,
					shapeProperties: {
						time: "{data>startTime}",
						endTime: "{data>endTime}",
						fill: "#A52A2A",
						height: 21,
						rx: 10,
						ry: 10,
						yBias: 0.5,
						isDuration: true,
						enableDnD: true
					}
				});

				var aShapes = [oOrderShape];

				return aShapes;
			},

			configure: function () {
				//this._oGanttChartContainer.setContainerLayouts(this.getContainerLayouts());
				//this._oGanttChartContainer.setLegendContainer(this.getLegendContainer());
				//this._oGanttChartContainer.setContainerLayoutKey("sap.test.gantt_layout");
				//this._oGanttChartContainer.setToolbarSchemes(this.getToolbarSchemes());
				//this._oGanttChartContainer.addCustomToolbarItem(this._createCustomToolbar());
				//this._oGanttChartWithTable.setTimeAxis(this._createTimeAxis());
				this._oGanttChartWithTable.setShapeDataNames(["order"]);
				this._oGanttChartWithTable.setShapes(this._configShape());
				//this._oGanttChartWithTable.setToolbarSchemes(this.getToolbarSchemes());
				//this._oGanttChartWithTable.setSelectionMode(sap.gantt.SelectionMode.Multiple);
			}
		});
	});