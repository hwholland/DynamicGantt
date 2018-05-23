sap.ui.require.preload({
	"web/ui5/test-resources/sap/viz/demokit/sample/Bullet/Bullet.controller.js": "sap.ui.define([\"jquery.sap.global\",\"sap/ui/core/mvc/Controller\",\"sap/ui/model/json/JSONModel\",\"./CustomerFormat\",\"./InitPage\"],function(e,t,a,i,s){\"use strict\";return t=t.extend(\"sap.viz.sample.Bullet.Bullet\",{dataPath:\"test-resources/sap/viz/demokit/dataset/milk_production_testing_data/revenue_additional_forecast_target\",settingsModel:{dataset:{name:\"Dataset\",defaultSelected:1,values:[{name:\"Small\",value:\"/small.json\"},{name:\"Medium\",value:\"/medium.json\"},{name:\"Large\",value:\"/large.json\"}]},series:{name:\"Series\",defaultSelected:0,values:[{name:\"1 Series\",value:[[\"Revenue\"],[\"Target\"],[\"Additional Revenue\"],[\"Forecast\"]]},{name:\"2 Series\",value:[[\"Revenue\",\"Revenue2\"],[\"Target\",\"Target2\"],[\"Additional Revenue\",\"Additional Revenue2\"],[\"Forecast\",\"Forecast2\"]]}]},dataLabel:{name:\"Value Label\",defaultState:!1,enabled:!1},axisTitle:{name:\"Axis Title\",defaultState:!1},valuesDisplayed:{name:\"Values Displayed\",defaultSelected:0,values:[{key:\"0\",name:\"Primary Only\",enabled:!0,vizProperties:{plotArea:{colorPalette:null,gap:{visible:!1}}}},{key:\"1\",name:\"Primary + Additional\",enabled:!0,vizProperties:{plotArea:{colorPalette:null,gap:{visible:!1}}}}]}},oVizFrame:null,feedActualValues:null,feedCategoryAxis:null,feedTargetValues:null,feedAdditionalValues:null,feedForecastValues:null,seriesRadioGroup:null,onInit:function(e){this.initCustomFormat();var t=new a(this.settingsModel);t.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay),this.getView().setModel(t);var d=this.oVizFrame=this.getView().byId(\"idVizFrame\");d.setVizProperties({plotArea:{dataLabel:{formatString:i.FIORI_LABEL_SHORTFORMAT_2,visible:!0},gap:{visible:!1}},valueAxis:{label:{formatString:i.FIORI_LABEL_SHORTFORMAT_10},title:{visible:!1}},categoryAxis:{title:{visible:!1}},title:{visible:!1,text:\"Revenue by City and Store Name\"}});var l=new a(this.dataPath+\"/medium.json\");d.setModel(l);var r=this.getView().byId(\"idPopOver\");r.connect(d.getVizUid()),r.setFormatString(i.FIORI_LABEL_FORMAT_2),s.initPageSettings(this.getView());var o=this;l.attachRequestCompleted(function(){o.dataSort(this.getData())})},dataSort:function(e){if(e&&e.hasOwnProperty(\"milk\")){var t=e.milk;t=t.sort(function(e,t){return t.Revenue-e.Revenue})}},onAfterRendering:function(){this.getView().byId(\"datasetRadioGroup\").setSelectedIndex(this.settingsModel.dataset.defaultSelected),this.seriesRadioGroup=this.getView().byId(\"seriesRadioGroup\"),this.seriesRadioGroup.setSelectedIndex(this.settingsModel.series.defaultSelected),this.getView().byId(\"valueLabelSwitch\").setEnabled(this.settingsModel.dataLabel.enabled),this.feedActualValues=this.getView().byId(\"feedActualValues\"),this.feedCategoryAxis=this.getView().byId(\"feedCategoryAxis\"),this.feedTargetValues=this.getView().byId(\"feedTargetValues\"),this.feedAdditionalValues=this.getView().byId(\"feedAdditionalValues\"),this.feedForecastValues=this.getView().byId(\"feedForecastValues\"),this.oVizFrame.removeFeed(this.feedAdditionalValues),this.oVizFrame.removeFeed(this.feedForecastValues)},onDatasetSelected:function(e){if(e.getParameters().selected){var t=e.getSource();if(this.oVizFrame&&t.getSelected()){var i=t.getBindingContext().getObject(),s=new a(this.dataPath+i.value);this.oVizFrame.setModel(s);var d=this;s.attachRequestCompleted(function(){d.dataSort(this.getData())})}}},onSeriesSelected:function(e){if(e.getParameters().selected){var t=e.getSource();if(this.oVizFrame&&t.getSelected()){var a=t.getBindingContext().getObject();this.oVizFrame.removeFeed(this.feedActualValues),this.feedActualValues.setValues(a.value[0]),this.oVizFrame.addFeed(this.feedActualValues),this.oVizFrame.removeFeed(this.feedTargetValues),this.feedTargetValues.setValues(a.value[1]),this.oVizFrame.addFeed(this.feedTargetValues)}this.hasFeed(this.feedAdditionalValues)&&(this.oVizFrame.removeFeed(this.feedAdditionalValues),this.feedAdditionalValues.setValues(a.value[2]),this.oVizFrame.addFeed(this.feedAdditionalValues)),this.hasFeed(this.feedForecastValues)&&(this.oVizFrame.removeFeed(this.feedForecastValues),this.feedForecastValues.setValues(a.value[3]),this.oVizFrame.addFeed(this.feedForecastValues));var i=this;this.oVizFrame.getModel().attachRequestCompleted(function(){i.dataSort(this.getData())})}},onDataLabelChanged:function(e){this.oVizFrame&&this.oVizFrame.setVizProperties({plotArea:{dataLabel:{visible:e.getParameter(\"state\")}}})},onAxisTitleChanged:function(e){if(this.oVizFrame){var t=e.getParameter(\"state\");this.oVizFrame.setVizProperties({valueAxis:{title:{visible:t}},categoryAxis:{title:{visible:t}}})}},onValuesDisplayedChanged:function(e){if(this.oVizFrame){var t=parseInt(e.getSource().getSelectedKey()),a=this.settingsModel.valuesDisplayed.values[t];switch(this.oVizFrame.setVizProperties(a.vizProperties),this.seriesRadioGroup.getButtons().forEach(function(e){e.setEnabled(a.enabled)}),this.oVizFrame.removeAllFeeds(),t){case 0:this.oVizFrame.addFeed(this.feedActualValues),this.oVizFrame.addFeed(this.feedCategoryAxis),this.oVizFrame.addFeed(this.feedTargetValues);break;case 1:this.oVizFrame.addFeed(this.feedActualValues),this.oVizFrame.addFeed(this.feedCategoryAxis),this.oVizFrame.addFeed(this.feedTargetValues),this.oVizFrame.addFeed(this.feedAdditionalValues)}}},hasFeed:function(e){for(var t=this.oVizFrame.getFeeds(),a=t.length,i=0;i<a;i++)if(t[i]==e)return!0;return!1},initCustomFormat:function(){i.registerCustomFormat()}})});",
	"web/ui5/test-resources/sap/viz/demokit/sample/Bullet/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.viz.sample.Bullet.Component\",{metadata:{rootView:\"sap.viz.sample.Bullet.Bullet\",includes:[\"../../css/exploredStyle.css\"],dependencies:{libs:[\"sap.viz\",\"sap.m\"]},config:{sample:{stretch:!0,files:[\"Bullet.view.xml\",\"Bullet.controller.js\",\"CustomerFormat.js\",\"InitPage.js\"]}}}})});",
	"web/ui5/test-resources/sap/viz/demokit/sample/Bullet/CustomerFormat.js": "sap.ui.define([\"sap/viz/ui5/format/ChartFormatter\",\"sap/viz/ui5/api/env/Format\"],function(t,r){return{FIORI_LABEL_SHORTFORMAT_10:\"__UI5__ShortIntegerMaxFraction10\",FIORI_LABEL_FORMAT_2:\"__UI5__FloatMaxFraction2\",FIORI_LABEL_SHORTFORMAT_2:\"__UI5__ShortIntegerMaxFraction2\",FIORI_PERCENTAGE_FORMAT_2:\"__UI5__PercentageMaxFraction2\",MFS1:\"month_s1\",MFS2:\"month_s2\",MFS3:\"month_s3\",MFS4:\"month_s4\",MDFS1:\"month_day_s1\",MDFS2:\"month_day_s5\",MDFS3:\"month_day_s6\",YFS0:\"year_s0\",YFS1:\"year_s1\",YFS2:\"year_s2\",chartFormatter:null,registerCustomFormat:function(){var a=this.chartFormatter=t.getInstance();function e(t,r){a.registerCustomFormatter(t,function(t){return sap.ui.core.format.DateFormat.getDateTimeInstance({pattern:r}).format(t)})}a.registerCustomFormatter(this.FIORI_LABEL_SHORTFORMAT_10,function(t){return sap.ui.core.format.NumberFormat.getIntegerInstance({style:\"short\",maxFractionDigits:10}).format(t)}),a.registerCustomFormatter(this.FIORI_LABEL_FORMAT_2,function(t){return sap.ui.core.format.NumberFormat.getFloatInstance({style:\"Standard\",maxFractionDigits:2}).format(t)}),a.registerCustomFormatter(this.FIORI_LABEL_SHORTFORMAT_2,function(t){return sap.ui.core.format.NumberFormat.getIntegerInstance({style:\"short\",maxFractionDigits:2}).format(t)}),a.registerCustomFormatter(this.FIORI_PERCENTAGE_FORMAT_2,function(t){return sap.ui.core.format.NumberFormat.getPercentInstance({style:\"precent\",maxFractionDigits:2}).format(t)});var o={month_s1:\"M\",month_s2:\"MM\",month_s3:\"MMM\",month_s4:\"MMMM\",month_day_s1:\"MM/dd\",month_day_s5:\"MMM d\",month_day_s6:\"MMMM d\",year_s0:\"yy\",year_s1:\"yyy\",year_s2:\"yyyy\",YearMonthDay:\"MM/dd/yy\"};for(var n in o)o.hasOwnProperty(n)&&e(n,o[n]);r.numericFormatter(a)}}});",
	"web/ui5/test-resources/sap/viz/demokit/sample/Bullet/InitPage.js": "sap.ui.define([],function(){return{initPageSettings:function(e){if(sap.ui.Device.system.phone){var t=e.byId(\"settingsPanel\");t&&t.setExpanded(!1)}if(jQuery.sap.sjax({type:\"HEAD\",url:sap.ui.resource(\"sap.suite.ui.commons\",\"library.js\")}).success){sap.ui.getCore().loadLibrary(\"sap.suite.ui.commons\");var i=e.byId(\"idVizFrame\"),n=new sap.suite.ui.commons.ChartContainerContent({icon:\"sap-icon://horizontal-bar-chart\",title:\"vizFrame Bar Chart Sample\",content:[i]}),s=new sap.suite.ui.commons.ChartContainer({content:[n]});s.setShowFullScreen(!0),s.setAutoAdjustHeight(!0),e.byId(\"chartFixFlex\").setFlexContent(s)}}}});",
	"web/ui5/test-resources/sap/viz/demokit/sample/Bullet/Bullet.view.xml": "<mvc:View controllerName=\"sap.viz.sample.Bullet.Bullet\" xmlns=\"sap.m\"\r\n    xmlns:viz=\"sap.viz.ui5.controls\" xmlns:layout=\"sap.ui.layout\"\r\n    xmlns:mvc=\"sap.ui.core.mvc\" xmlns:viz.feeds=\"sap.viz.ui5.controls.common.feeds\"\r\n    xmlns:core=\"sap.ui.core\" xmlns:viz.data=\"sap.viz.ui5.data\" height=\"100%\"><layout:FixFlex id='chartFixFlex' minFlexSize=\"250\"><layout:fixContent><Panel id='settingsPanel' class=\"panelStyle\" expandable=\"true\" expanded=\"true\" headerText=\"Settings\" width=\"auto\"><content><HBox class='settingsHBox'><VBox class='settingsBox'><Label text=\"{/dataset/name}\" design=\"Bold\" class='settingsLabel'></Label><RadioButtonGroup id='datasetRadioGroup'\r\n                            buttons=\"{path: '/dataset/values'}\"><buttons><RadioButton class='settingsRadio' text=\"{name}\" select=\"onDatasetSelected\"/></buttons></RadioButtonGroup></VBox><VBox class='settingsBox'><Label text='{/series/name}' design=\"Bold\" class='settingsLabel'></Label><RadioButtonGroup id='seriesRadioGroup'\r\n                            buttons=\"{path: '/series/values'}\" ><buttons><RadioButton class='settingsRadio' text=\"{name}\" select='onSeriesSelected'/></buttons></RadioButtonGroup></VBox><VBox class='settingsBox'><Label text = '{/dataLabel/name}' design=\"Bold\" class='settingsLabel'></Label><Switch id='valueLabelSwitch' class='settingsSwitch' state=\"{/dataLabel/defaultState}\"><layoutData><FlexItemData growFactor=\"1\" /></layoutData></Switch></VBox><VBox class='settingsBox'><Label text = '{/axisTitle/name}' design=\"Bold\" class='settingsLabel'></Label><Switch class='settingsSwitch' state=\"{/axisTitle/defaultState}\" change='onAxisTitleChanged'><layoutData><FlexItemData growFactor=\"1\" /></layoutData></Switch></VBox><VBox class='settingsBox'><Label text = '{/valuesDisplayed/name}' design=\"Bold\" class='settingsLabel'></Label><Select id='valuesSelect' class='settingsSelect' selectedKey='{/valuesDisplayed/defaultSelected}' autoAdjustWidth='true' maxWidth=\"150px\" change='onValuesDisplayedChanged' \r\n                            items=\"{path: '/valuesDisplayed/values'}\"><items><core:Item text=\"{name}\" key=\"{key}\" /></items></Select></VBox></HBox></content></Panel></layout:fixContent><layout:flexContent><viz:Popover id=\"idPopOver\"></viz:Popover><viz:VizFrame id=\"idVizFrame\" uiConfig=\"{applicationSet:'fiori'}\"\r\n                height='100%' width=\"100%\" vizType='bullet'><viz:dataset><viz.data:FlattenedDataset data=\"{/milk}\"><viz.data:dimensions><viz.data:DimensionDefinition name=\"Store Name\"\r\n                                value=\"{Store Name}\" /></viz.data:dimensions><viz.data:measures><viz.data:MeasureDefinition name=\"Revenue\"\r\n                                value=\"{Revenue}\" /><viz.data:MeasureDefinition name=\"Revenue2\"\r\n                                value=\"{Revenue2}\" /><viz.data:MeasureDefinition name=\"Target\"\r\n                                value=\"{Target}\" /><viz.data:MeasureDefinition name=\"Target2\"\r\n                                value=\"{Target2}\" /><viz.data:MeasureDefinition name=\"Forecast\"\r\n                                value=\"{Forecast}\" /><viz.data:MeasureDefinition name=\"Forecast2\"\r\n                                value=\"{Forecast2}\" /><viz.data:MeasureDefinition name=\"Additional Revenue\"\r\n                                value=\"{Additional Revenue}\" /><viz.data:MeasureDefinition name=\"Additional Revenue2\"\r\n                                value=\"{Additional Revenue2}\" /></viz.data:measures></viz.data:FlattenedDataset></viz:dataset><viz:feeds><viz.feeds:FeedItem id=\"feedActualValues\" uid=\"actualValues\" type=\"Measure\"\r\n                        values=\"Revenue\" /><viz.feeds:FeedItem id=\"feedTargetValues\" uid=\"targetValues\" type=\"Measure\"\r\n                        values=\"Target\" /><viz.feeds:FeedItem id=\"feedAdditionalValues\" uid=\"additionalValues\" type=\"Measure\"\r\n                        values=\"Additional Revenue\" /><viz.feeds:FeedItem id=\"feedForecastValues\" uid=\"forecastValues\" type=\"Measure\"\r\n                        values=\"Forecast\" /><viz.feeds:FeedItem id=\"feedCategoryAxis\" uid=\"categoryAxis\" type=\"Dimension\"\r\n                        values=\"Store Name\" /></viz:feeds></viz:VizFrame></layout:flexContent></layout:FixFlex></mvc:View>"
}, "web/ui5/test-resources/sap/viz/demokit/sample/Bullet/Component-preload");