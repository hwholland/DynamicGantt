sap.ui.require.preload({
	"web/ui5/test-resources/sap/ca/scfld/stableIds/app/Component.js": "// Copyright (C) 2015 SAP SE or an SAP affiliate company. All rights reserved\n!function(){\"use strict\";jQuery.sap.declare(\"sap.ca.scfld.stableids.app.Component\"),jQuery.sap.require(\"sap.ca.scfld.stableids.app.Configuration\"),jQuery.sap.require(\"sap.ca.scfld.md.ComponentBase\"),sap.ca.scfld.md.ComponentBase.extend(\"sap.ca.scfld.stableids.app.Component\",{metadata:sap.ca.scfld.md.ComponentBase.createMetaData(\"MD\",{name:\"Master Detail Sample\",version:\"1.0.0\",library:\"sap.ca.scfld.stableids.app\",includes:[],dependencies:{libs:[\"sap.m\",\"sap.me\"],components:[]},config:{resourceBundle:\"i18n/i18n.properties\",titleResource:\"shellTitle\",icon:\"sap-icon://Fiori2/F0002\"},viewPath:\"sap.ca.scfld.stableids.app.view\",masterPageRoutes:{master:{pattern:\"\",view:\"S2\",viewId:\"test_S2\"}},detailPageRoutes:{detail:{pattern:\"detail/{contextPath}\",view:\"S3\",viewId:\"test_S3\"},noData:{pattern:\"noData/{viewTitle}/{languageKey}\",viewPath:\"sap.ca.scfld.md.view\",view:\"empty\",viewId:\"test_Empty\"}},fullScreenPageRoutes:{subDetail:{pattern:\"subDetail/{contextPath}\",view:\"S4\",viewId:\"test_S4\"}}}),createContent:function(){var e={component:this};return sap.ui.view({viewName:\"sap.ca.scfld.stableids.app.Main\",id:\"sap.ca.scfld.stableids.app.Main\",type:sap.ui.core.mvc.ViewType.XML,viewData:e})}})}();",
	"web/ui5/test-resources/sap/ca/scfld/stableIds/app/Configuration.js": "// Copyright (C) 2015 SAP SE or an SAP affiliate company. All rights reserved\n!function(){\"use strict\";jQuery.sap.declare(\"sap.ca.scfld.stableids.app.Configuration\"),jQuery.sap.require(\"sap.ca.scfld.md.ConfigurationBase\"),jQuery.sap.require(\"sap.ca.scfld.md.app.Application\"),sap.ca.scfld.md.ConfigurationBase.extend(\"sap.ca.scfld.stableids.app.Configuration\",{oServiceParams:{serviceList:[{name:\"SRA004_SRV\",masterCollection:\"Travels\",serviceUrl:\"/sap/opu/odata/sap/SRA004_SRV/\",isDefault:!0,metadataParams:\"sap-documentation=heading,quickinfo&foo=bar=b%61z&%62az&\",mockedDataSource:\"./model/metadata.xml\",useV2ODataModel:\"true\"==jQuery.sap.getUriParameters().mParams.useV2ODataModel}]},getServiceParams:function(){return this.oServiceParams},getServiceList:function(){return this.getServiceParams().serviceList},getMasterKeyAttributes:function(){return[\"Id\"]},getExcludedQueryStringParameters:function(){return[]},keepMultiSelection:function(){return\"true\"==jQuery.sap.getUriParameters().mParams.keepMultiSelection},isUsingStableIds:function(){return\"true\"==jQuery.sap.getUriParameters().mParams.stableIDs}})}();",
	"web/ui5/test-resources/sap/ca/scfld/stableIds/app/Main.controller.js": "// Copyright (C) 2015 SAP SE or an SAP affiliate company. All rights reserved\n!function(){\"use strict\";sap.ui.controller(\"sap.ca.scfld.stableids.app.Main\",{onInit:function(){jQuery.sap.require(\"sap.ca.scfld.md.Startup\"),sap.ca.scfld.md.Startup.init(\"sap.ca.scfld.stableids.app\",this)}})}();",
	"web/ui5/test-resources/sap/ca/scfld/stableIds/app/view/HeaderFooterOptionsCreator.js": "// Copyright (C) 2015 SAP SE or an SAP affiliate company. All rights reserved\n!function(){\"use strict\";jQuery.sap.declare(\"sap.ca.scfld.stableids.app.view.HeaderFooterOptionsCreator\");var t=jQuery.sap.getUriParameters();function e(t){sap.m.MessageToast.show(t),jQuery.sap.log.info(t)}function s(e,s,i,o,n){var r=e+(o?\".\"+o+\".\"+n:\"\")+\".\"+s;return t.mParams[r]||i}function i(t,e,i,o,n){var r=s(t,e,i,o,n);return r&&r instanceof Array&&(r=r[0]),r||i}function o(e,s,i,o){var n=e+(i?\".\"+i+\".\"+o:\"\")+\".\"+s;return void 0!==t.mParams[n]}sap.ca.scfld.stableids.app.view.HeaderFooterOptionsCreator={createHeaderFooterOptions:function(t){var n,r,a,d,l,u,p,c=s(t,\"buttonlist\",\"0\");if(c>0)for((n={}).buttonList=[],l=0;l<c;l+=1)r=i(t,\"text\",\"Button\"+l,\"buttonlist\",l),n.buttonList[l]={sBtnTxt:r,onBtnPressed:e.bind(null,t+\": \"+r)},o(t,\"icon\",\"buttonlist\",l)&&(n.buttonList[l].sIcon=\"sap-icon://\"+i(t,\"icon\",\"competitor\",\"buttonlist\",l)),o(t,\"id\",\"buttonlist\",l)&&(n.buttonList[l].sId=i(t,\"id\",void 0,\"buttonlist\",l));if((c=s(t,\"sharebuttons\",\"0\"))>0)for((n=n||{}).additionalShareButtonList=[],l=0;l<c;l+=1)r=i(t,\"text\",\"Share \"+l,\"sharebuttons\",l),n.additionalShareButtonList[l]={sBtnTxt:r,onBtnPressed:e.bind(null,t+\": Share \"+r)},o(t,\"icon\",\"sharebuttons\",l)&&(n.additionalShareButtonList[l].sIcon=\"sap-icon://\"+i(t,\"icon\",\"basket\",\"sharebuttons\",l)),o(t,\"id\",\"sharebuttons\",l)&&(n.additionalShareButtonList[l].sId=i(t,\"id\",void 0,\"sharebuttons\",l));if((c=s(t,\"settingsbuttons\",\"0\"))>0)for((n=n||{}).aAdditionalSettingButtons=[],l=0;l<c;l+=1)r=i(t,\"text\",\"Settings \"+l,\"settingsbuttons\",l),n.aAdditionalSettingButtons[l]={sBtnTxt:r,onBtnPressed:e.bind(null,t+\": Settings \"+r)},o(t,\"icon\",\"settingsbuttons\",l)&&(n.aAdditionalSettingButtons[l].sIcon=\"sap-icon://\"+i(t,\"icon\",\"basket\",\"settingsbuttons\",l));if(o(t,\"positive\")&&(n=n||{},r=i(t,\"positive.text\",\"Accept\"),n.oPositiveAction={sBtnTxt:r,onBtnPressed:e.bind(null,t+\": Positive - \"+r)},(a=s(t,\"positive.id\",\"\"))&&(n.oPositiveAction.sId=a[0])),o(t,\"negative\")&&(n=n||{},r=i(t,\"negative.text\",\"Reject\"),n.oNegativeAction={sBtnTxt:r,onBtnPressed:e.bind(null,t+\": Negative - \"+r)},(a=s(t,\"negative.id\",\"\"))&&(n.oNegativeAction.sId=a[0])),o(t,\"edit\")&&(n=n||{},r=i(t,\"edit.text\",void 0),a=i(t,\"edit.id\",void 0),r||a||\"master\"!==t?n.oEditBtn={sBtnTxt:r||\"Edit\",sId:a,onBtnPressed:e.bind(null,t+\": Edit - \"+r)}:n.onEditPress=e.bind(null,t+\": Edit\")),o(t,\"filter\")){if((n=n||{}).oFilterOptions={onFilterPressed:e.bind(null,t+\": Filter Pressed\")},(d=s(t,\"filter.items\",\"\"))&&(d=d[0].split(\",\")),d.length>0&&d[0])for(n.oFilterOptions.aFilterItems=[],n.oFilterOptions.onFilterSelected=e.bind(null,t+\": Filter Selected\"),l=0;l<d.length;l+=1)p=d[l].split(\":\"),n.oFilterOptions.aFilterItems.push({text:p[0],id:p[1],key:\"key \"+l});(a=s(t,\"filter.id\",\"\"))&&(n.oFilterOptions.sId=a[0])}if(o(t,\"sort\")){if((n=n||{}).oSortOptions={onSortPressed:e.bind(null,t+\": Sort Pressed\")},(d=s(t,\"sort.items\",\"\"))&&(d=d[0].split(\",\")),d.length>0&&d[0])for(n.oSortOptions.aSortItems=[],n.oSortOptions.onSortSelected=e.bind(null,t+\": Sort Selected\"),l=0;l<d.length;l+=1)p=d[l].split(\":\"),n.oSortOptions.aSortItems.push({text:p[0],id:p[1],key:\"key \"+l});(a=s(t,\"sort.id\",\"\"))&&(n.oSortOptions.sId=a[0])}if(o(t,\"group\")){if((n=n||{}).oGroupOptions={onGroupPressed:e.bind(null,t+\": Group Pressed\")},(d=s(t,\"group.items\",\"\"))&&(d=d[0].split(\",\")),d.length>0&&d[0])for(n.oGroupOptions.aGroupItems=[],n.oGroupOptions.onGroupSelected=e.bind(null,t+\": Group Selected\"),l=0;l<d.length;l+=1)p=d[l].split(\":\"),n.oGroupOptions.aGroupItems.push({text:p[0],id:p[1],key:\"key \"+l});(a=s(t,\"group.id\",\"\"))&&(n.oGroupOptions.sId=a[0])}if(\"master\"===t&&o(t,\"add\")&&((n=n||{}).onAddPress=e.bind(null,t+\": Add\"),(a=s(t,\"add.id\",\"\"))&&(n.oAddOptions={sId:a[0],onBtnPressed:n.onAddPress},delete n.onAddPress)),\"master\"!==t&&o(t,\"email\")&&((n=n||{}).oEmailSettings={sSubject:\"Email Subject\",sRecepient:\"do.not.reply@sap.com\",fGetMailBody:function(){return\"This is a very important mail for you\"}}),\"master\"!==t&&o(t,\"jamshare\")&&((n=n||{}).oJamOptions=n.oJamOptions||{},n.oJamOptions.oShareSettings={foo:\"bar\"}),\"master\"!==t&&o(t,\"jamdiscuss\")&&((n=n||{}).oJamOptions=n.oJamOptions||{},n.oJamOptions.oDiscussSettings={foo:\"bar\"}),o(t,\"suppressbookmark\")&&((n=n||{}).bSuppressBookmarkButton=!0),o(t,\"title\"))switch(n=n||{},u=s(t,\"title\",\"DEFAULT TITLE\")[0],t){case\"detail\":n.sDetailTitle=u;break;case\"fullscreen\":n.sFullscreenTitle=u;break;case\"master\":n.sI18NMasterTitle=u}if(o(t,\"titleId\"))switch(n=n||{},u=s(t,\"titleId\")[0],t){case\"detail\":n.sDetailTitleId=u;break;case\"fullscreen\":n.sFullscreenTitleId=u;break;case\"master\":n.sMasterTitleId=u}return n}}}();",
	"web/ui5/test-resources/sap/ca/scfld/stableIds/app/view/S2.controller.js": "// Copyright (C) 2015 SAP SE or an SAP affiliate company. All rights reserved\n!function(){\"use strict\";jQuery.sap.require(\"sap.ca.scfld.md.controller.ScfldMasterController\"),jQuery.sap.require(\"sap.ca.scfld.stableids.app.view.HeaderFooterOptionsCreator\"),sap.ca.scfld.md.controller.ScfldMasterController.extend(\"sap.ca.scfld.stableids.app.view.S2\",{onInit:function(){},getHeaderFooterOptions:function(){return sap.ca.scfld.stableids.app.view.HeaderFooterOptionsCreator.createHeaderFooterOptions(\"master\")||{}}})}();",
	"web/ui5/test-resources/sap/ca/scfld/stableIds/app/view/S3.controller.js": "// Copyright (C) 2015 SAP SE or an SAP affiliate company. All rights reserved\n!function(){\"use strict\";jQuery.sap.require(\"sap.ca.scfld.md.controller.BaseDetailController\"),jQuery.sap.require(\"sap.ca.scfld.stableids.app.view.HeaderFooterOptionsCreator\"),sap.ca.scfld.md.controller.BaseDetailController.extend(\"sap.ca.scfld.stableids.app.view.S3\",{onInit:function(){var e=this.getView();this.oRouter.attachRouteMatched(function(t){if(\"detail\"===t.getParameter(\"name\")){var o=new sap.ui.model.Context(e.getModel(),\"/\"+t.getParameter(\"arguments\").contextPath);e.setBindingContext(o)}},this),this.oHeaderFooterOptions=sap.ca.scfld.stableids.app.view.HeaderFooterOptionsCreator.createHeaderFooterOptions(\"detail\")||{},this.setHeaderFooterOptions(this.oHeaderFooterOptions)},isMainScreen:function(){return!0},navToSubview:function(){this.oRouter.navTo(\"subDetail\",{contextPath:this.getView().getBindingContext().getPath().substr(1)})},navToEmpty:function(){this.oRouter.navTo(\"noData\",{viewTitle:\"CUSTOM_TITLE\",languageKey:\"NO_ITEMS_AVAILABLE\"})},refreshList:function(){this.oConnectionManager.getModel().refresh()}})}();",
	"web/ui5/test-resources/sap/ca/scfld/stableIds/app/view/S4.controller.js": "// Copyright (C) 2015 SAP SE or an SAP affiliate company. All rights reserved\n!function(){\"use strict\";jQuery.sap.require(\"sap.ca.scfld.md.controller.BaseFullscreenController\"),jQuery.sap.require(\"sap.ca.scfld.stableids.app.view.HeaderFooterOptionsCreator\"),sap.ca.scfld.md.controller.BaseFullscreenController.extend(\"sap.ca.scfld.stableids.app.view.S4\",{onInit:function(){var e=this.getView();this.oRouter.attachRouteMatched(function(t){if(\"subDetail\"===t.getParameter(\"name\")){var r=new sap.ui.model.Context(e.getModel(),\"/\"+t.getParameter(\"arguments\").contextPath);e.setBindingContext(r)}},this),this.oHeaderFooterOptions=sap.ca.scfld.stableids.app.view.HeaderFooterOptionsCreator.createHeaderFooterOptions(\"fullscreen\")||{},this.setHeaderFooterOptions(this.oHeaderFooterOptions)},navBack:function(){window.history.back()},isMainScreen:function(){var e=!0,t=jQuery.sap.getUriParameters().mParams;return void 0!==t[\"fullscreen.isMainScreen\"]&&(e=\"false\"!=t[\"fullscreen.isMainScreen\"][0]),e}})}();",
	"web/ui5/test-resources/sap/ca/scfld/stableIds/app/Main.view.xml": "<core:View xmlns:core=\"sap.ui.core\"\n\txmlns=\"sap.m\" controllerName=\"sap.ca.scfld.stableids.app.Main\" displayBlock=\"true\"\n\theight=\"100%\"><NavContainer id=\"fioriContent\"></NavContainer></core:View>",
	"web/ui5/test-resources/sap/ca/scfld/stableIds/app/view/S2.view.xml": "\n<core:View xmlns:core=\"sap.ui.core\" xmlns:mvc=\"sap.ui.core.mvc\"\n\txmlns=\"sap.m\" controllerName=\"sap.ca.scfld.stableids.app.view.S2\"\n\txmlns:html=\"http://www.w3.org/1999/xhtml\"><Page id=\"page\"><content><List id=\"list\" items=\"{/Travels}\" mode=\"{device>/listMode}\"><ObjectListItem id=\"MAIN_LIST_ITEM\"\n\t\t\t\t\ttype=\"{device>/listItemType}\"\n\t\t\t\t\tpress=\"_handleItemPress\"\n\t\t\t\t\ttitle=\"{TripActivityName}\"\n\t\t\t\t\tnumber=\"{EstimatedCost/Value}\"\n\t\t\t\t\tnumberUnit=\"{EstimatedCost/Currency}\"><attributes><ObjectAttribute text=\"{Purpose}\" /><ObjectAttribute text=\"{Status}\" /></attributes></ObjectListItem></List></content></Page></core:View>\n",
	"web/ui5/test-resources/sap/ca/scfld/stableIds/app/view/S3.view.xml": "\n<core:View xmlns:core=\"sap.ui.core\"\n\txmlns=\"sap.m\" controllerName=\"sap.ca.scfld.stableids.app.view.S3\"><Page><content><ObjectHeader title=\"{TripActivityName}\"></ObjectHeader><Button text=\"Fullscreen subview\" press=\"navToSubview\"></Button><Button text=\"Go to empty view\" press=\"navToEmpty\"></Button><Button text=\"Refresh List\" press=\"refreshList\"></Button></content></Page></core:View>\n",
	"web/ui5/test-resources/sap/ca/scfld/stableIds/app/view/S4.view.xml": "\n<core:View xmlns:core=\"sap.ui.core\"\n\txmlns=\"sap.m\" controllerName=\"sap.ca.scfld.stableids.app.view.S4\"><Page showNavButton=\"true\" navButtonPress=\"navBack\"><content><Label text=\"S4 View\" /></content><footer><Bar></Bar></footer></Page></core:View>\n",
	"web/ui5/test-resources/sap/ca/scfld/stableIds/app/i18n/i18n.properties": "# Copyright (C) 2015 SAP SE or an SAP affiliate company. All rights reserved\n\n#XTIT: this is the title for the master section\nMASTER_TITLE=Master Title ({0})\n\n#XTIT: this is the title for the detail section\nDETAIL_TITLE=Detail Title\n\n#XTIT: this is the title for the fullscreen section\nFULLSCREEN_TITLE=Fullscreen Title\n\n#XTIT: this is the title for the empty view\nCUSTOM_TITLE=Application Specific Title\n\n#XFLD\nEMAIL_SUBJECT=This information may be important for you\n\n#XFLD\nNO_ITEMS_AVAILABLE=No data available (overwritten)\n"
}, "web/ui5/test-resources/sap/ca/scfld/stableIds/app/Component-preload");