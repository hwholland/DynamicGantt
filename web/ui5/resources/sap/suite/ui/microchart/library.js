/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2016 SAP SE. All rights reserved
	
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/library','sap/ui/core/Core','sap/m/library'],function(q,c,C,l){"use strict";sap.ui.getCore().initLibrary({name:"sap.suite.ui.microchart",version:"1.38.33",dependencies:["sap.ui.core","sap.m"],types:["sap.suite.ui.microchart.AreaMicroChartViewType","sap.suite.ui.microchart.BulletMicroChartModeType","sap.suite.ui.microchart.CommonBackgroundType","sap.suite.ui.microchart.ComparisonMicroChartViewType","sap.suite.ui.microchart.LoadStateType"],interfaces:[],controls:["sap.suite.ui.microchart.AreaMicroChart","sap.suite.ui.microchart.BulletMicroChart","sap.suite.ui.microchart.ColumnMicroChart","sap.suite.ui.microchart.ComparisonMicroChart","sap.suite.ui.microchart.DeltaMicroChart","sap.suite.ui.microchart.HarveyBallMicroChart","sap.suite.ui.microchart.RadialMicroChart"],elements:["sap.suite.ui.microchart.AreaMicroChartPoint","sap.suite.ui.microchart.AreaMicroChartItem","sap.suite.ui.microchart.AreaMicroChartLabel","sap.suite.ui.microchart.BulletMicroChartData","sap.suite.ui.microchart.ColumnMicroChartData","sap.suite.ui.microchart.ColumnMicroChartLabel","sap.suite.ui.microchart.ComparisonMicroChartData","sap.suite.ui.microchart.HarveyBallMicroChartItem"]});sap.suite.ui.microchart.AreaMicroChartViewType={Normal:"Normal",Wide:"Wide"};sap.suite.ui.microchart.BulletMicroChartModeType={Actual:"Actual",Delta:"Delta"};sap.suite.ui.microchart.CommonBackgroundType={Lightest:"Lightest",ExtraLight:"ExtraLight",Light:"Light",MediumLight:"MediumLight",Medium:"Medium",Dark:"Dark",ExtraDark:"ExtraDark",Darkest:"Darkest",Transparent:"Transparent"};sap.suite.ui.microchart.ComparisonMicroChartViewType={Normal:"Normal",Wide:"Wide"};sap.suite.ui.microchart.LoadStateType={Loading:"Loading",Loaded:"Loaded",Failed:"Failed",Disabled:"Disabled"};sap.suite.ui.microchart._aStandardMarginClassNames=["sapUiTinyMargin","sapUiSmallMargin","sapUiMediumMargin","sapUiLargeMargin","sapUiTinyMarginBeginEnd","sapUiTinyMarginTopBottom","sapUiSmallMarginBeginEnd","sapUiSmallMarginTopBottom","sapUiMediumMarginBeginEnd","sapUiMediumMarginTopBottom","sapUiLargeMarginBeginEnd","sapUiLargeMarginTopBottom","sapUiTinyMarginTop","sapUiTinyMarginBottom","sapUiTinyMarginBegin","sapUiTinyMarginEnd","sapUiSmallMarginTop","sapUiSmallMarginBottom","sapUiSmallMarginBegin","sapUiSmallMarginEnd","sapUiMediumMarginTop","sapUiMediumMarginBottom","sapUiMediumMarginBegin","sapUiMediumMarginEnd","sapUiLargeMarginTop","sapUiLargeMarginBottom","sapUiLargeMarginBegin","sapUiLargeMarginEnd","sapUiResponsiveMargin","sapUiNoMargin","sapUiNoMarginTop","sapUiNoMarginBottom","sapUiNoMarginBegin","sapUiNoMarginEnd"];sap.suite.ui.microchart._isInGenericTile=function(o){var p=o.getParent();if(!p){return false;}if(p instanceof sap.m.TileContent||p instanceof sap.m.GenericTile){if(p instanceof sap.m.TileContent){if(this._isInGenericTile(p)){return true;}}if(p instanceof sap.m.GenericTile){return true;}}else if(this._isInGenericTile(p)){return true;}};sap.suite.ui.microchart._removeStandardMargins=function(o){for(var i=0;i<sap.suite.ui.microchart._aStandardMarginClassNames.length;i++){if(o.hasStyleClass(sap.suite.ui.microchart._aStandardMarginClassNames[i])){o.removeStyleClass(sap.suite.ui.microchart._aStandardMarginClassNames[i]);}}};sap.suite.ui.microchart._passParentContextToChild=function(o,a){if(o.data("_parentRenderingContext")){a.data("_parentRenderingContext",o.data("_parentRenderingContext"));}else if(q.isFunction(o.getParent)){a.data("_parentRenderingContext",o.getParent());}};sap.suite.ui.microchart._checkControlIsVisible=function(a,b){var p=10,d=10,t=500;function i(){return a.getVisible()&&a.getDomRef()&&a.$().is(":visible")&&a.getDomRef().getBoundingClientRect().width!==0;}function e(){if(i()){b.call(a);}else if(p<t){d*=2;p+=d;f(d);}}function f(g){q.sap.delayedCall(g,null,e);}if(i()){b.call(a);}else{f(d);}};return sap.suite.ui.microchart;});
