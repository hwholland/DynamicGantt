sap.ui.define(['sap/ushell/renderers/fiori2/search/SearchModel','sap/ushell/renderers/fiori2/search/SearchHelper','sap/ushell/renderers/fiori2/search/appsearch/TileLoader'],function(S,a,T){"use strict";var A=function(){this.init.apply(this,arguments);};A.prototype={init:function(p){this.searchModel=sap.ushell.renderers.fiori2.search.getModelSingleton();this.tileLoader=new T(p);},delayedInit:function(){if(this.delayedInitDeferred){return this.delayedInitDeferred;}this.delayedInitDeferred=this.tileLoader.getTiles().then(function(t){this.tiles=t;}.bind(this));return this.delayedInitDeferred;},isActive:function(){return this.searchModel.initBusinessObjSearch().then(function(){if(this.searchModel.config.searchBusinessObjects){return true;}else{return false;}}.bind(this));},prefetchTiles:function(){return this.tileLoader.getTiles();},search:function(q){return this.delayedInit().then(function(){var p=$.extend({},q);var c=$.extend({},q);if(q.suggestion){p.top=q.top+q.skip;p.skip=0;c.top=q.top+q.skip;c.skip=0;}else{p.top=1000000;p.skip=0;c.top=1000000;c.skip=0;}return $.when(this.searchPersonalizedTiles(p),this.searchCatalogTiles(c)).then(function(b,d){return this.mergeTiles(q,b.tiles,d.tiles);}.bind(this));}.bind(this));},mergeTiles:function(q,p,c){var r=[];var m={};var t,k;for(var i=0;i<p.length;++i){t=p[i];k=this.tileLoader.calcKey(t);m[k]=true;r.push(t);}for(var j=0;j<c.length;++j){t=c[j];k=this.tileLoader.calcKey(t);if(m[k]){continue;}r.push(t);}var b=r.length;r=r.slice(q.skip,q.top+q.skip);return{totalCount:b,tiles:r};},searchPersonalizedTiles:function(q){q.scope='personalizedTiles';return this.tileLoader.search(q);},getSystemId:function(){var d=this.searchModel.sinaNext.getBusinessObjectDataSources();var b=d[0];return b.id.slice(0,3);},getAppDataSource:function(){if(this.appDataSource){return this.appDataSource;}var s=this.getSystemId();var d=s+'ALL~ESH_APD_MODEL_V~';this.appDataSource=this.searchModel.sinaNext.getDataSource(d);if(this.appDataSource){return this.appDataSource;}this.appDataSource=this.searchModel.sinaNext._createDataSource({id:d,label:'Apps',labelPlural:'Apps',hidden:true,type:this.searchModel.sinaNext.DataSourceType.BusinessObject,attributesMetadata:[{"type":"String","id":"APP_GUID_NA","label":"App GUID","usage":{"Title":{"displayOrder":0},"Detail":{"displayOrder":0}},"isSortable":true,"isKey":true,"matchingStrategy":"Exact"},{"type":"String","id":"APP_ID","label":"App ID","usage":{"Title":{"displayOrder":1},"Detail":{"displayOrder":1}},"isSortable":true,"isKey":false,"matchingStrategy":"Exact"},{"type":"String","id":"CATALOG_ID","label":"Catalog ID","usage":{"Title":{"displayOrder":2},"Detail":{"displayOrder":2}},"isSortable":true,"isKey":false,"matchingStrategy":"Exact"},{"type":"String","id":"ICON","label":"Icon","usage":{"Detail":{"displayOrder":4}},"isSortable":true,"isKey":false,"matchingStrategy":"Exact"},{"type":"String","id":"TITLE","label":"Title","usage":{"Detail":{"displayOrder":5}},"isSortable":true,"isKey":false,"matchingStrategy":"Exact"},{"type":"String","id":"SUBTITLE","label":"Subtitle","usage":{"Detail":{"displayOrder":6}},"isSortable":true,"isKey":false,"matchingStrategy":"Exact"},{"type":"String","id":"TILE_INFORMATION","label":"Title Information","usage":{"Detail":{"displayOrder":7}},"isSortable":true,"isKey":false,"matchingStrategy":"Exact"},{"type":"String","id":"KEYWORDS","label":"Tile Keywords","usage":{"Title":{"displayOrder":3},"Detail":{"displayOrder":3}},"isSortable":true,"isKey":false,"matchingStrategy":"Exact"},{"type":"String","id":"MANDT","label":"","usage":{},"isSortable":false,"isKey":true,"matchingStrategy":"Exact"},{"type":"String","id":"TEXT_SPRAS","label":"Language Key","usage":{},"isSortable":true,"isKey":false,"matchingStrategy":"Exact"}]});return this.appDataSource;},searchCatalogTiles:function(q){var b=this.getAppDataSource();var s=this.searchModel.sinaNext.createSearchQuery({dataSource:b,searchTerm:q.searchTerm,top:q.top,skip:q.skip});return a.convertPromiseTojQueryDeferred(s.getResultSetAsync()).then(function(r){var c=[];for(var i=0;i<r.items.length;++i){var d=r.items[i];var e=d.detailAttributes[1].value;var t=this.tiles.catalogTileMap[e];if(!t){continue;}c.push(t);}return{totalCount:c.length,tiles:c};}.bind(this));}};return A;});
