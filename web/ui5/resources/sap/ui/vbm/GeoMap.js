/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5) (c) Copyright 2009-2012 SAP AG. All rights reserved
 */
sap.ui.define(['./VBI','./library'],function(V,l){"use strict";
/**
	 * Constructor for a new GeoMap.
	 * 
	 * @param {string} [sId] id for the new control, generated automatically if no id is given
	 * @param {object} [mSettings] initial settings for the new control
	 * @class Map control with the option to position multiple visual objects on top of a map. The GeoMap control shows an image based map loaded from
	 *        one or more configurable external providers. Per default a map from <a href="http://www.mapquest.com">MapQuest</a> is used. Other map
	 *        providers can be configured via property <i>mapConfiguration</i>. Multiple maps can be mashed up into one map layer stack. If multiple
	 *        map layer stacks are provided via configuration it is possible to switch between them during runtime. The control supports the display
	 *        of copyright information for the visible maps.<br>
	 *        On top of the map the GeoMap control provides a navigation control, a scale, and a legend. Each of them can be switched off separately.<br>
	 *        It is possible to set the initial position and zoom for the map display. Further the control allows to restrict the potentially visible
	 *        map area and zoom range.<br>
	 *        Different visual objects can be placed on the map. Visual objects are grouped in VO aggregations and an arbitrary number of VO
	 *        aggregations can be assigned to the <i>vos</i> aggregation.<br>
	 *        The second aggregation <i>featureCollections</i> allows the use of GeoJSON as source for visual objects.
	 * @extends sap.ui.vbm.VBI
	 * @constructor
	 * @public
	 * @alias sap.ui.vbm.GeoMap
	 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
	 */
var G=V.extend("sap.ui.vbm.GeoMap",{metadata:{library:"sap.ui.vbm",properties:{mapConfiguration:{type:"object",group:"Misc",defaultValue:null},legendVisible:{type:"boolean",group:"Appearance",defaultValue:true},scaleVisible:{type:"boolean",group:"Appearance",defaultValue:true},navcontrolVisible:{type:"boolean",group:"Appearance",defaultValue:true},initialPosition:{type:"string",group:"Behavior",defaultValue:'0;0;0'},initialZoom:{type:"string",group:"Behavior",defaultValue:'2'},centerPosition:{type:"string",group:"Behavior",defaultValue:'0;0'},zoomlevel:{type:"int",group:"Behavior",defaultValue:2},refMapLayerStack:{type:"string",group:"Appearance",defaultValue:'Default'},visualFrame:{type:"object",group:"Behavior",defaultValue:null},clustering:{type:"object",group:"Behavior",defaultValue:null},disableZoom:{type:"boolean",group:"Behavior",defaultValue:false},disablePan:{type:"boolean",group:"Behavior",defaultValue:false},enableAnimation:{type:"boolean",group:"Behavior",defaultValue:false}},defaultAggregation:"vos",aggregations:{vos:{type:"sap.ui.vbm.VoAbstract",multiple:true,singularName:"vo"},geoJsonLayers:{type:"sap.ui.vbm.GeoJsonLayer",multiple:true,singularName:"geoJsonLayer"},featureCollections:{type:"sap.ui.vbm.FeatureCollection",multiple:true,singularName:"featureCollection"},resources:{type:"sap.ui.vbm.Resource",multiple:true,singularName:"resource"},legend:{type:"sap.ui.vbm.Legend",multiple:false},clusters:{type:"sap.ui.vbm.ClusterBase",multiple:true,singularName:"cluster"}},events:{click:{parameters:{pos:{type:"string"}}},contextMenu:{parameters:{clientX:{type:"int"},clientY:{type:"int"},pos:{type:"string"}}},drop:{parameters:{pos:{type:"string"}}},select:{},zoomChanged:{parameters:{centerPoint:{type:"string"},viewportBB:{type:"object"},zoomLevel:{type:"int"}}},centerChanged:{parameters:{centerPoint:{type:"string"},viewportBB:{type:"object"},zoomLevel:{type:"int"}}}}}});G.bEncodedSpotImagesAvailable=false;G.bEncodeSpotImageData=null;G.oBaseApp={SAPVB:{version:"2.0",MapProviders:{Set:{MapProvider:{name:"404",type:"",description:"",tileX:"256",tileY:"256",maxLOD:"19",copyright:"Map Provider is not configured, please read this {LINK|SCN Article} to configure your own Map Provider.",copyrightLink:"//scn.sap.com/docs/DOC-74221",copyrightImage:"",Source:[{id:"s1",url:"404.png"}]}}},MapLayerStacks:{Set:{MapLayerStack:{name:"Default",MapLayer:{name:"layer1",refMapProvider:"404",opacity:"1.0",colBkgnd:"rgb(255,255,255)"}}}}}};G.prototype.exit=function(){V.prototype.exit.apply(this,arguments);this.detachSubmit(this.onGeoMapSubmit,this);this.detachContainerCreated(this.onGeoMapContainerCreated,this);this.detachContainerDestroyed(this.onGeoMapContainerDestroyed,this);};G.prototype.destroyResources=function(){this.m_bResourcesDirty=true;return this.destroyAggregation("resources");};G.prototype.addResource=function(o){this.m_bResourcesDirty=true;return this.addAggregation("resources",o);};G.prototype.insertResource=function(o,i){this.m_bResourcesDirty=true;return this.insertAggregation("resources",o,i);};G.prototype.removeResource=function(o){this.m_bResourcesDirty=true;return this.removeAggregation("resources",o);};G.prototype.removeAllResources=function(o){this.m_bResourcesDirty=true;return this.removeAllAggregation("resources");};G.prototype.destroyVos=function(){this.m_bVosDirty=true;return this.destroyAggregation("vos");};G.prototype.addVo=function(o){this.m_bVosDirty=true;this.addAggregation("vos",o);o.m_bAggRenew=true;return this;};G.prototype.insertVo=function(o,i){this.m_bVosDirty=true;this.insertAggregation("vos",o,i);o.m_bAggRenew=true;return this;};G.prototype.removeVo=function(o){this.m_bVosDirty=true;return this.removeAggregation("vos",o);};G.prototype.removeAllVos=function(o){this.m_bVosDirty=true;return this.removeAllAggregation("vos");};G.prototype.destroyGeoJsonLayers=function(){this.m_bGJLsDirty=true;return this.destroyAggregation("geoJsonLayers");};G.prototype.addGeoJsonLayer=function(o){this.m_bGJLsDirty=true;return this.addAggregation("geoJsonLayers",o);};G.prototype.insertGeoJsonLayer=function(o,i){this.m_bGJLsDirty=true;return this.insertAggregation("geoJsonLayers",o,i);};G.prototype.removeGeoJsonLayer=function(o){this.m_bGJLsDirty=true;return this.removeAggregation("geoJsonLayers",o);};G.prototype.removeAllGeoJsonLayers=function(o){this.m_bGJLsDirty=true;return this.removeAllAggregation("geoJsonLayers");};G.prototype.destroyFeatureCollections=function(){this.m_bFCsDirty=true;return this.destroyAggregation("featureCollections");};G.prototype.addFeatureCollection=function(o){this.m_bFCsDirty=true;return this.addAggregation("featureCollections",o);};G.prototype.insertFeatureCollection=function(o,i){this.m_bFCsDirty=true;return this.insertAggregation("featureCollections",o,i);};G.prototype.removeFeatureCollection=function(o){this.m_bFCsDirty=true;return this.removeAggregation("featureCollections",o);};G.prototype.removeAllFeatureCollections=function(o){this.m_bFCsDirty=true;return this.removeAllAggregation("featureCollections");};G.prototype.destroyClusters=function(){this.m_bClustersDirty=true;return this.destroyAggregation("clusters");};G.prototype.addCluster=function(o){this.m_bClustersDirty=true;return this.addAggregation("clusters",o);};G.prototype.insertCluster=function(o,i){this.m_bClustersDirty=true;return this.insertAggregation("clusters",o,i);};G.prototype.removeCluster=function(o){this.m_bClustersDirty=true;return this.removeAggregation("clusters",o);};G.prototype.removeAllClusters=function(o){this.m_bClustersDirty=true;return this.removeAllAggregation("clusters");};
/**
	 * Set Map configuration data. Map Configurations contain a set of Map Providers and Map Layer Stacks refering to those providers. The GeoMap
	 * property refMapLayerStack defines, which Map Layer Stack becomes visible.
	 * 
	 * @param {object} oMapConfiguration Map Configuration object
	 * @param {array} oMapConfiguration.MapProvider Array of Map Provider definitions.
	 * @param {string} oMapConfiguration.MapProvider.name Name for the provider. Needed in Map Layer Stack as reference.
	 * @param {string} oMapConfiguration.MapProvider.tileX X-pixel dimension of map tile. Typical 256.
	 * @param {string} oMapConfiguration.MapProvider.tileY Y-pixel dimension of map tile. Typical 256.
	 * @param {string} oMapConfiguration.MapProvider.minLOD Minimal supported Level Of Detail.
	 * @param {string} oMapConfiguration.MapProvider.maxLOD Maximal supported Level Of Detail.
	 * @param {string} oMapConfiguration.MapProvider.copyright Copyright Information to be shown with the map.
	 * @param {array} oMapConfiguration.MapProvider.Source Array of source definitions. At least on Source has to be given. Multiple sources can be
	 *        used for load distribution.
	 * @param {string} oMapConfiguration.MapProvider.Source.id Source id.
	 * @param {string} oMapConfiguration.MapProvider.Source.url Source URL for map tile service. URL includes place holders for variable informations
	 *        set at runtime, e.g. {LOD}.
	 * @param {array} oMapConfiguration.MapLayerStacks Array of Map Layer Stacks
	 * @param {string} oMapConfiguration.MapLayerStacks.name Name of Map Layer Stack. Use with the GeoMap refMapLayerStack property.
	 * @param {array} oMapConfiguration.MapLayerStacks.MapLayer Array of Map Layers. Each Layer refers to a Map Proveride. Map Layers get overlayed in
	 *        the given sequence.
	 * @param {string} oMapConfiguration.MapLayerStacks.MapLayer.name Name of Map Layer.
	 * @param {string} oMapConfiguration.MapLayerStacks.MapLayer.refMapProvider Name of referenced Map Provider.
	 * @param {string} oMapConfiguration.MapLayerStacks.MapLayer.opacity Opacity of Map Layer. Value range 0 to 1.
	 * @param {sap.ui.core.CSSColor} oMapConfiguration.MapLayerStacks.MapLayer.colBkgnd Background color for Map Layer. Only meaningful if opacity is
	 *        below 1.
	 * @returns {sap.ui.vbm.GeoMap} This allows method chaining
	 * @public
	 * @ui5-metamodel This method also will be described in the UI5 (legacy) designtime metamodel
	 */
G.prototype.setMapConfiguration=function(o){this.m_bMapConfigurationDirty=true;if(o.MapLayerStacks&&o.MapProvider){this.m_bMapLayerStacksDirty=true;this.m_bMapProvidersDirty=true;this.setProperty("mapConfiguration",o);}return this;};G.prototype.setClustering=function(c){this.m_bClusteringDirty=true;this.setProperty("clustering",c);return this;};G.prototype.setRefMapLayerStack=function(o){if(o===this.getRefMapLayerStack()){return this;}this.m_bRefMapLayerStackDirty=this.m_bSceneDirty=true;this.setProperty("refMapLayerStack",o);return this;};G.prototype.setVisualFrame=function(v){this.m_bVisualFrameDirty=true;this.setProperty("visualFrame",v);return this;};G.prototype.setRectangularSelection=function(s){V.prototype.setRectangularSelection.apply(this,arguments);};G.prototype.setLassoSelection=function(s){V.prototype.setLassoSelection.apply(this,arguments);};G.prototype.setRectZoom=function(s){V.prototype.setRectZoom.apply(this,arguments);};G.prototype.getPositionInteractive=function(p,c){if(!this.mIACreateCB&&c&&typeof(c)==="function"){this.mIACreateCB=c;var t="POS";if(p){t+="ARRAY";}var L={"SAPVB":{"Automation":{"Call":{"handler":"OBJECTCREATIONHANDLER","name":"CreateObject","object":"MainScene","scene":"MainScene","instance":"","Param":{"name":"data","#":"{"+t+"}"}}}}};this.load(L);return true;}else{return false;}};G.prototype.getCenterPosition=function(){var s=this.mVBIContext.GetMainScene();if(s){var c=window.VBI.MathLib.RadToDeg(s.GetCenterPos());return c[0]+";"+c[1];}return this.getProperty("centerPosition");};G.prototype.isNumeric=function(n){return!isNaN(parseFloat(n))&&isFinite(n);};G.prototype.setCenterPosition=function(p){var c=p?p.split(";"):undefined;if(!c||c.length<=1||!this.isNumeric(c[0])||!this.isNumeric(c[1])){jQuery.sap.log.error("Invalid center position given: '"+p+"'","setCenterPosition","sap.ui.vbm.GeoMap");return;}var P=c[0]+";"+c[1]+";0";this.setProperty("centerPosition",P);if(this.isRendered()){c=P.split(";");this.zoomToGeoPosition(c[0],c[1],this.getZoomlevel());}return this;};G.prototype.setInitialPosition=function(p){this.setCenterPosition(p);};G.prototype.getZoomlevel=function(){var s=this.mVBIContext.GetMainScene();if(s){return parseInt(s.GetCurrentZoomlevel(),10);}return this.getProperty("zoomLevel");};G.prototype.setZoomlevel=function(z){if(!this.getDisableZoom()){if(z>=0){if(this.isRendered()){var c=this.getCenterPosition().split(";");if(this.getEnableAnimation()){var s=this.mVBIContext.GetMainScene();s.AnimateZoomToGeo(s.GetCenterPos(),z,5);}else{this.zoomToGeoPosition(c[0],c[1],z);}}this.setProperty("zoomlevel",z);}else{jQuery.sap.log.error("Invalid zoomlevel given: "+z.toString(),"setZoomlevel","sap.ui.vbm.GeoMap");}}};G.prototype.setInitialZoom=function(z){this.setZoomlevel(parseInt(z,10));};G.prototype.openDetailWindow=function(p,P){this.mDTWindowCxt.key="";this.mDTWindowCxt.open=true;this.mDTWindowCxt.bUseClickPos=true;this.mDTWindowCxt.params=P?P:null;this.mDTWindowCxt.src={mClickGeoPos:p};this.invalidate(this);this.m_bWindowsDirty=true;};G.prototype.goToStartPosition=function(){if(this.isRendered()){this.mVBIContext.GetMainScene().GoToInitialStart();}};G.prototype.closeAnyDetailWindow=function(){this.mDTWindowCxt.open=false;this.invalidate(this);this.m_bWindowsDirty=true;};G.prototype.getVoByInternalId=function(i){var r=null;var s=i.split(/\./);var a=this.getAggregatorContainer(s[0]);if(a&&a.findInstance){r=a.findInstance(s[1]);}return r;};G.prototype.setSelectionPropFireSelect=function(d){var n=d.N;for(var a=0;a<n.length;++a){var A=n[a];var e=A.E;var c;if((c=this.getAggregatorContainer(A.name))&&c.handleSelectEvent){c.handleSelectEvent(e);}}};G.prototype.onGeoMapSubmit=function(e){var d=JSON.parse(e.mParameters.data);if(d.Data&&d.Data.Merge){this.handleChangedData(d.Data.Merge.N);}var c;if((c=this.getAggregatorContainer(d.Action.object))){c.handleEvent(d);if(d.Action.name=="click"&&d.Data&&d.Data.Merge){this.setSelectionPropFireSelect(d.Data.Merge);}}else{switch(d.Action.name){case"click":this.fireClick({pos:d.Action.AddActionProperties.AddActionProperty[0]['#']});break;case"contextMenu":this.fireContextMenu({clientX:d.Action.Params.Param[0]['#'],clientY:d.Action.Params.Param[1]['#'],pos:d.Action.AddActionProperties.AddActionProperty[0]['#']});break;case"drop":this.fireDrop({pos:d.Action.AddActionProperties.AddActionProperty[0]['#']});break;case"zoomChanged":this.fireZoomChanged({zoomLevel:d.Action.AddActionProperties.AddActionProperty[0]['#'],centerPoint:d.Action.AddActionProperties.AddActionProperty[1]['#'],viewportBB:{upperLeft:d.Action.Params.Param[3]['#'],lowerRight:d.Action.Params.Param[4]['#']}});break;case"centerChanged":this.fireCenterChanged({zoomLevel:d.Action.AddActionProperties.AddActionProperty[0]['#'],centerPoint:d.Action.AddActionProperties.AddActionProperty[1]['#'],viewportBB:{upperLeft:d.Action.Params.Param[3]['#'],lowerRight:d.Action.Params.Param[4]['#']}});break;case"select":if(d.Data&&d.Data.Merge.N){var s=this.getSelectedItems(d.Data.Merge.N);this.fireSelect({selected:s});this.setSelectionPropFireSelect(d.Data.Merge);}break;case"GetPosComplete":if(this.mIACreateCB){try{this.mIACreateCB(d.Action.Params.Param[0]['#']);this.mIACreateCB=null;}catch(a){this.mIACreateCB=null;throw a;}}break;default:break;}}};G.prototype.onGeoMapContainerCreated=function(e){var d=e.getParameter("contentarea");if(d.m_ID){var c;if((c=this.getAggregatorContainer(d.m_ID))&&c.handleContainerCreated){c.handleContainerCreated(e);}}};G.prototype.onGeoMapContainerDestroyed=function(e){var d=e.getParameter("contentarea");if(d.m_ID){var c;if((c=this.getAggregatorContainer(d.m_ID))&&c.handleContainerDestroyed){c.handleContainerDestroyed(e);}}if(this.mDTWindowCxt.open&&e.getParameter("id")=="Detail"){this.mDTWindowCxt.open=false;this.mDTWindowCxt.src=null;this.m_bWindowsDirty=true;}};G.prototype.init=function(){this.attachSubmit(this.onGeoMapSubmit,this);this.attachContainerCreated(this.onGeoMapContainerCreated,this);this.attachContainerDestroyed(this.onGeoMapContainerDestroyed,this);this.m_bVosDirty=true;this.m_bFCsDirty=true;this.m_bGJLsDirty=true;this.m_bClustersDirty=true;this.m_bMapConfigurationDirty=true;this.m_bClusteringDirty=true;this.m_bVisualFrameDirty=true;this.m_bRefMapLayerStackDirty=true;this.m_bResourcesDirty=true;this.m_bMapProvidersDirty=true;this.m_bMapLayerStacksDirty=true;this.m_bWindowsDirty=true;this.m_bMapconfigDirty=true;this.m_bLegendDirty=true;this.m_bSceneDirty=true;this.mbForceDataUpdate=false;this.bDataDeltaUpdate=false;this.bHandleChangedDataActive=false;this.mDTWindowCxt={open:false,src:null,key:"",params:null};V.prototype.init.apply(this,arguments);};G.prototype.getSelectedItems=function(d){var c,C,s=[];if(!d){return null;}if(jQuery.type(d)=='object'){c=this.getAggregatorContainer(d.name);C=c.findSelected(true,d.E);s=s.concat(C);}else if(jQuery.type(d)=='array'){for(var n=0;n<d.length;++n){c=this.getAggregatorContainer(d[n].name);C=c.findSelected(true,d[n].E);if(C&&C.length){s=s.concat(C);}}}return s;};G.prototype.getWindowsObject=function(){var w={"Set":[{"name":"Main","Window":{"id":"Main","caption":"MainWindow","type":"geo","refParent":"","refScene":"MainScene","modal":"true"}}],"Remove":[]};var L=this.getLegend();if(L){var a;if((a=this.getDomRef(L.getId()))){this.m_curLegendPos={right:parseInt(a.style.right,10),top:parseInt(a.style.top,10)};}var o=L.getTemplateObject();if(o.Set){w.Set=w.Set.concat(o.Set);}if(o.Remove){w.Remove=w.Remove.concat(o.Remove);}}if(this.mDTWindowCxt.src){var r,d;r=[{"name":"Detail"}];if(this.mDTWindowCxt.key){var c=this.getChildByKey(this.mDTWindowCxt.src,this.mDTWindowCxt.key);if(!c){this.mDTWindowCxt.open=false;this.mDTWindowCxt.src=null;this.mDTWindowCxt.key="";this.mDTWindowCxt.params=null;}else{this.mDTWindowCxt.src=c;}}if(this.mDTWindowCxt.open){d={"Set":[{"name":"Detail","Window":{"id":"Detail","type":"callout","refParent":"Main","refScene":"","modal":"true","caption":this.mDTWindowCxt.params.caption?this.mDTWindowCxt.params.caption:"","offsetX":this.mDTWindowCxt.params.offsetX?this.mDTWindowCxt.params.offsetX:"0","offsetY":this.mDTWindowCxt.params.offsetY?this.mDTWindowCxt.params.offsetY:"0"}}]};if(this.mDTWindowCxt.bUseClickPos==true&&this.mDTWindowCxt.src.mClickGeoPos){d.Set[0].Window.pos=this.mDTWindowCxt.src.mClickGeoPos;}else{d.Set[0].Window['pos.bind']=this.mDTWindowCxt.src.getParent().sId+"."+this.mDTWindowCxt.src.UniqueId+".P";}w.Set=w.Set.concat(d.Set);}w.Remove=w.Remove.concat(r);}return w;};G.prototype.getActionArray=function(){var a=[];if(this.mEventRegistry["click"]){a.push({"id":"GMap1","name":"click","refScene":"MainScene","refVO":"Map","refEvent":"Click","AddActionProperty":[{"name":"pos"}]});}if(this.mEventRegistry["contextMenu"]){a.push({"id":"GMap2","name":"contextMenu","refScene":"MainScene","refVO":"Map","refEvent":"ContextMenu","AddActionProperty":[{"name":"pos"}]});}if(this.mEventRegistry["drop"]){a.push({"id":"GMap3","name":"drop","refScene":"MainScene","refVO":"Map","refEvent":"Drop","AddActionProperty":[{"name":"pos"}]});}if(this.mEventRegistry["submit"]){a.push({"id":"GMap4","name":"zoomChanged","refScene":"MainScene","refVO":"Map","refEvent":"ZoomChanged","AddActionProperty":[{"name":"zoom"},{"name":"centerpoint"},{"name":"pos"}]});}if(this.mEventRegistry["submit"]){a.push({"id":"GMap5","name":"centerChanged","refScene":"MainScene","refVO":"Map","refEvent":"CenterChanged","AddActionProperty":[{"name":"zoom"},{"name":"centerpoint"},{"name":"pos"}]});}if(this.mEventRegistry["submit"]){a.push({"id":"GMap6","name":"select","refScene":"MainScene","refVO":"General","refEvent":"Select"});}a.push({"id":"GMap7","name":"GetPosComplete","refScene":"MainScene","refVO":"General","refEvent":"CreateComplete"});return a;};G.prototype.getSceneVOdelta=function(c,n){var v=[];var r=[];var o={};for(var a=0,b=c.length;a<b;++a){o[c[a].id]=c[a];}for(var d=0;d<n.length;++d){if(o[n[d].id]){if(JSON.stringify(n[d])!=JSON.stringify(o[n[d].id])){r.push({"id":n[d].id,"type":"VO"});v.push(n[d]);}}else{v.push(n[d]);}delete o[n[d].id];}for(var i in o){r.push({"id":i,"type":"VO"});}var e={"Merge":{"name":"MainScene","type":"SceneGeo","SceneGeo":{"id":"MainScene","refMapLayerStack":this.getRefMapLayerStack()}}};if(r.length){e.Merge.SceneGeo.Remove=r;}if(v.length){e.Merge.SceneGeo.VO=v;}return e;};G.prototype.minimizeApp=function(a){var t,s;s=null;if(!this.m_bWindowsDirty){(t=a)&&(t=t.SAPVB)&&(t=t.Windows)&&(s=JSON.stringify(t))&&(s==this.m_curWindows)&&(delete a.SAPVB.Windows)||(this.m_curWindows=s?s:this.m_curWindows);}else{this.m_bWindowsDirty=false;}s=null;(t=a)&&(t=t.SAPVB)&&(t=t.Scenes)&&(s=JSON.stringify(t))&&(s==this.m_curScenes)&&(delete a.SAPVB.Scenes)||(this.m_curScenes=s?s:this.m_curScenes);s=null;(t=a)&&(t=t.SAPVB)&&(t=t.Actions)&&(s=JSON.stringify(t))&&(s==this.m_curActions)&&(delete a.SAPVB.Actions)||(this.m_curActions=s?s:this.m_curActions);s=null;(t=a)&&(t=t.SAPVB)&&(t=t.DataTypes)&&(s=JSON.stringify(t))&&(s==this.m_curDataTypes)&&(delete a.SAPVB.DataTypes)||(this.m_curDataTypes=s?s:this.m_curDataTypes);if(!this.mbForceDataUpdate){s=null;(t=a)&&(t=t.SAPVB)&&(t=t.Data)&&(s=JSON.stringify(t))&&(s==this.m_curData)&&(delete a.SAPVB.Data)||(this.m_curData=s?s:this.m_curData);}else{this.mbForceDataUpdate=false;}return a;};G.prototype.getAggregatorContainer=function(i){if(i==="MainScene"){return null;}var c=this.getClusters();for(var n=0;n<c.length;++n){if(c[n].sId===i){return c[n];}}var v=this.getVos();for(var a=0,b=v.length;a<b;++a){if(v[a].sId===i){return v[a];}}var g=this.getGeoJsonLayers();for(var d=0;d<g.length;++d){if(i.indexOf(g[d].sId)===0){return g[d];}}var f=this.getFeatureCollections();for(var e=0;e<f.length;++e){if(i.indexOf(f[e].sId)===0){return f[e];}}var h=this.getLegend();if(h&&h.sId==i){return h;}return null;};G.prototype.update=function(){var a=jQuery.extend(true,{},G.oBaseApp);if(this.m_bResourcesDirty){this.updateResourceData(a);}var c={};if(this.m_bClusteringDirty||this.m_bClustersDirty){this.updateClustering(a,c);this.mCurClusterRefVOs=jQuery.extend(true,{},c);}else{c=jQuery.extend(true,{},this.mCurClusterRefVOs);}if(this.m_bSceneDirty){this.updateScene(a,c);}if(this.m_bResourcesDirty){this.updateResourceData(a);}if(this.m_bMapConfigurationDirty){this.updateMapConfiguration(a);}this.updateMapProviders(a);this.updateMapLayerStacks(a);this.updateWindows(a);var b;if((b=this.getLegend())){if(a.SAPVB.Actions){Array.prototype.push.apply(a.SAPVB.Actions.Set.Action,b.getActionArray());}}if(a.SAPVB.Actions){Array.prototype.push.apply(a.SAPVB.Actions.Set.Action,this.getActionArray());}return this.minimizeApp(a);};G.prototype.updateMapProviders=function(a){if(!this.m_bMapProvidersDirty){delete a.SAPVB.MapProviders;}this.m_bMapProvidersDirty=false;};G.prototype.updateMapLayerStacks=function(a){if(!this.m_bMapLayerStacksDirty){delete a.SAPVB.MapLayerStacks;}this.m_bMapLayerStacksDirty=false;};G.prototype.updateWindows=function(a){a.SAPVB.Windows=this.getWindowsObject();};G.prototype.updateScene=function(a,c){var s=[];var b=(c.Data)?c.Data:[];var d=[];var e=[];var f=(c.Actions)?c.Actions:[];var u=!this.m_bFCsDirty&&!this.m_bGJLsDirty&&!this.m_bVosDirty;this.updateGJLData(s,b,d,e,f,u);this.updateFCData(s,b,d,e,f,u);this.updateVOData(s,b,d,e,f,u);if(c.VO){s=s.concat(c.VO);}if(this.m_bLegendDirty){var L=this.getLegend();if(L){d.push({name:L.sId,type:"N"});b.push(L.getDataObject());e.push(L.getTypeObject());}}var _=JSON.stringify(s);var m=true;if(!this.m_saVO){((((a.SAPVB.Scenes={}).Set={}).SceneGeo={"id":"MainScene","refMapLayerStack":this.getRefMapLayerStack(),"initialZoom":this.getProperty("zoomlevel"),"initialStartPosition":this.getProperty("centerPosition"),"scaleVisible":this.getScaleVisible().toString(),"navControlVisible":this.getNavcontrolVisible().toString(),"rectSelect":this.getRectangularSelection().toString(),"lassoSelect":this.getLassoSelection().toString(),"rectZoom":this.getRectZoom().toString(),"VisualFrame":this.getVisualFrame(),"NavigationDisablement":{"zoom":this.getDisableZoom().toString(),"move":this.getDisablePan().toString()}}).VO=s);}else if(this.m_bRefMapLayerStackDirty||!(this.m_saVO===_)){(a.SAPVB.Scenes=this.getSceneVOdelta(JSON.parse(this.m_saVO),s));}else{m=false;}this.m_saVO=_;var n;if(this.bDataDeltaUpdate){a.SAPVB.Data={};a.SAPVB.Data.Set=[];for(n=0;n<b.length;++n){a.SAPVB.Data.Set.push({name:b[n].name,type:"N",N:b[n]});}}else{a.SAPVB.Data={};if(d.length){a.SAPVB.Data.Remove=[];for(n=0;n<d.length;++n){a.SAPVB.Data.Remove.push(d[n]);}}a.SAPVB.Data.Set=[];for(n=0;n<b.length;++n){a.SAPVB.Data.Set.push({name:b[n].name,type:"N",N:b[n]});}}if(m){(((a.SAPVB.DataTypes={}).Set={}).N=e);}(((a.SAPVB.Actions={}).Set={}).Action=f);this.resetDirtyStates();};G.prototype.resetDirtyStates=function(){this.m_bRefMapLayerStackDirty=this.m_bSceneDirty=this.m_bFCsDirty=this.m_bGJLsDirty=this.m_bVosDirty=false;};G.prototype.updateMapConfiguration=function(a){if(!this.m_bMapConfigurationDirty){return;}this.m_bMapConfigurationDirty=false;var c=this.getMapConfiguration();if(c){a.SAPVB.MapProviders={Set:{MapProvider:c.MapProvider}};a.SAPVB.MapLayerStacks={Set:{MapLayerStack:c.MapLayerStacks}};}return;};G.prototype.updateClustering=function(a,c){var C=this.getClusters();var o=null;if(C.length){o={Cluster:[]};c.VO=[];c.Actions=[];c.Data=[];for(var n=0,b;n<C.length;++n){b=C[n];c.VO.push(b.getTemplateObject());c.Actions=c.Actions.concat(b.getActionArray());o.Cluster.push(b.getClusterDefinition());}}else{if(this.m_bClusteringDirty){o=this.getClustering();}}if(o){a.SAPVB.Clustering={Set:o};}else if(this.mCurClusterRefVOs&&this.mCurClusterRefVOs.VO.length>0){a.SAPVB.Clustering={Set:[]};}this.m_bClusteringDirty=this.m_bClustersDirty=false;};G.prototype.updateResourceData=function(a){if(!this.m_bResourcesDirty){return;}this.m_bResourcesDirty=false;var r=this.getResources();((a.SAPVB.Resources={}).Set={}).Resource=[];function R(){var a=this.update();this.load(a);}var f=function(c){if(!c.m_Img){return;}if(!c.m_Img.complete){return;}var d=document.createElement('canvas');d.width=c.m_Img.width;d.height=c.m_Img.height;var e=d.getContext('2d');e.drawImage(c.m_Img,0,0);c.mProperties.value=d.toDataURL();delete c.m_Img;this.m_bResourcesDirty=true;window.setTimeout(R.bind(this),10);};for(var n=0,b=r.length;n<b;++n){var c=r[n];if(!c.mProperties.value&&c.mProperties.src){var i=document.createElement('img');c.m_Img=i;i.onload=f.bind(this,c);i.src=c.mProperties.src;}else{a.SAPVB.Resources.Set.Resource.push({"name":(c.mProperties.name?c.mProperties.name:c.sId),"value":c.mProperties.value});}}return;};G.prototype.updateVOData=function(s,a,b,c,d,u){var v=this.getVos();for(var n=0,e=v.length;n<e;++n){var o=v[n];var D=o.aDiff;s.push(o.getTemplateObject());c.push(o.getTypeObject());Array.prototype.push.apply(d,o.getActionArray());if(D&&D.length&&o.m_bAggChange&&u){var f=o.getDataDeltaObject(D);if(f.oData&&f.oData.E&&f.oData.E.length){a.push(f.oData);}if(f.aRemoveData){for(var g=0;g<f.aRemoveData.length;++g){b.push(f.aRemoveData[g]);}}}else if(!u||o.m_bAggRenew){b.push(o.getDataRemoveObject());if(o instanceof sap.ui.vbm.VoAggregation){o.resetIndices();}a.push(o.getDataObject());}if(o instanceof sap.ui.vbm.VoAggregation){o.aDiff=[];o.updateIdxArray();o.m_bAggRenew=o.m_bAggChange=false;}}};G.prototype.updateGJLData=function(s,a,b,c,d,u){var L=this.getGeoJsonLayers();for(var n=0,e=L.length;n<e;++n){var o=L[n];Array.prototype.push.apply(s,o.getTemplateObjects());Array.prototype.push.apply(c,o.getTypeObjects());Array.prototype.push.apply(d,o.getActionArray());Array.prototype.push.apply(b,o.getDataRemoveObjects());Array.prototype.push.apply(a,o.getDataObjects());}};G.prototype.updateFCData=function(s,a,b,c,d,u){var f=this.getFeatureCollections();for(var n=0,e=f.length;n<e;++n){var F=f[n];Array.prototype.push.apply(s,F.getTemplateObjects());Array.prototype.push.apply(c,F.getTypeObjects());Array.prototype.push.apply(d,F.getActionArray());Array.prototype.push.apply(b,F.getDataRemoveObjects());Array.prototype.push.apply(a,F.getDataObjects());}};G.prototype.invalidate=function(s){this.m_bSceneDirty=true;if(s instanceof sap.ui.vbm.VoAggregation){this.m_bWindowsDirty=true;this.bDataDeltaUpdate=this.bHandleChangedDataActive;}else if(s instanceof sap.ui.vbm.Legend){this.m_bLegendDirty=true;}else if(s instanceof sap.ui.vbm.GeoJsonLayer){if(s instanceof sap.ui.vbm.FeatureCollection){this.m_bFCsDirty=true;}else{this.m_bGJLsDirty=true;}}else if(s instanceof sap.ui.vbm.ClusterBase){this.m_bClustersDirty=true;}sap.ui.core.Control.prototype.invalidate.apply(this,arguments);};G.prototype.openContextMenu=function(t,i,m){if(m&&m.vbi_data&&m.vbi_data.VBIName=="DynContextMenu"){if(!this.mVBIContext.m_Menus){this.mVBIContext.m_Menus=new window.VBI.Menus();}this.mVBIContext.m_Menus.m_menus.push(m);var a={"SAPVB":{"version":"2.0","Automation":{"Call":{"earliest":"0","handler":"CONTEXTMENUHANDLER","instance":i.sId,"name":"SHOW","object":t,"refID":"CTM","Param":[{"name":"x","#":i.mClickPos[0]},{"name":"y","#":i.mClickPos[1]},{"name":"scene","#":"MainScene"}]}}}};this.loadHtml(a);}};G.prototype.addResourceIfNeeded=function(r){var R=this.getResources();for(var n=0,a=R.length;n<a;++n){if(R[n].getName()===r){return;}}if(G.bEncodedSpotImagesAvailable==false){var p=sap.ui.resource("sap.ui.vbm","themes/base/img/Pin_images.json");var o=jQuery.sap.syncGetJSON(p);G.bEncodedSpotImageData=o.data;G.bEncodedSpotImagesAvailable=true;}if(G.bEncodedSpotImageData){for(var k in G.bEncodedSpotImageData){if(r==k){this.addResource(new sap.ui.vbm.Resource({name:k,value:G.bEncodedSpotImageData[k]}));}}}else{this.addResource(new sap.ui.vbm.Resource({name:r,src:sap.ui.resource("sap.ui.vbm","themes/base/img/"+r)}));}this.m_bResourcesDirty=true;};G.prototype.handleChangedData=function(n){try{this.bHandleChangedDataActive=true;if(n&&n.length){for(var a=0,N,c;a<n.length;++a){N=n[a];c=this.getAggregatorContainer(N.name);if(c){c.handleChangedData(N.E);}}}this.bHandleChangedDataActive=false;}catch(e){this.bHandleChangedDataActive=false;throw e;}};G.prototype.getChildByKey=function(c,k){var a,C=null;if((a=c.getParent())){if(a instanceof sap.ui.vbm.VoAggregation){if((this.getAggregatorContainer(a.getId()))){C=a.findInstanceByKey(k);}}else{C=a.findInstance(k);}}return C;};return G;},true);
