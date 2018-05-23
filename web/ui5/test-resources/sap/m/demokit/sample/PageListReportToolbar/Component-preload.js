sap.ui.require.preload({
	"web/ui5/test-resources/sap/m/demokit/sample/PageListReportToolbar/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.m.sample.PageListReportToolbar.Component\",{metadata:{rootView:\"sap.m.sample.PageListReportToolbar.Page\",dependencies:{libs:[\"sap.m\",\"sap.ui.layout\",\"sap.ui.table\"]},config:{sample:{stretch:!0,files:[\"Page.view.xml\"]}}}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/PageListReportToolbar/Page.view.xml": "<mvc:View xmlns:mvc=\"sap.ui.core.mvc\"\n\txmlns=\"sap.m\"\n\txmlns:c=\"sap.ui.core\"\n\txmlns:t=\"sap.ui.table\"\n\txmlns:f=\"sap.ui.layout.form\"\n\theight=\"100%\"><Page enableScrolling=\"true\" title=\"Title\"><content><VBox fitContainer=\"true\"><f:SimpleForm id=\"SimpleFormDisplay480\"\n\t\t\t\t\tminWidth=\"1024\"\n\t\t\t\t\tmaxContainerCols=\"2\"\n\t\t\t\t\teditable=\"false\"\n\t\t\t\t\tlayout=\"ResponsiveGridLayout\"\n\t\t\t\t\ttitle=\"Address\"\n\t\t\t\t\tlabelSpanL=\"4\"\n\t\t\t\t\tlabelSpanM=\"4\"\n\t\t\t\t\temptySpanL=\"0\"\n\t\t\t\t\temptySpanM=\"0\"\n\t\t\t\t\tcolumnsL=\"2\"\n\t\t\t\t\tcolumnsM=\"2\"><f:content><c:Title text=\"Office\" /><Label text=\"Name\" /><Text text=\"Red Point Stores\" /><Label text=\"Street/No.\" /><Text text=\"Main St 1618\" /><Label text=\"ZIP Code/City\" /><Text text=\"31415 Maintown\" /><Label text=\"Country\" /><Text text=\"Germany\" /><c:Title text=\"Online\" /><Label text=\"Web\" /><Text text=\"http://www.sap.com\" /><Label text=\"Twitter\" /><Text text=\"@sap\" /></f:content><f:layoutData><FlexItemData shrinkFactor=\"0\"/></f:layoutData></f:SimpleForm><t:AnalyticalTable visibleRowCountMode=\"Auto\" selectionMode=\"MultiToggle\" rowHeight=\"32\"><t:toolbar><OverflowToolbar><Title text=\"Title Bar Here\"/><ToolbarSpacer /><SearchField width=\"12rem\" /><SegmentedButton><buttons><Button icon=\"sap-icon://table-view\" /><Button icon=\"sap-icon://bar-chart\" /></buttons></SegmentedButton><Button icon=\"sap-icon://group-2\" type=\"Transparent\" /><Button icon=\"sap-icon://action-settings\" type=\"Transparent\" /></OverflowToolbar></t:toolbar><t:columns><t:AnalyticalColumn /><t:AnalyticalColumn /><t:AnalyticalColumn /></t:columns><t:layoutData><FlexItemData growFactor=\"1\" baseSize=\"0%\" styleClass=\"sapUiResponsiveContentPadding\" /></t:layoutData></t:AnalyticalTable></VBox></content><footer><Toolbar><content><ToolbarSpacer /><Button text=\"Grouped View\" /><Button text=\"Classical Table\" /></content></Toolbar></footer></Page></mvc:View>"
}, "web/ui5/test-resources/sap/m/demokit/sample/PageListReportToolbar/Component-preload");