sap.ui.require.preload({
	"web/ui5/test-resources/sap/viz/demokit/sample/Heatmap/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.viz.sample.Heatmap.Component\",{metadata:{rootView:\"sap.viz.sample.Heatmap.Heatmap\",includes:[\"../../css/exploredStyle.css\"],dependencies:{libs:[\"sap.viz\",\"sap.m\"]},config:{sample:{stretch:!0,files:[\"Heatmap.view.xml\",\"Heatmap.controller.js\",\"CustomerFormat.js\",\"InitPage.js\"]}}}})});",
	"web/ui5/test-resources/sap/viz/demokit/sample/Heatmap/CustomerFormat.js": "sap.ui.define([\"sap/viz/ui5/format/ChartFormatter\",\"sap/viz/ui5/api/env/Format\"],function(t,r){return{FIORI_LABEL_SHORTFORMAT_10:\"__UI5__ShortIntegerMaxFraction10\",FIORI_LABEL_FORMAT_2:\"__UI5__FloatMaxFraction2\",FIORI_LABEL_SHORTFORMAT_2:\"__UI5__ShortIntegerMaxFraction2\",FIORI_PERCENTAGE_FORMAT_2:\"__UI5__PercentageMaxFraction2\",MFS1:\"month_s1\",MFS2:\"month_s2\",MFS3:\"month_s3\",MFS4:\"month_s4\",MDFS1:\"month_day_s1\",MDFS2:\"month_day_s5\",MDFS3:\"month_day_s6\",YFS0:\"year_s0\",YFS1:\"year_s1\",YFS2:\"year_s2\",chartFormatter:null,registerCustomFormat:function(){var a=this.chartFormatter=t.getInstance();function e(t,r){a.registerCustomFormatter(t,function(t){return sap.ui.core.format.DateFormat.getDateTimeInstance({pattern:r}).format(t)})}a.registerCustomFormatter(this.FIORI_LABEL_SHORTFORMAT_10,function(t){return sap.ui.core.format.NumberFormat.getIntegerInstance({style:\"short\",maxFractionDigits:10}).format(t)}),a.registerCustomFormatter(this.FIORI_LABEL_FORMAT_2,function(t){return sap.ui.core.format.NumberFormat.getFloatInstance({style:\"Standard\",maxFractionDigits:2}).format(t)}),a.registerCustomFormatter(this.FIORI_LABEL_SHORTFORMAT_2,function(t){return sap.ui.core.format.NumberFormat.getIntegerInstance({style:\"short\",maxFractionDigits:2}).format(t)}),a.registerCustomFormatter(this.FIORI_PERCENTAGE_FORMAT_2,function(t){return sap.ui.core.format.NumberFormat.getPercentInstance({style:\"precent\",maxFractionDigits:2}).format(t)});var o={month_s1:\"M\",month_s2:\"MM\",month_s3:\"MMM\",month_s4:\"MMMM\",month_day_s1:\"MM/dd\",month_day_s5:\"MMM d\",month_day_s6:\"MMMM d\",year_s0:\"yy\",year_s1:\"yyy\",year_s2:\"yyyy\",YearMonthDay:\"MM/dd/yy\"};for(var n in o)o.hasOwnProperty(n)&&e(n,o[n]);r.numericFormatter(a)}}});",
	"web/ui5/test-resources/sap/viz/demokit/sample/Heatmap/Heatmap.controller.js": "sap.ui.define([\"jquery.sap.global\",\"sap/ui/core/mvc/Controller\",\"sap/ui/model/json/JSONModel\",\"sap/viz/ui5/controls/common/feeds/FeedItem\",\"sap/viz/ui5/data/DimensionDefinition\",\"./CustomerFormat\",\"./InitPage\"],function(e,t,i,a,s,o,n){\"use strict\";return t=t.extend(\"sap.viz.sample.Heatmap.Heatmap\",{dataPath:\"test-resources/sap/viz/demokit/dataset/milk_production_testing_data/heatmap\",settingsModel:{dataset:{name:\"Dataset\",defaultSelected:1,values:[{name:\"Small\",value:\"/small.json\"},{name:\"Medium\",value:\"/medium.json\"},{name:\"Large\",value:\"/large.json\"}]},series:{name:\"Series\",defaultSelected:0,enabled:!1,values:[{name:\"1 Series\"},{name:\"2 Series\"}]},dataLabel:{name:\"Value Label\",defaultState:!1},axisTitle:{name:\"Axis Title\",defaultState:!1},dimention:{name:\"Dimension\",defaultSelected:0,values:[{name:\"1 Dimension\",value:\"/1d\"},{name:\"2 Dimensions\",value:\"/2d\"}]},color:{name:\"Color\",defaultSelected:1,values:[{name:\"3 Sections\",value:[{feed:\"color\",type:\"color\",numOfSegments:3,palette:[\"sapUiChartPaletteSequentialHue1Light2\",\"sapUiChartPaletteSequentialHue1\",\"sapUiChartPaletteSequentialHue1Dark2\"]}]},{name:\"5 Sections\",value:[{feed:\"color\",type:\"color\",numOfSegments:5,palette:[\"sapUiChartPaletteSequentialHue1Light2\",\"sapUiChartPaletteSequentialHue1Light1\",\"sapUiChartPaletteSequentialHue1\",\"sapUiChartPaletteSequentialHue1Dark1\",\"sapUiChartPaletteSequentialHue1Dark2\"]}]},{name:\"8 Sections\",value:[{feed:\"color\",type:\"color\",numOfSegments:8,palette:[\"sapUiChartPaletteSequentialHue3Dark1\",\"sapUiChartPaletteSequentialHue3\",\"sapUiChartPaletteSequentialHue3Light1\",\"sapUiChartPaletteSequentialHue3Light2\",\"sapUiChartPaletteSequentialHue1Light2\",\"sapUiChartPaletteSequentialHue1Light1\",\"sapUiChartPaletteSequentialHue1\",\"sapUiChartPaletteSequentialHue1Dark1\"]}]}]}},oVizFrame:null,datasetRadioGroup:null,dimentionRadioGroup:null,colorRadioGroup:null,flattenedDataset:null,monthDimension:new s({name:\"Month\",value:\"{Month}\"}),feedCategoryAxis2:new a({uid:\"categoryAxis2\",type:\"Dimension\",values:\"Month\"}),onInit:function(e){this.initCustomFormat();var t=new i(this.settingsModel);t.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay),this.getView().setModel(t);var a=this.oVizFrame=this.getView().byId(\"idVizFrame\");a.setVizProperties({plotArea:{background:{border:{top:{visible:!1},bottom:{visible:!1},left:{visible:!1},right:{visible:!1}}},dataLabel:{formatString:o.FIORI_LABEL_SHORTFORMAT_2,visible:!1}},categoryAxis:{title:{visible:!1}},categoryAxis2:{title:{visible:!1}},legend:{visible:!0,formatString:o.FIORI_LABEL_SHORTFORMAT_10,title:{visible:!1}},title:{visible:!1,text:\"Revenue by City and Store Name\"}});var s=new i(this.dataPath+\"/1d/medium.json\");a.setModel(s);var l=this.getView().byId(\"idPopOver\");l.connect(a.getVizUid()),l.setFormatString(o.FIORI_LABEL_FORMAT_2),n.initPageSettings(this.getView())},onAfterRendering:function(){this.datasetRadioGroup=this.getView().byId(\"datasetRadioGroup\"),this.datasetRadioGroup.setSelectedIndex(this.settingsModel.dataset.defaultSelected);var e=this.getView().byId(\"seriesRadioGroup\");e.setSelectedIndex(this.settingsModel.series.defaultSelected),e.setEnabled(this.settingsModel.series.enabled),this.dimentionRadioGroup=this.getView().byId(\"dimentionRadioGroup\"),this.dimentionRadioGroup.setSelectedIndex(this.settingsModel.dimention.defaultSelected),this.colorRadioGroup=this.getView().byId(\"colorRadioGroup\"),this.colorRadioGroup.setSelectedIndex(this.settingsModel.color.defaultSelected),this.flattenedDataset=this.oVizFrame.getDataset()},onDatasetSelected:function(e){var t=e.getSource();if(this.oVizFrame&&t.getSelected()){var a=t.getBindingContext().getObject(),s=this.settingsModel.dimention.values[this.dimentionRadioGroup.getSelectedIndex()].value,o=new i(this.dataPath+s+a.value);this.oVizFrame.setModel(o)}},onDataLabelChanged:function(e){this.oVizFrame&&this.oVizFrame.setVizProperties({plotArea:{dataLabel:{visible:e.getParameter(\"state\")}}})},onAxisTitleChanged:function(e){if(this.oVizFrame){var t=e.getParameter(\"state\");this.oVizFrame.setVizProperties({valueAxis:{title:{visible:t}},categoryAxis:{title:{visible:t}},categoryAxis2:{title:{visible:t}}})}},onDimentionSelected:function(e){var t=e.getSource();if(this.oVizFrame&&t.getSelected()){var a=t.getBindingContext().getObject(),s=this.settingsModel.dataset.values[this.datasetRadioGroup.getSelectedIndex()].value,o=new i(this.dataPath+a.value+s);switch(this.oVizFrame.setModel(o),a.name){case\"1 Dimension\":this.flattenedDataset.removeDimension(this.monthDimension),this.oVizFrame.setDataset(this.flattenedDataset),this.oVizFrame.removeFeed(this.feedCategoryAxis2);break;case\"2 Dimensions\":this.flattenedDataset.addDimension(this.monthDimension),this.oVizFrame.setDataset(this.flattenedDataset),this.oVizFrame.addFeed(this.feedCategoryAxis2)}var n=this.settingsModel.color.values[this.colorRadioGroup.getSelectedIndex()].value;this.oVizFrame.setVizScales(n)}},onColorSelected:function(e){var t=e.getSource();if(this.oVizFrame&&t.getSelected()){var i=t.getBindingContext().getObject();this.oVizFrame.setVizScales(i.value)}},initCustomFormat:function(){o.registerCustomFormat()}})});",
	"web/ui5/test-resources/sap/viz/demokit/sample/Heatmap/InitPage.js": "sap.ui.define([],function(){return{initPageSettings:function(e){if(sap.ui.Device.system.phone){var t=e.byId(\"settingsPanel\");t&&t.setExpanded(!1)}if(jQuery.sap.sjax({type:\"HEAD\",url:sap.ui.resource(\"sap.suite.ui.commons\",\"library.js\")}).success){sap.ui.getCore().loadLibrary(\"sap.suite.ui.commons\");var i=e.byId(\"idVizFrame\"),n=new sap.suite.ui.commons.ChartContainerContent({icon:\"sap-icon://horizontal-bar-chart\",title:\"vizFrame Bar Chart Sample\",content:[i]}),s=new sap.suite.ui.commons.ChartContainer({content:[n]});s.setShowFullScreen(!0),s.setAutoAdjustHeight(!0),e.byId(\"chartFixFlex\").setFlexContent(s)}}}});",
	"web/ui5/test-resources/sap/viz/demokit/sample/Heatmap/Heatmap.view.xml": "<mvc:View controllerName=\"sap.viz.sample.Heatmap.Heatmap\" xmlns=\"sap.m\"\n    xmlns:viz=\"sap.viz.ui5.controls\" xmlns:layout=\"sap.ui.layout\"\n    xmlns:mvc=\"sap.ui.core.mvc\" xmlns:viz.feeds=\"sap.viz.ui5.controls.common.feeds\"\n    xmlns:viz.data=\"sap.viz.ui5.data\" height=\"100%\"><layout:FixFlex id='chartFixFlex' minFlexSize=\"250\"><layout:fixContent><Panel id='settingsPanel' class=\"panelStyle\" expandable=\"true\" expanded=\"true\" headerText=\"Settings\" width=\"auto\"><content><HBox class='settingsHBox'><VBox class='settingsBox'><Label text=\"{/dataset/name}\" design=\"Bold\" class='settingsLabel'></Label><RadioButtonGroup id='datasetRadioGroup'\n                                buttons=\"{path: '/dataset/values'}\"><buttons><RadioButton class='settingsRadio' text=\"{name}\" select=\"onDatasetSelected\"/></buttons></RadioButtonGroup></VBox><VBox class='settingsBox'><Label text='{/series/name}' design=\"Bold\" class='settingsLabel'></Label><RadioButtonGroup id='seriesRadioGroup'\n                            buttons=\"{path: '/series/values'}\" ><buttons><RadioButton class='settingsRadio' text=\"{name}\"/></buttons></RadioButtonGroup></VBox><VBox class='settingsBox'><Label text = '{/dataLabel/name}' design=\"Bold\" class='settingsLabel'></Label><Switch class='settingsSwitch' state=\"{/dataLabel/defaultState}\" change='onDataLabelChanged'><layoutData><FlexItemData growFactor=\"1\" /></layoutData></Switch></VBox><VBox class='settingsBox'><Label text = '{/axisTitle/name}' design=\"Bold\" class='settingsLabel'></Label><Switch class='settingsSwitch' state=\"{/axisTitle/defaultState}\" change='onAxisTitleChanged'><layoutData><FlexItemData growFactor=\"1\" /></layoutData></Switch></VBox><VBox class='settingsBox'><Label text='{/dimention/name}' design=\"Bold\" class='settingsLabel'></Label><RadioButtonGroup id='dimentionRadioGroup'\n                            buttons=\"{path: '/dimention/values'}\" ><buttons><RadioButton class='settingsRadio' text=\"{name}\" select=\"onDimentionSelected\"/></buttons></RadioButtonGroup></VBox><VBox class='settingsBox'><Label text='{/color/name}' design=\"Bold\" class='settingsLabel'></Label><RadioButtonGroup id='colorRadioGroup'\n                            buttons=\"{path: '/color/values'}\" ><buttons><RadioButton class='settingsRadio' text=\"{name}\" select=\"onColorSelected\"/></buttons></RadioButtonGroup></VBox></HBox></content></Panel></layout:fixContent><layout:flexContent><viz:Popover id=\"idPopOver\"></viz:Popover><viz:VizFrame id=\"idVizFrame\" uiConfig=\"{applicationSet:'fiori'}\"\n                height='100%' width=\"100%\" vizType='heatmap'><viz:dataset><viz.data:FlattenedDataset data=\"{/milk}\"><viz.data:dimensions><viz.data:DimensionDefinition name=\"Store Name\"\n                                value=\"{Store Name}\" /></viz.data:dimensions><viz.data:measures><viz.data:MeasureDefinition name=\"Revenue\"\n                                value=\"{Revenue}\" /></viz.data:measures></viz.data:FlattenedDataset></viz:dataset><viz:feeds><viz.feeds:FeedItem uid=\"color\" type=\"Measure\"\n                        values=\"Revenue\" /><viz.feeds:FeedItem uid=\"categoryAxis\" type=\"Dimension\"\n                        values=\"Store Name\" /></viz:feeds></viz:VizFrame></layout:flexContent></layout:FixFlex></mvc:View>"
}, "web/ui5/test-resources/sap/viz/demokit/sample/Heatmap/Component-preload");