/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2016 SAP SE. All rights reserved
 */
sap.ui.define(['sap/ui/rta/controlAnalyzer/Base','sap/ui/rta/Utils','sap/ui/dt/ElementUtil','sap/ui/rta/ModelConverter','sap/ui/comp/odata/MetadataAnalyser','sap/ui/rta/model/ElementPreprocessor'],function(B,U,E,M,a,b){"use strict";var S=B.extend("sap.ui.rta.controlAnalyzer.SmartForm",{metadata:{library:"sap.ui.rta",properties:{customFieldAvailable:{type:"object",defaultValue:false}}}});S.rules={};S.rules["EXCLUDEVISIBLERULE"]="excludeVisibleElements";S.rules["EXCLUDEIGNOREDFIELDS"]="excludeIgnoredFields";S.prototype.init=function(){var t=this;this._mVisibleAndBoundFields;this._mRegisteredRules={};this._mRegisteredRules[S.rules.EXCLUDEVISIBLERULE]=function(e){if(!t._mVisibleAndBoundFields){t._mVisibleAndBoundFields=t.findBoundFields(false);}return t._retrieveElementFromMap(t._mVisibleAndBoundFields,e);};this._mRegisteredRules[S.rules.EXCLUDEIGNOREDFIELDS]=function(e){var i=t._getIgnoredFields();if(e.isComplexProperty){return i.indexOf(e.complexTypePropertyName+"."+e.name)!==-1;}return i.indexOf(e.name)!==-1;};};S.prototype.setControl=function(c){var s=U.getClosestTypeForControl(c,"sap.ui.comp.smartform.SmartForm");this.setProperty("control",s,true);this.setProperty("selectedControl",c,true);};S.prototype.getFlexChangeType=function(t,e){var f;switch(t){case"Move":if(E.isInstanceOf(e,"sap.ui.comp.smartform.SmartForm")){f="moveGroups";}else if(E.isInstanceOf(e,"sap.ui.comp.smartform.Group")){f="moveFields";}break;case"Add":if(E.isInstanceOf(e,"sap.ui.comp.smartform.SmartForm")){f="addGroup";}else if(E.isInstanceOf(e,"sap.ui.comp.smartform.Group")){f="addFields";}break;case"Rename":if(E.isInstanceOf(e,"sap.ui.comp.smartform.SmartForm")){f="renameField";}else if(E.isInstanceOf(e,"sap.ui.comp.smartform.Group")){f="renameGroup";}else if(E.isInstanceOf(e,"sap.ui.comp.smartform.GroupElement")){f="renameField";}break;default:break;}return f;};S.prototype.mapSpecificChangeData=function(t,s){var r;switch(t){case"Move":r=this._mapMoveSpecificChangeData(t,s);break;case"Add":r=this._mapAddSpecificChangeData(t,s);break;case"Rename":r=this._mapRenameSpecificChangeData(t,s);break;default:r=this.prototype.mapSpecificChangeData(t,s);break;}return r;};S.prototype.getLabel=function(e){if(E.isInstanceOf(e,"sap.ui.comp.smartform.SmartForm")){return e.getTitle();}else if(E.isInstanceOf(e,"sap.ui.comp.smartform.Group")){return e.getLabel();}else if(E.isInstanceOf(e,"sap.ui.comp.smartform.GroupElement")){return e.getLabelText();}};S.prototype.getLabelBinding=function(e){if(E.isInstanceOf(e,"sap.ui.comp.smartform.SmartForm")){return e.getBindingInfo("title");}else if(E.isInstanceOf(e,"sap.ui.comp.smartform.Group")||E.isInstanceOf(e,"sap.ui.comp.smartform.GroupElement")){return e.getBindingInfo("label");}};S.prototype.resumeLabelBinding=function(e){if(E.isInstanceOf(e,"sap.ui.comp.smartform.SmartForm")){var o=e.getBinding("title");if(o){o.resume();}}else if(E.isInstanceOf(e,"sap.ui.comp.smartform.Group")||E.isInstanceOf(e,"sap.ui.comp.smartform.GroupElement")){var o=e.getBinding("label");if(o){o.resume();}}};S.prototype._mapMoveSpecificChangeData=function(t,s){var c=s.source.id;var T=s.target.id;var C={changeType:s.changeType,selector:{id:c},targetId:T!==c?T:null};C[s.changeType]=[];s.movedElements.forEach(function(m){C[s.changeType].push({id:m.id,index:m.targetIndex});});return C;};S.prototype._mapAddSpecificChangeData=function(t,s){if(s.changeType==="addFields"){s.fieldLabels=s.labels;delete s.labels;}else if(s.changeType==="addGroup"){s.groupLabel=s.labels[0];delete s.labels;}return s;};S.prototype._mapRenameSpecificChangeData=function(t,s){var e=s.element;if(E.isInstanceOf(e,"sap.ui.comp.smartform.SmartForm")){s.fieldLabel=s.value;s.labelProperty="title";}else if(E.isInstanceOf(e,"sap.ui.comp.smartform.Group")){s.groupLabel=s.value;}else if(E.isInstanceOf(e,"sap.ui.comp.smartform.GroupElement")){s.fieldLabel=s.value;s.labelProperty="label";}delete s.value;delete s.element;return s;};S.prototype.getSelectedBlock=function(c){return U.findSupportedBlock(c,["sap.ui.comp.smartform.Group"]);};S.prototype.getClosestType=function(c){return U.getClosestTypeForControl(c,"sap.ui.comp.smartform.SmartForm");};S.prototype.createChangeData=function(c,C,h,s){var m={};var o=c.getBindingContext().getObject();var d=o.controlId?o.controlId:C.getId()+"_"+o.entityName+"_"+o.name;var e=sap.ui.getCore().byId(d);var f=!!e;var g=function(){if(f){m={controlId:d,changeType:h?"hideControl":"unhideControl"};}else{var i=o.complexTypePropertyName?o.complexTypePropertyName+"/"+o.name:o.name;if(C){var G;if(C instanceof sap.ui.comp.smartform.Group){G=C;}else{G=C.getGroups()[0];}var j=G.getGroupElements();var t=U.determineTargetIndex(s,C,j,-1);m={unhide:f,newControlId:d,jsType:"sap.ui.comp.smartfield.SmartField",selectorId:G.getId(),index:t,valueProperty:"value",changeType:"addField",fieldLabel:o.fieldLabel,fieldValue:i};}}return m;};if(h&&!U.isElementHideable(e)){return U.openHideElementConfirmationDialog(e).then(function(i){if(i){return g();}else{return null;}});}else{return new Promise(function(r,i){r(g());});}};S.prototype.findChangedFieldLabels=function(){if(!this._mFieldsAndLabelNames){this._mFieldsAndLabelNames=this._findChangedFieldLabels();}return this._mFieldsAndLabelNames;};S.prototype._findChangedFieldLabels=function(){var f={};var i=this.findBoundFields(true);var v=this.findBoundFields(false);var A=jQuery.extend({},i,v);for(var p in A){var F=sap.ui.getCore().byId(A[p]);var t=U.getLabelForElement(F);f[p]=t;}return f;};S.prototype.findBoundFields=function(o){var s=this.getControl();var g=s.getGroups();var f={elementIds:{},boundFields:{}};var i,j,k=0;for(i=0;i<g.length;i++){var e=g[i].getGroupElements();for(j=0;j<e.length;j++){var F=e[j];var c=F.getFields();for(k=0;k<c.length;k++){var d=c[k];if(d.mBindingInfos){for(var I in d.mBindingInfos){var p=U.getPathFromBindingInfo(I,d.mBindingInfos);var P=d.getParent();if(P&&p){if(o&&!d.getDomRef()){this._addBoundFields(f,p,d);continue;}if(d.getDomRef()&&d.getVisible()&&!o){this._addBoundFields(f,p,d);}}}}}}}return f.boundFields;};S.prototype._addBoundFields=function(f,p,F){var P=F.getParent();if(f.boundFields[p]){if(P.getFields().length===1){f.boundFields[p]=P.getId();}else if(f.elementIds[F.getId()]&&f.elementIds[F.getId()].getFields()===1){f.boundFields[p]=P.getId();}}else{f.boundFields[p]=P.getId();}f.elementIds[F.getId()]=P;};S.prototype._prepareCustomFields=function(){var t=this;return U.isCustomFieldAvailable(this.getControl()).then(function(r){if(r){t.setCustomFieldAvailable(r);}return r;});};S.prototype._getIgnoredFields=function(){var s=this.getControl();if(s){var c=s.getIgnoredFields();if(c){var i=c.split(",");return i;}}return[];};S.prototype.getCustomFieldAvailable=function(){if(!this.getPrepared()){this._raiseIllegalState();}return this.getProperty("customFieldAvailable");};S.prototype.getCustomizeControlModel=function(c,f){var C=this.getClosestType(c);var e=C.getEntityType();if(e){e=e.replace(/\s+/g,'').match(/([^,]+)/g);}if(!f){return M.getConvertedModelWithBoundAndRenamedLabels(C,e,this);}else{return M.getConvertedModelWithBoundAndRenamedLabels(C,e,this).then(function(d){return d.filter(function(m){return!m.checked;});});}};S.prototype.prepare=function(){if(!this.getPrepared()){var f=this._getFieldFetcherPromise();var i=this._prepareCustomFields();return Promise.all([f,i]);}else{return new Promise().resolve();}};S.prototype._getFieldFetcherPromise=function(){var t=this;return U.fetchODataPropertiesFor(this.getControl().getModel()).then(function(p){var e=t.getBoundEntityType();Object.keys(p).forEach(function(k){p[k].forEach(function(o){var c=t._applyChanges(o);var f=t._applyRules(c);if(!f&&c.entityName===e){t._mAvailableElements[c.name]=c;}else{t._mHiddenElements[c.name]=c;}});});sap.ui.rta.controlAnalyzer.Base.prototype.prepare.apply(t);});};S.prototype._applyRules=function(e){var f=this._getRules();var F=false;for(var r in f){var R=f[r];if(R(e)){F=true;break;}}return F;};S.prototype._applyChanges=function(e){var c=e;var f=this._getChanges();f.forEach(function(C){c=C(c);});return c;};S.prototype._getRules=function(){return this._mRegisteredRules;};S.prototype.getBoundEntityType=function(){var c=this.getSelectedControl();var C;if(c.getBindingContext()){C=c.getBindingContext().sPath;}if(E.isInstanceOf(c,"sap.ui.comp.smartform.GroupElement")){var p=c.getParent();if(p.getBindingContext()){C=p.getBindingContext().sPath;}}if(C&&c.getModel()){var m=c.getModel().getMetaModel();var e=m.oMetadata._getEntityTypeByPath(C);return e.name;}};S.prototype._retrieveElementFromMap=function(e,o){var r;if(o.isComplexProperty){r=e[o.complexTypePropertyName+"/"+o.name];}else{r=e[o.name];}return r;};S.prototype._getChanges=function(){var t=this;return[function(e){var c=t.findChangedFieldLabels(e);var C=t._retrieveElementFromMap(c,e);if(C){e["fieldLabel"]=C;}return e;},function(e){var c;if(!t._mBoundFields){t._mBoundFields=t.findBoundFields(true);}if(e.isComplexProperty){c=t._mBoundFields[e.complexTypePropertyName+"/"+e.name];}else{c=t._mBoundFields[e.name];}if(c){e["controlId"]=c;}return e;}];};S.prototype.checkTargetZone=function(p,A,m){var s=E.getClosestElementOfType(m,"sap.ui.comp.smartform.SmartForm");var t=E.getClosestElementOfType(p,"sap.ui.comp.smartform.SmartForm");if(s===t){return true;}};return S;},true);
