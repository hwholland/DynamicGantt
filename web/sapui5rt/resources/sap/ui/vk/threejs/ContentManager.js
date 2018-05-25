/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["jquery.sap.global","./thirdparty/three","../ContentManager","./Scene","../TransformationMatrix","./PerspectiveCamera","./OrthographicCamera","./ContentDeliveryService"],function(q,t,C,S,T,P,O,a){"use strict";var b=C.extend("sap.ui.vk.threejs.ContentManager",{metadata:{library:"sap.ui.vk"}});var c=b.getMetadata().getParent().getClass().prototype;var e=new sap.ui.vk.threejs.ContentDeliveryService();b.prototype.init=function(){if(c.init){c.init.call(this);}};b.prototype.exit=function(){if(c.exit){c.exit.call(this);}};function s(o){if(o&&o.isMesh){o.castShadow=true;o.receiveShadow=false;}if(o&&o.children){for(var n=0;n<o.children.length;n++){s(o.children[n]);}}}function f(n,h){if(n){var i=new THREE.Group();n.add(i);i.name="DefaultLights";var j=new THREE.Box3().setFromObject(n);var m=j.getSize().length();var p=0.9;var k=new THREE.PointLight();k.color.copy(new THREE.Color(0.8,0.8,0.9).multiplyScalar(p));k.position.copy(j.getCenter());k.visible=true;i.add(k);var o=0.4;var r=[new THREE.Color(0.5,0.5,0.5).multiplyScalar(o),new THREE.Color(0.8,0.8,0.9).multiplyScalar(o),new THREE.Color(0.9,0.9,0.9).multiplyScalar(o)];var u=[new THREE.Vector3(2.0,1.5,0.5).normalize(),new THREE.Vector3(-2.0,-1.1,2.5).normalize(),new THREE.Vector3(-0.04,-0.01,-2.0).normalize()];var v=m;for(var l=0,w=r.length;l<w;l++){var x=new THREE.DirectionalLight();x.color.copy(r[l]);x.position.copy(u[l].multiplyScalar(v));i.add(x);}if(h){s(n);var y=new THREE.DirectionalLight();y.color.copy(new THREE.Color(0.5,0.5,0.5).multiplyScalar(o));y.position.copy(new THREE.Vector3(0,1.0,0).multiplyScalar(v));y.castShadow=true;y.shadow.mapSize.width=512;y.shadow.mapSize.height=512;var d=2000;y.shadow.camera.left=-d;y.shadow.camera.right=d;y.shadow.camera.top=d;y.shadow.camera.bottom=-d;y.shadow.camera.far=3500;y.shadow.bias=-0.0001;i.add(y);var z=new THREE.PlaneBufferGeometry(j.getSize().x,j.getSize().z);var A=new THREE.ShadowMaterial();A.opacity=0.2;var B=new THREE.Mesh(z,A);B.rotation.x=-Math.PI/2;B.position.x=j.getCenter().x;B.position.y=j.min.y-m*0.1;B.position.z=j.getCenter().z;n.add(B);B.receiveShadow=true;}}}b.prototype.loadContent=function(d,h){var j=this;var l=function(){j.fireContentChangesStarted();var n=new THREE.Scene(),k=new S(n);j._loadContentResources(k,h).then(function(v){var d=k;if(v[0].camera){d.camera=v[0].camera;}var m=[];for(var i=0;i<v.length;i++){if(v[i].loader){m.push(v[i].loader);}}if(m.length>0){d.loaders=m;}j._initSceneWithCDSLoaderIfExists(k,m);f(k.getSceneRef(),false);j.fireContentChangesFinished({content:d});},function(r){q.sap.log.error("Failed to load content resources.");j.fireContentChangesFinished({content:null,failureReason:[{error:r,errorMessage:"Failed to load content resources."}]});});};if(window.THREE){l();}else{sap.ui.require(["sap/ui/vk/threejs/thirdparty/three"],function(i){l();});}return this;};var g=function(d){if(d._contentManagerResolver&&d._contentManagerResolver.settings&&d._contentManagerResolver.settings.loader){return d._contentManagerResolver.settings.loader;}if(d.getSource()){var h=d.getSourceType();if(h==="stream"){return e;}}return null;};b.prototype._loadContentResources=function(d,h){var p=[];h.forEach(function loadContentResource(i,j){var n=new THREE.Group();n.name=j.getName();n.sourceId=j.getSourceId();j._shadowContentResource={nodeProxy:d.getDefaultNodeHierarchy().createNodeProxy(n)};var l=j.getLocalMatrix();if(l){n.applyMatrix(new THREE.Matrix4().fromArray(T.convertTo4x4(l)));}i.add(n);var k=g(j);if(typeof k==="function"){p.push(k(n,j));}else if(k&&k.load){p.push(k.load(n,j));}else{p.push(Promise.resolve({node:n,contentResource:j}));}j.getContentResources().forEach(loadContentResource.bind(this,n));}.bind(this,d.getSceneRef()));return Promise.all(p);};b.prototype._initSceneWithCDSLoaderIfExists=function(d,l){var h;if(l){for(var i=0;i<l.length;i++){if(l[i]instanceof sap.ui.vk.threejs.ContentDeliveryService){h=l[i];break;}}if(h){d._setState(h.getState());d.getDefaultNodeHierarchy().attachNodeRemoving(function(j){var r=j.getParameter("nodeRef");if(r.userData&&r.userData.treeNode&&r.userData.treeNode.sid){h.decrementResouceCountersForDeletedTreeNode(r.userData.treeNode.sid);}});return true;}}return false;};b.prototype.createOrthographicCamera=function(){return new sap.ui.vk.threejs.OrthographicCamera();};b.prototype.createPerspectiveCamera=function(){return new sap.ui.vk.threejs.PerspectiveCamera();};return b;});
