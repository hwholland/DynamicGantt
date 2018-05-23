/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(['jquery.sap.global','./library','sap/ui/vk/ContainerBase','sap/ui/core/IconPool','sap/ui/vbm/lib/sapvbi','sap/ui/Device'],function(q,l,C,I,s,D){"use strict";var M=C.extend("sap.ui.vk.MapContainer",{metadata:{library:"sap.ui.vk",properties:{"showNavbar":{type:"boolean",group:"Misc",defaultValue:true},"showHome":{type:"boolean",group:"Misc",defaultValue:true},"showRectangularZoom":{type:"boolean",group:"Misc",defaultValue:true},"showZoom":{type:"boolean",group:"Misc",defaultValue:true}},aggregations:{"listPanelStack":{type:"sap.ui.vk.ListPanelStack",multiple:false},"scrollCont":{type:"sap.m.ScrollContainer",multiple:false,visibility:"hidden"}},associations:{},events:{}}});M.prototype.init=function(){C.prototype.init.apply(this,arguments);var m=new sap.ui.model.json.JSONModel();m.setData({rectZoom:false});this.setModel(m,"rectZoom");this._oNavbar=new sap.m.Toolbar({width:"auto"});this._oScrollCont=new sap.m.ScrollContainer({height:"100%",horizontal:false,vertical:true,focusable:false});this.setAggregation("scrollCont",this._oScrollCont,true);this._oHomeButton=new sap.m.Button({icon:"sap-icon://home",type:sap.m.ButtonType.Transparent,tooltip:sap.ui.vk.getResourceBundle().getText("MAPCONTAINER_HOME"),press:this._onNavbarHome.bind(this)});this._oRectZoomButton=new sap.m.ToggleButton({icon:"sap-icon://draw-rectangle",type:sap.m.ButtonType.Transparent,pressed:'{rectZoom>/rectZoom}',tooltip:sap.ui.vk.getResourceBundle().getText("MAPCONTAINER_RECT_ZOOM")}).setModel(m,"rectZoom");this._oZoomInButton=new sap.m.Button({icon:"sap-icon://add",type:sap.m.ButtonType.Transparent,tooltip:sap.ui.vk.getResourceBundle().getText("MAPCONTAINER_ZOOMIN"),press:this._onNavbarZoomIn.bind(this)});this._oZoomOutButton=new sap.m.Button({icon:"sap-icon://less",type:sap.m.ButtonType.Transparent,tooltip:sap.ui.vk.getResourceBundle().getText("MAPCONTAINER_ZOOMOUT"),press:this._onNavbarZoomOut.bind(this)});if(D.system.phone){this._oMenuOpenButton=new sap.m.Button({layoutData:new sap.m.OverflowToolbarLayoutData({priority:sap.m.OverflowToolbarPriority.NeverOverflow}),icon:"sap-icon://menu2",type:sap.m.ButtonType.Transparent,tooltip:sap.ui.vk.getResourceBundle().getText("CONTAINERBASE_MENU"),press:function(){this._bSegmentedButtonSaveSelectState=true;this._showListPanelStack();}.bind(this)});this._oMenuCloseButton=new sap.m.Button({type:sap.m.ButtonType.Transparent,icon:"sap-icon://nav-back",press:function(){this._bSegmentedButtonSaveSelectState=true;this._hideListPanelStack();}.bind(this)});}};M.prototype.exit=function(){if(this._oNavbar){this._oNavbar.destroy();this._oNavbar=undefined;}if(this._oScrollCont){this._oScrollCont.destroy();this._oScrollCont=undefined;}C.prototype.exit.apply(this,arguments);};M.prototype.getListPanelStack=function(){return this._oScrollCont.getContent()[0];};M.prototype.setListPanelStack=function(p){if(D.system.phone){p.setCollapsible(false);p.setWidth("100%");}this._oScrollCont.removeAllContent();return this._oScrollCont.addContent(p);};M.prototype.onBeforeRendering=function(){C.prototype.onBeforeRendering.apply(this,arguments);this._oNavbar.removeAllContent();var c=this.getSelectedContent();if(c!==null){var a=c.getContent();this._isInstanceGeoAnalytic=a instanceof sap.ui.vbm.GeoMap||a instanceof sap.ui.vbm.AnalyticMap;if(this._isInstanceGeoAnalytic){if(this.getShowHome()){this._oNavbar.addContent(this._oHomeButton);}if(!D.system.phone&&this.getShowRectangularZoom()){this._oNavbar.addContent(this._oRectZoomButton);}if(this.getShowZoom()){this._oNavbar.addContent(this._oZoomInButton);this._oNavbar.addContent(this._oZoomOutButton);}this._shouldRenderListPanel=true;}else{this._shouldRenderListPanel=false;}}};M.prototype.onAfterRendering=function(){if(D.system.phone){var L=document.getElementById(this.getId()+"-LPW");this.getDomRef().appendChild(L);}C.prototype.onAfterRendering.apply(this,arguments);};M.prototype.setSelectedContent=function(c){var o;if(this._oSelectedContent){if((o=this._oSelectedContent.getContent())instanceof sap.ui.vbm.GeoMap){o.unbindProperty("rectZoom","rectZoom>/rectZoom");}}C.prototype.setSelectedContent.apply(this,arguments);var n=this._oSelectedContent.getContent();if(n instanceof sap.ui.vbm.GeoMap){n.bindProperty("rectZoom","rectZoom>/rectZoom");}};M.prototype._addToolbarContent=function(){if(D.system.phone){this._oToolbar.addContent(this._oMenuOpenButton);}C.prototype._addToolbarContent.apply(this,arguments);};M.prototype._onNavbarZoomIn=function(e){var c=this.getSelectedContent().getContent();if(c.getZoomlevel&&c.setZoomlevel&&c.setEnableAnimation){c.setEnableAnimation(true);c.setZoomlevel(c.getZoomlevel()+1);}};M.prototype._onNavbarZoomOut=function(e){var c=this.getSelectedContent().getContent();if(c.getZoomlevel&&c.setZoomlevel&&c.setEnableAnimation){c.setEnableAnimation(true);c.setZoomlevel(c.getZoomlevel()-1);}};M.prototype._onNavbarHome=function(e){var c=this.getSelectedContent().getContent();if(c.goToStartPosition){c.goToStartPosition();}};M.prototype._showListPanelStack=function(){q("#"+this.getId()+"-LPW").addClass("sapUiVkMapContainerLPWIn");q("#"+this.getId()+"-wrapper").addClass("sapUiVkMapContainerMapOut");};M.prototype._hideListPanelStack=function(){q("#"+this.getId()+"-LPW").removeClass("sapUiVkMapContainerLPWIn");q("#"+this.getId()+"-wrapper").removeClass("sapUiVkMapContainerMapOut");};return M;});
