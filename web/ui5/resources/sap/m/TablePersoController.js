/*
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./TablePersoDialog','sap/ui/base/ManagedObject'],function(q,T,M){"use strict";var d=M.extend("sap.m.TablePersoController",{constructor:function(i,s){M.apply(this,arguments);},metadata:{properties:{"contentWidth":{type:"sap.ui.core.CSSSize"},"contentHeight":{type:"sap.ui.core.CSSSize",defaultValue:"20rem",since:"1.22"},"componentName":{type:"string",since:"1.20.2"},"hasGrouping":{type:"boolean",defaultValue:false,since:"1.22"},"showSelectAll":{type:"boolean",defaultValue:true,since:"1.22"},"showResetAll":{type:"boolean",defaultValue:true,since:"1.22"}},aggregations:{"_tablePersoDialog":{type:"sap.m.TablePersoDialog",multiple:false,visibility:"hidden"},"persoService":{type:"Object",multiple:false}},associations:{"table":{type:"sap.m.Table",multiple:false},"tables":{type:"sap.m.Table",multiple:true}},events:{personalizationsDone:{}},library:"sap.m"}});d.prototype.init=function(){this._schemaProperty="_persoSchemaVersion";this._schemaVersion="1.0";this._oPersonalizations=null;this._mDelegateMap={};this._mTablePersMap={};this._mInitialTableStateMap={};this._triggersPersDoneEvent=true;};d.prototype.exit=function(){this._callFunctionForAllTables(q.proxy(function(t){t.removeDelegate(this._mDelegateMap[t]);},this));delete this._mDelegateMap;delete this._mTablePersMap;delete this._mInitialTableStateMap;};d.prototype.activate=function(){this._callFunctionForAllTables(this._rememberInitialTableStates);this._callFunctionForAllTables(this._createAndAddDelegateForTable);return this;};d.prototype.getTablePersoDialog=function(){return this.getAggregation("_tablePersoDialog");};d.prototype.applyPersonalizations=function(t){var r=this.getPersoService().getPersData();var a=this;r.done(function(p){if(p){a._adjustTable(p,t);}});r.fail(function(){q.sap.log.error("Problem reading persisted personalization data.");});};d.prototype._createAndAddDelegateForTable=function(t){if(!this._mDelegateMap[t]){var o={onBeforeRendering:q.proxy(function(){this.applyPersonalizations(t);if(!this.getAggregation("_tablePersoDialog")){this._createTablePersoDialog(t);}},this)};t.addDelegate(o);this._mDelegateMap[t]=o;}};d.prototype._createTablePersoDialog=function(t){var o=new T(t.getId()+"-PersoDialog",{persoDialogFor:t,persoMap:this._getPersoColumnMap(t),columnInfoCallback:this._tableColumnInfo.bind(this),initialColumnState:this._mInitialTableStateMap[t],contentWidth:this.getContentWidth(),contentHeight:this.getContentHeight(),hasGrouping:this.getHasGrouping(),showSelectAll:this.getShowSelectAll(),showResetAll:this.getShowResetAll()});this.setAggregation("_tablePersoDialog",o);o.attachConfirm(q.proxy(function(){this._oPersonalizations=o.retrievePersonalizations();this._callFunctionForAllTables(this._personalizeTable);this.savePersonalizations();this.firePersonalizationsDone();},this));};d.prototype._adjustTable=function(D,t){if(D&&D.hasOwnProperty(this._schemaProperty)&&D[this._schemaProperty]===this._schemaVersion){this._oPersonalizations=D;if(t){this._personalizeTable(t);}else{this._callFunctionForAllTables(this._personalizeTable);}}};d.prototype._personalizeTable=function(t){var p=this._getPersoColumnMap(t);if(!!p&&!!this._oPersonalizations){var D=false;for(var c=0,a=this._oPersonalizations.aColumns.length;c<a;c++){var n=this._oPersonalizations.aColumns[c];var o=p[n.id];if(!o){o=sap.ui.getCore().byId(n.id);if(o){q.sap.log.info("Migrating personalization persistence id of column "+n.id);n.id=p[o];D=true;}}if(o){o.setVisible(n.visible);o.setOrder(n.order);}else{q.sap.log.warning("Personalization could not be applied to column "+n.id+" - not found!");}}if(D){this.savePersonalizations();}t.invalidate();}};d.prototype.savePersonalizations=function(){var b=this._oPersonalizations;b[this._schemaProperty]=this._schemaVersion;var w=this.getPersoService().setPersData(b);w.done(function(){});w.fail(function(){q.sap.log.error("Problem persisting personalization data.");});};d.prototype.refresh=function(){var r=function(o){this._mTablePersMap={};o.invalidate();};this._callFunctionForAllTables(r);var t=this.getAggregation("_tablePersoDialog");if(t){t.setPersoMap(this._getPersoColumnMap(sap.ui.getCore().byId(t.getPersoDialogFor())));}};d.prototype.openDialog=function(){var t=this.getAggregation("_tablePersoDialog");if(t){q.sap.syncStyleClass("sapUiSizeCompact",t.getPersoDialogFor(),t._oDialog);t.open();}else{q.sap.log.warning("sap.m.TablePersoController: trying to open TablePersoDialog before TablePersoService has been activated.");}};d.prototype.setContentWidth=function(w){this.setProperty("contentWidth",w,true);var t=this.getAggregation("_tablePersoDialog");if(t){t.setContentWidth(w);}return this;};d.prototype.setContentHeight=function(h){this.setProperty("contentHeight",h,true);var t=this.getAggregation("_tablePersoDialog");if(t){t.setContentHeight(h);}return this;};d.prototype.setHasGrouping=function(h){this.setProperty("hasGrouping",h,true);var t=this.getAggregation("_tablePersoDialog");if(t){t.setHasGrouping(h);}return this;};d.prototype.setShowSelectAll=function(s){this.setProperty("showSelectAll",s,true);var t=this.getAggregation("_tablePersoDialog");if(t){t.setShowSelectAll(s);}return this;};d.prototype.setShowResetAll=function(s){this.setProperty("showResetAll",s,true);var t=this.getAggregation("_tablePersoDialog");if(t){t.setShowResetAll(s);}return this;};d.prototype.setComponentName=function(c){this.setProperty("componentName",c,true);return this;};d.prototype._getMyComponentName=function(c){if(this.getComponentName()){return this.getComponentName();}if(c===null){return"empty_component";}var m=c.getMetadata();if(c.getMetadata().getStereotype()==="component"){return m._sComponentName;}return this._getMyComponentName(c.getParent());};d.prototype._callFunctionForAllTables=function(t){var o=sap.ui.getCore().byId(this.getAssociation("table"));if(o){t.call(this,o);}var a=this.getAssociation("tables");if(a){for(var i=0,l=this.getAssociation("tables").length;i<l;i++){o=sap.ui.getCore().byId(this.getAssociation("tables")[i]);t.call(this,o);}}};d.prototype._isStatic=function(i){var u=sap.ui.getCore().getConfiguration().getUIDPrefix();var r=new RegExp("^"+u);return!r.test(i);};d.prototype._getPersoColumnMap=function(t){var r=this._mTablePersMap[t];if(!r){r={};var e=function(i){var l=i.lastIndexOf("-");return i.substring(l+1);};var s=e.call(this,t.getId());if(!this._isStatic(s)){q.sap.log.error("Table "+t.getId()+" must have a static id suffix. Otherwise personalization can not be persisted.");r=null;return null;}var n;var c=this._getMyComponentName(t);var a=this;t.getColumns().forEach(function(N){if(r){var b=N.getId();var f=e.call(a,b);if(!a._isStatic(f)){q.sap.log.error("Suffix "+f+" of table column "+b+" must be static. Otherwise personalization can not be persisted for its table.");r=null;return null;}n=c+"-"+s+"-"+f;r[N]=n;r[n]=N;}});this._mTablePersMap[t]=r;}return r;};d.prototype._rememberInitialTableStates=function(t){this._mInitialTableStateMap[t]=this._tableColumnInfo(t,this._getPersoColumnMap(t));};d.prototype._tableColumnInfo=function(t,p){if(p){var c=t.getColumns(),C=[],P=this.getPersoService();c.forEach(function(o){var s=null;if(P.getCaption){s=P.getCaption(o);}var g=null;if(P.getGroup){g=P.getGroup(o);}if(!s){var a=o.getHeader();if(a.getText&&a.getText()){s=a.getText();}else if(a.getTitle&&a.getTitle()){s=a.getTitle();}if(!s){s=o.getId();q.sap.log.warning("Please 'getCaption' callback implentation in your TablePersoProvider for column "+o+". Table personalization uses column id as fallback value.");}}C.push({text:s,order:o.getOrder(),visible:o.getVisible(),id:p[o],group:g});});C.sort(function(a,b){return a.order-b.order;});return C;}return null;};return d;});
