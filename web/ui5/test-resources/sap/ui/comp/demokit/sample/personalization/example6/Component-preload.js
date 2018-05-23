sap.ui.require.preload({
	"web/ui5/test-resources/sap/ui/comp/demokit/sample/personalization/example6/Component.js": "jQuery.sap.declare(\"sap.ui.comp.sample.personalization.example6.Component\"),sap.ui.core.UIComponent.extend(\"sap.ui.comp.sample.personalization.example6.Component\",{metadata:{rootView:\"sap.ui.comp.sample.personalization.example6.Example\",dependencies:{libs:[\"sap.ui.comp\",\"sap.ui.layout\",\"sap.ui.table\"]},config:{sample:{files:[\"Example.view.xml\",\"Example.controller.js\"]}}}});",
	"web/ui5/test-resources/sap/ui/comp/demokit/sample/personalization/example6/Example.controller.js": "sap.ui.define([\"sap/ui/core/mvc/Controller\",\"sap/ui/model/json/JSONModel\",\"sap/ui/comp/personalization/Controller\",\"sap/ui/comp/personalization/Util\",\"../../../personalization/Util\"],function(e,t,o,a,n){\"use strict\";return e.extend(\"sap.ui.comp.sample.personalization.example6.Example\",{onInit:function(){jQuery.sap.require(\"sap.ui.core.util.MockServer\"),this.oMockServer=new sap.ui.core.util.MockServer({rootUri:\"demokit.personalization.example6/\"}),this.oMockServer.simulate(\"test-resources/sap/ui/comp/demokit/sample/personalization/mockserver/metadata.xml\",\"test-resources/sap/ui/comp/demokit/sample/personalization/mockserver/\"),this.oMockServer.start(),this.oModel=new sap.ui.model.odata.ODataModel(\"demokit.personalization.example6\",!0),sap.ui.model.analytics.ODataModelAdapter.apply(this.oModel),this.getView().setModel(this.oModel);var e=this.byId(\"AnalyticalTable\");this.addColumns(e,this.oModel),e.setModel(this.oModel),e.bindRows({path:\"/ProductCollection\",parameters:{entitySet:\"ProductCollection\",useBatchRequests:!0,useAcceleratedAutoExpand:!1}}),this.oP13nDialogController=new sap.ui.comp.personalization.Controller({table:e}),this.oP13nDialogController.attachAfterP13nModelDataChange(this.fHandleAfterP13nModelDataChange,this)},onExit:function(){this.oMockServer.stop(),this.oModel.destroy()},onP13nDialogPress:function(e){this.oP13nDialogController.openDialog()},addColumns:function(e,t){var o=t.getAnalyticalExtensions().findQueryResultByName(\"ProductCollection\"),a=o._oEntityType.getSortablePropertyNames(),n=o._oEntityType.getFilterablePropertyNames(),r=o.getAllDimensions();for(var i in r){var l=r[i].getKeyProperty().name;e.addColumn(new sap.ui.table.AnalyticalColumn({visible:!0,autoResizable:!0,showFilterMenuEntry:!1,template:l,sortProperty:-1===a.indexOf(l)?void 0:l,filterProperty:-1===n.indexOf(l)?void 0:l,leadingProperty:l}).data(\"p13nData\",{columnKey:l,aggregationRole:\"dimension\"}))}var s=o.getAllMeasures();for(var i in s){l=s[i].getRawValueProperty().name;e.addColumn(new sap.ui.table.AnalyticalColumn({visible:!0,autoResizable:!0,showFilterMenuEntry:!1,template:l,sortProperty:-1===a.indexOf(l)?void 0:l,filterProperty:-1===n.indexOf(l)?void 0:l,leadingProperty:l}).data(\"p13nData\",{columnKey:l,aggregationRole:\"measure\"}))}},fHandleAfterP13nModelDataChange:function(e){var t=e.getParameter(\"changeData\"),o=e.oSource.getTable(),r=o.getColumns(),i=o instanceof sap.m.Table?o.getBinding(\"items\"):o.getBinding(\"rows\");if(this.fSetDirtyFlag(o,e),t.sort&&t.sort.sortItems){var l=[];t.sort.sortItems.forEach(function(e){var t=n.getColumn(e.columnKey,r),o=a.getColumnKey(t),i=e.operation===sap.m.P13nConditionOperation.Descending,s=function(e,t){var o;return e.some(function(e){if(e.sPath===t)return o=e,!0},!0),o}(l,o);s?s.bDescending=i:l.push(new sap.ui.model.Sorter(o,i))},this),i.sort(l)}if(t.filter&&t.filter.filterItems){var s=[];t.filter.filterItems.forEach(function(e){var t=n.getColumn(e.columnKey,r),o=a.getColumnKey(t);s.push(new sap.ui.model.Filter(o,e.operation,e.value1,e.value2))},this),i.filter(s)}},fSetDirtyFlag:function(e,t){t.getParameter(\"persistentData\"),t.getParameter(\"changeData\"),t.getParameter(\"changeType\");var o=t.getParameter(\"changeTypeVariant\"),n=\"\";e instanceof sap.m.Table&&e.getHeaderToolbar()&&e.getHeaderToolbar().getContent()?n=e.getHeaderToolbar().getContent()[0].getText():e instanceof sap.ui.table.Table&&e.getToolbar()&&(n=e.getToolbar().getItems()[0].getText());var r=-1!==n.indexOf(\"*\")&&n.indexOf(\"*\")===n.length-1;if(!r&&a.hasChangedType(o)){var i=n+\" *\";e instanceof sap.m.Table?e.getHeaderToolbar().getContent()[0].setText(i):e.getToolbar().getItems()[0].setText(i)}else if(r&&!a.hasChangedType(o)){var l=n.substring(0,n.length-1);e instanceof sap.m.Table?e.getHeaderToolbar().getContent()[0].setText(l):e.getToolbar().getItems()[0].setText(l)}}})});",
	"web/ui5/test-resources/sap/ui/comp/demokit/sample/personalization/example6/Example.view.xml": "<core:View xmlns:core=\"sap.ui.core\" xmlns=\"sap.ui.commons\"\r\n\txmlns:table=\"sap.ui.table\" xmlns:html=\"http://www.w3.org/1999/xhtml\"\r\n\tcontrollerName=\"sap.ui.comp.sample.personalization.example6.Example\"><table:AnalyticalTable id=\"AnalyticalTable\"\r\n\t\titems=\"{/ProductCollection}\"><table:toolbar><Toolbar><Label text=\"Products\"></Label><rightItems><Button icon=\"sap-icon://action-settings\" press=\"onP13nDialogPress\" /></rightItems></Toolbar></table:toolbar></table:AnalyticalTable></core:View>"
}, "web/ui5/test-resources/sap/ui/comp/demokit/sample/personalization/example6/Component-preload");