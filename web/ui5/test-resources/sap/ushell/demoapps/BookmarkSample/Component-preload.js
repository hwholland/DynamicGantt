sap.ui.require.preload({
	"web/ui5/test-resources/sap/ushell/demoapps/BookmarkSample/Component.js": "/*\n * Copyright (C) 2015 SAP AG or an SAP affiliate company. All rights reserved\n */\njQuery.sap.declare(\"sap.ushell.demo.bookmark.Component\"),jQuery.sap.require(\"sap.ui.core.UIComponent\"),sap.ui.core.UIComponent.extend(\"sap.ushell.demo.bookmark.Component\",{metadata:{manifest:\"json\"},createContent:function(){return jQuery.sap.log.info(\"sap.ushell.demo.bookmark: Component.createContent\"),this.oMainView=sap.ui.xmlview(\"sap.ushell.demo.bookmark.bookmark\"),this.oMainView}});",
	"web/ui5/test-resources/sap/ushell/demoapps/BookmarkSample/bookmark.controller.js": "/*\n * Copyright (C) 2015 SAP AG or an SAP affiliate company. All rights reserved\n */\nsap.ui.controller(\"sap.ushell.demo.bookmark.bookmark\",{onInit:function(){var e=this,o=this.getView(),a=o.byId(\"addToHome\");o.setModel(new sap.ui.model.json.JSONModel({bookmarkedUrl:location.hash,title:\"My Bookmark\",subtitle:\"(via button)\",info:\"\",icon:\"sap-icon://world\",numberUnit:\"EUR\",serviceUrl:\"\",serviceRefreshInterval:0})),a.setAppData(o.getModel().oData),o.byId(\"addToHome\").setBeforePressHandler(function(){a.setAppData(e.getView().getModel().oData)})},onAddBookmark:function(){var e=sap.ushell.Container.getService(\"Bookmark\"),o=this.getView().getModel().oData;e.addBookmark({title:o.title,url:o.bookmarkedUrl,icon:o.icon,info:o.info,subtitle:o.subtitle,serviceUrl:o.serviceUrl,serviceRefreshInterval:o.serviceRefreshInterval,numberUnit:o.numberUnit}).done(function(){sap.m.MessageToast.show(\"Bookmark added\",{duration:5e3})}).fail(function(e){sap.m.MessageToast.show(\"Failed to add bookmark: \"+e,{duration:5e3})})},onCountBookmark:function(){sap.ushell.Container.getService(\"Bookmark\").countBookmarks(location.hash).done(function(e){sap.m.MessageToast.show(\"Number of bookmarks: \"+e,{duration:5e3})}).fail(function(e){sap.m.MessageToast.show(\"Failed to count bookmarks: \"+e,{duration:5e3})})},onDeleteBookmark:function(){sap.ushell.Container.getService(\"Bookmark\").deleteBookmarks(location.hash).done(function(e){sap.m.MessageToast.show(e+\" bookmarks deleted\",{duration:5e3})}).fail(function(e){sap.m.MessageToast.show(\"Failed to delete bookmarks: \"+e,{duration:5e3})})},onUpdateBookmark:function(){var e=sap.ushell.Container.getService(\"Bookmark\"),o=this.getView().getModel().oData;e.updateBookmarks(location.hash,{title:o.title,url:o.bookmarkedUrl,icon:o.icon,info:o.info,subtitle:o.subtitle,serviceUrl:o.serviceUrl,serviceRefreshInterval:o.serviceRefreshInterval,numberUnit:o.numberUnit}).done(function(e){sap.m.MessageToast.show(e+\" bookmarks updated\",{duration:5e3})}).fail(function(e){sap.m.MessageToast.show(\"Failed to add bookmark: \"+e,{duration:5e3})})}});",
	"web/ui5/test-resources/sap/ushell/demoapps/BookmarkSample/bookmark.view.xml": "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?><core:View\r\n  xmlns:core=\"sap.ui.core\"\r\n  xmlns=\"sap.m\"\r\n  xmlns:html=\"http://www.w3.org/1999/xhtml\"\r\n  xmlns:l=\"sap.ui.layout\"\r\n  xmlns:f=\"sap.ui.layout.form\"\r\n  xmlns:footerbar=\"sap.ushell.ui.footerbar\"\r\n  controllerName=\"sap.ushell.demo.bookmark.bookmark\"\r\n  ><Shell><app><Page id=\"page\" title=\"Bookmark Sample App\" enableScrolling=\"false\" showFooter=\"true\"><content><Panel><content><f:SimpleForm title=\"Fiori Launchpad Bookmark\"><Label text=\"URL to be bookmarked\" /><Input value=\"{/bookmarkedUrl}\" /><Label text=\"Title\" /><Input value=\"{/title}\" /><Label text=\"Subtitle\" /><Input value=\"{/subtitle}\" /><Label text=\"Info\" /><Input value=\"{/info}\" /><Label text=\"Icon\" /><Input value=\"{/icon}\" /><core:Icon src=\"{/icon}\" size=\"32px\"/><Label text=\"Number Unit\" /><Input value=\"{/numberUnit}\" /><Label text=\"Service URL\" /><Input value=\"{/serviceUrl}\" /><Label text=\"Refresh Intervall\" /><Input value=\"{/serviceRefreshInterval}\" /></f:SimpleForm><Button text=\"Add Bookmark\" press=\"onAddBookmark\" icon=\"sap-icon://add\"/><Button text=\"Update Bookmark\" press=\"onUpdateBookmark\" icon=\"sap-icon://edit\"/><Button text=\"Count Bookmarks\" press=\"onCountBookmark\" icon=\"sap-icon://synchronize\"/><Button text=\"Delete Bookmark\" press=\"onDeleteBookmark\" icon=\"sap-icon://delete\"/></content></Panel></content><footer><Bar><contentLeft><footerbar:AddBookmarkButton id=\"addToHome\" /></contentLeft></Bar></footer></Page></app></Shell></core:View>",
	"web/ui5/test-resources/sap/ushell/demoapps/BookmarkSample/i18n/i18n.properties": "# SAPUI5 TRANSLATION-KEY 7d524c80-71ab-11e5-a837-0800200c9a66\r\n# Copyright (c) 2009-2015 SAP SE, All Rights Reserved\r\n# See Translation Guide for SAPUI5 Application Developers in the\r\n# sap help portal for details\r\n# http://help.sap.com/saphelp_uiaddon10/helpdata/en/b9/a2a70596e241ebad8901f1d19fe28e/content.htm?frameset=/en/0c/5f019e130e45ceb8914d72fb0257dd/frameset.htm&current_toc=/en/e4/843b8c3d05411c83f58033bac7f072/plain.htm&node_id=652\r\n\r\n# XTIT: Dialog title\r\ntitle=Bookmark Sample\r\n\r\n# XTXT: description\r\ndescription=Sample app for creating and editing of Fiori Launchpad bookmark tiles\r\n\r\n# XTXT: keyword\r\nkeyword.sample=Sample App\r\n# XTXT: keyword\r\nkeyword.demo=Demo App\r\n# XTXT: keyword\r\nkeyword.flp=Fiori Launchpad\r\n"
}, "web/ui5/test-resources/sap/ushell/demoapps/BookmarkSample/Component-preload");