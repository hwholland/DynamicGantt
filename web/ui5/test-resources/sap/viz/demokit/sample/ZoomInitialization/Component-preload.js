sap.ui.require.preload({
	"web/ui5/test-resources/sap/viz/demokit/sample/ZoomInitialization/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(i){\"use strict\";return i.extend(\"sap.viz.sample.ZoomInitialization.Component\",{metadata:{rootView:\"sap.viz.sample.ZoomInitialization.ZoomInitialization\",includes:[\"../../css/exploredStyle.css\"],dependencies:{libs:[\"sap.viz\",\"sap.m\"]},config:{sample:{stretch:!0,files:[\"ZoomInitialization.view.xml\",\"ZoomInitialization.controller.js\",\"CustomerFormat.js\",\"InitPage.js\"]}}}})});",
	"web/ui5/test-resources/sap/viz/demokit/sample/ZoomInitialization/CustomerFormat.js": "sap.ui.define([\"sap/viz/ui5/format/ChartFormatter\",\"sap/viz/ui5/api/env/Format\"],function(t,r){return{FIORI_LABEL_SHORTFORMAT_10:\"__UI5__ShortIntegerMaxFraction10\",FIORI_LABEL_FORMAT_2:\"__UI5__FloatMaxFraction2\",FIORI_LABEL_SHORTFORMAT_2:\"__UI5__ShortIntegerMaxFraction2\",FIORI_PERCENTAGE_FORMAT_2:\"__UI5__PercentageMaxFraction2\",MFS1:\"month_s1\",MFS2:\"month_s2\",MFS3:\"month_s3\",MFS4:\"month_s4\",MDFS1:\"month_day_s1\",MDFS2:\"month_day_s5\",MDFS3:\"month_day_s6\",YFS0:\"year_s0\",YFS1:\"year_s1\",YFS2:\"year_s2\",chartFormatter:null,registerCustomFormat:function(){var a=this.chartFormatter=t.getInstance();function e(t,r){a.registerCustomFormatter(t,function(t){return sap.ui.core.format.DateFormat.getDateTimeInstance({pattern:r}).format(t)})}a.registerCustomFormatter(this.FIORI_LABEL_SHORTFORMAT_10,function(t){return sap.ui.core.format.NumberFormat.getIntegerInstance({style:\"short\",maxFractionDigits:10}).format(t)}),a.registerCustomFormatter(this.FIORI_LABEL_FORMAT_2,function(t){return sap.ui.core.format.NumberFormat.getFloatInstance({style:\"Standard\",maxFractionDigits:2}).format(t)}),a.registerCustomFormatter(this.FIORI_LABEL_SHORTFORMAT_2,function(t){return sap.ui.core.format.NumberFormat.getIntegerInstance({style:\"short\",maxFractionDigits:2}).format(t)}),a.registerCustomFormatter(this.FIORI_PERCENTAGE_FORMAT_2,function(t){return sap.ui.core.format.NumberFormat.getPercentInstance({style:\"precent\",maxFractionDigits:2}).format(t)});var o={month_s1:\"M\",month_s2:\"MM\",month_s3:\"MMM\",month_s4:\"MMMM\",month_day_s1:\"MM/dd\",month_day_s5:\"MMM d\",month_day_s6:\"MMMM d\",year_s0:\"yy\",year_s1:\"yyy\",year_s2:\"yyyy\",YearMonthDay:\"MM/dd/yy\"};for(var n in o)o.hasOwnProperty(n)&&e(n,o[n]);r.numericFormatter(a)}}});",
	"web/ui5/test-resources/sap/viz/demokit/sample/ZoomInitialization/InitPage.js": "sap.ui.define([],function(){return{initPageSettings:function(e){if(sap.ui.Device.system.phone){var t=e.byId(\"settingsPanel\");t&&t.setExpanded(!1)}if(jQuery.sap.sjax({type:\"HEAD\",url:sap.ui.resource(\"sap.suite.ui.commons\",\"library.js\")}).success){sap.ui.getCore().loadLibrary(\"sap.suite.ui.commons\");var i=e.byId(\"idVizFrame\"),n=new sap.suite.ui.commons.ChartContainerContent({icon:\"sap-icon://horizontal-bar-chart\",title:\"vizFrame Bar Chart Sample\",content:[i]}),s=new sap.suite.ui.commons.ChartContainer({content:[n]});s.setShowFullScreen(!0),s.setAutoAdjustHeight(!0),e.byId(\"chartFixFlex\").setFlexContent(s)}}}});",
	"web/ui5/test-resources/sap/viz/demokit/sample/ZoomInitialization/ZoomInitialization.controller.js": "sap.ui.define([\"jquery.sap.global\",\"sap/ui/core/mvc/Controller\",\"sap/ui/model/json/JSONModel\",\"sap/viz/ui5/data/FlattenedDataset\",\"sap/viz/ui5/controls/common/feeds/FeedItem\",\"./CustomerFormat\",\"./InitPage\"],function(e,t,i,a,s,o,n){\"use strict\";return t=t.extend(\"sap.viz.sample.ZoomInitialization.ZoomInitialization\",{dataPath:\"test-resources/sap/viz/demokit/dataset/milk_production_testing_data\",settingsModel:{dataset:{name:\"Zoom Initialization\",defaultSelected:0,values:[{name:\"Overview\",vizProperties:[{plotArea:{isFixedDataPointSize:!1,window:{start:null,end:null}}},{plotArea:{window:{start:{valueAxis:null,valueAxis2:null},end:{valueAxis:null,valueAxis2:null}}}},{plotArea:{window:{start:null,end:null}},timeAxis:{interval:{unit:\"auto\"}}}]},{name:\"Initial Range\",vizProperties:[{plotArea:{window:{start:{categoryAxis:{\"Store Name\":\"Greens\"}},end:{categoryAxis:{\"Store Name\":\"Public Market\"}}}}},{plotArea:{window:{start:{valueAxis:4e6,valueAxis2:6e5},end:{valueAxis:65e5,valueAxis2:12e5}}}},{plotArea:{window:{start:13542912e5,end:13585248e5}}}]},{name:\"None (default)\",vizProperties:[{plotArea:{isFixedDataPointSize:!0,window:{start:null,end:null}}},{plotArea:{window:{start:{valueAxis:0,valueAxis2:0},end:{valueAxis:7e6,valueAxis2:2e6}}}},{plotArea:{window:{start:null,end:null}},timeAxis:{interval:{unit:\"minlevel\"}}}]}]},series:{name:\"Axis Type\",defaultSelected:0,enabled:!1,values:[{name:\"Categorical Axis\",path:\"/revenue_cost_consume/large.json\",vizType:\"bar\",key:0,value:[\"Revenue\"],dataset:{dimensions:[{name:\"Store Name\",value:\"{Store Name}\"}],measures:[{name:\"Revenue\",value:\"{Revenue}\"},{name:\"Cost\",value:\"{Cost}\"}],data:{path:\"/milk\"}},vizProperties:{plotArea:{isFixedDataPointSize:!1,dataLabel:{formatString:o.FIORI_LABEL_SHORTFORMAT_2,visible:!0}},valueAxis:{label:{formatString:o.FIORI_LABEL_SHORTFORMAT_10},title:{visible:!1}},categoryAxis:{title:{visible:!1}},title:{visible:!1,text:\"Revenue by City and Store Name\"}}},{name:\"Value Axis\",path:\"/revenue_cost_consume_fatPercentage/1_percent/large.json\",vizType:\"bubble\",key:1,value:[\"Revenue\"],dataset:{dimensions:[{name:\"Fat Percentage\",value:\"{Fat Percentage}\"}],measures:[{name:\"Store Name\",value:\"{Store Name}\"},{name:\"Revenue\",value:\"{Revenue}\"},{name:\"Cost\",value:\"{Cost}\"},{name:\"Consumption\",value:\"{Consumption}\"}],data:{path:\"/milk\"}},vizProperties:{plotArea:{isFixedDataPointSize:!1,dataLabel:{formatString:o.FIORI_LABEL_SHORTFORMAT_2,visible:!0,hideWhenOverlap:!0}},valueAxis:{label:{formatString:o.FIORI_LABEL_SHORTFORMAT_10},title:{visible:!1}},valueAxis2:{label:{formatString:o.FIORI_LABEL_SHORTFORMAT_10},title:{visible:!1}},sizeLegend:{formatString:o.FIORI_LABEL_SHORTFORMAT_2,title:{visible:!0}},title:{visible:!1}}},{name:\"Time Axis\",path:\"/date_revenue_cost/column/large.json\",vizType:\"timeseries_line\",key:2,value:[\"Cost\"],dataset:{dimensions:[{name:\"Date\",value:\"{Date}\",dataType:\"date\"}],measures:[{name:\"Cost\",value:\"{Cost}\"}],data:{path:\"/milk\"}},vizProperties:{plotArea:{dataLabel:{visible:!1}},valueAxis:{label:{formatString:o.FIORI_LABEL_SHORTFORMAT_10},title:{visible:!1}},timeAxis:{title:{visible:!1}},title:{visible:!1}}}]}},oVizFrame:null,datasetRadioGroup:null,seriesRadioGroup:null,onInit:function(e){this.initCustomFormat();var t=new i(this.settingsModel);this.getView().setModel(t);var a=this.oVizFrame=this.getView().byId(\"idVizFrame\");a.setVizProperties(this.settingsModel.series.values[0].vizProperties);var s=new i(this.dataPath+\"/revenue_cost_consume/large.json\");a.setModel(s);var r=this.getView().byId(\"idPopOver\");r.connect(a.getVizUid()),r.setFormatString({Date:\"YearMonthDay\",Cost:o.FIORI_LABEL_FORMAT_2,Revenue:o.FIORI_LABEL_FORMAT_2}),n.initPageSettings(this.getView())},onAfterRendering:function(){this.datasetRadioGroup=this.getView().byId(\"datasetRadioGroup\"),this.datasetRadioGroup.setSelectedIndex(this.settingsModel.dataset.defaultSelected),this.seriesRadioGroup=this.getView().byId(\"seriesRadioGroup\"),this.seriesRadioGroup.setSelectedIndex(this.settingsModel.series.defaultSelected)},onDatasetSelected:function(e){var t=e.getSource();if(this.oVizFrame&&t.getSelected()){var i=t.getBindingContext().getObject().vizProperties[this.seriesRadioGroup.getSelectedIndex()];this.oVizFrame.setVizProperties(i)}},onSeriesSelected:function(e){var t=e.getSource();if(this.oVizFrame&&t.getSelected()){var o=t.getBindingContext().getObject();this.oVizFrame.destroyDataset(),this.oVizFrame.destroyFeeds(),this.oVizFrame.setVizType(o.vizType);var n=new i(this.dataPath+o.path),r=new a(o.dataset);this.oVizFrame.setDataset(r),this.oVizFrame.setModel(n);var l=new s({uid:\"valueAxis\",type:\"Measure\",values:o.value}),d=new s({uid:\"categoryAxis\",type:\"Dimension\",values:[\"Store Name\"]}),u=new s({uid:\"valueAxis2\",type:\"Measure\",values:[\"Cost\"]}),v=new s({uid:\"bubbleWidth\",type:\"Measure\",values:[\"Consumption\"]}),m=new s({uid:\"color\",type:\"Dimension\",values:[\"Fat Percentage\"]}),p=new s({uid:\"timeAxis\",type:\"Dimension\",values:[\"Date\"]});switch(o.vizType){case\"bar\":this.oVizFrame.addFeed(l),this.oVizFrame.addFeed(d);break;case\"bubble\":this.oVizFrame.addFeed(l),this.oVizFrame.addFeed(u),this.oVizFrame.addFeed(v),this.oVizFrame.addFeed(m);break;case\"timeseries_line\":this.oVizFrame.addFeed(l),this.oVizFrame.addFeed(p)}this.oVizFrame.setVizProperties(o.vizProperties);var F=this.settingsModel.dataset.values[this.datasetRadioGroup.getSelectedIndex()].vizProperties[o.key];this.oVizFrame.setVizProperties(F)}},initCustomFormat:function(){o.registerCustomFormat()}})});",
	"web/ui5/test-resources/sap/viz/demokit/sample/ZoomInitialization/ZoomInitialization.view.xml": "<mvc:View controllerName=\"sap.viz.sample.ZoomInitialization.ZoomInitialization\" xmlns=\"sap.m\"\n    xmlns:viz=\"sap.viz.ui5.controls\" xmlns:layout=\"sap.ui.layout\"\n    xmlns:mvc=\"sap.ui.core.mvc\" xmlns:viz.feeds=\"sap.viz.ui5.controls.common.feeds\"\n    xmlns:viz.data=\"sap.viz.ui5.data\" height=\"100%\"><layout:FixFlex id='chartFixFlex' minFlexSize=\"250\"><layout:fixContent><Panel id='settingsPanel' class=\"panelStyle\" expandable=\"true\" expanded=\"true\" headerText=\"Settings\" width=\"auto\"><content><HBox class='settingsHBox'><VBox width=\"200px\"><Label text=\"{/dataset/name}\" design=\"Bold\" class='settingsLabel'></Label><RadioButtonGroup id='datasetRadioGroup'\n                                buttons=\"{path: '/dataset/values'}\"><buttons><RadioButton class='settingsRadio' text=\"{name}\" select=\"onDatasetSelected\"/></buttons></RadioButtonGroup></VBox><VBox class='settingsBox'><Label text='{/series/name}' design=\"Bold\" class='settingsLabel'></Label><RadioButtonGroup id='seriesRadioGroup'\n                            buttons=\"{path: '/series/values'}\" ><buttons><RadioButton class='settingsRadio' text=\"{name}\" select=\"onSeriesSelected\"/></buttons></RadioButtonGroup></VBox></HBox></content></Panel></layout:fixContent><layout:flexContent><viz:Popover id=\"idPopOver\"></viz:Popover><viz:VizFrame id=\"idVizFrame\" uiConfig=\"{applicationSet:'fiori'}\"\n                height='100%' width=\"100%\" vizType='bar'><viz:dataset><viz.data:FlattenedDataset data=\"{/milk}\"><viz.data:dimensions><viz.data:DimensionDefinition name=\"Store Name\"\n                                value=\"{Store Name}\" /></viz.data:dimensions><viz.data:measures><viz.data:MeasureDefinition name=\"Revenue\"\n                                value=\"{Revenue}\" /></viz.data:measures></viz.data:FlattenedDataset></viz:dataset><viz:feeds><viz.feeds:FeedItem uid=\"valueAxis\" type=\"Measure\"\n                        values=\"Revenue\" /><viz.feeds:FeedItem uid=\"categoryAxis\" type=\"Dimension\"\n                        values=\"Store Name\" /></viz:feeds></viz:VizFrame></layout:flexContent></layout:FixFlex></mvc:View>"
}, "web/ui5/test-resources/sap/viz/demokit/sample/ZoomInitialization/Component-preload");