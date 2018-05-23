sap.ui.require.preload({
	"web/ui5/test-resources/sap/ui/core/demokit/sample/BusyIndicator/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.ui.core.sample.BusyIndicator.Component\",{metadata:{rootView:\"sap.ui.core.sample.BusyIndicator.Page\",dependencies:{libs:[\"sap.m\"]},config:{sample:{stretch:!0,files:[\"Page.view.xml\",\"Page.controller.js\"]}}}})});",
	"web/ui5/test-resources/sap/ui/core/demokit/sample/BusyIndicator/Page.controller.js": "sap.ui.define([\"jquery.sap.global\",\"sap/ui/core/mvc/Controller\",\"jquery.sap.script\"],function(s,i){\"use strict\";return i.extend(\"sap.ui.core.sample.BusyIndicator.Page\",{hideBusyIndicator:function(){sap.ui.core.BusyIndicator.hide()},showBusyIndicator:function(i,o){sap.ui.core.BusyIndicator.show(o),i&&i>0&&(this._sTimeoutId&&(s.sap.clearDelayedCall(this._sTimeoutId),this._sTimeoutId=null),this._sTimeoutId=s.sap.delayedCall(i,this,function(){this.hideBusyIndicator()}))},show4000:function(){this.showBusyIndicator(4e3)},show4000_0:function(){this.showBusyIndicator(4e3,0)},show1000_2000:function(){this.showBusyIndicator(1e3,2e3)}})});",
	"web/ui5/test-resources/sap/ui/core/demokit/sample/BusyIndicator/Page.view.xml": "<mvc:View\n\tcontrollerName=\"sap.ui.core.sample.BusyIndicator.Page\"\n\theight=\"100%\"\n\txmlns:core=\"sap.ui.core\"\n\txmlns:mvc=\"sap.ui.core.mvc\"\n\txmlns=\"sap.m\"><Page\n\t\tclass=\"sapUiFioriObjectPage\"\n\t\tshowHeader=\"false\" ><content><Panel><Text text=\"Press a button to show the global BusyIndicator\"/></Panel><Panel\n\t\t\t\theaderText=\"Open BusyIndicator for four seconds (default delay, which is 1 second)\"\n\t\t\t><content><Button\n\t\t\t\t\t\ttext=\"Show BusyIndicator\"\n\t\t\t\t\t\tpress=\"show4000\"\n\t\t\t\t\t></Button></content></Panel><Panel\n\t\t\t\theaderText=\"Open BusyIndicator for four seconds (zero delay)\"\n\t\t\t><content><Button\n\t\t\t\t\t\ttext=\"Show BusyIndicator\"\n\t\t\t\t\t\tpress=\"show4000_0\"\n\t\t\t\t\t></Button></content></Panel><Panel\n\t\t\t\theaderText=\"Open BusyIndicator for one second (two seconds delay, so it should never appear at all)\"\n\t\t\t><content><Button\n\t\t\t\t\t\ttext=\"Show BusyIndicator\"\n\t\t\t\t\t\tpress=\"show1000_2000\"\n\t\t\t\t\t></Button></content></Panel></content></Page></mvc:View>\n"
}, "web/ui5/test-resources/sap/ui/core/demokit/sample/BusyIndicator/Component-preload");