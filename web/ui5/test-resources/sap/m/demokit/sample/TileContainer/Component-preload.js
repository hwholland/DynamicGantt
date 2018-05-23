sap.ui.require.preload({
	"web/ui5/test-resources/sap/m/demokit/sample/TileContainer/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.m.sample.TileContainer.Component\",{metadata:{rootView:\"sap.m.sample.TileContainer.Page\",dependencies:{libs:[\"sap.m\"]},config:{sample:{stretch:!0,files:[\"Page.view.xml\",\"Page.controller.js\",\"data.json\"]}}}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/TileContainer/Page.controller.js": "sap.ui.define([\"jquery.sap.global\",\"sap/ui/core/mvc/Controller\",\"sap/ui/model/json/JSONModel\"],function(e,t,n){\"use strict\";return t.extend(\"sap.m.sample.TileContainer.Page\",{onInit:function(t){var a=e.sap.getModulePath(\"sap.m.sample.TileContainer\",\"/data.json\"),i=new n(a);this.getView().setModel(i)},handleEditPress:function(e){var t=this.getView().byId(\"container\"),n=!t.getEditable();t.setEditable(n),e.getSource().setText(n?\"Done\":\"Edit\")},handleBusyPress:function(e){var t=this.getView().byId(\"container\"),n=!t.getBusy();t.setBusy(n),e.getSource().setText(n?\"Done\":\"Busy state\")},handleTileDelete:function(e){var t=e.getParameter(\"tile\");e.getSource().removeTile(t)}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/TileContainer/Page.view.xml": "<mvc:View\n\theight=\"100%\"\n\tcontrollerName=\"sap.m.sample.TileContainer.Page\"\n\txmlns:mvc=\"sap.ui.core.mvc\"\n\txmlns=\"sap.m\"><Page\n\t\tshowHeader=\"false\"\n\t\tenableScrolling=\"false\" ><TileContainer\n\t\t\tid=\"container\"\n\t\t\ttileDelete=\"handleTileDelete\"\n\t\t\ttiles=\"{/TileCollection}\"><StandardTile\n\t\t\t\ticon=\"{icon}\"\n\t\t\t\ttype=\"{type}\"\n\t\t\t\tnumber=\"{number}\"\n\t\t\t\tnumberUnit=\"{numberUnit}\"\n\t\t\t\ttitle=\"{title}\"\n\t\t\t\tinfo=\"{info}\"\n\t\t\t\tinfoState=\"{infoState}\" /></TileContainer><footer><Toolbar><ToolbarSpacer/><Button text=\"Edit\" press=\"handleEditPress\" /><Button text=\"Busy state\" press=\"handleBusyPress\" /><ToolbarSpacer/></Toolbar></footer></Page></mvc:View>\n"
}, "web/ui5/test-resources/sap/m/demokit/sample/TileContainer/Component-preload");