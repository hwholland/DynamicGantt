/*
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2016 SAP SE. All rights reserved
    
 */
sap.ui.define(["jquery.sap.global","./BaseController","./DraftController","sap/ui/generic/app/util/ModelUtil"],function(q,B,D,M){"use strict";var T=B.extend("sap.ui.generic.app.transaction.TransactionController",{metadata:{publicMethods:["destroy","setBatchStrategy","getDraftController","invokeAction","editEntity","deleteEntity","deleteEntities","propertyChanged","hasClientValidationErrors","resetChanges"]},constructor:function(m,Q,p){B.apply(this,[m,Q]);this.sName="sap.ui.generic.app.transaction.TransactionController";this._oDraft=null;p=p||{};if(!p.noBatchGroups){m.setDeferredGroups(["Changes"]);m.setChangeGroups({"*":{groupId:"Changes",changeSetId:"Changes",single:false}});}return this.getInterface();}});T.prototype.setBatchStrategy=function(s){var n,c=this._oModel.getChangeGroups();for(n in c){c[n].single=s;}this._oModel.setChangeGroups(c);};T.prototype.getDraftController=function(){if(!this._oDraft){this._oDraft=new D(this._oModel,this._oQueue);}return this._oDraft;};T.prototype.editEntity=function(c,p){var t=this;return new Promise(function(r){var d,e;d=t.getDraftController().getDraftContext();e=M.getEntitySetFromContext(c);if(d.isDraftEnabled(e)&&t._oDraftUtil.isActiveEntity(c.getObject())){return r(t.getDraftController().createEditDraftEntity(c,p));}return r({context:c});});};T.prototype.deleteEntity=function(e,p){var P,o,t=this,s,c;if(typeof e=="string"){s=e;}else if(typeof e=="object"&&e instanceof sap.ui.model.Context){c=e;s=c.getPath();}p=p||{};q.extend(p,{batchGroupId:"Changes",changeSetId:"Changes",successMsg:"Changes were discarded",failedMsg:"Discarding of changes failed",forceSubmit:true,context:c});P=this._remove(s,p).then(function(r){return t._normalizeResponse(r,true);},function(r){var R=t._normalizeError(r);throw R;});o=this.triggerSubmitChanges(p);return this._returnPromiseAll([P,o]);};T.prototype.deleteEntities=function(e,p){var P,t=this,s,c,I;var d=[];var S=function(r){d.push(t._normalizeResponse(r,true));};var E=function(r){var R=t._normalizeError(r);throw R;};p=p||{};q.extend(p,{batchGroupId:"Changes",changeSetId:"Changes",successMsg:"Changes were discarded",failedMsg:"Discarding of changes failed",forceSubmit:true,context:c});for(var i=0;i<e.length;i++){I=p;if(typeof e[i]=="string"){s=e[i];}else if(typeof e[i]=="object"&&e[i]instanceof sap.ui.model.Context){c=e[i];s=c.getPath();}this._syncRemove(s,I,S,E);}P=this.triggerSubmitChanges(p);return P.then(function(r){return d;});};T.prototype.invokeAction=function(f,c,p){var t=this,P,o;P=this.hasClientMessages();if(P){return P;}p={batchGroupId:"Changes",changeSetId:"Changes",successMsg:"Call of action succeeded",failedMsg:"Call of action failed",urlParameters:p.urlParameters,forceSubmit:true,context:c};P=this._callAction(f,c,p).then(function(r){return t._normalizeResponse(r,true);},function(r){var O=t._normalizeError(r);throw O;});this._oModel.refresh(true,false,"Changes");o=this.triggerSubmitChanges(p);return this._returnPromiseAll([P,o]);};T.prototype.resetChanges=function(k){this._oModel.resetChanges(k);};T.prototype.propertyChanged=function(e,p,b){var d,c,P={batchGroupId:"Changes",changeSetId:"Changes",binding:b};d=this.getDraftController().getDraftContext();if(d.checkUpdateOnChange(e,p)){c=b.getBoundContext();if(d.hasDraftPreparationAction(c)){return this.getDraftController().saveAndPrepareDraftEntity(c,P);}P.onlyIfPending=true;return this.triggerSubmitChanges(P);}P.onlyIfPending=true;P.noShowResponse=true;P.noBlockUI=true;return this.triggerSubmitChanges(P);};T.prototype.destroy=function(){B.prototype.destroy.apply(this,[]);if(this._oDraft){this._oDraft.destroy();}this._oDraft=null;};return T;},true);
