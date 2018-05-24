/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/documentation/sdk/thirdparty/jsanalyzer/ModuleAnalyzer','./APIInfo'],function(q,a,A){"use strict";var r={};function g(n){var P=n.split('.');var e=r;var l=P.length-1;for(var i=0;i<l&&!e.__noMetamodel&&!e.__noSource;i++){e=e[P[i]]||(e[P[i]]={});}return e;}var C="boolean int float number function object string void any Element Control Component";function b(t,s){if(t.indexOf("/")>=0){return t.replace(/\//g,".");}else if(t&&t.indexOf(".")<0&&C.indexOf(t)>=0){return"sap.ui.core."+t;}else{return s.split(".").slice(0,-1).concat([t.replace(/\//g,".")]).join(".");}}function p(D,e){var $=q(D.documentElement);var E={metatype:'control',baseType:undefined,doc:undefined,deprecation:undefined,properties:{},aggregations:{},associations:{},events:{},methods:{}};var B=$.children("baseType").text();E.baseType=(B)?b(B,e):null;E.doc=h($);E.deprecation=j($);f($,"properties/property",function(i){E.properties[i.attr("name")]={kind:0,type:b(i.attr("type")||"string",e),defaultValue:i.attr("defaultValue")||"empty/undefined",doc:h(i),deprecation:j(i),since:i.attr("since")||null};});E.defaultAggregation=E.defaultAggregation||$.children("aggregations").attr("default");f($,"aggregations/aggregation",function(i){E.aggregations[i.attr("name")]={kind:i.attr("cardinality")==="0..1"?1:2,type:b(i.attr("type")||"sap.ui.core/Control",e),cardinality:i.attr("cardinality")||"0..n",visibility:i.attr("visibility")||null,doc:h(i),deprecation:j(i),since:i.attr("since")||null};});f($,"associations/association",function(i){E.associations[i.attr("name")]={kind:i.attr("cardinality")==="0..n"?4:3,type:b(i.attr("type")||"sap.ui.core/Control",e),cardinality:i.attr("cardinality")||"0..1",doc:h(i),deprecation:j(i),since:i.attr("since")||null};});f($,"events/event",function(i){var n=i.attr("name");E.events[n]={kind:5,doc:h(i),deprecation:j(i),since:i.attr("since")||null,parameters:[]};f(i,"parameters/parameter",function(l){E.events[n].parameters[l.attr("name")]={kind:6,type:b(l.attr("type")||"string",e),doc:h(l),since:l.attr("since")||null,deprecation:j(l)};});});f($,"methods/method",function(i){var n=i.attr("name");E.methods[n]={kind:7,type:b(i.attr("type")||"sap.ui.core/void",e),doc:h(i),deprecation:j(i),since:i.attr("since")||null,parameters:[]};f(i,"parameters/parameter",function(l){E.methods[n].parameters.push({kind:8,name:l.attr("name"),type:b(l.attr("type")||"sap.ui.core/Control",e),doc:h(l),since:l.attr("since")||null,deprecation:j(l)});});});return E;}function c(D,e){var $=q(D.documentElement);var E={metatype:'type',doc:undefined,deprecation:false,values:{}};E.doc=h($);E.deprecation=j($);f($,"enumeration/value",function(i){var n=i.attr("name");E.values[n]={value:i.attr("value")||n,doc:h(i),deprecation:j(i)};});E.pattern=$.children("pattern").text();E.baseType=b($.children("baseType").text(),e);return E;}function d(D,e,M){return a.analyze(D,e,M);}function f($,N,l){q.each(N.split("/"),function(i,n){$=$.children(n);});$.each(function(i,e){l(q(e));});}function h($){return $.children("documentation").text();}function j($){return $.children("deprecation").text();}function k(n,t,D,P,e){var E;q.ajax({async:false,url:q.sap.getModulePath(n,t),dataType:D,success:function(R){E=P(R,e,n.replace(/\./g,'/'));},error:function(i){q.sap.log.debug("tried to load entity docu for: "+n+t);}});return E;}function m(e){var v=sap.ui.getVersionInfo(),l,L,i;if(v&&Array.isArray(v.libraries)){L=v.libraries.length;for(i=0;i<L;i++){l=v.libraries[i];if(e===l.name||e.indexOf(l.name+".")===0){return l.name;}}}return"sap.ui.core";}function o(e,l){var P=g(e);var E;if(!l){var n=q.sap.getObject(e);if(n&&n.getMetadata){var M=n.getMetadata();if(M.getLibraryName){l=M.getLibraryName();}else{l="sap.ui.core";}}else{l=m(e);}}if(!E&&!P.__noAPIJson){return A.getLibraryElementsJSONPromise(l).then(function(s){var t;for(var i=0,u=s.length;i<u;i++){if(s[i].name===e){t=s[i];break;}}if(t){E={baseType:t.extends,deprecation:t.deprecated?t.deprecated.text:null,doc:t.description,module:t.module,name:t.name,since:t.since,values:t.properties,uxGuidelinesLink:t.uxGuidelinesLink,uxGuidelinesLinkText:t.uxGuidelinesLinkText,docuLink:t.docuLink,docuLinkText:t.docuLinkText};P.__noSource=true;P.__noMetamodel=true;}return E;});}else if(P.__noAPIJson){q.sap.log.debug("ancestor package for "+e+" is marked with 'noMetamodel'");}if(!E&&!P.__noMetamodel){E=k(e,".control","xml",p,e);if(!E){E=k(e,".type","xml",c,e);}if(!E){E=k(e,".js","text",d,e);}if(E){P.__noSource=true;}}else if(P.__noMetamodel){q.sap.log.debug("ancestor package for "+e+" is marked with 'noMetamodel'");}if(!E&&!P.noSource){var L=e.replace(/\.[^.]+$/,".library");E=k(L,".js","text",d,e);if(!E){E=k(L,".js","text",d,e);}if(E){P.__noMetamodel=true;}}else if(P.__noSource){q.sap.log.debug("ancestor package for "+e+" is marked with 'noSource'");}return E;}return{getEntityDocuAsync:function(e,l){return o(e,l);}};},true);