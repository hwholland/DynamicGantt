sap.ui.require.preload({
	"web/ui5/test-resources/sap/uxap/demokit/sample/ObjectPageDynamicSideContentBtn/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.uxap.sample.ObjectPageDynamicSideContentBtn.Component\",{metadata:{rootView:\"sap.uxap.sample.ObjectPageDynamicSideContentBtn.ObjectPageDynamicSideContentBtn\",dependencies:{libs:[\"sap.ui.layout\"]},includes:[\"style.css\"],config:{sample:{stretch:!0,files:[\"ObjectPageDynamicSideContentBtn.view.xml\",\"ObjectPageDynamicSideContentBtn.controller.js\",\"../SharedBlocks/employment/BlockEmpDetailPart1.js\",\"../SharedBlocks/employment/BlockEmpDetailPart1.view.xml\",\"../SharedBlocks/employment/BlockEmpDetailPart2.js\",\"../SharedBlocks/employment/BlockEmpDetailPart2.view.xml\",\"../SharedBlocks/employment/BlockEmpDetailPart3.js\",\"../SharedBlocks/employment/BlockEmpDetailPart3.view.xml\",\"../SharedBlocks/employment/BlockJobInfoPart1.js\",\"../SharedBlocks/employment/BlockJobInfoPart1.view.xml\",\"../SharedBlocks/employment/BlockJobInfoPart2.js\",\"../SharedBlocks/employment/BlockJobInfoPart2.view.xml\",\"../SharedBlocks/employment/BlockJobInfoPart3.js\",\"../SharedBlocks/employment/BlockJobInfoPart3.view.xml\",\"../SharedBlocks/employment/EmploymentBlockJob.js\",\"../SharedBlocks/employment/EmploymentBlockJobCollapsed.view.xml\",\"../SharedBlocks/employment/EmploymentBlockJobExpanded.view.xml\",\"../SharedBlocks/goals/GoalsBlock.js\",\"../SharedBlocks/goals/GoalsBlock.view.xml\",\"../SharedBlocks/personal/BlockAdresses.js\",\"../SharedBlocks/personal/BlockAdresses.view.xml\",\"../SharedBlocks/personal/BlockMailing.js\",\"../SharedBlocks/personal/BlockMailing.view.xml\",\"../SharedBlocks/personal/BlockPhoneNumber.js\",\"../SharedBlocks/personal/BlockPhoneNumber.view.xml\",\"../SharedBlocks/personal/BlockSocial.js\",\"../SharedBlocks/personal/BlockSocial.view.xml\",\"../SharedBlocks/personal/PersonalBlockPart1.js\",\"../SharedBlocks/personal/PersonalBlockPart1.view.xml\",\"../SharedBlocks/personal/PersonalBlockPart2.js\",\"../SharedBlocks/personal/PersonalBlockPart2.view.xml\",\"style.css\",\"employee.json\"]}}}})});",
	"web/ui5/test-resources/sap/uxap/demokit/sample/ObjectPageDynamicSideContentBtn/ObjectPageDynamicSideContentBtn.controller.js": "sap.ui.define([\"sap/ui/model/json/JSONModel\",\"sap/ui/core/mvc/Controller\"],function(e,t){\"use strict\";var n,i,o;return t.extend(\"sap.uxap.sample.ObjectPageDynamicSideContentBtn.ObjectPageDynamicSideContentBtn\",{onInit:function(){var t=new e(\"./test-resources/sap/uxap/demokit/sample/ObjectPageDynamicSideContentBtn/employee.json\");this.getView().setModel(t,\"ObjectPageModel\"),i=this.getView().byId(\"DynamicSideContent\"),o=this.getView().byId(\"headerForTest\").getSideContentButton()},onAfterRendering:function(){n=i.getCurrentBreakpoint()},handleSideContentHide:function(){\"S\"===n?i.toggle():i.setShowSideContent(!1),o.setVisible(!0)},handleSCBtnPress:function(e){\"S\"===n?i.toggle():i.setShowSideContent(!0),o.setVisible(!1)},updateToggleButtonState:function(e){\"S\"!==(n=e.getParameter(\"currentBreakpoint\"))&&i.getShowSideContent()?o.setVisible(!1):o.setVisible(!0)}})});",
	"web/ui5/test-resources/sap/uxap/demokit/sample/ObjectPageDynamicSideContentBtn/ObjectPageDynamicSideContentBtn.view.xml": "<mvc:View\n\theight=\"100%\"\n\tcontrollerName=\"sap.uxap.sample.ObjectPageDynamicSideContentBtn.ObjectPageDynamicSideContentBtn\"\n\txmlns=\"sap.uxap\"\n\txmlns:l=\"sap.ui.layout\"\n\txmlns:mvc=\"sap.ui.core.mvc\"\n\txmlns:m=\"sap.m\"><l:DynamicSideContent\n\t\t\t\t\tid=\"DynamicSideContent\"\n\t\t\t\t\tclass=\"sapUiDSCExplored sapUiContentPadding\"\n\t\t\t\t\tsideContentFallDown=\"BelowM\"\n\t\t\t\t\tsideContentPosition=\"End\"\n\t\t\t\t\tcontainerQuery=\"true\"\n\t\t\t\t\tshowSideContent=\"false\"\n\t\t\t\t\tbreakpointChanged=\"updateToggleButtonState\"><l:mainContent><ObjectPageLayout id=\"ObjectPageLayout\" showTitleInHeaderContent=\"true\"><headerTitle><ObjectPageHeader id=\"headerForTest\"\n\t\t\t\t\t\t\t\t\t\t\t\t  headerDesign=\"Ligth\"\n\t\t\t\t\t\t\t\t\t\t\t\t  objectTitle=\"Denise Smith\"\n\t\t\t\t\t\t\t\t\t\t\t\t  showTitleSelector=\"true\"\n\t\t\t\t\t\t\t\t\t\t\t\t  showMarkers=\"true\"\n\t\t\t\t\t\t\t\t\t\t\t\t  markFavorite=\"true\"\n\t\t\t\t\t\t\t\t\t\t\t\t  markFlagged=\"true\"\n\t\t\t\t\t\t\t\t\t\t\t\t  objectSubtitle=\"Senior Developer\"\n\t\t\t\t\t\t\t\t\t\t\t\t  objectImageURI=\"test-resources/sap/uxap/images/imageID_273624.png\"\n\t\t\t\t\t\t\t\t\t\t\t\t  objectImageShape=\"Circle\"\n\t\t\t\t\t\t\t\t\t\t\t\t  isObjectIconAlwaysVisible=\"false\"\n\t\t\t\t\t\t\t\t\t\t\t\t  isObjectTitleAlwaysVisible=\"false\"\n\t\t\t\t\t\t\t\t\t\t\t\t  isObjectSubtitleAlwaysVisible=\"false\"\n\t\t\t\t\t\t\t\t\t\t\t\t  isActionAreaAlwaysVisible=\"true\"><sideContentButton><m:Button icon=\"sap-icon://detail-view\" type=\"Transparent\" press=\"handleSCBtnPress\"></m:Button></sideContentButton><actions><ObjectPageHeaderActionButton text=\"Public Profile\" iconFirst=\"true\" icon=\"sap-icon://edit\"/><ObjectPageHeaderActionButton text=\"Take Action\" iconFirst=\"true\" icon=\"sap-icon://action\"/></actions></ObjectPageHeader></headerTitle><headerContent><l:VerticalLayout><m:Link text=\"denise-smith\"/><m:Label text=\"(321) 123-4567\"/><m:Link text=\"DeniseSmith@sap.com\"/><l:HorizontalLayout><m:Image height=\"24px\" width=\"24px\"\n\t\t\t\t\t\t\t\t\t\t\t\t src=\"./test-resources/sap/uxap/images/twitterIcon.png\"/><m:Image height=\"24px\" width=\"24px\"\n\t\t\t\t\t\t\t\t\t\t\t\t src=\"./test-resources/sap/uxap/images/linkedInIcon.png\"/></l:HorizontalLayout></l:VerticalLayout><m:Text width=\"200px\"\n\t\t\t\t\t\t\t\t\t\ttext=\"Hi, I'm Denise. I am passionate about what I do and I'll go the extra mile to make the customer win.\"/><l:VerticalLayout><m:Label text=\"Profile completion\"/><m:ProgressIndicator\n\t\t\t\t\t\t\t\t\t\t\tpercentValue=\"30\"\n\t\t\t\t\t\t\t\t\t\t\tdisplayValue=\"30%\"\n\t\t\t\t\t\t\t\t\t\t\tshowValue=\"true\"\n\t\t\t\t\t\t\t\t\t\t\tstate=\"None\"/></l:VerticalLayout></headerContent><sections><ObjectPageSection title=\"2014 Goals Plan\"><subSections><ObjectPageSubSection title=\" \"><m:Text width=\"200px\"\n\t\t\t\t\t\t\t\t\t\ttext=\"Hi, I'm Denise. I am passionate about what I do and I'll go the extra mile to make the customer win.\"/></ObjectPageSubSection></subSections></ObjectPageSection><ObjectPageSection title=\"Personal\"><subSections><ObjectPageSubSection title=\"Connect\"><m:Text width=\"200px\"\n\t\t\t\t\t\t\t\t\t\ttext=\"Hi, I'm Denise. I am passionate about what I do and I'll go the extra mile to make the customer win.\"/></ObjectPageSubSection><ObjectPageSubSection id=\"paymentSubSection\" title=\"Payment information\"><blocks></blocks><moreBlocks></moreBlocks></ObjectPageSubSection></subSections></ObjectPageSection></sections></ObjectPageLayout></l:mainContent><l:sideContent><m:Toolbar><m:Title text=\"My tasks\"/><m:ToolbarSpacer /><m:Button text=\"Close\" type=\"Transparent\" press=\"handleSideContentHide\" /></m:Toolbar><m:Text text=\" Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\t\t\t\t\t\tDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\n\t\t\t\t\t\tExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\t\t\t\t\t\tLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n\t\t\t\t\t\tUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\t\t\t\t\t\tDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\"></m:Text></l:sideContent></l:DynamicSideContent></mvc:View>\n"
}, "web/ui5/test-resources/sap/uxap/demokit/sample/ObjectPageDynamicSideContentBtn/Component-preload");