// Copyright (c) 2009-2014 SAP SE, All Rights Reserved
(function(){"use strict";jQuery.sap.declare("sap.ushell.adapters.local.LaunchPageAdapter");jQuery.sap.require("sap.ushell.resources");jQuery.sap.require("sap.m.Text");sap.ushell.adapters.local.LaunchPageAdapter=function(u,p,a){var c=jQuery.extend(true,[],a.config.groups),C=a.config.catalogs||[],f=0,g=10,m=10,M=10,b,d,I,h;for(I=0;I<c.length;I++){if(c[I].isDefaultGroup===true){h=c[I];break;}}if(!h&&c.length>0){h=c[0];h.isDefaultGroup=true;}this.translationBundle=sap.ushell.resources.i18n;this.TileType={Tile:"tile",Link:"link"};if(!b&&a.config.pathToLocalizedContentResources){jQuery.sap.require("sap.ui.model.resource.ResourceModel");b=new sap.ui.model.resource.ResourceModel({bundleUrl:a.config.pathToLocalizedContentResources,bundleLocale:sap.ui.getCore().getConfiguration().getLanguage()});d=b.getResourceBundle();}function _(K){if(d){return d.getText(K);}return K;}jQuery.each(C,function(i,e){if(d){e.title=_(e.title);}jQuery.each(e.tiles,function(i,t){t.getTitle=function(){return t.title;};});});jQuery.each(c,function(i,G){if(d){G.title=_(G.title);}jQuery.each(G.tiles,function(i,t){s(t,true);});});function j(){return(100*Math.random())<f;}function k(){return(100*Math.random())<g;}function l(){return m+M*Math.random();}function o(G,t){var i;for(i=0;i<G.tiles.length;i=i+1){if(t.id===G.tiles[i].id){return i;}}return-1;}function q(G,e){var i;for(i=0;i<G.length;i=i+1){if(e.id===G[i].id){return i;}}return-1;}function r(G){var D=jQuery.Deferred();window.setTimeout(function(){D.resolve(G);},l());return D.promise();}function s(t,n){if(t.tileType!=='sap.ushell.ui.tile.DynamicTile'||!t.properties||!t.properties.serviceUrl){return;}if(t.intervalTimer){clearInterval(t.intervalTimer);t.intervalTimer=undefined;}if(n){var e=t.serviceRefreshInterval;if(e){e=e*1000;}else{e=10000;}t.intervalTimer=setInterval(function(){OData.read(t.properties.serviceUrl+'?id='+t.id+'&t='+new Date().getTime(),function(R){jQuery.sap.log.debug('Dynamic tile service call succeed for tile '+t.id);},function(i){jQuery.sap.log.debug('Dynamic tile service call failed for tile '+t.id+', error message:'+i);});},e);}}this.getGroups=function(){var D=jQuery.Deferred();window.setTimeout(function(){D.resolve(c.slice(0));},l());return D.promise();};this.getDefaultGroup=function(){var D=new jQuery.Deferred();D.resolve(h);return D.promise();};this.addGroup=function(t){var D=jQuery.Deferred(),F=j(),e=this;window.setTimeout(function(){if(!F){var n={id:"group_"+c.length,title:t,tiles:[]};c.push(n);D.resolve(n);}else{e.getGroups().done(function(E){D.reject(E);}).fail(function(){D.reject();});}},l());return D.promise();};this.getGroupTitle=function(G){return G.title;};this.setGroupTitle=function(G,n){var D=jQuery.Deferred(),F=j();window.setTimeout(function(){if(!F){G.title=n;D.resolve();}else{r(G).done(function(e){D.reject(e.title);}).fail(function(){D.reject();});}},l());return D.promise();};this.getGroupId=function(G){return G.id;};this.hideGroups=function(H){if(H&&c){for(var i=0;i<c.length;i++){if(H.indexOf(c[i].id)!=-1){c[i].isVisible=false;}else{c[i].isVisible=true;}}}return jQuery.Deferred().resolve();};this.isGroupVisible=function(G){return G&&(G.isVisible===undefined?true:G.isVisible);};this.moveGroup=function(G,n){var D=jQuery.Deferred(),F=j(),t=this;window.setTimeout(function(){if(!F){c.splice(n,0,c.splice(q(c,G),1)[0]);D.resolve();}else{t.getGroups().done(function(e){D.reject(e);}).fail(function(){D.reject();});}},l());return D.promise();};this.removeGroup=function(G){var D=jQuery.Deferred(),F=j(),t=this;window.setTimeout(function(){if(!F){c.splice(q(c,G),1);jQuery.each(G.tiles,function(i,T){s(T,false);});D.resolve();}else{t.getGroups().done(function(e){D.reject(e);}).fail(function(){D.reject();});}},l());return D.promise();};this.resetGroup=function(G){var D=jQuery.Deferred(),F=j(),t=this;window.setTimeout(function(){if(!F){jQuery.each(G.tiles,function(i,T){s(T,false);});G=jQuery.extend(true,{},a.config.groups[q(a.config.groups,G)]);c.splice(q(c,G),1,G);jQuery.each(G.tiles,function(i,T){s(T,true);});D.resolve(G);}else{t.getGroups().done(function(e){D.reject(e);}).fail(function(){D.reject();});}},l());return D.promise();};this.isGroupRemovable=function(G){return G&&!G.isPreset;};this.isGroupLocked=function(G){return G.isGroupLocked;};this.getGroupTiles=function(G){return G.tiles;};this.getLinkTiles=function(G){return G.links;};this.getTileTitle=function(t){return t.title;};this.getTileType=function(t){if(t.isLink){return this.TileType.Link;}return this.TileType.Tile;};this.getTileId=function(t){return t.id;};this.getTileSize=function(t){return t.size;};this.getTileTarget=function(t){return t.target_url||"";};this.isTileIntentSupported=function(t){if(t&&t.formFactor){var e=t.formFactor;var S=sap.ui.Device.system;var i;if(S.desktop){i="Desktop";}else if(S.tablet){i="Tablet";}else if(S.phone){i="Phone";}if(e.indexOf(i)===-1){return false;}}return true;};this.getTileView=function(t){var D=jQuery.Deferred(),F=j(),e=this;if(k()){window.setTimeout(function(){if(!F){D.resolve(e._getTileView(t));}else{D.reject();}},l());}else{if(!F){D.resolve(e._getTileView(t));}else{D.reject();}}return D.promise();};this._getTileView=function(t){var E='unknown error',T,i,n=this.getTileType(t)==="link";this._translateTileProperties(t);if(t.namespace&&t.path&&t.moduleType){jQuery.sap.registerModulePath(t.namespace,t.path);if(t.moduleType==="UIComponent"){T=new sap.ui.core.ComponentContainer({component:sap.ui.getCore().createComponent({componentData:{properties:t.properties},name:t.moduleName}),height:'100%',width:'100%'});}else{T=sap.ui.view({viewName:t.moduleName,type:sap.ui.core.mvc.ViewType[t.moduleType],viewData:{properties:t.properties},height:'100%'});}return T;}else if(t.tileType){i=n?"sap.m.Link":t.tileType;if(i){var v=t.properties.targetURL||t.properties.href;try{if(v){delete t.properties.targetURL;T=this._createTileInstance(t,i);if(n){T.setHref(v);if(v[0]!=='#'){T.setTarget('_blank');}}else{if(typeof(T.setTargetURL)==='function'){T.setTargetURL(v);}t.properties.targetURL=v;}}else{T=this._createTileInstance(t);}this._handleTilePress(T);this._applyDynamicTileIfoState(T);return T;}catch(e){return new sap.m.GenericTile({header:e&&(e.name+": "+e.message)||this.translationBundle.getText("failedTileCreationMsg"),frameType:this._parseTileSizeToGenericTileFormat(t.size)});}}else{E='TileType: '+t.tileType+' not found!';}}else{E='No TileType defined!';}return new sap.m.GenericTile({header:E,frameType:this._parseTileSizeToGenericTileFormat(t.size)});};this._createTileInstance=function(t,T){var e;jQuery.sap.require(T==='sap.m.Link'?T:'sap.m.GenericTile');switch(T){case'sap.ushell.ui.tile.DynamicTile':e=new sap.m.GenericTile({header:t.properties.title,subheader:t.properties.subtitle,frameType:this._parseTileSizeToGenericTileFormat(t.size),size:"Auto",tileContent:new sap.m.TileContent({size:"Auto",footer:t.properties.info,unit:t.properties.numberUnit,content:new sap.m.NumericContent({scale:t.properties.numberFactor,value:t.properties.numberValue,truncateValueTo:5,indicator:t.properties.stateArrow,valueColor:this._parseTileValueColor(t.properties.numberState),icon:t.properties.icon,width:"100%"})}),press:function(){this._genericTilePressHandler(t);}.bind(this)});break;case'sap.ushell.ui.tile.StaticTile':e=new sap.m.GenericTile({header:t.properties.title,subheader:t.properties.subtitle,frameType:this._parseTileSizeToGenericTileFormat(t.size),size:"Auto",tileContent:new sap.m.TileContent({size:"Auto",footer:t.properties.info,content:new sap.m.ImageContent({src:t.properties.icon,width:"100%"})}),press:function(){this._genericTilePressHandler(t);}.bind(this)});break;case'sap.m.Link':e=new sap.m.Link({text:t.properties.text});break;default:jQuery.sap.require(t.tileType);var i=jQuery.sap.getObject(t.tileType);e=new i(t.properties||{});}return e;};this._genericTilePressHandler=function(t){if(t.properties.targetURL){if(t.properties.targetURL[0]==='#'){hasher.setHash(t.properties.targetURL);}else{window.open(t.properties.targetURL,'_blank');}}};this._parseTileSizeToGenericTileFormat=function(t){return t==="1x2"?"TwoByOne":"OneByOne";};this._parseTileValueColor=function(t){var e=t;switch(t){case"Positive":e="Good";break;case"Negative":e="Critical";break;}return e;};this._applyDynamicTileIfoState=function(t){var O=t.onAfterRendering;t.onAfterRendering=function(){if(O){O.apply(this,arguments);}var e=this.getModel(),D=e.getProperty('/data/display_info_state'),i=this.getDomRef(),n=i.getElementsByClassName('sapMTileCntFtrTxt')[0];switch(D){case'Negative':n.classList.add('sapUshellTileFooterInfoNegative');break;case'Neutral':n.classList.add('sapUshellTileFooterInfoNeutral');break;case'Positive':n.classList.add('sapUshellTileFooterInfoPositive');break;case'Critical':n.classList.add('sapUshellTileFooterInfoCritical');break;default:return;}};};this._handleTilePress=function(t){if(typeof t.attachPress==='function'){t.attachPress(function(){if(typeof t.getTargetURL==='function'){var T=t.getTargetURL();if(T){if(T[0]==='#'){hasher.setHash(T);}else{window.open(T,'_blank');}}}});}};this._translateTileProperties=function(t){if(d){if(!t.properties.isTranslated){t.properties.title=_(t.properties.title);t.properties.subtitle=_(t.properties.subtitle);t.properties.info=_(t.properties.info);if(t.keywords){for(var e=0;e<t.keywords.length;e++){t.keywords[e]=_(t.keywords[e]);}}t.properties.isTranslated=true;}}};this.refreshTile=function(t){};this.setTileVisible=function(t,n){s(t,n);};this.addTile=function(e,G){if(!G){G=h;}var D=jQuery.Deferred(),F=j(),t=this;window.setTimeout(function(){if(!F){var n=jQuery.extend(true,{title:"A new tile was added",size:"1x1"},e,{id:"tile_0"+e.chipId});G.tiles.push(n);s(n,true);D.resolve(n);}else{t.getGroups().done(function(E){D.reject(E);}).fail(function(){D.reject();});}},l());return D.promise();};this.removeTile=function(G,t){var D=jQuery.Deferred(),F=j(),e=this;window.setTimeout(function(){if(!F){G.tiles.splice(o(G,t),1);s(t,false);D.resolve();}else{e.getGroups().done(function(E){D.reject(E);}).fail(function(){D.reject();});}},l());return D.promise();};this.moveTile=function(t,e,i,S,T){var D=jQuery.Deferred(),F=j(),n=this;window.setTimeout(function(){if(!F){if(T===undefined){T=S;}S.tiles.splice(e,1);T.tiles.splice(i,0,t);D.resolve(t);}else{n.getGroups().done(function(E){D.reject(E);}).fail(function(){D.reject();});}},l());return D.promise();};this.getTile=function(S,A){var D=jQuery.Deferred();return D.promise();};this.getCatalogs=function(){var D=jQuery.Deferred();C.forEach(function(e){window.setTimeout(function(){D.notify(e);},300);});window.setTimeout(function(){D.resolve(C);},1500);return D.promise();};this.isCatalogsValid=function(){return true;};this.getCatalogError=function(e){return;};this.getCatalogId=function(e){return e.id;};this.getCatalogTitle=function(e){return e.title;};this.getCatalogTiles=function(e){var D=jQuery.Deferred();window.setTimeout(function(){D.resolve(e.tiles);},l());return D.promise();};this.getCatalogTileId=function(e){if(e.chipId){return e.chipId;}else{return"UnknownCatalogTileId";}};this.getCatalogTileTitle=function(e){return e.title;};this.getCatalogTileSize=function(e){return e.size;};this.getCatalogTileView=function(e){return this._getTileView(e);};this.getCatalogTileTargetURL=function(e){return(e.properties&&e.properties.targetURL)||null;};this.getCatalogTilePreviewTitle=function(e){return(e.properties&&e.properties.title)||null;};this.getCatalogTilePreviewIcon=function(e){return(e.properties&&e.properties.icon)||null;};this.getCatalogTileKeywords=function(e){return jQuery.merge([],jQuery.grep(jQuery.merge([e.title,e.properties&&e.properties.subtitle,e.properties&&e.properties.info],(e&&e.keywords)||[]),function(n,i){return n!==""&&n;}));};this.getCatalogTileTags=function(e){return(e&&e.tags)||[];};this.addBookmark=function(P,G){var G=G?G:h,D=jQuery.Deferred(),F=j(),t=this,e=P.title,i=P.subtitle,n=P.info,v=P.url;window.setTimeout(function(){if(!F){var w={title:e,size:"1x1",chipId:"tile_0"+G.tiles.length,tileType:"sap.ushell.ui.tile.StaticTile",id:"tile_0"+G.tiles.length,keywords:[],properties:{icon:"sap-icon://time-entry-request",info:n,subtitle:i,title:e,targetURL:v}};G.tiles.push(w);s(w,true);D.resolve(w);}else{t.getGroups().done(function(E){D.reject(E);}).fail(function(){D.reject();});}},l());return D.promise();};this.updateBookmarks=function(U,P){var D=new jQuery.Deferred(),G=this.getGroups();G.done(function(R){R.forEach(function(e){e.tiles.forEach(function(t){if(t.properties&&t.properties.targetURL===U){for(var i in P){if(P.hasOwnProperty(i)){t.properties[i]=P[i];}}}});});D.resolve();});G.fail(function(){D.reject();});return D.promise();};this.countBookmarks=function(U){var D=jQuery.Deferred();var i=0;var G,t,e,T;for(e=0;e<c.length;e++){G=c[e];for(T=0;T<G.tiles.length;T++){t=G.tiles[T];if(t.properties.targetURL===U){i++;}}}D.resolve(i);return D.promise();};this.onCatalogTileAdded=function(t){};this.getTileActions=function(t){return(t&&t.actions)||null;};};}());
