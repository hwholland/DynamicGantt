sap.ui.require.preload({
	"web/ui5/test-resources/sap/m/demokit/sample/Link/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.m.sample.Link.Component\",{metadata:{rootView:\"sap.m.sample.Link.LinkGroup\",dependencies:{libs:[\"sap.m\",\"sap.ui.layout\"]},config:{sample:{files:[\"LinkGroup.view.xml\",\"LinkGroup.controller.js\"]}}}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/Link/LinkGroup.controller.js": "sap.ui.define([\"sap/m/MessageBox\",\"sap/ui/core/mvc/Controller\"],function(e,n){\"use strict\";return n.extend(\"sap.m.sample.Link.LinkGroup\",{handleLinkPress:function(n){e.alert(\"Link was clicked!\")}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/Link/LinkGroup.view.xml": "<mvc:View\n\tcontrollerName=\"sap.m.sample.Link.LinkGroup\"\n\txmlns:l=\"sap.ui.layout\"\n\txmlns:mvc=\"sap.ui.core.mvc\"\n\txmlns=\"sap.m\"><l:VerticalLayout\n\t\tclass=\"sapUiContentPadding\"\n\t\twidth=\"100%\"><l:content><Link\n\t\t\t\ttext=\"Click me\"\n\t\t\t\tpress=\"handleLinkPress\" /><Link\n\t\t\t\ttext=\"Disabled link\"\n\t\t\t\tenabled=\"false\" /><Link\n\t\t\t\ttext=\"Open SAP Homepage\"\n\t\t\t\ttarget=\"_blank\"\n\t\t\t\thref=\"http://www.sap.com\" /></l:content></l:VerticalLayout></mvc:View>"
}, "web/ui5/test-resources/sap/m/demokit/sample/Link/Component-preload");