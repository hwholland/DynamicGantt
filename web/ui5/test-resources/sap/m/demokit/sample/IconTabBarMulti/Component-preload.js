sap.ui.require.preload({
	"web/ui5/test-resources/sap/m/demokit/sample/IconTabBarMulti/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(a){\"use strict\";return a.extend(\"sap.m.sample.IconTabBarMulti.Component\",{metadata:{rootView:\"sap.m.sample.IconTabBarMulti.IconTabBar\",dependencies:{libs:[\"sap.m\",\"sap.ui.layout\"]},config:{sample:{files:[\"IconTabBar.view.xml\"]}}}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/IconTabBarMulti/IconTabBar.view.xml": "<mvc:View\n\txmlns:l=\"sap.ui.layout\"\n\txmlns:mvc=\"sap.ui.core.mvc\"\n\txmlns=\"sap.m\"><IconTabBar\n\t\tid=\"idIconTabBarMulti\"\n\t\texpanded=\"{device>/isNoPhone}\"\n\t\tclass=\"sapUiResponsiveContentPadding\"><items><IconTabFilter\n\t\t\t\ticon=\"sap-icon://hint\"><Text text=\"Info content goes here ...\" /></IconTabFilter><IconTabFilter\n\t\t\t\ticon=\"sap-icon://attachment\"\n\t\t\t\tcount=\"3\"><Text text=\"Attachments go here ...\" /></IconTabFilter><IconTabFilter\n\t\t\t\ticon=\"sap-icon://notes\"\n\t\t\t\tcount=\"12\"><Text text=\"Notes go here ...\" /></IconTabFilter><IconTabFilter\n\t\t\t\ticon=\"sap-icon://group\"><Text text=\"People content goes here ...\" /></IconTabFilter></items></IconTabBar></mvc:View>"
}, "web/ui5/test-resources/sap/m/demokit/sample/IconTabBarMulti/Component-preload");