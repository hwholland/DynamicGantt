// Copyright (c) 2009-2014 SAP SE, All Rights Reserved
(function(){"use strict";jQuery.sap.require("sap.m.NotificationListItem");sap.ui.jsview("sap.ushell.renderers.fiori2.notifications.Notifications",{createContent:function(c){var s,t=this;this.oActionListItemTemplate=new sap.m.Button({text:"{ActionText}",type:{parts:["Nature"],formatter:function(b){return b==="POSITIVE"?"Accept":"Reject";}},press:function(e){var N=this.getBindingContext().getPath(),o=this.getModel().getProperty(N),p=N.split("/"),T=t.oPressedToolbarButton.getId(),P=T==='NotificationTypeId'?"/"+p[1]+"/"+p[2]+"/"+p[3]+"/"+p[4]:"/"+p[1]+"/"+p[2],b=this.getModel().getProperty(P),d=b.Id;c.executeAction(d,o.ActionId);}});this.oActionGroupItemTemplate=new sap.m.Button({text:"{GroupActionText}",type:{parts:["Nature"],formatter:function(b){return b==="POSITIVE"?"Accept":"Reject";}},press:function(e){var N=this.getBindingContext().getPath(),o=this.getModel().getProperty(N),p=N.split("/"),P="/"+p[1]+"/"+p[2],b=this.getModel().getProperty(P),d=[];b.notifications.forEach(function(f,g){d.push(f.Id);});c.executeBulkAction(d,o.ActionId,b);}});this.addStyleClass('sapUshellNotificationsView');this.bSortByDateAscending=false;this.oNotificationListItemTemplate=new sap.m.NotificationListItem({press:function(e){var b=this.getBindingContext(),m=b.sPath,M=this.getModel().getProperty(m),S=M.NavigationTargetObject,A=M.NavigationTargetAction,p=M.NavigationTargetParams,N=M.Id;c.onListItemPress(N,S,A,p).bind(c);},datetime:{path:"CreatedAt",formatter:sap.ushell.utils.formatDate.bind(c)},description:"{SensitiveText}",title:"{Text}",buttons:{path:"Actions",templateShareable:true,sorter:new sap.ui.model.Sorter('Nature',true),template:this.oActionListItemTemplate},unread:{parts:["IsRead"],formatter:function(b){return!b;}},close:function(e){var N=this.getBindingContext().getPath(),p=N.split("/"),P="/"+p[1]+"/"+p[2],o=this.getModel().getProperty(P),b=o.Id;c.dismissNotification(b);},priority:{parts:["Priority"],formatter:function(p){if(p){p=p.charAt(0)+p.substr(1).toLowerCase();return sap.ui.core.Priority[p];}}}}).addStyleClass("sapUshellNotificationsListItem");this.oNotificationGroupTemplate=new sap.m.NotificationListGroup({title:"{GroupHeaderText}",description:"{GroupHeaderText}",collapsed:true,datetime:{path:"CreatedAt",formatter:sap.ushell.utils.formatDate.bind(c)},buttons:{path:"Actions",templateShareable:true,sorter:new sap.ui.model.Sorter('Nature',true),template:this.oActionGroupItemTemplate},items:{path:"notifications",template:this.oNotificationListItemTemplate},close:function(e){var N=this.getBindingContext().getPath(),p=N.split("/"),P="/"+p[1]+"/"+p[2],o=this.getModel().getProperty(P),b=[];o.notifications.forEach(function(d,f){b.push(d.Id);});c.dismissBulkNotifications(b,o);},priority:{parts:["Priority"],formatter:function(p){if(p){p=p.charAt(0)+p.substr(1).toLowerCase();return sap.ui.core.Priority[p];}}}});this.oNotificationsList=new sap.m.List({mode:sap.m.ListMode.SingleSelect,noDataText:sap.ushell.resources.i18n.getText('noNotifications'),items:{path:"/aNotifications",template:this.oNotificationListItemTemplate,templateShareable:true}}).addStyleClass("sapUshellNotificationsList").addStyleClass('sapContrastPlus').addStyleClass('sapContrast');s=new sap.m.ScrollContainer("notificationsScrollContainer",{content:this.oNotificationsList,vertical:true});var C=new sap.m.Button("CreatedAt",{type:'Transparent',iconFirst:false,text:sap.ushell.resources.i18n.getText('notificationsSortByDate'),tooltip:sap.ushell.resources.i18n.getText('notificationsSortByDateDescendingTooltip'),icon:"sap-icon://sort-descending",press:function(){var I,N=this.getModel().getProperty("/aNotifications");t.oNotificationsList.bindItems('/aNotifications',t.oNotificationListItemTemplate);if(t.oPressedToolbarButton===this){t.bSortByDateAscending=!t.bSortByDateAscending;I=t.bSortByDateAscending?"sap-icon://sort-ascending":"sap-icon://sort-descending";if(t.bSortByDateAscending){this.setTooltip(sap.ushell.resources.i18n.getText('notificationsSortByDateAscendingTooltip'));}else{this.setTooltip(sap.ushell.resources.i18n.getText('notificationsSortByDateDescendingTooltip'));}this.setIcon(I);}else{this.addStyleClass("bStyleActive");t.oPressedToolbarButton.removeStyleClass("bStyleActive");t.oPressedToolbarButton=this;}if(t.bSortByDateAscending){N=t.getController().ascendingSortBy(N,"CreatedAt");}else{N=t.getController().descendingSortBy(N,"CreatedAt");}this.getModel().setProperty("/aNotifications",N);}}),i=new sap.m.Button("NotificationTypeId",{type:'Transparent',iconFirst:false,text:sap.ushell.resources.i18n.getText('notificationsSortByType'),tooltip:sap.ushell.resources.i18n.getText('notificationsSortByTypeTooltip'),press:function(){this.addStyleClass("bStyleActive");if(t.oPressedToolbarButton!==undefined){t.oPressedToolbarButton.removeStyleClass("bStyleActive");}t.oPressedToolbarButton=this;t.getController().getNotificationsByTypeWithGroupHeaders();t.oNotificationsList.bindItems('/aNotificationsByType',t.oNotificationGroupTemplate);}}),a=new sap.m.Button("Priority",{type:'Transparent',iconFirst:false,text:sap.ushell.resources.i18n.getText('notificationsSortByPriority'),tooltip:sap.ushell.resources.i18n.getText('notificationsSortByPriorityTooltip'),press:function(){t.oNotificationsList.bindItems('/aNotifications',t.oNotificationListItemTemplate);this.addStyleClass("bStyleActive");if(t.oPressedToolbarButton!==undefined){t.oPressedToolbarButton.removeStyleClass("bStyleActive");}t.oPressedToolbarButton=this;var N=this.getModel().getProperty("/aNotifications");N=t.getController().descendingSortBy(N,"Priority");this.getModel().setProperty("/aNotifications",N);}});this.oPressedToolbarButton=C;C.addStyleClass("bStyleActive");var n=new sap.m.Page("notificationsSorter",{expanded:true,backgroundDesign:"Transparent",content:[s],headerContent:new sap.m.Toolbar("sortingToolbar",{content:[C,i,a]}).addStyleClass("sapUshellNotificationToolBar")}).addStyleClass("myPanel");return[n];},getControllerName:function(){return"sap.ushell.renderers.fiori2.notifications.Notifications";}});}());