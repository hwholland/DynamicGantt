sap.ui.require.preload({
	"web/ui5/test-resources/sap/ui/layout/demokit/sample/GridTasks/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.ui.layout.sample.GridTasks.Component\",{metadata:{rootView:\"sap.ui.layout.sample.GridTasks.Grid\",dependencies:{libs:[\"sap.m\",\"sap.ui.layout\"]},config:{sample:{files:[\"Grid.view.xml\"]}}}})});",
	"web/ui5/test-resources/sap/ui/layout/demokit/sample/GridTasks/Grid.view.xml": "<mvc:View\n\txmlns:l=\"sap.ui.layout\"\n\txmlns:mvc=\"sap.ui.core.mvc\"\n\txmlns=\"sap.m\"><l:Grid defaultSpan=\"L3 M4 S6\" class=\"sapUiSmallMarginTop\"><l:content><StandardListItem\n\t\t\t\ttitle=\"Active\"\n\t\t\t\tinfo=\"Jobs in process\"\n\t\t\t\tinfoState=\"Success\"\n\t\t\t\ticon=\"sap-icon://status-in-process\"><layoutData><l:GridData span=\"L12 M12 S12\" /></layoutData></StandardListItem><StandardListItem\n\t\t\t\ttitle=\"Job 15\"\n\t\t\t\tdescription=\"Payroll\" /><StandardListItem\n\t\t\t\ttitle=\"Job 62\"\n\t\t\t\tdescription=\"Archive\" /><StandardListItem\n\t\t\t\ttitle=\"Inactive\"\n\t\t\t\tinfo=\"Jobs not started\"\n\t\t\t\tinfoState=\"None\"\n\t\t\t\ticon=\"sap-icon://status-inactive\"><layoutData><l:GridData span=\"L12 M12 S12\" linebreakL=\"true\" linebreakM=\"true\" linebreakS=\"true\" /></layoutData></StandardListItem><StandardListItem\n\t\t\t\ttitle=\"Job 11\"\n\t\t\t\tdescription=\"Dunning B\" /><StandardListItem\n\t\t\t\ttitle=\"Job 44\"\n\t\t\t\tdescription=\"MRP\" /><StandardListItem\n\t\t\t\ttitle=\"Job 45\"\n\t\t\t\tdescription=\"Analysis 1\" /><StandardListItem\n\t\t\t\ttitle=\"Failed\"\n\t\t\t\tinfo=\"Jobs with errors\"\n\t\t\t\tinfoState=\"Error\"\n\t\t\t\ticon=\"sap-icon://status-error\"><layoutData><l:GridData span=\"L12 M12 S12\" linebreakL=\"true\" linebreakM=\"true\" linebreakS=\"true\" /></layoutData></StandardListItem><StandardListItem\n\t\t\t\ttitle=\"Job 93\"\n\t\t\t\tdescription=\"Log cleanup\" /></l:content></l:Grid></mvc:View>"
}, "web/ui5/test-resources/sap/ui/layout/demokit/sample/GridTasks/Component-preload");