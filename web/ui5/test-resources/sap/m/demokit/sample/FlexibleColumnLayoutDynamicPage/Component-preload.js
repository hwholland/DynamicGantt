sap.ui.require.preload({
	"web/ui5/test-resources/sap/m/demokit/sample/FlexibleColumnLayoutDynamicPage/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\",\"sap/m/routing/Router\"],function(e,l){\"use strict\";return e.extend(\"sap.m.sample.FlexibleColumnLayoutDynamicPage.Component\",{metadata:{rootView:\"sap.m.sample.FlexibleColumnLayoutDynamicPage.FlexibleColumnLayout\",dependencies:{libs:[\"sap.m\"]},config:{sample:{stretch:!0,files:[\"Component.js\",\"FlexibleColumnLayout.controller.js\",\"FlexibleColumnLayout.view.xml\",\"Master.controller.js\",\"MasterDP.view.xml\",\"Detail.controller.js\",\"DetailDP.view.xml\",\"DetailDetail.controller.js\",\"DetailDetailDP.view.xml\"]}}}})},!0);",
	"web/ui5/test-resources/sap/m/demokit/sample/FlexibleColumnLayoutDynamicPage/Detail.controller.js": "sap.ui.define([\"sap/ui/core/mvc/Controller\",\"sap/m/MessageToast\"],function(e,t){\"use strict\";return e.extend(\"sap.m.sample.FlexibleColumnLayoutDynamicPage.Detail\",{onInit:function(){this.bus=sap.ui.getCore().getEventBus()},handleDetailPress:function(){t.show(\"Loading end column...\"),this.bus.publish(\"flexible\",\"setDetailDetailPage\")},deleteContentPressHandler:function(){this.getView().byId(\"detailPage\").setContent(null),t.show(\"Page content deleted\")}})},!0);",
	"web/ui5/test-resources/sap/m/demokit/sample/FlexibleColumnLayoutDynamicPage/DetailDetail.controller.js": "sap.ui.define([\"sap/ui/model/json/JSONModel\",\"sap/ui/core/mvc/Controller\",\"sap/m/MessageToast\"],function(e,t,n){\"use strict\";return t.extend(\"sap.m.sample.FlexibleColumnLayoutDynamicPage.DetailDetail\",{onInit:function(){this.bus=sap.ui.getCore().getEventBus()},handleDetailDetailPress:function(){n.show(\"No more columns to load\")},deleteContentPressHandler:function(){this.getView().byId(\"detailDetailPage\").setContent(null),n.show(\"Page content deleted\")}})},!0);",
	"web/ui5/test-resources/sap/m/demokit/sample/FlexibleColumnLayoutDynamicPage/FlexibleColumnLayout.controller.js": "sap.ui.define([\"sap/m/SplitContainer\",\"sap/ui/Device\",\"sap/ui/core/mvc/Controller\"],function(e,t,i){\"use strict\";return i.extend(\"sap.m.sample.FlexibleColumnLayoutDynamicPage.FlexibleColumnLayout\",{onInit:function(){this.bus=sap.ui.getCore().getEventBus(),this.bus.subscribe(\"flexible\",\"setDetailPage\",this.setDetailPage,this),this.bus.subscribe(\"flexible\",\"setDetailDetailPage\",this.setDetailDetailPage,this),this.oFlexibleColumnLayout=this.getView().byId(\"fcl\")},onExit:function(){this.bus.unsubscribe(\"flexible\",\"setDetailPage\",this.setDetailPage,this),this.bus.unsubscribe(\"flexible\",\"setDetailDetailPage\",this.setDetailDetailPage,this)},setDetailPage:function(){this.detailView||(this.detailView=sap.ui.view({id:\"midViewDP\",viewName:\"sap.m.sample.FlexibleColumnLayoutDynamicPage.DetailDP\",type:\"XML\"})),this.oFlexibleColumnLayout.setMidColumn(this.detailView),this.oFlexibleColumnLayout.setEndColumn(null)},setDetailDetailPage:function(){this.detailDetailView||(this.detailDetailView=sap.ui.view({id:\"endViewDP\",viewName:\"sap.m.sample.FlexibleColumnLayoutDynamicPage.DetailDetailDP\",type:\"XML\"})),this.oFlexibleColumnLayout.setEndColumn(this.detailDetailView)},handleLayoutChange:function(e){var t=e.getParameter(\"beginColumnWidth\")+\"/\"+e.getParameter(\"midColumnWidth\")+\"/\"+e.getParameter(\"endColumnWidth\");\"67/33/0\"!==t&&\"33/67/0\"!==t||this.handleFullScreenButton(\"mid\",!0),\"25/50/25\"!==t&&\"25/25/50\"!==t&&\"0/67/33\"!==t||(this.handleFullScreenButton(\"mid\",!1),this.handleFullScreenButton(\"end\",!0))},getPage:function(e){return\"begin\"===e?this.byId(\"beginView\").byId(\"masterPage\"):\"mid\"===e?this.detailView?this.detailView.byId(\"detailPage\"):void 0:\"end\"===e&&this.detailDetailView?this.detailDetailView.byId(\"detailDetailPage\"):void 0},handleFullScreenButton:function(e,t){var i=this.getPage(e);i&&(i._fsButton||(i._fsButton=new sap.m.OverflowToolbarButton({icon:sap.ui.core.IconPool.getIconURI(\"full-screen\"),layoutData:new sap.m.OverflowToolbarLayoutData({priority:sap.m.OverflowToolbarPriority.NeverOverflow})}),i._fsButton.attachPress(this.handleFullScreenButtonPress.bind(this,e,i._fsButton))),t&&-1===i.getTitle().indexOfAction(i._fsButton)?i.getTitle().addAction(i._fsButton):t||-1===i.getTitle().indexOfAction(i._fsButton)||i.getTitle().removeAction(i._fsButton))},handleFullScreenButtonPress:function(e,t){var i;i=this.oFlexibleColumnLayout.getFullScreenColumn()?null:e+\"View\",this.oFlexibleColumnLayout.setFullScreenColumn(i),t.setIcon(\"sap-icon://full-screen\"===t.getIcon()?\"sap-icon://exit-full-screen\":\"sap-icon://full-screen\")}})},!0);",
	"web/ui5/test-resources/sap/m/demokit/sample/FlexibleColumnLayoutDynamicPage/Master.controller.js": "sap.ui.define([\"sap/ui/core/mvc/Controller\",\"sap/m/MessageToast\"],function(e,t){\"use strict\";return e.extend(\"sap.m.sample.FlexibleColumnLayoutDynamicPage.Master\",{onInit:function(){this.bus=sap.ui.getCore().getEventBus()},handleMasterPress:function(){t.show(\"Loading mid column...\"),this.bus.publish(\"flexible\",\"setDetailPage\")},deleteContentPressHandler:function(){this.getView().byId(\"masterPage\").setContent(null),t.show(\"Page content deleted\")}})},!0);",
	"web/ui5/test-resources/sap/m/demokit/sample/FlexibleColumnLayoutDynamicPage/DetailDP.view.xml": "<View xmlns=\"sap.m\" xmlns:l=\"sap.ui.layout\" displayBlock=\"true\" controllerName=\"sap.m.sample.FlexibleColumnLayoutDynamicPage.Detail\"\n      height=\"100%\"><DynamicPage id=\"detailPage\"><title><DynamicPageTitle><heading><Label text=\"Filtered 1042 items based on 'unknown' criteria\"></Label></heading><snappedContent><MessageStrip text=\"Filtered by name\"></MessageStrip><MessageStrip text=\"Filtered by location\"></MessageStrip><MessageStrip text=\"Filtered by status\"></MessageStrip><MessageStrip text=\"Filtered by type\"></MessageStrip></snappedContent><expandedContent><SearchField value=\"Filter items...\"></SearchField></expandedContent><actions><Button text=\"Chart\" icon=\"sap-icon://bar-chart\"/><OverflowToolbarButton text=\"Add\" icon=\"sap-icon://add\"/><OverflowToolbarButton text=\"Edit\" icon=\"sap-icon://edit\"/><OverflowToolbarButton text=\"Delete\" icon=\"sap-icon://delete\" press=\"deleteContentPressHandler\"/></actions></DynamicPageTitle></title><header><DynamicPageHeader><content><l:VerticalLayout><l:HorizontalLayout><Label text=\"type\"/><Label text=\"Payment\"/></l:HorizontalLayout><l:HorizontalLayout><Label text=\"category\"/><Label text=\"Debit\"/></l:HorizontalLayout><l:HorizontalLayout><Label text=\"date of expire\"/><Label text=\"16.02.2016\"/></l:HorizontalLayout></l:VerticalLayout><l:VerticalLayout><l:HorizontalLayout><Label text=\"type\"/><Label text=\"Payment\"/></l:HorizontalLayout><l:HorizontalLayout><Label text=\"category\"/><Label text=\"Debit\"/></l:HorizontalLayout><l:HorizontalLayout><Label text=\"date of expire\"/><Label text=\"16.02.2016\"/></l:HorizontalLayout></l:VerticalLayout><l:VerticalLayout><l:HorizontalLayout><Label text=\"type\"/><Label text=\"Payment\"/></l:HorizontalLayout><l:HorizontalLayout><Label text=\"category\"/><Label text=\"Debit\"/></l:HorizontalLayout><l:HorizontalLayout><Label text=\"date of expire\"/><Label text=\"16.02.2016\"/></l:HorizontalLayout></l:VerticalLayout></content></DynamicPageHeader></header><content><l:VerticalLayout width=\"100%\"><Table><columns><Column><Title text=\"Detail List\"/></Column></columns><items><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleDetailPress\"><cells><Text text=\"Mid column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleDetailPress\"><cells><Text text=\"Mid column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleDetailPress\"><cells><Text text=\"Mid column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleDetailPress\"><cells><Text text=\"Mid column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleDetailPress\"><cells><Text text=\"Mid column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleDetailPress\"><cells><Text text=\"Mid column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleDetailPress\"><cells><Text text=\"Mid column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleDetailPress\"><cells><Text text=\"Mid column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleDetailPress\"><cells><Text text=\"Mid column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleDetailPress\"><cells><Text text=\"Mid column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleDetailPress\"><cells><Text text=\"Mid column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleDetailPress\"><cells><Text text=\"Mid column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleDetailPress\"><cells><Text text=\"Mid column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleDetailPress\"><cells><Text text=\"Mid column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleDetailPress\"><cells><Text text=\"Mid column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleDetailPress\"><cells><Text text=\"Mid column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleDetailPress\"><cells><Text text=\"Mid column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleDetailPress\"><cells><Text text=\"Mid column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleDetailPress\"><cells><Text text=\"Mid column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleDetailPress\"><cells><Text text=\"Mid column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleDetailPress\"><cells><Text text=\"Mid column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleDetailPress\"><cells><Text text=\"Mid column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleDetailPress\"><cells><Text text=\"Mid column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleDetailPress\"><cells><Text text=\"Mid column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleDetailPress\"><cells><Text text=\"Mid column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleDetailPress\"><cells><Text text=\"Mid column LAST\"/></cells></ColumnListItem></items></Table></l:VerticalLayout></content><footer><OverflowToolbar><ToolbarSpacer/><Button type=\"Accept\" text=\"Accept\"/><Button type=\"Reject\" text=\"Reject\"/></OverflowToolbar></footer></DynamicPage></View>",
	"web/ui5/test-resources/sap/m/demokit/sample/FlexibleColumnLayoutDynamicPage/DetailDetailDP.view.xml": "<View xmlns=\"sap.m\" xmlns:l=\"sap.ui.layout\" displayBlock=\"true\" controllerName=\"sap.m.sample.FlexibleColumnLayoutDynamicPage.DetailDetail\"\n      height=\"100%\"><DynamicPage id=\"detailDetailPage\"><title><DynamicPageTitle><heading><Label text=\"Filtered 1042 items based on 'unknown' criteria\"></Label></heading><snappedContent><MessageStrip text=\"Filtered by name\"></MessageStrip><MessageStrip text=\"Filtered by location\"></MessageStrip><MessageStrip text=\"Filtered by status\"></MessageStrip><MessageStrip text=\"Filtered by type\"></MessageStrip></snappedContent><expandedContent><SearchField value=\"Filter items...\"></SearchField></expandedContent><actions><Button text=\"Chart\" icon=\"sap-icon://bar-chart\"/><OverflowToolbarButton text=\"Add\" icon=\"sap-icon://add\"/><OverflowToolbarButton text=\"Edit\" icon=\"sap-icon://edit\"/><OverflowToolbarButton text=\"Delete\" icon=\"sap-icon://delete\" press=\"deleteContentPressHandler\"/></actions></DynamicPageTitle></title><header><DynamicPageHeader><content><l:VerticalLayout><l:HorizontalLayout><Label text=\"type\"/><Label text=\"Payment\"/></l:HorizontalLayout><l:HorizontalLayout><Label text=\"category\"/><Label text=\"Debit\"/></l:HorizontalLayout><l:HorizontalLayout><Label text=\"date of expire\"/><Label text=\"16.02.2016\"/></l:HorizontalLayout></l:VerticalLayout><l:VerticalLayout><l:HorizontalLayout><Label text=\"type\"/><Label text=\"Payment\"/></l:HorizontalLayout><l:HorizontalLayout><Label text=\"category\"/><Label text=\"Debit\"/></l:HorizontalLayout><l:HorizontalLayout><Label text=\"date of expire\"/><Label text=\"16.02.2016\"/></l:HorizontalLayout></l:VerticalLayout><l:VerticalLayout><l:HorizontalLayout><Label text=\"type\"/><Label text=\"Payment\"/></l:HorizontalLayout><l:HorizontalLayout><Label text=\"category\"/><Label text=\"Debit\"/></l:HorizontalLayout><l:HorizontalLayout><Label text=\"date of expire\"/><Label text=\"16.02.2016\"/></l:HorizontalLayout></l:VerticalLayout></content></DynamicPageHeader></header><content><l:VerticalLayout width=\"100%\"><Table><columns><Column><Title text=\"Detail Detail List\"/></Column></columns><items><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleDetailDetailPress\"><cells><Text text=\"End column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleDetailDetailPress\"><cells><Text text=\"End column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleDetailDetailPress\"><cells><Text text=\"End column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleDetailDetailPress\"><cells><Text text=\"End column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleDetailDetailPress\"><cells><Text text=\"End column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleDetailDetailPress\"><cells><Text text=\"End column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleDetailDetailPress\"><cells><Text text=\"End column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleDetailDetailPress\"><cells><Text text=\"End column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleDetailDetailPress\"><cells><Text text=\"End column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleDetailDetailPress\"><cells><Text text=\"End column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleDetailDetailPress\"><cells><Text text=\"End column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleDetailDetailPress\"><cells><Text text=\"End column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleDetailDetailPress\"><cells><Text text=\"End column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleDetailDetailPress\"><cells><Text text=\"End column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleDetailDetailPress\"><cells><Text text=\"End column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleDetailDetailPress\"><cells><Text text=\"End column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleDetailDetailPress\"><cells><Text text=\"End column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleDetailDetailPress\"><cells><Text text=\"End column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleDetailDetailPress\"><cells><Text text=\"End column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleDetailDetailPress\"><cells><Text text=\"End column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleDetailDetailPress\"><cells><Text text=\"End column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleDetailDetailPress\"><cells><Text text=\"End column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleDetailDetailPress\"><cells><Text text=\"End column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleDetailDetailPress\"><cells><Text text=\"End column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleDetailDetailPress\"><cells><Text text=\"End column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleDetailDetailPress\"><cells><Text text=\"End column LAST\"/></cells></ColumnListItem></items></Table></l:VerticalLayout></content><footer><OverflowToolbar><ToolbarSpacer/><Button type=\"Accept\" text=\"Accept\"/><Button type=\"Reject\" text=\"Reject\"/></OverflowToolbar></footer></DynamicPage></View>",
	"web/ui5/test-resources/sap/m/demokit/sample/FlexibleColumnLayoutDynamicPage/FlexibleColumnLayout.view.xml": "<View xmlns=\"sap.m\" xmlns:mvc=\"sap.ui.core.mvc\" displayBlock=\"true\" controllerName=\"sap.m.sample.FlexibleColumnLayoutDynamicPage.FlexibleColumnLayout\" height=\"100%\"><FlexibleColumnLayout id=\"fcl\" layoutChange=\"handleLayoutChange\"><beginColumn><mvc:XMLView id=\"beginView\" viewName=\"sap.m.sample.FlexibleColumnLayoutDynamicPage.MasterDP\" /></beginColumn></FlexibleColumnLayout></View>\n\n\n",
	"web/ui5/test-resources/sap/m/demokit/sample/FlexibleColumnLayoutDynamicPage/MasterDP.view.xml": "<View xmlns=\"sap.m\" xmlns:l=\"sap.ui.layout\" displayBlock=\"true\" controllerName=\"sap.m.sample.FlexibleColumnLayoutDynamicPage.Master\"\n      height=\"100%\"><DynamicPage id=\"masterPage\"><title><DynamicPageTitle><heading><Label text=\"Filtered 1042 items based on 'unknown' criteria\"></Label></heading><snappedContent><MessageStrip text=\"Filtered by name\"></MessageStrip><MessageStrip text=\"Filtered by location\"></MessageStrip><MessageStrip text=\"Filtered by status\"></MessageStrip><MessageStrip text=\"Filtered by type\"></MessageStrip></snappedContent><expandedContent><SearchField value=\"Filter items...\"></SearchField></expandedContent><actions><Button text=\"Chart\" icon=\"sap-icon://bar-chart\"/><OverflowToolbarButton text=\"Add\" icon=\"sap-icon://add\"/><OverflowToolbarButton text=\"Edit\" icon=\"sap-icon://edit\"/><OverflowToolbarButton text=\"Delete\" icon=\"sap-icon://delete\" press=\"deleteContentPressHandler\"/></actions></DynamicPageTitle></title><header><DynamicPageHeader><content><l:VerticalLayout><l:HorizontalLayout><Label text=\"type\"/><Label text=\"Payment\"/></l:HorizontalLayout><l:HorizontalLayout><Label text=\"category\"/><Label text=\"Debit\"/></l:HorizontalLayout><l:HorizontalLayout><Label text=\"date of expire\"/><Label text=\"16.02.2016\"/></l:HorizontalLayout></l:VerticalLayout><l:VerticalLayout><l:HorizontalLayout><Label text=\"type\"/><Label text=\"Payment\"/></l:HorizontalLayout><l:HorizontalLayout><Label text=\"category\"/><Label text=\"Debit\"/></l:HorizontalLayout><l:HorizontalLayout><Label text=\"date of expire\"/><Label text=\"16.02.2016\"/></l:HorizontalLayout></l:VerticalLayout><l:VerticalLayout><l:HorizontalLayout><Label text=\"type\"/><Label text=\"Payment\"/></l:HorizontalLayout><l:HorizontalLayout><Label text=\"category\"/><Label text=\"Debit\"/></l:HorizontalLayout><l:HorizontalLayout><Label text=\"date of expire\"/><Label text=\"16.02.2016\"/></l:HorizontalLayout></l:VerticalLayout></content></DynamicPageHeader></header><content><l:VerticalLayout width=\"100%\"><Table><columns><Column><Title text=\"Master List\"/></Column></columns><items><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleMasterPress\"><cells><Text text=\"Master column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleMasterPress\"><cells><Text text=\"Master column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleMasterPress\"><cells><Text text=\"Master column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleMasterPress\"><cells><Text text=\"Master column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleMasterPress\"><cells><Text text=\"Master column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleMasterPress\"><cells><Text text=\"Master column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleMasterPress\"><cells><Text text=\"Master column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleMasterPress\"><cells><Text text=\"Master column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleMasterPress\"><cells><Text text=\"Master column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleMasterPress\"><cells><Text text=\"Master column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleMasterPress\"><cells><Text text=\"Master column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleMasterPress\"><cells><Text text=\"Master column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleMasterPress\"><cells><Text text=\"Master column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleMasterPress\"><cells><Text text=\"Master column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleMasterPress\"><cells><Text text=\"Master column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleMasterPress\"><cells><Text text=\"Master column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleMasterPress\"><cells><Text text=\"Master column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleMasterPress\"><cells><Text text=\"Master column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleMasterPress\"><cells><Text text=\"Master column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleMasterPress\"><cells><Text text=\"Master column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleMasterPress\"><cells><Text text=\"Master column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleMasterPress\"><cells><Text text=\"Master column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleMasterPress\"><cells><Text text=\"Master column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleMasterPress\"><cells><Text text=\"Master column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleMasterPress\"><cells><Text text=\"Master column\"/></cells></ColumnListItem><ColumnListItem type=\"Navigation\" vAlign=\"Middle\" press=\"handleMasterPress\"><cells><Text text=\"Master column LAST\"/></cells></ColumnListItem></items></Table></l:VerticalLayout></content><footer><OverflowToolbar><ToolbarSpacer/><Button type=\"Accept\" text=\"Accept\"/><Button type=\"Reject\" text=\"Reject\"/></OverflowToolbar></footer></DynamicPage></View>"
}, "web/ui5/test-resources/sap/m/demokit/sample/FlexibleColumnLayoutDynamicPage/Component-preload");