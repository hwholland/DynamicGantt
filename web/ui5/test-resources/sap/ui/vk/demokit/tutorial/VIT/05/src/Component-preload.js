sap.ui.require.preload({
	"web/ui5/test-resources/sap/ui/vk/demokit/tutorial/VIT/05/src/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(t){\"use strict\";return t.extend(\"viewportScenetreeStepnav.Component\",{metadata:{manifest:\"json\"},init:function(){t.prototype.init.apply(this,arguments)}})});",
	"web/ui5/test-resources/sap/ui/vk/demokit/tutorial/VIT/05/src/controller/App.controller.js": "sap.ui.define([\"sap/ui/core/mvc/Controller\",\"sap/ui/model/json/JSONModel\",\"sap/ui/vk/ContentResource\"],function(e,r,t){\"use strict\";var o=new sap.ui.vk.ContentResource({source:\"models/boxTestModel.vds\",sourceType:\"vds\",id:\"abc123\"});return e.extend(\"viewportScenetreeStepnav.controller.App\",{onInit:function(){var e;jQuery.sap.require(\"sap.ui.vk.GraphicsCore\");var r=new sap.ui.vk.GraphicsCore({},{antialias:!0,alpha:!0,premultipliedAlpha:!1}),t=this.getView(),a=t.byId(\"viewport\"),s=t.byId(\"scenetree\"),n=t.byId(\"StepNavigation\");a.setGraphicsCore(r),r.loadContentResourcesAsync([o],function(t){if(t)jQuery.sap.log.error(\"Some of content resources cannot be loaded.\");else{var i=r.buildSceneTree([o]);if(i){e=i,a.setScene(e);var c=r.createViewStateManager(e.getDefaultNodeHierarchy());a.setViewStateManager(c),s.setScene(e,c),n.setScene(e)}else jQuery.sap.log.error(\"Failed to build the scene tree.\")}})}})});",
	"web/ui5/test-resources/sap/ui/vk/demokit/tutorial/VIT/05/src/view/App.view.xml": "<mvc:View\n\t\tcontrollerName=\"viewportScenetreeStepnav.controller.App\"\n\t\txmlns=\"sap.m\"\n\t\txmlns:mvc=\"sap.ui.core.mvc\"\n\t\txmlns:vk=\"sap.ui.vk\"\n\t\txmlns:l=\"sap.ui.layout\"\n\t\txmlns:f=\"sap.ui.layout.form\"\n\t\txmlns:u=\"sap.ui.unified\"\n\t\tdisplayBlock=\"true\"><App id=\"viewportScenetreeStepnav\"><Page\n\t\t\t\ttitle=\"{i18n>pageTitle}\"><vk:StepNavigation\n\t\t\t\tid=\"StepNavigation\"\n\t\t\t\twidth=\"100%\"\n\t\t\t\t\theight=\"17.5%\"/><vk:Viewport\n\t\t\t\t\tid=\"viewport\"\n\t\t\t\t\twidth=\"100%\"\n\t\t\t\t\theight=\"50%\"/><vk:SceneTree\n\t\t\t\t\tid=\"scenetree\"\n\t\t\t\t\twidth=\"100%\"\n\t\t\t\t\theight=\"50%\"/></Page></App></mvc:View>",
	"web/ui5/test-resources/sap/ui/vk/demokit/tutorial/VIT/05/src/i18n/i18n.properties": "# Page Descriptor\npageTitle=Viewport with Scene Tree and Step Navigation\n"
}, "web/ui5/test-resources/sap/ui/vk/demokit/tutorial/VIT/05/src/Component-preload");