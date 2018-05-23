sap.ui.require.preload({
	"web/ui5/test-resources/sap/viz/demokit/sample/ConditionalDataLabel/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(a){\"use strict\";return a.extend(\"sap.viz.sample.ConditionalDataLabel.Component\",{metadata:{rootView:\"sap.viz.sample.ConditionalDataLabel.ConditionalDataLabel\",includes:[\"../../css/exploredStyle.css\"],dependencies:{libs:[\"sap.viz\",\"sap.m\"]},config:{sample:{stretch:!0,files:[\"ConditionalDataLabel.view.xml\",\"ConditionalDataLabel.controller.js\",\"CustomerFormat.js\",\"InitPage.js\"]}}}})});",
	"web/ui5/test-resources/sap/viz/demokit/sample/ConditionalDataLabel/ConditionalDataLabel.controller.js": "sap.ui.define([\"jquery.sap.global\",\"sap/ui/core/mvc/Controller\",\"sap/ui/model/json/JSONModel\",\"./CustomerFormat\",\"./InitPage\"],function(t,e,a,l,o){\"use strict\";return e=e.extend(\"sap.viz.sample.ConditionalDataLabel.ConditionalDataLabel\",{dataPath:\"test-resources/sap/viz/demokit/dataset/milk_production_testing_data/revenue_cost_consume/month.json\",settingsModel:{customValueDisplay:{name:\"Custom Value Display\",defaultSelected:0,values:[{name:\"First & Last\",vizProperties:{plotArea:{callout:{top:[{dataContext:[{Month:\"Jan\"},{Month:\"Dec\"}]}]},dataPointStyle:{rules:[{dataContext:{Month:\"Jan\"},properties:{dataLabel:!0}},{dataContext:{Month:\"Dec\"},properties:{dataLabel:!0}}],others:{properties:{dataLabel:!1}}}}}},{name:\"Max & Min\",vizProperties:{plotArea:{callout:{left:[{dataContext:[{Month:\"Sep\"},{Month:\"Mar\"}]}]},dataPointStyle:{rules:[{dataContext:{Month:\"Sep\"},properties:{dataLabel:!0}},{dataContext:{Month:\"Mar\"},properties:{dataLabel:!0}}],others:{properties:{dataLabel:!1}}}}}},{name:\"1 Specific Date Only\",vizProperties:{plotArea:{callout:{top:[{dataContext:[{Month:\"Jul\"}]}]},dataPointStyle:{rules:[{dataContext:{Month:\"Jul\"},properties:{dataLabel:!0}}],others:{properties:{dataLabel:!1}}}}}}]},valueLabelPosition:{name:\"Value Label Position\",defaultSelected:0,values:[{name:\"Outside\",value:!1},{name:\"Inside\",value:!0}]}},oVizFrame:null,feedValueAxis:null,onInit:function(t){this.initCustomFormat();var e=new a(this.settingsModel);this.getView().setModel(e);var i=this.oVizFrame=this.getView().byId(\"idVizFrame\"),r=this.settingsModel.customValueDisplay.values[0].vizProperties.plotArea,s=this.settingsModel.valueLabelPosition.values[0].value,n={interaction:{zoom:{enablement:\"disabled\"}},valueAxis:{label:{formatString:l.FIORI_LABEL_SHORTFORMAT_10},title:{visible:!1},visible:!1},categoryAxis:{title:{visible:!1}},dataLabel:{formatString:l.FIORI_LABEL_SHORTFORMAT_1,hideWhenOverlap:!1},title:{visible:!1},legend:{visible:!1},plotArea:{}};n.plotArea.isFixedDataPointSize=!1,n.plotArea.callout={},n.plotArea.callout.label={},n.plotArea.callout.label.formatString=l.FIORI_LABEL_SHORTFORMAT_2,s?(n.plotArea.dataPointStyle=r.dataPointStyle,n.plotArea.callout.top=null,n.plotArea.callout.left=null):(n.plotArea.dataPointStyle=null,n.plotArea.callout.top=r.callout.top,n.plotArea.callout.left=r.callout.left),this._plotAreaProps=r,this._valueLabelPosition=s,i.setVizProperties(n);var u=new a(this.dataPath);i.setModel(u);var p=this.getView().byId(\"idPopOver\");p.connect(i.getVizUid()),p.setFormatString(l.FIORI_LABEL_FORMAT_2),o.initPageSettings(this.getView())},onAfterRendering:function(){this.getView().byId(\"customValueDisplayRadioGroup\").setSelectedIndex(this.settingsModel.customValueDisplay.defaultSelected),this.getView().byId(\"valueLabelPositionRadioGroup\").setSelectedIndex(this.settingsModel.valueLabelPosition.defaultSelected)},updateProperties:function(){if(this.oVizFrame){var t={plotArea:{}};t.plotArea.callout={},t.plotArea.callout.label={},t.plotArea.callout.label.formatString=l.FIORI_LABEL_SHORTFORMAT_2,this._valueLabelPosition?(t.plotArea.dataPointStyle=this._plotAreaProps.dataPointStyle,t.plotArea.callout.top=null,t.plotArea.callout.left=null):(t.plotArea.dataPointStyle=null,t.plotArea.callout.top=this._plotAreaProps.callout.top,t.plotArea.callout.left=this._plotAreaProps.callout.left),this.oVizFrame.setVizProperties(t)}},onCustomValueSelected:function(t){var e=t.getSource();if(e.getSelected()){var a=e.getBindingContext().getObject();a.vizProperties&&a.vizProperties.plotArea&&(this._plotAreaProps=a.vizProperties.plotArea),this.updateProperties()}},onLabelPosSelected:function(t){var e=t.getSource();if(e.getSelected()){var a=e.getBindingContext().getObject();this._valueLabelPosition=a.value,this.updateProperties()}},initCustomFormat:function(){l.registerCustomFormat()}})});",
	"web/ui5/test-resources/sap/viz/demokit/sample/ConditionalDataLabel/CustomerFormat.js": "sap.ui.define([\"sap/viz/ui5/format/ChartFormatter\",\"sap/viz/ui5/api/env/Format\"],function(t,r){return{FIORI_LABEL_SHORTFORMAT_10:\"__UI5__ShortIntegerMaxFraction10\",FIORI_LABEL_FORMAT_2:\"__UI5__FloatMaxFraction2\",FIORI_LABEL_SHORTFORMAT_2:\"__UI5__ShortIntegerMaxFraction2\",FIORI_PERCENTAGE_FORMAT_2:\"__UI5__PercentageMaxFraction2\",FIORI_LABEL_SHORTFORMAT_1:\"__UI5__ShortIntegerMaxFraction1\",MFS1:\"month_s1\",MFS2:\"month_s2\",MFS3:\"month_s3\",MFS4:\"month_s4\",MDFS1:\"month_day_s1\",MDFS2:\"month_day_s5\",MDFS3:\"month_day_s6\",YFS0:\"year_s0\",YFS1:\"year_s1\",YFS2:\"year_s2\",chartFormatter:null,registerCustomFormat:function(){var a=this.chartFormatter=t.getInstance();function e(t,r){a.registerCustomFormatter(t,function(t){return sap.ui.core.format.DateFormat.getDateTimeInstance({pattern:r}).format(t)})}a.registerCustomFormatter(this.FIORI_LABEL_SHORTFORMAT_10,function(t){return sap.ui.core.format.NumberFormat.getIntegerInstance({style:\"short\",maxFractionDigits:10}).format(t)}),a.registerCustomFormatter(this.FIORI_LABEL_FORMAT_2,function(t){return sap.ui.core.format.NumberFormat.getFloatInstance({style:\"Standard\",maxFractionDigits:2}).format(t)}),a.registerCustomFormatter(this.FIORI_LABEL_SHORTFORMAT_2,function(t){return sap.ui.core.format.NumberFormat.getIntegerInstance({style:\"short\",maxFractionDigits:2}).format(t)}),a.registerCustomFormatter(this.FIORI_LABEL_SHORTFORMAT_1,function(t){return sap.ui.core.format.NumberFormat.getIntegerInstance({style:\"short\",maxFractionDigits:1}).format(t)}),a.registerCustomFormatter(this.FIORI_PERCENTAGE_FORMAT_2,function(t){return sap.ui.core.format.NumberFormat.getPercentInstance({style:\"precent\",maxFractionDigits:2}).format(t)});var o={month_s1:\"M\",month_s2:\"MM\",month_s3:\"MMM\",month_s4:\"MMMM\",month_day_s1:\"MM/dd\",month_day_s5:\"MMM d\",month_day_s6:\"MMMM d\",year_s0:\"yy\",year_s1:\"yyy\",year_s2:\"yyyy\",YearMonthDay:\"MM/dd/yy\"};for(var n in o)o.hasOwnProperty(n)&&e(n,o[n]);r.numericFormatter(a)}}});",
	"web/ui5/test-resources/sap/viz/demokit/sample/ConditionalDataLabel/InitPage.js": "sap.ui.define([],function(){return{initPageSettings:function(e){if(sap.ui.Device.system.phone){var t=e.byId(\"settingsPanel\");t&&t.setExpanded(!1)}if(jQuery.sap.sjax({type:\"HEAD\",url:sap.ui.resource(\"sap.suite.ui.commons\",\"library.js\")}).success){sap.ui.getCore().loadLibrary(\"sap.suite.ui.commons\");var i=e.byId(\"idVizFrame\"),n=new sap.suite.ui.commons.ChartContainerContent({icon:\"sap-icon://horizontal-bar-chart\",title:\"vizFrame Bar Chart Sample\",content:[i]}),s=new sap.suite.ui.commons.ChartContainer({content:[n]});s.setShowFullScreen(!0),s.setAutoAdjustHeight(!0),e.byId(\"chartFixFlex\").setFlexContent(s)}}}});",
	"web/ui5/test-resources/sap/viz/demokit/sample/ConditionalDataLabel/ConditionalDataLabel.view.xml": "<mvc:View controllerName=\"sap.viz.sample.ConditionalDataLabel.ConditionalDataLabel\" xmlns=\"sap.m\"\n    xmlns:viz=\"sap.viz.ui5.controls\" xmlns:layout=\"sap.ui.layout\"\n    xmlns:mvc=\"sap.ui.core.mvc\" xmlns:viz.feeds=\"sap.viz.ui5.controls.common.feeds\"\n    xmlns:viz.data=\"sap.viz.ui5.data\" height=\"100%\"><layout:FixFlex id='chartFixFlex' minFlexSize=\"250\"><layout:fixContent><Panel id='settingsPanel' class=\"panelStyle\" expandable=\"true\" expanded=\"true\" headerText=\"Settings\" width=\"auto\"><content><HBox width=\"200px\"><VBox><Label text=\"{/customValueDisplay/name}\" design=\"Bold\" class='settingsLabel'></Label><RadioButtonGroup id='customValueDisplayRadioGroup'\n                                buttons=\"{path: '/customValueDisplay/values'}\"><buttons><RadioButton text=\"{name}\" select=\"onCustomValueSelected\"/></buttons></RadioButtonGroup></VBox><VBox><Label text=\"{/valueLabelPosition/name}\" design=\"Bold\" class='settingsLabel'></Label><RadioButtonGroup id='valueLabelPositionRadioGroup'\n                                buttons=\"{path: '/valueLabelPosition/values'}\"><buttons><RadioButton text=\"{name}\" select=\"onLabelPosSelected\"/></buttons></RadioButtonGroup></VBox></HBox></content></Panel></layout:fixContent><layout:flexContent><viz:Popover id=\"idPopOver\"></viz:Popover><viz:VizFrame id=\"idVizFrame\" uiConfig=\"{applicationSet:'fiori'}\"\n                height=\"230px\" width=\"290px\" vizType='line'><viz:dataset><viz.data:FlattenedDataset data=\"{/milk}\"><viz.data:dimensions><viz.data:DimensionDefinition name=\"Month\"\n                                value=\"{Month}\" /></viz.data:dimensions><viz.data:measures><viz.data:MeasureDefinition name=\"Revenue\"\n                                value=\"{Revenue}\" /><viz.data:MeasureDefinition name=\"Cost\"\n                                value=\"{Cost}\" /></viz.data:measures></viz.data:FlattenedDataset></viz:dataset><viz:feeds><viz.feeds:FeedItem id=\"feedValueAxis\" uid=\"valueAxis\" type=\"Measure\"\n                        values=\"Revenue\" /><viz.feeds:FeedItem uid=\"categoryAxis\" type=\"Dimension\"\n                        values=\"Month\" /></viz:feeds></viz:VizFrame></layout:flexContent></layout:FixFlex></mvc:View>\n"
}, "web/ui5/test-resources/sap/viz/demokit/sample/ConditionalDataLabel/Component-preload");