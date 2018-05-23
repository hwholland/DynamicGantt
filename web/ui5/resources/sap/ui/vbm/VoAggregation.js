/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5) (c) Copyright 2009-2012 SAP AG. All rights reserved
 */
sap.ui.define(['./VoAbstract','./library'],function(V,l){"use strict";var b=V.extend("sap.ui.vbm.VoAggregation",{metadata:{library:"sap.ui.vbm",properties:{minSel:{type:"string",group:"Misc",defaultValue:"0"},maxSel:{type:"string",group:"Misc",defaultValue:"n"},customProperties:{type:"string[]",group:"Misc"}},events:{handleMoved:{parameters:{instance:{type:"sap.ui.vbm.VoBase"},handle:{type:"int"}}},handleContextMenu:{parameters:{instance:{type:"sap.ui.vbm.VoBase"},menu:{type:"sap.ui.unified.Menu"},handle:{type:"int"}}},handleClick:{parameters:{instance:{type:"sap.ui.vbm.VoBase"},handle:{type:"int"}}},select:{parameters:{selected:{type:"array"}}},deselect:{parameters:{deselected:{type:"array"}}},click:{parameters:{instance:{type:"sap.ui.vbm.VoBase"}}},contextMenu:{parameters:{instance:{type:"sap.ui.vbm.VoBase"},menu:{type:"sap.ui.unified.Menu"}}},drop:{parameters:{instance:{type:"sap.ui.vbm.Spot"},dragSource:{type:"sap.ui.vbm.VoBase"}}}}}});b.prototype.init=function(){this.aDiff=[];this.aUniqueIdx=[];this.currentIdx=1000;this.setProperty("customProperties",[],true);this.bUseExtendedChangeDetection=true;};b.prototype.handleSelectEvent=function(e){var s=[];var d=[];for(var n=0;n<e.length;++n){var E=e[n];var v=this.getItems();if(v){for(var a=0,c=v.length;a<c;++a){if(v[a].UniqueId==E.K){var f=(E["VB:s"]=="true"?true:false);var m=v[a].getSelect();if(f!=m){if(f){v[a].setSelect(true);if(this.mEventRegistry["select"]){s.push(v[a]);}}else{v[a].setSelect(false);if(this.mEventRegistry["deselect"]){d.push(v[a]);}}}}}}}if(d.length){this.fireDeselect({deselected:d});}if(s.length){this.fireSelect({selected:s});}};b.prototype.isEventRegistered=function(n){var v=this.getItems();if(!v){return false;}for(var a=0,c=v.length;a<c;++a){var i=v[a];if(i.mEventRegistry[n]){return true;}}return false;};b.prototype.findSelected=function(s,d){var v=this.getItems();if(!v){return null;}var S=[];if(jQuery.type(d)=='object'){if(d["VB:s"]==(s?"true":"false")){for(var n=0;n<v.length;++n){if(v[n].UniqueId==d["K"]){S.push(v[n]);}}}}else if(jQuery.type(d)=='array'){for(var a=0;a<d.length;++a){if(d[a]["VB:s"]==(s?"true":"false")){for(var c=0;c<v.length;++c){if(v[c].UniqueId==d[a]["K"]){S.push(v[c]);}}}}}return S;};b.prototype.findInstance=function(n){var v=this.getItems();if(!v){return false;}var k=(n.indexOf(".")!==-1)?n.split(".")[1]:n;for(var a=0,c=this.aUniqueIdx.length;a<c;++a){if(this.aUniqueIdx[a]===k){return v[a];}}return null;};b.prototype.findInstanceByKey=function(n){var v=this.getItems();if(!v){return false;}var k=(n.indexOf(".")!==-1)?n.split(".")[1]:n;for(var a=0,c=v.length;a<c;++a){if(v[a].sId===k||v[a].getKey()===k){return v[a];}}return null;};b.prototype.getActionArray=function(){var i=this.getId();var a=[];if(this.mEventRegistry["handleMoved"]||this.isEventRegistered("handleMoved")){a.push({"id":i+"4","name":"handleMoved","refScene":"MainScene","refVO":i,"refEvent":"HandleMoved"});}if(this.mEventRegistry["handleContextMenu"]||this.isEventRegistered("handleContextMenu")){a.push({"id":i+"5","name":"handleContextMenu","refScene":"MainScene","refVO":i,"refEvent":"HandleContextMenu"});}if(this.mEventRegistry["handleClick"]||this.isEventRegistered("handleClick")){a.push({"id":i+"6","name":"handleClick","refScene":"MainScene","refVO":i,"refEvent":"HandleClick"});}var t;var s=((t=this.getTemplateBindingInfo()))?t.hasOwnProperty("select"):false;if((this.mEventRegistry["select"]||this.mEventRegistry["deselect"]||s)&&!this.isEventRegistered("click")){a.push({"id":i+"9","name":"click","refScene":"MainScene","refVO":i,"refEvent":"Click"});}return a;};b.prototype.getBindInfo=function(){var B=V.prototype.getBindInfo.apply(this,arguments);var t=this.getTemplateBindingInfo();B.HS=(t)?t.hasOwnProperty("hotScale"):true;B.HDC=(t)?t.hasOwnProperty("hotDeltaColor"):true;B.SC=(t)?t.hasOwnProperty("selectColor"):true;B.FS=(t)?t.hasOwnProperty("fxsize"):true;B.FD=(t)?t.hasOwnProperty("fxdir"):true;B.ET=(t)?t.hasOwnProperty("entity"):true;B.LT=(t)?t.hasOwnProperty("labelText"):true;B.LBC=(t)?t.hasOwnProperty("labelBgColor"):true;B.LBBC=(t)?t.hasOwnProperty("labelBorderColor"):true;B.AR=(t)?t.hasOwnProperty("labelArrow"):true;B.LP=(t)?t.hasOwnProperty("labelPos"):true;B.TT=(t)?t.hasOwnProperty("tooltip"):true;B.DD=(t)?t.hasOwnProperty("dragData"):true;B.M=(t)?t.hasOwnProperty("changeable"):true;B.DS=(t)?t.hasOwnProperty("dragSource"):true;B.DT=(t)?t.hasOwnProperty("dropTarget"):true;B.LabelType=(t)?t.hasOwnProperty("labelType"):true;return B;};b.prototype.getTemplateObject=function(){var t=V.prototype.getTemplateObject.apply(this,arguments);var B=this.mBindInfo=this.getBindInfo();var v=(B.hasTemplate)?this.getBindingInfo("items").template:null;this.bHasType=B.LabelType||(v.mProperties["labelType"]!==sap.ui.vbm.SemanticType.None);if(B.HS){t['hotScale.bind']=t.id+".HS";}else{t.hotScale=v.getHotScale();}if(B.HDC){t['hotDeltaColor.bind']=t.id+".HDC";}else{t.hotDeltaColor=v.getHotDeltaColor();}if(B.SC){t['selectColor.bind']=t.id+".SC";}else{t.selectColor=v.getSelectColor();}if(B.FS){t['fxsize.bind']=t.id+".FS";}else{t.fxsize=v.getFxsize();}if(B.FD){t['fxdir.bind']=t.id+".FD";}else{t.fxdir=v.getFxdir();}if(B.ET){t['entity.bind']=t.id+".ET";}else{t.entity=v.getEntity();}if(B.LT){t['labelText.bind']=t.id+".LT";}else{t.labelText=v.getLabelText();}if(this.bHasType){t['labelIcon.bind']=t.id+".LIC";t['labelIconBgrdCol.bind']=t.id+".LICC";t['labelIconTextCol.bind']=t.id+".LICTC";t['labelBgColor.bind']=t.id+".LBC";t['labelBorderColor.bind']=t.id+".LBBC";}else{if(B.LBC){t['labelBgColor.bind']=t.id+".LBC";}else{t.labelBgColor=v.getLabelBgColor();}if(B.LBBC){t['labelBorderColor.bind']=t.id+".LBBC";}else{t.labelBorderColor=v.getLabelBorderColor();}}if(B.AR){t['labelArrow.bind']=t.id+".AR";}else{t.labelArrow=v.getLabelArrow();}if(B.LP){t['labelPos.bind']=t.id+".LP";}else{t.labelPos=v.getLabelPos();}if(B.TT){t['tooltip.bind']=t.id+".TT";}else{t.tooltip=v.getTooltip();}if(B.DD){t['dragdata.bind']=t.id+".DD";}else{t.dragdata=v.getDragData();}if(!B.M){t['VB:c']=v.getChangeable();}t.altBorderDeltaColor='#676767';return t;};b.prototype.getTypeObject=function(){var t=V.prototype.getTypeObject.apply(this,arguments);var m=this.getMinSel();if(m!="0"&&m!="1"){m="0";}var M=this.getMaxSel();if(M!="0"&&M!="1"&&M!="n"||M=="n"){M="-1";}t['minSel']=m;t['maxSel']=M;var B=this.mBindInfo;if(B.HS){t.A.push({"name":"HS","alias":"HS","type":"vector"});}if(B.HDC){t.A.push({"name":"HDC","alias":"HDC","type":"string"});}if(B.SC){t.A.push({"name":"SC","alias":"SC","type":"string"});}if(B.FS){t.A.push({"name":"FS","alias":"FS","type":"boolean"});}if(B.ET){t.A.push({"name":"ET","alias":"ET","type":"string"});}if(B.LT){t.A.push({"name":"LT","alias":"LT","type":"string"});}if(this.bHasType){t.A.push({"name":"LBC","alias":"LBC","type":"color"});t.A.push({"name":"LBBC","alias":"LBBC","type":"color"});t.A.push({"name":"LIC","alias":"LIC","type":"string"});t.A.push({"name":"LICC","alias":"LICC","type":"color"});t.A.push({"name":"LICTC","alias":"LICTC","type":"color"});}else{if(B.LBC){t.A.push({"name":"LBC","alias":"LBC","type":"color"});}if(B.LBBC){t.A.push({"name":"LBBC","alias":"LBBC","type":"color"});}}if(B.AR){t.A.push({"name":"AR","alias":"AR","type":"boolean"});}if(B.LIC){t.A.push({"name":"LIC","alias":"LIC","type":"string"});}if(B.LP){t.A.push({"name":"LP","alias":"LP","type":"long"});}if(B.TT){t.A.push({"name":"TT","alias":"TT","type":"string"});}if(B.DD){t.A.push({"name":"DD","alias":"DD","type":"string"});}if(B.DS||B.DT){t.N=[];if(B.DS){t.N.push({"name":"DS","A":{"name":"DGT","alias":"A","type":"string"}});}if(B.DT){t.N.push({"name":"DT","A":{"name":"DPT","alias":"A","type":"string"}});}}var p=this.getCustomProperties();for(var i=0;i<p.length;++i){t.A.push({"name":p[i],"alias":p[i],"type":"string"});}return t;};b.prototype.getDragItemTemplate=function(i){var B=this.mBindInfo;var d=this.getDragSource();var D=[];for(var n=0,a=d.length;n<a;++n){D.push({"type":d[n].getType()});}if(B.DS){D.push({"datasource":i+".DS","type.bind":i+".DS.DGT"});}return D;};b.prototype.getDropItemTemplate=function(i){var B=this.mBindInfo;var d=this.getDropTarget();var D=[];for(var n=0,a=d.length;n<a;++n){D.push({"type":d[n].getType()});}if(B.DT){D.push({"datasource":i+".DT","type.bind":i+".DT.DPT"});}return D;};b.prototype.openDetailWindow=function(v,p,u){var P=this.getParent();P.mDTWindowCxt.bUseClickPos=u;P.mDTWindowCxt.open=true;P.mDTWindowCxt.src=v;P.mDTWindowCxt.key=v.getKey();P.mDTWindowCxt.params=p;P.m_bWindowsDirty=true;P.invalidate(this);};b.prototype.handleChangedData=function(e){if(e&&e.length){for(var n=0,E,i;n<e.length;++n){E=e[n];i=this.findInstance(E.K);if(i){i.handleChangedData(E);}}}};b.prototype.handleEvent=function(e){var n=e.Action.name;var f="fire"+n[0].toUpperCase()+n.slice(1);var v;if((v=this.findInstance(e.Action.instance))){var a={data:e};if(n.indexOf("handle")===0){a.handle=e.Action.Params.Param[2]['#'];}switch(n){case"click":if(e.Action.AddActionProperties&&e.Action.AddActionProperties.AddActionProperty.length&&e.Action.AddActionProperties.AddActionProperty[0].name=='pos'){v.mClickGeoPos=e.Action.AddActionProperties.AddActionProperty[0]['#'];}break;case"contextMenu":case"handleContextMenu":v.mClickPos=[e.Action.Params.Param[0]['#'],e.Action.Params.Param[1]['#']];sap.ui.getCore().loadLibrary("sap.ui.unified");if(this.oParent.mVBIContext.m_Menus){this.oParent.mVBIContext.m_Menus.deleteMenu("DynContextMenu");}var m=new sap.ui.unified.Menu();m.vbi_data={};m.vbi_data.menuRef="CTM";m.vbi_data.VBIName="DynContextMenu";a.menu=m;break;case"drop":var s=e.Action.Params.Param[0]['#'].split("|");var c=s[1];var i=s[2].split(".")[1];var d=this.getParent().getAggregatorContainer(c).findInstanceByKey(i);a.oDragSource=d;break;default:break;}if(v.mEventRegistry[n]){v[f](a);}if(this.mEventRegistry[n]){a.instance=v;this[f](a);}}else{jQuery.sap.log.error("Instance for event not found");}};b.prototype.getChangeType=function(d){var c=0;var i=0;var e=0;var f=this.getItems().length;var a=[];var n,g;for(n=0;n<f;++n){a.push(2);}for(g=0;g<d.length;++g){if(d[g].type=="delete"){var F=false;var h=0;var j=0;while(!F){if(h==d[g].index&&a[j]!=0){a[j]=0;c++;break;}else if(a[j]!=0){h++;}j++;}}else if(d[g].type=="insert"){if(d[g].index>=f){i++;}else{var F=false;var h=0;var j=0;while(!F){if(h==d[g].index&&a[j]==0){a[j]=2;e++;break;}else if(a[j]!=0){h++;}j++;}}}}if(d.length&&e==c&&c==d.length/2){return 1;}if(c==d.length){return 2;}if(i==d.length){return 3;}return 0;};b.prototype.unbindAggregation=function(n){if(n==="items"){this.m_bAggRenew=true;}V.prototype.unbindAggregation.apply(this,arguments);};b.prototype.updateAggregation=function(n){var B=this.mBindingInfos['items'],a=B&&B.binding||null;V.prototype.updateAggregation.apply(this,arguments);if(n==="items"&&a){var v=this.getItems();var i=this.sId;var K="0";var c=a.getCurrentContexts();if(c.diff&&!this.m_bAggChange&&!this.m_bAggRenew){var d=this.getChangeType(c.diff);if(d==2){for(var e=0;e<c.diff.length;++e){var f=c.diff[e].index;K=this.aUniqueIdx[f];var E={K:K};var N={name:i,E:E};var o={name:i,type:"E",N:N};this.aDiff.push({type:"delete",object:o});this.aUniqueIdx.splice(f,1);for(var g=0;g<v.length-1;++g){v[g].UniqueId=this.aUniqueIdx[g];}}this.m_bAggChange=true;}else if(d==3||d==1){for(var e=0;e<c.diff.length;++e){if(c.diff[e].type=="insert"){this.aDiff.push({type:"insert",idx:c.diff[e].index});}}this.m_bAggChange=true;}else{this.m_bAggRenew=true;}}}};b.prototype.invalidate=function(s){var i;if(!this.m_bAggRenew){this.m_bAggRenew=true;if(s&&this.getParent()){i=this.aUniqueIdx.indexOf(s.UniqueId);if(i>-1){var f=false;for(var n=0;n<this.aDiff.length&&!f;++n){if(this.aDiff[n].type=="insert"&&this.aDiff[n].idx==i){f=true;}}if(!f){this.aDiff.push({type:"insert",idx:i});}this.m_bAggChange=true;this.m_bAggRenew=false;}}}sap.ui.core.Control.prototype.invalidate.apply(this,arguments);};b.prototype.resetIndices=function(){var v=this.getItems();for(var n=0;n<v.length;++n){v[n].UniqueId=undefined;}};b.prototype.getUniqueIdx=function(){return(this.currentIdx++);};b.prototype.updateIdxArray=function(){this.aUniqueIdx=[];var v=this.getItems();for(var n=0;n<v.length;++n){this.aUniqueIdx.push(v[n].UniqueId);}};b.prototype.addUnique=function(U){this.aUniqueIdx.push(U);};b.prototype.setCustomProperties=function(p){this._oCPMap=null;return this.setProperty("customProperties",p);};b.prototype.getCustomPropertiesMap=function(){if(!this._oCPMap){this._oCPMap={};var p=this.getCustomProperties();for(var i=0;i<p.length;++i){this._oCPMap[p[i]]=true;}}return this._oCPMap;};return b;});
