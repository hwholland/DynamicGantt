sap.ui.require.preload({
	"web/ui5/test-resources/sap/uxap/demokit/sample/BlockBaseEventing/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.uxap.sample.BlockBaseEventing.Component\",{metadata:{rootView:\"sap.uxap.sample.BlockBaseEventing.Eventing\",dependencies:{libs:[\"sap.m\"]},config:{sample:{stretch:!0,files:[\"Eventing.view.xml\",\"Eventing.controller.js\",\"EventingBlock.js\",\"EventingBlock.view.xml\",\"EventingBlockController.controller.js\"]}}}})},!0);",
	"web/ui5/test-resources/sap/uxap/demokit/sample/BlockBaseEventing/Eventing.controller.js": "sap.ui.define([\"sap/m/MessageToast\",\"sap/ui/core/mvc/Controller\"],function(e,n){\"use strict\";return n.extend(\"sap.uxap.sample.BlockBaseEventing.Eventing\",{onDummy:function(n){e.show(\"dummy event fired by control \"+n.getSource().getId())}})});",
	"web/ui5/test-resources/sap/uxap/demokit/sample/BlockBaseEventing/EventingBlock.js": "sap.ui.define([\"sap/uxap/BlockBase\"],function(e){return e.extend(\"sap.uxap.sample.BlockBaseEventing.EventingBlock\",{metadata:{events:{dummy:{}}}})},!0);",
	"web/ui5/test-resources/sap/uxap/demokit/sample/BlockBaseEventing/EventingBlockController.controller.js": "!function(){\"use strict\";jQuery.sap.declare({modName:\"sap.uxap.sample.BlockBaseEventing.EventingBlockController\",type:\"controller\"}),sap.ui.core.mvc.Controller.extend(\"sap.uxap.sample.BlockBaseEventing.EventingBlockController\",{onInnerDummy:function(e){this.oParentBlock.fireDummy(e.getParameters())}})}();",
	"web/ui5/test-resources/sap/uxap/demokit/sample/BlockBaseEventing/Eventing.view.xml": "<core:View height=\"100%\" xmlns:core=\"sap.ui.core\" xmlns:m=\"sap.m\"\n\t\t   xmlns=\"sap.uxap\" xmlns:sample=\"sap.uxap.sample.BlockBaseEventing\"\n\t\t   xmlns:html=\"http://www.w3.org/1999/xhtml\" controllerName=\"sap.uxap.sample.BlockBaseEventing.Eventing\"><ObjectPageLayout id=\"ObjectPageLayout\"><headerTitle><ObjectPageHeader objectTitle=\"Eventing Blocks\"/></headerTitle><sections><ObjectPageSection title=\"example\"><subSections><ObjectPageSubSection title=\"Example\"><blocks><html:div style=\"padding:1em;height:4em; background-color: #A9EAFF ;\"><html:div style=\" display:inline-block;\"><sample:EventingBlock id=\"block\" dummy=\"onDummy\"/></html:div></html:div></blocks></ObjectPageSubSection></subSections></ObjectPageSection></sections></ObjectPageLayout></core:View>\n",
	"web/ui5/test-resources/sap/uxap/demokit/sample/BlockBaseEventing/EventingBlock.view.xml": "<mvc:View\n\t\txmlns:mvc=\"sap.ui.core.mvc\"\n\t\txmlns=\"sap.m\"\n\t\twidth=\"100%\"\n\t\tcontrollerName=\"sap.uxap.sample.BlockBaseEventing.EventingBlockController\"><Button text=\"press me to fire an event\" press=\"onInnerDummy\"/></mvc:View>\n"
}, "web/ui5/test-resources/sap/uxap/demokit/sample/BlockBaseEventing/Component-preload");