sap.ui.require.preload({
	"web/ui5/test-resources/sap/suite/ui/commons/demokit/sample/ChartContainerFixFlexLayout/ChartContainer.controller.js": "sap.ui.controller(\"sap.suite.ui.commons.sample.ChartContainerFixFlexLayout.ChartContainer\",{_constants:{sampleName:\"sap.suite.ui.commons.sample.ChartContainerFixFlexLayout\",vizFrame:{id:\"chartContainerVizFrame\",dataset:{dimensions:[{name:\"Country\",value:\"{Country}\"}],measures:[{group:1,name:\"Profit\",value:\"{Revenue2}\"},{group:1,name:\"Target\",value:\"{Target}\"},{group:1,name:\"Forcast\",value:\"{Forcast}\"},{group:1,name:\"Revenue\",value:\"{Revenue}\"},{group:1,name:\"Revenue2\",value:\"{Revenue2}\"},{group:1,name:\"Revenue3\",value:\"{Revenue3}\"}],data:{path:\"/Products\"}},modulePath:\"/ChartContainerData1.json\",type:\"line\",properties:{plotArea:{showGap:!0}},feedItems:[{uid:\"primaryValues\",type:\"Measure\",values:[\"Revenue\"]},{uid:\"axisLabels\",type:\"Dimension\",values:[\"Country\"]},{uid:\"targetValues\",type:\"Measure\",values:[\"Target\"]}]},table:{id:\"chartContainerContentTable\",itemBindingPath:\"/businessData\",columnLabelTexts:[\"Sales Month\",\"Marital Status\",\"Customer Gender\",\"Sales Quarter\",\"Cost\",\"Unit Price\",\"Gross Profit\",\"Sales Revenue\"],templateCellLabelTexts:[\"{Sales_Month}\",\"{Marital Status}\",\"{Customer Gender}\",\"{Sales_Quarter}\",\"{Cost}\",\"{Unit Price}\",\"{Gross Profit}\",\"{Sales Revenue}\"],modulePath:\"/ChartContainerData2.json\"}},onInit:function(){var e=this.getView().byId(this._constants.vizFrame.id),t=this.getView().byId(this._constants.table.id);this._updateVizFrame(e),this._updateTable(t)},_updateVizFrame:function(e){var t=this._constants.vizFrame,a=jQuery.sap.getModulePath(this._constants.sampleName,t.modulePath),s=new sap.ui.model.json.JSONModel(a),n=new sap.viz.ui5.data.FlattenedDataset(t.dataset);e.setVizProperties(t.properties),e.setDataset(n),e.setModel(s),this._addFeedItems(e,t.feedItems),e.setVizType(t.type)},_updateTable:function(e){for(var t=this._constants.table,a=jQuery.sap.getModulePath(this._constants.sampleName,t.modulePath),s=new sap.ui.model.json.JSONModel(a),n=this._createTableColumns(t.columnLabelTexts),r=0;r<n.length;r++)e.addColumn(n[r]);var o=new sap.m.ColumnListItem({type:sap.m.ListType.Active,cells:this._createLabels(t.templateCellLabelTexts)});e.bindItems(t.itemBindingPath,o),e.setModel(s)},_addFeedItems:function(e,t){for(var a=0;a<t.length;a++)e.addFeed(new sap.viz.ui5.controls.common.feeds.FeedItem(t[a]))},_createTableColumns:function(e){var t=this._createLabels(e);return this._createControls(sap.m.Column,\"header\",t)},_createLabels:function(e){return this._createControls(sap.m.Label,\"text\",e)},_createControls:function(e,t,a){for(var s=[],n={},r=0;r<a.length;r++)n[t]=a[r],s.push(new e(n));return s}});",
	"web/ui5/test-resources/sap/suite/ui/commons/demokit/sample/ChartContainerFixFlexLayout/Component.js": "jQuery.sap.declare(\"sap.suite.ui.commons.sample.ChartContainerFixFlexLayout.Component\"),sap.ui.core.UIComponent.extend(\"sap.suite.ui.commons.sample.ChartContainerFixFlexLayout.Component\",{metadata:{rootView:\"sap.suite.ui.commons.sample.ChartContainerFixFlexLayout.ChartContainer\",includes:[\"style.css\"],dependencies:{libs:[\"sap.m\",\"sap.ui.core\",\"sap.suite.ui.commons\"]},config:{sample:{files:[\"ChartContainer.view.xml\",\"ChartContainer.controller.js\",\"ChartContainerData1.json\",\"ChartContainerData2.json\",\"style.css\"]}}}});",
	"web/ui5/test-resources/sap/suite/ui/commons/demokit/sample/ChartContainerFixFlexLayout/ChartContainer.view.xml": "<mvc:View\r\n\tcontrollerName=\"sap.suite.ui.commons.sample.ChartContainerFixFlexLayout.ChartContainer\"\r\n\txmlns=\"sap.suite.ui.commons\"\r\n\txmlns:m=\"sap.m\"\r\n\txmlns:mvc=\"sap.ui.core.mvc\"\r\n\txmlns:viz=\"sap.viz.ui5.controls\"\r\n\txmlns:layout=\"sap.ui.layout\"\r\n\txmlns:core=\"sap.ui.core\"\r\n\theight=\"100%\"><m:Page class=\"sapDemokitSuiteChartContainerFixFlex\" title=\"ChartContainer\" enableScrolling=\"false\"><m:content><layout:FixFlex><layout:fixContent><m:Text text=\"Fixed Content\"></m:Text></layout:fixContent><layout:flexContent><ChartContainer\r\n\t\t\t\t\t\tid=\"chartContainer\"\r\n\t\t\t\t\t\tshowFullScreen=\"true\"\r\n\t\t\t\t\t\tshowPersonalization=\"false\"\r\n\t\t\t\t\t\tautoAdjustHeight=\"true\"\r\n\t\t\t\t\t\tshowLegend=\"true\"\r\n\t\t\t\t\t\tpersonalizationPress=\"attachPersonalizationPress\"\r\n\t\t\t\t\t\tcontentChange=\"attachContentChange\"\r\n\t\t\t\t\t\ttitle=\"Revenue\"><content><ChartContainerContent\r\n\t\t\t\t\t\t\t\ticon = \"sap-icon://line-chart\"\r\n\t\t\t\t\t\t\t\ttitle = \"Line Chart\"><content><viz:VizFrame id=\"chartContainerVizFrame\" height=\"100%\" width=\"100%\" uiConfig=\"{applicationSet:'fiori'}\"></viz:VizFrame></content></ChartContainerContent><ChartContainerContent\r\n\t\t\t\t\t\t\t\ticon = \"sap-icon://table-view\"\r\n\t\t\t\t\t\t\t\ttitle = \"Table\"><content><m:Table id=\"chartContainerContentTable\"></m:Table></content></ChartContainerContent></content></ChartContainer></layout:flexContent></layout:FixFlex></m:content></m:Page></mvc:View>"
}, "web/ui5/test-resources/sap/suite/ui/commons/demokit/sample/ChartContainerFixFlexLayout/Component-preload");