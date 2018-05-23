sap.ui.require.preload({
	"web/ui5/test-resources/sap/ui/core/demokit/sample/ControlBusyIndicator/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.ui.core.sample.ControlBusyIndicator.Component\",{metadata:{rootView:\"sap.ui.core.sample.ControlBusyIndicator.Page\",dependencies:{libs:[\"sap.m\"]},config:{sample:{stretch:!0,files:[\"Page.view.xml\",\"Page.controller.js\"]}}}})});",
	"web/ui5/test-resources/sap/ui/core/demokit/sample/ControlBusyIndicator/Page.controller.js": "sap.ui.define([\"jquery.sap.global\",\"sap/ui/core/mvc/Controller\",\"jquery.sap.script\"],function(e,s){\"use strict\";return s.extend(\"sap.ui.core.sample.ControlBusyIndicator.Page\",{onAction:function(s){var t=this.getView().byId(\"panel1\");t.setBusy(!0);var i=this.getView().byId(\"panel2-icon\");i.setBusy(!0),e.sap.delayedCall(5e3,this,function(){t.setBusy(!1),i.setBusy(!1)})}})});",
	"web/ui5/test-resources/sap/ui/core/demokit/sample/ControlBusyIndicator/Page.view.xml": "<mvc:View\n\tcontrollerName=\"sap.ui.core.sample.ControlBusyIndicator.Page\"\n\theight=\"100%\"\n\txmlns:core=\"sap.ui.core\"\n\txmlns:mvc=\"sap.ui.core.mvc\"\n\txmlns=\"sap.m\"><Page\n\t\tclass=\"sapUiFioriObjectPage\"\n\t\tshowHeader=\"false\" ><content><Toolbar><Button\n\t\t\t\t\ticon=\"sap-icon://action\"\n\t\t\t\t\ttext=\"Toggle Busy State of Both Controls\"\n\t\t\t\t\tpress=\"onAction\"\n\t\t\t\t/></Toolbar><Panel\n\t\t\t\tid=\"panel1\"\n\t\t\t\tbusyIndicatorDelay=\"0\"\n\t\t\t\theaderText=\"Default BusyIndicator (No Delay)\"\n\t\t\t><ToolbarSpacer /><content><Text text=\"Lorem ipsum dolor st amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat\" /></content></Panel><Panel\n\t\t\t\tid=\"panel2\"\n\t\t\t\theaderText=\"Small BusyIndicator (Default Delay)\"\n\t\t\t><core:Icon\n\t\t\t\t\tid=\"panel2-icon\"\n\t\t\t\t\tsrc=\"sap-icon://nutrition-activity\"\n\t\t\t\t\tsize=\"3rem\"\n\t\t\t\t\tcolor=\"#DD0000\"\n\t\t\t\t></core:Icon></Panel></content></Page></mvc:View>\n"
}, "web/ui5/test-resources/sap/ui/core/demokit/sample/ControlBusyIndicator/Component-preload");