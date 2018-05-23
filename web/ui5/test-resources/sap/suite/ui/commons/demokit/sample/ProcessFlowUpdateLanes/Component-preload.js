sap.ui.require.preload({
	"web/ui5/test-resources/sap/suite/ui/commons/demokit/sample/ProcessFlowUpdateLanes/C.controller.js": "jQuery.sap.require(\"sap.m.MessageToast\"),sap.ui.controller(\"sap.suite.ui.commons.sample.ProcessFlowUpdateLanes.C\",{onInit:function(){var e={nodes:[{id:\"1\",lane:\"0\",title:\"Sales Order 1\",titleAbbreviation:\"SO 1\",children:[2],state:sap.suite.ui.commons.ProcessFlowNodeState.Positive,stateText:\"OK status\",focused:!0,texts:[\"Sales Order Document Overdue long text for the wrap up all the aspects\",\"Not cleared\"]},{id:\"2\",lane:\"1\",title:\"Invoice 2\",children:[],state:sap.suite.ui.commons.ProcessFlowNodeState.Negative,stateText:\"NOT OK\"}],lanes:[{id:\"0\",icon:\"sap-icon://order-status\",label:\"In Order\",position:0},{id:\"1\",icon:\"sap-icon://payment-approval\",label:\"In Invoice\",position:1}]},s=new sap.ui.model.json.JSONModel,o=this.getView();s.setData(e),o.setModel(s),o.byId(\"processflow1\").updateModel()},onOnError:function(e){var s=\"Exception happened : \";s+=e.getParameters().text,sap.m.MessageToast.show(s)},onNodePress:function(e){var s=\"Node \";s+=e.getParameters().getNodeId(),s+=\" has been clicked\",sap.m.MessageToast.show(s)},onNodeTitlePress:function(e){sap.m.MessageToast.show(\"TitlePress event is deprecated since 1.26\")},onZoomIn:function(){this.getView().byId(\"processflow1\").zoomIn(),this.getView().byId(\"processflow1\").getZoomLevel(),sap.m.MessageToast.show(\"Zoom level changed to: \"+this.getView().byId(\"processflow1\").getZoomLevel())},onZoomOut:function(){this.getView().byId(\"processflow1\").zoomOut(),this.getView().byId(\"processflow1\").getZoomLevel(),sap.m.MessageToast.show(\"Zoom level changed to: \"+this.getView().byId(\"processflow1\").getZoomLevel())},onUpdateModelAdd:function(){if(this.getView().byId(\"processflow1\").getLanes().length<3){var e=new sap.suite.ui.commons.ProcessFlowLaneHeader({sId:\"2\",iconSrc:\"sap-icon://money-bills\",text:\"In Accounting\",position:2});this.getView().byId(\"processflow1\").addLane(e),this.getView().byId(\"processflow1\").updateModel(),sap.m.MessageToast.show(\"Model has been updated\")}}});",
	"web/ui5/test-resources/sap/suite/ui/commons/demokit/sample/ProcessFlowUpdateLanes/Component.js": "jQuery.sap.declare(\"sap.suite.ui.commons.sample.ProcessFlowUpdateLanes.Component\"),sap.ui.core.UIComponent.extend(\"sap.suite.ui.commons.sample.ProcessFlowUpdateLanes.Component\",{metadata:{rootView:\"sap.suite.ui.commons.sample.ProcessFlowUpdateLanes.V\",dependencies:{libs:[\"sap.m\",\"sap.ui.layout\",\"sap.ui.core\",\"sap.suite.ui.commons\"]},config:{sample:{files:[\"V.view.xml\",\"C.controller.js\"]}}}});",
	"web/ui5/test-resources/sap/suite/ui/commons/demokit/sample/ProcessFlowUpdateLanes/V.view.xml": "<mvc:View xmlns:core=\"sap.ui.core\" xmlns:mvc=\"sap.ui.core.mvc\" xmlns:m=\"sap.m\"\r\n  xmlns=\"sap.suite.ui.commons\"\r\n  controllerName=\"sap.suite.ui.commons.sample.ProcessFlowUpdateLanes.C\"\r\n  xmlns:html=\"http://www.w3.org/1999/xhtml\"><html:br/><m:Panel><m:Label text=\"Process Flow sample - Update Lanes, Zooming and Update of Lanes\"/><html:br/><m:Button text=\"Zoom In\" press=\"onZoomIn\"/><m:Button text=\"Zoom Out\" press=\"onZoomOut\"/><m:Button text=\"Update Lanes - add Lane\" press=\"onUpdateModelAdd\"/><ProcessFlow id=\"processflow1\" scrollable=\"false\" nodePress=\"onNodePress\" nodeTitlePress=\"onNodeTitlePress\" nodes=\"{/nodes}\" lanes=\"{/lanes}\"><nodes><ProcessFlowNode laneId=\"{lane}\" nodeId=\"{id}\" title=\"{title}\" titleAbbreviation = \"{titleAbbreviation}\" isTitleClickable = \"{isTitleClickable}\" children=\"{children}\" state=\"{state}\" stateText=\"{stateText}\" texts=\"{texts}\" highlighted=\"{highlighted}\" focused=\"{focused}\"/></nodes><lanes><ProcessFlowLaneHeader laneId=\"{id}\" iconSrc=\"{icon}\" text=\"{label}\" position=\"{position}\"/></lanes></ProcessFlow></m:Panel></mvc:View>"
}, "web/ui5/test-resources/sap/suite/ui/commons/demokit/sample/ProcessFlowUpdateLanes/Component-preload");