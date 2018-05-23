sap.ui.require.preload({
	"web/ui5/test-resources/sap/ui/comp/demokit/sample/smartchart/Component.js": "jQuery.sap.declare(\"sap.ui.comp.sample.smartchart.Component\"),sap.ui.core.UIComponent.extend(\"sap.ui.comp.sample.smartchart.Component\",{metadata:{rootView:\"sap.ui.comp.sample.smartchart.SmartChart\",dependencies:{libs:[\"sap.m\",\"sap.ui.comp\"]},config:{sample:{stretch:!0,files:[\"SmartChart.view.xml\",\"SmartChart.controller.js\",\"mockserver/metadata.xml\"]}}}});",
	"web/ui5/test-resources/sap/ui/comp/demokit/sample/smartchart/SmartChart.controller.js": "sap.ui.controller(\"sap.ui.comp.sample.smartchart.SmartChart\",{onInit:function(){var t;jQuery.sap.require(\"sap.ui.core.util.MockServer\");var e=new sap.ui.core.util.MockServer({rootUri:\"sapuicompsmartchart/\"});this._oMockServer=e,e.simulate(\"test-resources/sap/ui/comp/demokit/sample/smartchart/mockserver/metadata.xml\",\"test-resources/sap/ui/comp/demokit/sample/smartchart/mockserver/\"),e.start(),(t=new sap.ui.model.odata.ODataModel(\"sapuicompsmartchart\",!0)).setCountSupported(!1),this.getView().setModel(t),this.bUseVariants=!1},onExit:function(){this._oMockServer.stop()},toggleVariantManagement:function(){var t=this.getView().byId(\"toggleVariantMangement\");this.bUseVariants?(t.setText(\"Enable Variant Management\"),this.getView().byId(\"withoutVariant\").setVisible(!0),this.getView().byId(\"withVariant\").setVisible(!1)):(t.setText(\"Disable Variant Management\"),this.getView().byId(\"withoutVariant\").setVisible(!1),this.getView().byId(\"withVariant\").setVisible(!0)),this.bUseVariants=!this.bUseVariants},_getCurrentChart:function(){var t=null;return this.getView().byId(\"withoutVariant\").getVisible()?t=this.getView().byId(\"ItemsSmartChart\"):this.getView().byId(\"withoutVariant\").getVisible()&&(t=this.getView().byId(\"ItemsSmartChart2\")),t},toggleButtonList:function(){var t=this._getCurrentChart();t&&(t.__getAvailableChartTypes?(t._getAvailableChartTypes=t.__getAvailableChartTypes,delete t.__getAvailableChartTypes,t.setUseListForChartTypeSelection(!0)):(t.__getAvailableChartTypes=t._getAvailableChartTypes,t._getAvailableChartTypes=function(){return[{key:\"bar\",text:\"Bar\"},{key:\"column\",text:\"Column\"},{key:\"donut\",text:\"Donut\"}]},t.setUseListForChartTypeSelection(!1)),t._updateVisibilityOfChartTypes(t._oSegmentedButton))},toggleDetailsButton:function(){var t=this._getCurrentChart();t.setShowDetailsButton(!t.getShowDetailsButton()),t.setShowSemanticNavigationButton(!t.getShowSemanticNavigationButton())},toggleDrillBreadcrumbs:function(){var t=this._getCurrentChart();t.setShowDrillBreadcrumbs(!t.getShowDrillBreadcrumbs())}});",
	"web/ui5/test-resources/sap/ui/comp/demokit/sample/smartchart/SmartChart.view.xml": "<core:View xmlns:core=\"sap.ui.core\" xmlns=\"sap.m\"\n\txmlns:smartfilterbar=\"sap.ui.comp.smartfilterbar\"\n\txmlns:smartChart=\"sap.ui.comp.smartchart\"\n\txmlns:html=\"http://www.w3.org/1999/xhtml\"\n\txmlns:app=\"http://schemas.sap.com/sapui5/extension/sap.ui.core.CustomData/1\"\n\tcontrollerName=\"sap.ui.comp.sample.smartchart.SmartChart\" height=\"100%\"><Button id=\"toggleVariantMangement\" text=\"Enable Variant Management\" press=\"toggleVariantManagement\"></Button><Button id=\"toggleChartType\" text=\"Toggle ChartType display\" press=\"toggleButtonList\"></Button><Button id=\"toggleDetailsButton\" text=\"Toggle Details Button\" press=\"toggleDetailsButton\"></Button><Button id=\"toggleBreadcrumbs\" text=\"Toggle Drill Breadcrumbs\" press=\"toggleDrillBreadcrumbs\"></Button><VBox fitContainer=\"true\" id=\"withoutVariant\"><smartfilterbar:SmartFilterBar id=\"SmartFilterBar\" entityType=\"ZFAR_CUSTOMER_LINE_ITEMS2_SRV.Item\" showClearButton=\"true\" search=\"onSearchButtonPressed\" reset=\"onReset\" beforeVariantSave=\"onBeforeVariantSave\" afterVariantLoad=\"onAfterVariantLoad\"><smartfilterbar:customData><core:CustomData key=\"defaultDropDownDisplayBehaviour\" value=\"descriptionOnly\"/><core:CustomData key=\"defaultTokenDisplayBehaviour\" value=\"idAndDescription\"/><core:CustomData key=\"dateFormatSettings\" value='\\{\"UTC\":true,\"style\":\"short\"\\}' /></smartfilterbar:customData><smartfilterbar:controlConfiguration><smartfilterbar:ControlConfiguration\n\t\t\t\t\t\t\t\t\tid=\"fin.ar.lineitems.display.ValueHelpCustomer\" key=\"Customer\"\n\t\t\t\t\t\t\t\t\tindex=\"0\" groupId=\"_BASIC\" /><smartfilterbar:ControlConfiguration\n\t\t\t\t\t\t\t\t\tid=\"fin.ar.lineitems.display.ValueHelpCompany\" key=\"CompanyCode\"\n\t\t\t\t\t\t\t\t\tindex=\"1\" groupId=\"_BASIC\" /><smartfilterbar:ControlConfiguration\n\t\t\t\t\t\t\t\t\tid=\"fin.ar.lineitems.display.DateClearingDate\" key=\"ClearingDate\"\n\t\t\t\t\t\t\t\t\tcontrolType=\"date\" filterType=\"interval\" index=\"3\" hasTypeAhead=\"false\"\n\t\t\t\t\t\t\t\t\tgroupId=\"_BASIC\" visible=\"false\" /><smartfilterbar:ControlConfiguration\n\t\t\t\t\t\t\t\t\tid=\"fin.ar.lineitems.display.DateKeyDate\" key=\"KeyDate\"\n\t\t\t\t\t\t\t\t\tcontrolType=\"date\" index=\"4\" hasTypeAhead=\"false\" groupId=\"_BASIC\" /><smartfilterbar:ControlConfiguration\n\t\t\t\t\t\t\t\t\tid=\"fin.ar.lineitems.display.DateEntryDate\" key=\"AccountingDocumentCreationDate\"\n\t\t\t\t\t\t\t\t\tcontrolType=\"date\" filterType=\"interval\" index=\"5\" hasTypeAhead=\"false\"\n\t\t\t\t\t\t\t\t\tgroupId=\"fin.ar.lineitems.display.AccountingDocumentGroup\" /><smartfilterbar:ControlConfiguration\n\t\t\t\t\t\t\t\t\tid=\"fin.ar.lineitems.display.InputFiscalYearPeriodInterval\" key=\"FiscalYearPeriod\"\n\t\t\t\t\t\t\t\t\tcontrolType=\"input\" index=\"6\" groupId=\"_BASIC\" visible=\"false\" /><smartfilterbar:ControlConfiguration\n\t\t\t\t\t\t\t\t\tid=\"fin.ar.lineitems.display.DatePostingDate\" key=\"PostingDate\"\n\t\t\t\t\t\t\t\t\tcontrolType=\"date\" filterType=\"interval\" index=\"7\" hasTypeAhead=\"false\"\n\t\t\t\t\t\t\t\t\tgroupId=\"_BASIC\" visible=\"false\" /></smartfilterbar:controlConfiguration><smartfilterbar:layoutData><FlexItemData shrinkFactor=\"0\" /></smartfilterbar:layoutData></smartfilterbar:SmartFilterBar><smartChart:SmartChart id=\"ItemsSmartChart\" entitySet=\"Items\" smartFilterId=\"SmartFilterBar\" \n\t\t\t\t\t\t\t\tshowFullScreenButton=\"true\" useChartPersonalisation=\"false\" enableAutoBinding=\"true\" showDetailsButton=\"false\"><smartChart:layoutData><FlexItemData growFactor=\"1\"/></smartChart:layoutData></smartChart:SmartChart></VBox><VBox fitContainer=\"true\" id=\"withVariant\" visible=\"false\"><smartfilterbar:SmartFilterBar id=\"SmartFilterBar2\" entityType=\"ZFAR_CUSTOMER_LINE_ITEMS2_SRV.Item\" showClearButton=\"true\" search=\"onSearchButtonPressed\" reset=\"onReset\" beforeVariantSave=\"onBeforeVariantSave\" afterVariantLoad=\"onAfterVariantLoad\" persistencyKey=\"Test\"><smartfilterbar:customData><core:CustomData key=\"defaultDropDownDisplayBehaviour\" value=\"descriptionOnly\"/><core:CustomData key=\"defaultTokenDisplayBehaviour\" value=\"idAndDescription\"/><core:CustomData key=\"dateFormatSettings\" value='\\{\"UTC\":true,\"style\":\"short\"\\}' /></smartfilterbar:customData><smartfilterbar:controlConfiguration><smartfilterbar:ControlConfiguration\n\t\t\t\t\t\t\t\t\tid=\"fin.ar.lineitems.display.ValueHelpCustomer2\" key=\"Customer\"\n\t\t\t\t\t\t\t\t\tindex=\"0\" groupId=\"_BASIC\" /><smartfilterbar:ControlConfiguration\n\t\t\t\t\t\t\t\t\tid=\"fin.ar.lineitems.display.ValueHelpCompany2\" key=\"CompanyCode\"\n\t\t\t\t\t\t\t\t\tindex=\"1\" groupId=\"_BASIC\" /><smartfilterbar:ControlConfiguration\n\t\t\t\t\t\t\t\t\tid=\"fin.ar.lineitems.display.DateClearingDate2\" key=\"ClearingDate\"\n\t\t\t\t\t\t\t\t\tcontrolType=\"date\" filterType=\"interval\" index=\"3\" hasTypeAhead=\"false\"\n\t\t\t\t\t\t\t\t\tgroupId=\"_BASIC\" visible=\"false\" /><smartfilterbar:ControlConfiguration\n\t\t\t\t\t\t\t\t\tid=\"fin.ar.lineitems.display.DateKeyDate2\" key=\"KeyDate\"\n\t\t\t\t\t\t\t\t\tcontrolType=\"date\" index=\"4\" hasTypeAhead=\"false\" groupId=\"_BASIC\" /><smartfilterbar:ControlConfiguration\n\t\t\t\t\t\t\t\t\tid=\"fin.ar.lineitems.display.DateEntryDate2\" key=\"AccountingDocumentCreationDate\"\n\t\t\t\t\t\t\t\t\tcontrolType=\"date\" filterType=\"interval\" index=\"5\" hasTypeAhead=\"false\"\n\t\t\t\t\t\t\t\t\tgroupId=\"fin.ar.lineitems.display.AccountingDocumentGroup\" /><smartfilterbar:ControlConfiguration\n\t\t\t\t\t\t\t\t\tid=\"fin.ar.lineitems.display.InputFiscalYearPeriodInterval2\" key=\"FiscalYearPeriod\"\n\t\t\t\t\t\t\t\t\tcontrolType=\"input\" index=\"6\" groupId=\"_BASIC\" visible=\"false\" /><smartfilterbar:ControlConfiguration\n\t\t\t\t\t\t\t\t\tid=\"fin.ar.lineitems.display.DatePostingDate2\" key=\"PostingDate\"\n\t\t\t\t\t\t\t\t\tcontrolType=\"date\" filterType=\"interval\" index=\"7\" hasTypeAhead=\"false\"\n\t\t\t\t\t\t\t\t\tgroupId=\"_BASIC\" visible=\"false\" /></smartfilterbar:controlConfiguration><smartfilterbar:layoutData><FlexItemData shrinkFactor=\"0\" /></smartfilterbar:layoutData></smartfilterbar:SmartFilterBar><smartChart:SmartChart i=\"ItemsSmartChart2\" entitySet=\"Items\" useVariantManagement=\"true\" smartFilterId=\"SmartFilterBar\" useChartPersonalisation=\"false\"\n\t\t\t\t\t\t\t\t\tshowFullScreenButton=\"true\" enableAutoBinding=\"true\" persistencyKey=\"Test\" showDetailsButton=\"false\"><smartChart:layoutData><FlexItemData growFactor=\"1\"/></smartChart:layoutData></smartChart:SmartChart></VBox></core:View>\n"
}, "web/ui5/test-resources/sap/ui/comp/demokit/sample/smartchart/Component-preload");