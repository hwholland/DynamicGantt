sap.ui.require.preload({
	"web/ui5/test-resources/sap/viz/demokit/sample/CustomColor/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(o){\"use strict\";return o.extend(\"sap.viz.sample.CustomColor.Component\",{metadata:{rootView:\"sap.viz.sample.CustomColor.CustomColor\",includes:[\"../../css/exploredStyle.css\"],dependencies:{libs:[\"sap.viz\",\"sap.m\"]},config:{sample:{stretch:!0,files:[\"CustomColor.view.xml\",\"CustomColor.controller.js\",\"CustomerFormat.js\",\"InitPage.js\"]}}}})});",
	"web/ui5/test-resources/sap/viz/demokit/sample/CustomColor/CustomColor.controller.js": "sap.ui.define([\"jquery.sap.global\",\"sap/ui/core/mvc/Controller\",\"sap/ui/model/json/JSONModel\",\"./CustomerFormat\",\"./InitPage\"],function(e,t,a,i,o){\"use strict\";return t=t.extend(\"sap.viz.sample.CustomColor.CustomColor\",{dataPath:\"test-resources/sap/viz/demokit/dataset/milk_production_testing_data/revenue_cost_consume/medium.json\",settingsModel:{dataset:{name:\"Custom Color\",defaultSelected:0,values:[{name:\"Good / Bad\",value:[\"Revenue\"],vizProperties:{plotArea:{dataPointStyle:{rules:[{dataContext:{Revenue:{max:15e5}},properties:{color:\"sapUiChartPaletteSemanticBad\"},displayName:\"Revenue < 1.5M\"}],others:{properties:{color:\"sapUiChartPaletteSemanticGood\"},displayName:\"Revenue > 1.5M\"}}}}},{name:\"Color One Category\",value:[\"Revenue\"],vizProperties:{plotArea:{dataPointStyle:{rules:[{dataContext:{\"Store Name\":\"Alexei's Specialities\"},properties:{color:\"sapUiChartPaletteQualitativeHue1\"},displayName:\"Alexei’s Specialties\"}],others:{properties:{color:\"sapUiChartPaletteQualitativeHue2\"},displayName:\"Other Stores\"}}}}},{name:\"Color Two Series\",value:[\"Revenue\",\"Cost\"],vizProperties:{plotArea:{dataPointStyle:{rules:[{dataContext:{Revenue:\"*\"},properties:{color:\"sapUiChartPaletteSequentialHue1Light2\"},displayName:\"2013\"},{dataContext:{Cost:\"*\"},properties:{color:\"sapUiChartPaletteSequentialHue1\"},displayName:\"2014\"}],others:null}}}}]}},oVizFrame:null,feedValueAxis:null,onInit:function(e){this.initCustomFormat();var t=new a(this.settingsModel);this.getView().setModel(t);var s=this.oVizFrame=this.getView().byId(\"idVizFrame\");s.setVizProperties({plotArea:{dataLabel:{formatString:i.FIORI_LABEL_SHORTFORMAT_2,visible:!0},dataPointStyle:{rules:[{dataContext:{Revenue:{max:15e5}},properties:{color:\"sapUiChartPaletteSemanticBad\"},displayName:\"Revenue < 1.5M\"}],others:{properties:{color:\"sapUiChartPaletteSemanticGood\"},displayName:\"Revenue > 1.5M\"}}},valueAxis:{label:{formatString:i.FIORI_LABEL_SHORTFORMAT_10},title:{visible:!1}},categoryAxis:{title:{visible:!1}},title:{visible:!1}});var r=new a(this.dataPath);s.setModel(r);var l=this.getView().byId(\"idPopOver\");l.connect(s.getVizUid()),l.setFormatString(i.FIORI_LABEL_FORMAT_2),o.initPageSettings(this.getView())},onAfterRendering:function(){this.getView().byId(\"datasetRadioGroup\").setSelectedIndex(this.settingsModel.dataset.defaultSelected),this.feedValueAxis=this.getView().byId(\"feedValueAxis\")},onDatasetSelected:function(e){var t=e.getSource();if(this.oVizFrame&&t.getSelected()){var a=t.getBindingContext().getObject();this.oVizFrame.removeFeed(this.feedValueAxis),this.feedValueAxis.setValues(a.value),this.oVizFrame.addFeed(this.feedValueAxis),this.oVizFrame.setVizProperties(a.vizProperties)}},initCustomFormat:function(){i.registerCustomFormat()}})});",
	"web/ui5/test-resources/sap/viz/demokit/sample/CustomColor/CustomerFormat.js": "sap.ui.define([\"sap/viz/ui5/format/ChartFormatter\",\"sap/viz/ui5/api/env/Format\"],function(t,r){return{FIORI_LABEL_SHORTFORMAT_10:\"__UI5__ShortIntegerMaxFraction10\",FIORI_LABEL_FORMAT_2:\"__UI5__FloatMaxFraction2\",FIORI_LABEL_SHORTFORMAT_2:\"__UI5__ShortIntegerMaxFraction2\",FIORI_PERCENTAGE_FORMAT_2:\"__UI5__PercentageMaxFraction2\",MFS1:\"month_s1\",MFS2:\"month_s2\",MFS3:\"month_s3\",MFS4:\"month_s4\",MDFS1:\"month_day_s1\",MDFS2:\"month_day_s5\",MDFS3:\"month_day_s6\",YFS0:\"year_s0\",YFS1:\"year_s1\",YFS2:\"year_s2\",chartFormatter:null,registerCustomFormat:function(){var a=this.chartFormatter=t.getInstance();function e(t,r){a.registerCustomFormatter(t,function(t){return sap.ui.core.format.DateFormat.getDateTimeInstance({pattern:r}).format(t)})}a.registerCustomFormatter(this.FIORI_LABEL_SHORTFORMAT_10,function(t){return sap.ui.core.format.NumberFormat.getIntegerInstance({style:\"short\",maxFractionDigits:10}).format(t)}),a.registerCustomFormatter(this.FIORI_LABEL_FORMAT_2,function(t){return sap.ui.core.format.NumberFormat.getFloatInstance({style:\"Standard\",maxFractionDigits:2}).format(t)}),a.registerCustomFormatter(this.FIORI_LABEL_SHORTFORMAT_2,function(t){return sap.ui.core.format.NumberFormat.getIntegerInstance({style:\"short\",maxFractionDigits:2}).format(t)}),a.registerCustomFormatter(this.FIORI_PERCENTAGE_FORMAT_2,function(t){return sap.ui.core.format.NumberFormat.getPercentInstance({style:\"precent\",maxFractionDigits:2}).format(t)});var o={month_s1:\"M\",month_s2:\"MM\",month_s3:\"MMM\",month_s4:\"MMMM\",month_day_s1:\"MM/dd\",month_day_s5:\"MMM d\",month_day_s6:\"MMMM d\",year_s0:\"yy\",year_s1:\"yyy\",year_s2:\"yyyy\",YearMonthDay:\"MM/dd/yy\"};for(var n in o)o.hasOwnProperty(n)&&e(n,o[n]);r.numericFormatter(a)}}});",
	"web/ui5/test-resources/sap/viz/demokit/sample/CustomColor/InitPage.js": "sap.ui.define([],function(){return{initPageSettings:function(e){if(sap.ui.Device.system.phone){var t=e.byId(\"settingsPanel\");t&&t.setExpanded(!1)}if(jQuery.sap.sjax({type:\"HEAD\",url:sap.ui.resource(\"sap.suite.ui.commons\",\"library.js\")}).success){sap.ui.getCore().loadLibrary(\"sap.suite.ui.commons\");var i=e.byId(\"idVizFrame\"),n=new sap.suite.ui.commons.ChartContainerContent({icon:\"sap-icon://horizontal-bar-chart\",title:\"vizFrame Bar Chart Sample\",content:[i]}),s=new sap.suite.ui.commons.ChartContainer({content:[n]});s.setShowFullScreen(!0),s.setAutoAdjustHeight(!0),e.byId(\"chartFixFlex\").setFlexContent(s)}}}});",
	"web/ui5/test-resources/sap/viz/demokit/sample/CustomColor/CustomColor.view.xml": "<mvc:View controllerName=\"sap.viz.sample.CustomColor.CustomColor\" xmlns=\"sap.m\"\n    xmlns:viz=\"sap.viz.ui5.controls\" xmlns:layout=\"sap.ui.layout\"\n    xmlns:mvc=\"sap.ui.core.mvc\" xmlns:viz.feeds=\"sap.viz.ui5.controls.common.feeds\"\n    xmlns:viz.data=\"sap.viz.ui5.data\" height=\"100%\"><layout:FixFlex id='chartFixFlex' minFlexSize=\"250\"><layout:fixContent><Panel id='settingsPanel' class=\"panelStyle\" expandable=\"true\" expanded=\"true\" headerText=\"Settings\" width=\"auto\"><content><HBox class='settingsHBox'><VBox><Label text=\"{/dataset/name}\" design=\"Bold\" class='settingsLabel'></Label><RadioButtonGroup id='datasetRadioGroup'\n                                buttons=\"{path: '/dataset/values'}\"><buttons><RadioButton text=\"{name}\" select=\"onDatasetSelected\"/></buttons></RadioButtonGroup></VBox></HBox></content></Panel></layout:fixContent><layout:flexContent><viz:Popover id=\"idPopOver\"></viz:Popover><viz:VizFrame id=\"idVizFrame\" uiConfig=\"{applicationSet:'fiori'}\"\n                height='100%' width=\"100%\" vizType='bar'><viz:dataset><viz.data:FlattenedDataset data=\"{/milk}\"><viz.data:dimensions><viz.data:DimensionDefinition name=\"Store Name\"\n                                value=\"{Store Name}\" /></viz.data:dimensions><viz.data:measures><viz.data:MeasureDefinition name=\"Revenue\"\n                                value=\"{Revenue}\" /><viz.data:MeasureDefinition name=\"Cost\"\n                                value=\"{Cost}\" /></viz.data:measures></viz.data:FlattenedDataset></viz:dataset><viz:feeds><viz.feeds:FeedItem id=\"feedValueAxis\" uid=\"valueAxis\" type=\"Measure\"\n                        values=\"Revenue\" /><viz.feeds:FeedItem uid=\"categoryAxis\" type=\"Dimension\"\n                        values=\"Store Name\" /></viz:feeds></viz:VizFrame></layout:flexContent></layout:FixFlex></mvc:View>"
}, "web/ui5/test-resources/sap/viz/demokit/sample/CustomColor/Component-preload");