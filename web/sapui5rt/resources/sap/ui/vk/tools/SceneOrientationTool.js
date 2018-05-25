/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["jquery.sap.global","./library","./Tool","./SceneOrientationToolHandler","./SceneOrientationToolGizmo"],function(q,l,T,S,a){"use strict";var b=T.extend("sap.ui.vk.tools.SceneOrientationTool",{metadata:{publicMethods:["setView"],properties:{enablePredefinedViews:{type:"boolean",defaultValue:true}}},constructor:function(i,s){if(b._instance){return b._instance;}T.apply(this,arguments);this._viewport=null;this._handler=null;this._menu=null;b._instance=this;}});b.prototype.init=function(){if(T.prototype.init){T.prototype.init.call(this);}this.setFootprint(["sap.ui.vk.threejs.Viewport"]);this.setAggregation("gizmo",new a());};b.prototype.setActive=function(v,c,g){if(T.prototype.setActive){T.prototype.setActive.call(this,v,c,g);}if(v){this._activateTool(c);}else{this._deactivateTool();}return this;};b.prototype._activateTool=function(c){this._viewport=c;this._handler=new S(this);this._gizmo=this.getGizmo();this._prepare();};b.prototype._deactivateTool=function(){if(this._handler){if(this._viewport._loco){this._viewport._loco.removeHandler(this._handler);}this._handler=null;}this._gizmo=null;};b.prototype._prepare=function(){var o=false;if(this._viewport._loco){this._viewport._loco.addHandler(this._handler);o=true;}return o;};b.prototype.setView=function(v,m){if(this._gizmo){this._gizmo.setView(v,m);}return this;};b.prototype.queueCommand=function(c){if(this._prepare()){if(this.isViewportType("sap.ui.vk.dvl.Viewport")){if(this._dvlRendererId){this._dvl.Renderer._queueCommand(c,this._dvlRendererId);}}else if(this.isViewportType("sap.ui.vk.threejs.Viewport")){c();}}return this;};b.prototype.destroy=function(){T.prototype.destroy.call(this);this._viewport=null;this._handler=null;};return b;});
