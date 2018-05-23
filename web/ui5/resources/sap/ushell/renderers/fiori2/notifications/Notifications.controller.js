// Copyright (c) 2009-2014 SAP SE, All Rights Reserved
(function(){"use strict";jQuery.sap.require("sap.ushell.utils");sap.ui.controller("sap.ushell.renderers.fiori2.notifications.Notifications",{onInit:function(){this.getView().setModel(new sap.ui.model.json.JSONModel());this.oNotificationsService=sap.ushell.Container.getService("Notifications");this.notificationsUpdateCallback();},onBeforeRendering:function(){this.oNotificationsService.registerNotificationsUpdateCallback(this.notificationsUpdateCallback.bind(this));},notificationsUpdateCallback:function(){var t=this,T,s=false,i;this.oNotificationsService.getNotifications().done(function(n){if(!n){return;}for(i=0;i<n.length;i++){if(n[i].Priority===undefined||n[i].Priority===""){n[i].Priority="MEDIUM";}}T=t.getView().oPressedToolbarButton.getId();if(T==="CreatedAt"){s=t.getView().bSortByDateAscending;if(s){n=t.ascendingSortBy(n,"CreatedAt");}else{n=t.descendingSortBy(n,"CreatedAt");}}else if(T==="NotificationTypeId"){t.getNotificationsByTypeWithGroupHeaders();}else{n=t.descendingSortBy(n,T);}t.getView().getModel().setProperty('/aNotifications',n);}).fail(function(d){jQuery.sap.log.error("Notifications control - call to notificationsService.getNotifications failed: ",d,"sap.ushell.renderers.fiori2.notifications.Notifications");});},executeAction:function(n,a){var p=this.oNotificationsService.executeAction(n,a),t=this,r;p.fail(function(){sap.ushell.Container.getService('Message').error(sap.ushell.resources.i18n.getText('notificationsFailedExecuteAction'));if(r){t.addNotificationToModel(r.obj,r.index);}});r=this.removeNotificationFromModel(n);},executeBulkAction:function(n,a,g){var r=this.removeGroupFromModel(g),p=this.oNotificationsService.executeBulkAction(n,a),R=r.oGroup.notifications;p.fail(function(o){sap.ushell.Container.getService('Message').error(sap.ushell.resources.i18n.getText('notificationsFailedExecuteBulkAction'));if(o.failedNotifications&&o.failedNotifications.length>0){var N=R.filter(function(b,i,A){return o.failedNotifications.indexOf(b.Id)>-1;});r.oGroup.notifications=N;this.reAddFailedGroup(r);}}.bind(this));},dismissBulkNotifications:function(n,g){var r=this.removeGroupFromModel(g),p=this.oNotificationsService.dismissBulkNotifications(n),R=r.oGroup.notifications;p.fail(function(o){sap.ushell.Container.getService('Message').error(sap.ushell.resources.i18n.getText('notificationsFailedExecuteBulkAction'));if(o.failedNotifications&&o.failedNotifications.length>0){var N=R.filter(function(a,i,A){return o.failedNotifications.indexOf(a.Id)>-1;});r.oGroup.notifications=N;this.reAddFailedGroup(r);}}.bind(this));},reAddFailedGroup:function(g){var m=this.getView().getModel(),G=m.getProperty('/aNotificationsByType');G.splice(g.removedGroupIndex,0,g.oGroup);m.setProperty('/aNotificationsByType',G);},removeGroupFromModel:function(g){var m=this.getView().getModel(),G=m.getProperty('/aNotificationsByType'),r={oGroup:g,removedGroupIndex:undefined};G.some(function(o,i){if(o.Id===g.Id){r.removedGroupIndex=i;G.splice(i,1);m.setProperty('/aNotificationsByType',G);return true;}return false;});return r;},getNotificationsByTypeWithGroupHeaders:function(){var p=this.oNotificationsService.getNotificationsByTypeWithGroupHeaders(),t=this;p.fail(function(){sap.ushell.Container.getService('Message').error(sap.ushell.resources.i18n.getText('notificationsFailedLoadingByType'));});p.done(function(n){var j=JSON.parse(n),a=j.value,r=[],l=-1;a.forEach(function(i,b){if(i.IsGroupHeader){r.push(i);l=l+1;}else{if(r[l]){if(!r[l]['notifications']){r[l]['notifications']=[];}r[l]['notifications'].push(i);}}});t.getView().getModel().setProperty('/aNotificationsByType',r);});},onListItemPress:function(n,s,a,p){var v=sap.ui.getCore().byId('viewPortContainer');if(hasher.getHash()===s+"-"+a){v.switchState("Center");}else{sap.ushell.utils.toExternalWithParameters(s,a,p);}this.markRead(n);},addNotificationToModel:function(n,i){var m=this.getView().getModel(),a=m.getProperty("/aNotifications"),t=this.getView().oPressedToolbarButton.getId();a.splice(i,0,n);m.setProperty("/aNotifications",a);if(t==="NotificationTypeId"){this.getNotificationsByTypeWithGroupHeaders();}},removeNotificationFromModel:function(n){var m=this.getView().getModel(),t=this.getView().oPressedToolbarButton.getId();if(t==="CreatedAt"||t==="Priority"){var r={},a=m.getProperty("/aNotifications");a.some(function(b,c,d){if(b.Id&&b.Id===n){r.obj=d.splice(c,1)[0];r.index=c;return true;}});m.setProperty("/aNotifications",a);return r;}else{var r={},g=m.getProperty("/aNotificationsByType");for(var i=0;i<g.length;i++){var a=g[i].notifications;if(a.length==1&&a[0].Id===n){g.splice(i,1);}else{a.some(function(b,c,d){if(b.Id&&b.Id===n){r.obj=d.splice(c,1)[0];r.index=c;return true;}});g[i].notifications=a;}}m.setProperty("/aNotificationsByType",g);return r;}},dismissNotification:function(n){var p=this.oNotificationsService.dismissNotification(n);p.fail(function(){sap.ushell.Container.getService('Message').error(sap.ushell.resources.i18n.getText('notificationsFailedDismiss'));var l=sap.ui.getCore().byId('notificationsList');if(l){l.updateItems();}});},setMarkReadOnModel:function(n,i){var m=this.getView().getModel(),a=m.getProperty("/aNotifications");a.some(function(b,c,d){if(b.Id&&b.Id===n){b.IsRead=i;return true;}});m.setProperty("/aNotifications",a);},markRead:function(n){var p=this.oNotificationsService.markRead(n),t=this;p.fail(function(){sap.ushell.Container.getService('Message').error(sap.ushell.resources.i18n.getText('notificationsFailedMarkRead'));t.setMarkReadOnModel(n,false);});this.setMarkReadOnModel(n,true);},ascendingSortBy:function(n,p){n.sort(function(x,y){var v=x[p],a=y[p];if(v===a){v=x.id;a=y.id;}return a>v?-1:1;});return n;},descendingSortBy:function(n,p){n.sort(function(x,y){var v=x[p],a=y[p];if(v===a){if(p==="Priority"){v=x["CreatedAt"];a=y["CreatedAt"];}else{v=x.id;a=y.id;}return v>a?-1:1;}if(p==="Priority"){if(v==="HIGH"){return-1;}if(a==="HIGH"){return 1;}if(v==="MEDIUM"){return-1;}return 1;}return v>a?-1:1;});return n;}});}());
