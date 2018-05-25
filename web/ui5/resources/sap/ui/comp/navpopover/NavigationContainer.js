/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2018 SAP SE. All rights reserved
	
 */
sap.ui.define(['sap/m/Link','sap/ui/core/Control','sap/m/VBox','sap/m/HBox','sap/m/Button','sap/m/Title','sap/m/Image','sap/m/Text','sap/ui/layout/form/SimpleForm','sap/m/VBoxRenderer','./Factory','./LinkData','sap/ui/model/json/JSONModel','./Util','sap/ui/core/TitleLevel','sap/ui/layout/HorizontalLayout','sap/ui/layout/VerticalLayout','sap/ui/layout/form/SimpleFormLayout','sap/ui/comp/personalization/Util','./FlexHandler'],function(L,C,V,H,B,T,I,a,S,b,F,c,J,U,d,e,f,g,P,h){"use strict";var N=V.extend("sap.ui.comp.navpopover.NavigationContainer",{metadata:{library:"sap.ui.comp",properties:{mainNavigationId:{type:"string",group:"Misc",defaultValue:null},availableActionsPersonalizationText:{type:"string",defaultValue:undefined},enableAvailableActionsPersonalization:{type:"boolean",defaultValue:true}},aggregations:{availableActions:{type:"sap.ui.comp.navpopover.LinkData",multiple:true,singularName:"availableAction"},mainNavigation:{type:"sap.ui.comp.navpopover.LinkData",multiple:false},flexHandler:{type:"sap.ui.comp.navpopover.FlexHandler",visibility:"hidden",multiple:false}},associations:{extraContent:{type:"sap.ui.core.Control",multiple:false},component:{type:"sap.ui.core.Element",multiple:false}},events:{navigate:{},availableActionsPersonalizationPress:{}}},renderer:b.render});N.prototype.init=function(){V.prototype.init.call(this);var m=new J({mainNavigationLink:{title:undefined,subtitle:undefined,href:undefined,target:undefined},availableActions:[],availableActionsPressMap:{},availableActionsPersonalizationText:undefined,extraContent:undefined});m.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);m.setSizeLimit(1000);this.setModel(m,"$sapuicompNavigationContainer");this.setAggregation("flexHandler",new h());this._createContent();};N.prototype.openSelectionDialog=function(i,s,j,k,l){var t=this;return this._getFlexHandler().openSelectionDialog(this,i,s,j,k,l).then(function(){t._updateAvailableActionsPersonalizationText();});};N.prototype.getDirectLink=function(){var m=this.getModel("$sapuicompNavigationContainer");if(m.getProperty('/extraContent')){return null;}if(m.getProperty('/mainNavigationLink/href')&&!m.getProperty('/availableActions').length){return this._oHeaderArea.getItems()[0];}if(m.getProperty('/availableActions').length===1&&!m.getProperty('/mainNavigationLink/href')){return this._oActionArea.getItems()[0].getItems()[0];}return null;};N.prototype.hasContent=function(){var m=this.getModel("$sapuicompNavigationContainer");return!!m.getProperty("/mainNavigationLink/href")||!!m.getProperty("/availableActions").length||!!m.getProperty('/extraContent');};N.prototype.setExtraContent=function(o){var m=this.getModel("$sapuicompNavigationContainer");if(m.getProperty("/extraContent")){this.removeItem(1);}if(typeof o==="string"){o=sap.ui.getCore().byId(o);}this.insertItem(o,1);this.setAssociation("extraContent",o);m.setProperty("/extraContent",o);return this;};N.prototype.setMainNavigationId=function(m){this.setProperty("mainNavigationId",m,true);var M=this.getModel("$sapuicompNavigationContainer");if(typeof m==="string"){M.setProperty("/mainNavigationLink/title",m);}return this;};N.prototype.setMainNavigation=function(l){this.setAggregation("mainNavigation",l,true);if(!l){return this;}var m=this.getModel("$sapuicompNavigationContainer");if(l.getHref()){m.setProperty("/mainNavigationLink/href",this._convertToExternal(l.getHref()));m.setProperty("/mainNavigationLink/target",l.getTarget());this._oHeaderArea.removeStyleClass("navpopoversmallheader");}else{this._oHeaderArea.addStyleClass("navpopoversmallheader");}if(!m.getProperty("/mainNavigationLink/title")&&m.getProperty("/mainNavigationLink/title")!==''){m.setProperty("/mainNavigationLink/title",l.getText());}m.setProperty("/mainNavigationLink/subtitle",l.getDescription());return this;};N.prototype.setAvailableActionsPersonalizationText=function(A){this.setProperty("availableActionsPersonalizationText",A,true);var m=this.getModel("$sapuicompNavigationContainer");m.setProperty("/availableActionsPersonalizationText",A);return this;};N.prototype.setEnableAvailableActionsPersonalization=function(E){this.setProperty("enableAvailableActionsPersonalization",E,true);this._updateAvailableActionsPersonalizationText();return this;};N.prototype.addAvailableAction=function(l){this.addAggregation("availableActions",l);if(!l){return this;}l.setHref(this._convertToExternal(l.getHref()));l.setPress(this._onLinkPress.bind(this));var m=this.getModel("$sapuicompNavigationContainer");var i=m.getProperty("/availableActions").length;m.getData().availableActions.splice(i,0,l.getJson());m.getData().availableActionsPressMap[l.getText()+"---"+l.getHref()]=this._onLinkPress.bind(this);m.refresh(true);return this;};N.prototype.insertAvailableAction=function(l,i){this.insertAggregation("availableActions",l,i);if(!l){return this;}l.setHref(this._convertToExternal(l.getHref()));l.setPress(this._onLinkPress.bind(this));var m=this.getModel("$sapuicompNavigationContainer");m.getData().availableActions.splice(i,0,l.getJson());m.getData().availableActionsPressMap[l.getText()+"---"+l.getHref()]=this._onLinkPress.bind(this);m.refresh(true);return this;};N.prototype.removeAvailableAction=function(l){var i=this.indexOfAvailableAction(l);if(i>-1){var m=this.getModel("$sapuicompNavigationContainer");m.getData().availableActions.splice(i,1);m.refresh(true);}l=this.removeAggregation("availableActions",l);return l;};N.prototype.removeAllAvailableActions=function(){var A=this.removeAllAggregation("availableActions");var m=this.getModel("$sapuicompNavigationContainer");m.setProperty("/availableActions",[]);m.refresh(true);return A;};N.prototype.exit=function(o){if(this.getModel("$sapuicompNavigationContainer")){this.getModel("$sapuicompNavigationContainer").destroy();}};N.prototype.onAfterRenderingActionForm=function(){var m=this.getModel("$sapuicompNavigationContainer");var $=m.getProperty("/extraContent")?m.getProperty("/extraContent").$()[0]:undefined;if($&&$.scrollHeight>$.clientHeight){this.setFitContainer(false).setJustifyContent(sap.m.FlexJustifyContent.Start);}};N.prototype._createContent=function(){var t=this;this.addStyleClass("navigationPopover");var o=new L({href:{path:'/mainNavigationLink/href'},text:{path:'/mainNavigationLink/title'},target:{path:'/mainNavigationLink/target'},visible:{path:'/mainNavigationLink/title',formatter:function(j){return!!j;}},enabled:{path:'/mainNavigationLink/href',formatter:function(v){return!!v;}},press:this._onLinkPress.bind(this)});o.addStyleClass("navigationPopoverTitle");var s=new a({text:{path:'/mainNavigationLink/subtitle'},visible:{path:'/mainNavigationLink/subtitle',formatter:function(v){return!!v;}}});this._oHeaderArea=new V({items:[o,s],visible:{path:'/mainNavigationLink/title',formatter:function(j){return!!j;}}});this._oHeaderArea.addStyleClass("navigationPopoverTitleH1");this._oHeaderArea.addStyleClass("navigationPopoverHeader");this._oHeaderArea.setModel(this.getModel("$sapuicompNavigationContainer"));this._oActionArea=new V({visible:{parts:[{path:'/availableActions'},{path:'/availableActionsPersonalizationText'}],formatter:function(m,A){var M=m.filter(function(j){return j.visible===true;});return M.length>0||!!A;}},items:[new V({items:{path:'/availableActions',templateShareable:false,template:new L({text:"{text}",href:"{href}",target:"{target}",press:this._onLinkPress.bind(this),visible:"{visible}"})}})]});this._oActionArea.addEventDelegate({onAfterRendering:this.onAfterRenderingActionForm.bind(this)});this._oActionArea.addStyleClass("navigationPopoverAvailableLinks");this._oActionArea.setModel(this.getModel("$sapuicompNavigationContainer"));this._oPersonalizationButton=new H({justifyContent:"End",items:new B({type:sap.m.ButtonType.Transparent,text:{path:'/availableActionsPersonalizationText'},visible:{parts:[{path:'/availableActions'},{path:'/availableActionsPersonalizationText'}],formatter:function(m,A){return m.length>0&&!!A;}},press:function(){t.fireAvailableActionsPersonalizationPress();}})});this._oPersonalizationButton.setModel(this.getModel("$sapuicompNavigationContainer"));this._oPersonalizationButton.addStyleClass("navigationPopoverPersonalizationButton");var i=new V({visible:{parts:[{path:'/availableActions'},{path:'/availableActionsPersonalizationText'}],formatter:function(m,A){var M=m.filter(function(j){return j.visible===true;});return M.length>0||!!A;}}});i.setModel(this.getModel("$sapuicompNavigationContainer"));i.addStyleClass("navigationPopoverSeparator");this.setFitContainer(true);this.setJustifyContent(sap.m.FlexJustifyContent.Start);this.addItem(this._oHeaderArea).addItem(i).addItem(this._oActionArea).addItem(this._oPersonalizationButton);};N.prototype._onLinkPress=function(E){this.fireNavigate({text:E.getSource().getText(),href:E.getSource().getHref()});};N.prototype._convertToExternal=function(s){var x=F.getService("CrossApplicationNavigation");if(!x){return s;}return x.hrefForExternal({target:{shellHash:s}},this._getComponent());};N.prototype._getComponent=function(){var o=this.getComponent();if(typeof o==="string"){o=sap.ui.getCore().getComponent(o);}return o;};N.prototype._getFlexHandler=function(){return this.getAggregation("flexHandler");};N.prototype._updateAvailableAction=function(l,s){this._getFlexHandler().updateAvailableActionOfSnapshot(l,s);this._syncAvailableActions();};N.prototype._discardAvailableActions=function(l){this._getFlexHandler().discardAvailableActionsOfSnapshot(l);this._syncAvailableActions();};N.prototype._syncAvailableActions=function(){var s=this._getFlexHandler().determineSnapshotOfAvailableActions();var m=this.getModel("$sapuicompNavigationContainer");m.getProperty("/availableActions").forEach(function(M,i){if(s[M.key]!==undefined){m.setProperty("/availableActions/"+i+"/visible",s[M.key].visible);}});};N.prototype._updateAvailableActionsPersonalizationText=function(){var A=sap.ui.getCore().getLibraryResourceBundle("sap.ui.comp").getText("POPOVER_DEFINE_LINKS");if(this.getEnableAvailableActionsPersonalization()){this.setAvailableActionsPersonalizationText(A);}};return N;},true);