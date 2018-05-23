sap.ui.require.preload({
	"web/ui5/test-resources/sap/m/demokit/sample/MultiInputValidators/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.m.sample.MultiInputValidators.Component\",{metadata:{rootView:\"sap.m.sample.MultiInputValidators.Page\",dependencies:{libs:[\"sap.m\",\"sap.ui.layout\"]},config:{sample:{stretch:!0,files:[\"Page.view.xml\",\"Page.controller.js\"]}}}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/MultiInputValidators/Page.controller.js": "sap.ui.define([\"sap/m/MessageBox\",\"sap/m/Token\",\"sap/ui/core/mvc/Controller\"],function(t,e,n){\"use strict\";return n.extend(\"sap.m.sample.MultiInputValidators.Page\",{onInit:function(){var n=this.getView(),a=n.byId(\"multiInput1\"),i=n.byId(\"multiInput2\"),o=n.byId(\"checkbox1\");a.addValidator(function(t){if(o.getSelected()){var n=t.text;return new e({key:n,text:n})}}),a.addValidator(function(t){if(t.suggestedToken){var n=t.suggestedToken.getText();return new e({key:n,text:\"#: \"+n})}}),i.addValidator(function(n){return t.confirm('Do you really want to add token \"'+n.text+'\"?',{onClose:function(a){if(a===t.Action.OK){var i=new e({key:n.text,text:n.text});n.asyncCallback(i)}else n.asyncCallback(null)},title:\"add Token\"}),sap.m.MultiInput.WaitForAsyncValidation})}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/MultiInputValidators/Page.view.xml": "<mvc:View height=\"100%\" controllerName=\"sap.m.sample.MultiInputValidators.Page\"\n\txmlns:l=\"sap.ui.layout\" xmlns:core=\"sap.ui.core\" xmlns:mvc=\"sap.ui.core.mvc\"\n\txmlns=\"sap.m\"><VBox><items><Label text=\"MultiInput using two validators:\"/><Label text=\"first validator creates token where the text is the same as input value; second validator adds symbol to token.\"></Label><HBox><items><MultiInput id=\"multiInput1\" width=\"400px\"/><CheckBox id=\"checkbox1\" text=\"Validate?\" selected=\"true\"/></items></HBox><Label text=\"MultiInput using asynchronous validator: add token by callback validation\" width=\"100%\"/><MultiInput id=\"multiInput2\" width=\"500px\"/></items></VBox></mvc:View>\n"
}, "web/ui5/test-resources/sap/m/demokit/sample/MultiInputValidators/Component-preload");