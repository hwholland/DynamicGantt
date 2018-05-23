sap.ui.require.preload({
	"web/ui5/test-resources/sap/ca/ui/demokit/sample/ForwardDialog/Component.js": "jQuery.sap.declare(\"sap.ca.ui.sample.ForwardDialog.Component\"),sap.ui.core.UIComponent.extend(\"sap.ca.ui.sample.ForwardDialog.Component\",{metadata:{rootView:\"sap.ca.ui.sample.ForwardDialog.Forward\",dependencies:{libs:[\"sap.m\",\"sap.ca.ui\"]},config:{sample:{stretch:!0,files:[\"Forward.view.xml\",\"Forward.controller.js\"]}}}});",
	"web/ui5/test-resources/sap/ca/ui/demokit/sample/ForwardDialog/Forward.controller.js": "jQuery.sap.require(\"sap.ca.ui.dialog.factory\"),sap.ui.controller(\"sap.ca.ui.sample.ForwardDialog.Forward\",{onInit:function(){},onForwardWithList:function(a){sap.ca.ui.dialog.forwarding.start(this.fnStartSearch,this.fnForwardClose)},onForwardWithoutList:function(a){sap.ca.ui.dialog.forwarding.start()},fnStartSearch:function(a){sap.ca.ui.dialog.forwarding.setFoundAgents([{UserId:\"alan\",FullName:\"Alberto Andersen 1\",Department:\"Manager, Finance Department\",ImageURL:\"\"},{UserId:\"jagi\",FullName:\"Japie Gierhuizen 2\",Department:\"Manager, Finance Department\",ImageURL:\"\"},{UserId:\"jagil\",FullName:\"Xavier Zap 3\",Department:\"Senior Manager, Finance Department\",ImageURL:\"\"},{UserId:\"jagip\",FullName:\"Alberto Andersen 4\"},{UserId:\"jagio\",FullName:\"Japie Gierhuizen 5\",Department:\"Manager, Finance Department\",ImageURL:\"\"},{UserId:\"jagii\",FullName:\"Xavier Zap 6\",Department:\"Senior Manager, Finance Department\"},{UserId:\"jagiu\",FullName:\"Alberto Andersen 7\",Department:\"Manager, Finance Department\"}])},fnForwardClose:function(a){a.bConfirmed&&jQuery.sap.log.info(\"ForwardDialog - forward agent userid: \"+a.oAgentToBeForwarded.UserId+\" note: \"+a.sNote)}});",
	"web/ui5/test-resources/sap/ca/ui/demokit/sample/ForwardDialog/Forward.view.xml": "<core:View xmlns:core=\"sap.ui.core\" xmlns:html=\"http://www.w3.org/1999/xhtml\"\n           xmlns=\"sap.m\" controllerName=\"sap.ca.ui.sample.ForwardDialog.Forward\" height=\"100%\"><Page id=\"page\" title=\"Forward Dialog\" showHeader=\"false\"><content><Button id=\"btnForwardwithList\" press=\"onForwardWithList\" text=\"Forward (with List)\"/><Button id=\"btnForwardwithoutList\" press=\"onForwardWithoutList\" text=\"Forward (without List)\"/></content></Page></core:View>\n"
}, "web/ui5/test-resources/sap/ca/ui/demokit/sample/ForwardDialog/Component-preload");