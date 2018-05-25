/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["jquery.sap.global","./library","./ViewportBase","sap/ui/core/ResizeHandler","./Loco","./ViewportHandler","./Smart2DHandler","./Messages","./ContentConnector","./ViewStateManager"],function(q,l,V,R,L,a,S,M,C,b){"use strict";var c=V.extend("sap.ui.vk.Viewport",{metadata:{library:"sap.ui.vk",publicMethods:[]}});var d=c.getMetadata().getParent().getClass().prototype;c.prototype.init=function(){if(d.init){d.init.call(this);}this._implementation=null;this._deferred={};};c.prototype.exit=function(){this._deferred=null;this._destroyImplementation();if(d.exit){d.exit.call(this);}};c.prototype.getImplementation=function(){return this._implementation;};c.prototype._destroyImplementation=function(){if(this._implementation){this._implementation.destroy();this._implementation=null;}return this;};c.prototype.getShowDebugInfo=function(){if(this._implementation){return this._implementation.getShowDebugInfo();}return d.getShowDebugInfo.call(this);};c.prototype.setShowDebugInfo=function(v){d.setShowDebugInfo.call(this,v);if(this._implementation){this._implementation.setShowDebugInfo(v);}return this;};c.prototype.getBackgroundColorTop=function(){if(this._implementation){return this._implementation.getBackgroundColorTop();}return d.getBackgroundColorTop.call(this);};c.prototype.setBackgroundColorTop=function(v){d.setBackgroundColorTop.call(this,v);if(this._implementation){this._implementation.setBackgroundColorTop(v);}return this;};c.prototype.getBackgroundColorBottom=function(){if(this._implementation){return this._implementation.getBackgroundColorBottom();}return d.getBackgroundColorBottom.call(this);};c.prototype.setBackgroundColorBottom=function(v){d.setBackgroundColorBottom.call(this,v);if(this._implementation){this._implementation.setBackgroundColorBottom(v);}return this;};c.prototype.setWidth=function(v){d.setWidth.call(this,v);if(this._implementation){this._implementation.setWidth(v);}return this;};c.prototype.setHeight=function(v){d.setHeight.call(this,v);if(this._implementation){this._implementation.setHeight(v);}return this;};c.prototype.setSelectionMode=function(v){d.setSelectionMode.call(this,v);if(this._implementation){this._implementation.setSelectionMode(v);}return this;};c.prototype.getSelectionMode=function(){if(this._implementation){return this._implementation.getSelectionMode();}return d.getSelectionMode.call(this);};c.prototype.setCamera=function(v){d.setCamera.call(this,v);if(this._implementation){this._implementation.setCamera(v);return this;}return this;};c.prototype.getCamera=function(){if(this._implementation){return this._implementation.getCamera();}return d.getCamera.call(this);};c.prototype.setShouldRenderFrame=function(){if(this._implementation){this._implementation.setShouldRenderFrame();}return this;};c.prototype.shouldRenderFrame=function(){if(this._implementation){this._implementation.shouldRenderFrame();}};c.prototype._setContent=function(e){var s=null;var f=null;if(e){s=e;if(!(s instanceof sap.ui.vk.Scene)){s=null;}f=e.camera;if(!(f instanceof sap.ui.vk.Camera)){f=null;}}this._setScene(s);if(f){this.setCamera(f);}};c.prototype._onAfterUpdateContentConnector=function(){this._setContent(this._contentConnector.getContent());};c.prototype._onBeforeClearContentConnector=function(){if(d._onBeforeClearContentConnector){d._onBeforeClearContentConnector.call(this);}this._setScene(null);};c.prototype._handleContentReplaced=function(e){var f=e.getParameter("newContent");this._setContent(f);};c.prototype._setScene=function(s){if(s instanceof sap.ui.vk.Scene){var e=s.getMetadata().getName(),i=this._implementation&&this._implementation.getMetadata().getName(),r=e==="sap.ui.vk.dvl.Scene"&&i==="sap.ui.vk.dvl.Viewport"||e==="sap.ui.vk.threejs.Scene"&&i==="sap.ui.vk.threejs.Viewport";if(!r){this._destroyImplementation();var n;var t=this;var f=this.getCamera();if(e==="sap.ui.vk.dvl.Scene"){n="sap.ui.vk.dvl.Viewport";q.sap.require(n);this._implementation=new(q.sap.getObject(n))({viewStateManager:this.getViewStateManager(),resize:function(g){t.fireResize({size:g.getParameter("size")});},showDebugInfo:this.getShowDebugInfo(),width:this.getWidth(),height:this.getHeight(),backgroundColorTop:this.getBackgroundColorTop(),backgroundColorBottom:this.getBackgroundColorBottom(),selectionMode:this.getSelectionMode(),contentConnector:this.getContentConnector()});}else if(e==="sap.ui.vk.threejs.Scene"){n="sap.ui.vk.threejs.Viewport";q.sap.require(n);this._implementation=new(q.sap.getObject(n))({viewStateManager:this.getViewStateManager(),showDebugInfo:this.getShowDebugInfo(),width:this.getWidth(),height:this.getHeight(),backgroundColorTop:this.getBackgroundColorTop(),backgroundColorBottom:this.getBackgroundColorBottom(),selectionMode:this.getSelectionMode(),contentConnector:this.getContentConnector()});}if(n){if(f){this._camera=null;this._implementation.setCamera(f);}if("graphicsCore"in this._deferred&&this._implementation.setGraphicsCore){this._implementation.setGraphicsCore(this._deferred.graphicsCore);}delete this._deferred.graphicsCore;if("scene"in this._deferred&&this._implementation.setScene){this._implementation.setScene(this._deferred.scene);}delete this._deferred.scene;this._implementation.attachNodesPicked(function(g){this.fireNodesPicked({picked:g.getParameter("picked")});},this);this._implementation.attachNodeZoomed(function(g){this.fireNodeZoomed({zoomed:g.getParameter("zoomed"),isZoomIn:g.getParameter("isZoomIn")});},this);}this.invalidate();}}else{this._destroyImplementation();this.invalidate();}return this;};c.prototype._onAfterUpdateViewStateManager=function(){if(this._implementation){this._implementation.setViewStateManager(this._viewStateManager);}};c.prototype._onBeforeClearViewStateManager=function(){if(this._implementation){this._implementation.setViewStateManager(null);}};c.prototype.activateView=function(v){if(this._implementation){this._implementation.activateView(v);return this;}else{q.sap.log.error("no implementation");return this;}};c.prototype.getImage=function(w,h){if(this._implementation&&this._implementation.getImage){return this._implementation.getImage(w,h);}return null;};C.injectMethodsIntoClass(c);b.injectMethodsIntoClass(c);return c;});