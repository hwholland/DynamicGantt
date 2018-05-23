sap.ui.require.preload({
	"web/ui5/test-resources/sap/m/demokit/sample/SemanticPageDraftIndicator/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.m.sample.SemanticPageDraftIndicator.Component\",{metadata:{rootView:\"sap.m.sample.SemanticPageDraftIndicator.Page\",dependencies:{libs:[\"sap.m\"]},config:{sample:{stretch:!0,files:[\"Page.view.xml\",\"Page.controller.js\"]}}}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/SemanticPageDraftIndicator/Page.controller.js": "sap.ui.define([\"jquery.sap.global\",\"sap/ui/core/mvc/Controller\",\"sap/ui/model/json/JSONModel\",\"sap/m/MessagePopover\",\"sap/m/MessagePopoverItem\"],function(e,s,a,t,o){\"use strict\";return s.extend(\"sap.m.sample.SemanticPageDraftIndicator.Page\",{onInit:function(){var s=new a(e.sap.getModulePath(\"sap.ui.demo.mock\",\"/products.json\"));this.getView().setModel(s);var t=new sap.ui.core.message.ControlMessageProcessor,o=sap.ui.getCore().getMessageManager();o.registerMessageProcessor(t),o.addMessages(new sap.ui.core.message.Message({message:\"Something wrong happened\",type:sap.ui.core.MessageType.Error,processor:t}))},handleLiveChange:function(e){var s=this.getView().byId(\"draftIndi\");s.showDraftSaving(),s.showDraftSaved(),s.clearDraftState()},onPress:function(e){sap.m.MessageToast.show(\"Pressed custom button \"+e.getSource().getId())},onSemanticButtonPress:function(e){var s=e.getSource().getMetadata().getName();s=s.replace(e.getSource().getMetadata().getLibraryName()+\".\",\"\"),sap.m.MessageToast.show(\"Pressed: \"+s)},onNavButtonPress:function(){sap.m.MessageToast.show(\"Pressed navigation button\")},onMessagesButtonPress:function(e){var s=e.getSource();this._messagePopover||(this._messagePopover=new t({items:{path:\"message>/\",template:new o({description:\"{message>description}\",type:\"{message>type}\",title:\"{message>message}\"})}}),s.addDependent(this._messagePopover)),this._messagePopover.toggle(s)}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/SemanticPageDraftIndicator/Page.view.xml": "<mvc:View\n\t\theight=\"100%\"\n\t\txmlns:core=\"sap.ui.core\"\n\t\txmlns:mvc=\"sap.ui.core.mvc\"\n\t\tcontrollerName=\"sap.m.sample.SemanticPageDraftIndicator.Page\"\n\t\txmlns=\"sap.m\"\n\t\txmlns:semantic=\"sap.m.semantic\"\n\t\txmlns:form=\"sap.ui.layout.form\"\n\t\txmlns:ui=\"sap.ca.ui\"\n\t\tdisplayBlock=\"true\"><semantic:FullscreenPage title=\"FullScreen Page Title\"\n\t\t\t\t\t\t\t\t\t showNavButton=\"true\"\n\t\t\t\t\t\t\t\t\t navButtonPress=\"onNavButtonPress\"><semantic:addAction><semantic:AddAction press=\"onSemanticButtonPress\"/></semantic:addAction><semantic:flagAction><semantic:FlagAction press=\"onSemanticButtonPress\"/></semantic:flagAction><semantic:favoriteAction><semantic:FavoriteAction press=\"onSemanticButtonPress\"/></semantic:favoriteAction><semantic:messagesIndicator><semantic:MessagesIndicator press=\"onMessagesButtonPress\"/></semantic:messagesIndicator><semantic:draftIndicator><DraftIndicator id=\"draftIndi\" state=\"Saved\"></DraftIndicator></semantic:draftIndicator><semantic:content><ObjectHeader title=\"Type something in the field, the Draft Indicator will be displayed in the footer\"\n\t\t\t\t\t\t\tintro=\"this is just a simulation of how the DraftIndicator will work\"\n\t\t\t\t\t\t\tresponsive=\"true\"/><form:SimpleForm editable=\"true\"><Label text=\"Type here\"/><Input id=\"TypeHere\" liveChange=\"handleLiveChange\"/></form:SimpleForm></semantic:content></semantic:FullscreenPage></mvc:View>\n"
}, "web/ui5/test-resources/sap/m/demokit/sample/SemanticPageDraftIndicator/Component-preload");