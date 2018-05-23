/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2016 SAP SE. All rights reserved
 */
jQuery.sap.declare("sap.uiext.inbox.splitapp.MasterPageController");sap.ui.base.Object.extend("sap.uiext.inbox.splitapp.MasterPageController",{constructor:function(){sap.ui.base.Object.apply(this);}});
sap.uiext.inbox.splitapp.MasterPageController.prototype._selectDetail=function(){var l=sap.ui.getCore().byId(this.Id+"-list");var i=l.getItems();if(!jQuery.device.is.phone&&i.length>0&&!l.getSelectedItem()){l.setSelectedItem(i[0],true);this._showDetail(i[0]);}};
sap.uiext.inbox.splitapp.MasterPageController.prototype.handleSearch=function(e,m){m._updateList();};
sap.uiext.inbox.splitapp.MasterPageController.prototype._updateList=function(){var t=this;var f=new Array();var s=sap.ui.getCore().byId(t.Id+"-searchFld").getValue();if(s&&s.length>0){f.push(new sap.ui.model.Filter("TaskTitle",sap.ui.model.FilterOperator.Contains,s));}f=f.concat(t.oSplitAppObj.filters);var l=sap.ui.getCore().byId(t.Id+"-list");var S=l.getSelectedItem();var b=l.getBinding("items");b.filter(f);if(f.length==0){l.setSelectedItem(S,true);}};
sap.uiext.inbox.splitapp.MasterPageController.prototype.handleListSelect=function(e,t){var m=sap.ui.getCore().byId(t.Id+"-list");var _=m.mBindingInfos.items.binding.iLength;t.masterPage.setTitle(t._oBundle.getText("INBOX_LP_TASKS_AND_COUNT",[_]));var i=m.getItems();if(i.length>0&&!m.getSelectedItem()){m.setSelectedItem(i[0],true);}var s=m.getSelectedItem();var c=s.getBindingContext();var d=t.oSplitAppObj.oInboxDetailPage.detailViewPage;d.setBindingContext(c);var a=t.oSplitAppObj.getAggregation('splitAppl');if(d.getId()==a.getCurrentPage().getId()){t.oSplitAppObj.oInboxDetailPage.renderDetailsPage();}else{var T=t.oSplitAppObj._oTaskExecutionUIPageObj;if(!T){jQuery.sap.require("sap.uiext.inbox.splitapp.TaskExecutionUIPage");T=new sap.uiext.inbox.splitapp.TaskExecutionUIPage(t.oSplitAppObj.getId()+"-exUi");t.oSplitAppObj.app.addPage(T.oTaskExecutionUIPage);T._oParentSplitAppObj=t.oSplitAppObj;t.oSplitAppObj._oTaskExecutionUIPageObj=T;}T.oTaskExecutionUIPage.setBindingContext(c);T.open();}};
sap.uiext.inbox.splitapp.MasterPageController.prototype._openManageSubstitutionOverlay=function(e,t){var s=sap.ui.getCore().byId(t.Id+'--'+'substitutionRulesManager');if(s===undefined){jQuery.sap.require("sap.uiext.inbox.SubstitutionRulesManager");s=new sap.uiext.inbox.SubstitutionRulesManager(t.Id+'--'+'substitutionRulesManager');s.setParent(t.oSplitAppObj._oLaunchPad);}if(s.getModel()===undefined){var m=sap.ui.getCore().getModel();var n=new sap.ui.model.odata.ODataModel(m.sServiceUrl,true);n.oHeaders["x-csrf-token"]=m.oHeaders["x-csrf-token"];s.setModel(n);}jQuery.sap.require("sap.uiext.inbox.tcm.TCMModel");s.oTCMModel=new sap.uiext.inbox.tcm.TCMModel();s.open();};
sap.uiext.inbox.splitapp.MasterPageController.prototype._refreshTasks=function(e,t){if(!t.oTaskData){t.oCoreModel=sap.ui.getCore().getModel();t.oCoreModel.read("/TaskCollection?$filter=Status ne 'COMPLETED'&$orderby=CreatedOn desc",null,null,true,function(d,r){t.oTaskData=d.results;t._updateModel(t);},function(E){sap.m.MessageToast.show(t._oBundle.getText("INBOX_LP_MSG_FAILED_TO_READ_SERVICE_WHILE_REFRESH"));});}};
sap.uiext.inbox.splitapp.MasterPageController.prototype._updateModel=function(t){var j=t.masterPage.getModel();var a={"TaskCollection":t.oTaskData};j.setData(a);t.oSplitAppObj._setModel(j,t.oSplitAppObj.filters);};
sap.uiext.inbox.splitapp.MasterPageController.prototype._rerenderTask=function(t){var a=t.Status=="COMPLETED"?true:false;var m=sap.ui.getCore().byId(this.Id+"-list");var s=m.getSelectedItem();var p=s.getBindingContext().getPath();var P=p.split("/");if(a){this.masterPage.getModel().oData.TaskCollection.splice(P[2],1);}else{this.masterPage.getModel().oData.TaskCollection[P[2]]=t;}this.masterPage.getModel().checkUpdate(false);};
