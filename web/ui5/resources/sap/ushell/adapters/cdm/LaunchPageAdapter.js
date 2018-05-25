// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
sap.ui.define(["sap/m/Text","sap/m/GenericTile","sap/m/GenericTileMode","sap/ushell/resources","sap/ushell/utils/utilsCdm","sap/ushell/utils","sap/ushell/navigationMode"],function(T,G,g,r,u,U,n){"use strict";var l=jQuery.sap.log.getLogger("sap/ushell/adapters/cdm/LaunchPageAdapter"),L=jQuery.sap.log.Level;function a(o,p,A){var _,s="sap.ushell.components.tiles.cdm.applauncher",d="sap.ushell.components.tiles.cdm.applauncherdynamic";this._mResolvedTiles={};this._mResolvedCatalogTiles={};this._mCatalogTilePromises={};this._mFailedResolvedCatalogTiles={};this._mFailedResolvedTiles={};this._mContentProviders={};this.TileType={Tile:"tile",Link:"link"};this.getGroups=function(){var D=new jQuery.Deferred();this._assureLoaded().done(function(e){D.resolve(e);}).fail(function(){D.resolve([]);});return D.promise();};this._getTileFromHashInContextOfSite=function(R,C,I){var D=new jQuery.Deferred(),e=C[I];if(!e){e=R(I);C[I]=e;}e.done(function(w){var x={tileIntent:I,tileResolutionResult:w};D.resolve(x);}).fail(function(E){D.reject("Hash '"+I+"' could not be resolved to a tile. "+E);});return D.promise();};this._getTileFromHash=function(I){var C=sap.ushell.Container.getService("ClientSideTargetResolution");var R=C.resolveTileIntent.bind(C);return this._getTileFromHashInContextOfSite(R,this._mCatalogTilePromises,I);};this._getTileFromHashFromSite=function(S,I){var C=sap.ushell.Container.getService("ClientSideTargetResolution");var e=u.formatSite(S);var R=C.resolveTileIntentInContext.bind(C,e);var w={};return this._getTileFromHashInContextOfSite(R,w,I);};this._getTileForUrl=function(e){var w=e.indicatorDataSource?"#Shell-dynamicTile":"#Shell-staticTile";return{tileIntent:"#",tileResolutionResult:{tileComponentLoadInfo:w,isCustomTile:false}};};this._assureGroupItemsResolved=function(e,S){var P=[],R,w;if(e.payload&&e.payload.tiles){R=this._assureGroupTilesResolved(e.payload.tiles,S);Array.prototype.push.apply(P,R);}if(e.payload&&e.payload.links){w=this._assureGroupLinksResolved(e.payload.links,S);Array.prototype.push.apply(P,w);}return P;};this._assureGroupTilesResolved=function(e,S){return(e||[]).map(function(w,I){return this._resolveGroupTile(w,S).then(function(R){R.isLink=false;return R;});},this);};this._assureGroupLinksResolved=function(e,S){return(e||[]).map(function(w,I){return this._resolveGroupTile(w,S).then(function(R){R.isLink=true;return R;});},this);};this._resolveGroupTile=function(e,S){var w=this._mResolvedTiles;var F=this._mFailedResolvedTiles;var R;function x(z){w[e.id]=z;if(F[e.id]){delete F[e.id];}return z;}function y(e){var z=e.target;return z&&z.semanticObject==="Shell"&&z.action==="launchURL";}if(w[e.id]){return(new jQuery.Deferred()).resolve(w[e.id]).promise();}if(e.target&&e.target.url){R=jQuery.when(this._getTileForUrl(e));}else if(e.isBookmark){R=this._resolveTileByIntent(e,S);}else if(y(e)){R=this._resolveTileByIntent(e,S);}else{R=this._resolveTileByAppId(e,S);}R.done(function(z){x(z);}).fail(function(z){F[e.id]=z;});return R;};this._resolveTileByAppId=function(e,S){var w,x,I,y,H;function z(E,F){return new jQuery.Deferred().reject({logLevel:E,message:F}).promise();}if(!jQuery.isPlainObject(e)){return z(L.ERROR,"Cannot resolve tile: oTile must be an object");}if(!jQuery.isPlainObject(S)){return z(L.ERROR,"Cannot resolve tile: oSite must be an object");}w=e.appId||e.appIDHint;if(!w){return z(L.ERROR,["Cannot resolve tile '",e.id,"': either appId or appIDHint must be specified"].join(""));}x=S.applications&&S.applications[w];if(!x){return z(L.INFO,["Tile '",e.id,"' filtered from result: no app found for appId '",w,"' (dangling app reference)"].join(""));}I=this._getFirstInbound(x);if(!I){return z(L.ERROR,["Cannot resolve tile '",e.id,"': app '",w,"' has no navigation inbound"].join(""));}var M=u.mapOne(I.key,I.inbound,x),B=M.resolutionResult.applicationType,C=M.resolutionResult.additionalInformation,D=sap.ushell.Container.getService("ClientSideTargetResolution").isInPlaceConfiguredFor(B);y=M.tileResolutionResult;y.navigationMode=n.computeNavigationModeForHomepageTiles(B,C,D);y.isLink=false;if(!this._isFormFactorSupported(y)){return z(L.INFO,["Tile '",e.id,"' filtered from result: form factor not supported"].join(""));}H=this._toHashFromInbound(I.inbound);return jQuery.when({tileResolutionResult:y,tileIntent:H});};this._isFormFactorSupported=function(e){var C=U.getFormFactor();return e.deviceTypes&&e.deviceTypes[C];};this._getFirstInbound=function(e){var F=Object.keys(e["sap.app"].crossNavigation.inbounds).shift(),I=e["sap.app"].crossNavigation.inbounds[F];return{key:F,inbound:I};};this._resolveTileByIntent=function(e,S){var H=this._prepareTileHash(e);return this._getTileFromHash(H);};this._prepareTileHash=function(e){var w=sap.ushell.Container.getService("URLParsing"),P={},x,R;if(this._isCatalogTile(e)){return e.tileIntent;}if(this._isGroupTile(e)){R=e.target.parameters||[];R.forEach(function(y){if(y.name&&y.value){P[y.name]=[y.value];}});x={target:{semanticObject:e.target.semanticObject,action:e.target.action},params:P,appSpecificRoute:e.target.appSpecificRoute};return"#"+w.constructShellHash(x);}return undefined;};this._allPromisesDone=function(P){var D=new jQuery.Deferred(),e;if(P.length===0){D.resolve([]);}else{var N=P.map(function(w){e=new jQuery.Deferred();w.always(e.resolve.bind(e));return e.promise();});jQuery.when.apply(this,N).done(function(){var w=Array.prototype.slice.call(arguments);D.resolve(w);});}return D.promise();};this._generateDefaultGroup=function(){var e,w,D=new jQuery.Deferred(),C=sap.ushell.Container.getService("CommonDataModel");C.getSite().done(function(S){e=sap.ushell.utils.generateUniqueId(S.site.payload.groupsOrder);w={"identification":{"id":e,"namespace":"","title":"Home"},"payload":{"isDefaultGroup":true,"locked":false,"tiles":[],"links":[],"groups":[]}};_=w;S.groups[e]=w;S.site.payload.groupsOrder.unshift(e);D.resolve(w);}).fail(function(E){D.reject("Failed to access site. "+E);});return D.promise();};this._assureLoaded=function(){var e=this,C=sap.ushell.Container.getService("CommonDataModel"),D,w=[],x;if(this._assureLoadedDeferred){return this._assureLoadedDeferred.promise();}x=new jQuery.Deferred();this._assureLoadedDeferred=x;C.getSite().done(function(S){var I=[];S.site.payload.groupsOrder.forEach(function(y,z){var B=S.groups[y];if(B){B.payload=B.payload||{};if(B.payload.hasOwnProperty("isDefaultGroup")){_=B;}w.push(B);I=e._assureGroupItemsResolved(B,S).concat(I);}});if(_===undefined){D=e._generateDefaultGroup();I.push(D);D.done(function(y){w.unshift(y);}).fail(function(E){jQuery.sap.log.error("Delivering hompage groups failed - "+E);e._assureLoadedDeferred.resolve([]);});}e._allPromisesDone(I).done(function(){e._assureLoadedDeferred.resolve(w);delete e._assureLoadedDeferred;e._logTileResolutionFailures(e._mFailedResolvedTiles);});}).fail(function(E){jQuery.sap.log.error("Delivering hompage groups failed - "+E);e._assureLoadedDeferred.resolve([]);delete e._assureLoadedDeferred;});return x.promise();};this._logTileResolutionFailures=function(F){var M={};if(!F){return;}Object.keys(L).filter(function(e){var w=L[e];return w>=L.FATAL&&w<=L.ALL;}).forEach(function(e){M[L[e]]="";});Object.keys(F).forEach(function(e){var w=F[e];if(w.logLevel){M[w.logLevel]=M[w.logLevel].concat(w.message).concat("\n");}});if(M[L.FATAL]){l.fatal(M[L.FATAL]);}if(M[L.ERROR]){l.error(M[L.ERROR]);}if(M[L.WARNING]){l.warning(M[L.WARNING]);}if(M[L.INFO]){l.info(M[L.INFO]);}if(M[L.DEBUG]){l.debug(M[L.DEBUG]);}if(M[L.TRACE]){l.trace(M[L.TRACE]);}};this.getDefaultGroup=function(){var D=new jQuery.Deferred(),e;if(!_){e=this._assureLoaded();}if(e){e.done(function(){D.resolve(_);}).fail(function(M){D.reject("Failed to access default group. "+M);});}else{D.resolve(_);}return D.promise();};this._isValidTitle=function(e){if(typeof e!=='string'||!e){return false;}return true;};this._isGroupPreset=function(e){if(!e.payload.hasOwnProperty("isPreset")){return true;}return!!e.payload.isPreset;};this._isGroupLocked=function(e){return!!e.payload.locked;};this.addGroup=function(e){var D=new jQuery.Deferred(),C=sap.ushell.Container.getService("CommonDataModel"),w,x,y,z=this;if(!this._isValidTitle(e)){return D.reject("No valid group title").promise();}y="Failed to add the group with title '"+e+"' to the homepage. ";C.getSite().done(function(S){x=sap.ushell.utils.generateUniqueId(S.site.payload.groupsOrder);w={"identification":{"id":x,"namespace":"","title":e},"payload":{"locked":false,"isPreset":false,"tiles":[],"links":[],"groups":[]}};S.groups[x]=w;S.site.payload.groupsOrder.push(w.identification.id);C.save().done(function(){delete z._assureLoadedDeferred;D.resolve(S.groups[x],x);}).fail(function(E){D.reject(E);});}).fail(function(E){D.reject(y+E);});return D.promise();};this.getGroupTitle=function(e){return e.identification.title;};this.setGroupTitle=function(e,N){var w=this,D=new jQuery.Deferred(),C=sap.ushell.Container.getService("CommonDataModel"),O,x;if(typeof e!=='object'||!e.identification||!e.identification.id){return D.reject("Unexpected group value").promise();}if(!w._isValidTitle(N)){return D.reject("Unexpected oGroup title value").promise();}x="Failed to set new title for group with id '"+e.identification.id+"'. ";O=e.identification.title;C.getSite().done(function(S){if(S.groups[e.identification.id]){S.groups[e.identification.id].identification.title=N;}C.save().done(function(){D.resolve();}).fail(function(E){jQuery.sap.log.error(E);D.reject(O);});}).fail(function(E){D.reject(O,x+E);});return D.promise();};this.getGroupId=function(e){return e.identification.id;};this.hideGroups=function(H){var D=new jQuery.Deferred(),C=sap.ushell.Container.getService("CommonDataModel"),e;if(H&&jQuery.isArray(H)){e="Failed to hide group. ";C.getSite().done(function(S){if(H.length>0){Object.keys(S.groups).forEach(function(w){if(jQuery.inArray(S.groups[w].identification.id,H)>-1){S.groups[w].identification.isVisible=false;}else{delete S.groups[w].identification.isVisible;}});}if(H.length===0){Object.keys(S.groups).forEach(function(w){delete S.groups[w].identification.isVisible;});}C.save().done(function(){D.resolve();}).fail(function(E){D.reject("Hiding of groups did not work as expected - "+E);});}).fail(function(E){D.reject(e+E);});}else{D.reject("Invalid input parameter aHiddenGroupIds. Please pass a valid input parameter.");}return D.promise();};this.isGroupVisible=function(e){if(e.identification.isVisible===undefined||e.identification.isVisible===true){return true;}else{return false;}};this.moveGroup=function(e,w){var D=new jQuery.Deferred(),C=sap.ushell.Container.getService("CommonDataModel"),x,y;if(!e||!e.identification||!e.identification.id||w<0){return D.reject("Unable to move groups - invalid parameters").promise();}y="Failed to move group with id '"+e.identification.id+"'. ";C.getSite().done(function(S){if(!S.site.payload.groupsOrder){return D.reject("groupsOrder not found - abort operation of adding a group.");}else if(S.site.payload.groupsOrder.indexOf(e.identification.id)===w){return D.resolve();}x=sap.ushell.utils.moveElementInsideOfArray(S.site.payload.groupsOrder,S.site.payload.groupsOrder.indexOf(e.identification.id),w);if(!x){return D.reject("invalid move group operation - abort.");}C.save().done(function(){D.resolve();}).fail(function(E){D.reject(E);});}).fail(function(E){D.reject(y+E);});return D.promise();};this.removeGroup=function(e){var D=new jQuery.Deferred(),C=sap.ushell.Container.getService("CommonDataModel"),w;if(!e||typeof e!=="object"||!e.identification||!e.identification.id){return D.reject("no valid input parameter for 'oGroup'").promise();}w="Failed to remove group with id '"+e.identification.id+"'. ";C.getSite().done(function(S){if(S&&S.groups&&S.groups[e.identification.id]){delete S.groups[e.identification.id];}if(S&&S.site&&S.site.payload&&S.site.payload.groupsOrder){S.site.payload.groupsOrder=jQuery.grep(S.site.payload.groupsOrder,function(x){return x!==e.identification.id;});}C.save().done(function(){D.resolve();}).fail(function(E){D.reject(E);});}).fail(function(E){D.reject(w+E);});return D.promise();};this.resetGroup=function(e){var D=new jQuery.Deferred(),C=sap.ushell.Container.getService("CommonDataModel"),S={},w=this,x;if(e&&typeof e==="object"&&e.identification&&e.identification.id){x="Failed to reset group with id '"+e.identification.id+"'. ";C.getSite().done(function(y){jQuery.extend(true,S,y.groups);if(w.isGroupRemovable(e)===false){C.getGroupFromOriginalSite(e.identification.id).done(function(z){if(y&&typeof y==="object"&&y.groups&&y.groups[e.identification.id]){y.groups[e.identification.id]=z;}C.save().done(function(){D.resolve(z);}).fail(function(E){D.reject("Group could not be reset - "+E,S);});}).fail(function(E){D.reject("Group could not be reset - "+E,S);});}else{D.reject("Group could not be reset as it was created by the user",S);}}).fail(function(E){D.reject(x+E,S);});}return D.promise();};this.getTileTitle=function(e){var R;if(e&&e.isBookmark){return e.title;}R=this._mResolvedTiles[e.id];if(R){return e.title||R.tileResolutionResult.title;}else{return undefined;}};this.getTileSubtitle=function(e){var R;if(e.isBookmark){return e.subTitle;}R=this._mResolvedTiles[e.id];if(R){return e.subTitle||R.tileResolutionResult.subTitle;}else{return undefined;}};this.getTileIcon=function(e){var R;if(e.isBookmark){return e.icon;}R=this._mResolvedTiles[e.id];if(R){return e.icon||R.tileResolutionResult.icon;}else{return undefined;}};this.getTileInfo=function(e){var R;if(e.isBookmark){return e.info;}R=this._mResolvedTiles[e.id];return e.info||R.tileResolutionResult.info;};this.getTileIndicatorDataSource=function(e){var R=this._mResolvedTiles[e.id],w={},x;if(e.indicatorDataSource){w.indicatorDataSource=e.indicatorDataSource;if(e.dataSource){w.dataSource=e.dataSource;}return w;}if(!R){return w;}x=R.tileResolutionResult;if(x.indicatorDataSource){w.indicatorDataSource=x.indicatorDataSource;if(x.indicatorDataSource.hasOwnProperty("dataSource")){var D=x.indicatorDataSource.dataSource,y=x.dataSources;if(y&&y.hasOwnProperty(D)){w.dataSource=y[D];}else{jQuery.sap.log.warning("datasource referenced but not found for tile: "+R.tileIntent);}}}return w;};this.isGroupRemovable=function(e){return!this._isGroupPreset(e);};this.isGroupLocked=function(e){return this._isGroupLocked(e);};this.getGroupTiles=function(e){var w=e.payload.tiles||[];if(e.payload.links&&jQuery.isArray(e.payload.links)&&e.payload.links.length>0){w=w.concat(e.payload.links);}return w;};this.getLinkTiles=function(e){if(e.payload.links&&jQuery.isArray(e.payload.links)&&e.payload.links.length>0){return e.payload.links;}else{return[];}};this.getTileType=function(e){var R=this._mResolvedTiles[e.id];if(R&&R.isLink){return this.TileType.Link;}return this.TileType.Tile;};this.getTileId=function(e){return e.id;};this.getTileSize=function(e){var R=this._mResolvedTiles[e.id];if(R&&R.tileResolutionResult&&R.tileResolutionResult.size){return R.tileResolutionResult.size;}return"1x1";};this.getTileTarget=function(e){var R,w=this._mResolvedTiles[e.id],x;if(e.target&&e.target.url){return e.target.url;}if(w&&w.tileResolutionResult){R=w.tileResolutionResult;if(R.isCustomTile!==true){return w.tileIntent;}if(R&&typeof R.targetOutbound==="object"){x=this._toHashFromOutbound(R.targetOutbound);if(x){return x;}}}jQuery.sap.log.warning("Could not find a target for Tile with id '"+e.id+"'","sap.ushell.adapters.cdm.LaunchPageAdapter");return"";};this.isLinkPersonalizationSupported=function(e){return true;};this.isTileIntentSupported=function(e){return(this._mFailedResolvedTiles[e.id]===undefined)?true:false;};this.refreshTile=function(e){};this._notifyTileAboutVisibility=function(e,N,O){if(typeof e.tileSetVisible==="function"&&O!==N){e.tileSetVisible(N);}};this.setTileVisible=function(e,N){var R=this._mResolvedTiles[e.id];if(R){if(R.tileComponent){this._notifyTileAboutVisibility(R.tileComponent,N,R.visibility);}R.visibility=N;}};this.getTileView=function(e){var w=this;return new jQuery.Deferred(function(D){return w._getTileView(e,false).then(function(x){D.resolve(x);},function(R){var E="Tile with ID '"+e.id+"' could not be initialized"+(R?":\n"+R:".");jQuery.sap.log.error(E,null,e.tileType);D.reject(E);});}).promise();};this._getTileUiComponentContainer=function(e,R,I){var w=this,x,y,N,z,C,B;var D=sap.ushell.Container.getService("Ui5ComponentLoader");if(I===true){y=w._createTileComponentData(e,true,R);}else{y=w._createTileComponentData(e,false,R);}x=R.tileResolutionResult;if(R.isLink){N=x.navigationMode;var E=new jQuery.Deferred();E.resolve(w._createLinkInstance(e,I,N,G,r));return E.promise();}var F=this._createTileComponentProperties(y,x.tileComponentLoadInfo);if(!F.name){return new jQuery.Deferred().reject("Cannot find name of tile component for tile with id: '"+e.id+"'").promise();}if(F.manifest){y.properties=y.properties||{};y.properties.manifest=F.manifest;}B=this.isCustomTile(F.name);var H=function(M){var R;z=M.componentHandle.getInstance();C=new sap.ui.core.ComponentContainer({component:z,height:'100%'});if(I===true){w._mResolvedCatalogTiles[e.id].tileComponent=z;}else{R=w._mResolvedTiles[e.id];R.tileComponent=z;if(typeof R.visibility==="boolean"){w._notifyTileAboutVisibility(z,R.visibility);}}return C;};var J=function(){return D.createComponent({loadCoreExt:B,loadDefaultDependencies:false,componentData:y,url:F.url,applicationConfiguration:{},reservedParameters:{},applicationDependencies:F,ui5ComponentName:F.name},{},[]).then(H);};var K=function(){var M={componentData:y,url:F.url,name:F.name,async:false};z=sap.ui.component(M);var O={componentHandle:{getInstance:function(){return z}}};return H(O);};return B?J():jQuery.when(K());};this._createTileComponentProperties=function(e,w){var x={};if(typeof w==="string"){if(e.properties.indicatorDataSource&&e.properties.indicatorDataSource.path){x.name=d;}else{x.name=s;}return x;}if(typeof w==="object"&&w!==null){x=w.componentProperties||{};x.name=w.componentName;}return x;};this._getTileView=function(e){var R,E,D=new jQuery.Deferred();if(typeof e!=="object"||!e.id){E="Invalid input parameter passed to _getTileView: "+e;jQuery.sap.log.error(E);return D.reject(E).promise();}R=this._mResolvedTiles[e.id];if(R){return this._getTileUiComponentContainer(e,R,false);}E="No resolved tile found for tile ID: "+e.id;jQuery.sap.log.error(E);return D.reject(E).promise();};this._getCatalogTileView=function(C){if(typeof C!=="object"){return new jQuery.Deferred().reject(C);}return this._getTileUiComponentContainer(C,C,true);};this._createTileComponentData=function(e,I,R){var w=I?this.getCatalogTileTitle(e):this.getTileTitle(e),S=I?this.getCatalogTilePreviewSubtitle(e):this.getTileSubtitle(e),x=I?this.getCatalogTilePreviewIcon(e):this.getTileIcon(e),y=I?this.getCatalogTilePreviewInfo(e):this.getTileInfo(e),z=I?this.getCatalogTileTargetURL(e):this.getTileTarget(e),B=this.getTileIndicatorDataSource(e),C={properties:{},startupParameters:{}};if(R.tileResolutionResult.isCustomTile===true&&R.tileResolutionResult.startupParameters){C.startupParameters=R.tileResolutionResult.startupParameters;}if(w){C.properties.title=w;}if(y){C.properties.info=y;}if(S){C.properties.subtitle=S;}if(x){C.properties.icon=x;}if(z){C.properties.targetURL=z;}if(B.indicatorDataSource){C.properties.indicatorDataSource=B.indicatorDataSource;if(B.dataSource){C.properties.dataSource=B.dataSource;}}if(R.tileResolutionResult){C.properties.navigationMode=R.tileResolutionResult.navigationMode;}return C;};this._createLinkInstance=function(e,I,N,w,r){var x,y,z,B=this.getTileSubtitle(e);var G=w;if(I===true){x=this.getCatalogTileTitle(e);}else{x=this.getTileTitle(e);}y=new G({mode:g.LineMode,subheader:B,header:x,press:function(E){this._genericTilePressHandler(e,E);}.bind(this)});if(N){z=r.i18n.getText(N+"NavigationMode");y.setAriaLabel(z+" "+x+" "+B);}this._mResolvedTiles[e.id].linkTileControl=y;return y;};this._genericTilePressHandler=function(e,E){var w;if(E.getSource().getScope&&E.getSource().getScope()==="Display"){w=this.getTileTarget(e);if(w){if(w[0]==='#'){hasher.setHash(w);}else{window.open(w,'_blank');}}}};this._addTileToSite=function(P,e,N,C){var w=this,D=new jQuery.Deferred(),I=sap.ushell.Container.getService("URLParsing").parseShellHash(N.properties.targetURL),x={"id":w.getTileId(N),"target":{"semanticObject":I.semanticObject,"action":I.action,"parameters":v(I.params)}};P.groups[e.identification.id].payload.tiles.push(x);C.save().done(function(){D.resolve(x);}).fail(function(M){D.reject(M);});return D.promise();};this.addTile=function(C,e){var D=new jQuery.Deferred(),w,x=sap.ushell.Container.getService("CommonDataModel"),y;if(!e){e=_;}if(C.contentProviderId){if(C.externalUrl){return this.addBookmark(this._getBookmarkDataForExtensionCatalogTile(C),e);}return D.reject("Extension Tile without URL").promise();}y=h();y.appId=C.tileResolutionResult.appId;this._mResolvedTiles[y.id]={tileIntent:C.tileIntent,tileResolutionResult:C.tileResolutionResult,isLink:false};x.getSite().done(function(S){S.groups[e.identification.id].payload.tiles.push(y);x.save().done(function(){D.resolve(y);}).fail(function(R){D.reject(R);});}).fail(function(E){w="Failed to add tile with id '"+y.id+"' to group with id '"+e.identification.id+"'. ";D.reject(w+E);});return D.promise();};this._getBookmarkDataForExtensionCatalogTile=function(e){var B={title:e.tileResolutionResult.title,subtitle:e.tileResolutionResult.subTitle,icon:e.tileResolutionResult.icon,info:e.tileResolutionResult.info,url:e.externalUrl};if(e.tileResolutionResult.indicatorDataSource&&e.tileResolutionResult.indicatorDataSource.path){B.serviceUrl=e.tileResolutionResult.indicatorDataSource.path;B.serviceRefreshInterval=e.tileResolutionResult.indicatorDataSource.refresh;}return B;};this.removeTile=function(w,x,I){var C,y,D=new jQuery.Deferred(),z=this;if(!w||typeof w!=="object"||!w.identification||!w.identification.id||!x||typeof x!=="object"||!x.id){return D.reject({},"Failed to remove tile. No valid input parameters passed to removeTile method.").promise();}y="Failed to remove tile with id '"+x.id+"' from group with id '"+w.identification.id+"'. ";C=sap.ushell.Container.getService("CommonDataModel");C.getSite().done(function(S){var P,B;I=+I;try{P=S.groups[w.identification.id].payload;}catch(e){D.reject(S.groups[w.identification.id],y);}B=z.getTileType(x)===z.TileType.Link?"links":"tiles";if(z.getTileType(x)===z.TileType.Link){I-=P.tiles.length;}if(I>=0){P[B].splice(I,1);}else{P[B]=P[B].filter(function(E){return E.id!==x.id;});}C.save().done(function(){D.resolve();}).fail(function(E){jQuery.sap.log.error(E);D.reject(S.groups[w.identification.id],E);});}).fail(function(e){D.reject({},y+e);});return D.promise();};this.moveTile=function(e,S,w,x,y,z){var D=new jQuery.Deferred(),C=sap.ushell.Container.getService("CommonDataModel"),B=this,E;if(!e||jQuery.isEmptyObject(e)||S===undefined||S<0||w===undefined||w<0||!x||!x.identification||!x.identification.id||!y||!y.identification||!y.identification.id){return D.reject("Invalid input parameters").promise();}E="Failed to move tile with id '"+e.id+"'. ";C.getSite().done(function(F){var H,I,O=B.getTileType(e)===B.TileType.Link?"links":"tiles";if(!z){z=B._mResolvedTiles[e.id].isLink?"link":"tile";}H=z==="link"?"links":"tiles";if(O!=H&&B._mResolvedTiles[e.id]){B._mResolvedTiles[e.id].isLink=z==="link";}if(H==="links"){w-=F.groups[y.identification.id].payload.tiles.length;}if(O==="links"){S-=F.groups[x.identification.id].payload.tiles.length;}if(x.identification.id===y.identification.id){if(S!==w||O!=H){I=F.groups[y.identification.id].payload;if(O==="tiles"){w++;}I[O].splice(S,1);I[H].splice(w,0,e);}else{return D.resolve(e).promise();}}else{F.groups[x.identification.id].payload[O].splice(S,1);F.groups[y.identification.id].payload[H].splice(w,0,e);}C.save().done(function(){D.resolve(e);}).fail(function(J){jQuery.sap.log.error(E+J);D.reject(E+J);});}).fail(function(F){jQuery.sap.log.error(E+F);D.reject(E+F);});return D.promise();};this._compareCatalogs=function(e,B){if(e.identification.id>B.identification.id){return 1;}return-1;};this.getCatalogs=function(){var e=this,D=new jQuery.Deferred(),C=[],w=sap.ushell.Container.getService("CommonDataModel");function x(y,z,C,B,P,E){var F=y.catalogs[z];if(P&&E){F.contentProviderId=P;E.catalogsMap[z]=F;}C.push(F);B.notify(F);}window.setTimeout(function(){w.getSite().done(function(S){Object.keys(S.catalogs).forEach(function(y){x(S,y,C,D);});w.getExtensionSites().progress(function(y){var P=y.providerId;var E=y.site;var z=Promise.resolve(E);var B={sitePromise:z,site:E,catalogsMap:{}};Object.keys(E.catalogs).forEach(function(F){e._mContentProviders[P]=B;x(E,F,C,D,P,B);});}).done(function(y){y.filter(function(z){return!z.success;}).forEach(function(F,I){C.push({identification:{id:F.providerId},contentProviderId:F.providerId,error:"The following content providers could not provide catalogs: "+F.providerId+(F.error?" -> "+F.error:"")});});D.resolve(C.sort(e._compareCatalogs));});});},0);return D.promise();};this._isStartableInbound=function(I){var N=["Shell-plugin","Shell-bootConfig"],R;if(!I.semanticObject||!I.action){return false;}if(N.indexOf(I.semanticObject+"-"+I.action)>-1){return false;}if(!jQuery.sap.getObject("signature.parameters",undefined,I)){return true;}R=Object.keys(I.signature.parameters).every(function(p){return!I.signature.parameters[p].filter||(!!I.signature.parameters[p].launcherValue||p==="sap-external-url");});return R;};this._isHiddenInbound=function(I){return!!I.hideLauncher;};this._toHashFromInbound=function(I){var S,P,C;S={target:{semanticObject:I.semanticObject,action:I.action},params:{}};P=jQuery.sap.getObject("signature.parameters",undefined,I)||{};Object.keys(P).forEach(function(K){if(P[K].filter&&Object.prototype.hasOwnProperty.call(P[K].filter,"value")&&(P[K].filter.format===undefined||P[K].filter.format==="plain")){S.params[K]=[P[K].filter.value];}if(P[K].launcherValue&&Object.prototype.hasOwnProperty.call(P[K].launcherValue,"value")&&(P[K].launcherValue.format===undefined||P[K].launcherValue.format==="plain")){S.params[K]=[P[K].launcherValue.value];}});C=sap.ushell.Container.getService("URLParsing").constructShellHash(S);if(!C){return undefined;}return"#"+C;};this._getExternalUrlFromInbound=function(I){return jQuery.sap.getObject("signature.parameters.sap-external-url.launcherValue.value",undefined,I)||null;};this._toHashFromOutbound=function(O){var S,P,C;S={target:{semanticObject:O.semanticObject,action:O.action},params:{}};P=O.parameters||{};Object.keys(P).forEach(function(K){if(P.hasOwnProperty(K)&&typeof P[K].value==="object"){S.params[K]=[P[K].value.value];}});C=sap.ushell.Container.getService("URLParsing").constructShellHash(S);if(!C){return undefined;}return"#"+C;};this._isCustomTile=function(e){if(sap.ushell.utils.getMember(e,"sap|flp.type")==="tile"){return true;}return false;};this.getCatalogTiles=function(C){var e=this,D=new jQuery.Deferred();if(typeof C!=="object"||C===null){return D.reject("Invalid input parameter '"+C+"' passed to getCatalogTiles.").promise();}if(C.contentProviderId&&this._mContentProviders[C.contentProviderId]){this._mContentProviders[C.contentProviderId].sitePromise.then(function(S){c.call(e,C,S).done(D.resolve).fail(D.reject);},function(E){D.reject("Failed to get site: "+E);});}else{sap.ushell.Container.getService("CommonDataModel").getSite().done(function(S){c.call(e,C,S).done(D.resolve).fail(D.reject);}).fail(function(E){D.reject("Failed to get site: "+E);});}return D.promise();};this.isCustomTile=function(C){return!(C===s||C===d);};function b(I){return Object.keys(I).map(function(K){var e=I[K];return{intent:e.semanticObject+"-"+e.action,inbound:e};}).sort(function(e,w){if(e.intent===w.intent){return 0;}return e.intent<w.intent?-1:1;}).reduce(function(e,w){var x=e.length;if(x===0){e.push(w);return e;}if(e[x-1].intent!==w.intent){e.push(w);return e;}return e;},[]).map(function(e){return e.inbound;});}function c(C,S){var e=this,D=new jQuery.Deferred();setTimeout(function(){var w=((C.payload&&C.payload.appDescriptors)||[]).reduce(function(R,x){var y=S.applications[x.id],I,z,F,B,E,H,J,K,M,N,O;if(!y){return R;}I=e._getMember(y,"sap|app.crossNavigation.inbounds");if(!I||Object.keys(I).length===0){return R;}F=Object.keys(I)[0];B=I[F];if(e._isStartableInbound(B)&&!e._isHiddenInbound(B)){E=u.mapOne(F,B,y);if(!E||!E.tileResolutionResult){return R;}M=E.resolutionResult.applicationType;O=sap.ushell.Container.getService("ClientSideTargetResolution").isInPlaceConfiguredFor(M);N=E.resolutionResult.additionalInformation,E.tileResolutionResult.navigationMode=n.computeNavigationModeForHomepageTiles(M,N,O);H=E.tileResolutionResult;z=e._toHashFromInbound(B);if(C.contentProviderId){K=e._getMember(y,"sap|app.crossNavigation.inbounds.Shell-launchURL.signature.parameters.sap-external-url.launcherValue.value");}J={id:K||z,tileIntent:K||z,tileResolutionResult:H,isCatalogTile:true};if(C.contentProviderId&&K){J.contentProviderId=C.contentProviderId;J.externalUrl=K;}R.push(J);}return R;},[]);D.resolve(w);},0);return D.promise();}this.getCatalogError=function(C){if(C.error){return C.error;}};this.getCatalogId=function(C){return C.identification.id;};this.getCatalogTitle=function(C){return C.identification.title;};this._isGroupTile=function(e){return!!(e&&e.id&&e.target);};this._isCatalogTile=function(e){return!!(e&&e.isCatalogTile);};this._isFailedGroupTile=function(e){return!!(e&&this._mFailedResolvedTiles&&this._mFailedResolvedTiles[e.id]);};this._isFailedCatalogTile=function(e){return!!(e&&this._mFailedResolvedCatalogTiles&&this._mFailedResolvedCatalogTiles[e.id]);};this.getCatalogTileId=function(e){if(this._isGroupTile(e)){if(this._isFailedGroupTile(e)){return undefined;}if(e.isBookmark&&jQuery.sap.getObject("target.url",undefined,e)){return e.target.url;}return(this._mResolvedTiles[e.id]||{}).tileIntent;}if(this._isCatalogTile(e)){return e.id;}};this.getCatalogTileTitle=function(e){if(this._isGroupTile(e)){if(this._isFailedGroupTile(e)){return"";}return this._mResolvedTiles[e.id].tileResolutionResult.title;}if(this._isCatalogTile(e)){if(this._isFailedCatalogTile(e)){return undefined;}return e.tileResolutionResult.title;}};this.getCatalogTileSize=function(C){return this.getTileSize(C);};this.getCatalogTileView=function(C){return this._getCatalogTileView(C);};this.getCatalogTileTargetURL=function(e){if(!e){throw new Error("The given tile is falsy");}if(this._isCatalogTile(e)){return e.tileIntent||"";}return this.getTileTarget(e);};this.getCatalogTilePreviewTitle=function(e){if(this._isGroupTile(e)){return this.getTileTitle(e);}return(e.tileResolutionResult&&e.tileResolutionResult.title)||"";};this.getCatalogTilePreviewSubtitle=function(e){if(this._isGroupTile(e)){return this.getTileSubtitle(e);}return(e.tileResolutionResult&&e.tileResolutionResult.subTitle)||"";};this.getCatalogTilePreviewIcon=function(e){if(this._isGroupTile(e)){return this.getTileIcon(e);}return(e.tileResolutionResult&&e.tileResolutionResult.icon)||"";};this.getCatalogTilePreviewInfo=function(e){if(this._isGroupTile(e)){return this.getTileInfo(e);}return(e.tileResolutionResult&&e.tileResolutionResult.info)||"";};this.getCatalogTileKeywords=function(e){var K=[],R=e;if(!R){jQuery.sap.log.error("Could not find the Tile","sap.ushell.adapters.cdm.LaunchPageAdapter");return K;}if(this._mResolvedTiles&&this._mResolvedTiles[e.id]){R=this._mResolvedTiles[e.id];}if(R&&R.tileResolutionResult&&R.tileResolutionResult.title){K.push(R.tileResolutionResult.title);}if(R&&R.tileResolutionResult&&R.tileResolutionResult.subTitle){K.push(R.tileResolutionResult.subTitle);}return K;};this._visitBookmarks=function(e,V){var C=sap.ushell.Container;var w=C.getService("URLParsing");var x=C.getService("CommonDataModel");var R;var I=w.parseShellHash(e);if(I){R=q(I);}else{R=m(e);}return x.getSite().then(function(S){var y=S.groups;var z=Object.keys(y).filter(function(K){return!y[K].payload.locked;}).map(function(K){return y[K].payload.tiles.filter(function(B){return B.isBookmark&&j(R,B.target);});}).reduce(function(B,D){Array.prototype.push.apply(B,D);return B;},[]);if(!V){return z.length;}return jQuery.when(z.map(V)).then(function(){return z.length;});});};this.addBookmark=function(P,e){var w=this;return new jQuery.Deferred(function(D){var C=sap.ushell.Container;var x=C.getService("URLParsing");var y=C.getService("CommonDataModel");jQuery.when(e||w.getDefaultGroup(),y.getSite()).done(function(e,S){var z,B,I=x.parseShellHash(P.url),N,R,E=false;if(!I){B=m(P.url);E=true;}else{B=q(I);}z=f(P,B);if(E){R=new jQuery.Deferred();R.resolve(w._getTileForUrl(z));}else{R=w._getTileFromHash(P.url);}R.done(function(N){N.isLink=false;w._mResolvedTiles[z.id]=N;S.groups[e.identification.id].payload.tiles.push(z);y.save().done(function(){D.resolve(z);}).fail(function(F){D.reject(F);});}).fail(function(F){D.reject("Bookmark creation failed because: "+F);});}).fail(function(R){D.reject(R);});}).promise();};this.countBookmarks=function(e){return this._visitBookmarks(e);};this.updateBookmarks=function(e,P){var C=sap.ushell.Container;var w=C.getService("URLParsing");var x=C.getService("CommonDataModel");var R=this._mResolvedTiles;function y(z){return new jQuery.Deferred(function(D){var I,N;var B;var E=false;var F={};if(P.url||P.url===""){I=w.parseShellHash(P.url);if(!I){N=m(P.url);}else{N=q(I);}}if(z.icon!==P.icon){F.icon=P.icon;E=true;}if(z.title!==P.title){F.title=P.title;E=true;}if(z.subTitle!==P.subtitle){F.subtitle=P.subtitle;E=true;}if(P.url&&e!==P.url){F.targetURL=P.url;E=true;}if(z.info!==P.info){F.info=P.info;E=true;}i(z,P,N);if(E&&R[z.id]){B=R[z.id].tileComponent;B.tileSetVisualProperties(F);}D.resolve(z);}).promise();}return this._visitBookmarks(e,y).then(function(z){return x.save().then(function(){return z;});});};this.deleteBookmarks=function(e){var C=sap.ushell.Container;var w=C.getService("URLParsing");var x=C.getService("CommonDataModel");var I=w.parseShellHash(e);var R;if(I){R=q(I);}else{R=m(e);}return x.getSite().then(function(S){var y=S.groups;var D=Object.keys(y).map(function(K){var P=y[K].payload;var z=0;P.tiles=P.tiles.filter(function(B){if(B.isBookmark&&j(R,B.target)){++z;return false;}return true;});return z;}).reduce(function(z,B){z+=B;return z;},0);return x.save().then(function(){return D;});});};this.onCatalogTileAdded=function(e){};this._onTileSettingsSave=function(e,S){var D=new jQuery.Deferred(),C,w,N,x,y,O,z,B;if(e&&e.id&&S){N=S.oTitleInput.getValue();y=S.oSubTitleInput.getValue();x=S.oInfoInput.getValue();O=this.getTileTitle(e);z=this.getTileInfo(e);B=this.getTileSubtitle(e);if(O===N&&B===y&&z===x){return;}C=sap.ushell.Container.getService("CommonDataModel");var E=this;C.getSite().done(function(F){if(!F.modifiedTiles){F.modifiedTiles={};}if(!F.modifiedTiles[e.id]){F.modifiedTiles[e.id]={id:e.id};}w={};if(O!==N){w.title=N;F.modifiedTiles[e.id].title=N;e.title=N;}if(B!==y){w.subtitle=y;F.modifiedTiles[e.id].subTitle=y;e.subTitle=y;}if(z!==x){w.info=x;F.modifiedTiles[e.id].info=x;e.info=x;}if(E._mResolvedTiles[e.id].tileComponent){E._mResolvedTiles[e.id].tileComponent.tileSetVisualProperties(w);}else{if(E._mResolvedTiles[e.id].linkTileControl){if(w.title){E._mResolvedTiles[e.id].linkTileControl.setHeader(w.title);}if(w.subtitle){E._mResolvedTiles[e.id].linkTileControl.setSubheader(w.subtitle);}if((w.title)||(w.subtitle)){E._mResolvedTiles[e.id].linkTileControl.rerender();}}}C.save().fail(function(H){jQuery.sap.log.error(H);D.reject("Could not save personalization changes: "+H);}).done(function(){D.resolve();});}).fail(function(F){jQuery.sap.log.error(F);D.reject("Cannot get site: "+F);});}return D.promise();};this.getTileActions=function(e){var w=[],x,M;if(this._isGroupTile(e)&&!this._isFailedGroupTile(e)){M=new sap.ui.model.json.JSONModel({config:{display_title_text:this.getTileTitle(e),display_subtitle_text:this.getTileSubtitle(e),display_info_text:this.getTileInfo(e)}});x=sap.ushell.components.tiles.utilsRT.getTileSettingsAction(M,this._onTileSettingsSave.bind(this,e),this.getTileType(e));w.push(x);}return w;};function f(P,e){var w=h(P,e);w.isBookmark=true;return w;}function h(P,e){var w={id:sap.ushell.utils.generateUniqueId([])};i(w,P,e);return w;}function i(e,P,w){P=jQuery.extend(true,{},P);if(w){e.target=w;}if(P.title||P.title===""){e.title=P.title;}if(P.icon||P.icon===""){e.icon=P.icon;}if(P.subtitle||P.subtitle===""){e.subTitle=P.subtitle;}if(P.info||P.info===""){e.info=P.info;}if(P.dataSource){e.dataSource={};jQuery.extend(true,e.dataSource,P.dataSource);delete P.serviceUrl;}else if(P.dataSource===null){delete e.dataSource;delete e.indicatorDataSource;delete P.serviceUrl;}if((P.dataSource||e.dataSource)&&P.serviceUrlPath){e.indicatorDataSource={path:P.serviceUrlPath};}if(P.serviceUrl||P.serviceUrl===""){if(e.dataSource){jQuery.sap.log.warning("`serviceUrl` is marked for deprecation in the future."+"It is not the preferred means for defining a dynamic "+"tile's data source. Please use `oParameter.dataSource`");delete e.dataSource;}e.indicatorDataSource={path:P.serviceUrl};}else if(P.serviceUrl===null&&!e.dataSource){delete e.indicatorDataSource;}if(P.serviceRefreshInterval||P.serviceRefreshInterval===0){e.indicatorDataSource.refresh=P.serviceRefreshInterval;}}function j(e,O){if(e&&O){if(e.url){return e.url===O.url;}return e.semanticObject===O.semanticObject&&e.action===O.action&&k(e.parameters,O.parameters);}return e===O;}function k(P,O){var F,e;P=P||[];O=O||[];if(P.length===O.length){F=t(P);e=t(O);return F===e;}return false;}function t(e){return e.map(function(P){return P.name+P.value;}).sort().join();}function m(e){return{url:e};}function q(I){var e={semanticObject:I.semanticObject,action:I.action,parameters:v(I.params)};if(I.appSpecificRoute){e.appSpecificRoute=I.appSpecificRoute;}return e;}function v(I){return Object.keys(I).map(function(K){var V=I[K]&&I[K][0];return{name:K,value:V||""};});}};a.prototype._getMember=function(o,A){return sap.ushell.utils.getMember(o,A);};return a;},true);