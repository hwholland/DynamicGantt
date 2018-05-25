/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["jquery.sap.global","sap/ui/core/Element","../ContentConnector","../ViewStateManagerBase"],function(q,E,C,V){"use strict";var a;var b=V.extend("sap.ui.vk.dvl.ViewStateManager",{metadata:{publicMethods:["enumerateSelection","getNodeHierarchy","getOpacity","getSelectionState","getTintColor","getVisibilityChanges","getVisibilityState","setOpacity","setSelectionState","setTintColor","setVisibilityState"]}});var c=b.getMetadata().getParent().getClass().prototype;b.prototype.init=function(){if(c.init){c.init.call(this);}this._nodeHierarchy=null;this._dvl=null;this._nodeStates=new Map();this._selectedNodes=new Set();this._visibilityTracker=new a();};b.prototype._setContent=function(d){var e=null;if(d&&d instanceof sap.ui.vk.dvl.Scene){e=d;}this._setScene(e);};b.prototype._onAfterUpdateContentConnector=function(){this._setContent(this._contentConnector.getContent());};b.prototype._onBeforeClearContentConnector=function(){this._setScene(null);};b.prototype._handleContentReplaced=function(e){var d=e.getParameter("newContent");this._setContent(d);};b.prototype._setScene=function(d){if(d){this._setNodeHierarchy(d.getDefaultNodeHierarchy());}else{this._setNodeHierarchy(null);}return this;};b.prototype._setNodeHierarchy=function(n){var o=this._nodeHierarchy;if(this._nodeHierarchy){this._dvl.Client.detachStepEvent(this._handleStepEvent,this);this._nodeHierarchy=null;this._dvl=null;this._nodeStates.clear();this._selectedNodes.clear();this._visibilityTracker.clear();}if(n){var d=n.getScene(),e=d.getSceneRef();this._nodeHierarchy=n;this._dvl=d.getGraphicsCore().getApi(sap.ui.vk.dvl.GraphicsCoreApi.LegacyDvl);this._dvl.Client.attachStepEvent(this._handleStepEvent,this);var t=this,v=[],h=[],f=[],u=[];t._dvl.Scene.RetrieveSceneInfo(e,sap.ve.dvl.DVLSCENEINFO.DVLSCENEINFO_CHILDREN|sap.ve.dvl.DVLSCENEINFO.DVLSCENEINFO_HOTSPOTS).ChildNodes.forEach(function addNodeRecursive(i){var j=t._dvl.Scene.RetrieveNodeInfo(e,i,sap.ve.dvl.DVLNODEINFO.DVLNODEINFO_FLAGS|sap.ve.dvl.DVLNODEINFO.DVLNODEINFO_CHILDREN);t._nodeStates.set(i,{flags:j.Flags});if(j.Flags&sap.ve.dvl.DVLNODEFLAG.DVLNODEFLAG_SELECTED){t._selectedNodes.add(i);}(j.Flags&sap.ve.dvl.DVLNODEFLAG.DVLNODEFLAG_VISIBLE?v:h).push(i);(j.Flags&sap.ve.dvl.DVLNODEFLAG.DVLNODEFLAG_SELECTED?f:u).push(i);j.ChildNodes.forEach(addNodeRecursive);});this.fireSelectionChanged({selected:f,unselected:u});this.fireVisibilityChanged({visible:v,hidden:h});}if(n!==o){this.fireNodeHierarchyReplaced({oldNodeHierarchy:o,newNodeHierarchy:n});}return this;};b.prototype.getNodeHierarchy=function(){return this._nodeHierarchy;};b.prototype.getVisibilityChanges=function(){return this.getShouldTrackVisibilityChanges()?this._visibilityTracker.getInfo(this.getNodeHierarchy()):null;};b.prototype.getVisibilityComplete=function(){var n=this.getNodeHierarchy(),d=n.findNodesByName(),v=[],h=[];d.forEach(function(e){var f=n.createNodeProxy(e),i=q.grep(f.getVeIds(),function(i){return i.type==="VE_LOCATOR";});i=Array.isArray(i)&&i.length>0?i[0].fields[0].value:null;n.destroyNodeProxy(f);if(i){if(this.getVisibilityState(e)){v.push(i);}else{h.push(i);}}},this);return{visible:v,hidden:h};};var g=function(n,f,d){return n.has(d)&&(n.get(d).flags&f)!==0;};b.prototype._getVisibilityFlagState=function(n){return g(this._nodeStates,sap.ve.dvl.DVLNODEFLAG.DVLNODEFLAG_VISIBLE,n);};b.prototype._getSelectionFlagState=function(n){return g(this._nodeStates,sap.ve.dvl.DVLNODEFLAG.DVLNODEFLAG_SELECTED,n);};var s=function(n,f,d,e){if(n.has(e)){var i=n.get(e);i.flags=i.flags&~d|f&d;}else{n.set(e,{flags:f&d});}};b.prototype._setFlags=function(n,f,d){if(d&sap.ve.dvl.DVLNODEFLAG.DVLNODEFLAG_VISIBLE){this.setVisibilityState(n,(f&sap.ve.dvl.DVLNODEFLAG.DVLNODEFLAG_VISIBLE)!==0,false);}if(d&sap.ve.dvl.DVLNODEFLAG.DVLNODEFLAG_SELECTED){this.setSelectionState(n,(f&sap.ve.dvl.DVLNODEFLAG.DVLNODEFLAG_SELECTED)!==0,false);}s(this._nodeStates,f,d&~(sap.ve.dvl.DVLNODEFLAG.DVLNODEFLAG_VISIBLE|sap.ve.dvl.DVLNODEFLAG.DVLNODEFLAG_SELECTED),n);return this;};b.prototype._getFlags=function(n,f){var d=this._nodeStates.get(n),e=d&&d.flags;return e!==undefined?e&f:null;};b.prototype.getVisibilityState=function(n){return Array.isArray(n)?n.map(this._getVisibilityFlagState,this):this._getVisibilityFlagState(n);};b.prototype.setVisibilityState=function(n,v,r){if(!Array.isArray(n)){n=[n];}var d=q.sap.unique(r?this._collectNodesRecursively(n):n).filter(function(e){return e&&this._getVisibilityFlagState(e)!==v;},this);if(d.length>0){d.forEach(function(e){var f=this._nodeStates.get(e);if(f){if(f.flags===undefined){f.flags=0;}if(v){f.flags|=sap.ve.dvl.DVLNODEFLAG.DVLNODEFLAG_VISIBLE|sap.ve.dvl.DVLNODEFLAG.DVLNODEFLAG_TEMPORARY_PREVIOUS_VISIBILITY;}else{f.flags&=~(sap.ve.dvl.DVLNODEFLAG.DVLNODEFLAG_VISIBLE|sap.ve.dvl.DVLNODEFLAG.DVLNODEFLAG_TEMPORARY_PREVIOUS_VISIBILITY);}}else{this._nodeStates.set(e,{flags:v?sap.ve.dvl.DVLNODEFLAG.DVLNODEFLAG_VISIBLE:0});}},this);if(this.getShouldTrackVisibilityChanges()){d.forEach(this._visibilityTracker.trackNodeRef,this._visibilityTracker);}this.fireVisibilityChanged({visible:v?d:[],hidden:v?[]:d});}return this;};b.prototype.enumerateSelection=function(d){this._selectedNodes.forEach(d);return this;};b.prototype.getSelectionState=function(n){return Array.isArray(n)?n.map(this._getSelectionFlagState,this):this._getSelectionFlagState(n);};b.prototype.setSelectionState=function(n,d,r){if(!Array.isArray(n)){n=[n];}var e=q.sap.unique(r?this._collectNodesRecursively(n):n).filter(function(f){return f&&this._getSelectionFlagState(f)!==d;},this);if(e.length>0){e.forEach(function(f){var h=this._nodeStates.get(f);if(h){if(h.flags===undefined){h.flags=this._dvl.Scene.RetrieveNodeInfo(this._nodeHierarchy.getScene().getSceneRef(),f,sap.ve.dvl.DVLNODEINFO.DVLNODEINFO_FLAGS).Flags;}if(d){h.flags|=sap.ve.dvl.DVLNODEFLAG.DVLNODEFLAG_SELECTED;}else{h.flags&=~sap.ve.dvl.DVLNODEFLAG.DVLNODEFLAG_SELECTED;}}else{var i=this._dvl.Scene.RetrieveNodeInfo(this._nodeHierarchy.getScene().getSceneRef(),f,sap.ve.dvl.DVLNODEINFO.DVLNODEINFO_FLAGS).Flags;this._nodeStates.set(f,{flags:i|(d?sap.ve.dvl.DVLNODEFLAG.DVLNODEFLAG_SELECTED:0)});}this._selectedNodes[d?"add":"delete"](f);},this);this.fireSelectionChanged({selected:d?e:[],unselected:d?[]:e});}return this;};b.prototype._handleStepEvent=function(e){if(e.type===sap.ve.dvl.DVLSTEPEVENT.DVLSTEPEVENT_STARTED){this._visibilityTracker.clear();}};b.prototype._collectNodesRecursively=function(n){var r=[],t=this;n.forEach(function collectChildNodes(d){r.push(d);t._nodeHierarchy.enumerateChildren(d,collectChildNodes,false,true);});return r;};b.prototype._getOpacity=function(n){if(this._nodeStates.has(n)){var o=this._nodeStates.get(n).opacity;return o===undefined?null:o;}else{return null;}};b.prototype.getOpacity=function(n){if(Array.isArray(n)){return n.map(this._getOpacity,this);}else{return this._getOpacity(n);}};b.prototype.setOpacity=function(n,o,r){if(!Array.isArray(n)){n=[n];}var d=q.sap.unique(r?this._collectNodesRecursively(n):n).filter(function(e){return e&&this._getOpacity(e)!==o;},this);if(d.length>0){d.forEach(function(e){var f=this._nodeStates.get(e);if(f){if(o===null){delete f.opacity;}else{f.opacity=o;}}else if(o!==null){this._nodeStates.set(e,{opacity:o});}},this);this.fireOpacityChanged({changed:d,opacity:o});}return this;};b.prototype._getTintColorABGR=function(n){if(this._nodeStates.has(n)){var t=this._nodeStates.get(n).tintColorABGR;return t===undefined?null:t;}else{return null;}};b.prototype._getTintColor=function(n){if(this._nodeStates.has(n)){var t=this._nodeStates.get(n).tintColorABGR;return t===undefined?null:sap.ui.vk.colorToCSSColor(sap.ui.vk.abgrToColor(t));}else{return null;}};b.prototype.getTintColor=function(n,i){var d=i?"_getTintColorABGR":"_getTintColor";if(Array.isArray(n)){return n.map(this[d],this);}else{return this[d](n);}};b.prototype.setTintColor=function(n,t,r){if(!Array.isArray(n)){n=[n];}var d=null;switch(typeof t){case"number":d=t;break;case"string":if(sap.ui.core.CSSColor.isValid(t)){d=sap.ui.vk.colorToABGR(sap.ui.vk.cssColorToColor(t));}break;default:t=null;break;}var e=q.sap.unique(r?this._collectNodesRecursively(n):n).filter(function(f){return f&&this._getTintColorABGR(f)!==d;},this);if(e.length>0){e.forEach(function(f){var h=this._nodeStates.get(f);if(h){if(d===null){delete h.tintColorABGR;}else{h.tintColorABGR=d;}}else if(d!==null){this._nodeStates.set(f,{tintColorABGR:d});}},this);this.fireTintColorChanged({changed:e,tintColor:t,tintColorABGR:d});}return this;};a=function(){this._visibilityChanges=new Set();};a.prototype.getInfo=function(n){var f=function(v){return v.type==="VE_LOCATOR";};var d=[];this._visibilityChanges.forEach(function(e){var h=n.createNodeProxy(e),v=q.grep(h.getVeIds(),f);v=Array.isArray(v)&&v.length>0?v[0].fields[0].value:null;n.destroyNodeProxy(h);if(v){d.push(v);}});return d;};a.prototype.clear=function(){this._visibilityChanges.clear();};a.prototype.trackNodeRef=function(n){if(this._visibilityChanges.has(n)){this._visibilityChanges.delete(n);}else{this._visibilityChanges.add(n);}};C.injectMethodsIntoClass(b);return b;});
