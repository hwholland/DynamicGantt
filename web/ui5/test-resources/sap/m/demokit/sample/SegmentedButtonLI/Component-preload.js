sap.ui.require.preload({
	"web/ui5/test-resources/sap/m/demokit/sample/SegmentedButtonLI/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.m.sample.SegmentedButtonLI.Component\",{metadata:{rootView:\"sap.m.sample.SegmentedButtonLI.List\",dependencies:{libs:[\"sap.m\"]},config:{sample:{files:[\"List.view.xml\"]}}}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/SegmentedButtonLI/List.view.xml": "<mvc:View\n\txmlns:mvc=\"sap.ui.core.mvc\"\n\txmlns=\"sap.m\"><List\n\t\theaderText=\"Input List Item\" ><InputListItem label=\"Battery Saving\"><SegmentedButton selectedKey=\"SBYes\"><items><SegmentedButtonItem text=\"High\" key=\"SBYes\" /><SegmentedButtonItem text=\"Low\" /><SegmentedButtonItem text=\"Off\" /></items></SegmentedButton></InputListItem></List></mvc:View>"
}, "web/ui5/test-resources/sap/m/demokit/sample/SegmentedButtonLI/Component-preload");