/*!
 * SAP APF Analysis Path Framework
 * 
 * (c) Copyright 2012-2014 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.apf.core.instance");jQuery.sap.require('sap.apf.utils.utils');jQuery.sap.require("sap.apf.core.utils.uriGenerator");jQuery.sap.require("sap.apf.core.metadata");jQuery.sap.require("sap.apf.core.metadataFacade");jQuery.sap.require("sap.apf.core.metadataProperty");jQuery.sap.require("sap.apf.core.ajax");jQuery.sap.require("sap.apf.core.odataRequest");jQuery.sap.require("sap.apf.core.messageHandler");jQuery.sap.require("sap.apf.core.entityTypeMetadata");jQuery.sap.require("sap.apf.core.metadataFactory");jQuery.sap.require("sap.apf.core.textResourceHandler");jQuery.sap.require("sap.apf.core.configurationFactory");jQuery.sap.require("sap.apf.core.path");jQuery.sap.require("sap.apf.core.sessionHandler");jQuery.sap.require("sap.apf.core.resourcePathHandler");jQuery.sap.require("sap.apf.core.persistence");jQuery.sap.require("sap.apf.core.readRequest");jQuery.sap.require("sap.apf.core.readRequestByRequiredFilter");jQuery.sap.require("sap.apf.core.utils.fileExists");jQuery.sap.require("sap.apf.core.utils.annotationHandler");jQuery.sap.require("sap.ui.comp.smartfilterbar.ControlConfiguration");jQuery.sap.require("sap.ui.thirdparty.datajs");(function(){'use strict';sap.apf.core.Instance=function(a){var t=this;var m=a.instances.messageHandler;var s=a.instances.startParameter;var r;a=a||{};a.constructors=a.constructors||{};var I={instances:{messageHandler:m,coreApi:this},constructors:{Request:a.constructors.Request},exits:{binding:{afterGetFilter:a&&a.exits&&a.exits.binding&&a.exits.binding.afterGetFilter},path:{beforeAddingToCumulatedFilter:a&&a.exits&&a.exits.path&&a.exits.path.beforeAddingToCumulatedFilter}},functions:a.functions};var R;var M;var T;var c;var p;var S;var P;var A;var f;var b;var d=a&&a.instances&&a.instances.datajs||OData;this.destroy=function(){p.destroy();};this.ajax=function(i){var j=jQuery.extend(true,{},i);if(a.functions&&a.functions.ajax){j.functions=j.functions||{};j.functions.ajax=a.functions.ajax;}j.instances=j.instances||{};j.instances.messageHandler=m;return sap.apf.core.ajax(j);};this.odataRequest=function(i,j,E,B){var I={instances:{datajs:d}};sap.apf.core.odataRequestWrapper(I,i,j,E,B);};this.getStartParameterFacade=function(){return s;};this.getMessageHandler=function(){return m;};this.putMessage=function(i){return m.putMessage(i);};this.check=function(E,i,C){return m.check(E,i,C);};this.createMessageObject=function(C){return m.createMessageObject(C);};this.activateOnErrorHandling=function(O){m.activateOnErrorHandling(O);};this.setCallbackForMessageHandling=function(C){m.setMessageCallback(C);};this.setApplicationCallbackForMessageHandling=function(C){m.setApplicationMessageCallback(C);};this.getLogMessages=function(){return m.getLogMessages();};this.checkForTimeout=function(i){var j=sap.apf.core.utils.checkForTimeout(i);if(j){m.putMessage(j);}return j;};this.getUriGenerator=function(){return sap.apf.core.utils.uriGenerator;};this.getMetadata=function(i){return M.getMetadata(i);};this.getMetadataFacade=function(){return M.getMetadataFacade();};this.getEntityTypeMetadata=function(i,E){return M.getEntityTypeMetadata(i,E);};this.loadApplicationConfig=function(F){R.loadConfigFromFilePath(F);};this.loadTextElements=function(i){T.loadTextElements(i);};this.registerTextWithKey=function(k,i){T.registerTextWithKey(k,i);};this.getApplicationConfigProperties=function(){return R.getConfigurationProperties();};this.getResourceLocation=function(i){return R.getResourceLocation(i);};this.getPersistenceConfiguration=function(){return R.getPersistenceConfiguration();};this.getCategories=function(){return c.getCategories();};this.existsConfiguration=function(i){return c.existsConfiguration(i);};this.getStepTemplates=function(){return c.getStepTemplates();};this.registerSmartFilterBarInstance=function(i){if(!b){b=jQuery.Deferred();}b.resolve(i);};this.getSmartFilterBar=function(){if(!this.getSmartFilterBarConfiguration()){return null;}else if(!b){b=jQuery.Deferred();}return b;};this.getSmartFilterBarConfiguration=function(){return c.getSmartFilterBarConfiguration();};this.getSmartFilterBarPersistenceKey=function(i){return"APF"+c.getConfigHeader().AnalyticalConfiguration+i;};this.getSmartFilterbarDefaultFilterValues=function(){var i=jQuery.Deferred();var j=[];a.functions.getCombinedContext().done(function(l){l.getProperties().forEach(function(n){var q={key:n,visibleInAdvancedArea:true,defaultFilterValues:k(l,n)};j.push(new sap.ui.comp.smartfilterbar.ControlConfiguration(q));});i.resolve(j);});return i;function k(l,n){var q=l.getFilterTermsForProperty(n);var i=[];q.forEach(function(u){var v=new sap.ui.comp.smartfilterbar.SelectOption({low:u.getValue(),operator:u.getOp(),high:u.getHighValue(),sign:'I'});i.push(v);});return i;}};this.getReducedCombinedContext=function(){var i=jQuery.Deferred();a.functions.getCombinedContext().done(function(j){var k=t.getSmartFilterBar();if(k){k.done(function(l){var n=new sap.apf.core.utils.Filter(a.instances.messageHandler);var q=l.getFilters();q.forEach(function(u){n.addAnd(sap.apf.core.utils.Filter.transformUI5FilterToInternal(a.instances.messageHandler,u));});i.resolve(j.removeTermsByProperty(n.getProperties()));});}else{i.resolve(j);}});return i;};this.getFacetFilterConfigurations=function(){return c.getFacetFilterConfigurations();};this.getNavigationTargets=function(){return c.getNavigationTargets();};this.createStep=function(i,j,k){var l;m.check(i!==undefined&&typeof i==="string"&&i.length!==0,"sStepID is  unknown or undefined");l=c.createStep(i,k);p.addStep(l,j);return l;};this.getSteps=function(){return p.getSteps();};this.moveStepToPosition=function(i,n,j){p.moveStepToPosition(i,n,j);};this.updatePath=function(i,C){p.update(i,C);};this.removeStep=function(i,j){p.removeStep(i,j);};this.resetPath=function(i){if(i){r=p.serialize();}if(p){p.destroy();}p=new sap.apf.core.Path(I);};this.restoreOriginalPath=function(){if(r){p.destroy();p=new sap.apf.core.Path(I);p.deserialize(r);}};this.stepIsActive=function(i){return p.stepIsActive(i);};this.serialize=function(){var i=p.serialize();if(t.getSmartFilterBar()){t.getSmartFilterBar().done(function(j){i.smartFilterBar=j.fetchVariant();});}return i;};this.deserialize=function(i){if(i.smartFilterBar){if(!b){b=jQuery.Deferred();}b.done(function(j){j.applyVariant(i.smartFilterBar);});}p.deserialize(i);};this.getTextNotHtmlEncoded=function(l,i){return T.getTextNotHtmlEncoded(l,i);};this.getTextHtmlEncoded=function(l,i){return T.getTextHtmlEncoded(l,i);};this.isInitialTextKey=function(i){return(i===sap.apf.core.constants.textKeyForInitialText);};this.getMessageText=function(C,i){return T.getMessageText(C,i);};this.getXsrfToken=function(i){return S.getXsrfToken(i);};this.setDirtyState=function(i){S.setDirtyState(i);};this.isDirty=function(){return S.isDirty();};this.setPathName=function(n){S.setPathName(n);};this.getPathName=function(){return S.getPathName();};this.getCumulativeFilter=function(){return a.functions.getCumulativeFilter();};this.createReadRequest=function(i){var j=c.createRequest(i);var k;if(typeof i==='string'){k=c.getConfigurationById(i);}else{k=i;}return new sap.apf.core.ReadRequest(I,j,k.service,k.entityType);};this.createReadRequestByRequiredFilter=function(i){var j=c.createRequest(i);var k;if(typeof i==='string'){k=c.getConfigurationById(i);}else{k=i;}return new sap.apf.core.ReadRequestByRequiredFilter(I,j,k.service,k.entityType);};this.loadMessageConfiguration=function(i,j){m.loadConfig(i,j);};this.loadAnalyticalConfiguration=function(C){c.loadConfig(C);};this.savePath=function(i,j,k,l){var n;var N;var C;var E;if(typeof i==='string'&&typeof j==='string'&&typeof k==='function'){n=i;N=j;C=k;E=l;this.setPathName(N);P.modifyPath(n,N,C,E);}else if(typeof i==='string'&&typeof j==='function'){N=i;C=j;E=k;this.setPathName(N);P.createPath(N,C,E);}else{m.putMessage(sap.apf.core.createMessageObject({code:"5027",aParameters:[i,j,k]}));}};this.readPaths=function(C){P.readPaths(C);};this.openPath=function(i,C,n){function l(j,E,k){if(!k&&r){r=undefined;}if(!k){t.setPathName(j.path.AnalysisPathName);}C(j,E,k);}return P.openPath(i,l,n);};this.deletePath=function(i,C){P.deletePath(i,C);};this.createFilter=function(i){return new sap.apf.utils.Filter(m,i);};this.getActiveStep=function(){return p.getActiveSteps()[0];};this.getCumulativeFilterUpToActiveStep=function(){return p.getCumulativeFilterUpToActiveStep();};this.setActiveStep=function(j){p.makeStepActive(j);var k=p.getActiveSteps();var i;for(i=0;i<k.length;++i){p.makeStepInactive(k[i]);}return p.makeStepActive(j);};this.createFirstStep=function(i,j,k){var l=false;var n;n=t.getStepTemplates();n.forEach(function(q){l=q.id===i?true:l;});if(!l){m.putMessage(m.createMessageObject({code:'5036',aParameters:[i]}));}else{t.createStep(i,k,j);}};this.getFunctionCreateRequest=function(){return c.createRequest;};this.getAnnotationsForService=function(i){return A.getAnnotationsForService(i);};T=new((a&&a.constructors&&a.constructors.TextResourceHandler)||sap.apf.core.TextResourceHandler)(I);m.setTextResourceHandler(T);if(a.manifests){I.manifests=a.manifests;}f=new sap.apf.core.utils.FileExists({functions:{ajax:t.ajax}});var e={manifests:a.manifests,functions:{getComponentNameFromManifest:sap.apf.utils.getComponentNameFromManifest,getODataPath:sap.apf.core.utils.uriGenerator.getODataPath,getBaseURLOfComponent:sap.apf.core.utils.uriGenerator.getBaseURLOfComponent,addRelativeToAbsoluteURL:sap.apf.core.utils.uriGenerator.addRelativeToAbsoluteURL},instances:{fileExists:f}};A=new((a&&a.constructors&&a.constructors.AnnotationHandler)||sap.apf.core.utils.AnnotationHandler)(e);c=new sap.apf.core.ConfigurationFactory(I);var o={constructors:{EntityTypeMetadata:sap.apf.core.EntityTypeMetadata,Hashtable:(a&&a.constructors&&a.constructors.Hashtable)||sap.apf.utils.Hashtable,Metadata:(a&&a.constructors&&a.constructors.Metadata)||sap.apf.core.Metadata,MetadataFacade:(a&&a.constructors&&a.constructors.MetadataFacade)||sap.apf.core.MetadataFacade,MetadataProperty:(a&&a.constructors&&a.constructors.MetadataProperty)||sap.apf.core.MetadataProperty,ODataModel:(a&&a.constructors&&a.constructors.ODataModel)||sap.ui.model.odata.ODataModel},instances:{messageHandler:I.instances.messageHandler,coreApi:t,configurationFactory:c,annotationHandler:A},functions:{getServiceDocuments:c.getServiceDocuments}};M=new(a&&a.constructors&&a.constructors.MetadataFactory||sap.apf.core.MetadataFactory)(o);p=new sap.apf.core.Path(I);S=new(a&&a.constructors&&a.constructors.SessionHandler||sap.apf.core.SessionHandler)(I);var g={instances:{messageHandler:m,coreApi:this},functions:{getComponentName:a.functions&&a.functions.getComponentName}};P=new(a.constructors.Persistence||sap.apf.core.Persistence)(g);var h={instances:{coreApi:t,messageHandler:I.instances.messageHandler,fileExists:f},manifests:a.manifests};R=new(a&&a.constructors&&a.constructors.ResourcePathHandler||sap.apf.core.ResourcePathHandler)(h);if(a&&a.coreProbe){a.coreProbe({coreApi:this,startParameter:s,resourcePathHandler:R,textResourceHandler:T,configurationFactory:c,path:p,sessionHandler:S,persistence:P,fileExists:f});}};}());
