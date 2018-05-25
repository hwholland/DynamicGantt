// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/core/UIComponent"],function(U){"use strict";return U.extend("sap.ushell.components.tiles.cdm.applauncherdynamic.Component",{metadata:{},createContent:function(){var c=this.getComponentData();var p=c.properties||{};var P=p.tilePersonalization||{};var i=p.indicatorDataSource;if(i&&i.path){P.serviceUrl=i.path;P.serviceRefreshInterval=i.refresh;}var s=c.startupParameters;if(s&&s["sap-system"]&&s["sap-system"][0]){P["sap-system"]=s["sap-system"][0];}if(P.serviceUrl&&P.serviceUrl.charAt(0)!=="/"&&p.dataSource&&p.dataSource.uri){var S=p.dataSource.uri;if(P["sap-system"]){if(S.charAt(S.length-1)==="/"){S=S.slice(0,S.length-1);}S+=";o="+P["sap-system"];}if(S.charAt(S.length-1)!=="/"){S+="/";}S+=P.serviceUrl;P.serviceUrl=S;}var t=sap.ui.view({type:sap.ui.core.mvc.ViewType.JS,viewName:"sap.ushell.components.tiles.cdm.applauncherdynamic.DynamicTile",viewData:{properties:p,configuration:P}});this._oController=t.getController();return t;},tileSetVisualProperties:function(n){if(this._oController){this._oController.updateVisualPropertiesHandler(n);}},tileRefresh:function(){if(this._oController){this._oController.refreshHandler();}},tileSetVisible:function(i){if(this._oController){this._oController.visibleHandler(i);}},exit:function(){this._oController=null;}});});
