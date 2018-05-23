sap.ui.require.preload({
	"web/ui5/test-resources/sap/ui/layout/demokit/sample/DynamicSideContentProduct/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.ui.layout.sample.DynamicSideContentProduct.Component\",{metadata:{rootView:\"sap.ui.layout.sample.DynamicSideContentProduct.DynamicSideContent\",dependencies:{libs:[\"sap.ui.layout\"]},includes:[\"style.css\"],config:{sample:{stretch:!0,files:[\"DynamicSideContent.view.xml\",\"DynamicSideContent.controller.js\",\"style.css\"]}}}})});",
	"web/ui5/test-resources/sap/ui/layout/demokit/sample/DynamicSideContentProduct/DynamicSideContent.controller.js": "sap.ui.define([\"jquery.sap.global\",\"sap/ui/core/mvc/Controller\",\"sap/ui/model/json/JSONModel\",\"sap/ui/Device\"],function(t,e,n,i){\"use strict\";return e.extend(\"sap.ui.layout.sample.DynamicSideContentProduct.DynamicSideContent\",{onInit:function(){this._oDSC=this.getView().byId(\"DynamicSideContent\"),this._showSideContentButton=this.getView().byId(\"showSideContentButton\");var e=new n(t.sap.getModulePath(\"sap.ui.demo.mock\",\"/img.json\"));this.getView().setModel(e,\"img\");var o=new n(i.system);this.getView().setModel(o,\"media\");var a=t.sap.getModulePath(\"sap.ui.layout.sample.DynamicSideContentProduct\",\"/feed.json\"),d=new n(a);this.getView().setModel(d)},onAfterRendering:function(){var t=this._oDSC.getCurrentBreakpoint();this.updateToggleButtonState(t)},handleSliderChange:function(t){var e=t.getParameter(\"value\");this.updateControlWidth(e)},updateControlWidth:function(t){var e=this.getView().byId(\"sideContentContainer\").$();t&&e.width(t+\"%\")},handleBreakpointChangeEvent:function(t){var e=t.getParameter(\"currentBreakpoint\");this.updateToggleButtonState(e),this.updateShowSideContentButtonVisibility(e)},updateToggleButtonState:function(t){this.getView().byId(\"toggleButton\").setEnabled(\"S\"===t)},updateShowSideContentButtonVisibility:function(t){var e=!(\"S\"===t||this._oDSC.getShowSideContent());this._showSideContentButton.setVisible(e)},handleToggleClick:function(t){this.getView().byId(\"DynamicSideContent\").toggle()},handleSideContentHide:function(t){this._oDSC.setShowSideContent(!1),this.updateShowSideContentButtonVisibility(this._oDSC.getCurrentBreakpoint())},handleSideContentShow:function(t){this._oDSC.setShowSideContent(!0),this.updateShowSideContentButtonVisibility(this._oDSC.getCurrentBreakpoint())}})});",
	"web/ui5/test-resources/sap/ui/layout/demokit/sample/DynamicSideContentProduct/DynamicSideContent.view.xml": "<mvc:View\n\theight=\"100%\"\n\tcontrollerName=\"sap.ui.layout.sample.DynamicSideContentProduct.DynamicSideContent\"\n\txmlns:l=\"sap.ui.layout\"\n\txmlns:mvc=\"sap.ui.core.mvc\"\n\txmlns=\"sap.m\"><Page\n\t\tshowHeader=\"false\"\n\t\tshowNavButton=\"false\"><content><Page\n\t\t\t\tid=\"sideContentContainer\"\n\t\t\t\tshowHeader=\"false\"\n\t\t\t\tshowNavButton=\"false\"><l:DynamicSideContent\n\t\t\t\t\tid=\"DynamicSideContent\"\n\t\t\t\t\tclass=\"sapUiDSCExplored sapUiContentPadding\"\n\t\t\t\t\tcontainerQuery=\"true\"\n\t\t\t\t\tsideContentFallDown=\"BelowM\"\n\t\t\t\t\tbreakpointChanged=\"handleBreakpointChangeEvent\"><l:mainContent><VBox><Title level=\"H1\" text=\"Product\" /><Image src=\"{img>/products/pic1}\" densityAware=\"false\" width=\"10em\" /><Text text=\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\t\t\t\t\t\t\tDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\n\t\t\t\t\t\t\tExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\t\t\t\t\t\t\tLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n\t\t\t\t\t\t\tUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\t\t\t\t\t\t\tDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\"></Text></VBox></l:mainContent><l:sideContent><Toolbar><Title text=\"Comments\"/><ToolbarSpacer /><Button text=\"Close\" type=\"Transparent\" press=\"handleSideContentHide\" visible=\"{= !${media>/phone}}\" /></Toolbar><l:VerticalLayout\n\t\t\t\t\t\t\t\twidth=\"100%\"><l:content><List\n\t\t\t\t\t\t\t\t\t\titems=\"{/EntryCollection}\" ><FeedListItem\n\t\t\t\t\t\t\t\t\t\t\tsender=\"{Author}\"\n\t\t\t\t\t\t\t\t\t\t\ticon=\"{AuthorPicUrl}\"\n\t\t\t\t\t\t\t\t\t\t\tsenderPress=\"onPress\"\n\t\t\t\t\t\t\t\t\t\t\ticonPress=\"onPress\"\n\t\t\t\t\t\t\t\t\t\t\ticonDensityAware=\"false\"\n\t\t\t\t\t\t\t\t\t\t\tinfo=\"{Type}\"\n\t\t\t\t\t\t\t\t\t\t\ttimestamp=\"{Date}\"\n\t\t\t\t\t\t\t\t\t\t\ttext=\"{Text}\" /></List><FeedInput\n\t\t\t\t\t\t\t\t\t\tpost=\"onPost\"\n\t\t\t\t\t\t\t\t\t\tshowIcon=\"true\"\n\t\t\t\t\t\t\t\t\t\ticon=\"http://upload.wikimedia.org/wikipedia/commons/2/25/George_Washington_as_CIC_of_the_Continental_Army_bust.jpg\" /></l:content></l:VerticalLayout></l:sideContent></l:DynamicSideContent></Page></content><footer><Toolbar><content><Button text=\"Toggle\" type=\"Accept\" press=\"handleToggleClick\" id=\"toggleButton\" /><Button text=\"Open Side Content\" id=\"showSideContentButton\" press=\"handleSideContentShow\" visible=\"false\" /><Slider id='DSCWidthSlider' value=\"100\" liveChange=\"handleSliderChange\" visible=\"{= !${media>/phone}}\" /><Text id='DSCWidthHintText' text=\"Best view in full screen\" visible=\"{= !${media>/phone}}\" /></content></Toolbar></footer></Page></mvc:View>\n"
}, "web/ui5/test-resources/sap/ui/layout/demokit/sample/DynamicSideContentProduct/Component-preload");