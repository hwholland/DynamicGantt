sap.ui.require.preload({
	"web/ui5/test-resources/sap/m/demokit/sample/MessagePopover/C.controller.js": "sap.ui.define([\"sap/m/MessagePopover\",\"sap/m/MessagePopoverItem\",\"sap/ui/core/mvc/Controller\",\"sap/ui/model/json/JSONModel\"],function(e,t,s,o){var i=new t({type:\"{type}\",title:\"{title}\",description:\"{description}\"}),r=new e({items:{path:\"/\",template:i}}),n=new e({items:{path:\"/\",template:i}}),a=new e({items:{path:\"/\",template:i},initiallyExpanded:!1});return s.extend(\"sap.m.sample.MessagePopover.C\",{onInit:function(){var e=[{type:\"Error\",title:\"1 Error message\",description:\"First Error message description\"},{type:\"Warning\",title:\"1 Warning without description\",description:\"\"},{type:\"Success\",title:\"1 Success message\",description:\"First Success message description\"},{type:\"Error\",title:\"2 Error message\",description:\"Second Error message description\"},{type:\"Information\",title:\"1 Information message\",description:\"First Information message description\"}],t=new o;t.setData(e);var s=new o;s.setData({messagesLength:e.length+\"\"}),this.getView().setModel(s),r.setModel(t),n.setModel(t),a.setModel(t)},handleMessagePopoverPress1:function(e){r.openBy(e.getSource())},handleMessagePopoverPress2:function(e){n.openBy(e.getSource())},handleMessagePopoverPress3:function(e){a.openBy(e.getSource())}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/MessagePopover/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.m.sample.MessagePopover.Component\",{metadata:{rootView:\"sap.m.sample.MessagePopover.V\",dependencies:{libs:[\"sap.m\",\"sap.ui.layout\"]},config:{sample:{stretch:!0,files:[\"V.view.xml\",\"C.controller.js\"]}}}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/MessagePopover/V.view.xml": "<mvc:View\n\t\tcontrollerName=\"sap.m.sample.MessagePopover.C\"\n\t\theight=\"100%\"\n\t\txmlns:l=\"sap.ui.layout\"\n\t\txmlns:mvc=\"sap.ui.core.mvc\"\n\t\txmlns=\"sap.m\"><Page\n\t\t\tshowHeader=\"false\"\n\t\t\tclass=\"sapUiContentPadding\"\n\t\t\theight=\"100%\"><content><l:VerticalLayout\n\t\t\t\t\tclass=\"sapUiContentPadding\"\n\t\t\t\t\twidth=\"100%\"><l:content><Button\n\t\t\t\t\t\t\ttext=\"Show MessagePopover (collapsed)\"\n\t\t\t\t\t\t\tpress=\"handleMessagePopoverPress3\"\n\t\t\t\t\t\t\tclass=\"sapUiSmallMarginBottom\"/><Button\n\t\t\t\t\t\t\ttext=\"Show MessagePopover (expanded)\"\n\t\t\t\t\t\t\tpress=\"handleMessagePopoverPress1\"/></l:content></l:VerticalLayout></content><footer><Toolbar><Button icon=\"sap-icon://message-popup\" text=\"{/messagesLength}\" type=\"Emphasized\"\n\t\t\t\t\t\tpress=\"handleMessagePopoverPress2\"/><ToolbarSpacer/></Toolbar></footer></Page></mvc:View>\n"
}, "web/ui5/test-resources/sap/m/demokit/sample/MessagePopover/Component-preload");