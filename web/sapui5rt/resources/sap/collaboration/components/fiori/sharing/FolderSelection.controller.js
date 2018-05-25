/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2017 SAP SE. All rights reserved
 */
sap.ui.controller("sap.collaboration.components.fiori.sharing.FolderSelection",{constants:{top:20},onInit:function(){this.oLangBundle=this.getView().getViewData().languageBundle;this.oODataModel=this.getView().getViewData().oDataModel;this.oODataUtil=this.getView().getViewData().oDataUtil;this.sGroupId=this.getView().getViewData().groupId;this.oFolderSelectionDialog=this.getView().getViewData().folderSelectionDialog;this.sCurrentFolderId='';this.aFolderBuffer=[];},onBeforeRendering:function(){this.refreshFolderSelection(this.sCurrentFolderId);},onAfterRendering:function(){},refreshFolderSelection:function(c){var f=this.buildFolderList(c);this.setViewModel(f);this.bindFoldersList();this.refreshHeaderBar(c);},buildFolderList:function(f){var s=[];var F=this.getFolder(f);s=this.getSubFolders(F);if(F.subFolderCount>s.length){var d=F.subFolderCount-s.length;for(var i=0;i<d;i++){s.push({});}}return s;},setViewModel:function(f){this.oViewData={folders:f};this.oViewModel=new sap.ui.model.json.JSONModel(this.oViewData);this.getView().setModel(this.oViewModel);},bindFoldersList:function(){var s=this;var i=new sap.m.StandardListItem({title:"{name}",icon:"{icon}",type:sap.m.ListType.Navigation,press:s.selectFolder()});this.getView().oFoldersList.bindAggregation("items","/folders",i);},refreshHeaderBar:function(f){if(!f==""){var F=this.getFolder(f);this.setFolderSelectionDialogTitle(F.name);this.setFolderSelectionDialogBackButtonVisibility(true);}else{this.setFolderSelectionDialogTitle(this.oLangBundle.getText("TARGET_FOLDER_FIELD_TEXT"));this.setFolderSelectionDialogBackButtonVisibility(false);}},selectFolder:function(e){var s=this;return function(e){var f=e.oSource.getBindingContext().getObject().id;s.refreshFolderSelection(f);s.sCurrentFolderId=f;};},navigateBack:function(e){var c=this.getFolder(this.sCurrentFolderId);var p=c.parent;this.refreshFolderSelection(p);this.sCurrentFolderId=p;},setFolderSelectionDialogTitle:function(f){var h=this.oFolderSelectionDialog.getCustomHeader();var t=h.getContentMiddle()[0];t.setText(f);},setFolderSelectionDialogBackButtonVisibility:function(i){var h=this.oFolderSelectionDialog.getCustomHeader();var b=h.getContentLeft()[0];b.setVisible(i);},getCurrentFolder:function(){if(this.sCurrentFolderId===''){return{name:this.oLangBundle.getText("TARGET_FOLDER_FIELD_TEXT"),id:""};}return this.getFolder(this.sCurrentFolderId);},updateStarted:function(c){if(c.mParameters.reason=='Growing'){var s=[];var f=this.getFolderFromBuffer(this.sCurrentFolderId);var a=this.getSubFoldersFromBuffer(this.sCurrentFolderId).length;if(f.subFolderCount!=a){s=this.fetchSubFolders(this.sCurrentFolderId,a);}if(s.length>0){this.addFoldersToBuffer(s);for(var i=0;i<s.length;i++){this.oViewData.folders[i+a]=s[i];}}}},addFoldersToBuffer:function(f){if(!this.aFolderBuffer){this.aFolderBuffer=[];}for(var i=0;i<f.length;i++){this.aFolderBuffer.push(f[i]);}},getSubFoldersFromBuffer:function(f){var i='';if(f){i=f;}var h=function(a){return a.parent==i;};return this.aFolderBuffer.filter(h);},getFolderFromBuffer:function(f){var h=function(a){return a.id==f;};var F=this.aFolderBuffer.filter(h);return F[0];},getFolder:function(f){var a=this.getFolderFromBuffer(f);if(!a&&f==''){var r=this.oODataUtil.getSubFolders(this.oODataModel,this.sGroupId,null,'0',this.constants.top);a={name:this.oLangBundle.getText("TARGET_FOLDER_FIELD_TEXT"),id:'',parent:'0',subFolderCount:r.count,icon:"sap-icon://folder"};this.addFoldersToBuffer([a]);var s=this.convertFolderEntities(r.folders,'');this.addFoldersToBuffer(s);}if(a.subFolderCount==undefined){var r=this.oODataUtil.getSubFolders(this.oODataModel,null,f,'0',this.constants.top);a.subFolderCount=r.count;var s=this.convertFolderEntities(r.folders,f);this.addFoldersToBuffer(s);}return a;},getSubFolders:function(f){var s=[];if(f.subFolderCount>0){s=this.getSubFoldersFromBuffer(f.id);}return s;},convertFolderEntities:function(f,p){var c=[];for(var i=0;i<f.length;i++){c.push({name:f[i].Name,id:f[i].Id,parent:p,icon:"sap-icon://folder"});}return c;},fetchSubFolders:function(f,s){var S=[];if(!f||f==''){S=this.oODataUtil.getSubFolders(this.oODataModel,this.sGroupId,null,s,this.constants.top).folders;S=this.convertFolderEntities(S,'');}else{S=this.oODataUtil.getSubFolders(this.oODataModel,null,f,s,this.constants.top).folders;S=this.convertFolderEntities(S,f);}return S;},clearFolderBuffer:function(){this.oFolderSelectionDialog.getContent()[0].getController().clearFolderBuffer();}});
