sap.ui.require.preload({
	"web/ui5/test-resources/sap/tnt/demokit/sample/ToolHeader/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.tnt.sample.ToolHeader.Component\",{metadata:{rootView:\"sap.tnt.sample.ToolHeader.V\",dependencies:{libs:[\"sap.tnt\",\"sap.m\"]},config:{sample:{stretch:!0,files:[\"V.view.xml\",\"V.controller.js\"]}}}})});",
	"web/ui5/test-resources/sap/tnt/demokit/sample/ToolHeader/V.controller.js": "sap.ui.define([\"jquery.sap.global\",\"sap/ui/core/mvc/Controller\",\"sap/m/Popover\",\"sap/m/Button\"],function(e,t,n,a){\"use strict\";return t=t.extend(\"sap.tnt.sample.ToolHeader.V\",{onInit:function(){},handleUserNamePress:function(e){new n({showHeader:!1,placement:sap.m.PlacementType.Bottom,content:[new a({text:\"Feedback\",type:sap.m.ButtonType.Transparent}),new a({text:\"Help\",type:sap.m.ButtonType.Transparent}),new a({text:\"Logout\",type:sap.m.ButtonType.Transparent})]}).addStyleClass(\"sapMOTAPopover sapTntToolHeaderPopover\").openBy(e.getSource())}})});",
	"web/ui5/test-resources/sap/tnt/demokit/sample/ToolHeader/V.view.xml": "<mvc:View\n        controllerName=\"sap.tnt.sample.ToolHeader.V\"\n        xmlns:mvc=\"sap.ui.core.mvc\"\n        xmlns=\"sap.m\"\n        xmlns:tnt=\"sap.tnt\"\n        height=\"100%\"><tnt:ToolHeader><Button icon=\"sap-icon://menu2\" type=\"Transparent\"><layoutData><OverflowToolbarLayoutData priority=\"NeverOverflow\" /></layoutData></Button><ToolbarSpacer width=\"20px\" /><Button text=\"File\" type=\"Transparent\"><layoutData><OverflowToolbarLayoutData priority=\"Low\" /></layoutData></Button><Button text=\"Edit\" type=\"Transparent\"><layoutData><OverflowToolbarLayoutData priority=\"Low\" /></layoutData></Button><Button text=\"View\" type=\"Transparent\"><layoutData><OverflowToolbarLayoutData priority=\"Low\" /></layoutData></Button><Button text=\"Navigate\" type=\"Transparent\"><layoutData><OverflowToolbarLayoutData priority=\"Low\" /></layoutData></Button><Button text=\"Code\" type=\"Transparent\"><layoutData><OverflowToolbarLayoutData priority=\"Low\" /></layoutData></Button><Button text=\"Refactor\" type=\"Transparent\"><layoutData><OverflowToolbarLayoutData priority=\"Low\" /></layoutData></Button><Button text=\"Run\" type=\"Transparent\"><layoutData><OverflowToolbarLayoutData priority=\"Low\" /></layoutData></Button><Button text=\"Tools\" type=\"Transparent\"><layoutData><OverflowToolbarLayoutData priority=\"Low\" /></layoutData></Button><tnt:ToolHeaderUtilitySeparator /><ToolbarSpacer><layoutData><OverflowToolbarLayoutData priority=\"NeverOverflow\" minWidth=\"20px\" /></layoutData></ToolbarSpacer><Button text=\"Alan Smith\" type=\"Transparent\" press=\"handleUserNamePress\"><layoutData><OverflowToolbarLayoutData priority=\"NeverOverflow\" /></layoutData></Button></tnt:ToolHeader></mvc:View>\n"
}, "web/ui5/test-resources/sap/tnt/demokit/sample/ToolHeader/Component-preload");