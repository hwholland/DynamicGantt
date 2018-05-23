sap.ui.require.preload({
	"web/ui5/test-resources/sap/uxap/demokit/sample/ObjectPageTabNavigationMode/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.uxap.sample.ObjectPageTabNavigationMode.Component\",{metadata:{rootView:\"sap.uxap.sample.ObjectPageTabNavigationMode.ObjectPageTabNavigationMode\",dependencies:{libs:[\"sap.m\"]},config:{sample:{stretch:!0,files:[\"ObjectPageTabNavigationMode.view.xml\",\"ObjectPageTabNavigationMode.controller.js\",\"../SharedBlocks/employment/BlockEmpDetailPart1.js\",\"../SharedBlocks/employment/BlockEmpDetailPart1.view.xml\",\"../SharedBlocks/employment/BlockEmpDetailPart2.js\",\"../SharedBlocks/employment/BlockEmpDetailPart2.view.xml\",\"../SharedBlocks/employment/BlockEmpDetailPart3.js\",\"../SharedBlocks/employment/BlockEmpDetailPart3.view.xml\",\"../SharedBlocks/employment/BlockJobInfoPart1.js\",\"../SharedBlocks/employment/BlockJobInfoPart1.view.xml\",\"../SharedBlocks/employment/BlockJobInfoPart2.js\",\"../SharedBlocks/employment/BlockJobInfoPart2.view.xml\",\"../SharedBlocks/employment/BlockJobInfoPart3.js\",\"../SharedBlocks/employment/BlockJobInfoPart3.view.xml\",\"../SharedBlocks/employment/EmploymentBlockJob.js\",\"../SharedBlocks/employment/EmploymentBlockJobCollapsed.view.xml\",\"../SharedBlocks/employment/EmploymentBlockJobExpanded.view.xml\",\"../SharedBlocks/goals/GoalsBlock.js\",\"../SharedBlocks/goals/GoalsBlock.view.xml\",\"../SharedBlocks/connections/ConnectionsBlock.js\",\"../SharedBlocks/connections/ConnectionsBlock.view.xml\",\"../SharedBlocks/personal/BlockAdresses.js\",\"../SharedBlocks/personal/BlockAdresses.view.xml\",\"../SharedBlocks/personal/BlockMailing.js\",\"../SharedBlocks/personal/BlockMailing.view.xml\",\"../SharedBlocks/personal/BlockPhoneNumber.js\",\"../SharedBlocks/personal/BlockPhoneNumber.view.xml\",\"../SharedBlocks/personal/BlockSocial.js\",\"../SharedBlocks/personal/BlockSocial.view.xml\",\"../SharedBlocks/personal/PersonalBlockPart1.js\",\"../SharedBlocks/personal/PersonalBlockPart1.view.xml\",\"../SharedBlocks/personal/PersonalBlockPart2.js\",\"../SharedBlocks/personal/PersonalBlockPart2.view.xml\",\"HRData.json\"]}}}})});",
	"web/ui5/test-resources/sap/uxap/demokit/sample/ObjectPageTabNavigationMode/ObjectPageTabNavigationMode.controller.js": "sap.ui.define([\"sap/ui/model/json/JSONModel\",\"sap/ui/core/mvc/Controller\",\"sap/ui/Device\",\"sap/m/SplitContainer\"],function(e,t,o,i){\"use strict\";return t.extend(\"sap.uxap.sample.ObjectPageTabNavigationMode.ObjectPageTabNavigationMode\",{onInit:function(){o.system.desktop&&(this._oSplitContainer=sap.ui.getCore().byId(\"splitApp\"),this._oSplitContainer&&(this._oSplitContainer.backToPage=jQuery.proxy(function(){this.setMode(\"ShowHideMode\"),this.showMaster(),i.prototype.backToPage.apply(this,arguments)},this._oSplitContainer)));var e=new sap.ui.model.json.JSONModel(\"./test-resources/sap/uxap/demokit/sample/ObjectPageTabNavigationMode/HRData.json\");this.getView().setModel(e,\"ObjectPageModel\")},onBeforeRendering:function(){o.system.desktop&&this._oSplitContainer&&(this._oSplitContainer.setMode(\"HideMode\"),this._oSplitContainer.hideMaster())}})},!0);",
	"web/ui5/test-resources/sap/uxap/demokit/sample/ObjectPageTabNavigationMode/ObjectPageTabNavigationMode.view.xml": "<core:View xmlns:core=\"sap.ui.core\"\n\t\t   xmlns=\"sap.uxap\"\n\t\t   xmlns:layout=\"sap.ui.layout\"\n\t\t   xmlns:m=\"sap.m\"\n\t\t   xmlns:sample=\"sap.uxap.sample.SharedBlocks\"\n\t\t   xmlns:goals=\"sap.uxap.sample.SharedBlocks.goals\"\n\t\t   xmlns:personal=\"sap.uxap.sample.SharedBlocks.personal\"\n\t\t   xmlns:employment=\"sap.uxap.sample.SharedBlocks.employment\"\n\t\t   xmlns:connections=\"sap.uxap.sample.SharedBlocks.connections\"\n\t\t   controllerName=\"sap.uxap.sample.ObjectPageTabNavigationMode.ObjectPageTabNavigationMode\"\n\t\t   height=\"100%\"><ObjectPageLayout id=\"ObjectPageLayout\" enableLazyLoading=\"true\" useIconTabBar=\"true\" showTitleInHeaderContent=\"true\"><headerTitle><ObjectPageHeader objectImageURI=\"./test-resources/sap/uxap/images/imageID_275314.png\"\n\t\t\t\t\t\t\t  objectTitle=\"Denise Smith\"\n\t\t\t\t\t\t\t  objectImageShape=\"Circle\"\n\t\t\t\t\t\t\t  objectSubtitle=\"Senior UI Developer\"><actions><ObjectPageHeaderActionButton icon=\"sap-icon://pull-down\" text=\"show section\" type=\"Emphasized\"/><ObjectPageHeaderActionButton icon=\"sap-icon://show\" text=\"show state\" type=\"Emphasized\"/></actions></ObjectPageHeader></headerTitle><headerContent><layout:VerticalLayout><m:Link text=\"+33 6 4512 5158\"/><m:Link text=\"DeniseSmith@sap.com\"/></layout:VerticalLayout><layout:HorizontalLayout><m:Image src=\"./test-resources/sap/uxap/images/linkedin.png\"></m:Image><m:Image src=\"./test-resources/sap/uxap/images/Twitter.png\"></m:Image></layout:HorizontalLayout><layout:VerticalLayout><m:Label text=\"Hello! I am Tim and I use UxAP\"/><m:VBox height=\"63px\"><m:Label text=\"Achieved goals\"/><m:ProgressIndicator\n\t\t\t\t\t\t\tpercentValue=\"30\"\n\t\t\t\t\t\t\tdisplayValue=\"30%\"\n\t\t\t\t\t\t\tshowValue=\"true\"\n\t\t\t\t\t\t\tstate=\"None\"/></m:VBox></layout:VerticalLayout><layout:VerticalLayout><m:Label text=\"San Jose, USA\"/></layout:VerticalLayout></headerContent><sections><ObjectPageSection id=\"goals\" title=\"2014 Goals Plan\"><subSections><ObjectPageSubSection id=\"goalsSS1\" title=\"\"><blocks><goals:GoalsBlock id=\"goalsblock\"/></blocks></ObjectPageSubSection></subSections></ObjectPageSection><ObjectPageSection id=\"personal\" title=\"Personal\"><subSections><ObjectPageSubSection id=\"personalSS1\" title=\"Connect\"><blocks><personal:BlockPhoneNumber id=\"phone\"/><personal:BlockSocial id=\"social\"/><personal:BlockAdresses id=\"adresses\"/><personal:BlockMailing id=\"mailing\" columnLayout=\"1\"/></blocks></ObjectPageSubSection><ObjectPageSubSection id=\"personalSS2\" title=\"Payment information\"><blocks><personal:PersonalBlockPart1 id=\"part1\" columnLayout=\"1\"/></blocks><moreBlocks><personal:PersonalBlockPart2 id=\"part2\" columnLayout=\"1\"/></moreBlocks></ObjectPageSubSection></subSections></ObjectPageSection><ObjectPageSection id=\"employment\" title=\"Employment\"><subSections><ObjectPageSubSection id=\"employmentSS1\" title=\"Job information\"><blocks><employment:BlockJobInfoPart1 id=\"jobinfopart1\"/><employment:BlockJobInfoPart2 id=\"jobinfopart2\"/><employment:BlockJobInfoPart3 id=\"jobinfopart3\"/></blocks></ObjectPageSubSection><ObjectPageSubSection id=\"employmentSS2\" title=\"Employee Details\" mode=\"Collapsed\"><blocks><employment:BlockEmpDetailPart1 id=\"empdetailpart1\" columnLayout=\"1\"/></blocks><moreBlocks><employment:BlockEmpDetailPart2 id=\"empdetailpart2\" columnLayout=\"1\"/><employment:BlockEmpDetailPart3 id=\"empdetailpart3\" columnLayout=\"1\"/></moreBlocks></ObjectPageSubSection><ObjectPageSubSection id=\"employmentSS3\" title=\"Job Relationship\" mode=\"Collapsed\"><blocks><employment:EmploymentBlockJob id=\"employmentblockjob\" showSubSectionMore=\"true\"><employment:mappings><ModelMapping externalModelName=\"ObjectPageModel\" internalModelName=\"emp1\"\n\t\t\t\t\t\t\t\t\t\t\t\t  externalPath=\"/Employee/0\"/><ModelMapping externalModelName=\"ObjectPageModel\" internalModelName=\"emp2\"\n\t\t\t\t\t\t\t\t\t\t\t\t  externalPath=\"/Employee/1\"/><ModelMapping externalModelName=\"ObjectPageModel\" internalModelName=\"emp3\"\n\t\t\t\t\t\t\t\t\t\t\t\t  externalPath=\"/Employee/2\"/><ModelMapping externalModelName=\"ObjectPageModel\" internalModelName=\"emp4\"\n\t\t\t\t\t\t\t\t\t\t\t\t  externalPath=\"/Employee/3\"/><ModelMapping externalModelName=\"ObjectPageModel\" internalModelName=\"emp5\"\n\t\t\t\t\t\t\t\t\t\t\t\t  externalPath=\"/Employee/4\"/><ModelMapping externalModelName=\"ObjectPageModel\" internalModelName=\"emp6\"\n\t\t\t\t\t\t\t\t\t\t\t\t  externalPath=\"/Employee/5\"/></employment:mappings></employment:EmploymentBlockJob></blocks></ObjectPageSubSection></subSections></ObjectPageSection><ObjectPageSection id=\"connections\" title=\"Connections\"><subSections><ObjectPageSubSection id=\"connectionsSS1\" title=\"\"><blocks><connections:ConnectionsBlock id=\"connectionsblock\"><connections:mappings><ModelMapping externalModelName=\"ObjectPageModel\" internalModelName=\"emp1\"\n\t\t\t\t\t\t\t\t\t\t\t\t  externalPath=\"/Employee/0\"/><ModelMapping externalModelName=\"ObjectPageModel\" internalModelName=\"emp2\"\n\t\t\t\t\t\t\t\t\t\t\t\t  externalPath=\"/Employee/1\"/><ModelMapping externalModelName=\"ObjectPageModel\" internalModelName=\"emp3\"\n\t\t\t\t\t\t\t\t\t\t\t\t  externalPath=\"/Employee/2\"/><ModelMapping externalModelName=\"ObjectPageModel\" internalModelName=\"emp4\"\n\t\t\t\t\t\t\t\t\t\t\t\t  externalPath=\"/Employee/3\"/><ModelMapping externalModelName=\"ObjectPageModel\" internalModelName=\"emp5\"\n\t\t\t\t\t\t\t\t\t\t\t\t  externalPath=\"/Employee/4\"/><ModelMapping externalModelName=\"ObjectPageModel\" internalModelName=\"emp6\"\n\t\t\t\t\t\t\t\t\t\t\t\t  externalPath=\"/Employee/5\"/></connections:mappings></connections:ConnectionsBlock></blocks></ObjectPageSubSection></subSections></ObjectPageSection></sections></ObjectPageLayout></core:View>\n"
}, "web/ui5/test-resources/sap/uxap/demokit/sample/ObjectPageTabNavigationMode/Component-preload");