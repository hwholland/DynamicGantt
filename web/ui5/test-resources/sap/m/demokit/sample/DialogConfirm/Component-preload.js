sap.ui.require.preload({
	"web/ui5/test-resources/sap/m/demokit/sample/DialogConfirm/C.controller.js": "sap.ui.define([\"sap/m/Button\",\"sap/m/Dialog\",\"sap/m/MessageToast\",\"sap/m/Text\",\"sap/m/TextArea\",\"sap/ui/core/mvc/Controller\",\"sap/ui/layout/HorizontalLayout\",\"sap/ui/layout/VerticalLayout\"],function(e,t,n,o,a,i,s,r){\"use strict\";return i.extend(\"sap.m.sample.DialogConfirm.C\",{onApproveDialog:function(){var a=new t({title:\"Confirm\",type:\"Message\",content:new o({text:\"Are you sure you want to submit your shopping cart?\"}),beginButton:new e({text:\"Submit\",press:function(){n.show(\"Submit pressed!\"),a.close()}}),endButton:new e({text:\"Cancel\",press:function(){a.close()}}),afterClose:function(){a.destroy()}});a.open()},onRejectDialog:function(){var i=new t({title:\"Reject\",type:\"Message\",content:[new o({text:\"Are you sure you want to reject your shopping cart?\"}),new a(\"rejectDialogTextarea\",{width:\"100%\",placeholder:\"Add note (optional)\"})],beginButton:new e({text:\"Reject\",press:function(){var e=sap.ui.getCore().byId(\"rejectDialogTextarea\").getValue();n.show(\"Note is: \"+e),i.close()}}),endButton:new e({text:\"Cancel\",press:function(){i.close()}}),afterClose:function(){i.destroy()}});i.open()},onSubmitDialog:function(){var i=new t({title:\"Confirm\",type:\"Message\",content:[new o({text:\"Are you sure you want to submit your shopping cart?\"}),new a(\"submitDialogTextarea\",{liveChange:function(e){var t=e.getParameter(\"value\");e.getSource().getParent().getBeginButton().setEnabled(t.length>0)},width:\"100%\",placeholder:\"Add note (required)\"})],beginButton:new e({text:\"Submit\",enabled:!1,press:function(){var e=sap.ui.getCore().byId(\"submitDialogTextarea\").getValue();n.show(\"Note is: \"+e),i.close()}}),endButton:new e({text:\"Cancel\",press:function(){i.close()}}),afterClose:function(){i.destroy()}});i.open()},onConfirmDialog:function(){var i=new t({title:\"Confirm\",type:\"Message\",content:[new s({content:[new r({width:\"120px\",content:[new o({text:\"Type: \"}),new o({text:\"Delivery:\"}),new o({text:\"Items count: \"})]}),new r({content:[new o({text:\"Shopping Cart\"}),new o({text:\"Jun 26, 2013\"}),new o({text:\"2\"})]})]}),new a(\"confirmDialogTextarea\",{width:\"100%\",placeholder:\"Add note (optional)\"})],beginButton:new e({text:\"Submit\",press:function(){var e=sap.ui.getCore().byId(\"confirmDialogTextarea\").getValue();n.show(\"Note is: \"+e),i.close()}}),endButton:new e({text:\"Cancel\",press:function(){i.close()}}),afterClose:function(){i.destroy()}});i.open()}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/DialogConfirm/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.m.sample.DialogConfirm.Component\",{metadata:{rootView:\"sap.m.sample.DialogConfirm.V\",dependencies:{libs:[\"sap.m\",\"sap.ui.layout\"]},config:{sample:{files:[\"V.view.xml\",\"C.controller.js\"]}}}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/DialogConfirm/V.view.xml": "<mvc:View\n\tcontrollerName=\"sap.m.sample.DialogConfirm.C\"\n\txmlns:l=\"sap.ui.layout\"\n\txmlns:mvc=\"sap.ui.core.mvc\"\n\txmlns=\"sap.m\"><l:VerticalLayout\n\t\tclass=\"sapUiContentPadding\"\n\t\twidth=\"100%\"><l:content><Button\n\t\t\t\ttext=\"Approve\"\n\t\t\t\twidth=\"250px\"\n\t\t\t\tpress=\"onApproveDialog\"\n\t\t\t\tclass=\"sapUiSmallMarginBottom\" /><Button\n\t\t\t\ttext=\"Reject\"\n\t\t\t\twidth=\"250px\"\n\t\t\t\tpress=\"onRejectDialog\"\n\t\t\t\tclass=\"sapUiSmallMarginBottom\" /><Button\n\t\t\t\ttext=\"Submit (mandatory note)\"\n\t\t\t\twidth=\"250px\"\n\t\t\t\tpress=\"onSubmitDialog\"\n\t\t\t\tclass=\"sapUiSmallMarginBottom\" /><Button\n\t\t\t\ttext=\"Confirm (optional note)\"\n\t\t\t\twidth=\"250px\"\n\t\t\t\tpress=\"onConfirmDialog\"\n\t\t\t\tclass=\"sapUiSmallMarginBottom\" /></l:content></l:VerticalLayout></mvc:View>\n"
}, "web/ui5/test-resources/sap/m/demokit/sample/DialogConfirm/Component-preload");