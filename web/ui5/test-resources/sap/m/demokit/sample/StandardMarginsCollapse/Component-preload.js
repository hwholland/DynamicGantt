sap.ui.require.preload({
	"web/ui5/test-resources/sap/m/demokit/sample/StandardMarginsCollapse/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.m.sample.StandardMarginsCollapse.Component\",{metadata:{rootView:\"sap.m.sample.StandardMarginsCollapse.Page\",dependencies:{libs:[\"sap.m\"]},config:{sample:{stretch:!0,files:[\"Page.view.xml\",\"Page.controller.js\"]}}}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/StandardMarginsCollapse/Page.controller.js": "sap.ui.define([\"jquery.sap.global\",\"sap/ui/core/mvc/Controller\",\"sap/ui/model/json/JSONModel\"],function(e,o,s){\"use strict\";return o.extend(\"sap.m.sample.StandardMarginsCollapse.Page\",{onInit:function(o){var a=new s(e.sap.getModulePath(\"sap.ui.demo.mock\",\"/products.json\"));this.getView().setModel(a)}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/StandardMarginsCollapse/Page.view.xml": "<mvc:View\n\theight=\"100%\"\n\tcontrollerName=\"sap.m.sample.StandardMarginsCollapse.Page\"\n\txmlns:mvc=\"sap.ui.core.mvc\"\n\txmlns=\"sap.m\"><Panel class=\"sapUiSmallMarginBottom\"><content><Text text=\"This panel has a 16px (1rem) bottom margin.\"/></content></Panel><Panel width=\"auto\" class=\"sapUiSmallMargin\"><content><Text text=\"This panel has a 16px margin all around. As you can see, the margins do not add to the margins of the bottom or top panel.\"/></content></Panel><Panel  class=\"sapUiSmallMarginTop\"><content><Text text=\"This panel has a 16px top margin.\" /></content></Panel></mvc:View>\n"
}, "web/ui5/test-resources/sap/m/demokit/sample/StandardMarginsCollapse/Component-preload");