/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["jquery.sap.global","../library","sap/ui/base/EventProvider","../ve/thirdparty/html2canvas","../ve/dvl","./Scene","./NodeHierarchy","../ContentResource","../DownloadManager","./ViewStateManager","../DvlException","../Messages"],function(q,l,E,H,D,S,N,C,a,V,b,M){"use strict";var c=q.sap.log;function g(e){return e instanceof File?"local":"remote";}function d(e){return e instanceof File?e.name:e;}var f=function(e){Object.defineProperties(this,{source:{value:e,writable:false,enumerable:true},_refCount:{value:0,writable:true,enumerable:false}});};f.prototype.isInUse=function(){return this._refCount>0;};f.prototype.addRef=function(){++this._refCount;return this;};f.prototype.release=function(){--this._refCount;return this;};f.prototype.destroy=function(){};var h=function(e,v,i){f.call(this,e);Object.defineProperties(this,{content:{value:i,writable:false,enumerable:true},vdsSourceDatum:{value:v,writable:false,enumerable:true}});};h.prototype=Object.create(f.prototype);h.prototype.constructor=h;h.prototype.destroy=function(){if(this.vdsSourceDatum){this.vdsSourceDatum.release();}f.prototype.destroy.call(this);};var j=function(e,i,m){Object.defineProperties(this,{dvlSceneId:{value:e,writable:false,enumerable:true},sourceDatum:{value:i,writable:false,enumerable:true},root:{value:!!m,writable:false,enumerable:true},_refCount:{value:0,writable:true,enumerable:false}});};j.prototype.isInUse=function(){return this._refCount>0;};j.prototype.addRef=function(){++this._refCount;return this;};j.prototype.release=function(){--this._refCount;return this;};j.prototype.destroy=function(){if(this.sourceDatum){this.sourceDatum.release();}};var k=function(e,i){Object.defineProperties(this,{source:{value:e.getSource()},sourceType:{value:e.getSourceType()},sourceId:{value:e.getSourceId(),writable:true},name:{value:e.getName()},localMatrix:{value:e.getLocalMatrix(),writable:true},password:{value:e.getPassword()},children:{value:e.getContentResources().map(function(e){return new k(e);})},dvlSceneDatum:{value:null,writable:true},nodeProxy:{value:null,writable:true},fake:{value:!!i},sourceProperties:{value:null,writable:true}});e._shadowContentResource=this;};k.prototype.destroy=function(){if(this.dvlSceneDatum){this.dvlSceneDatum.release();}};var n=function(v,e){Object.defineProperties(this,{vkScene:{value:v},shadowContentResource:{value:e}});};var G=E.extend("sap.ui.vk.dvl.GraphicsCore",{metadata:{publicMethods:["attachSceneLoadingFinished","attachSceneLoadingProgress","attachSceneLoadingStarted","buildSceneTree","buildSceneTreeAsync","createViewStateManager","destroyScene","destroyViewStateManager","detachSceneLoadingFinished","detachSceneLoadingProgress","detachSceneLoadingStarted","getApi","loadContentResourcesAsync","showDebugInfo","updateSceneTree","updateSceneTreeAsync"]},constructor:function(e,w){E.apply(this);var i=q.extend({},e,{filePackagePrefixURL:q.sap.getResourcePath("sap/ve")+"/"});this._dvlClientId=q.sap.uid();this._dvl=sap.ve.dvl.createRuntime(i);this._dvl.CreateCoreInstance(this._dvlClientId);sap.ui.vk.dvl.checkResult(this._dvl.Core.Init(this._DVLMajorVersion,this._DVLMinorVersion));var u=sap.ui.getCore();u.attachLocalizationChanged(this._onlocalizationChanged,this);sap.ui.vk.dvl.checkResult(this._dvl.Core.SetLocale(u.getConfiguration().getLanguageTag()));this._canvas=this._createRenderingCanvasAndContext(w);this._rendererId=sap.ui.vk.dvl.getPointer(this._dvl.Core.CreateRenderer());this._dvl.Renderer.SetOptionF(sap.ve.dvl.DVLRENDEROPTIONF.DVLRENDEROPTIONF_DPI,96*window.devicePixelRatio,this._rendererId);this._sourceData=[];this._dvlSceneData=[];this._vkSceneData=[];this._viewports=[];this._renderLoopRequestId=null;this._renderLoopFunction=this._renderLoop.bind(this);this._viewStateManagers=[];},_DVLMajorVersion:7,_DVLMinorVersion:2});G.prototype.destroy=function(){sap.ui.getCore().detachLocalizationChanged(this._onlocalizationChanged,this);var v=this._viewports.slice();v.reverse();v.forEach(function(e){e.control.setGraphicsCore(null);});this._viewports=null;this._cleanupVkSceneData();this._vkSceneData=null;this._cleanupDvlSceneData();this._dvlSceneData=null;this._cleanupSourceData();this._sourceData=null;this._viewStateManagers.slice().forEach(this.destroyViewStateManager.bind(this));this._viewStateManagers=null;this._webGLContext=null;this._canvas=null;this._dvl.Core.DeleteRenderer(this._rendererId);this._rendererId=null;this._dvl.Core.Release();this._dvl=null;E.prototype.destroy.apply(this);};G.prototype._createRenderingCanvasAndContext=function(w){var e=document.createElement("canvas");e.id=q.sap.uid();this._webGLContext=this._dvl.Core.CreateWebGLContext(e,w);return e;};G.prototype._getCanvas=function(){return this._canvas;};G.prototype._getWebGLContext=function(){return this._webGLContext;};G.prototype._getDvl=function(){return this._dvl;};G.prototype._getDvlClientId=function(){return this._dvlClientId;};G.prototype._findSourceData=function(e){var i=Object.getOwnPropertyNames(e);return this._sourceData.filter(function(m){return i.every(function(t){return e[t]===m[t];});});};G.prototype._destroySourceDatum=function(e){if(!(e instanceof h)){this._dvl.Core.DeleteFileByUrl(d(e.source),g(e.source));}e.destroy();return this;};G.prototype._cleanupSourceData=function(){var e=false;for(var i=this._sourceData.length-1;i>=0;--i){var m=this._sourceData[i];if(!m.isInUse()){var t=m instanceof h?m.vdsSourceDatum:null;this._sourceData.splice(i,1);this._destroySourceDatum(m);if(t&&!t.isInUse()){e=true;}}}if(e){this._cleanupSourceData();}return this;};G.prototype._findDvlSceneData=function(e){var i=Object.getOwnPropertyNames(e);return this._dvlSceneData.filter(function(m){return i.every(function(t){return e[t]===m[t];});});};G.prototype._destroyDvlSceneDatum=function(e){this._dvl.Scene.Release(e.dvlSceneId);e.destroy();return this;};G.prototype._cleanupDvlSceneData=function(){for(var i=this._dvlSceneData.length-1;i>=0;--i){var e=this._dvlSceneData[i];if(!e.isInUse()){this._dvlSceneData.splice(i,1);this._destroyDvlSceneDatum(e);}}};G.prototype._findVkSceneData=function(e){var i=Object.getOwnPropertyNames(e);return this._vkSceneData.filter(function(m){return i.every(function(t){return e[t]===m[t];});});};G.prototype._cleanupVkSceneData=function(){for(var i=this._vkSceneData.length-1;i>=0;--i){this.destroyScene(this._vkSceneData[i].vkScene);}};G.prototype._destroyShadowContentResource=function(v,i){if(i.children){i.children.forEach(this._destroyShadowContentResource.bind(this,v));}if(i.nodeProxy){try{sap.ui.vk.dvl.checkResult(this._dvl.Scene.DeleteNode(v.getSceneRef(),i.nodeProxy.getNodeRef()));}catch(e){var m="Failed to delete node with ID = "+i.nodeProxy.getNodeRef()+".";if(e instanceof b){m+=" Error code: "+e.code+". Message: "+e.message+".";}c.error(m);}v.getDefaultNodeHierarchy().destroyNodeProxy(i.nodeProxy);}i.destroy();};G.prototype._filterContentResources=function(e,i){var m=[];e.forEach(function enumerate(t){if(i(t)){m.push(t);}t.getContentResources().forEach(enumerate);});return m;};G.prototype._getContentResourcesWithMissingPasswords=function(i){var l=this._dvl.Library;return this._filterContentResources(i,function(m){var t=m.getSource();try{return t&&(sap.ui.vk.dvl.getJSONObject(l.RetrieveInfo(d(t),g(t))).flags&sap.ve.dvl.DVLFILEFLAG.ENCRYPTED)&&!m.getPassword();}catch(e){c.warning("Failed to get information from Emscripten virtual file system about file '"+d(t)+"'");return false;}});};G.prototype._getContentResourcesWithEncryptedVds3=function(i){var l=this._dvl.Library;return this._filterContentResources(i,function(m){var t=m.getSource();if(t){try{var u=sap.ui.vk.dvl.getJSONObject(l.RetrieveInfo(d(t),g(t)));return u.major<=3&&(u.flags&sap.ve.dvl.DVLFILEFLAG.ENCRYPTED);}catch(e){c.warning("Failed to get information from Emscripten virtual file system about file '"+d(t)+"'");return false;}}else{return false;}});};G.prototype._collectAndCheckSourceProperties=function(i){var m=i.dvlSceneDatum.sourceDatum;if(!m){return this;}try{if(m instanceof h){m=m.vdsSourceDatum;}var t=sap.ui.vk.dvl.getJSONObject(this._dvl.Library.RetrieveInfo(d(m.source),g(m.source)));i.sourceProperties={version:{major:t.major,minor:t.minor}};if(t.flags&(sap.ve.dvl.DVLFILEFLAG.PAGESCOMPRESSED|sap.ve.dvl.DVLFILEFLAG.WHOLEFILECOMPRESSED)){i.sourceProperties.compressed=true;}if(t.flags&sap.ve.dvl.DVLFILEFLAG.ENCRYPTED){i.sourceProperties.encrypted=true;}}catch(e){c.warning("Failed to get information from Emscripten virtual file system about file '"+d(i.source)+"'");}return this;};G.prototype.loadContentResourcesAsync=function(e,i,t){var u=this,v=[],w=new Map();e.forEach(function enumerate(m){var A=m.getSource();if(A&&v.indexOf(A)<0&&u._findSourceData({source:A}).length===0){v.push(A);var B=m.getSource();var F;if(B instanceof Object){F=B.name;}else{F=B;}if(m.getSourceType()==="vdsl"||m.getSourceType()==="vds"&&F.split(".").pop()==="vdsl"){w.set(A,{});}}m.getContentResources().forEach(enumerate);});var x=[];if(v.length>0){var y;var z=new a(v).attachItemSucceeded(function(A){var B=A.getParameter("source");var F=A.getParameter("response");if(w.has(B)){var I=sap.ui.vk.utf8ArrayBufferToString(F);if(I.trim().length===0){y=y||[];y.push({source:B,status:M.VIT22.code,statusText:sap.ui.vk.getResourceBundle().getText(M.VIT22.summary)});c.error(sap.ui.vk.getResourceBundle().getText(M.VIT22.summary),M.VIT22.code,"sap.ui.vk.dvl.GraphicsCore");return;}else{var J=I.split(/\n|\r\n/);var m=J[0].match(/^file=(.+)$/);if(!m){y=y||[];y.push({source:B,status:M.VIT23.code,statusText:sap.ui.vk.getResourceBundle().getText(M.VIT23.summary)});c.error(sap.ui.vk.getResourceBundle().getText(M.VIT23.summary),M.VIT23.code,"sap.ui.vk.dvl.GraphicsCore");return;}else{var K=w.get(B);K.content=J;var L=m[1];var O=L;var P=new URI(O);if(P.is("relative")){if(B instanceof File){y=y||[];y.push({source:B,status:M.VIT24.code,statusText:sap.ui.vk.getResourceBundle().getText(M.VIT24.summary)});c.error(sap.ui.vk.getResourceBundle().getText(M.VIT24.summary),M.VIT24.code,"sap.ui.vk.dvl.GraphicsCore");return;}else{var Q=new URI(B);L=P.absoluteTo(Q).href();}}K.referencedSource=L;K.content[0]=K.content[0].replace(O,this._dvl.Core.GetFilename(K.referencedSource,"remote"));if(v.indexOf(K.referencedSource)<0&&this._findSourceData({source:K.referencedSource}).length===0){v.push(K.referencedSource);z.queue(K.referencedSource);}}}}else{var R=B instanceof File;var T=R?B.name:B;var U=g(B);this._dvl.Core.CreateFileFromArrayBuffer(F,T,U);x.push(new f(B));}},this).attachAllItemsCompleted(function(m){Array.prototype.push.apply(this._sourceData,x);w.forEach(function(A,B){var F=this._findSourceData({source:A.referencedSource})[0];var I=new h(B,F,A.content.join("\n"));this._sourceData.push(I);F.addRef();}.bind(this));if(i){i(y);}},this).attachItemFailed(function(m){y=y||[];y.push({source:m.getParameter("source"),status:m.getParameter("status"),statusText:m.getParameter("statusText")});},this);if(t){z.attachItemProgress(t,this);}z.start();}else if(i){i();}return this;};G.prototype._buildPlaceholders=function(e,i,m,t){var u=[];t.forEach(function build(i,m,v){var w=this._dvl.Scene.CreateNode(e.getSceneRef(),i,v.name,m);v.nodeProxy=e.createNodeProxy(w);if(v.localMatrix){v.nodeProxy.setLocalMatrix(v.localMatrix);}if(v.source){u.push(v);}v.children.forEach(build.bind(this,w,null));}.bind(this,i,m));return u;};G.prototype._updatePlaceholders=function(v,e,m){var t=this,u=v.getDefaultNodeHierarchy(),w=[];(function update(x,m,y){function z(F,I){if(!F&&!I){return true;}else if(!!F^!!I){return false;}else{return F.source===I.getSource()&&F.sourceType===I.getSourceType()&&F.name===I.getName()&&F.password===I.getPassword();}}function A(F,I){I._shadowContentResource=F;F.sourceId=I.getSourceId();F.localMatrix=I.getLocalMatrix();if(F.nodeProxy){F.nodeProxy.setLocalMatrix(F.localMatrix);}}var i=0;var B=q.sap.arrayDiff(x,m,z,true);B.forEach(function(F){for(;i<F.index;++i){update(x[i].children,m[i].getContentResources(),x[i].nodeProxy.getNodeRef());A(x[i],m[i]);}if(F.type==="delete"){t._destroyShadowContentResource(v,x[F.index]);x.splice(F.index,1);}else if(F.type==="insert"){var I;if(i<x.length&&x[i].nodeProxy){I=x[i].nodeProxy.getNodeRef();}var J=new k(m[F.index]);w=w.concat(t._buildPlaceholders(u,y,I,[J]));x.splice(F.index,0,J);++i;}});for(;i<x.length;++i){update(x[i].children,m[i].getContentResources(),x[i].nodeProxy&&x[i].nodeProxy.getNodeRef());A(x[i],m[i]);}})(e.fake?e.children:[e],m,null);return w;};G.prototype._loadAndMergeContentResource=function(i,m){if(m.source){var t=this._findSourceData({source:m.source})[0];if(!t){c.warning("Failed to load content resource with sourceId '"+m.sourceId+"' due to failed downloading from URL '"+d(m.source)+"'.");}else{var u=m.nodeProxy.getNodeRef();var v=this._findDvlSceneData({sourceDatum:t,root:false})[0];if(!v){try{v=new j(sap.ui.vk.dvl.getPointer(t instanceof h?this._dvl.Core.LoadSceneFromVDSL(t.content,m.password):this._dvl.Core.LoadSceneByUrl(d(m.source),m.password,g(m.source))),t,false);}catch(e){c.error(sap.ui.vk.getResourceBundle().getText(M.VIT34.summary)+": "+d(m.source),M.VIT34.code,"sap.ui.vk.dvl.GraphicsCore");return;}this._dvlSceneData.push(v);t.addRef();}m.dvlSceneDatum=v;v.addRef();this._collectAndCheckSourceProperties(m);var w=i.getSceneRef(),x=i.getChildren(u)[0];this._dvl.Scene.RetrieveSceneInfo(v.dvlSceneId,sap.ve.dvl.DVLSCENEINFO.DVLSCENEINFO_CHILDREN).ChildNodes.forEach(function(y){this._dvl.Scene.CreateNodeCopy(w,y,u,sap.ve.dvl.DVLCREATENODECOPYFLAG.COPY_CHILDREN,null,x);}.bind(this));}}};G.prototype.buildSceneTree=function(i){if(i.length===0){return null;}var m;var t;var u=i.map(function(y){return new k(y);});if(u.length===1){t=u[0];if(t.source){var v=this._findSourceData({source:t.source})[0];try{m=new j(sap.ui.vk.dvl.getPointer(v instanceof h?this._dvl.Core.LoadSceneFromVDSL(v.content,t.password):this._dvl.Core.LoadSceneByUrl(d(t.source),t.password,g(t.source))),v,true);}catch(e){c.error(sap.ui.vk.getResourceBundle().getText(M.VIT34.summary)+": "+d(t.source),M.VIT34.code,"sap.ui.vk.dvl.GraphicsCore");return null;}v.addRef();}else{m=new j(this._dvl.Core.CreateEmptyScene(),null,true);}}else{var w=new C({sourceType:"vds",sourceId:q.sap.uid()});t=new k(w,true);w.destroy();w=null;Array.prototype.push.apply(t.children,u);u=[t];m=new j(this._dvl.Core.CreateEmptyScene(),null,true);}this._dvlSceneData.push(m);t.dvlSceneDatum=m;m.addRef();this._collectAndCheckSourceProperties(t);var x=new S(this,m.dvlSceneId);this._vkSceneData.push(new n(x,t));this._buildPlaceholders(x.getDefaultNodeHierarchy(),null,null,t.children).forEach(this._loadAndMergeContentResource.bind(this,x.getDefaultNodeHierarchy()));return x;};G.prototype.updateSceneTree=function(v,e,i){if(e.length===0){return null;}var m;var t=this._getContentResourcesWithEncryptedVds3(e);if(t.length>0){c.error(sap.ui.vk.getResourceBundle().getText(M.VIT25.summary),M.VIT25.code,"sap.ui.vk.dvl.GraphicsCore");m=m||{};m.contentResourcesWithEncryptedVds3=t;}var u=this._getContentResourcesWithMissingPasswords(e);if(u.length>0){c.error(sap.ui.vk.getResourceBundle().getText(M.VIT21.summary),M.VIT21.code,"sap.ui.vk.dvl.GraphicsCore");m=m||{};m.contentResourcesWithMissingPasswords=u;}if(m&&i){i(m);}if(!v){return this.buildSceneTree(e);}var w=this._findVkSceneData({vkScene:v})[0].shadowContentResource;var x=!!w.source;var y=e.length===1&&!!e[0].getSource();if(!(x&&y&&w.source===e[0].getSource()||!x&&!y&&w.fake===e.length>1)){return this.buildSceneTree(e);}this._updatePlaceholders(v,w,e).forEach(this._loadAndMergeContentResource.bind(this,v.getDefaultNodeHierarchy()));v.getDefaultNodeHierarchy().fireChanged();return v;};G.prototype._loadDvlSceneAsync=function(i,m){return new Promise(function(t,u){var v;var w=function(z){v();this.fireSceneLoadingFinished({source:i.source,sceneId:z.sceneId});t(z.sceneId);};var x=function(z){v();var A=sap.ve.dvl.DVLRESULT.getDescription?sap.ve.dvl.DVLRESULT.getDescription(z.errorCode):"";var B={source:i.source,errorCode:z.errorCode,errorMessage:A};this.fireSceneLoadingFinished(B);u(B);};var y=function(z,A){this.fireSceneLoadingProgress({source:d(i.source),percentage:A});return true;}.bind(this);v=function(){this._dvl.Client.NotifyFileLoadProgress=null;this._dvl.Client.detachSceneFailed(x,this);this._dvl.Client.detachSceneLoaded(w,this);}.bind(this);this._dvl.Client.attachSceneLoaded(w,this);this._dvl.Client.attachSceneFailed(x,this);this._dvl.Client.NotifyFileLoadProgress=y;this.fireSceneLoadingStarted({source:d(i.source)});try{sap.ui.vk.dvl.checkResult(i instanceof h?this._dvl.Core.LoadSceneFromVDSLAsync(i.content,m):this._dvl.Core.LoadSceneByUrlAsync(d(i.source),m,g(i.source)));}catch(e){v();x.call(this,{errorCode:e instanceof b?e.code:sap.ve.dvl.DVLRESULT.FAIL});}}.bind(this));};var o=function(e,i){return new Promise(function(m){(function step(t){if(t>=e.length){m();}else{i(e[t]).catch(function(){}).then(function(){step(t+1);});}})(0);});};G.prototype._loadAndMergeContentResourcesAsync=function(e,i){var m,t=this;return o(i,function(u){if(u.source){var v=t._findSourceData({source:u.source})[0];if(!v){var w="Failed to load content resource with sourceId '"+u.sourceId+"' due to failed downloading from URL '"+d(u.source)+"'.";c.warning(w);m=m||[];m.push({errorMessage:w,source:u.source});return Promise.reject();}return(function(){var x=t._findDvlSceneData({sourceDatum:v,root:false})[0];if(x){return Promise.resolve(x);}else{return t._loadDvlSceneAsync(v,u.password).then(function(y){x=new j(y,v,false);t._dvlSceneData.push(x);v.addRef();return Promise.resolve(x);},function(y){m=m||[];m.push(y);return Promise.reject();});}})().then(function(x){u.dvlSceneDatum=x;x.addRef();t._collectAndCheckSourceProperties(u);var y=u.nodeProxy.getNodeRef(),z=e.getSceneRef(),A=e.getChildren(y)[0];t._dvl.Scene.RetrieveSceneInfo(x.dvlSceneId,sap.ve.dvl.DVLSCENEINFO.DVLSCENEINFO_CHILDREN).ChildNodes.forEach(function(B){t._dvl.Scene.CreateNodeCopy(z,B,y,sap.ve.dvl.DVLCREATENODECOPYFLAG.COPY_CHILDREN,null,A);});return Promise.resolve();});}return Promise.resolve();}).then(function(){return Promise.resolve(m);});};G.prototype.buildSceneTreeAsync=function(e){if(e.length===0){return Promise.resolve(null);}var i=e.map(function(m){return new k(m);});return function(){var m;if(i.length===1){m=i[0];if(m.source){var t=this._findSourceData({source:m.source})[0];if(t){return this._loadDvlSceneAsync(t,m.password).then(function(v){var w=new j(v,t,true);t.addRef();return Promise.resolve({shadowContentResource:m,dvlSceneDatum:w});});}else{return Promise.reject({errorMessage:"Failed to download the root content resource.",source:m.source});}}return Promise.resolve({shadowContentResource:m,dvlSceneDatum:new j(this._dvl.Core.CreateEmptyScene(),null,true)});}else{var u=new C({sourceType:"vds",sourceId:q.sap.uid()});m=new k(u,true);u.destroy();u=null;Array.prototype.push.apply(m.children,i);i=[m];return Promise.resolve({shadowContentResource:m,dvlSceneDatum:new j(this._dvl.Core.CreateEmptyScene(),null,true)});}}.call(this).then(function(m){this._dvlSceneData.push(m.dvlSceneDatum);m.shadowContentResource.dvlSceneDatum=m.dvlSceneDatum;m.dvlSceneDatum.addRef();this._collectAndCheckSourceProperties(m.shadowContentResource);var v=new S(this,m.dvlSceneDatum.dvlSceneId);this._vkSceneData.push(new n(v,m.shadowContentResource));var t=v.getDefaultNodeHierarchy();return this._loadAndMergeContentResourcesAsync(t,this._buildPlaceholders(v.getDefaultNodeHierarchy(),null,null,m.shadowContentResource.children)).then(function(u){return Promise.resolve({scene:v,failureReason:u});});}.bind(this));};G.prototype.updateSceneTreeAsync=function(v,e){if(e.length===0){return Promise.resolve(null);}var i=this._getContentResourcesWithEncryptedVds3(e);if(i.length>0){c.error(sap.ui.vk.getResourceBundle().getText(M.VIT25.summary),M.VIT25.code,"sap.ui.vk.dvl.GraphicsCore");}var m=this._getContentResourcesWithMissingPasswords(e);if(m.length>0){c.error(sap.ui.vk.getResourceBundle().getText(M.VIT21.summary),M.VIT21.code,"sap.ui.vk.dvl.GraphicsCore");}if(!v){return this.buildSceneTreeAsync(e);}var t=this._findVkSceneData({vkScene:v})[0].shadowContentResource;var u=!!t.source;var w=e.length===1&&!!e[0].getSource();if(!(u&&w&&t.source===e[0].getSource()||!u&&!w&&t.fake===e.length>1)){return this.buildSceneTreeAsync(e);}return new Promise(function(x,y){var z=v.getDefaultNodeHierarchy();this._loadAndMergeContentResourcesAsync(z,this._updatePlaceholders(v,t,e)).then(function(A){x({scene:v,failureReason:A});z.fireChanged();});}.bind(this));};G.prototype.destroyScene=function(v){var e;for(e=0;e<this._vkSceneData.length;++e){if(this._vkSceneData[e].vkScene===v){break;}}if(e===this._vkSceneData.length){c.warning("Scene with id '"+v.getId()+"' is not created by this GraphicsCore.");return this;}var i=this._vkSceneData.splice(e,1)[0];this._destroyShadowContentResource(v,i.shadowContentResource);v.destroy();return this;};var p=function(e,m,t){for(var i=0,u=e.length;i<u;++i){if(m.call(t,e[i],i,e)){return i;}}return-1;};var r=function(v,e){return p(v,function(i){return i.control===e;});};var s=function(v,e){return p(v,function(i){return i.rendererId===e;});};G.prototype._registerViewport=function(v){if(r(this._viewports,v)>=0){return false;}var e={control:v,canvas:null,rendererId:null};if(this._viewports.length===0){e.canvas=this._canvas;e.rendererId=this._rendererId;this._startRenderLoop();}else{if(this._viewports.length===1){var i=this._viewports[0];i.control._setCanvas(i.canvas=document.createElement("canvas"));this._dvl.Client.attachFrameFinished(this._handleFrameFinished,this);}e.canvas=document.createElement("canvas");e.rendererId=this._dvl.Core.CreateRenderer();}v._setCanvas(e.canvas);v._setRenderer(e.rendererId);v.attachResize(this._handleViewportResize,this);this._viewports.push(e);return true;};G.prototype._deregisterViewport=function(v){var i=r(this._viewports,v);if(i<0){return false;}var e=this._viewports.splice(i,1)[0];if(this._viewports.length===0){this._stopRenderLoop();}else{if(this._viewports.length===1){this._dvl.Client.detachFrameFinished(this._handleFrameFinished,this);var m=this._viewports[1-i];m.control._setCanvas(m.canvas=this._canvas);}this._dvl.Core.DeleteRenderer(e.rendererId);}v.detachResize(this._handleViewportResize,this);v._setRenderer(null);v._setCanvas(null);return true;};G.prototype._getViewportCount=function(){return this._viewports.length;};G.prototype._handleViewportResize=function(e){if(this._viewports.length>1){this._canvas.width=Math.max.apply(null,this._viewports.map(function(v){return v.canvas.width;}));this._canvas.height=Math.max.apply(null,this._viewports.map(function(v){return v.canvas.height;}));}};G.prototype._startRenderLoop=function(){if(!this._renderLoopRequestId){this._renderLoopRequestId=window.requestAnimationFrame(this._renderLoopFunction);}return this;};G.prototype._stopRenderLoop=function(){if(this._renderLoopRequestId){window.cancelAnimationFrame(this._renderLoopRequestId);this._renderLoopRequestId=null;}return this;};G.prototype._renderLoop=(function(){var e;return function(){var m=this._viewports.length>1;this._viewports.forEach(function(v){var i=v.canvas,t=v.rendererId;this._dvl.Renderer._processCommandQueue(t);if(i.width>0&&i.height>0&&this._dvl.Renderer.ShouldRenderFrame(t)){if(m&&e!==t){this._dvl.Renderer.SetDimensions(i.width,i.height,t);}v.control.renderFrame();e=t;}},this);this._renderLoopRequestId=window.requestAnimationFrame(this._renderLoopFunction);};})();G.prototype._handleFrameFinished=function(e){if(this._viewports.length>1){var i=s(this._viewports,e.rendererId);if(i>=0){var t=this._viewports[i].canvas,m=t.getContext("2d"),u=t.width,v=t.height;m.drawImage(this._canvas,0,this._canvas.height-v,u,v,0,0,u,v);}}};G.prototype.createViewStateManager=function(e,i){var v=new sap.ui.vk.dvl.ViewStateManager();v._setNodeHierarchy(e).setShouldTrackVisibilityChanges(i);this._viewStateManagers.push(v);return v;};G.prototype.destroyViewStateManager=function(v){var i=this._viewStateManagers.indexOf(v);if(i>=0){this._viewStateManagers.splice(i,1)[0].destroy();}return this;};G.prototype.showDebugInfo=function(e){this._viewports.forEach(function(v){v.control.setShowDebugInfo(e);});return this;};G.prototype.getApi=function(e){switch(e){case sap.ui.vk.dvl.GraphicsCoreApi.LegacyDvl:return this._dvl;default:return null;}};G.prototype.collectGarbage=function(){this._cleanupDvlSceneData();this._cleanupSourceData();return this;};G.prototype._onlocalizationChanged=function(e){if(e.getParameter("changes").language){sap.ui.vk.dvl.checkResult(this._dvl.Core.SetLocale(sap.ui.getCore().getConfiguration().getLanguageTag()));}};G.prototype.setDecryptionHandler=function(e){this._dvl.Client.setDecryptionHandler(e);return this;};G.prototype.getDecryptionHandler=function(){return this._dvl.Client.getDecryptionHandler();};G.prototype.attachSceneLoadingFinished=function(e,i,m){return this.attachEvent("sceneLoadingFinished",e,i,m);};G.prototype.detachSceneLoadingFinished=function(e,i){return this.detachEvent("sceneLoadingFinished",e,i);};G.prototype.fireSceneLoadingFinished=function(e,i,m){return this.fireEvent("sceneLoadingFinished",e,i,m);};G.prototype.attachSceneLoadingProgress=function(e,i,m){return this.attachEvent("sceneLoadingProgress",e,i,m);};G.prototype.detachSceneLoadingProgress=function(e,i){return this.detachEvent("sceneLoadingProgress",e,i);};G.prototype.fireSceneLoadingProgress=function(e,i,m){return this.fireEvent("sceneLoadingProgress",e,i,m);};G.prototype.attachSceneLoadingStarted=function(e,i,m){return this.attachEvent("sceneLoadingStarted",e,i,m);};G.prototype.detachSceneLoadingStarted=function(e,i){return this.detachEvent("sceneLoadingStarted",e,i);};G.prototype.fireSceneLoadingStarted=function(e,i,m){return this.fireEvent("sceneLoadingStarted",e,i,m);};return G;});
