sap.ui.require.preload({
	"web/ui5/test-resources/sap/viz/demokit/sample/Column/Column.controller.js": "sap.ui.define([\"jquery.sap.global\",\"sap/ui/core/mvc/Controller\",\"sap/ui/model/json/JSONModel\",\"sap/viz/ui5/data/FlattenedDataset\",\"./CustomerFormat\",\"./InitPage\"],function(e,t,a,i,s,n){\"use strict\";return t=t.extend(\"sap.viz.sample.Column.Column\",{dataPath:\"test-resources/sap/viz/demokit/dataset/milk_production_testing_data/revenue_cost_consume\",settingsModel:{dataset:{name:\"Dataset\",defaultSelected:1,values:[{name:\"Small\",value:\"/betterSmall.json\"},{name:\"Medium\",value:\"/betterMedium.json\"},{name:\"Large\",value:\"/betterLarge.json\"}]},series:{name:\"Series\",defaultSelected:0,values:[{name:\"1 Series\",value:[\"Revenue\"]},{name:\"2 Series\",value:[\"Revenue\",\"Cost\"]}]},dataLabel:{name:\"Value Label\",defaultState:!0},axisTitle:{name:\"Axis Title\",defaultState:!1},dimensions:{Small:[{name:\"Seasons\",value:\"{Seasons}\"}],Medium:[{name:\"Week\",value:\"{Week}\"}],Large:[{name:\"Week\",value:\"{Week}\"}]},measures:[{name:\"Revenue\",value:\"{Revenue}\"},{name:\"Cost\",value:\"{Cost}\"}]},oVizFrame:null,onInit:function(e){this.initCustomFormat();var t=new a(this.settingsModel);t.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay),this.getView().setModel(t);var i=this.oVizFrame=this.getView().byId(\"idVizFrame\");i.setVizProperties({plotArea:{dataLabel:{formatString:s.FIORI_LABEL_SHORTFORMAT_2,visible:!0}},valueAxis:{label:{formatString:s.FIORI_LABEL_SHORTFORMAT_10},title:{visible:!1}},categoryAxis:{title:{visible:!1}},title:{visible:!1,text:\"Revenue by City and Store Name\"}});var o=new a(this.dataPath+\"/betterMedium.json\");i.setModel(o);var r=this.getView().byId(\"idPopOver\");r.connect(i.getVizUid()),r.setFormatString(s.FIORI_LABEL_FORMAT_2),n.initPageSettings(this.getView())},onAfterRendering:function(){this.getView().byId(\"datasetRadioGroup\").setSelectedIndex(this.settingsModel.dataset.defaultSelected),this.getView().byId(\"seriesRadioGroup\").setSelectedIndex(this.settingsModel.series.defaultSelected)},onDatasetSelected:function(e){var t=e.getSource();if(this.oVizFrame&&t.getSelected()){var s=t.getBindingContext().getObject(),n={data:{path:\"/milk\"}},o=this.settingsModel.dimensions[s.name];n.dimensions=o,n.measures=this.settingsModel.measures;var r=new i(n);this.oVizFrame.setDataset(r);var l=new a(this.dataPath+s.value);this.oVizFrame.setModel(l);var d=this.getView().byId(\"categoryAxisFeed\");this.oVizFrame.removeFeed(d);for(var u=[],m=0;m<o.length;m++)u.push(o[m].name);d.setValues(u),this.oVizFrame.addFeed(d)}},onSeriesSelected:function(e){var t=e.getSource();if(this.oVizFrame&&t.getSelected()){var a=t.getBindingContext().getObject(),i=this.getView().byId(\"valueAxisFeed\");this.oVizFrame.removeFeed(i),i.setValues(a.value),this.oVizFrame.addFeed(i)}},onDataLabelChanged:function(e){this.oVizFrame&&this.oVizFrame.setVizProperties({plotArea:{dataLabel:{visible:e.getParameter(\"state\")}}})},onAxisTitleChanged:function(e){if(this.oVizFrame){var t=e.getParameter(\"state\");this.oVizFrame.setVizProperties({valueAxis:{title:{visible:t}},categoryAxis:{title:{visible:t}}})}},initCustomFormat:function(){s.registerCustomFormat()}})});",
	"web/ui5/test-resources/sap/viz/demokit/sample/Column/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.viz.sample.Column.Component\",{metadata:{rootView:\"sap.viz.sample.Column.Column\",includes:[\"../../css/exploredStyle.css\"],dependencies:{libs:[\"sap.viz\",\"sap.m\"]},config:{sample:{stretch:!0,files:[\"Column.view.xml\",\"Column.controller.js\",\"CustomerFormat.js\",\"InitPage.js\"]}}}})});",
	"web/ui5/test-resources/sap/viz/demokit/sample/Column/CustomerFormat.js": "sap.ui.define([\"sap/viz/ui5/format/ChartFormatter\",\"sap/viz/ui5/api/env/Format\"],function(t,r){return{FIORI_LABEL_SHORTFORMAT_10:\"__UI5__ShortIntegerMaxFraction10\",FIORI_LABEL_FORMAT_2:\"__UI5__FloatMaxFraction2\",FIORI_LABEL_SHORTFORMAT_2:\"__UI5__ShortIntegerMaxFraction2\",FIORI_PERCENTAGE_FORMAT_2:\"__UI5__PercentageMaxFraction2\",MFS1:\"month_s1\",MFS2:\"month_s2\",MFS3:\"month_s3\",MFS4:\"month_s4\",MDFS1:\"month_day_s1\",MDFS2:\"month_day_s5\",MDFS3:\"month_day_s6\",YFS0:\"year_s0\",YFS1:\"year_s1\",YFS2:\"year_s2\",chartFormatter:null,registerCustomFormat:function(){var a=this.chartFormatter=t.getInstance();function e(t,r){a.registerCustomFormatter(t,function(t){return sap.ui.core.format.DateFormat.getDateTimeInstance({pattern:r}).format(t)})}a.registerCustomFormatter(this.FIORI_LABEL_SHORTFORMAT_10,function(t){return sap.ui.core.format.NumberFormat.getIntegerInstance({style:\"short\",maxFractionDigits:10}).format(t)}),a.registerCustomFormatter(this.FIORI_LABEL_FORMAT_2,function(t){return sap.ui.core.format.NumberFormat.getFloatInstance({style:\"Standard\",maxFractionDigits:2}).format(t)}),a.registerCustomFormatter(this.FIORI_LABEL_SHORTFORMAT_2,function(t){return sap.ui.core.format.NumberFormat.getIntegerInstance({style:\"short\",maxFractionDigits:2}).format(t)}),a.registerCustomFormatter(this.FIORI_PERCENTAGE_FORMAT_2,function(t){return sap.ui.core.format.NumberFormat.getPercentInstance({style:\"precent\",maxFractionDigits:2}).format(t)});var o={month_s1:\"M\",month_s2:\"MM\",month_s3:\"MMM\",month_s4:\"MMMM\",month_day_s1:\"MM/dd\",month_day_s5:\"MMM d\",month_day_s6:\"MMMM d\",year_s0:\"yy\",year_s1:\"yyy\",year_s2:\"yyyy\",YearMonthDay:\"MM/dd/yy\"};for(var n in o)o.hasOwnProperty(n)&&e(n,o[n]);r.numericFormatter(a)}}});",
	"web/ui5/test-resources/sap/viz/demokit/sample/Column/InitPage.js": "sap.ui.define([],function(){return{initPageSettings:function(e){if(sap.ui.Device.system.phone){var t=e.byId(\"settingsPanel\");t&&t.setExpanded(!1)}if(jQuery.sap.sjax({type:\"HEAD\",url:sap.ui.resource(\"sap.suite.ui.commons\",\"library.js\")}).success){sap.ui.getCore().loadLibrary(\"sap.suite.ui.commons\");var i=e.byId(\"idVizFrame\"),n=new sap.suite.ui.commons.ChartContainerContent({icon:\"sap-icon://horizontal-bar-chart\",title:\"vizFrame Bar Chart Sample\",content:[i]}),s=new sap.suite.ui.commons.ChartContainer({content:[n]});s.setShowFullScreen(!0),s.setAutoAdjustHeight(!0),e.byId(\"chartFixFlex\").setFlexContent(s)}}}});",
	"web/ui5/test-resources/sap/viz/demokit/sample/Column/Column.view.xml": "<mvc:View controllerName=\"sap.viz.sample.Column.Column\" xmlns=\"sap.m\"\r\n    xmlns:viz=\"sap.viz.ui5.controls\" xmlns:layout=\"sap.ui.layout\"\r\n    xmlns:mvc=\"sap.ui.core.mvc\" xmlns:viz.feeds=\"sap.viz.ui5.controls.common.feeds\"\r\n    xmlns:viz.data=\"sap.viz.ui5.data\" height=\"100%\"><layout:FixFlex id='chartFixFlex' minFlexSize=\"250\"><layout:fixContent><Panel id='settingsPanel' class=\"panelStyle\" expandable=\"true\" expanded=\"true\" headerText=\"Settings\" width=\"auto\"><content><HBox class='settingsHBox'><VBox class='settingsBox'><Label text=\"{/dataset/name}\" design=\"Bold\" class='settingsLabel'></Label><RadioButtonGroup id='datasetRadioGroup'\r\n                                buttons=\"{path: '/dataset/values'}\"><buttons><RadioButton class='settingsRadio' text=\"{name}\" select=\"onDatasetSelected\"/></buttons></RadioButtonGroup></VBox><VBox class='settingsBox'><Label text='{/series/name}' design=\"Bold\" class='settingsLabel'></Label><RadioButtonGroup id='seriesRadioGroup'\r\n                            buttons=\"{path: '/series/values'}\" ><buttons><RadioButton class='settingsRadio' text=\"{name}\" select='onSeriesSelected'/></buttons></RadioButtonGroup></VBox><VBox class='settingsBox'><Label text = '{/dataLabel/name}' design=\"Bold\" class='settingsLabel'></Label><Switch class='settingsSwitch' state=\"{/dataLabel/defaultState}\" change='onDataLabelChanged'><layoutData><FlexItemData growFactor=\"1\" /></layoutData></Switch></VBox><VBox class='settingsBox'><Label text = '{/axisTitle/name}' design=\"Bold\" class='settingsLabel'></Label><Switch class='settingsSwitch' state=\"{/axisTitle/defaultState}\" change='onAxisTitleChanged'><layoutData><FlexItemData growFactor=\"1\" /></layoutData></Switch></VBox></HBox></content></Panel></layout:fixContent><layout:flexContent><viz:Popover id=\"idPopOver\"></viz:Popover><viz:VizFrame id=\"idVizFrame\" uiConfig=\"{applicationSet:'fiori'}\"\r\n                height='100%' width=\"100%\" vizType='column'><viz:dataset><viz.data:FlattenedDataset data=\"{/milk}\"><viz.data:dimensions><viz.data:DimensionDefinition name=\"Week\"\r\n                                value=\"{Week}\" /></viz.data:dimensions><viz.data:measures><viz.data:MeasureDefinition name=\"Revenue\"\r\n                                value=\"{Revenue}\" /><viz.data:MeasureDefinition name=\"Cost\"\r\n                                value=\"{Cost}\" /></viz.data:measures></viz.data:FlattenedDataset></viz:dataset><viz:feeds><viz.feeds:FeedItem id='valueAxisFeed' uid=\"valueAxis\" type=\"Measure\"\r\n                        values=\"Revenue\" /><viz.feeds:FeedItem id='categoryAxisFeed' uid=\"categoryAxis\" type=\"Dimension\"\r\n                        values=\"Week\" /></viz:feeds></viz:VizFrame></layout:flexContent></layout:FixFlex></mvc:View>"
}, "web/ui5/test-resources/sap/viz/demokit/sample/Column/Component-preload");