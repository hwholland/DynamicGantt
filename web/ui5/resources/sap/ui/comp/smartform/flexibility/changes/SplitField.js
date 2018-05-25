/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2018 SAP SE. All rights reserved
	
 */
sap.ui.define(["jquery.sap.global","sap/ui/fl/Utils","sap/ui/fl/changeHandler/Base"],function(q,F,B){"use strict";var S={};S.applyChange=function(c,C,p){var o=c.getDefinition();var m=p.modifier;var a=p.appComponent;var v=p.view;var s=m.bySelector(o.content.sourceSelector,a,v);var l;var N;var b;var L;var P=m.bySelector(o.content.parentSelector,a,v);var d=o.content.newElementIds.slice();var f=m.getAggregation(s,"elements");var e=m.getProperty(s,"elementForLabel");var g=m.getAggregation(P,"groupElements");var h=g.indexOf(s);L=m.getProperty(s,"label");if(L&&(typeof L!=="string")){l=m.getProperty(L,"text");}else{l=L;}for(var i=0,n=f.length;i<n;i++){if(i!==e){N=d.pop();b=m.createControl("sap.ui.comp.smartform.GroupElement",p.appComponent,v,N);m.removeAggregation(s,"elements",f[i]);m.insertAggregation(b,"elements",f[i],0,v);m.insertAggregation(P,"groupElements",b,h+i,v);if(m.getControlType(f[i])!=="sap.ui.comp.smartfield.SmartField"){L=m.getProperty(b,"label");if(L&&(typeof L!=="string")){m.setProperty(L,"text",l);}else{m.setProperty(b,"label",l);}}}else{if(e!==0){m.setProperty(s,"elementForLabel",0);}m.removeAggregation(s,"elements",f[i]);m.insertAggregation(s,"elements",f[i],0,v);if(m.getControlType(f[i])!=="sap.ui.comp.smartfield.SmartField"){L=m.getProperty(s,"label");if(L&&(typeof L!=="string")){m.setProperty(L,"text",l);}else{m.setProperty(s,"label",l);}}}}return true;};S.completeChangeContent=function(c,s,p){var m=p.modifier;var a=p.appComponent;var C=c.getDefinition();if(s.newElementIds){C.content.newElementIds=s.newElementIds;}else{throw new Error("oSpecificChangeInfo.newElementIds attribute required");}if(s.sourceControlId){C.content.sourceSelector=m.getSelector(s.sourceControlId,a);c.addDependentControl(s.sourceControlId,"sourceControl",p);}else{throw new Error("oSpecificChangeInfo.sourceControlId attribute required");}if(s.parentId){C.content.parentSelector=m.getSelector(s.parentId,a);c.addDependentControl(s.parentId,"parent",p);}else{throw new Error("oSpecificChangeInfo.parentId attribute required");}};return S;},true);