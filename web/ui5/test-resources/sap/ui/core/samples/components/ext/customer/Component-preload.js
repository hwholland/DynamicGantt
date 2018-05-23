sap.ui.require.preload({
	"web/ui5/test-resources/sap/ui/core/samples/components/ext/customer/Component.js": "sap.ui.define([\"jquery.sap.global\",\"samples/components/ext/sap/Component\"],function(e,s){\"use strict\";return s.extend(\"samples.components.ext.customer.Component\",{metadata:{version:\"1.0\",config:{\"customer.config\":{key1:\"value1\"},myConfig:{key2:{subKey1:\"subValue1\"}}},customizing:{\"sap.ui.viewReplacements\":{\"samples.components.ext.sap.Sub1\":{viewName:\"samples.components.ext.customer.CustomSub1\",type:\"XML\"}},\"sap.ui.controllerReplacements\":{\"samples.components.ext.sap.Main\":\"samples.components.ext.customer.Main\"},\"sap.ui.viewExtensions\":{\"samples.components.ext.sap.Sub2\":{extension2:{className:\"sap.ui.core.Fragment\",fragmentName:\"samples.components.ext.customer.CustomFrag1WithCustomerAction\",type:\"XML\"},extension3:{className:\"sap.ui.core.mvc.View\",viewName:\"samples.components.ext.customer.CustomSubSubView1\",type:\"XML\"},extension4:{className:\"sap.ui.core.Fragment\",fragmentName:\"samples.components.ext.customer.MultiRootFragment\",type:\"XML\"},extension5:{className:\"sap.ui.core.Fragment\",fragmentName:\"samples.components.ext.customer.ListItemFragment\",type:\"XML\"}},\"samples.components.ext.sap.Sub4\":{extension42:{className:\"sap.ui.core.Fragment\",fragmentName:\"samples.components.ext.customer.JSCustomFragWithCustomAction\",type:\"JS\"},extension43:{className:\"sap.ui.core.mvc.View\",viewName:\"samples.components.ext.customer.JSCustomSubSubView\",type:\"JS\"},extension45:{className:\"sap.ui.core.Fragment\",fragmentName:\"samples.components.ext.customer.CustomTextViewFrag\",type:\"JS\"}},\"samples.components.ext.customer.CustomSubSubView1\":{extension2:{className:\"sap.ui.core.Fragment\",fragmentName:\"samples.components.ext.customer.CustomFrag1\",type:\"XML\"}},\"samples.components.ext.customer.JSCustomSubSubView\":{extension44:{className:\"sap.ui.core.Fragment\",fragmentName:\"samples.components.ext.customer.MultiRootFragment\",type:\"JS\"}},\"samples.components.ext.sap.Frag1\":{extensionPointInFragment:{className:\"sap.ui.core.Fragment\",fragmentName:\"samples.components.ext.customer.CustomFrag1\",type:\"XML\"}}},\"sap.ui.viewModifications\":{\"samples.components.ext.sap.Sub3\":{customizableText:{visible:!1}},\"samples.components.ext.sap.Sub4\":{customizableText1:{visible:!1}},\"samples.components.ext.sap.Sub5\":{Button2:{visible:!1}}},\"sap.ui.controllerExtensions\":{\"samples.components.ext.sap.Sub2\":{controllerName:\"samples.components.ext.customer.Sub2ControllerExtension\"},\"samples.components.ext.sap.Sub4\":{controllerName:\"samples.components.ext.customer.Sub4ControllerExtension\"}}}}})});",
	"web/ui5/test-resources/sap/ui/core/samples/components/ext/customer/CustomSubSubView1.controller.js": "sap.ui.define([\"jquery.sap.global\",\"sap/ui/core/mvc/Controller\"],function(o){\"use strict\";sap.ui.controller(\"samples.components.ext.customer.CustomSubSubView1\",{onInit:function(){o.sap.log.info(\"CustomSubSubView1 Controller onInit()\")},formatNumber:function(o){return\"[ext\"+o+\"]\"}})});",
	"web/ui5/test-resources/sap/ui/core/samples/components/ext/customer/CustomTextViewFrag.fragment.js": "sap.ui.define([\"sap/ui/commons/TextView\",\"sap/ui/core/Fragment\"],function(e,t){\"use strict\";sap.ui.jsfragment(\"samples.components.ext.customer.CustomTextViewFrag\",{createContent:function(t){return new e(\"iHaveCausedDestruction\",{text:\"Hello World\"})}})});",
	"web/ui5/test-resources/sap/ui/core/samples/components/ext/customer/JSCustomFragWithCustomAction.fragment.js": "sap.ui.define([\"sap/ui/commons/Button\",\"sap/ui/core/Fragment\"],function(t,e){\"use strict\";sap.ui.jsfragment(\"samples.components.ext.customer.JSCustomFragWithCustomAction\",{createContent:function(e){return new t({text:\"Hello World\",press:e.customerAction})}})});",
	"web/ui5/test-resources/sap/ui/core/samples/components/ext/customer/JSCustomSubSubView.view.js": "sap.ui.define([\"sap/ui/commons/TextView\",\"sap/ui/core/mvc/JSView\"],function(e,t){\"use strict\";sap.ui.jsview(\"samples.components.ext.customer.JSCustomSubSubView\",{createContent:function(t){return[new e({text:\"I am the customer replacement\"}),sap.ui.extensionpoint(this,\"extension44\")]}})});",
	"web/ui5/test-resources/sap/ui/core/samples/components/ext/customer/MultiRootFragment.fragment.js": "sap.ui.define([\"sap/ui/commons/Button\",\"sap/ui/core/Fragment\"],function(t,e){\"use strict\";sap.ui.jsfragment(\"samples.components.ext.customer.MultiRootFragment\",{createContent:function(e){return[new t(this.createId(\"customerButton1\"),{text:\"Hello World\"}),new t(this.createId(\"customerButton2\"),{text:\"Hello Button\"})]}})});",
	"web/ui5/test-resources/sap/ui/core/samples/components/ext/customer/Sub2ControllerExtension.controller.js": "sap.ui.define([\"jquery.sap.global\",\"sap/ui/core/mvc/Controller\"],function(n){\"use strict\";sap.ui.controller(\"samples.components.ext.customer.Sub2ControllerExtension\",{onInit:function(){n.sap.log.info(\"Sub2ControllerExtension Controller onInit()\")},onExit:function(){n.sap.log.info(\"Sub2ControllerExtension Controller onExit()\")},onBeforeRendering:function(){n.sap.log.info(\"Sub2ControllerExtension Controller onBeforeRendering()\")},onAfterRendering:function(){n.sap.log.info(\"Sub2ControllerExtension Controller onAfterRendering()\")},customerAction:function(){alert(\"This is a customer Action\")}})});",
	"web/ui5/test-resources/sap/ui/core/samples/components/ext/customer/Sub4ControllerExtension.controller.js": "sap.ui.define([\"sap/ui/core/mvc/Controller\"],function(){\"use strict\";sap.ui.controller(\"samples.components.ext.customer.Sub4ControllerExtension\",{customerAction:function(){alert(\"This is a customer Action\")}})});",
	"web/ui5/test-resources/sap/ui/core/samples/components/ext/customer/CustomFrag1.fragment.xml": "<core:FragmentDefinition xmlns=\"sap.ui.commons\" xmlns:core=\"sap.ui.core\"><Button text=\"This Button is in an Extension Fragment\" /><TextView text=\"{path:'/number', formatter:'.formatNumber'}\" tooltip=\"formatted number in extension Fragment CustomFrag1\"></TextView></core:FragmentDefinition>",
	"web/ui5/test-resources/sap/ui/core/samples/components/ext/customer/CustomFrag1WithCustomerAction.fragment.xml": "<Button xmlns=\"sap.ui.commons\" text=\"This Button is in an Extension Fragment\" press=\"customerAction\" />",
	"web/ui5/test-resources/sap/ui/core/samples/components/ext/customer/ListItemFragment.fragment.xml": "<ListItem xmlns=\"sap.ui.core\" text=\"(Customer's replacement ListItem)\" additionalText=\"{name}\" />",
	"web/ui5/test-resources/sap/ui/core/samples/components/ext/customer/MultiRootFragment.fragment.xml": "<core:FragmentDefinition xmlns=\"sap.ui.commons\" xmlns:core=\"sap.ui.core\"><Label text=\"This label and the following Button are within one multi-root extension Fragment:\" /><Button text=\"Still in the same Fragment\" /></core:FragmentDefinition>",
	"web/ui5/test-resources/sap/ui/core/samples/components/ext/customer/CustomSub1.view.xml": "<mvc:View xmlns=\"sap.ui.commons\" xmlns:mvc=\"sap.ui.core.mvc\"><TextView text=\"Custom View 'Sub1' - this one replaces the original SAP View 'Sub1'\"></TextView></mvc:View>",
	"web/ui5/test-resources/sap/ui/core/samples/components/ext/customer/CustomSubSubView1.view.xml": "<mvc:View xmlns=\"sap.ui.commons\"  xmlns:core=\"sap.ui.core\" xmlns:mvc=\"sap.ui.core.mvc\" controllerName=\"samples.components.ext.customer.CustomSubSubView1\" ><core:ExtensionPoint name=\"extension1\" /><TextView text=\"Customer View 'SubSubView1' - this one extends the original SAP View 'Sub2' - and even custom Views can be extended:\"></TextView><core:ExtensionPoint name=\"extension2\" /></mvc:View>"
}, "web/ui5/test-resources/sap/ui/core/samples/components/ext/customer/Component-preload");