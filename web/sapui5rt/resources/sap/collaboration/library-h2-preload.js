jQuery.sap.registerPreloadedModules({"name":"sap/collaboration/library-h2-preload","version":"2.0","modules":{"sap/collaboration/manifest.json":'{"_version":"1.9.0","sap.app":{"id":"sap.collaboration","type":"library","embeds":["components/socialtimeline","components/fiori/sharing/dialog","components/fiori/sharing","components/fiori/notification","components/fiori/feed/dialog","components/fiori/feed","components/socialprofile","components/feed"],"applicationVersion":{"version":"1.54.0"},"title":"SAP UI library: SAP Collaboration for Social Media Integration.","description":"SAP UI library: SAP Collaboration for Social Media Integration.","ach":"CA-UI5-BS-SM","resources":"resources.json","offline":true},"sap.ui":{"technology":"UI5","supportedThemes":["base","sap_bluecrystal"]},"sap.ui5":{"dependencies":{"minUI5Version":"1.54","libs":{"sap.ui.core":{"minVersion":"1.54.0"},"sap.suite.ui.commons":{"minVersion":"1.54.0"}}},"library":{"i18n":false}}}',
/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2017 SAP SE. All rights reserved
 */
"sap/collaboration/library.js":function(){jQuery.sap.declare("sap.collaboration.library");jQuery.sap.require("sap.ui.core.Core");jQuery.sap.require("sap.ui.core.library");jQuery.sap.require("sap.suite.ui.commons.library");sap.ui.getCore().initLibrary({name:"sap.collaboration",dependencies:["sap.ui.core","sap.suite.ui.commons"],types:["sap.collaboration.AppType","sap.collaboration.DisplayFeedType","sap.collaboration.FeedType"],interfaces:[],controls:[],elements:[],version:"1.54.0"});jQuery.sap.declare("sap.collaboration.AppType");sap.collaboration.AppType={split:"split",widget:"widget"};jQuery.sap.declare("sap.collaboration.DisplayFeedType");sap.collaboration.DisplayFeedType={BusinessRecordFeed:"BusinessRecordFeed",GroupFeedsWhereBusinessRecordIsLinked:"GroupFeedsWhereBusinessRecordIsLinked"};jQuery.sap.declare("sap.collaboration.FeedType");sap.collaboration.FeedType={follows:"follows",company:"company",group:"group",objectGroup:"objectGroup",object:"object",GroupIds:"GroupIds",BusinessObjectGroups:"BusinessObjectGroups",UserGroups:"UserGroups"};}}});
