sap.ui.require.preload({
	"web/ui5/test-resources/sap/m/demokit/sample/DynamicMessageStripGenerator/C.controller.js": "jQuery.sap.require(\"sap.m.MessageStrip\"),sap.ui.controller(\"sap.m.sample.DynamicMessageStripGenerator.C\",{showMsgStrip:function(){var t=sap.ui.getCore().byId(\"msgStrip\");t&&t.destroy(),this._generateMsgStrip()},_generateMsgStrip:function(){var t=this.getView().byId(\"oVerticalContent\"),e=new sap.m.MessageStrip(\"msgStrip\",{text:\"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam, quis nostrud exercitation ullamco.\",showCloseButton:!Math.round(Math.random()),showIcon:!Math.round(Math.random()),type:[\"Information\",\"Warning\",\"Error\",\"Success\"][Math.round(4*Math.random())]});t.addContent(e)}});",
	"web/ui5/test-resources/sap/m/demokit/sample/DynamicMessageStripGenerator/Component.js": "jQuery.sap.declare(\"sap.m.sample.DynamicMessageStripGenerator.Component\"),sap.ui.core.UIComponent.extend(\"sap.m.sample.DynamicMessageStripGenerator.Component\",{metadata:{rootView:\"sap.m.sample.DynamicMessageStripGenerator.V\",dependencies:{libs:[\"sap.m\"]},config:{sample:{stretch:!0,files:[\"V.view.xml\",\"C.controller.js\"]}}}});",
	"web/ui5/test-resources/sap/m/demokit/sample/DynamicMessageStripGenerator/V.view.xml": "<mvc:View\n\tcontrollerName=\"sap.m.sample.DynamicMessageStripGenerator.C\"\n\txmlns:l=\"sap.ui.layout\"\n\txmlns:mvc=\"sap.ui.core.mvc\"\n\txmlns:html=\"http://www.w3.org/1999/xhtml\"\n\txmlns=\"sap.m\"><l:VerticalLayout\n\t\tclass=\"sapUiContentPadding\"\n\t\tid=\"oVerticalContent\"\n\t\twidth=\"100%\"><l:content><Button\n\t\t\t\ttext=\"Generate MessageStrip\"\n\t\t\t\tclass=\"sapUiSmallMarginBottom\"\n\t\t\t\tpress=\"showMsgStrip\"\n\t\t\t\twidth=\"250px\"/></l:content></l:VerticalLayout></mvc:View>\n"
}, "web/ui5/test-resources/sap/m/demokit/sample/DynamicMessageStripGenerator/Component-preload");