/*!
 * SAP APF Analysis Path Framework
 * 
 * (c) Copyright 2012-2014 SAP AG. All rights reserved
 */
(function(){'use strict';jQuery.sap.declare("sap.apf.core.configurationFactory");jQuery.sap.require("sap.apf.core.step");jQuery.sap.require("sap.apf.core.request");jQuery.sap.require("sap.apf.utils.hashtable");jQuery.sap.require("sap.apf.core.binding");jQuery.sap.require("sap.apf.core.representationTypes");jQuery.sap.require("sap.apf.core.constants");jQuery.sap.require('sap.apf.utils.utils');sap.apf.core.ConfigurationFactory=function(i){var t=this;var c=false;var a=new sap.apf.utils.Hashtable(i.instances.messageHandler);var s=function(I){i.instances.messageHandler.check(I!==undefined&&I.hasOwnProperty("id")!==false,"oItem is undefined or property 'id' is missing",sap.apf.core.constants.message.code.errorCheckConfiguration);if(!a){a=new sap.apf.utils.Hashtable(i.instances.messageHandler);}var y=a.setItem(I.id,I);i.instances.messageHandler.check((y===undefined),"Configuration includes duplicated identifiers (IDs): "+I.id+"",sap.apf.core.constants.message.code.errorCheckConfigurationWarning);};var g=function(y){var R=[];if(!c){i.instances.messageHandler.putMessage(i.instances.messageHandler.createMessageObject({code:"5020"}));}if(a.getNumberOfItems()!==0){a.each(function(z,A){if(A.type===y){R.push(A);}});return R;}return R;};function l(y){if(y.type===undefined){y.type="step";}s(y);}function b(y){i.instances.messageHandler.check(y!==undefined&&y instanceof Array!==false,"aSteps is missing or not an Array",sap.apf.core.constants.message.code.errorCheckConfiguration);y.forEach(function(z){l(z);});}function d(R){if(R.type===undefined){R.type="request";}if(R.entitySet){R.entityType=R.entitySet;delete R.entitySet;}s(R);}function e(y){if(y.type===undefined){y.type="navigationTarget";}s(y);}function f(R){i.instances.messageHandler.check(R!==undefined&&R instanceof Array!==false,"aRequests is missing or not an Array",sap.apf.core.constants.message.code.errorCheckConfiguration);R.forEach(function(y){d(y);});}function h(B){function y(){var z=new sap.apf.utils.Hashtable(i.instances.messageHandler);B.representations.forEach(function(A){if(!(A.id&&typeof A.id==="string")){i.instances.messageHandler.putMessage(i.instances.messageHandler.createMessageObject({code:"5028",aParameters:[B.id]}));}if(z.setItem(A.id,A.id)){i.instances.messageHandler.putMessage(i.instances.messageHandler.createMessageObject({code:"5029",aParameters:[B.id]}));}});}if(B.type===undefined){B.type="binding";}i.instances.messageHandler.check(B.id!==undefined,"binding has no id");i.instances.messageHandler.check(B.representations!==undefined&&B.representations instanceof Array!==false,"representations for binding "+B.id+" not defined",sap.apf.core.constants.message.code.errorCheckConfiguration);y();s(B);}function j(B){i.instances.messageHandler.check(B!==undefined&&B instanceof Array!==false,"aBindings is missing or not an Array",sap.apf.core.constants.message.code.errorCheckConfiguration);B.forEach(function(y){h(y);});}function k(y){i.instances.messageHandler.check(y!==undefined&&y instanceof Array!==false,"navigationTarget is missing or not an Array",sap.apf.core.constants.message.code.errorCheckConfiguration);y.forEach(function(z){e(z);});}function m(y){a.setItem("configHeader",y);}function n(y){if(y.type===undefined){y.type="category";}s(y);}function o(y){i.instances.messageHandler.check(y!==undefined&&y instanceof Array!==false,"aCategories is missing or not an Array",sap.apf.core.constants.message.code.errorCheckConfiguration);y.forEach(function(z){var A=z.steps;i.instances.messageHandler.check(A!==undefined&&A instanceof Array!==false,"steps for category "+z.id+" are missing or not an Array",sap.apf.core.constants.message.code.errorCheckConfiguration);A.forEach(function(B){i.instances.messageHandler.check(B.type&&B.type==="step"&&B.id,"step with wrong format assigned to category '"+z.id+"'");i.instances.messageHandler.check(t.existsConfiguration(B.id),"step with id '"+B.id+"' which is assigned to category '"+z.id+"' does not exist");});n(z);});}function p(y){var z=false;var R=sap.apf.core.representationTypes();R.forEach(function(A){if(y===A.id){z=true;}});return z;}function q(R){var y;if(R.type===undefined){R.type="representationType";}if(!p(R.id)){y=sap.apf.utils.extractFunctionFromModulePathString(R.constructor);if(!jQuery.isFunction(y)){i.instances.messageHandler.putMessage(i.instances.messageHandler.createMessageObject({code:'5030',parameters:[R.id]}));}}s(R);}function r(R){i.instances.messageHandler.check(R!==undefined&&R instanceof Array!==false,"aRepresentationInfo is missing or not an Array",sap.apf.core.constants.message.code.errorCheckConfiguration);R.forEach(function(y){q(y);});}function u(y){if(y.type===undefined){y.type='smartFilterBar';}t.addObject(y);}function v(F){if(F.type===undefined){F.type="facetFilter";}t.addObject(F);}function w(F){i.instances.messageHandler.check(F!==undefined&&F instanceof Array!==false,"Facet filter configuration is missing or not an Array",sap.apf.core.constants.message.code.errorCheckConfiguration);if(F.length===0){a.setItem(sap.apf.core.constants.existsEmptyFacetFilterArray,true);}F.forEach(function(y){v(y);});}function x(R){r(R);}function S(y,F){function z(y,D){var E=D.getConfigurationById(y.binding).representations;if(E){return E;}i.instances.messageHandler.check(false,'Binding of step with ID "'+y.id+'" does not contain any representations.',sap.apf.core.constants.message.code.errorCheckConfigurationWarning);}function A(y,D){var E;var G=[];if(y.binding){E=z(y,D);E.forEach(function(H){var I=jQuery.extend(true,{},D.getConfigurationById(H.representationTypeId));I.representationId=H.id;I.representationLabel=H.label;I.parameter=jQuery.extend(true,{},H.parameter);G.push(I);});return G;}i.instances.messageHandler.check(false,'Step with ID "'+y.id+'" does not contain any binding references.',sap.apf.core.constants.message.code.errorCheckConfigurationWarning);}var B=jQuery.extend(true,{},y);var R=A(y,F);delete B.request;delete B.binding;delete B.thumbnail;delete B.longTitle;B.type="stepTemplate";B.getRepresentationInfo=function(){var D=jQuery.extend(true,[],R);D.forEach(function(E){delete E.id;delete E.type;delete E.constructor;});return D;};return B;}var C=function(y,z){var t=this;this.type=y.type;this.id=y.id;this.label=y.label;this.stepTemplates=[];y.steps.forEach(function(A){var B=z.getConfigurationById(A.id);t.stepTemplates.push(new S(B,z));});return this;};var T=function(y,F){this.type="thumbnail";if(y===undefined){return this;}this.leftUpper=F.createLabel(y.leftUpper);this.rightUpper=F.createLabel(y.rightUpper);this.leftLower=F.createLabel(y.leftLower);this.rightLower=F.createLabel(y.rightLower);this.altTitle=F.createLabel(y.altTitle);return this;};this.createThumbnail=function(y){return new T(y,this);};function L(y){this.type="label";this.kind=y.kind;if(this.kind==="text"){this.file=y.file;this.key=y.key;}else if(this.kind==="property"){this.property=y.property;}else if(this.kind==="sapLabel"){this.labelOf=y.labelOf;}}this.createLabel=function(y){return new L(y,this);};this.loadConfig=function(y){c=true;a=new sap.apf.utils.Hashtable(i.instances.messageHandler);if(y.applicationTitle){a.setItem('applicationTitle',y.applicationTitle);}var z={constructors:{Hashtable:sap.apf.utils.Hashtable},instances:{messageHandler:i.instances.messageHandler}};sap.apf.utils.migrateConfigToCategoryStepAssignment(y,z);var R=sap.apf.core.representationTypes();x(R);b(y.steps);o(y.categories);f(y.requests);j(y.bindings);if(y.representationTypes){r(y.representationTypes);}if(y.smartFilterBar){u(y.smartFilterBar);}if(y.facetFilters){w(y.facetFilters);}if(y.navigationTargets){k(y.navigationTargets);}if(y.configHeader){m(y.configHeader);}};this.addObject=function(y){c=true;if(!sap.apf.core.constants.configurationObjectTypes.hasOwnProperty(y.type)){i.instances.messageHandler.putMessage(i.instances.messageHandler.createMessageObject({code:"5033",aParams:[y.type]}));}if(y.type===sap.apf.core.constants.configurationObjectTypes.facetFilter&&!(y.property)){i.instances.messageHandler.putMessage(i.instances.messageHandler.createMessageObject({code:"5034"}));}a.setItem(y.id,y);};this.getConfigurationById=function(I){return a.getItem(I);};this.existsConfiguration=function(I){return a.hasItem(I);};this.getServiceDocuments=function(){var R=g("request");var y=[];R.forEach(function(z){y.push(z.service);});return sap.apf.utils.eliminateDuplicatesInArray(i.instances.messageHandler,y);};this.getNavigationTargets=function(){var y=g("navigationTarget",true);return jQuery.extend(true,[],y);};this.getStepTemplates=function(){var I=g("step");var y=[];I.forEach(function(z,A){y[A]=new S(z,t);});return y;};this.getSmartFilterBarConfiguration=function(){var y=g('smartFilterBar')[0];if(typeof y==='object'&&y.service&&y.entityType){return jQuery.extend(true,{},y);}};this.getFacetFilterConfigurations=function(){var y=g("facetFilter");var z;y=jQuery.extend(true,[],y);y.forEach(function(A){if(A.preselectionFunction){z=sap.apf.utils.extractFunctionFromModulePathString(A.preselectionFunction);if(!jQuery.isFunction(z)){i.instances.messageHandler.putMessage(i.instances.messageHandler.createMessageObject({code:'5035',parameters:[A.id]}));A.preselectionFunction=undefined;}else{A.preselectionFunction=z;}}});return y;};this.getCategories=function(){var I=g("category");var y=[];I.forEach(function(z,A){y[A]=new C(z,t);});return y;};this.getConfigHeader=function(){return a.getItem("configHeader");};this.createStep=function(y,R){var z=this.getConfigurationById(y);i.instances.messageHandler.check((z!==undefined&&z.type==="step"),"Error - referenced object is undefined or has not type step",sap.apf.core.constants.message.code.errorCheckConfiguration);i.instances.messageHandler.check(sap.apf.core.Step!==undefined,"Step must be defined ",sap.apf.core.constants.message.code.errorCheckConfiguration);i.instances.messageHandler.check(typeof sap.apf.core.Step==="function","Step must be Ctor function");return new sap.apf.core.Step(i.instances.messageHandler,z,this,R);};this.createBinding=function(B,y,z,R){var A=this.getConfigurationById(B);i.instances.messageHandler.check((A!==undefined&&A.type==="binding"),"Error - oBindingConfig is undefined or has not type binding",sap.apf.core.constants.message.code.errorCheckConfiguration);A.oTitle=y;A.oLongTitle=z;return new sap.apf.core.Binding(i,A,this,R);};this.createRequest=function(y){if(y.entitySet){y.entityType=y.entitySet;delete y.entitySet;}var M;var R;function z(){var A=new Date();return Math.random()*A.getTime();}if(typeof y==="string"){R=t.getConfigurationById(y);if(!(R!==undefined&&R.type==="request")){M=i.instances.messageHandler.createMessageObject({code:"5004",aParameters:[y]});i.instances.messageHandler.putMessage(M);return undefined;}}else{R=y;i.instances.messageHandler.check(R.type&&R.type==="request"&&R.service&&R.entityType,'Wrong request configuration when creating a new request');if(!R.id){R.id=z();s(R);}}return new((i&&i.constructors&&i.constructors.Request)||sap.apf.core.Request)(i,R);};if(i.constructors&&i.constructors.RegistryProbe){this.getRegistry=function(){return new i.constructors.RegistryProbe(a);};}};}());
