sap.ui.require.preload({
	"web/ui5/test-resources/sap/ui/comp/qunit/personalization/applicationUnderTest/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\",\"sap/ui/core/mvc/View\"],function(e,i){\"use strict\";return e.extend(\"applicationUnderTest.Component\",{createContent:function(){return sap.ui.view({viewName:\"view.Main\",type:sap.ui.core.mvc.ViewType.XML})}})});",
	"web/ui5/test-resources/sap/ui/comp/qunit/personalization/applicationUnderTest/view/Main.controller.js": "sap.ui.define([\"sap/ui/core/mvc/Controller\",\"sap/ui/core/util/MockServer\",\"sap/ui/comp/personalization/Controller\",\"sap/ui/model/analytics/ODataModelAdapter\",\"sap/ui/model/odata/ODataModel\",\"test/sap/ui/comp/personalization/Util\"],function(e,t,o,a,r,i){\"use strict\";return e.extend(\"view.Main\",{onInit:function(){this.oMockServer=new t({rootUri:\"/mockserver/\"}),this.oMockServer.simulate(\"../../../../../../../test-resources/sap/ui/comp/qunit/personalization/applicationUnderTest/mockserver/metadata.xml\",\"../../../../../../../test-resources/sap/ui/comp/qunit/personalization/applicationUnderTest/mockserver/\"),this.oMockServer.start(),this.oModel=new r(\"/mockserver\",!0),a.apply(this.oModel),this.getView().setModel(this.oModel);var e=this.byId(\"AnalyticalTable\");i.addAnalyticalColumns(e,this.oModel,\"ProductCollection\"),e.setModel(this.oModel),e.bindRows({path:\"/ProductCollection\",parameters:{entitySet:\"ProductCollection\",useBatchRequests:!0,useAcceleratedAutoExpand:!1}}),i.addSorter(e,[{path:\"Category\",order:\"Ascending\"}]),i.addFilterer(e,[{path:\"Date\",operation:sap.ui.model.FilterOperator.EQ,value1:new Date(13975128e5),value2:\"\"}]),this.oP13nDialogController=new o({table:e,resetToInitialTableState:!0,setting:{sort:{},filter:{},columns:{},group:{}}}),this.oP13nDialogController.attachAfterP13nModelDataChange(this.fHandleAfterP13nModelDataChange,this)},onExit:function(){this.oMockServer.stop(),this.oModel.destroy()},onP13nDialogPress:function(e){this.oP13nDialogController.openDialog()},onSetVariantPress:function(e){var t=this.byId(\"AnalyticalTable\");jQuery.sap.require(\"sap.ui.comp.qunit.personalization.test.Util\"),sap.ui.comp.qunit.personalization.test.Util.getController(t).oP13nDialogController.setPersonalizationData({columns:{columnsItems:[]},sort:{sortItems:[{columnKey:\"Name\",operation:\"Descending\"}]},filter:{filterItems:[]},group:{groupItems:[]}})},fHandleAfterP13nModelDataChange:function(e){var t=e.getParameter(\"changeData\"),o=e.getParameter(\"changeTypeVariant\"),a=e.oSource.getTable();i.setDirtyFlag(this.byId(\"IDDirtyFlagLabel\"),sap.ui.comp.personalization.Util.hasChangedType(o)),i.updateSortererFromP13nModelDataChange(a,t),i.updateFiltererFromP13nModelDataChange(a,t)}})});",
	"web/ui5/test-resources/sap/ui/comp/qunit/personalization/applicationUnderTest/view/Main.view.xml": "<mvc:View id=\"myView\" class=\"sapUiSizeCompact\" xmlns:model=\"sap.ui.model\"\r\n\txmlns:core=\"sap.ui.core\" xmlns=\"sap.m\"\r\n\txmlns:customData=\"http://schemas.sap.com/sapui5/extension/sap.ui.core.CustomData/1\"\r\n\txmlns:mvc=\"sap.ui.core.mvc\" xmlns:table=\"sap.ui.table\" controllerName=\"view.Main\"><App id=\"myApp\"><table:AnalyticalTable id=\"AnalyticalTable\"><table:toolbar><Toolbar><Button id=\"IDSetVariantButton\" icon=\"sap-icon://download-from-cloud\"\r\n\t\t\t\t\t\tpress=\"onSetVariantPress\" /><Label id=\"IDDirtyFlagLabel\" text=\"\"></Label><ToolbarSpacer></ToolbarSpacer><Button id=\"IDP13nDialogButton\" icon=\"sap-icon://action-settings\"\r\n\t\t\t\t\t\tpress=\"onP13nDialogPress\" /></Toolbar></table:toolbar></table:AnalyticalTable></App></mvc:View>\r\n"
}, "web/ui5/test-resources/sap/ui/comp/qunit/personalization/applicationUnderTest/Component-preload");