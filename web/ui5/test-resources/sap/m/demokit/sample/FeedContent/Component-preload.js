sap.ui.require.preload({
	"web/ui5/test-resources/sap/m/demokit/sample/FeedContent/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.m.sample.FeedContent.Component\",{metadata:{rootView:\"sap.m.sample.FeedContent.Page\",dependencies:{libs:[\"sap.m\"]},config:{sample:{files:[\"Page.view.xml\",\"Page.controller.js\"]}}}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/FeedContent/Page.controller.js": "sap.ui.define([\"jquery.sap.global\",\"sap/ui/core/mvc/Controller\",\"sap/m/MessageToast\"],function(e,s,n){\"use strict\";return s.extend(\"sap.m.sample.FeedContent.Page\",{press:function(e){n.show(\"The feed content is pressed.\")}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/FeedContent/Page.view.xml": "<mvc:View controllerName=\"sap.m.sample.FeedContent.Page\"\n\txmlns=\"sap.m\" xmlns:mvc=\"sap.ui.core.mvc\"><FeedContent\n\t\tcontentText=\"@@notify Great outcome of the Presentation today. The new functionality and the new design was well received.\"\n\t\tsubheader=\"about 1 minute ago in Computer Market\"\n\t\tclass=\"sapUiSmallMargin\" press=\"press\"></FeedContent><FeedContent\n\t\tcontentText=\"@@notify Great outcome of the Presentation today. The new functionality and the new design was well received.\"\n\t\tsubheader=\"about 1 minute ago in Computer Market\" value=\"999\"\n\t\tclass=\"sapUiSmallMargin\" press=\"press\"></FeedContent></mvc:View>"
}, "web/ui5/test-resources/sap/m/demokit/sample/FeedContent/Component-preload");