// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/services/AppType","sap/m/Button","sap/m/List","sap/m/Text","sap/m/VBox","sap/m/HBox","sap/m/Image","sap/m/Dialog","sap/m/Popover","sap/m/OverflowToolbar","sap/m/ScrollContainer","sap/ushell/resources","sap/ushell/ui/launchpad/UserStatusItem","sap/ushell/ui/launchpad/AccessibilityCustomData","sap/m/ListSeparators"],function(a,B,L,T,V,H,I,D,P,O,S,r,U,A,b){"use strict";sap.ui.jsview("sap.ushell.renderers.fiori2.meArea.MeArea",{createContent:function(c){this.addStyleClass('sapUshellMeAreaView');this.aDanglingControls=[];var u=sap.ushell.Container.getUser().getFullName(),p,t=sap.ushell.resources.i18n,C=(this.getViewData()?this.getViewData().config:{})||{},s=C.appState,d=(s==='embedded'||s==='embedded-home'||s==='standalone'||s==='blank-home'||s==='blank'),e,o=sap.ui.core.service.ServiceFactoryRegistry.get("sap.ushell.ui5service.UserStatus");if(o){var f=o.createInstance(),g=function(i){f.then(function(o){o.setStatus(i);p.close();});};}e=[new U({status:U.prototype.STATUS_ENUM.AVAILABLE,id:"userStatusItem1",isOpener:false,press:function(i){g(sap.ushell.ui5service.UserStatus.prototype.AvailableStatus.AVAILABLE);}.bind(this)}).addStyleClass('sapUserStatusContainer'),new U({status:U.prototype.STATUS_ENUM.AWAY,id:"userStatusItem2",isOpener:false,press:function(i){g(sap.ushell.ui5service.UserStatus.prototype.AvailableStatus.AWAY);}.bind(this)}).addStyleClass('sapUserStatusContainer'),new U({status:U.prototype.STATUS_ENUM.BUSY,id:"userStatusItem3",isOpener:false,press:function(i){g(sap.ushell.ui5service.UserStatus.prototype.AvailableStatus.BUSY);}.bind(this)}).addStyleClass('sapUserStatusContainer'),new U({status:U.prototype.STATUS_ENUM.APPEAR_OFFLINE,id:"userStatusItem4",isOpener:false,press:function(i){g(sap.ushell.ui5service.UserStatus.prototype.AvailableStatus.APPEAR_OFFLINE);}.bind(this)}).addStyleClass('sapUserStatusContainer')];if(!C.disableSignOut){e.push(new U({status:U.prototype.STATUS_ENUM.SIGNOUT,id:"userStatusLogout",isOpener:false,press:[c.logout,c]}).addStyleClass('sapUserStatusSignOutContainer'));}var h=new L({id:"sapUshellUserStatusItemList",showSeparators:"None",items:e});h.addCustomData(new A({key:"aria-labelledBy",value:"userStatusItem1",writeToDom:true}));p=new P("statuses",{placement:sap.m.PlacementType.Bottom,showArrow:false,showHeader:false,content:h}).addStyleClass('sapUserStatusPopOver');p.addStyleClass("sapContrastPlus");p.setOffsetX(-3);e=[new T({text:u}).addStyleClass('sapUshellMeAreaUserName')];var j=new sap.ushell.ui.launchpad.UserStatusItem({id:"userStatusOpener",visible:{parts:["/userStatusEnabled","/userStatusUserEnabled"],formatter:function(i,v){if(i&&v){return true;}return false;}.bind(this)},status:{path:"/userStatus",formatter:function(i){return sap.ushell.ui.launchpad.UserStatusItem.prototype.STATUS_ENUM[i];}.bind(this)},tooltip:t.getText("userStatus_tooltip"),image:sap.ui.core.IconPool.getIconURI("account"),press:function(i){var v=sap.ui.getCore().byId(i.mParameters.id);if(p.isOpen()){p.close();}else{p.openBy(v);}}.bind(this),contentList:p}).addStyleClass('sapUserStatusOpener');j.addCustomData(new A({key:"tabindex",value:"0",writeToDom:true}));j.addCustomData(new A({key:"aria-label",value:sap.ushell.resources.i18n.getText("OnlineStatus")+" "+t.getText("userStatus_tooltip"),writeToDom:true}));j.addCustomData(new A({key:"role",value:"listbox",writeToDom:true}));var l=new L({items:[j],backgroundDesign:sap.m.BackgroundDesign.Transparent});e.push(l);if(!C.disableSignOut){var k;if(!d){k=new B("logoutBtn",{visible:{parts:["/userStatusEnabled","/userStatusUserEnabled"],formatter:function(i,v){if(i&&v){return false;}return true;}.bind(this)},type:sap.m.ButtonType.Transparent,icon:'sap-icon://log',text:sap.ushell.resources.i18n.getText("signoutBtn_title"),press:[c.logout,c]});e.push(k);}else{k=new sap.ushell.ui.launchpad.ActionItem("logoutBtn",{visible:true,type:sap.m.ButtonType.Transparent,icon:'sap-icon://log',text:sap.ushell.resources.i18n.getText("signoutBtn_title"),press:[c.logout,c]});}}var m=new V({items:[e]}).addStyleClass("sapUshellUserArea");var n=sap.ushell.Container.getUser(),q=n.getImage(),w;if(!q){w=this.createPlaceHolderIcon();}else{w=this.createNewImage();}w.addStyleClass("sapUshellMeAreaUserImage");var x=new H({items:[w,m]});n.attachOnSetImage(this._updateUserImage.bind({origScope:this,oUserHBox:x,userBoxItem:w}));x.addStyleClass('sapUshellMeAreaUserInfo');x.addStyleClass('sapContrastPlus');var y=c.createSaveButton(),z=c.createCancelButton();this.oSettingsDialog=new D({id:"userSettingsDialog",showHeader:false,content:null,buttons:[y,z],afterClose:function(){sap.ushell.Container.getUser().resetChangedProperties();},stretch:sap.ui.Device.system.phone}).addStyleClass("sapUshellUserSetting");this.oSettingsDialog.addContent(c.getSettingsDialogContent());this.oSettingsDialog.addEventDelegate({onkeydown:function(i){if(i.keyCode===27){if(c&&typeof c._dialogCancelButtonHandler==="function"){c._dialogCancelButtonHandler();}}}.bind(this)});this.aDanglingControls.push(z,y,this.oSettingsDialog);x.addEventDelegate({onsapskipback:function(i){i.preventDefault();sap.ushell.renderers.fiori2.AccessKeysHandler.setIsFocusHandledByAnotherHandler(true);sap.ushell.renderers.fiori2.AccessKeysHandler.sendFocusBackToShell(i);},onsaptabprevious:function(i){i.preventDefault();sap.ushell.renderers.fiori2.AccessKeysHandler.setIsFocusHandledByAnotherHandler(true);sap.ushell.renderers.fiori2.AccessKeysHandler.sendFocusBackToShell(i);}});var E=new O({id:"overflowActions",design:sap.m.ToolbarDesign.Transparent,content:{path:"/currentState/actions",factory:function(i,v){var K=sap.ui.getCore().byId(v.getObject());if(K){if(K.setActionType){K.setActionType("action");K.addStyleClass('sapContrastPlus');}c._addPressHandlerToActions(K);}return K;}}});E._getOverflowButtonSize=function(){return 82.4;};if(E._getOverflowButton){var F=E._getOverflowButton();if(F){var G=F.onAfterRendering;F.onAfterRendering=function(){if(G){G.apply(this,arguments);}this.addStyleClass('sapUshellActionItem').addStyleClass('sapContrastPlus');this.setText(sap.ushell.resources.i18n.getText('meAreaMoreActions'));};}}E.updateAggregation=function(N){var K=this.mBindingInfos[N],Q=this.getMetadata().getJSONKeys()[N],R;jQuery.each(this[Q._sGetter](),jQuery.proxy(function(i,v){this[Q._sRemoveMutator](v);},this));jQuery.each(K.binding.getContexts(),jQuery.proxy(function(i,v){R=K.factory(this.getId()+"-"+i,v)?K.factory(this.getId()+"-"+i,v).setBindingContext(v,K.model):"";this[Q._sMutator](R);},this));};var M=new V("sapUshellMeAreaContent",{});this.actionBox=E;M.addItem(x);M.addItem(E);if(C.enableRecentActivity){var J=this.createIconTabBar(c);J.done(function(i){M.addItem(i);var v=sap.ushell.components.applicationIntegration.AppLifeCycle.getModel().getProperty("/enableTrackingActivity");i.setVisible(v);});}this.actionBox.addEventDelegate({onsaptabnext:function(i){var v=i.originalEvent,K=v.srcElement,N=jQuery('.sapUshellActionItem:last')[0].id,Q,R;R=sap.ui.getCore().byId('meAreaIconTabBar').getVisible();Q=N===K.id;if(Q===true&&!R){i.preventDefault();sap.ushell.renderers.fiori2.AccessKeysHandler.setIsFocusHandledByAnotherHandler(true);sap.ushell.renderers.fiori2.AccessKeysHandler.sendFocusBackToShell(i);}},onsapskipforward:function(i){var v=sap.ui.getCore().byId('meAreaIconTabBar').getVisible();if(!v){i.preventDefault();sap.ushell.renderers.fiori2.AccessKeysHandler.setIsFocusHandledByAnotherHandler(true);sap.ushell.renderers.fiori2.AccessKeysHandler.sendFocusBackToShell(i);}}});return new S({vertical:true,horizontal:false,height:"100%",content:M});},createIconTabBar:function(c){var R=new jQuery.Deferred(),t=this,i,o,d;sap.ui.require(['sap/m/IconTabBar','sap/m/CustomListItem','sap/m/IconTabFilter','sap/m/Text','sap/m/HBox'],function(e,C,f,T,H){i=new e('meAreaIconTabBar',{backgroundDesign:sap.m.BackgroundDesign.Transparent,expandable:false,items:[t.createIconTab("recentActivities",true,c,C,f,T,H),t.createIconTab("frequentActivities",false,c,C,f,T,H)]}).addStyleClass('sapUshellMeAreaTabBar');i.addEventDelegate({onsaptabnext:function(E){var g=E.originalEvent,s=g.srcElement,h=s.classList,j;j=jQuery.inArray('sapUshellMeAreaActivityItem',h)>-1;if(j===true){E.preventDefault();sap.ushell.renderers.fiori2.AccessKeysHandler.setIsFocusHandledByAnotherHandler(true);sap.ushell.renderers.fiori2.AccessKeysHandler.sendFocusBackToShell(E);}},onsapskipforward:function(E){E.preventDefault();sap.ushell.renderers.fiori2.AccessKeysHandler.setIsFocusHandledByAnotherHandler(true);sap.ushell.renderers.fiori2.AccessKeysHandler.sendFocusBackToShell(E);}});o=i.onAfterRendering;i.onAfterRendering=function(){if(o){o.apply(t,arguments);}d=sap.ui.getCore().byId('meAreaIconTabBar--header');if(d){d.addStyleClass('sapContrastPlus');d.addStyleClass('sapUshellTabBarHeader');}};R.resolve(i);});return R.promise();},createIconTab:function(i,s,c,C,d,T,H){var o,e,t,f,l,g,h,m,p,v;o=function(j,k){e=k.getProperty("icon");t=k.getProperty("title");f=a.getDisplayName(k.getProperty("appType"));var n=new T({text:t}).addStyleClass('sapUshellMeAreaActivityItemTitle'),q=new sap.ui.core.Icon({src:e}).addStyleClass('sapUshellMeAreaActivityItemIcon'),u=new T({text:f}).addStyleClass('sapUshellMeAreaActivityItemDescription'),w=new T({text:s?k.getProperty("timestamp"):""}).addStyleClass('sapUshellMeAreaActivityItemInfo'),x=new H({items:e?[q,u]:[u],justifyContent:"SpaceBetween"}),y=new H({items:s?[x,w]:[x],justifyContent:"SpaceBetween"}).addStyleClass('sapUshellMeAreaActivityItemContainer');l=new C({content:[n,y],type:sap.m.ListType.Active}).addStyleClass('sapUshellMeAreaActivityItem');l.addCustomData(new A({key:"aria-describedby",value:g.getId(),writeToDom:true}));return l;};g=new d({id:"sapUshellIconTabBar"+i,text:r.i18n.getText(i)});h=new L({id:"sapUshellActivityList"+i,showSeparators:b.All,items:{path:"meAreaModel>/apps/"+i,factory:o.bind(this)},noDataText:sap.ushell.resources.i18n.getText(i+'NoDataText'),itemPress:function(E){m=this.getModel('meAreaModel');v=sap.ui.getCore().byId("viewPortContainer");if(v){v.switchState("Center");}p=E.getParameter('listItem').getBindingContextPath();c.setLastVisited(m.getProperty(p).url);setTimeout(function(){hasher.setHash(m.getProperty(p).url);},200);}});g.addContent(h);return g;},onViewStateShow:function(){this.getController().refreshRecentActivities();this.getController().refreshFrequentActivities();if(this.actionBox){this.actionBox.updateAggregation("content");}this.getController().updateScrollBar(hasher.getHash());},createNewImage:function(){return new I({src:'{/userImage/personPlaceHolder}'});},createPlaceHolderIcon:function(){return new sap.ui.core.Icon({src:'{/userImage/personPlaceHolder}',size:'4rem'});},getControllerName:function(){return"sap.ushell.renderers.fiori2.meArea.MeArea";},_updateUserImage:function(d){var u=(typeof d)==='string'?d:d.mParameters;this.oUserHBox.removeItem(this.userBoxItem);if((typeof u)==='string'){this.userBoxItem=this.origScope.createNewImage();}else{this.userBoxItem=this.origScope.createPlaceHolderIcon();}if(this.oUserHBox){this.oUserHBox.insertItem(this.userBoxItem,0);if(this.userBoxItem){this.userBoxItem.addStyleClass("sapUshellMeAreaUserImage");}}}});},false);
