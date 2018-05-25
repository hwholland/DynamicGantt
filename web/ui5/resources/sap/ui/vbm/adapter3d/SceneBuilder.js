/*!
 * SAP UI development toolkit for HTML5 (SAPUI5) (c) Copyright 2009-2012 SAP AG. All rights reserved
 */
sap.ui.define(["jquery.sap.global","sap/ui/base/Object","./Utilities","./thirdparty/three","./thirdparty/ColladaLoader"],function(q,B,U,T,C){"use strict";var t="sap.ui.vbm.adapter3d.SceneBuilder";var d=T.Math.degToRad;var l=q.sap.log;var a=T.Box3;var F=T.Face3;var M=T.Matrix4;var V=T.Vector2;var b=T.Vector3;var r="_sapRefCount";var c;var f;var g;var n;var h=U.toBoolean;var i=U.toFloat;var j=U.toVector3;var k=U.toColor;var m=U.toDeltaColor;var o=U.applyColor;var S=B.extend("sap.ui.vbm.adapter3d.SceneBuilder",{constructor:function(e,s,u){B.call(this);this._context=e;this._controller=u;this._root=s;this._textureLoader=null;this._colladaLoader=null;this._textures=new Map();this._boxGeometryWith4SidedTexture=null;this._boxGeometryWith6SidedTexture=null;}});S.prototype.destroy=function(){this._context=null;this._root=null;B.prototype.destroy.call(this);};S.prototype.synchronize=function(){var e=this;return new Promise(function(s,u){var v=new Map();var w=function(H){if(v.has(H)){v.get(H).refCount+=1;}else{v.set(H,{object3D:null,refCount:1});}};var x=new Set();var y=sap.ui.vbm.findInArray(e._context.windows,function(y){return y.type==="default";});var z=y&&sap.ui.vbm.findInArray(e._context.scenes,function(z){return z.id===y.refScene;});if(!z){s();return;}if(e._context.setupView){e._setupView(z.position,z.zoom,z.pitch,z.yaw);e._context.setupView=false;}var A=e._context.voQueues.toAdd.get(z)||[];var D=e._context.voQueues.toUpdate.get(z)||[];var E=e._context.voQueues.toRemove.get(z)||[];var G=[].concat(A,D);G.filter(function(H){return H.isColladaModel&&H.model&&H.model!==H._lastModel;}).map(function(H){return H.model;}).forEach(w);G.filter(function(H){return H.texture&&H.texture!==H._lastTexture;}).map(function(H){return H.texture;}).forEach(x.add,x);e._loadTextures(x).then(function(){return e._loadModels(v);}).then(function(){E.forEach(e._destroyVisualObjectInstance.bind(e,e._root));D.forEach(e._updateVisualObjectInstance.bind(e,e._root,v));A.forEach(e._addVisualObjectInstance.bind(e,e._root,v));e._cleanupCache();s();}).catch(function(H){u(H);});});};S.prototype._getGeometrySize=function(){return 2.0;};S.prototype._setupView=function(e,z,s,y){var u=new T.Vector3(0,0,-5);var v=new T.Vector3(0,0,0);e=e||"0;0;0";var w=e.split(";");e=new T.Vector3(parseFloat(w[0]),parseFloat(w[1]),parseFloat(w[2]));var x=new T.Vector3(-e.x,e.z,-e.y);p(x);this._root.position.copy(x);z=parseFloat(z||"1");if(z===0){z=1;}else if(z<0){z=0.1;}var A=this._getGeometrySize()*2/z;s=parseFloat(s||"0");y=parseFloat(y||"0");s=(s%180===0?s+1:s);var D=new T.Matrix4();D.makeRotationX(T.Math.degToRad(s+180));var E=new T.Matrix4();E.makeRotationZ(T.Math.degToRad(-(y+180)));var G=new T.Matrix4();G.multiplyMatrices(E,D);var H=new T.Vector3();H.subVectors(v,u);H.normalize();H.multiplyScalar(A);H.applyMatrix4(G);this._controller.reset({target:v.clone(),zoom:this._controller.saveState().zoom,position:new T.Vector3(-H.x,-H.z,H.y)});};S.prototype._loadTextures=function(e){var s=[];e.forEach(function(u){if(!this._textures.has(u)){s.push(this._loadTexture(u));}},this);return Promise.all(s);};S.prototype._loadTexture=function(e){var s=this;return new Promise(function(u,v){s._getTextureLoader().load(s._context.resources.get(e),function(w){w.flipY=false;w[r]=0;s._textures.set(e,w);u();},null,function(x){l.error("Failed to load texture from Data URI: "+e,"status: "+x.status+", status text: "+x.statusText,t);u();});});};S.prototype._loadModels=function(e){var s=[];e.forEach(function(u,v){s.push(this._loadModel(v,u));},this);return Promise.all(s);};S.prototype._loadModel=function(s,u){var v=this;return new Promise(function(w,x){try{v._getColladaLoader().parse(v._context.resources.get(s),function(y){f(y.scene);y.scene.traverse(g);y.scene.rotateX(d(180));u.object3D=y.scene;w();});}catch(e){l.error("Failed to load Collada model from resource: "+s,e instanceof Error?e.message:"",t);w();}});};S.prototype._releaseTexture=function(e){if(e.hasOwnProperty(r)){e[r]-=1;}else{e.dispose();}return this;};S.prototype._addRefTexture=function(e){if(!e.hasOwnProperty(r)){e[r]=0;}e[r]+=1;return this;};S.prototype._releaseGeometry=function(e){if(e.hasOwnProperty(r)){e[r]-=1;}else{e.dispose();}return this;};S.prototype._addRefGeometry=function(e){if(!e.hasOwnProperty(r)){e[r]=0;}e[r]+=1;return this;};S.prototype._cleanupCache=function(){this._textures.forEach(function(e){if(e[r]===0){e.dispose();this._textures.delete(e);}},this);if(this._boxGeometryWith4SidedTexture&&this._boxGeometryWith4SidedTexture[r]===0){this._boxGeometryWith4SidedTexture.dispose();this._boxGeometryWith4SidedTexture=null;}if(this._boxGeometryWith6SidedTexture&&this._boxGeometryWith6SidedTexture[r]===0){this._boxGeometryWith6SidedTexture.dispose();this._boxGeometryWith6SidedTexture=null;}return this;};S.prototype._destroyVisualObjectInstance=function(e,s){var u=this;if(s.object3D){s.object3D.traverse(function(v){if(v.isMesh){var w=v.material;if(w){var x=w.map;if(x){u._releaseTexture(x);w.map=null;}w.dispose();v.material=null;}var y=v.geometry;if(y){u._releaseGeometry(y);v.geometry=null;}}});e.remove(s.object3D);s.object3D=null;s._lastModel=null;s._lastTexture=null;s._lastTexture6=null;}return this;};S.prototype._updateVisualObjectInstance=function(e,s,u){if(u.isColladaModel){if(u.model!==u._lastModel){return this._destroyVisualObjectInstance(e,u)._addVisualObjectInstance(e,s,u);}this._assignColladaModelProperties(u);}else if(u.isBox){this._assignBoxProperties(u);}return this;};S.prototype._addVisualObjectInstance=function(e,s,u){if(u.isColladaModel){u.object3D=new T.Group();u._lastModel=u.model;var v=s.get(u.model);var w=--v.refCount===0?v.object3D:v.object3D.clone();if(h(u.normalize)){n(w);}u.object3D.add(w);this._assignMaterial(u.object3D,this._createMaterial());this._assignColladaModelProperties(u);}else if(u.isBox){u.object3D=new T.Group();u.object3D.add(new T.Mesh(undefined,this._createMaterial()));this._assignBoxProperties(u);}if(u.object3D){e.add(u.object3D);}return this;};S.prototype._assignColladaModelProperties=function(e){this._assignProperties(e);return this;};S.prototype._assignBoxProperties=function(e){if(e._lastTexture6!==e.texture6){var s=e.object3D.children[0];if(s.geometry){this._releaseGeometry(s.geometry);}s.geometry=this._getBoxGeometry(h(e.texture6));this._addRefGeometry(s.geometry);s.scale.set(1,-1,-1);if(h(e.normalize)){n(s);}s.rotateX(d(180));e._lastTexture6=e.texture6;}this._assignProperties(e);return this;};S.prototype._assignProperties=function(e){if(e._lastTexture&&e._lastTexture!==e.texture){this._removeTexture(e);}if(e.texture){this._assignTexture(e);}e._lastTexture=e.texture;o(e,e[h(e["VB:s"])?"selectColor":"color"]);var s=j(e.scale);e.object3D.scale.set(s[0],s[1],s[2]);var u=j(e.rot);e.object3D.rotation.set(u[0],d(-u[1]),d(-u[2]));var v=j(e.pos);e.object3D.position.set(-v[0],v[1],v[2]);e.object3D.traverse(function(w){w._sapInstance=e;});return this;};S.prototype._removeTexture=function(e){if(e.object3D){var s=this;e.object3D.traverse(function(u){if(u.isMesh&&u.material&&u.material.map){s._releaseTexture(u.material.texture);u.material.map=null;}});}return this;};S.prototype._assignTexture=function(e){if(e.object3D){var s=this;var u=this._textures.get(e.texture);e.object3D.traverse(function(v){if(v.isMesh&&v.material){v.material.map=u;s._addRefTexture(u);}});}return this;};S.prototype._createMaterial=function(){return new T.MeshPhongMaterial({shininess:10,specular:0x101010,side:T.DoubleSide});};S.prototype._assignMaterial=function(e,s){e.traverse(function(u){if(u.isMesh){u.material=s;}});return this;};S.prototype._getBoxGeometry=function(e){var s=e?"_boxGeometryWith6SidedTexture":"_boxGeometryWith4SidedTexture";return this[s]||(this[s]=c(e));};S.prototype._getTextureLoader=function(){return this._textureLoader||(this._textureLoader=new T.TextureLoader());};S.prototype._getColladaLoader=function(){return this._colladaLoader||(this._colladaLoader=new C());};f=function(e){var s=[];e.traverse(function(u){if(u.isLight||u.isCamera){s.push(u);}});s.forEach(function(u){while(u&&u!==e){var v=u.parent;if(u.children.length===0){v.remove(u);}u=v;}});return e;};function p(v){v.x=-v.x;}g=function(e){function s(v,w,x){w=w||1;x=x||2;var y=v[w];v[w]=v[x];v[x]=y;}function u(v){v.vertices.forEach(p);v.faces.forEach(function(w){s(w,"b","c");if(w.normal){p(w.normal);}if(w.vertexNormals&&w.vertexNormals.length===3){s(w.vertexNormals);p(w.vertexNormals[0]);p(w.vertexNormals[1]);p(w.vertexNormals[2]);}if(w.vertexColors&&w.vertexColors.length===3){s(w.vertexColors);}});v.faceVertexUvs.forEach(function(w){w.forEach(function(x){s(x);});});return v;}if(e.isMesh&&e.geometry&&e.geometry.isGeometry){u(e.geometry);}else if(e.isGeometry){u(e);}return e;};n=function(e){var s=new a().setFromObject(e).getCenter();e.position.add(new b(-s.x,-s.y,+s.z));var u=new a().setFromObject(e);var v=Math.max(Math.abs(u.min.x),Math.abs(u.min.y),Math.abs(u.min.z),Math.abs(u.max.x),Math.abs(u.max.y),Math.abs(u.max.z));if(v){v=1/v;}e.applyMatrix(new M().makeScale(v,v,v));u=new a().setFromObject(e);s=u.getCenter();e.translateZ(s.z-(u.max.z<0?u.max.z:u.min.z));return e;};c=function(e){var s=new T.Geometry();var u=0.1;s.vertices.push(new b(u,u,-u),new b(u,-u,-u),new b(-u,-u,-u),new b(-u,u,-u),new b(u,u,u),new b(-u,u,u),new b(-u,-u,u),new b(u,-u,u),new b(u,u,-u),new b(u,u,u),new b(u,-u,u),new b(u,-u,-u),new b(u,-u,-u),new b(u,-u,u),new b(-u,-u,u),new b(-u,-u,-u),new b(-u,-u,-u),new b(-u,-u,u),new b(-u,u,u),new b(-u,u,-u),new b(u,u,u),new b(u,u,-u),new b(-u,u,-u),new b(-u,u,u));var v=new T.Color(0.5,0.5,0.5);s.faces.push(new F(0,2,3,new b(0,0,-1),v),new F(0,1,2,new b(0,0,-1),v),new F(4,5,6,new b(0,0,1),v),new F(4,6,7,new b(0,0,1),v),new F(8,10,11,new b(1,0,0),v),new F(8,9,10,new b(1,0,0),v),new F(12,14,15,new b(0,-1,0),v),new F(12,13,14,new b(0,-1,0),v),new F(16,18,19,new b(-1,0,0),v),new F(16,17,18,new b(-1,0,0),v),new F(20,22,23,new b(0,1,0),v),new F(20,21,22,new b(0,1,0),v));var w;if(e){w=[new V(2/3,0.5),new V(1.0,0.5),new V(1.0,1.0),new V(2/3,1.0),new V(2/3,0.0),new V(1.0,0.0),new V(1.0,0.5),new V(2/3,0.5),new V(2/3,0.5),new V(2/3,1.0),new V(1/3,1.0),new V(1/3,0.5),new V(2/3,0.0),new V(2/3,0.5),new V(1/3,0.5),new V(1/3,0.0),new V(1/3,0.5),new V(1/3,1.0),new V(0.0,1.0),new V(0.0,0.5),new V(0.0,0.5),new V(0.0,0.0),new V(1/3,0.0),new V(1/3,0.5)];}else{w=[new V(0.5,0.5),new V(1.0,0.5),new V(1.0,1.0),new V(0.5,1.0),new V(0.5,0.5),new V(1.0,0.5),new V(1.0,1.0),new V(0.5,1.0),new V(0.5,0.5),new V(0.5,1.0),new V(0.0,1.0),new V(0.0,0.5),new V(0.5,0.5),new V(0.5,0.0),new V(1.0,0.0),new V(1.0,0.5),new V(0.5,0.5),new V(0.5,1.0),new V(0.0,1.0),new V(0.0,0.5),new V(0.0,0.5),new V(0.0,0.0),new V(0.5,0.0),new V(0.5,0.5)];}s.faceVertexUvs[0].push([w[0],w[2],w[3]],[w[0],w[1],w[2]],[w[4],w[5],w[6]],[w[4],w[6],w[7]],[w[8],w[10],w[11]],[w[8],w[9],w[10]],[w[12],w[14],w[15]],[w[12],w[13],w[14]],[w[16],w[18],w[19]],[w[16],w[17],w[18]],[w[20],w[22],w[23]],[w[20],w[21],w[22]]);g(s);return s;};return S;});