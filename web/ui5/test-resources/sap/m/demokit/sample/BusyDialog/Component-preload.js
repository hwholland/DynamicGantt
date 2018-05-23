sap.ui.require.preload({
	"web/ui5/test-resources/sap/m/demokit/sample/BusyDialog/C.controller.js": "sap.ui.define([\"jquery.sap.global\",\"sap/m/MessageToast\",\"sap/ui/core/Fragment\",\"sap/ui/core/mvc/Controller\"],function(e,a,s,i){\"use strict\";var o;return i.extend(\"sap.m.sample.BusyDialog.C\",{onOpenDialog:function(a){this._dialog||(this._dialog=sap.ui.xmlfragment(\"sap.m.sample.BusyDialog.BusyDialog\",this),this.getView().addDependent(this._dialog)),e.sap.syncStyleClass(\"sapUiSizeCompact\",this.getView(),this._dialog),this._dialog.open(),o=e.sap.delayedCall(3e3,this,function(){this._dialog.close()})},onDialogClosed:function(s){e.sap.clearDelayedCall(o),s.getParameter(\"cancelPressed\")?a.show(\"The operation has been cancelled\"):a.show(\"The operation has been completed\")}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/BusyDialog/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.m.sample.BusyDialog.Component\",{metadata:{rootView:\"sap.m.sample.BusyDialog.V\",dependencies:{libs:[\"sap.m\",\"sap.ui.layout\"]},config:{sample:{stretch:!0,files:[\"V.view.xml\",\"C.controller.js\",\"BusyDialog.fragment.xml\"]}}}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/BusyDialog/BusyDialog.fragment.xml": "<core:FragmentDefinition\n\txmlns=\"sap.m\"\n\txmlns:core=\"sap.ui.core\"><BusyDialog\n\t\ttitle=\"Loading Data\"\n\t\ttext=\"... now loading the data from a far away server\"\n\t\tshowCancelButton=\"true\"\n\t\tclose=\"onDialogClosed\"/></core:FragmentDefinition>\n",
	"web/ui5/test-resources/sap/m/demokit/sample/BusyDialog/V.view.xml": "<mvc:View\n\tcontrollerName=\"sap.m.sample.BusyDialog.C\"\n\txmlns:l=\"sap.ui.layout\"\n\txmlns:mvc=\"sap.ui.core.mvc\"\n\txmlns=\"sap.m\"><l:VerticalLayout\n\t\tclass=\"sapUiContentPadding\"\n\t\twidth=\"100%\"><l:content><Button text=\"Show Busy Dialog\"\n\t\t\t  \tpress=\"onOpenDialog\"\n\t\t\t    class=\"sapUiSmallMarginBottom\" /></l:content></l:VerticalLayout></mvc:View>"
}, "web/ui5/test-resources/sap/m/demokit/sample/BusyDialog/Component-preload");