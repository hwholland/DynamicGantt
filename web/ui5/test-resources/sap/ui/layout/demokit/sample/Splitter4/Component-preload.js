sap.ui.require.preload({
	"web/ui5/test-resources/sap/ui/layout/demokit/sample/Splitter4/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.ui.layout.sample.Splitter4.Component\",{metadata:{rootView:\"sap.ui.layout.sample.Splitter4.Splitter\",dependencies:{libs:[\"sap.ui.commons\",\"sap.ui.layout\"]},config:{sample:{files:[\"Splitter.view.xml\",\"Splitter.controller.js\"]}}}})});",
	"web/ui5/test-resources/sap/ui/layout/demokit/sample/Splitter4/Splitter.controller.js": "sap.ui.define([\"sap/ui/core/mvc/Controller\"],function(t){\"use strict\";return t.extend(\"sap.ui.layout.sample.Splitter4.Splitter\",{onInit:function(){}})});",
	"web/ui5/test-resources/sap/ui/layout/demokit/sample/Splitter4/Splitter.view.xml": "<mvc:View\n\tcontrollerName=\"sap.ui.layout.sample.Splitter4.Splitter\"\n\txmlns:l=\"sap.ui.layout\"\n\txmlns:core=\"sap.ui.core\"\n\txmlns:mvc=\"sap.ui.core.mvc\"\n\txmlns=\"sap.ui.commons\"><l:Splitter height=\"500px\" width=\"100%\"><Button height=\"100%\" width=\"100%\" text=\"Content 1\"><layoutData><l:SplitterLayoutData size=\"300px\" /></layoutData></Button><Button height=\"100%\" width=\"100%\" text=\"Content 2\"><layoutData><l:SplitterLayoutData size=\"auto\" /></layoutData></Button><Button height=\"100%\" width=\"100%\" text=\"Content 3\"><layoutData><l:SplitterLayoutData size=\"30%\" minSize=\"200px\" /></layoutData></Button></l:Splitter></mvc:View>"
}, "web/ui5/test-resources/sap/ui/layout/demokit/sample/Splitter4/Component-preload");