sap.ui.require.preload({
	"web/ui5/test-resources/sap/ui/core/samples/manifestfirst/sap/Component.js": "sap.ui.define([\"jquery.sap.global\",\"sap/ui/core/UIComponent\"],function(e,n){\"use strict\";return n.extend(\"samples.manifestfirst.sap.Component\",{metadata:{manifest:\"json\"}})});",
	"web/ui5/test-resources/sap/ui/core/samples/manifestfirst/sap/view/Main.controller.js": "sap.ui.define([\"jquery.sap.global\",\"sap/ui/core/mvc/Controller\"],function(e,t){\"use strict\";return t.extend(\"samples.manifestfirst.sap.view.Main\",{onInit:function(){this.byId(\"text\").setText(\"Hello World\")}})});",
	"web/ui5/test-resources/sap/ui/core/samples/manifestfirst/sap/view/Main.view.xml": "<mvc:View xmlns=\"sap.ui.commons\"\n\txmlns:html=\"http://www.w3.org/1999/xhtml\" xmlns:mvc=\"sap.ui.core.mvc\"\n\txmlns:core=\"sap.ui.core\" controllerName=\"samples.manifestfirst.sap.view.Main\"><TextView id=\"text\"></TextView></mvc:View>\n"
}, "web/ui5/test-resources/sap/ui/core/samples/manifestfirst/sap/Component-preload");