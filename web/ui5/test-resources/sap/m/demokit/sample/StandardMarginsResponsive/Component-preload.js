sap.ui.require.preload({
	"web/ui5/test-resources/sap/m/demokit/sample/StandardMarginsResponsive/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.m.sample.StandardMarginsResponsive.Component\",{metadata:{rootView:\"sap.m.sample.StandardMarginsResponsive.Page\",dependencies:{libs:[\"sap.m\"]},config:{sample:{stretch:!0,files:[\"Page.view.xml\",\"Page.controller.js\"]}}}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/StandardMarginsResponsive/Page.controller.js": "sap.ui.define([\"jquery.sap.global\",\"sap/ui/core/mvc/Controller\",\"sap/ui/model/json/JSONModel\"],function(e,s,o){\"use strict\";return s.extend(\"sap.m.sample.StandardMarginsResponsive.Page\",{onInit:function(s){var n=new o(e.sap.getModulePath(\"sap.ui.demo.mock\",\"/products.json\"));this.getView().setModel(n)}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/StandardMarginsResponsive/Page.view.xml": "<mvc:View\n\theight=\"100%\"\n\tcontrollerName=\"sap.m.sample.StandardMarginsResponsive.Page\"\n\txmlns:mvc=\"sap.ui.core.mvc\"\n\txmlns=\"sap.m\"><Panel width=\"auto\" class=\"sapUiResponsiveMargin\"><content><Text text=\"All panels on this page use css class 'sapUiResponsiveMargin' to clear space all around, depending on the available width.\"/></content></Panel><Panel width=\"auto\" class=\"sapUiResponsiveMargin\"><content><Text text=\"Please resize the the browser window and/or use the 'Full Screen' button to see how the margins change.\" /></content></Panel><Panel width=\"auto\" class=\"sapUiResponsiveMargin\"><content><Text text=\"Since panels have a default width of 100%, horizontal margins are not displayed appropriately.\" /></content></Panel><Panel width=\"auto\" class=\"sapUiResponsiveMargin\"><content><Text text=\"Therefore we need to set each panel's 'width' property to 'auto'.\" /></content></Panel></mvc:View>\n"
}, "web/ui5/test-resources/sap/m/demokit/sample/StandardMarginsResponsive/Component-preload");