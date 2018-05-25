/*!
 * 
		SAP UI development toolkit for HTML5 (SAPUI5)
		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.predefine('sap/suite/ui/commons/Timeline.designtime',["jquery.sap.global"],function(q){"use strict";var T=Object.freeze({"-sortIcon":"TIMELINE_SORT_BUTTON","-filterIcon":"TIMELINE_FILTER_BUTTON","-searchField":"TIMELINE_SEARCH_FIELD"});var r=sap.ui.getCore().getLibraryResourceBundle("sap.suite.ui.commons");
function g(i){return r.getText(i);}
function a(t){return{actions:{remove:{changeType:"hideToolbarItem",changeOnRelevantContainer:true},reveal:{changeType:"unhideToolbarItem",changeOnRelevantContainer:true,getLabel:function(){return g(t);}}},name:{singular:g.bind(null,t),plural:g.bind(null,t)}};}
function b(i,t){return function(e){var I=e.getId();if(q.sap.endsWith(I,i)){return a(t);}return{};};}
return{aggregations:{content:{ignore:true},customFilter:{ignore:true},filterList:{ignore:true},suggestionItems:{ignore:true},headerBar:{propagateMetadata:function(e){var i=e.getId(),k;for(k in T){if(q.sap.endsWith(i,k)){return a(T[k]);}}if(q.sap.endsWith(i,"-headerBar")){return a("TIMELINE_HEADER_BAR");}return{};},propagateRelevantContainer:true},searchField:{propagateMetadata:b("-searchField","TIMELINE_SEARCH_FIELD"),propagateRelevantContainer:true},sortIcon:{propagateMetadata:b("-sortIcon","TIMELINE_SORT_BUTTON"),propagateRelevantContainer:true},filterIcon:{propagateMetadata:b("-filterIcon","TIMELINE_FILTER_BUTTON"),propagateRelevantContainer:true}},actions:{remove:{changeType:"hideControl"},reveal:{changeType:"unhideControl",getLabel:function(){return g("TIMELINE_ACCESSIBILITY_TITLE");}}},name:{singular:"TIMELINE_ACCESSIBILITY_TITLE",plural:"TIMELINE_ACCESSIBILITY_TITLE"}};},false);
//# sourceMappingURL=library-preload.designtime.js.map