/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2016 SAP SE. All rights reserved
 */

// Provides sap.ui.comp.config.condition.DateRangeType.
sap.ui.define([
	'jquery.sap.global', 'sap/ui/comp/config/condition/Type', 'sap/m/Input', 'sap/m/DateRangeSelection', 'sap/m/DatePicker', 'sap/m/Text', 'sap/m/Select', 'sap/ui/core/date/UniversalDate', 'sap/ui/core/Locale', 'sap/ui/core/LocaleData', 'sap/ui/model/odata/Filter'
], function(jQuery, Type, Input, DateRangeSelection, DatePicker, Text, Select, UniversalDate, Locale, LocaleData, Filter) {
	"use strict";

	sap.ui.model.type.Integer.extend("sap.ui.model.type.NullableInteger", {
		parseValue: function(oValue, sInternalType) {
			switch (this.getPrimitiveType(sInternalType)) {
				case "string":
					if (oValue === "") {
						return null;
					}
			}

			return sap.ui.model.type.Integer.prototype.parseValue.apply(this, arguments);
		}
	});

	var DateRangeType = Type.extend("sap.ui.comp.config.condition.DateRangeType", /** @lends "sap.ui.comp.config.condition.DateRangeType.prototype */
	{
		constructor: function(sFieldName, oFilterProvider, oFieldViewMetadata) {
			Type.apply(this, [
				sFieldName, oFilterProvider, oFieldViewMetadata
			]);
			this.oDateFormat = oFilterProvider && oFilterProvider._oDateFormatSettings ? oFilterProvider._oDateFormatSettings : {
				UTC: true
			};

			this._bIgnoreTime = false;
			this.bMandatory = this.oFieldMetadata ? this.oFieldMetadata.isMandatory : false;
		}
	});

	DateRangeType.prototype.applySettings = function(oSettings) {
		Type.prototype.applySettings.apply(this, arguments);

		if (oSettings && oSettings.ignoreTime) {
			this._bIgnoreTime = oSettings.ignoreTime;
		}
	};

	/**
	 * Sets and returns the given date with the start time 00:00:00.000 UTC
	 * @param {UniversalDate} oDate the date
	 * @returns {UniversalDate} the given date with the start time 00:00:00.000 UTC
	 */
	DateRangeType.setStartTime = function(oDate) {
		if (oDate instanceof Date) {
			oDate = new UniversalDate(oDate);
		}
		if (!oDate) {
			oDate = new UniversalDate();
		}
		oDate.setHours(0);
		oDate.setMinutes(0);
		oDate.setSeconds(0);
		oDate.setMilliseconds(0);
		return oDate;
	};

	/**
	 * Sets and returns the given date with the end time 23:59:59.999 UTC
	 * @param {UniversalDate} oDate the date
	 * @returns {UniversalDate} the given date with the end time 23:59:59.999 UTC
	 */
	DateRangeType.setEndTime = function(oDate) {
		oDate = DateRangeType.toUniversalDate(oDate);
		oDate.setHours(23);
		oDate.setMinutes(59);
		oDate.setSeconds(59);
		oDate.setMilliseconds(999);
		return oDate;
	};

	DateRangeType.toUniversalDate = function(oDate) {
		if (oDate instanceof Date) {
			oDate = new UniversalDate(oDate);
		}
		if (!oDate) {
			oDate = new UniversalDate();
		}
		return oDate;
	};

	/**
	 * Returns the weeks start date of a given universal date based on the locale and format settings
	 */
	DateRangeType.getWeekStartDate = function(oUniversalDate) {
		var oLocale = new Locale(sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale().toString()), oLocaleData = LocaleData.getInstance(oLocale), iFirstDayOfWeek = oLocaleData.getFirstDayOfWeek();
		if (!oUniversalDate) {
			oUniversalDate = new UniversalDate();
		}
		oUniversalDate.setDate(oUniversalDate.getDate() - oUniversalDate.getDay() + iFirstDayOfWeek);
		return DateRangeType.setStartTime(oUniversalDate);
	};

	/**
	 * Returns the month start date of a given universal date
	 */
	DateRangeType.getMonthStartDate = function(oUniversalDate) {
		if (!oUniversalDate) {
			oUniversalDate = new UniversalDate();
		}
		oUniversalDate.setDate(1);
		return DateRangeType.setStartTime(oUniversalDate);
	};

	/**
	 * Returns the quarter start date of a given universal date
	 */
	DateRangeType.getQuarterStartDate = function(oUniversalDate) {
		if (!oUniversalDate) {
			oUniversalDate = new UniversalDate();
		}
		oUniversalDate.setMonth(3 * Math.floor(oUniversalDate.getMonth() / 3));
		oUniversalDate.setDate(1);
		return DateRangeType.setStartTime(oUniversalDate);
	};

	/**
	 * Returns the years start date of a given universal date. If no date is given, today is used.
	 * @param {sap.ui.core.date.UniversalDate} [oUniversalDate] the universal date
	 * @returns the years start date of a given universal date.
	 * @public
	 */
	DateRangeType.getYearStartDate = function(oUniversalDate) {
		if (!oUniversalDate) {
			oUniversalDate = new UniversalDate();
		}
		oUniversalDate.setMonth(0);
		oUniversalDate.setDate(1);
		return DateRangeType.setStartTime(oUniversalDate);
	};

	/**
	 * Returns an array of a date range based on the given universal date If no date is given, today is used.
	 * @param {int} iValue positive and negative values to calculate the date range
	 * @param {string} sType defines the range that the iValue refers to ("DAY","WEEK","MONTH","QUARTER","YEAR")
	 * @param {sap.ui.core.date.UniversalDate} [oUniversalDate] the universal date
	 * @returns {sap.ui.core.date.UniversalDate[]} array with 2 values where [0] is the start and [1] is the end date for the range
	 * @public
	 */
	DateRangeType.getDateRange = function(iValue, sType, oUniversalDate, bCalcBaseStartDate) {
		if (oUniversalDate === true) {
			bCalcBaseStartDate = true;
			oUniversalDate = null;
		}
		if (!oUniversalDate) {
			oUniversalDate = new UniversalDate();
		}
		var oStartDate = new UniversalDate(), oEndDate;
		if (oUniversalDate) {
			oStartDate.oDate.setTime(oUniversalDate.getTime());
			oStartDate = DateRangeType.setStartTime(oStartDate);
		}
		if (iValue !== 0) {
			if (sType === "DAY") {
				oEndDate = new UniversalDate(oStartDate);
				oEndDate.setDate(oStartDate.getDate() + iValue);
			} else if (sType === "WEEK") {
				if (bCalcBaseStartDate) {
					oStartDate = DateRangeType.getWeekStartDate(oStartDate);
				}
				oEndDate = new UniversalDate(oStartDate);
				oEndDate.setDate(oStartDate.getDate() + (iValue * 7));
			} else if (sType === "MONTH") {
				if (bCalcBaseStartDate) {
					oStartDate = DateRangeType.getMonthStartDate(oStartDate);
				}
				oEndDate = new UniversalDate(oStartDate);
				oEndDate.setMonth(oStartDate.getMonth() + iValue);
			} else if (sType === "QUARTER") {
				if (bCalcBaseStartDate) {
					oStartDate = DateRangeType.getQuarterStartDate(oStartDate);
				}
				oEndDate = new UniversalDate(oStartDate);
				oEndDate.setMonth(oStartDate.getMonth() + (iValue * 3));
			} else if (sType === "YEAR") {
				if (bCalcBaseStartDate) {
					oStartDate = DateRangeType.getYearStartDate(oStartDate);
				}
				oEndDate = new UniversalDate(oStartDate);
				oEndDate.setFullYear(oStartDate.getFullYear() + iValue);
			}
		}
		if (!oEndDate) {
			return [];
		}
		if (oEndDate.getTime() < oStartDate.getTime()) {
			// swap start/end date
			oEndDate = [
				oStartDate, oStartDate = oEndDate
			][0];
		}

		// adjust endDate
		oEndDate.setDate(oEndDate.getDate() - 1);

		return [
			DateRangeType.setStartTime(oStartDate), DateRangeType.setEndTime(oEndDate)
		];
	};

	DateRangeType.getTextField = function(oInstance, bExpression) {
		if (bExpression) {
			return new Text({
				text: "{path: '$smartEntityFilter>value1', type:'sap.ui.model.type.Date', formatOptions:" + JSON.stringify({
					style: oInstance.oDateFormat.style,
					pattern: oInstance.oDateFormat.pattern
				}) + "} - {path: '$smartEntityFilter>value2', type:'sap.ui.model.type.Date', formatOptions:" + JSON.stringify({
					style: oInstance.oDateFormat.style,
					pattern: oInstance.oDateFormat.pattern
				}) + "}"
			});
		}
		return new Text({
			text: {
				path: '$smartEntityFilter>value1',
				type: 'sap.ui.model.type.Date',
				formatOptions: {
					style: oInstance.oDateFormat.style,
					pattern: oInstance.oDateFormat.pattern
				}
			}
		});
	};

	DateRangeType.getIntField = function(oInstance) {
		return new Input({
			width: "7rem",
			ariaLabelledBy: oInstance.oOperationSelect || null,
			value: {
				path: "$smartEntityFilter>value1",
				type: "sap.ui.model.type.NullableInteger"
			},
			textAlign: "End",
			type: "Number",
			valueState: {
				path: "$smartEntityFilter>/inputstate",
				formatter: function() {
					if (this.getBinding("valueState").getValue() === "ERROR") {
						return sap.ui.core.ValueState.Error;
					} else {
						return sap.ui.core.ValueState.None;
					}
				}
			}
		});
	};

	DateRangeType.getDescriptionText = function(sTextKey, sTextMulti, sResourceBundle) {
		return new Text({
			wrapping: false,
			text: {
				path: "$smartEntityFilter>value1",
				type: "sap.ui.model.type.Integer",
				formatter: function() {
					if (this.getBinding("text").getValue() === 1) {
						return Type.getTranslatedText(sTextKey, sResourceBundle);
					} else {
						return Type.getTranslatedText(sTextMulti || sTextKey, sResourceBundle);
					}
				}
			}
		});
	};

	DateRangeType.ControlFactory = function(oInstance, aResult, oOperation) {
		if (oOperation.type === "range") {
			var oControl = DateRangeType.getTextField(oInstance, oOperation.display !== "start");
			oControl.addStyleClass("sapUiCompFilterBarCTPaddingLeft");
			aResult.push(oControl);
			return;
		}
		if (oOperation.type === "int") {
			var oControl = DateRangeType.getIntField(oInstance);
			oControl.addStyleClass("sapUiCompFilterBarCTPaddingLeft");
			aResult.push(oControl);
			oControl.setWidth(oInstance.sWidth);
			if (oOperation.descriptionTextKeys) {
				oControl.setWidth("100%");
				var oText = DateRangeType.getDescriptionText(oOperation.descriptionTextKeys[0], oOperation.descriptionTextKeys[1]);
				oText.addStyleClass("sapUiCompFilterBarCTPaddingLeft");
				aResult.push(oText);
				oText.setWidth("auto");
				// it would be better we could use the oControl.addAriaDescribedBy(oText)
				oControl.addAriaLabelledBy(oText);
			}
		}

	};

	DateRangeType.getFixedRangeOperation = function(sKey, sTextKey, sCategory, aDefaults) {
		return {
			key: sKey,
			textKey: sTextKey,
			category: sCategory,
			defaultValues: aDefaults || null,
			type: "range",
			display: "range",
			getControls: DateRangeType.ControlFactory
		};
	};

	/**
	 * Supported operations of the DateRangeType
	 */
	DateRangeType.Operations = {
		DATERANGE: {
			key: "DATERANGE",
			textKey: "CONDITION_DATERANGETYPE_DATERANGE",
			category: "DYNAMIC.DATERANGE",
			defaultOperation: true,
			defaultValues: [
				null, null
			],
			value1: null,
			value2: null,
			getControls: function(oInstance, aResult) {
				var oControl = new DateRangeSelection({
					ariaLabelledBy: oInstance.oOperationSelect || null,
					dateValue: {
						path: "$smartEntityFilter>value1"
					},
					secondDateValue: {
						path: "$smartEntityFilter>value2"
					},
					displayFormat: oInstance.oDateFormat.style || "",
					valueState: {
						path: "$smartEntityFilter>/inputstate",
						formatter: function() {
							if (this.getBinding("valueState").getValue() === "ERROR") {
								return sap.ui.core.ValueState.Error;
							} else {
								return sap.ui.core.ValueState.None;
							}
						}
					},
					change: function(oEvent) {
						var bValid = oEvent.getParameter("valid");

						if (bValid) {
							this.fireValidationSuccess({
								element: this
							}, false, true);
						} else {
							this.fireValidationError({
								element: this
							}, false, true);
						}
					}
				});
				oControl.addStyleClass("sapUiCompFilterBarCTPaddingLeft");
				aResult.push(oControl);
			}
		},
		FROM: {
			key: "FROM",
			textKey: "CONDITION_DATERANGETYPE_FROM",
			category: "DYNAMIC.DATE",
			defaultValues: [
				null
			],
			value1: null,
			getControls: function(oInstance, aResult) {
				var oControl = new DatePicker({
					ariaLabelledBy: oInstance.oOperationSelect || null,
					value: {
						path: "$smartEntityFilter>value1",
						type: "sap.ui.model.type.Date",
						formatOptions: {
							style: oInstance.oDateFormat.style,
							pattern: oInstance.oDateFormat.pattern
						}
					},
					valueState: {
						path: "$smartEntityFilter>/inputstate",
						formatter: function() {
							if (this.getBinding("valueState").getValue() === "ERROR") {
								return sap.ui.core.ValueState.Error;
							} else {
								return sap.ui.core.ValueState.None;
							}
						}
					}
				});
				oControl.addStyleClass("sapUiCompFilterBarCTPaddingLeft");
				aResult.push(oControl);
			}
		},
		TO: {
			key: "TO",
			textKey: "CONDITION_DATERANGETYPE_TO",
			category: "DYNAMIC.DATE",
			defaultValues: [
				null
			],
			value1: null,
			getControls: function(oInstance, aResult, oOperation) {
				var oControl = new DatePicker({
					ariaLabelledBy: oInstance.oOperationSelect || null,
					value: {
						path: "$smartEntityFilter>value1",
						type: "sap.ui.model.type.Date",
						formatOptions: {
							style: oInstance.oDateFormat.style,
							pattern: oInstance.oDateFormat.pattern
						}
					},
					valueState: {
						path: "$smartEntityFilter>/inputstate",
						formatter: function() {
							if (this.getBinding("valueState").getValue() === "ERROR") {
								return sap.ui.core.ValueState.Error;
							} else {
								return sap.ui.core.ValueState.None;
							}
						}
					}
				});
				oControl.addStyleClass("sapUiCompFilterBarCTPaddingLeft");
				aResult.push(oControl);
			}
		},
		LASTDAYS: {
			key: "LASTDAYS",
			textKey: "CONDITION_DATERANGETYPE_LASTDAYS",
			category: "DYNAMIC.DATE.INT",
			defaultValues: [
				1
			],
			value1: null,
			type: "int",
			descriptionTextKeys: [
				"CONDITION_DATERANGETYPE_SINGLE_DAY", "CONDITION_DATERANGETYPE_MULTIPLE_DAYS"
			],
			getControls: DateRangeType.ControlFactory
		},
		LASTWEEKS: {
			key: "LASTWEEKS",
			textKey: "CONDITION_DATERANGETYPE_LASTWEEKS",
			category: "DYNAMIC.WEEK.INT",
			defaultValues: [
				1
			],
			value1: null,
			type: "int",
			descriptionTextKeys: [
				"CONDITION_DATERANGETYPE_SINGLE_WEEK", "CONDITION_DATERANGETYPE_MULTIPLE_WEEKS"
			],
			getControls: DateRangeType.ControlFactory
		},
		LASTMONTHS: {
			key: "LASTMONTHS",
			textKey: "CONDITION_DATERANGETYPE_LASTMONTHS",
			category: "DYNAMIC.MONTH.INT",
			defaultValues: [
				1
			],
			value1: null,
			type: "int",
			descriptionTextKeys: [
				"CONDITION_DATERANGETYPE_SINGLE_MONTH", "CONDITION_DATERANGETYPE_MULTIPLE_MONTHS"
			],
			getControls: DateRangeType.ControlFactory
		},
		LASTQUARTERS: {
			key: "LASTQUARTERS",
			textKey: "CONDITION_DATERANGETYPE_LASTQUARTERS",
			category: "DYNAMIC.QUARTER.INT",
			defaultValues: [
				1
			],
			value1: null,
			type: "int",
			descriptionTextKeys: [
				"CONDITION_DATERANGETYPE_SINGLE_QUARTER", "CONDITION_DATERANGETYPE_MULTIPLE_QUARTERS"
			],
			getControls: DateRangeType.ControlFactory
		},
		LASTYEARS: {
			key: "LASTYEARS",
			textKey: "CONDITION_DATERANGETYPE_LASTYEARS",
			category: "DYNAMIC.YEAR.INT",
			defaultValues: [
				1
			],
			value1: null,
			type: "int",
			descriptionTextKeys: [
				"CONDITION_DATERANGETYPE_SINGLE_YEAR", "CONDITION_DATERANGETYPE_MULTIPLE_YEARS"
			],
			getControls: DateRangeType.ControlFactory
		},
		SPECIFICMONTH: {
			key: "SPECIFICMONTH",
			textKey: "CONDITION_DATERANGETYPE_SPECIFICMONTH",
			category: "DYNAMIC.MONTH",
			defaultValues: function() {
				var oDate = new UniversalDate();
				return [
					oDate.getMonth()
				];
			},
			value1: null,
			getControls: function(oInstance, aResult, oOperation) {
				var oSelect = new Select({
					ariaLabelledBy: oInstance.oOperationSelect || null,
					width: "12rem",
					selectedKey: {
						path: "$smartEntityFilter>value1",
						type: "sap.ui.model.type.Integer"
					}
				});
				oSelect.bindAggregation("items", {
					path: "$smartEntityFilter>/currentoperation/valueList",
					template: new sap.ui.core.ListItem({
						text: {
							path: "$smartEntityFilter>text"
						},
						key: {
							path: "$smartEntityFilter>key"
						}
					})
				});
				oSelect.addStyleClass("sapUiCompFilterBarCTMarginLeft");
				aResult.push(oSelect);
			},
			getValueList: function() {
				var oDate = new UniversalDate(), aMonths = [], oFormatter = sap.ui.core.format.DateFormat.getDateInstance({
					pattern: "MMMM"
				});
				oDate.setDate(15);
				oDate.setMonth(0);
				for (var i = 0; i < 12; i++) {
					aMonths.push({
						text: oFormatter.format(oDate),
						key: i
					});
					oDate.setMonth(oDate.getMonth() + 1);
				}
				return aMonths;
			}
		},
		TODAY: {
			key: "TODAY",
			textKey: "CONDITION_DATERANGETYPE_TODAY",
			category: "FIXED.DATE",
			defaultValues: function() {
				return DateRangeType.getDateRange(1, "DAY", true);
			},
			type: "range",
			display: "start",
			getControls: DateRangeType.ControlFactory
		},
		THISWEEK: DateRangeType.getFixedRangeOperation("THISWEEK", "CONDITION_DATERANGETYPE_THISWEEK", "FIXED.WEEK", function() {
			return DateRangeType.getDateRange(1, "WEEK", true);
		}),
		LASTWEEK: DateRangeType.getFixedRangeOperation("LASTWEEK", "CONDITION_DATERANGETYPE_LASTWEEK", "FIXED.WEEK", function() {
			return DateRangeType.getDateRange(-1, "WEEK", true);
		}),
		LAST2WEEKS: DateRangeType.getFixedRangeOperation("LAST2WEEKS", "CONDITION_DATERANGETYPE_LAST2WEEKS", "FIXED.WEEK", function() {
			return DateRangeType.getDateRange(-2, "WEEK", true);
		}),
		LAST3WEEKS: DateRangeType.getFixedRangeOperation("LAST3WEEKS", "CONDITION_DATERANGETYPE_LAST3WEEKS", "FIXED.WEEK", function() {
			return DateRangeType.getDateRange(-3, "WEEK", true);
		}),
		LAST4WEEKS: DateRangeType.getFixedRangeOperation("LAST4WEEKS", "CONDITION_DATERANGETYPE_LAST4WEEKS", "FIXED.WEEK", function() {
			return DateRangeType.getDateRange(-4, "WEEK", true);
		}),
		LAST5WEEKS: DateRangeType.getFixedRangeOperation("LAST5WEEKS", "CONDITION_DATERANGETYPE_LAST5WEEKS", "FIXED.WEEK", function() {
			return DateRangeType.getDateRange(-5, "WEEK", true);
		}),
		THISMONTH: DateRangeType.getFixedRangeOperation("THISMONTH", "CONDITION_DATERANGETYPE_THISMONTH", "FIXED.MONTH", function() {
			return DateRangeType.getDateRange(1, "MONTH", true);
		}),
		LASTMONTH: DateRangeType.getFixedRangeOperation("LASTMONTH", "CONDITION_DATERANGETYPE_LASTMONTH", "FIXED.MONTH", function() {
			return DateRangeType.getDateRange(-1, "MONTH", true);
		}),
		THISQUARTER: DateRangeType.getFixedRangeOperation("THISQUARTER", "CONDITION_DATERANGETYPE_THISQUARTER", "FIXED.QUARTER", function() {
			return DateRangeType.getDateRange(1, "QUARTER", true);
		}),
		LASTQUARTER: DateRangeType.getFixedRangeOperation("LASTQUARTER", "CONDITION_DATERANGETYPE_LASTQUARTER", "FIXED.QUARTER", function() {
			return DateRangeType.getDateRange(-1, "QUARTER", true);
		}),
		YEARTODATE: DateRangeType.getFixedRangeOperation("YEARTODATE", "CONDITION_DATERANGETYPE_YEARTODATE", "FIXED.YEAR", function() {
			return [
				DateRangeType.getYearStartDate(new UniversalDate()), DateRangeType.setEndTime()
			];
		}),
		THISYEAR: DateRangeType.getFixedRangeOperation("THISYEAR", "CONDITION_DATERANGETYPE_THISYEAR", "FIXED.YEAR", function() {
			return DateRangeType.getDateRange(1, "YEAR", true);
		}),
		LASTYEAR: DateRangeType.getFixedRangeOperation("LASTYEAR", "CONDITION_DATERANGETYPE_LASTYEAR", "FIXED.YEAR", function() {
			return DateRangeType.getDateRange(-1, "YEAR", true);
		}),
		QUARTER1: DateRangeType.getFixedRangeOperation("QUARTER1", "CONDITION_DATERANGETYPE_QUARTER1", "FIXED.QUARTER", function() {
			var oStartDate = DateRangeType.getYearStartDate();
			return DateRangeType.getDateRange(1, "QUARTER", oStartDate);
		}),
		QUARTER2: DateRangeType.getFixedRangeOperation("QUARTER2", "CONDITION_DATERANGETYPE_QUARTER2", "FIXED.QUARTER", function() {
			var oStartDate = DateRangeType.getDateRange(1, "QUARTER", DateRangeType.getYearStartDate())[1];
			oStartDate.setMilliseconds(1000);
			return DateRangeType.getDateRange(1, "QUARTER", oStartDate);
		}),
		QUARTER3: DateRangeType.getFixedRangeOperation("QUARTER3", "CONDITION_DATERANGETYPE_QUARTER3", "FIXED.QUARTER", function() {
			var oStartDate = DateRangeType.getDateRange(2, "QUARTER", DateRangeType.getYearStartDate())[1];
			oStartDate.setMilliseconds(1000);
			return DateRangeType.getDateRange(1, "QUARTER", oStartDate);
		}),
		QUARTER4: DateRangeType.getFixedRangeOperation("QUARTER4", "CONDITION_DATERANGETYPE_QUARTER4", "FIXED.QUARTER", function() {
			var oStartDate = DateRangeType.getDateRange(3, "QUARTER", DateRangeType.getYearStartDate())[1];
			oStartDate.setMilliseconds(1000);
			return DateRangeType.getDateRange(1, "QUARTER", oStartDate);
		})
	};

	/**
	 * Returns the controls to be used for the given operation
	 * @param {object} oOperation the current operation of the condition type
	 * @returns [sap.ui.core.Control] Array of controls to be used to visualize the condition types operation
	 * @protected
	 */
	DateRangeType.prototype.getControls = function(oOperation) {
		var aControls = [];
		if (!oOperation) {
			return;
		}
		oOperation.getControls(this, aControls, oOperation);
		return aControls;
	};

	/**
	 * Property setter for the ignoreTime
	 * @param {boolean} bIgnoreTime new value of this property
	 * @public
	 */
	DateRangeType.prototype.setIgnoreTime = function(bIgnoreTime) {
		this._bIgnoreTime = bIgnoreTime;
	};

	/**
	 * Gets current value of property ignoreTime. When the value is true, the returned range enddate has a time stamp of 00:00:00. The default for the
	 * time stamp is 23:59:59:999 Default value is false.
	 * @returns {boolean} of controls to be used to visualize the condition types operation
	 * @public
	 */
	Type.prototype.getIgnoreTime = function(bIgnoreTime) {
		return this._bIgnoreTime;
	};

	/**
	 * Returns the default values for the given operation
	 * @param {object} oOperation the current operation of the condition type
	 * @returns [object] Array of default values to be used for the operation
	 * @protected
	 */
	DateRangeType.prototype.getDefaultValues = function(oOperation) {
		if (!oOperation) {
			return [];
		}
		var aDefaultValues = oOperation.defaultValues || [];
		if (typeof aDefaultValues === "function") {
			aDefaultValues = oOperation.defaultValues();
		}
		var oCondition = this.getCondition(), oValue1 = aDefaultValues[0] || null, oValue2 = aDefaultValues[1] || null;
		if (oOperation.key === "DATERANGE" && oCondition && oCondition.value1 && oCondition.value2) {
			// Default fallback to a date range if value1 and value2 are already provided as dates
			oValue1 = oCondition.value1.oDate || oCondition.value1;
			oValue2 = oCondition.value2.oDate || oCondition.value2;
		} else {
			// make sure that both values are of type UniversalDate
			if (oValue1 instanceof Date) {
				oValue1 = new UniversalDate(oValue1);
			}
			if (oValue2 instanceof Date) {
				oValue2 = new UniversalDate(oValue2);
			}
		}

		return [
			oValue1, oValue2
		];
	};

	DateRangeType.prototype.getOperations = function() {
		var aOperations = [];
		for ( var n in DateRangeType.Operations) {
			var oOperation = DateRangeType.Operations[n];
			if (this._filterOperation(oOperation)) {
				aOperations.push(oOperation);
			}
		}
		return aOperations;
	};

	DateRangeType.prototype._updateOperation = function(oOperation) {
		Type.prototype._updateOperation.apply(this, [
			oOperation
		]);
		if (oOperation.display) {
			var aDefaultValues = this.getDefaultValues(oOperation), oFormatSettings = {
				style: this.oDateFormat.style,
				pattern: this.oDateFormat.pattern
			};
			if (oOperation.display === "start") {
				oOperation.textValue = sap.ui.core.format.DateFormat.getInstance(oFormatSettings).format(aDefaultValues[0].oDate);
			} else if (oOperation.display === "range") {
				oOperation.textValue = sap.ui.core.format.DateFormat.getInstance(oFormatSettings).format(aDefaultValues[0].oDate) + " - " + sap.ui.core.format.DateFormat.getInstance(oFormatSettings).format(aDefaultValues[1].oDate);
			}
		}
	};

	DateRangeType.prototype.updateOperations = function() {
		var aOperations = this.getOperations();
		for (var i = 0; i < aOperations.length; i++) {
			this._updateOperation(aOperations[i]);
		}
		return this.oModel.setProperty("operations", aOperations, this.getContext(), true);
	};

	DateRangeType.prototype.isValidCondition = function() {
		var oCondition = this.getCondition(), oOperation = this.getOperation(oCondition.operation);
		if (oOperation && oCondition && oCondition.key && oCondition.operation) {
			if ("value1" in oOperation && "value2" in oOperation) {
				return oCondition.value1 !== null && oCondition.value2 !== null;
			} else if ("value1" in oOperation) {
				return oCondition.value1 !== null;
			} else if ("value2" in oOperation) {
				return oCondition.value2 !== null;
			} else if (!("value1" in oOperation) && !("value2" in oOperation)) {
				return true;
			}
		}
		return false;
	};

	DateRangeType.prototype.providerDataUpdated = function(aUpdatedFieldNames, oData) {
		/*
		 * jQuery.sap.log.error(">>> " + this.sFieldName + " / "+ JSON.stringify(oData[this.sFieldName])); jQuery.sap.log.error(">>> " +
		 * JSON.stringify(aUpdatedFieldNames)); for (var n in aUpdatedFieldNames) { jQuery.sap.log.error(">>> " + aUpdatedFieldNames[n] + ": " +
		 * JSON.stringify(oData[aUpdatedFieldNames[n]])); } jQuery.sap.log.error(">>> ");
		 */
	};

	DateRangeType.prototype.initialize = function(oJson) {
		Type.prototype.initialize.apply(this, [
			oJson
		]);
		this.oModel.suspend();
		var oOrgJson = jQuery.extend({}, oJson, true);

		var sCalendarType = (new UniversalDate()).getCalendarType();
		if (!oJson.conditionTypeInfo) {
			if (oJson.ranges && oJson.ranges.length == 1) {
				// if no conditionTypeInfo exist but one ranges item we restore the date range as DATERANGE operation. This is required for a better
				// deserialize handling of DataSuite format.
				oJson.conditionTypeInfo = {
					name: this.getName(),
					data: {
						key: this.sFieldName,
						operation: "DATERANGE",
						value1: oJson.ranges[0].value1,
						value2: oJson.ranges[0].value2,
						calendarType: sCalendarType
					}
				};
			} else {
				var oDefaultOperation = this.getDefaultOperation(), sKey = oDefaultOperation ? oDefaultOperation.key : "";
				oJson.conditionTypeInfo = {
					name: this.getName(),
					data: {
						key: this.sFieldName,
						operation: sKey,
						calendarType: sCalendarType
					}
				};
			}
		}
		if (oJson.conditionTypeInfo) {
			oJson = oJson.conditionTypeInfo;
		}
		if (oJson.name && oJson.data) {
			if (oJson.name !== this.getName()) {

				jQuery.sap.log.debug("ConditionType " + this.getName() + " tries to deserialize data from " + oJson.name);
			}
			oJson = oJson.data;
		}
		if (!oJson.operation) {
			return;
		}

		var oOperation = this.getOperation(oJson.operation);
		if (!oOperation) {
			// if no operation is found and the Type is async we wait for PendingChange
			if (this.getAsync()) {

				this.setPending(true);

				var that = this, fnHandler = function(oEvent) {
					if (oEvent.getParameter("pending") === false) {
						that.oFilterProvider.detachPendingChange(fnHandler);
						that.initialize(oOrgJson);
					}
				};
				this.oFilterProvider.attachPendingChange(fnHandler);

				this.oModel.resume();
				return;
			}
			// TODO if not async we could use the DefaultOperation????
		}

		// handle transform from calendar type differences
		if (sCalendarType !== oJson.calendarType && (oJson.calendarType === "Islamic" || sCalendarType === "Islamic") && oJson.operation === "SPECIFICMONTH") {
			oJson.operation = "DATERANGE";
			var iValue = parseInt(oJson.value1, 10), oDate = UniversalDate.getInstance(new Date(), oJson.calendarType);
			oDate.setMonth(iValue);
			oDate = DateRangeType.getMonthStartDate(oDate);
			aValues = DateRangeType.getDateRange(1, "MONTH", oDate, true);
			oJson.value1 = aValues[0].oDate.toISOString();
			oJson.value2 = aValues[1].oDate.toISOString();
		}

		var oProperty = this.getConditionContext().getObject();

		oProperty.operation = oJson.operation;
		oProperty.key = oJson.key;
		oProperty.value1 = null;
		oProperty.value2 = null;
		if (oJson.operation === "DATERANGE") {
			if (typeof oJson.value1 === "string") {
				oJson.value1 = oJson.value1 === "" ? null : (new UniversalDate(oJson.value1)).oDate;
			}
			if (typeof oJson.value2 === "string") {
				oJson.value2 = oJson.value2 === "" ? null : (new UniversalDate(oJson.value2)).oDate;
			}
			oProperty.value1 = oJson.value1;
			oProperty.value2 = oJson.value2;
		} else if (oJson.operation === "FROM") {
			if (typeof oJson.value1 === "string") {
				oJson.value1 = oJson.value1 === "" ? null : (new UniversalDate(oJson.value1)).oDate;
				oProperty.value1 = oJson.value1;
			}
		} else if (oJson.operation === "TO") {
			if (typeof oJson.value1 === "string") {
				oJson.value1 = oJson.value1 === "" ? null : (new UniversalDate(oJson.value1)).oDate;
				oProperty.value1 = oJson.value1;
			}
		} else if ([
			"LASTDAYS", "LASTWEEKS", "LASTMONTHS", "LASTQUARTERS", "LASTYEARS"
		].indexOf(oJson.operation) > -1) {
			oProperty.value1 = oJson.value1;
		} else if (oJson.operation === "SPECIFICMONTH") {
			oProperty.value1 = oJson.value1 + "";
		} else {
			var aValues = this.getDefaultValues(this.getOperation(oJson.operation));
			oProperty.value1 = aValues[0];
			oProperty.value2 = aValues[1];
		}

		this.serialize(true);

		// ignore some model change events, so that we not overwrite the values by some defaultValues
		this.bIgnoreBindingChange = true;

		this.oModel.resume();

		delete this.bIgnoreBindingChange;
	};

	DateRangeType.prototype.serialize = function(bUpdateProviderSyncron) {
		var oJson = {}, oCondition = this.getCondition();
		if (!oCondition.operation) {
			return;
		}
		var oOperation = this.getOperation(oCondition.operation);
		if (!oOperation || !("value1" in oOperation)) {
			oCondition.value1 = null;
		}
		if (!oOperation || !("value2" in oOperation)) {
			oCondition.value2 = null;
		}
		oCondition.calendarType = (new UniversalDate()).getCalendarType();
		oJson.conditionTypeInfo = {
			name: this.getName(),
			data: oCondition
		};

		if (this.iChangeTimer) {
			jQuery.sap.clearDelayedCall(this.iChangeTimer);
			delete this.iChangeTimer;
		}

		if (this.oFilterProvider && this.oFilterProvider._oSmartFilter) {
			// call the fireFilterChange syncron
			this.oFilterProvider._oSmartFilter.fireFilterChange();
		}

		if (bUpdateProviderSyncron) {
			this._updateProvider(oJson);
		} else {
			this.iChangeTimer = jQuery.sap.delayedCall(1, this, this._updateProvider, [
				oJson
			]);
		}

		return oJson;
	};

	DateRangeType.prototype._updateProvider = function(oJson) {
		this.validate(false);
		oJson.ranges = this.getFilterRanges();
		oJson.items = [];
		if (this.oFilterProvider) {
			this.oFilterProvider.oModel.setProperty("/" + this.sFieldName, oJson);
			this.oFilterProvider.setFilterData({}, false, this.sFieldName);
		}
	};

	DateRangeType.prototype.getFilterRanges = function() {
		var oCondition = this.getCondition(), aValues = [];

		if (oCondition.operation === "LASTDAYS") {
			aValues = DateRangeType.getDateRange(-oCondition.value1, "DAY", true);
			oCondition.value1 = aValues[0];
			oCondition.value2 = aValues[1];
		} else if (oCondition.operation === "LASTWEEKS") {
			aValues = DateRangeType.getDateRange(-oCondition.value1, "WEEK", true);
			oCondition.value1 = aValues[0];
			oCondition.value2 = aValues[1];
		} else if (oCondition.operation === "LASTMONTHS") {
			aValues = DateRangeType.getDateRange(-oCondition.value1, "MONTH", true);
			oCondition.value1 = aValues[0];
			oCondition.value2 = aValues[1];
		} else if (oCondition.operation === "LASTQUARTERS") {
			aValues = DateRangeType.getDateRange(-oCondition.value1, "QUARTER", true);
			oCondition.value1 = aValues[0];
			oCondition.value2 = aValues[1];
		} else if (oCondition.operation === "LASTYEARS") {
			aValues = DateRangeType.getDateRange(-oCondition.value1, "YEAR", true);
			oCondition.value1 = aValues[0];
			oCondition.value2 = aValues[1];
		} else if (oCondition.operation === "SPECIFICMONTH") {
			var iValue = parseInt(oCondition.value1, 10), oDate = new UniversalDate();
			oDate.setMonth(iValue);
			oDate = DateRangeType.getMonthStartDate(oDate);
			aValues = DateRangeType.getDateRange(1, "MONTH", oDate, true);
			oCondition.value1 = aValues[0];
			oCondition.value2 = aValues[1];
		}

		if (oCondition.value1 instanceof UniversalDate) {
			oCondition.value1 = oCondition.value1.oDate;
		}
		if (oCondition.value2 instanceof UniversalDate) {
			oCondition.value2 = oCondition.value2.oDate;
		}

		if (oCondition.operation === "FROM") {
			if (!(this.isValidCondition() && oCondition.value1)) {
				return [];
			}
			oCondition.operation = "GE";
			delete oCondition.value2;
		} else if (oCondition.operation === "TO") {
			if (!(this.isValidCondition() && oCondition.value1)) {
				return [];
			}
			oCondition.operation = "LE";
			delete oCondition.value2;

			if (this._bIgnoreTime) {
				oCondition.value1 = DateRangeType.setStartTime(oCondition.value1).oDate;
			} else {
				oCondition.value1 = DateRangeType.setEndTime(oCondition.value1).oDate;
			}
		} else {
			if (!(this.isValidCondition() && oCondition.value1 && oCondition.value2)) {
				return [];
			}
			oCondition.operation = "BT";

			if (this._bIgnoreTime) {
				// set the time to 00:00:00
				oCondition.value2 = DateRangeType.setStartTime(oCondition.value2).oDate;
			} else {
				// ensure the day and set time to beginning of day
				oCondition.value1 = DateRangeType.setStartTime(oCondition.value1).oDate;

				// include the day and set time to 23:59:59:999
				oCondition.value2 = DateRangeType.setEndTime(oCondition.value2).oDate;
			}
		}

		oCondition.exclude = false;
		oCondition.keyField = oCondition.key;
		delete oCondition.key;
		// TODO: CHECK WHY THIS FAILS IN PHANTOM
		// jQuery.sap.log.debug("RANGE:" + JSON.stringify(oCondition));
		return [
			oCondition
		];
	};

	DateRangeType.prototype.getTokenText = function() {
		return "";
	};

	DateRangeType.prototype.getName = function() {
		return this.getMetadata().getName();
	};

	DateRangeType.prototype.getType = function() {
		return "Edm.Date";
	};

	return DateRangeType;
}, /* bExport= */true);
