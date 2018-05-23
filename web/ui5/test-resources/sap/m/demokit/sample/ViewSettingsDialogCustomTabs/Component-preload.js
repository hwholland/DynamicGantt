sap.ui.require.preload({
	"web/ui5/test-resources/sap/m/demokit/sample/ViewSettingsDialogCustomTabs/C.controller.js": "sap.ui.controller(\"sap.m.sample.ViewSettingsDialogCustomTabs.C\",{onExit:function(){this._oDialog&&this._oDialog.destroy(),this._oDialogSingleCustomTab&&this._oDialogSingleCustomTab.destroy()},handleOpenDialog:function(i){this._oDialogSingleCustomTab&&(this._oDialogSingleCustomTab.destroy(),this._oDialogSingleCustomTab=null),this._oDialog||(this._oDialog=sap.ui.xmlfragment(\"sap.m.sample.ViewSettingsDialogCustomTabs.Dialog\",this)),this._oDialog.setModel(this.getView().getModel()),jQuery.sap.syncStyleClass(\"sapUiSizeCompact\",this.getView(),this._oDialog),this._oDialog.open()},handleOpenDialogSingleCustomTab:function(i){this._oDialog&&(this._oDialog.destroy(),this._oDialog=null),this._oDialogSingleCustomTab||(this._oDialogSingleCustomTab=sap.ui.xmlfragment(\"sap.m.sample.ViewSettingsDialogCustomTabs.DialogSingleCustomTab\",this)),this._oDialogSingleCustomTab.setModel(this.getView().getModel()),jQuery.sap.syncStyleClass(\"sapUiSizeCompact\",this.getView(),this._oDialogSingleCustomTab),this._oDialogSingleCustomTab.open()},handleConfirm:function(i){i.getParameters().filterString&&sap.m.MessageToast.show(i.getParameters().filterString)}});",
	"web/ui5/test-resources/sap/m/demokit/sample/ViewSettingsDialogCustomTabs/Component.js": "jQuery.sap.declare(\"sap.m.sample.ViewSettingsDialogCustomTabs.Component\"),sap.ui.core.UIComponent.extend(\"sap.m.sample.ViewSettingsDialogCustomTabs.Component\",{metadata:{rootView:\"sap.m.sample.ViewSettingsDialogCustomTabs.V\",dependencies:{libs:[\"sap.m\",\"sap.ui.layout\"]},includes:[\"style.css\"],config:{sample:{files:[\"style.css\",\"V.view.xml\",\"C.controller.js\",\"Dialog.fragment.xml\",\"DialogSingleCustomTab.fragment.xml\"]}}}});",
	"web/ui5/test-resources/sap/m/demokit/sample/ViewSettingsDialogCustomTabs/Dialog.fragment.xml": "<core:FragmentDefinition\n\t\txmlns=\"sap.m\"\n\t\txmlns:core=\"sap.ui.core\"><ViewSettingsDialog\n\t\t\tconfirm=\"handleConfirm\"><sortItems><ViewSettingsItem text=\"Field 1\" key=\"1\" selected=\"true\" /><ViewSettingsItem text=\"Field 2\" key=\"2\" /><ViewSettingsItem text=\"Field 3\" key=\"3\" /></sortItems><groupItems><ViewSettingsItem text=\"Field 1\" key=\"1\" selected=\"true\" /><ViewSettingsItem text=\"Field 2\" key=\"2\" /><ViewSettingsItem text=\"Field 3\" key=\"3\" /></groupItems><filterItems><ViewSettingsFilterItem text=\"Field1\" key=\"1\"><items><ViewSettingsItem text=\"Value A\" key=\"1a\" /><ViewSettingsItem text=\"Value B\" key=\"1b\" /><ViewSettingsItem text=\"Value C\" key=\"1c\" /></items></ViewSettingsFilterItem><ViewSettingsFilterItem text=\"Field2\" key=\"2\"><items><ViewSettingsItem text=\"Value A\" key=\"2a\" /><ViewSettingsItem text=\"Value B\" key=\"2b\" /><ViewSettingsItem text=\"Value C\" key=\"2c\" /></items></ViewSettingsFilterItem><ViewSettingsFilterItem text=\"Field3\" key=\"3\"><items><ViewSettingsItem text=\"Value A\" key=\"3a\" /><ViewSettingsItem text=\"Value B\" key=\"3b\" /><ViewSettingsItem text=\"Value C\" key=\"3c\" /></items></ViewSettingsFilterItem></filterItems><customTabs><ViewSettingsCustomTab id=\"app-settings\" icon=\"sap-icon://action-settings\" title=\"Settings\" tooltip=\"Application Settings\"><content><Panel height=\"338px\"><content><Label text=\"Theme\" design=\"Bold\" id=\"VSDThemeLabel\"/><SegmentedButton\n\t\t\t\t\t\t\t\tclass=\"vsdSetting\"\n\t\t\t\t\t\t\t\tselectedButton=\"VSDsap_bluecrystal\"\n\t\t\t\t\t\t\t\tid=\"VSDThemeButtons\"\n\t\t\t\t\t\t\t\twidth=\"100%\" ><Button text=\"High Contrast Black\" id=\"VSDsap_hcb\" /><Button text=\"Blue Crystal\" id=\"VSDsap_bluecrystal\" /></SegmentedButton><Label text=\"Compact Content Density\" design=\"Bold\" /><SegmentedButton\n\t\t\t\t\t\t\t\tclass=\"vsdSetting\"\n\t\t\t\t\t\t\t\tselectedButton=\"VSDcompactOn\"\n\t\t\t\t\t\t\t\tid=\"VSDCompactModeButtons\"\n\t\t\t\t\t\t\t\twidth=\"100%\" ><Button text=\"On\" id=\"VSDcompactOn\" /><Button text=\"Off\" id=\"VSDcompactOff\" /></SegmentedButton><Label text=\"Right To Left Mode\" design=\"Bold\" /><SegmentedButton\n\t\t\t\t\t\t\t\tselectedButton=\"VSDRTLOff\"\n\t\t\t\t\t\t\t\tid=\"VSDRTLButtons\"\n\t\t\t\t\t\t\t\twidth=\"100%\" ><Button text=\"On\" id=\"VSDRTLOn\" /><Button text=\"Off\" id=\"VSDRTLOff\" /></SegmentedButton></content></Panel></content></ViewSettingsCustomTab><ViewSettingsCustomTab id=\"example-settings\" tooltip=\"default icon\"><content><Button text=\"simple button example\" /></content></ViewSettingsCustomTab></customTabs></ViewSettingsDialog></core:FragmentDefinition>\n",
	"web/ui5/test-resources/sap/m/demokit/sample/ViewSettingsDialogCustomTabs/DialogSingleCustomTab.fragment.xml": "<core:FragmentDefinition\n\t\txmlns=\"sap.m\"\n\t\txmlns:core=\"sap.ui.core\"><ViewSettingsDialog\n\t\t\tconfirm=\"handleConfirm\"><customTabs><ViewSettingsCustomTab id=\"app-settings\" icon=\"sap-icon://action-settings\" title=\"Settings\" tooltip=\"Application Settings\"><content><Panel height=\"386px\"><content><Label text=\"Theme\" design=\"Bold\" id=\"VSDThemeLabel\"/><SegmentedButton\n\t\t\t\t\t\t\t\tclass=\"vsdSetting\"\n\t\t\t\t\t\t\t\tselectedButton=\"VSDsap_bluecrystal\"\n\t\t\t\t\t\t\t\tid=\"VSDThemeButtons\"\n\t\t\t\t\t\t\t\twidth=\"100%\" ><Button text=\"High Contrast Black\" id=\"VSDsap_hcb\" /><Button text=\"Blue Crystal\" id=\"VSDsap_bluecrystal\" /></SegmentedButton><Label text=\"Compact Content Density\" design=\"Bold\" /><SegmentedButton\n\t\t\t\t\t\t\t\tclass=\"vsdSetting\"\n\t\t\t\t\t\t\t\tselectedButton=\"VSDcompactOn\"\n\t\t\t\t\t\t\t\tid=\"VSDCompactModeButtons\"\n\t\t\t\t\t\t\t\twidth=\"100%\" ><Button text=\"On\" id=\"VSDcompactOn\" /><Button text=\"Off\" id=\"VSDcompactOff\" /></SegmentedButton><Label text=\"Right To Left Mode\" design=\"Bold\" /><SegmentedButton\n\t\t\t\t\t\t\t\tselectedButton=\"VSDRTLOff\"\n\t\t\t\t\t\t\t\tid=\"VSDRTLButtons\"\n\t\t\t\t\t\t\t\twidth=\"100%\" ><Button text=\"On\" id=\"VSDRTLOn\" /><Button text=\"Off\" id=\"VSDRTLOff\" /></SegmentedButton></content></Panel></content></ViewSettingsCustomTab></customTabs></ViewSettingsDialog></core:FragmentDefinition>\n",
	"web/ui5/test-resources/sap/m/demokit/sample/ViewSettingsDialogCustomTabs/V.view.xml": "<mvc:View\n\tcontrollerName=\"sap.m.sample.ViewSettingsDialogCustomTabs.C\"\n\txmlns:l=\"sap.ui.layout\"\n\txmlns:mvc=\"sap.ui.core.mvc\"\n\txmlns=\"sap.m\"><l:VerticalLayout\n\t\tclass=\"sapUiContentPadding\"\n\t\twidth=\"100%\"><l:content><Button\n\t\t\t\ttext=\"Open View Settings Dialog with several tabs\"\n\t\t\t\tpress=\"handleOpenDialog\" /><Button\n\t\t\t\t\ttext=\"Open View Settings Dialog with single custom tab\"\n\t\t\t\t\tpress=\"handleOpenDialogSingleCustomTab\" /></l:content></l:VerticalLayout></mvc:View>\n"
}, "web/ui5/test-resources/sap/m/demokit/sample/ViewSettingsDialogCustomTabs/Component-preload");