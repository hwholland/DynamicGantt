// Copyright (c) 2009-2014 SAP SE, All Rights Reserved
(function(){"use strict";sap.ui.controller("sap.ushell.components.flp.launchpad.appfinder.EasyAccess",{DEFAULT_URL:"/sap/opu/odata/UI2",DEFAULT_NUMBER_OF_LEVELS:3,onInit:function(){var t=this;this.translationBundle=sap.ushell.resources.i18n;this.oView=this.getView();var e=this.oView.getModel("easyAccessSystemsModel");var b=new sap.ui.model.Binding(e,"/systemSelected",e.getContext("/systemSelected"));b.attachChange(t.adjustUiOnSystemChange.bind(this));this.menuName=this.oView.getViewData().menuName;this.systemId=null;this.easyAccessCache={};this.easyAccessModel=new sap.ui.model.json.JSONModel();this.oView.hierarchyFolders.setModel(this.easyAccessModel,"easyAccess");this.oView.hierarchyApps.setModel(this.easyAccessModel,"easyAccess");this.checkIfSystemSelectedAndLoadData();},onAfterRendering:function(){this.oView.hierarchyApps.getController()._updateAppBoxedWithPinStatuses();},checkIfSystemSelectedAndLoadData:function(){var s=this.oView.getModel("easyAccessSystemsModel").getProperty("/systemSelected");if(s){this.systemId=s.systemId;this.loadMenuItemsFirstTime(this.oView.getViewData().menuName,s);}},navigateHierarchy:function(p,f){this.oView.hierarchyFolders.setBusy(false);var e=this.easyAccessModel.getProperty(p?p:"/");if(typeof e.folders!="undefined"){this.oView.hierarchyFolders.updatePageBindings(p,f);this.oView.hierarchyApps.getController().updatePageBindings(p);return;}this.oView.hierarchyFolders.setBusy(true);this.getMenuItems(this.menuName,this.systemId,e.id,e.level).then(function(p,r){this.easyAccessModel.setProperty(p+"/folders",r.folders);this.easyAccessModel.setProperty(p+"/apps",r.apps);this.oView.hierarchyFolders.updatePageBindings(p,f);this.oView.hierarchyApps.getController().updatePageBindings(p);this.oView.hierarchyFolders.setBusy(false);}.bind(this,p),function(a){this.handleGetMenuItemsError(a);}.bind(this));},adjustUiOnSystemChange:function(){if(this.systemId&&this.easyAccessModel.getData()){this.easyAccessCache[this.systemId]=this.easyAccessModel.getData();}var s=this.oView.getModel("easyAccessSystemsModel").getProperty("/systemSelected");if(s){this.systemId=s.systemId;var n=this.easyAccessCache[this.systemId];if(n){this.easyAccessModel.setData(n);this.navigateHierarchy("",false);}else{this.oView.hierarchyFolders.setBusy(true);this.loadMenuItemsFirstTime(this.menuName,s);}}},loadMenuItemsFirstTime:function(m,s){return this.getMenuItems(m,s.systemId,"",0).then(function(r){r.text=s.systemName||s.systemId;this.easyAccessModel.setData(r);this.oView.hierarchyFolders.setBusy(false);this.navigateHierarchy("",false);}.bind(this),function(e){this.handleGetMenuItemsError(e);this.oView.hierarchyFolders.updatePageBindings("/",false);this.oView.hierarchyApps.getController().updatePageBindings("/");}.bind(this));},handleGetMenuItemsError:function(e){jQuery.sap.require('sap.m.MessageBox');var E=this.getErrorMessage(e);sap.m.MessageBox.error(E);this.easyAccessModel.setData("");this.oView.hierarchyFolders.setBusy(false);},getErrorMessage:function(e){var m="";if(this.menuName=="SAP_MENU"){m=this.translationBundle.getText("easyAccessSapMenuNameParameter");}else if(this.menuName=="USER_MENU"){m=this.translationBundle.getText("easyAccessUserMenuNameParameter");}if(e){if(e.message){return this.translationBundle.getText("easyAccessErrorGetDataErrorMsg",[m,e.message]);}else{return this.translationBundle.getText("easyAccessErrorGetDataErrorMsg",[m,e]);}}else{return this.translationBundle.getText("easyAccessErrorGetDataErrorMsgNoReason",m);}},getMenuItems:function(m,s,e,a,n){var d=new jQuery.Deferred();if(m!="SAP_MENU"&&m!="USER_MENU"){d.reject("Invalid menuType parameter");}if(typeof s!=="string"||s===""){d.reject("Invalid systemId parameter");}if(typeof e!=="string"){d.reject("Invalid entityId parameter");}if(typeof a!=="number"){d.reject("Invalid entityLevel parameter");}if(n&&typeof n!=="number"){d.reject("Invalid numberOfNextLevels parameter");}if(e==""){a=0;}var N;var M=this.getView().getModel();var c=M.getProperty("/easyAccessNumbersOfLevels");if(c){N=c;}else if(n){N=n;}else{N=this.DEFAULT_NUMBER_OF_LEVELS;}var l=a+N+1;var S=this._getODataRequestUrl(m,s,e,l);var r={requestUri:S};var C=this._callODataService(r,s,e,l);C.done(function(b){d.resolve(b);});C.fail(function(b){d.reject(b);});return d.promise();},_callODataService:function(r,s,e,l){jQuery.sap.require("sap.ui.thirdparty.datajs");var t=this;var d=new jQuery.Deferred();OData.read(r,function(R,o){if(R&&R.results&&o&&o.statusCode===200){var a=t._oDataResultFormatter(R.results,s,e,l);d.resolve(a);}},function(m){d.reject(m);});return d.promise();},_appendSystemToUrl:function(d,s){if(d.url){return d.url+(d.url.indexOf('?')>0?'&':'?')+'sap-system='+s;}},_oDataResultFormatter:function(r,s,e,l){var f={};var R={};if(e==""){R={id:"root",text:"root",level:0,folders:[],apps:[]};f.root=R;}else{R={id:e,folders:[],apps:[]};f[e]=R;}var o;for(var i=0;i<r.length;i++){o=r[i];var p;if(o.parentId==""&&o.level=="01"){p=f["root"]}else{p=f[o.parentId];}var m={id:o.Id,text:o.text,level:parseInt(o.level,10)};if(o.type=='FL'){m.folders=[];m.apps=[];if(o.level==l-1){m.folders=undefined;m.apps=undefined;}if(p&&p.folders){p.folders.push(m);}f[o.Id]=m;}else{m.url=this._appendSystemToUrl(o,s);if(p&&p.apps){p.apps.push(m);}}}return R;},_getODataRequestUrl:function(m,s,e,l){var S;var M=this.getView().getModel();if(m=="SAP_MENU"){var o=M.getProperty("/sapMenuServiceUrl");if(o){S=o;}else{S=this.DEFAULT_URL+"/EASY_ACCESS_MENU";}}else if(m=="USER_MENU"){var u=M.getProperty("/userMenuServiceUrl");if(u){S=u;}else{S=this.DEFAULT_URL+"/USER_MENU";}}var L;if(l<10){L="0"+l;}else{L=l.toString();}var a="";if(e){if(decodeURIComponent(e)===e){e=encodeURIComponent(e);}a="('"+e+"')/AllChildren";}return S=S+";o="+s+"/MenuItems"+a+"?$filter=level lt '"+L+"'&$orderby=level,text";}});}());
