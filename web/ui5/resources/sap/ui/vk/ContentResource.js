/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["jquery.sap.global","./library","sap/ui/base/ManagedObject"],function(q,l,M){"use strict";var C=M.extend("sap.ui.vk.ContentResource",{metadata:{properties:{source:"any",sourceType:"string",sourceId:"string",localMatrix:"sap.ui.vk.TransformationMatrix",name:"string"},aggregations:{contentResources:"sap.ui.vk.ContentResource"},publicMethods:["getNodeProxy"]},constructor:function(i,s,S){M.apply(this,arguments);this._nodeProxy=null;}});C.prototype.isTreeBinding=function(n){return n==="contentResources";};C.prototype.destroy=function(){this._nodeProxy=null;M.prototype.destroy.call(this);};C.prototype.setLocalMatrix=function(v){var n=this.getNodeProxy();if(n){n.setLocalMatrix(v);}this.setProperty("localMatrix",v,true);return this;};C.prototype.getNodeProxy=function(){return this._shadowContentResource&&this._shadowContentResource.nodeProxy||null;};C.collectCategories=function(r){var c=[];var m={};function g(a){var s=(a.getSourceType()||"").toLowerCase();if(s){var b=sap.ui.vk.ContentResourceSourceTypeToCategoryMap[s]||"unknown";if(!m.hasOwnProperty(b)){m[b]=true;c.push(b);}}a.getContentResources().forEach(g);}r.forEach(g);return c;};return C;});
