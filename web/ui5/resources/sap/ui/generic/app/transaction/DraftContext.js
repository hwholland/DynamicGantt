/*
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2016 SAP SE. All rights reserved
    
 */
sap.ui.define(["jquery.sap.global","sap/ui/base/Object","sap/ui/generic/app/util/ModelUtil"],function(q,B,M){"use strict";var D=B.extend("sap.ui.generic.app.transaction.DraftContext",{metadata:{publicMethods:["isDraftEnabled","isDraftRoot","hasDraft","hasDraftRoot","hasDraftValidationFunction","hasDraftPreparationAction","isTechnicalKey","isSemanticKey","getSemanticKey","checkUpdateOnChange","getODataDraftFunctionImportName","hasDraftAdministrativeData","hasSiblingEntity","destroy","hasPreserveChanges"]},constructor:function(m){if(!m){throw new Error("No model");}this._oModel=m;this._oMeta=m.getMetaModel();this._oModelUtil=new M(m);return this.getInterface();}});D.prototype.isDraftEnabled=function(e){var d=this._getODataDraftEntitySet(e);return!!(d&&d.isDraft);};D.prototype.isDraftRoot=function(e){var d=this._getODataDraftEntitySet(e);return!!(d&&d.isRoot);};D.prototype.hasDraft=function(c){var e=M.getEntitySetFromContext(c);return this.isDraftEnabled(e);};D.prototype.hasDraftRoot=function(c){var e=M.getEntitySetFromContext(c);return this.isDraftRoot(e);};D.prototype.hasDraftValidationFunction=function(c){return!!this.getODataDraftFunctionImportName(c,"ValidationFunction");};D.prototype.hasDraftPreparationAction=function(c){return!!this.getODataDraftFunctionImportName(c,"PreparationAction");};D.prototype.isTechnicalKey=function(e,k){var E,o,K,i,s;if(!e){throw new Error("No entity set");}E=this._oMeta.getODataEntitySet(e);o=this._oMeta.getODataEntityType(E.entityType);K=o.key.propertyRef.length;if(Object.keys(k).length!==K){return false;}for(i=0;i<K;i++){s=o.key.propertyRef[i].name;if(!k[s]){return false;}}return true;};D.prototype.isSemanticKey=function(e,k){var s,i,l;if(this.isDraftEnabled(e)){s=this.getSemanticKey(e);l=s.length;for(i=0;i<l;i++){if(!k[s[i].name]){return false;}}return true;}return false;};D.prototype.getSemanticKey=function(e){var E,o,s,S=[],i,l;if(!e){throw new Error("No entity set");}E=this._oMeta.getODataEntitySet(e);o=this._oMeta.getODataEntityType(E.entityType);s=o["com.sap.vocabularies.Common.v1.SemanticKey"];if(s){l=s.length;for(i=0;i<l;i++){S.push({name:s[i].PropertyPath});}}return S;};D.prototype.getODataDraftFunctionImportName=function(c,d){var e,o;e=M.getEntitySetFromContext(c);o=this._getODataDraftEntitySet(e);if(o.oDraft[d]&&o.oDraft[d].String){return o.oDraft[d].String;}return null;};D.prototype._getODataDraftEntitySet=function(e){var o={},E;if(!e){throw new Error("No entity set");}E=this._oMeta.getODataEntitySet(e);o.ODataEntitySet=E;if(E["com.sap.vocabularies.Common.v1.DraftRoot"]){o.isDraft=true;o.isRoot=true;o.oDraft=E["com.sap.vocabularies.Common.v1.DraftRoot"];}else if(E["com.sap.vocabularies.Common.v1.DraftNode"]){o.isDraft=true;o.isRoot=false;o.oDraft=E["com.sap.vocabularies.Common.v1.DraftNode"];}return o;};D.prototype.hasDraftAdministrativeData=function(e){return this._hasNavigationProperty(e,"DraftAdministrativeData");};D.prototype.hasSiblingEntity=function(e){return this._hasNavigationProperty(e,"SiblingEntity");};D.prototype._hasNavigationProperty=function(e,n){var E,o,i,l;E=this._oMeta.getODataEntitySet(e);o=this._oMeta.getODataEntityType(E.entityType);if(o.navigationProperty){l=o.navigationProperty.length;for(i=0;i<l;i++){if(o.navigationProperty[i].name===n){return true;}}}return false;};D.prototype.checkUpdateOnChange=function(e,p){var P,E,s;if(!e){throw new Error("No entity set");}E=this._oMeta.getODataEntitySet(e);for(P in E){if(P.indexOf&&P.indexOf("com.sap.vocabularies.Common.v1.SideEffects")===0){s=E[P];if(s.SourceProperties&&s.SourceProperties.length){if(s.SourceProperties.length===1&&s.SourceProperties[0].PropertyPath){if(s.SourceProperties[0].PropertyPath===p){return true;}}}}}return false;};D.prototype.hasPreserveChanges=function(c){var e=this._oMeta.getODataFunctionImport(this.getODataDraftFunctionImportName(c,"EditAction"));if(e&&e.parameter){for(var i=0;i<e.parameter.length;i++){var p=e.parameter[i];if(p.mode==='In'&&p.name==="PreserveChanges"){return true;}}}return false;};D.prototype.destroy=function(){if(this._oModelUtil){this._oModelUtil.destroy();}this._oModelUtil=null;this._oModel=null;this._oMeta=null;};return D;},true);
