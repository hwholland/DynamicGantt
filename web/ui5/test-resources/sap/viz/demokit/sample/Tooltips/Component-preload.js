sap.ui.require.preload({
	"web/ui5/test-resources/sap/viz/demokit/sample/Tooltips/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(s){\"use strict\";return s.extend(\"sap.viz.sample.Tooltips.Component\",{metadata:{rootView:\"sap.viz.sample.Tooltips.Tooltips\",includes:[\"../../css/exploredStyle.css\"],dependencies:{libs:[\"sap.viz\",\"sap.m\"]},config:{sample:{stretch:!0,files:[\"Tooltips.view.xml\",\"Tooltips.controller.js\",\"CustomerFormat.js\",\"InitPage.js\"]}}}})});",
	"web/ui5/test-resources/sap/viz/demokit/sample/Tooltips/CustomerFormat.js": "sap.ui.define([\"sap/viz/ui5/format/ChartFormatter\",\"sap/viz/ui5/api/env/Format\"],function(t,r){return{FIORI_LABEL_SHORTFORMAT_10:\"__UI5__ShortIntegerMaxFraction10\",FIORI_LABEL_FORMAT_2:\"__UI5__FloatMaxFraction2\",FIORI_LABEL_SHORTFORMAT_2:\"__UI5__ShortIntegerMaxFraction2\",FIORI_PERCENTAGE_FORMAT_2:\"__UI5__PercentageMaxFraction2\",MFS1:\"month_s1\",MFS2:\"month_s2\",MFS3:\"month_s3\",MFS4:\"month_s4\",MDFS1:\"month_day_s1\",MDFS2:\"month_day_s5\",MDFS3:\"month_day_s6\",YFS0:\"year_s0\",YFS1:\"year_s1\",YFS2:\"year_s2\",chartFormatter:null,registerCustomFormat:function(){var a=this.chartFormatter=t.getInstance();function e(t,r){a.registerCustomFormatter(t,function(t){return sap.ui.core.format.DateFormat.getDateTimeInstance({pattern:r}).format(t)})}a.registerCustomFormatter(this.FIORI_LABEL_SHORTFORMAT_10,function(t){return sap.ui.core.format.NumberFormat.getIntegerInstance({style:\"short\",maxFractionDigits:10}).format(t)}),a.registerCustomFormatter(this.FIORI_LABEL_FORMAT_2,function(t){return sap.ui.core.format.NumberFormat.getFloatInstance({style:\"Standard\",maxFractionDigits:2}).format(t)}),a.registerCustomFormatter(this.FIORI_LABEL_SHORTFORMAT_2,function(t){return sap.ui.core.format.NumberFormat.getIntegerInstance({style:\"short\",maxFractionDigits:2}).format(t)}),a.registerCustomFormatter(this.FIORI_PERCENTAGE_FORMAT_2,function(t){return sap.ui.core.format.NumberFormat.getPercentInstance({style:\"precent\",maxFractionDigits:2}).format(t)});var o={month_s1:\"M\",month_s2:\"MM\",month_s3:\"MMM\",month_s4:\"MMMM\",month_day_s1:\"MM/dd\",month_day_s5:\"MMM d\",month_day_s6:\"MMMM d\",year_s0:\"yy\",year_s1:\"yyy\",year_s2:\"yyyy\",YearMonthDay:\"MM/dd/yy\"};for(var n in o)o.hasOwnProperty(n)&&e(n,o[n]);r.numericFormatter(a)}}});",
	"web/ui5/test-resources/sap/viz/demokit/sample/Tooltips/InitPage.js": "sap.ui.define([],function(){return{initPageSettings:function(e){if(sap.ui.Device.system.phone){var t=e.byId(\"settingsPanel\");t&&t.setExpanded(!1)}if(jQuery.sap.sjax({type:\"HEAD\",url:sap.ui.resource(\"sap.suite.ui.commons\",\"library.js\")}).success){sap.ui.getCore().loadLibrary(\"sap.suite.ui.commons\");var i=e.byId(\"idVizFrame\"),n=new sap.suite.ui.commons.ChartContainerContent({icon:\"sap-icon://horizontal-bar-chart\",title:\"vizFrame Bar Chart Sample\",content:[i]}),s=new sap.suite.ui.commons.ChartContainer({content:[n]});s.setShowFullScreen(!0),s.setAutoAdjustHeight(!0),e.byId(\"chartFixFlex\").setFlexContent(s)}}}});",
	"web/ui5/test-resources/sap/viz/demokit/sample/Tooltips/Tooltips.controller.js": "sap.ui.define([\"jquery.sap.global\",\"sap/ui/core/mvc/Controller\",\"sap/ui/model/json/JSONModel\",\"./CustomerFormat\",\"./InitPage\"],function(t,e,i,o,a){\"use strict\";return e=e.extend(\"sap.viz.sample.Tooltips.Tooltips\",{dataPath:\"test-resources/sap/viz/demokit/dataset/milk_production_testing_data/revenue_cost_consume\",onInit:function(t){this.initCustomFormat();var e=this.getView().byId(\"idVizFrame\");e.setVizProperties({interaction:{behaviorType:null},plotArea:{dataLabel:{formatString:o.FIORI_LABEL_SHORTFORMAT_2,visible:!0}},valueAxis:{label:{formatString:o.FIORI_LABEL_SHORTFORMAT_10},title:{visible:!1}},categoryAxis:{title:{visible:!1}},title:{visible:!1,text:\"Revenue by City and Store Name\"},tooltip:{visible:!0,formatString:o.FIORI_LABEL_FORMAT_2,bodyDimensionLabel:\"Stroe Name\",bodyDimensionValue:\"Store Name\"}});var s=new i(this.dataPath+\"/large.json\");e.setModel(s);var r=this.getView().byId(\"idPopOver\");r.connect(e.getVizUid()),r.setFormatString(o.FIORI_LABEL_FORMAT_2),a.initPageSettings(this.getView())},initCustomFormat:function(){o.registerCustomFormat()}})});",
	"web/ui5/test-resources/sap/viz/demokit/sample/Tooltips/Tooltips.view.xml": "<mvc:View controllerName=\"sap.viz.sample.Tooltips.Tooltips\" xmlns=\"sap.m\"\n    xmlns:viz=\"sap.viz.ui5.controls\" xmlns:layout=\"sap.ui.layout\"\n    xmlns:mvc=\"sap.ui.core.mvc\" xmlns:viz.feeds=\"sap.viz.ui5.controls.common.feeds\"\n    xmlns:viz.data=\"sap.viz.ui5.data\" height=\"100%\"><layout:FixFlex id='chartFixFlex' minFlexSize=\"250\"><layout:flexContent><viz:Popover id=\"idPopOver\"></viz:Popover><viz:VizFrame id=\"idVizFrame\" uiConfig=\"{applicationSet:'fiori'}\"\n                height='100%' width=\"100%\" vizType='bar'><viz:dataset><viz.data:FlattenedDataset data=\"{/milk}\"><viz.data:dimensions><viz.data:DimensionDefinition name=\"Store Name\"\n                                value=\"{Store Name}\" /></viz.data:dimensions><viz.data:measures><viz.data:MeasureDefinition name=\"Revenue\"\n                                value=\"{Revenue}\" /><viz.data:MeasureDefinition name=\"Cost\"\n                                value=\"{Cost}\" /></viz.data:measures></viz.data:FlattenedDataset></viz:dataset><viz:feeds><viz.feeds:FeedItem uid=\"valueAxis\" type=\"Measure\"\n                        values=\"Revenue\" /><viz.feeds:FeedItem uid=\"categoryAxis\" type=\"Dimension\"\n                        values=\"Store Name\" /></viz:feeds></viz:VizFrame></layout:flexContent></layout:FixFlex></mvc:View>"
}, "web/ui5/test-resources/sap/viz/demokit/sample/Tooltips/Component-preload");