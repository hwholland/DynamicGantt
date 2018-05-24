/*!
* UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
*/
sap.ui.define(["jquery.sap.global","sap/ui/base/ManagedObject","sap/ui/model/json/JSONModel","sap/ui/support/supportRules/Analyzer","sap/ui/support/supportRules/CoreFacade","sap/ui/support/supportRules/ExecutionScope","sap/ui/support/supportRules/ui/external/Highlighter","sap/ui/support/supportRules/WindowCommunicationBus","sap/ui/support/supportRules/RuleSerializer","sap/ui/support/supportRules/RuleSet","sap/ui/support/supportRules/IssueManager","sap/ui/support/supportRules/report/DataCollector","sap/ui/support/supportRules/WCBChannels","sap/ui/support/supportRules/Constants","sap/ui/support/supportRules/RuleSetLoader","sap/ui/support/supportRules/report/AnalysisHistoryFormatter"],function(q,M,J,A,C,E,H,a,R,b,I,D,c,d,f,g){"use strict";var h=null;var m=null;var j=M.extend("sap.ui.support.Main",{constructor:function(){if(!m){var t=this;this._oCore=null;this._oAnalyzer=new A();this._oAnalyzer.onNotifyProgress=function(i){a.publish(c.ON_PROGRESS_UPDATE,{currentProgress:i});};f._initTempRulesLib();M.apply(this,arguments);q.sap.support={analyze:function(o,r){if(f._rulesCreated){return m.analyze(o,r);}return f._oMainPromise.then(function(){return m.analyze(o,r);});},getLastAnalysisHistory:function(){var i=this.getAnalysisHistory();if(q.isArray(i)&&i.length>0){return i[i.length-1];}else{return null;}},getAnalysisHistory:function(){if(t._oAnalyzer.running()){return null;}return I.getHistory();},getFormattedAnalysisHistory:function(){if(t._oAnalyzer.running()){return"";}return g.format(I.getConvertedHistory());}};var e=document.createEvent("CustomEvent");e.initCustomEvent("supportToolLoaded",true,true,{});}else{q.sap.log.warning("Only one support tool allowed");return m;}}});j.prototype._isInIframe=function(){try{return window.self!==window.top;}catch(e){return true;}};j.prototype.startPlugin=function(s){if(this._pluginStarted){return;}this._pluginStarted=true;var t=this;sap.ui.getCore().registerPlugin({startPlugin:function(o){t._supportModeConfig=s=s||o.getConfiguration().getSupportMode();t._setCommunicationSubscriptions();var F=t._isInIframe()&&s.indexOf("frame-force-ui")!==-1;t._oCore=o;t._oDataCollector=new D(o);t._oCoreFacade=C(o);t._oExecutionScope=null;t._createCoreSpies();o.attachLibraryChanged(f._onLibraryChanged);if(!s||s.indexOf("silent")===-1||F){sap.ui.require(["sap/ui/support/supportRules/ui/IFrameController"],function(e){h=e;h.injectFrame(s);a.onMessageChecks.push(function(i){return i.origin===h.getFrameOrigin();});a.onMessageChecks.push(function(i){return i.data._frameIdentifier===h.getFrameIdentifier();});a.onMessageChecks.push(function(i){var k=h.getFrameUrl();k=k.replace(/\.\.\//g,'');return i.data._origin.indexOf(k)>-1;});});}else{f.updateRuleSets();}},stopPlugin:function(){h._stop();t._pluginStarted=false;t._oCore=null;t._oCoreFacade=null;t._oDataCollector=null;t._oExecutionScope=null;}});};j.prototype._createCoreSpies=function(){var t=this,n=500;this._fnDirtyTimeoutHandle=null;var s=function(N){var o=t._oCore[N];t._oCore[N]=function(){o.apply(t._oCore,arguments);clearTimeout(t._fnDirtyTimeoutHandle);t._fnDirtyTimeoutHandle=setTimeout(function(){a.publish(c.ON_CORE_STATE_CHANGE);},n);};};s("registerElement");s("deregisterElement");};j.prototype._setCommunicationSubscriptions=function(){if(this._supportModeConfig.indexOf("silent")<0){a.subscribe(c.VERIFY_CREATE_RULE,function(t){var e=R.deserialize(t),i=f.getRuleSet(d.TEMP_RULESETS_NAME).ruleset,r=i.addRule(e);a.publish(c.VERIFY_RULE_CREATE_RESULT,{result:r,newRule:R.serialize(e)});},this);a.subscribe(c.VERIFY_UPDATE_RULE,function(e){var t=R.deserialize(e.updateObj),i=f.getRuleSet(d.TEMP_RULESETS_NAME).ruleset,r=i.updateRule(e.oldId,t);a.publish(c.VERIFY_RULE_UPDATE_RESULT,{result:r,updateRule:R.serialize(t)});},this);a.subscribe(c.OPEN_URL,function(u){var w=window.open(u,"_blank");w.focus();},this);a.subscribe(c.ON_DOWNLOAD_REPORT_REQUEST,function(r){var e=this._getReportData(r);sap.ui.require(["sap/ui/support/supportRules/report/ReportProvider"],function(i){i.downloadReportZip(e);});},this);a.subscribe(c.HIGHLIGHT_ELEMENT,function(i){var $=sap.ui.getCore().byId(i).$();$.css("background-color","red");},this);a.subscribe(c.TREE_ELEMENT_MOUSE_ENTER,function(e){H.highlight(e);},this);a.subscribe(c.TREE_ELEMENT_MOUSE_OUT,function(){H.hideHighLighter();},this);a.subscribe(c.TOGGLE_FRAME_HIDDEN,function(e){h.toggleHide(e);},this);}a.subscribe(c.POST_UI_INFORMATION,function(e){this._oDataCollector.setSupportAssistantLocation(e.location);this._oDataCollector.setSupportAssistantVersion(e.version);},this);a.subscribe(c.GET_AVAILABLE_COMPONENTS,function(){a.publish(c.POST_AVAILABLE_COMPONENTS,Object.keys(this._oCore.mObjects.component));},this);a.subscribe(c.ON_ANALYZE_REQUEST,function(e){this.analyze(e.executionContext,e.selectedRules);},this);a.subscribe(c.ON_INIT_ANALYSIS_CTRL,function(){f.updateRuleSets();},this);a.subscribe(c.ON_SHOW_REPORT_REQUEST,function(r){var e=this._getReportData(r);sap.ui.require(["sap/ui/support/supportRules/report/ReportProvider"],function(i){i.openReport(e);});},this);a.subscribe(c.LOAD_RULESETS,function(e){f.loadAdditionalRuleSets(e.aLibNames);},this);a.subscribe(c.REQUEST_RULES_MODEL,function(e){if(e){a.publish(c.GET_RULES_MODEL,I.getTreeTableViewModel(e));}},this);a.subscribe(c.REQUEST_ISSUES,function(i){if(i){var e=I.groupIssues(i),k=I.getIssuesViewModel(e);a.publish(c.GET_ISSUES,{groupedIssues:e,issuesModel:k});}},this);a.subscribe(c.GET_NON_LOADED_RULE_SETS,function(){f.fetchNonLoadedRuleSets();},this);};j.prototype.analyze=function(e,r){var t=this;if(this._oAnalyzer&&this._oAnalyzer.running()){return;}e=e||{type:"global"};r=r||f.getAllRuleDescriptors();if(!this._isExecutionScopeValid(e)){return;}a.publish(c.ON_ANALYZE_STARTED);if(e.selectors){this._mapExecutionScope(e);}this._oAnalyzer.reset();this.setExecutionScope(e);I.clearIssues();this._setSelectedRules(r);return this._oAnalyzer.start(this._aSelectedRules,this._oCoreFacade,this._oExecutionScope).then(function(){t._done();});};j.prototype._isExecutionScopeValid=function(e){var o=sap.ui.getCore(),s=[],k=false,i;if(E.possibleScopes.indexOf(e.type)===-1){q.sap.log.error("Invalid execution scope type. Type must be one of the following: "+E.possibleScopes.join(", "));return false;}if(e.type=="subtree"){if(e.parentId){s.push(e.parentId);}else if(q.isArray(e.selectors)){q.merge(s,e.selectors);}else if(e.selectors){s.push(e.selectors);}for(i=0;i<s.length;i++){if(o.byId(s[i])){k=true;break;}}if(!k){a.publish(c.POST_MESSAGE,{message:"Set a valid element ID."});return false;}}return true;};j.prototype.setExecutionScope=function(s){this._oExecutionScope=E(this._oCore,s);};j.prototype._setSelectedRules=function(r){this._aSelectedRules=[];this._oSelectedRulesIds={};if(!r){return;}if(!Array.isArray(r)){r=[r];}r.forEach(function(o){var e,i;if(!o.libName||!o.ruleId){q.sap.log.error("["+d.SUPPORT_ASSISTANT_NAME+"] Invalid Rule Descriptor.");return;}e=f.getRuleSet(o.libName);if(!e||!e.ruleset){q.sap.log.error("["+d.SUPPORT_ASSISTANT_NAME+"] Could not find Ruleset for library "+o.libName);return;}i=e.ruleset.getRules();if(!i||!i[o.ruleId]){q.sap.log.error("["+d.SUPPORT_ASSISTANT_NAME+"] Could not find Rule with id "+o.ruleId+" for library "+o.libName);return;}this._aSelectedRules.push(i[o.ruleId]);this._oSelectedRulesIds[o.ruleId]=true;},this);};j.prototype._mapExecutionScope=function(e){if(e.type==="subtree"){if(typeof e.selectors==="string"){e.parentId=e.selectors;}else if(Array.isArray(e.selectors)){e.parentId=e.selectors[0];}}else if(e.type==="components"){if(typeof e.selectors==="string"){e.components=[e.selectors];}else if(Array.isArray(e.selectors)){e.components=e.selectors;}}delete e.selectors;};j.prototype._done=function(){var i=I.getIssuesModel(),e=this._createElementTree();a.publish(c.ON_ANALYZE_FINISH,{issues:i,elementTree:e,elapsedTime:this._oAnalyzer.getElapsedTimeString()});I.saveHistory();};j.prototype._createElementTree=function(){var e=this._copyElementsStructure(),k=[];this._setContextElementReferences(e);for(var i in e){if(e[i].skip){continue;}k.push(e[i]);}return[{content:k,id:"WEBPAGE",name:"WEBPAGE"}];};j.prototype._setContextElementReferences=function(o){var e=this._oCore.mElements;for(var i in o){var k=o[i],p=e[i]==undefined?undefined:e[i].getParent();if(e[i]instanceof sap.ui.core.ComponentContainer){var l=e[i],n=l.getComponent();if(n){k.content.push(o[n]);o[n].skip=true;}}if(p){var r=p.getId();if(!o[r]){continue;}o[r].content.push(o[i]);o[i].skip=true;}}};j.prototype._copyElementsStructure=function(){var e={},t=this;var k=function(n,o){for(var i in n){if(n.hasOwnProperty(i)){var r=n[i];var s={content:[],id:r.getId(),name:(o==undefined)?r.getMetadata().getName():o};e[r.getId()]=s;}}};k(this._oExecutionScope.getElements());this._oExecutionScope.getElements().forEach(function(i){if(i instanceof sap.ui.core.ComponentContainer){var n=i.getComponent(),o=t._oCore.mObjects.component[n];if(o){k([o],"sap-ui-component");}}});switch(this._oExecutionScope._getType()){case"global":k(this._oCoreFacade.getUIAreas(),"sap-ui-area");k(this._oCoreFacade.getComponents(),"sap-ui-component");break;case"subtree":var p=this._oExecutionScope._getContext().parentId;k([this._oCore.mElements[p]]);break;case"components":var l=this._oExecutionScope._getContext().components;l.forEach(function(i){k([t._oCore.mObjects.component[i]],"sap-ui-component");});break;}return e;};j.prototype._getReportData=function(r){var i=I.groupIssues(I.getIssuesModel()),e=f.getRuleSets(),s=this._oSelectedRulesIds;return{issues:i,technical:this._oDataCollector.getTechInfoJSON(),application:this._oDataCollector.getAppInfo(),rules:I.getRulesViewModel(e,s,i),scope:{executionScope:this._oExecutionScope,scopeDisplaySettings:{executionScopes:r.executionScopes,executionScopeTitle:r.executionScopeTitle}},analysisDuration:this._oAnalyzer.getElapsedTimeString(),analysisDurationTitle:r.analysisDurationTitle,name:d.SUPPORT_ASSISTANT_NAME};};var m=new j();return m;},true);