sap.ui.require.preload({
	"web/ui5/test-resources/sap/ui/comp/smartfilterbar/daterange/Component.js": "jQuery.sap.declare(\"sap.ui.comp.sample.smarttable.Component\"),sap.ui.core.UIComponent.extend(\"sap.ui.comp.sample.smarttable.Component\",{metadata:{rootView:\"sap.ui.comp.sample.smarttable.SmartTable\",dependencies:{libs:[\"sap.m\",\"sap.ui.comp\"]},config:{sample:{stretch:!0,files:[\"SmartTable.view.xml\",\"SmartTable.controller.js\",\"mockserver/metadata.xml\"]}}}});",
	"web/ui5/test-resources/sap/ui/comp/smartfilterbar/daterange/SmartTable.controller.js": "sap.ui.controller(\"sap.ui.comp.sample.smarttable.SmartTable\",{onInit:function(){var t;jQuery.sap.require(\"sap.ui.core.util.MockServer\");var e=new sap.ui.core.util.MockServer({rootUri:\"sapuicompsmarttable/\"});this._oMockServer=e,e.simulate(\"./mockserver/metadata.xml\",\"./mockserver/\"),e.start(),(t=new sap.ui.model.odata.ODataModel(\"sapuicompsmarttable\",!0)).setCountSupported(!1),this.getView().setModel(t),this.oData=null,this.getView().byId(\"smartFilterBar\").search(),this.getView().byId(\"smartFilterBar\").attachPendingChange(function(t){!1===t.getParameter(\"pendingValue\")&&sap.m.MessageToast.show(\"PendingValue is false\")})},onExit:function(){this._oMockServer.stop()},serializeFilterData:function(){this.oData=this.getView().byId(\"smartFilterBar\").fetchVariant(!0),this.getView().byId(\"debugtext\").setText(JSON.stringify(this.oData))},deserializeFilterData:function(){if(this.oData){var t=this.getView().byId(\"smartFilterBar\");t.applyVariant(this.oData,!0),sap.m.MessageToast.show(\"isPending() = \"+t.isPending())}},serializeDataSuiteFormat:function(){this.oDSData=this.getView().byId(\"smartFilterBar\").getDataSuiteFormat(),this.getView().byId(\"debugtext\").setText(this.oDSData)},deserializeDataSuiteFormat:function(){if(this.oDSData){var t=this.getView().byId(\"smartFilterBar\");t.setDataSuiteFormat(this.oDSData),sap.m.MessageToast.show(\"isPending() = \"+t.isPending())}},toggleTimeHandling:function(){var t=this.getView().byId(\"smartFilterBar\").getConditionTypeByKey(\"BLDAT\");t.setIgnoreTime(!t.getIgnoreTime())},handleFilterChange:function(t){}});",
	"web/ui5/test-resources/sap/ui/comp/smartfilterbar/daterange/custom/MyFiscalDateRange.js": "/*\n * ! SAP UI development toolkit for HTML5 (SAPUI5)\n\n(c) Copyright 2009-2016 SAP SE. All rights reserved\n */\nsap.ui.define([\"jquery.sap.global\",\"sap/ui/comp/config/condition/DateRangeType\"],function(e,t){\"use strict\";var a=t.extend(\"custom.MyFiscalDateRange\",{constructor:function(e,a,n){t.apply(this,[e,a,n]),this.setAsync(!0),this.setPending(!0)}});return a.Operations={},a.initializeOperations=function(){for(var e=0;e<4;e++)a.Operations[\"FISCALPERIOD\"+e]=t.getFixedRangeOperation(\"FISCALPERIOD\"+e,{key:\"FISCALPERIOD\"+e+\"_TEXT_KEY\",bundle:\"sap.ui.comp\"},\"FISCAL\")},a.initializeOperations(),a.prototype.providerDataUpdated=function(a,n){t.prototype.providerDataUpdated.apply(this,arguments);if(a.indexOf(\"Bukrs\")>-1){var i=n.Bukrs?n.Bukrs.items:null,s=n.Bukrs?n.Bukrs.ranges:null;i&&1===i.length?(this.setPending(!0),\"0001\"===i[0].key?e.sap.delayedCall(2e3,this,\"updateFiscalPeriods\",[[[new Date(\"2015-01-15T00:00:00.000Z\"),new Date(\"2015-04-15T00:00:00.000Z\")],[new Date(\"2015-04-15T00:00:00.000Z\"),new Date(\"2015-07-15T00:00:00.000Z\")],[new Date(\"2015-07-15T00:00:00.000Z\"),new Date(\"2015-10-15T00:00:00.000Z\")],[new Date(\"2015-10-15T00:00:00.000Z\"),new Date(\"2016-01-15T00:00:00.000Z\")]]]):e.sap.delayedCall(2e3,this,\"updateFiscalPeriods\",[[[new Date(\"2015-02-15T00:00:00.000Z\"),new Date(\"2015-05-15T00:00:00.000Z\")],[new Date(\"2015-05-15T00:00:00.000Z\"),new Date(\"2015-08-15T00:00:00.000Z\")],[new Date(\"2015-08-15T00:00:00.000Z\"),new Date(\"2015-11-15T00:00:00.000Z\")],[new Date(\"2015-11-15T00:00:00.000Z\"),new Date(\"2016-02-15T00:00:00.000Z\")]]])):s&&s.length>0?(this.setPending(!0),e.sap.delayedCall(2e3,this,\"updateFiscalPeriods\",[[[new Date(\"2015-03-15T00:00:00.000Z\"),new Date(\"2015-06-15T00:00:00.000Z\")],[new Date(\"2015-06-15T00:00:00.000Z\"),new Date(\"2015-09-15T00:00:00.000Z\")],[new Date(\"2015-09-15T00:00:00.000Z\"),new Date(\"2015-12-15T00:00:00.000Z\")],[new Date(\"2015-12-15T00:00:00.000Z\"),new Date(\"2016-03-15T00:00:00.000Z\")]]])):(this.updateFiscalPeriods(),this.setPending(!1))}},a.prototype.updateFiscalPeriods=function(e){for(var t=0;t<4;t++){var n=a.Operations[\"FISCALPERIOD\"+t];e&&e[t]?n.defaultValues=e[t]:n.defaultValues=null}this.updateOperations(),this.setPending(!1)},a.prototype.getDefaultOperation=function(){var e=this.getOperation(\"LASTYEARS\");return e.defaultValues=[2],e},a.prototype.getOperations=function(){for(var e=t.prototype.getOperations.apply(this,[]),n=0;n<4;n++){var i=a.Operations[\"FISCALPERIOD\"+n];i.defaultValues&&e.push(i)}return e},a},!0);",
	"web/ui5/test-resources/sap/ui/comp/smartfilterbar/daterange/SmartTable.view.xml": "<core:View xmlns:core=\"sap.ui.core\" xmlns=\"sap.m\" xmlns:smartFilterBar=\"sap.ui.comp.smartfilterbar\" xmlns:smartTable=\"sap.ui.comp.smarttable\" xmlns:html=\"http://www.w3.org/1999/xhtml\" xmlns:app=\"http://schemas.sap.com/sapui5/extension/sap.ui.core.CustomData/1\" controllerName=\"sap.ui.comp.sample.smarttable.SmartTable\"\n\theight=\"100%\"><VBox fitContainer=\"true\"><Button press=\"serializeFilterData\" text=\"Serialize Variant\"></Button><Button press=\"deserializeFilterData\" text=\"Deserialize Variant\"></Button><Button press=\"serializeDataSuiteFormat\" text=\"Serialize DataSuite\"></Button><Button press=\"deserializeDataSuiteFormat\" text=\"Deserialize DataSuite\"></Button><Button press=\"toggleTimeHandling\" text=\"toggle IgnoreTime\"></Button><Text id=\"debugtext\" text=\"\"></Text><smartFilterBar:SmartFilterBar id=\"smartFilterBar\" entityType=\"LineItems\" persistencyKey=\"SmartFilter_Explored\" basicSearchFieldName=\"Bukrs\" enableBasicSearch=\"true\" showClearOnFB=\"true\" showRestoreOnFB=\"true\"><smartFilterBar:customData><core:CustomData key=\"dateFormatSettings\" value='\\{\"UTC\":true,\"style\":\"short\"\\}' /></smartFilterBar:customData><smartFilterBar:controlConfiguration><smartFilterBar:ControlConfiguration key=\"Bukrs\"><smartFilterBar:defaultFilterValues><smartFilterBar:SelectOption low=\"0001\"></smartFilterBar:SelectOption></smartFilterBar:defaultFilterValues></smartFilterBar:ControlConfiguration><smartFilterBar:ControlConfiguration key=\"Gjahr\"><smartFilterBar:defaultFilterValues><smartFilterBar:SelectOption low=\"2014\"></smartFilterBar:SelectOption></smartFilterBar:defaultFilterValues></smartFilterBar:ControlConfiguration><smartFilterBar:ControlConfiguration key=\"BUDAT\" visibleInAdvancedArea=\"true\" conditionType=\"sap.ui.comp.config.condition.DateRangeType\" label=\"DateRangeType\"></smartFilterBar:ControlConfiguration><smartFilterBar:ControlConfiguration key=\"BLDAT\" visibleInAdvancedArea=\"true\" conditionType=\"{module: 'custom.MyFiscalDateRange', ignoreTime: true, operations: { filter: {path: 'category', contains: 'MONTH', exclude:true}}}\" label=\"custom.MyFiscalDateRange\"></smartFilterBar:ControlConfiguration></smartFilterBar:controlConfiguration><smartFilterBar:layoutData><FlexItemData shrinkFactor=\"0\" /></smartFilterBar:layoutData></smartFilterBar:SmartFilterBar><smartTable:SmartTable id=\"LineItemsSmartTable\" entitySet=\"LineItemsSet\" smartFilterId=\"smartFilterBar\" tableType=\"Table\" useExportToExcel=\"true\" useVariantManagement=\"false\" useTablePersonalisation=\"true\" header=\"Line Items\" showRowCount=\"true\" persistencyKey=\"SmartTableAnalytical_Explored\"\n\t\t\tenableAutoBinding=\"true\" app:useSmartField=\"true\"><smartTable:layoutData><FlexItemData growFactor=\"1\" baseSize=\"0%\" /></smartTable:layoutData></smartTable:SmartTable></VBox></core:View>\n"
}, "web/ui5/test-resources/sap/ui/comp/smartfilterbar/daterange/Component-preload");