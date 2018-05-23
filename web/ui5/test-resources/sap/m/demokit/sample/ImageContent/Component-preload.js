sap.ui.require.preload({
	"web/ui5/test-resources/sap/m/demokit/sample/ImageContent/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.m.sample.ImageContent.Component\",{metadata:{rootView:\"sap.m.sample.ImageContent.Page\",dependencies:{libs:[\"sap.m\"]},config:{sample:{files:[\"Page.view.xml\",\"Page.controller.js\"]}}}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/ImageContent/Page.controller.js": "sap.ui.define([\"jquery.sap.global\",\"sap/ui/core/mvc/Controller\",\"sap/m/MessageToast\"],function(e,s,a){\"use strict\";return s.extend(\"sap.m.sample.ImageContent.Page\",{press:function(e){a.show(\"The ImageContent is pressed.\")}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/ImageContent/Page.view.xml": "<mvc:View controllerName=\"sap.m.sample.ImageContent.Page\"\n\txmlns=\"sap.m\" xmlns:mvc=\"sap.ui.core.mvc\"><ImageContent\n\t\tclass=\"sapUiLargeMarginTop sapUiLargeMarginBottom\"\n\t\tsrc=\"sap-icon://area-chart\"\n\t\tdescription=\"Icon\"\n\t\tpress=\"press\"></ImageContent><ImageContent\n\t\tclass=\"sapUiLargeMarginTop sapUiLargeMarginBottom\"\n\t\tsrc=\"test-resources/sap/m/demokit/sample/ImageContent/images/ProfileImage_LargeGenTile.png\"\n\t\tdescription=\"Profile image\"\n\t\tpress=\"press\"></ImageContent><ImageContent\n\t\tclass=\"sapUiLargeMarginTop sapUiLargeMarginBottom\"\n\t\tsrc=\"test-resources/sap/m/demokit/sample/ImageContent/images/SAPLogoLargeTile_28px_height.png\"\n\t\tdescription=\"Logo\"\n\t\tpress=\"press\"></ImageContent></mvc:View>"
}, "web/ui5/test-resources/sap/m/demokit/sample/ImageContent/Component-preload");