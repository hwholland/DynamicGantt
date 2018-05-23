/*!
 * SAP APF Analysis Path Framework
 * 
 * (c) Copyright 2012-2014 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.apf.core.step");jQuery.sap.require("sap.apf.core.utils.filter");jQuery.sap.require('sap.apf.utils.utils');(function(){'use strict';sap.apf.core.Step=function(m,s,f,r){m.check(s!==undefined,"Step: step configuration is missing");m.check(s.binding!==undefined,"No binding assigned to step "+s.id+" in analytical configuration",sap.apf.core.constants.message.code.errorCheckConfiguration);var t=this;var b,R,c,C;var a=jQuery.extend(true,{},s);delete a.id;delete a.picture;delete a.hoverPicture;delete a.title;delete a.longTitle;delete a.type;delete a.thumbnail;delete a.categories;this.type=s.type;this.title=jQuery.extend(true,{},s.title);this.longTitle=undefined;if(s.longTitle){this.longTitle=jQuery.extend(true,{},s.longTitle);}this.thumbnail=jQuery.extend(true,{},s.thumbnail);this.categories=s.categories;this.destroy=function(){if(b){b.destroy();}R=undefined;c=undefined;C=undefined;b=undefined;t=undefined;};this.getAdditionalConfigurationProperties=function(){return a;};this.update=function(F,g){var h=!F.isEqual(c);var o=b.getRequestOptions(h);var j=!d(C,o);if(R&&(h||j)){R.sendGetInBatch(F,g,o);}else{g({},true);}};this.determineFilter=function(o,g){if(e()&&this.getFilter().toUrlParam()){var h=f.getConfigurationById(s.filterMapping.requestForMappedFilter);h.selectProperties=s.filterMapping.target;var M=f.createRequest(h);var j=o.addAnd(this.getFilter());sap.apf.utils.executeFilterMapping(j,M,s.filterMapping.target,l,m);}else{g(this.getFilter());}function l(k,n){if(!n){if(s.filterMapping.keepSource==='true'){k=t.getFilter().addAnd(k);}g(k);}}};this.setFilter=function(F){return b.setFilter(F);};this.getFilter=function(){return b.getFilter();};this.setData=function(D,F){var g=!F.isEqual(c);c=F.copy();C=jQuery.extend({},b.getRequestOptions(g));b.setData(D);};this.getRepresentationInfo=function(){return b.getRepresentationInfo();};this.getSelectedRepresentationInfo=function(){return b.getSelectedRepresentationInfo();};this.getSelectedRepresentation=function(){return b.getSelectedRepresentation();};this.setSelectedRepresentation=function(r){b.setSelectedRepresentation(r);};this.serialize=function(){return{stepId:s.id,binding:b.serialize()};};this.deserialize=function(S){b.deserialize(S.binding);m.check(s.id,S.stepId,"sap.apf.core.step.deserialize inconsistent serialization data - id "+S.stepId);return this;};this.getAssignedNavigationTargets=function(){return s.navigationTargets;};i();function i(){b=f.createBinding(s.binding,undefined,undefined,r);delete a.binding;if(s.request!==undefined&&s.request!==""){R=f.createRequest(s.request);delete a.request;}}function d(o,O){var n=0;var g=0;var p;for(p in o){n++;}for(p in O){g++;}if(n!==g){return false;}for(p in o){if(!o.hasOwnProperty(p)){continue;}if(typeof o[p]==='object'){if(!d(o[p],O[p])){return false;}}else if(o[p]!==O[p]){return false;}}return true;}function e(){if(s.filterMapping){if(s.filterMapping.requestForMappedFilter&&s.filterMapping.target instanceof Array&&s.filterMapping.keepSource){return true;}m.putMessage(m.createMessageObject({code:"5104"}));}return false;}};}());
