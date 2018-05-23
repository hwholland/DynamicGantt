sap.ui.require.preload({
	"web/ui5/test-resources/sap/ca/ui/demokit/sample/MessageDialog/Component.js": "jQuery.sap.declare(\"sap.ca.ui.sample.MessageDialog.Component\"),sap.ui.core.UIComponent.extend(\"sap.ca.ui.sample.MessageDialog.Component\",{metadata:{rootView:\"sap.ca.ui.sample.MessageDialog.MessageHandling\",dependencies:{libs:[\"sap.m\",\"sap.ca.ui\"]},config:{sample:{stretch:!0,files:[\"MessageHandling.view.xml\",\"MessageHandling.controller.js\"]}}}});",
	"web/ui5/test-resources/sap/ca/ui/demokit/sample/MessageDialog/MessageHandling.controller.js": "jQuery.sap.require(\"sap.ca.ui.message.message\"),sap.ui.controller(\"sap.ca.ui.sample.MessageDialog.MessageHandling\",{onInit:function(){},onPressMessageToast:function(e){sap.ca.ui.message.showMessageToast(\"It's a great success!\")},onPressError:function(e){sap.ca.ui.message.showMessageBox({type:sap.ca.ui.message.Type.ERROR,message:\"No connection can be established to the backend system ABC\",details:\"Lorem ipsum dolor sit amet, eum an vidit porro ocurreret, has elit illud probatus ut. Ut est audire necessitatibus, case denique scribentur vel no. Ipsum suscipit te quo, eam ne justo insolens. His dico impedit offendit ea, decore eripuit volumus sea an, ut omnes cetero delectus eos.\\n\\nTota paulo graecis ei usu, mei te alii alia harum. Nulla singulis in nec, qui vide solum inani no. Lorem timeam posidonium nec te, decore noster ut eum, sit mazim delicata deterruisset cu. Id mea nemore delenit, eu ignota propriae eum.\\n\\nSolum atqui persecuti ut est, altera corrumpit te his. Nam justo epicurei mnesarchum ut, ne nam error ludus. Aeque utinam eum ad, homero audiam recteque nec ne, mazim constituam ne pri. Cum tollit dolorum interesset at. Pri partem tempor reprehendunt in, delectus vulputate sed ne. Etiam aeterno dolores eum ut.\\n\\nEx conceptam omittantur quo. Sit et petentium scripserit, te mea simul civibus scaevola. Mel solum ludus ea, ut sed cibo choro exerci. Eum discere quaestio ei, sed legendos platonem necessitatibus in. Eu duo populo mnesarchum vituperata.\"})},onPressInfo:function(e){sap.ca.ui.message.showMessageBox({type:sap.ca.ui.message.Type.INFO,message:\"You got notifications...\",details:\"          message1:1\\nmessage2:2\\nmessage3:3\\n\"})},onPressWarning:function(e){sap.ca.ui.message.showMessageBox({type:sap.ca.ui.message.Type.WARNING,message:\"No Recipients found\"})},onPressSuccess:function(e){sap.ca.ui.message.showMessageBox({type:sap.ca.ui.message.Type.SUCCESS,message:\"   You may need to use Message Toast\\n\",details:\"You may need to use Message Toast\\n\"})},onAdditionalStyle:function(e){sap.ca.ui.message.showMessageBox({type:sap.ca.ui.message.Type.SUCCESS,message:\"   You may need to use Message Toast\\n\",details:\"You may need to use Message Toast\\n\"}).addStyleClass(\"testClass\")}});",
	"web/ui5/test-resources/sap/ca/ui/demokit/sample/MessageDialog/MessageHandling.view.xml": "<core:View xmlns:core=\"sap.ui.core\" xmlns:html=\"http://www.w3.org/1999/xhtml\"\n           xmlns=\"sap.m\" controllerName=\"sap.ca.ui.sample.MessageDialog.MessageHandling\" height=\"100%\"><Page id=\"page\" title=\"Message Handling\" showHeader=\"false\"><content><Button id=\"btnMsgToast\" press=\"onPressMessageToast\" text=\"Show (Success) MessageToast\"/><Button id=\"btnError\" press=\"onPressError\" text=\"Open (Error) Message Box\"/><Button id=\"btnWarning\" press=\"onPressWarning\" text=\"Open (Warning) Message Box\"/><Button id=\"btnInfo\" press=\"onPressInfo\" text=\"Open (Info) Message Box\"/><Button id=\"btnSuccess\" press=\"onPressSuccess\" text=\"Open (Success) Message Box\"/><Button id=\"btnSuccessClass\" press=\"onAdditionalStyle\" text=\"Open (Success) Message Box with customStyle class\"/></content></Page></core:View>\n"
}, "web/ui5/test-resources/sap/ca/ui/demokit/sample/MessageDialog/Component-preload");