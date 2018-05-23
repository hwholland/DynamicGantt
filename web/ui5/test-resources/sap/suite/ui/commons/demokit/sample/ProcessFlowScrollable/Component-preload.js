sap.ui.require.preload({
	"web/ui5/test-resources/sap/suite/ui/commons/demokit/sample/ProcessFlowScrollable/Component.js": "jQuery.sap.declare(\"sap.suite.ui.commons.sample.ProcessFlow.Component\"),sap.ui.core.UIComponent.extend(\"sap.suite.ui.commons.sample.ProcessFlowScrollable.Component\",{metadata:{rootView:\"sap.suite.ui.commons.sample.ProcessFlowScrollable.PFScrollV\",dependencies:{libs:[\"sap.m\",\"sap.ui.layout\",\"sap.ui.core\",\"sap.suite.ui.commons\"]},config:{sample:{files:[\"PFScrollV.view.xml\",\"PFScrollC.controller.js\"]}}}});",
	"web/ui5/test-resources/sap/suite/ui/commons/demokit/sample/ProcessFlowScrollable/PFScrollC.controller.js": "jQuery.sap.require(\"sap.m.MessageToast\"),sap.ui.controller(\"sap.suite.ui.commons.sample.ProcessFlowScrollable.PFScrollC\",{onNodePress:function(e){var t=\"Node \";t+=e.getParameters().getNodeId(),t+=\" was clicked\",sap.m.MessageToast.show(t)},onInit:function(){var e=new sap.ui.model.json.JSONModel;e.setData(oDataProcessFlowNodesEmpty),this.getView().setModel(e),this.getView().byId(\"processflow2\").updateModel()},onZoomIn:function(){this.getView().byId(\"processflow1\").zoomIn(),this.getView().byId(\"processflow1\").getZoomLevel(),jQuery.sap.require(\"sap.m.MessageToast\"),sap.m.MessageToast.show(\"Zoom level changed to: \"+this.getView().byId(\"processflow1\").getZoomLevel())},onZoomOut:function(){this.getView().byId(\"processflow1\").zoomOut(),this.getView().byId(\"processflow1\").getZoomLevel(),jQuery.sap.require(\"sap.m.MessageToast\"),sap.m.MessageToast.show(\"Zoom level changed to: \"+this.getView().byId(\"processflow1\").getZoomLevel())},onDisplayProcessFlow:function(){var e=new sap.ui.model.json.JSONModel;e.setData(oDataProcessFlowNodes),this.getView().setModel(e),this.getView().byId(\"processflow2\").updateModel(),jQuery.sap.require(\"sap.m.MessageToast\"),sap.m.MessageToast.show(\"Process Flow has been displayed\")},onHighlightPath:function(){var e={nodes:[{id:\"1\",lane:\"0\",title:\"Sales Order 2\",children:[10,11,12],state:sap.suite.ui.commons.ProcessFlowNodeState.Positive,stateText:\"OK status\",focused:!0,highlighted:!0,texts:[\"Sales Order Document Overdue long text for the wrap up all the aspects\",\"Not cleared\"]},{id:\"10\",lane:\"1\",title:\"Outbound Delivery 40\",children:[20,21],state:sap.suite.ui.commons.ProcessFlowNodeState.Negative,stateText:\"NOT OK\",highlighted:!0,texts:[\"text 1\",\"text 2\"]},{id:\"11\",lane:\"1\",title:\"Outbound Delivery 43\",children:[20],texts:[\"text 1\",\"text 2\"]},{id:\"12\",lane:\"1\",title:\"Outbound Delivery 45\",children:[20]},{id:\"20\",lane:\"2\",title:\"Invoice 9\",children:[31,51],state:sap.suite.ui.commons.ProcessFlowNodeState.Positive,stateText:\"OK status\",highlighted:!0},{id:\"21\",lane:\"2\",title:\"Invoice planned\",children:null,state:sap.suite.ui.commons.ProcessFlowNodeState.Planned},{id:\"31\",lane:\"3\",title:\"Accounting Document 7\",children:[41],state:sap.suite.ui.commons.ProcessFlowNodeState.Positive,stateText:\"OK status\",highlighted:!0},{id:\"41\",lane:\"4\",title:\"Payment Document 75\",children:[51],state:sap.suite.ui.commons.ProcessFlowNodeState.Positive,stateText:\"OK status\",highlighted:!0},{id:\"51\",lane:\"5\",title:\"Acceptance Letter 14\",children:[61],state:sap.suite.ui.commons.ProcessFlowNodeState.Negative,stateText:\"NOT OK status\",texts:[\"document status changed\"]},{id:\"61\",lane:\"6\",title:\"Credit Voucher 67\",children:[71],state:sap.suite.ui.commons.ProcessFlowNodeState.Positive,stateText:\"OK status\"},{id:\"71\",lane:\"7\",title:\"Credit Return 77\",children:null,state:sap.suite.ui.commons.ProcessFlowNodeState.Planned,stateText:\"Planned status text\"}],lanes:[{id:\"0\",icon:\"sap-icon://order-status\",label:\"In Order\",position:0},{id:\"1\",icon:\"sap-icon://monitor-payments\",label:\"In Delivery\",position:1},{id:\"2\",icon:\"sap-icon://payment-approval\",label:\"In Invoice\",position:2},{id:\"3\",icon:\"sap-icon://money-bills\",label:\"In Accounting\",position:3},{id:\"4\",icon:\"sap-icon://payment-approval\",label:\"In Payment\",position:4},{id:\"5\",icon:\"sap-icon://nurse\",label:\"Delivered\",position:5},{id:\"6\",icon:\"sap-icon://retail-store\",label:\"In Return Process\",position:6},{id:\"7\",icon:\"sap-icon://monitor-payments\",label:\"In Credit Return\",position:7}]},t=new sap.ui.model.json.JSONModel;t.setData(e),this.getView().setModel(t),this.getView().byId(\"processflow2\").updateModel(),jQuery.sap.require(\"sap.m.MessageToast\"),sap.m.MessageToast.show(\"Path has been highlighted\")},onUpdateProcessFlow:function(){var e={nodes:[{id:\"1\",lane:\"0\",title:\"Sales Order 2\",children:[10,11,12],state:sap.suite.ui.commons.ProcessFlowNodeState.Positive,stateText:\"OK status\",focused:!0,texts:[\"Sales Order Document Overdue long text for the wrap up all the aspects\",\"Not cleared\"]},{id:\"10\",lane:\"1\",title:\"Outbound Delivery 40\",children:[20,21],state:sap.suite.ui.commons.ProcessFlowNodeState.Negative,stateText:\"NOT OK\",texts:[\"text 1\",\"text 2\"]},{id:\"11\",lane:\"1\",title:\"Outbound Delivery 43\",children:[20],state:sap.suite.ui.commons.ProcessFlowNodeState.Positive,texts:[\"text 1\",\"text 2\"]},{id:\"12\",lane:\"1\",title:\"Outbound Delivery 45\",children:[20],state:sap.suite.ui.commons.ProcessFlowNodeState.Positive},{id:\"20\",lane:\"2\",title:\"Invoice 9\",children:[31,51],state:sap.suite.ui.commons.ProcessFlowNodeState.Positive,stateText:\"OK status\"},{id:\"21\",lane:\"2\",title:\"Invoice planned\",children:null,state:sap.suite.ui.commons.ProcessFlowNodeState.Negative,texts:[\"Invoince has not come\"]},{id:\"31\",lane:\"3\",title:\"Accounting Document 7\",children:[41],state:sap.suite.ui.commons.ProcessFlowNodeState.Positive,stateText:\"OK status\"},{id:\"41\",lane:\"4\",title:\"Payment Document 75\",children:[51],state:sap.suite.ui.commons.ProcessFlowNodeState.Positive,stateText:\"OK status\"},{id:\"51\",lane:\"5\",title:\"Acceptance Letter 14\",children:[61],state:sap.suite.ui.commons.ProcessFlowNodeState.Negative,stateText:\"NOT OK status\",texts:[\"document status changed\"]},{id:\"61\",lane:\"6\",title:\"Credit Voucher 67\",children:[71],state:sap.suite.ui.commons.ProcessFlowNodeState.Positive,stateText:\"OK status\"},{id:\"71\",lane:\"7\",title:\"Credit Return 77\",children:null,state:sap.suite.ui.commons.ProcessFlowNodeState.Positive,stateText:\"Credit returned\",texts:[\"credit already returned ...\",\"22.11.2014\"]}],lanes:[{id:\"0\",icon:\"sap-icon://order-status\",label:\"In Order\",position:0},{id:\"1\",icon:\"sap-icon://monitor-payments\",label:\"In Delivery\",position:1},{id:\"2\",icon:\"sap-icon://payment-approval\",label:\"In Invoice\",position:2},{id:\"3\",icon:\"sap-icon://money-bills\",label:\"In Accounting\",position:3},{id:\"4\",icon:\"sap-icon://payment-approval\",label:\"In Payment\",position:4},{id:\"5\",icon:\"sap-icon://nurse\",label:\"Delivered\",position:5},{id:\"6\",icon:\"sap-icon://retail-store\",label:\"In Return Process\",position:6},{id:\"7\",icon:\"sap-icon://monitor-payments\",label:\"In Credit Return\",position:7}]},t=new sap.ui.model.json.JSONModel;t.setData(e),this.getView().setModel(t),this.getView().byId(\"processflow2\").updateModel(),jQuery.sap.require(\"sap.m.MessageToast\"),sap.m.MessageToast.show(\"Update model done.\")}});var oDataProcessFlowNodesEmpty={nodes:[],lanes:[]},oDataProcessFlowNodes={nodes:[{id:\"1\",lane:\"0\",title:\"Sales Order 2\",children:[10,11,12],state:sap.suite.ui.commons.ProcessFlowNodeState.Positive,stateText:\"OK status\",focused:!0,texts:[\"Sales Order Document Overdue long text for the wrap up all the aspects\",\"Not cleared\"]},{id:\"10\",lane:\"1\",title:\"Outbound Delivery 40\",children:[20,21],state:sap.suite.ui.commons.ProcessFlowNodeState.Negative,stateText:\"NOT OK\",texts:[\"text 1\",\"text 2\"]},{id:\"11\",lane:\"1\",title:\"Outbound Delivery 43\",children:[20],texts:[\"text 1\",\"text 2\"]},{id:\"12\",lane:\"1\",title:\"Outbound Delivery 45\",children:[20]},{id:\"20\",lane:\"2\",title:\"Invoice 9\",children:[31,51],state:sap.suite.ui.commons.ProcessFlowNodeState.Positive,stateText:\"OK status\"},{id:\"21\",lane:\"2\",title:\"Invoice planned\",children:null,state:sap.suite.ui.commons.ProcessFlowNodeState.Planned},{id:\"31\",lane:\"3\",title:\"Accounting Document 7\",children:[41],state:sap.suite.ui.commons.ProcessFlowNodeState.Positive,stateText:\"OK status\"},{id:\"41\",lane:\"4\",title:\"Payment Document 75\",children:[51],state:sap.suite.ui.commons.ProcessFlowNodeState.Positive,stateText:\"OK status\"},{id:\"51\",lane:\"5\",title:\"Acceptance Letter 14\",children:[61],state:sap.suite.ui.commons.ProcessFlowNodeState.Positive,stateText:\"OK status\"},{id:\"61\",lane:\"6\",title:\"Credit Voucher 67\",children:[71],state:sap.suite.ui.commons.ProcessFlowNodeState.Positive,stateText:\"OK status\"},{id:\"71\",lane:\"7\",title:\"Credit Return 77\",children:null,state:sap.suite.ui.commons.ProcessFlowNodeState.Planned,stateText:\"Planned status text\"}],lanes:[{id:\"0\",icon:\"sap-icon://order-status\",label:\"In Order\",position:0},{id:\"1\",icon:\"sap-icon://monitor-payments\",label:\"In Delivery\",position:1},{id:\"2\",icon:\"sap-icon://payment-approval\",label:\"In Invoice\",position:2},{id:\"3\",icon:\"sap-icon://money-bills\",label:\"In Accounting\",position:3},{id:\"4\",icon:\"sap-icon://payment-approval\",label:\"In Payment\",position:4},{id:\"5\",icon:\"sap-icon://nurse\",label:\"Delivered\",position:5},{id:\"6\",icon:\"sap-icon://retail-store\",label:\"In Return Process\",position:6},{id:\"7\",icon:\"sap-icon://monitor-payments\",label:\"In Credit Return\",position:7}]};",
	"web/ui5/test-resources/sap/suite/ui/commons/demokit/sample/ProcessFlowScrollable/PFScrollV.view.xml": "<mvc:View xmlns:core=\"sap.ui.core\" xmlns:mvc=\"sap.ui.core.mvc\" xmlns:m=\"sap.m\"\n        xmlns=\"sap.suite.ui.commons\"\n        controllerName=\"sap.suite.ui.commons.sample.ProcessFlowScrollable.PFScrollC\"\n        xmlns:html=\"http://www.w3.org/1999/xhtml\"\n        height=\"100%\"><html:br/><m:Panel id=\"mainpage1\"><m:Label text=\"Process Flow simple sample case with zooming buttons - scrollable\"/><html:br/><m:Button text=\"Zoom In\" press=\"onZoomIn\"/><m:Button text=\"Zoom Out\" press=\"onZoomOut\"/><html:div style=\"height:400px;width:600px\"><ProcessFlow id=\"processflow1\" scrollable=\"true\" nodePress=\"onNodePress\"><nodes><ProcessFlowNode nodeId=\"1\" laneId=\"id0\" title=\"Sales Order 1\" titleAbbreviation=\"SO 1\" isTitleClickable=\"false\" children=\"2,11,12\" state=\"Positive\" stateText=\"Positive Status\" texts=\"\" /><ProcessFlowNode nodeId=\"2\" laneId=\"id1\" title=\"Delivery 13\" titleAbbreviation=\"DD 1\" isTitleClickable=\"false\" children=\"10\" state=\"Positive\" stateText=\"OK Delivery\" texts=\"this is delivery document\" /><ProcessFlowNode nodeId=\"10\" laneId=\"id3\" title=\"Accounting Document 7\" titleAbbreviation=\"AD 7\" isTitleClickable=\"false\" state=\"PlannedNegative\" stateText=\"Planned Negative\" texts=\"text 1 runs over two rows but no  more than two\"/><ProcessFlowNode nodeId=\"11\" laneId=\"id2\" title=\"Invoice 4\" titleAbbreviation=\"INV 4\" isTitleClickable=\"false\" state=\"Negative\" stateText=\"Negative Status should not run over more than two rows of text\"/><ProcessFlowNode nodeId=\"12\" laneId=\"id2\" title=\"Invoice 5\" titleAbbreviation=\"INV 5\" isTitleClickable=\"false\" children=\"5\" state=\"Neutral\"/><ProcessFlowNode nodeId=\"5\" laneId=\"id3\" title=\"Accounting Document 10\" titleAbbreviation=\"AD 10\" state=\"Planned\"/></nodes><lanes><ProcessFlowLaneHeader laneId=\"id0\" iconSrc=\"sap-icon://order-status\" text=\"In Order\" position=\"0\"/><ProcessFlowLaneHeader laneId=\"id1\" iconSrc=\"sap-icon://monitor-payments\" text=\"In Delivery\" position=\"1\"/><ProcessFlowLaneHeader laneId=\"id2\" iconSrc=\"sap-icon://payment-approval\" text=\"In Invoice\" position=\"2\"/><ProcessFlowLaneHeader laneId=\"id3\" iconSrc=\"sap-icon://money-bills\" text=\"In Accounting\" position=\"3\"/></lanes></ProcessFlow></html:div><html:br/><m:Label text=\"Process Flow sample - complex case with highlighted items in scrollable mode\"/><html:br/><m:Button text=\"Display Initial Process Flow\" press=\"onDisplayProcessFlow\"/><m:Button text=\"Display Highlight Path feature\" press=\"onHighlightPath\"/><m:Button text=\"Display Update Data feature\" press=\"onUpdateProcessFlow\"/><html:div style=\"height:600px;width:900px\"><ProcessFlow id=\"processflow2\" scrollable=\"true\" nodes=\"{/nodes}\" lanes=\"{/lanes}\"><nodes><ProcessFlowNode laneId=\"{lane}\" nodeId=\"{id}\" title=\"{title}\" children=\"{children}\" state=\"{state}\" stateText=\"{stateText}\" texts=\"{texts}\" highlighted=\"{highlighted}\" focused=\"{focused}\"/></nodes><lanes><ProcessFlowLaneHeader laneId=\"{id}\" iconSrc=\"{icon}\" text=\"{label}\" position=\"{position}\"/></lanes></ProcessFlow></html:div></m:Panel></mvc:View>\n"
}, "web/ui5/test-resources/sap/suite/ui/commons/demokit/sample/ProcessFlowScrollable/Component-preload");