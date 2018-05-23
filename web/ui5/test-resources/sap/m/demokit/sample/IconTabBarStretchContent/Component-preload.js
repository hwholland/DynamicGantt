sap.ui.require.preload({
	"web/ui5/test-resources/sap/m/demokit/sample/IconTabBarStretchContent/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.m.sample.IconTabBarStretchContent.Component\",{metadata:{rootView:\"sap.m.sample.IconTabBarStretchContent.IconTabBar\",dependencies:{libs:[\"sap.m\"]},config:{sample:{files:[\"IconTabBar.view.xml\"]}}}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/IconTabBarStretchContent/IconTabBar.controller.js": "sap.ui.define([\"jquery.sap.global\",\"sap/ui/core/mvc/Controller\",\"sap/ui/model/json/JSONModel\"],function(e,o,t){\"use strict\";return o.extend(\"sap.m.sample.IconTabBarStretchContent.IconTabBar\",{onInit:function(o){var n=new t(e.sap.getModulePath(\"sap.ui.demo.mock\",\"/products.json\"));this.getView().setModel(n)}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/IconTabBarStretchContent/IconTabBar.view.xml": "<mvc:View\n\tcontrollerName=\"sap.m.sample.IconTabBarStretchContent.IconTabBar\"\n\txmlns:mvc=\"sap.ui.core.mvc\"\n\txmlns:l=\"sap.ui.layout\"\n\txmlns=\"sap.m\"><IconTabBar\n\t\tid=\"idIconTabBarStretchContent\"\n\t\tstretchContentHeight=\"true\"\n\t\tbackgroundDesign=\"Transparent\"\n\t\tapplyContentPadding=\"false\"\n\t\texpanded=\"{device>/isNoPhone}\"\n\t\tclass=\"sapUiResponsiveContentPadding\"><items><IconTabFilter\n\t\t\t\ttext=\"Products\"><ScrollContainer\n\t\t\t\t\t\theight=\"100%\"\n\t\t\t\t\t\twidth=\"100%\"\n\t\t\t\t\t\thorizontal=\"false\"\n\t\t\t\t\t\tvertical=\"true\"><List\n\t\t\t\t\t\titems=\"{\n\t\t\t\t\t\t\tpath: '/ProductCollection'\n\t\t\t\t\t\t}\" ><StandardListItem\n\t\t\t\t\t\t\t\ttitle=\"{Name}\"\n\t\t\t\t\t\t\t\tcounter=\"{Quantity}\"/></List></ScrollContainer></IconTabFilter><IconTabFilter\n\t\t\t\ttext=\"Attachments\"><Text text=\"Attachments go here ...\" /></IconTabFilter><IconTabFilter\n\t\t\t\ttext=\"Notes\"><Text text=\"Notes go here ...\" /></IconTabFilter><IconTabFilter\n\t\t\t\ttext=\"People\"><Text text=\"People content goes here ...\" /></IconTabFilter></items></IconTabBar></mvc:View>\n"
}, "web/ui5/test-resources/sap/m/demokit/sample/IconTabBarStretchContent/Component-preload");