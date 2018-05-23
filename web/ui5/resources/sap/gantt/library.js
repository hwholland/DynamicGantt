/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/library','sap/gantt/misc/Utility','sap/ui/base/DataType'],function(q,l,U,D){"use strict";sap.ui.getCore().initLibrary({name:"sap.gantt",dependencies:["sap.ui.core","sap.ui.layout","sap.ui.table","sap.m","sap.ui.unified"],types:["sap.gantt.control.ToolbarType","sap.gantt.SelectionMode","sap.gantt.shape.ShapeCategory","sap.gantt.def.filter.MorphologyOperator","sap.gantt.def.filter.ColorMatrixValue","sap.gantt.shape.ext.rls.RelationshipType"],interfaces:["sap.gantt.GanttChartBase"],controls:["sap.gantt.control.Toolbar","sap.gantt.GanttChart","sap.gantt.GanttChartWithTable","sap.gantt.GanttChartContainer"],elements:["sap.gantt.config.TimeHorizon","sap.gantt.config.TimeAxis","sap.gantt.config.ToolbarGroup","sap.gantt.config.Mode","sap.gantt.config.ModeGroup","sap.gantt.config.LayoutGroup","sap.gantt.config.ExpandChart","sap.gantt.config.ExpandChartGroup","sap.gantt.config.TimeZoomGroup","sap.gantt.config.ToolbarScheme","sap.gantt.config.Hierarchy","sap.gantt.config.HierarchyColumn","sap.gantt.config.ColumnAttribute","sap.gantt.config.GanttChartLayout","sap.gantt.config.ContainerLayout","sap.gantt.config.SettingItem","sap.gantt.config.SettingGroup","sap.gantt.config.ObjectType","sap.gantt.config.ChartScheme","sap.gantt.config.Locale","sap.gantt.config.Shape"],noLibraryCSS:false,version:"1.38.22"});this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.gantt");sap.gantt.SelectionMode={MultiWithKeyboard:"MultiWithKeyboard",Multiple:"Multiple",Single:"Single",None:"None"};sap.gantt.control.ToolbarType={Global:"GLOBAL",Local:"LOCAL"};sap.gantt.ValueSVGPaintServer=D.createType('sap.gantt.ValueSVGPaintServer',{isValid:function(v){var V=sap.m.ValueCSSColor.isValid(v);if(!V){V=/(?:url\(['|"]?)(.*?)(?:['|"]?\))|^[@|#](.*?)$|initial|transparent|none|inherit/.test(v);}return V;}},D.getType('string'));sap.gantt.ValueSVGPaintServer.setNormalizer(function(v){q.sap.require("sap.ui.core.theming.Parameters");if(!v){return v;}if(v.substr(0,1)==="@"){v=v.substring(1);}var r=sap.ui.core.theming.Parameters.get(v)||v;return r;});sap.gantt.shape.ShapeCategory={InRowShape:"inRowShape",Relationship:"relationship"};sap.gantt.def.filter.MorphologyOperator={Dilate:"dilate",Erode:"erode"};sap.gantt.def.filter.ColorMatrixValue={AllToWhite:"-1 0 0 0 1, 0 -1 0 0 1, 0 0 -1 0 1, 0 0 0 1 0",AllToBlack:"-1 0 0 0 0, 0 -1 0 0 0, 0 0 -1 0 0, 0 0 0 1 0"};sap.gantt.shape.ext.rls.RelationshipType={FinishToFinish:0,FinishToStart:1,StartToFinish:2,StartToStart:3};sap.gantt.config.TimeUnit={minute:"d3.time.minute",hour:"d3.time.hour",day:"d3.time.day",week:"d3.time.week",month:"d3.time.month",year:"d3.time.year"};sap.gantt.config.DEFAULT_PLAN_HORIZON=new sap.gantt.config.TimeHorizon({startTime:new Date((new Date()).getTime()-31536000000),endTime:new Date((new Date()).getTime()+31536000000)});sap.gantt.config.DEFAULT_INIT_HORIZON=new sap.gantt.config.TimeHorizon({startTime:new Date((new Date()).getTime()-2628000000),endTime:new Date((new Date()).getTime()+2628000000)});sap.gantt.config.DEFAULT_TIME_ZOOM_STRATEGY={"5min":{innerInterval:{unit:sap.gantt.config.TimeUnit.minute,span:5,range:90},largeInterval:{unit:sap.gantt.config.TimeUnit.day,span:1,format:"cccc d.M.yyyy"},smallInterval:{unit:sap.gantt.config.TimeUnit.minute,span:5,format:"HH:mm"}},"10min":{innerInterval:{unit:sap.gantt.config.TimeUnit.minute,span:10,range:90},largeInterval:{unit:sap.gantt.config.TimeUnit.day,span:1,format:"cccc d.M.yyyy"},smallInterval:{unit:sap.gantt.config.TimeUnit.minute,span:10,format:"HH:mm"}},"15min":{innerInterval:{unit:sap.gantt.config.TimeUnit.minute,span:15,range:90},largeInterval:{unit:sap.gantt.config.TimeUnit.day,span:1,format:"cccc d.M.yyyy"},smallInterval:{unit:sap.gantt.config.TimeUnit.minute,span:15,format:"HH:mm"}},"30min":{innerInterval:{unit:sap.gantt.config.TimeUnit.minute,span:30,range:90},largeInterval:{unit:sap.gantt.config.TimeUnit.day,span:1,format:"cccc d.M.yyyy"},smallInterval:{unit:sap.gantt.config.TimeUnit.minute,span:30,format:"HH:mm"}},"1hour":{innerInterval:{unit:sap.gantt.config.TimeUnit.hour,span:1,range:90},largeInterval:{unit:sap.gantt.config.TimeUnit.day,span:1,format:"cccc d.M.yyyy"},smallInterval:{unit:sap.gantt.config.TimeUnit.hour,span:1,format:"HH:mm"}},"2hour":{innerInterval:{unit:sap.gantt.config.TimeUnit.hour,span:2,range:90},largeInterval:{unit:sap.gantt.config.TimeUnit.day,span:1,format:"cccc d.M.yyyy"},smallInterval:{unit:sap.gantt.config.TimeUnit.hour,span:2,format:"HH:mm"}},"4hour":{innerInterval:{unit:sap.gantt.config.TimeUnit.hour,span:4,range:90},largeInterval:{unit:sap.gantt.config.TimeUnit.day,span:1,format:"cccc d.M.yyyy"},smallInterval:{unit:sap.gantt.config.TimeUnit.hour,span:4,format:"HH:mm"}},"6hour":{innerInterval:{unit:sap.gantt.config.TimeUnit.hour,span:6,range:90},largeInterval:{unit:sap.gantt.config.TimeUnit.day,span:1,format:"cccc d.M.yyyy"},smallInterval:{unit:sap.gantt.config.TimeUnit.hour,span:6,format:"HH:mm"}},"12hour":{innerInterval:{unit:sap.gantt.config.TimeUnit.hour,span:12,range:90},largeInterval:{unit:sap.gantt.config.TimeUnit.day,span:1,format:"cccc d.M.yyyy"},smallInterval:{unit:sap.gantt.config.TimeUnit.hour,span:12,format:"HH:mm"}},"1day":{innerInterval:{unit:sap.gantt.config.TimeUnit.day,span:1,range:90},largeInterval:{unit:sap.gantt.config.TimeUnit.month,span:1,format:"MMMM yyyy"},smallInterval:{unit:sap.gantt.config.TimeUnit.day,span:1,format:sap.ui.getCore().getConfiguration().getRTL()?".d.M":"d.M."}},"2day":{innerInterval:{unit:sap.gantt.config.TimeUnit.day,span:2,range:90},largeInterval:{unit:sap.gantt.config.TimeUnit.month,span:1,format:"MMMM yyyy"},smallInterval:{unit:sap.gantt.config.TimeUnit.day,span:2,format:sap.ui.getCore().getConfiguration().getRTL()?".d.M":"d.M."}},"4day":{innerInterval:{unit:sap.gantt.config.TimeUnit.day,span:4,range:90},largeInterval:{unit:sap.gantt.config.TimeUnit.month,span:1,format:"MMMM yyyy"},smallInterval:{unit:sap.gantt.config.TimeUnit.day,span:4,format:sap.ui.getCore().getConfiguration().getRTL()?".d.M":"d.M."}},"1week":{innerInterval:{unit:sap.gantt.config.TimeUnit.week,span:1,range:90},largeInterval:{unit:sap.gantt.config.TimeUnit.month,span:1,format:"MMMM yyyy"},smallInterval:{unit:sap.gantt.config.TimeUnit.week,span:1,format:sap.ui.getCore().getConfiguration().getRTL()?".d.M":"d.M."}},"2week":{innerInterval:{unit:sap.gantt.config.TimeUnit.week,span:2,range:90},largeInterval:{unit:sap.gantt.config.TimeUnit.month,span:1,format:"MMMM yyyy"},smallInterval:{unit:sap.gantt.config.TimeUnit.week,span:2,format:sap.ui.getCore().getConfiguration().getRTL()?".d.M":"d.M."}},"1month":{innerInterval:{unit:sap.gantt.config.TimeUnit.month,span:1,range:90},largeInterval:{unit:sap.gantt.config.TimeUnit.month,span:6,format:"MMMM yyyy"},smallInterval:{unit:sap.gantt.config.TimeUnit.month,span:1,format:sap.ui.getCore().getConfiguration().getRTL()?".d.M":"d.M."}},"2month":{innerInterval:{unit:sap.gantt.config.TimeUnit.month,span:2,range:90},largeInterval:{unit:sap.gantt.config.TimeUnit.month,span:6,format:"MMMM yyyy"},smallInterval:{unit:sap.gantt.config.TimeUnit.month,span:2,format:sap.ui.getCore().getConfiguration().getRTL()?".d.M":"d.M."}},"4month":{innerInterval:{unit:sap.gantt.config.TimeUnit.month,span:4,range:90},largeInterval:{unit:sap.gantt.config.TimeUnit.year,span:1,format:"yyyy"},smallInterval:{unit:sap.gantt.config.TimeUnit.month,span:4,format:"MMMM"}},"6month":{innerInterval:{unit:sap.gantt.config.TimeUnit.month,span:6,range:90},largeInterval:{unit:sap.gantt.config.TimeUnit.year,span:1,format:"yyyy"},smallInterval:{unit:sap.gantt.config.TimeUnit.month,span:6,format:"MMMM"}},"1year":{innerInterval:{unit:sap.gantt.config.TimeUnit.year,span:1,range:90},largeInterval:{unit:sap.gantt.config.TimeUnit.year,span:10,format:"yyyy"},smallInterval:{unit:sap.gantt.config.TimeUnit.year,span:1,format:"MMMM"}},"2year":{innerInterval:{unit:sap.gantt.config.TimeUnit.year,span:2,range:90},largeInterval:{unit:sap.gantt.config.TimeUnit.year,span:10,format:"yyyy"},smallInterval:{unit:sap.gantt.config.TimeUnit.year,span:2,format:"MMMM"}},"5year":{innerInterval:{unit:sap.gantt.config.TimeUnit.year,span:5,range:90},largeInterval:{unit:sap.gantt.config.TimeUnit.year,span:10,format:"yyyy"},smallInterval:{unit:sap.gantt.config.TimeUnit.year,span:5,format:"MMMM"}}};sap.gantt.config.DEFAULT_TIME_AXIS=new sap.gantt.config.TimeAxis();sap.gantt.config.DEFAULT_MODE_KEY="sap_mode";sap.gantt.config.DEFAULT_MODE=new sap.gantt.config.Mode({key:sap.gantt.config.DEFAULT_MODE_KEY,text:this._oRb.getText("TLTP_DEFAULT"),icon:"sap-icon://status-positive"});sap.gantt.config.DEFAULT_MODES=[sap.gantt.config.DEFAULT_MODE];sap.gantt.config.DEFAULT_CHART_SCHEME_KEY="sap_main";sap.gantt.config.DEFAULT_CHART_SCHEME=new sap.gantt.config.ChartScheme({key:sap.gantt.config.DEFAULT_CHART_SCHEME_KEY,name:"Default",rowSpan:1});sap.gantt.config.DEFAULT_CHART_SCHEMES=[sap.gantt.config.DEFAULT_CHART_SCHEME];sap.gantt.config.DEFAULT_OBJECT_TYPE_KEY="sap_object";sap.gantt.config.DEFAULT_OBJECT_TYPE=new sap.gantt.config.ObjectType({key:sap.gantt.config.DEFAULT_OBJECT_TYPE_KEY,description:"Default",mainChartSchemeKey:sap.gantt.config.DEFAULT_CHART_SCHEME_KEY});sap.gantt.config.DEFAULT_OBJECT_TYPES=[sap.gantt.config.DEFAULT_OBJECT_TYPE];sap.gantt.config.SETTING_ITEM_ENABLE_NOW_LINE_KEY="sap_enableNowLine";sap.gantt.config.SETTING_ITEM_ENABLE_NOW_LINE=new sap.gantt.config.SettingItem({key:sap.gantt.config.SETTING_ITEM_ENABLE_NOW_LINE_KEY,checked:true,displayText:this._oRb.getText("XCKL_NOW_LINE"),tooltip:this._oRb.getText("TLTP_NOW_LINE")});sap.gantt.config.SETTING_ITEM_ENABLE_CURSOR_LINE_KEY="sap_enableCursorLine";sap.gantt.config.SETTING_ITEM_ENABLE_CURSOR_LINE=new sap.gantt.config.SettingItem({key:sap.gantt.config.SETTING_ITEM_ENABLE_CURSOR_LINE_KEY,checked:true,displayText:this._oRb.getText("XCKL_CURSOR_LINE"),tooltip:this._oRb.getText("TLTP_CURSOR_LINE")});sap.gantt.config.SETTING_ITEM_ENABLE_VERTICAL_LINE_KEY="sap_enableVerticalLine";sap.gantt.config.SETTING_ITEM_ENABLE_VERTICAL_LINE=new sap.gantt.config.SettingItem({key:sap.gantt.config.SETTING_ITEM_ENABLE_VERTICAL_LINE_KEY,checked:true,displayText:this._oRb.getText("XCKL_VERTICAL_LINE"),tooltip:this._oRb.getText("TLTP_VERTICAL_LINE")});sap.gantt.config.SETTING_ITEM_ENABLE_TIME_SCROLL_SYNC_KEY="sap_enableTimeScrollSync";sap.gantt.config.SETTING_ITEM_ENABLE_TIME_SCROLL_SYNC=new sap.gantt.config.SettingItem({key:sap.gantt.config.SETTING_ITEM_ENABLE_TIME_SCROLL_SYNC_KEY,checked:true,displayText:this._oRb.getText("XCKL_TIME_SCROLL_SYNC"),tooltip:this._oRb.getText("TLTP_TIME_SCROLL_SYNC")});sap.gantt.config.DEFAULT_TOOLBAR_SETTING_ITEMS=[sap.gantt.config.SETTING_ITEM_ENABLE_NOW_LINE,sap.gantt.config.SETTING_ITEM_ENABLE_CURSOR_LINE,sap.gantt.config.SETTING_ITEM_ENABLE_VERTICAL_LINE,sap.gantt.config.SETTING_ITEM_ENABLE_TIME_SCROLL_SYNC];sap.gantt.config.EMPTY_TOOLBAR_SCHEME_KEY="sap_empty_toolbar";sap.gantt.config.EMPTY_TOOLBAR_SCHEME=new sap.gantt.config.ToolbarScheme({key:sap.gantt.config.EMPTY_TOOLBAR_SCHEME_KEY,customToolbarItems:new sap.gantt.config.ToolbarGroup({position:"L1",overflowPriority:sap.m.OverflowToolbarPriority.High})});sap.gantt.config.DEFAULT_CONTAINER_TOOLBAR_SCHEME_KEY="sap_container_toolbar";sap.gantt.config.DEFAULT_CONTAINER_TOOLBAR_SCHEME=new sap.gantt.config.ToolbarScheme({key:sap.gantt.config.DEFAULT_CONTAINER_TOOLBAR_SCHEME_KEY,customToolbarItems:new sap.gantt.config.ToolbarGroup({position:"L1",overflowPriority:sap.m.OverflowToolbarPriority.High}),timeZoom:new sap.gantt.config.TimeZoomGroup({position:"R2",overflowPriority:sap.m.OverflowToolbarPriority.NeverOverflow}),settings:new sap.gantt.config.SettingGroup({position:"R1",overflowPriority:sap.m.OverflowToolbarPriority.Low,items:sap.gantt.config.DEFAULT_TOOLBAR_SETTING_ITEMS})});sap.gantt.config.DEFAULT_GANTTCHART_TOOLBAR_SCHEME_KEY="sap_ganttchart_toolbar";sap.gantt.config.DEFAULT_GANTTCHART_TOOLBAR_SCHEME=new sap.gantt.config.ToolbarScheme({key:sap.gantt.config.DEFAULT_GANTTCHART_TOOLBAR_SCHEME_KEY,customToolbarItems:new sap.gantt.config.ToolbarGroup({position:"L2",overflowPriority:sap.m.OverflowToolbarPriority.High}),expandTree:new sap.gantt.config.ToolbarGroup({position:"L3",overflowPriority:sap.m.OverflowToolbarPriority.Low})});sap.gantt.config.DEFAULT_GANTTCHART_TOOLBAR_SCHEMES=[sap.gantt.config.DEFAULT_GANTTCHART_TOOLBAR_SCHEME,sap.gantt.config.EMPTY_TOOLBAR_SCHEME];sap.gantt.config.DEFAULT_CONTAINER_TOOLBAR_SCHEMES=[sap.gantt.config.DEFAULT_CONTAINER_TOOLBAR_SCHEME,sap.gantt.config.EMPTY_TOOLBAR_SCHEME];sap.gantt.config.DEFAULT_HIERARCHY_KEY="sap_hierarchy";sap.gantt.config.DEFAULT_HIERARCHY=new sap.gantt.config.Hierarchy();sap.gantt.config.DEFAULT_HIERARCHYS=[sap.gantt.config.DEFAULT_HIERARCHY];sap.gantt.config.DEFAULT_CONTAINER_SINGLE_LAYOUT_KEY="sap_container_layout_single";sap.gantt.config.DEFAULT_CONTAINER_SINGLE_LAYOUT=new sap.gantt.config.ContainerLayout({key:sap.gantt.config.DEFAULT_CONTAINER_SINGLE_LAYOUT_KEY,text:this._oRb.getText("XLST_SINGLE_LAYOUT"),toolbarSchemeKey:sap.gantt.config.DEFAULT_CONTAINER_TOOLBAR_SCHEME_KEY,ganttChartLayouts:[new sap.gantt.config.GanttChartLayout({activeModeKey:sap.gantt.config.DEFAULT_MODE_KEY,hierarchyKey:sap.gantt.config.DEFAULT_HIERARCHY_KEY})]});sap.gantt.config.DEFAULT_CONTAINER_DUAL_LAYOUT_KEY="sap_container_layout_dual";sap.gantt.config.DEFAULT_CONTAINER_DUAL_LAYOUT=new sap.gantt.config.ContainerLayout({key:sap.gantt.config.DEFAULT_CONTAINER_DUAL_LAYOUT_KEY,text:this._oRb.getText("XLST_DUAL_LAYOUT"),toolbarSchemeKey:sap.gantt.config.DEFAULT_CONTAINER_TOOLBAR_SCHEME_KEY,ganttChartLayouts:[new sap.gantt.config.GanttChartLayout({activeModeKey:sap.gantt.config.DEFAULT_MODE_KEY,hierarchyKey:sap.gantt.config.DEFAULT_HIERARCHY_KEY}),new sap.gantt.config.GanttChartLayout({activeModeKey:sap.gantt.config.DEFAULT_MODE_KEY,hierarchyKey:sap.gantt.config.DEFAULT_HIERARCHY_KEY})]});sap.gantt.config.DEFAULT_CONTAINER_LAYOUTS=[sap.gantt.config.DEFAULT_CONTAINER_SINGLE_LAYOUT,sap.gantt.config.DEFAULT_CONTAINER_DUAL_LAYOUT];sap.gantt.config.DEFAULT_LOCALE_CET=new sap.gantt.config.Locale({timeZone:"CET",utcdiff:"000000",utcsign:"+"});sap.gantt.config.DEFAULT_EMPTY_OBJECT={};sap.gantt.DIMENSION_LEGEND_NIL="NIL";return sap.gantt;});
