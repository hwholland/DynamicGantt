/*!
 * Copyright (c) 2009-2017 SAP SE, All Rights Reserved
 */
sap.ui.define(['sap/m/Button','sap/m/Dialog','sap/m/Input','sap/m/Label','sap/ui/layout/form/SimpleForm','sap/ushell/library','sap/ushell/resources'],function(B,D,I,L,S,l,r){"use strict";var A=B.extend("sap.ushell.ui.footerbar.AddBookmarkButton",{metadata:{library:"sap.ushell",properties:{beforePressHandler:{type:"any",group:"Misc",defaultValue:null},afterPressHandler:{type:"any",group:"Misc",defaultValue:null},title:{type:"string",group:"Misc",defaultValue:null},subtitle:{type:"string",group:"Misc",defaultValue:null},info:{type:"string",group:"Misc",defaultValue:null},tileIcon:{type:"string",group:"Misc",defaultValue:null},numberUnit:{type:"string",group:"Misc",defaultValue:null},keywords:{type:"string",group:"Misc",defaultValue:null},customUrl:{type:"any",group:"Misc",defaultValue:null},serviceUrl:{type:"any",group:"Misc",defaultValue:null},serviceRefreshInterval:{type:"string",group:"Misc",defaultValue:null},showGroupSelection:{type:"boolean",group:"Misc",defaultValue:true},appData:{type:"object",group:"Misc",defaultValue:null}}}});A.prototype.init=function(){this.setIcon('sap-icon://add-favorite');this.setText(r.i18n.getText("addToHomePageBtn"));this.setEnabled();this.oModel=new sap.ui.model.json.JSONModel({showGroupSelection:true,title:'',subtitle:'',numberValue:'',info:'',icon:'',numberUnit:'',keywords:''});var t=this;this.attachPress(function(){if(t.getBeforePressHandler()){t.getBeforePressHandler()();}t.showAddBookmarkDialog(function(){if(t.getAfterPressHandler()){t.getAfterPressHandler()();}});});if(B.prototype.init){B.prototype.init.apply(this,arguments);}};A.prototype.exit=function(){if(this.oDialog){this.oDialog.destroy();}if(this.oModel){this.oModel.destroy();}if(B.prototype.exit){B.prototype.exit.apply(this,arguments);}};A.prototype.setBookmarkTileView=function(v){this.bookmarkTileView=v;};A.prototype.getBookmarkTileView=function(){return this.bookmarkTileView;};A.prototype.showAddBookmarkDialog=function(c){this.oResourceBundle=r.i18n;this.appData=this.getAppData()||{};var t=this,i,b;this.cb=c;i=jQuery.isEmptyObject(this.appData);b=sap.ui.view({type:sap.ui.core.mvc.ViewType.JS,viewName:"sap.ushell.ui.footerbar.SaveAsTile",viewData:{appData:this.appData,serviceUrl:i?this.getServiceUrl():this.appData.serviceUrl,customUrl:i?this.getCustomUrl():this.appData.customUrl,numberUnit:i?this.getNumberUnit():this.appData.numberUnit,serviceRefreshInterval:i?this.getServiceRefreshInterval():this.appData.serviceRefreshInterval,keywords:i?this.getKeywords():this.appData.keywords}});if(jQuery.isEmptyObject(this.appData)){b.setModel(this.oModel);}t.setBookmarkTileView(b);this.oSimpleForm=new S({id:'bookmarkFormId',layout:sap.ui.layout.form.SimpleFormLayout.GridLayout,content:[b]}).addStyleClass("sapUshellAddBookmarkForm");t._openDialog(this.oSimpleForm);b.getTitleInput().attachLiveChange(function(){this.setValueState(sap.ui.core.ValueState.NONE);});};A.prototype._openDialog=function(c){var o=new B('bookmarkOkBtn',{text:this.oResourceBundle.getText('okBtn'),press:this._handleOkButtonPress.bind(this)}),a=new B('bookmarkCancelBtn',{text:this.oResourceBundle.getText('cancelBtn'),press:function(){this.oDialog.close();this._restoreDialogEditableValuesToDefault();this.cb();}.bind(this)});this.oDialog=new D({id:'bookmarkDialog',title:this.oResourceBundle.getText('addToHomePageBtn'),contentWidth:'25rem',content:c,beginButton:o,endButton:a,stretch:sap.ui.Device.system.phone,horizontalScrolling:false,afterClose:function(){this.oDialog.destroy();delete(this.oDialog);}.bind(this)});this.oDialog.open();return this.oDialog;};A.prototype.setTitle=function(t){this.setProperty("title",t,true);this.oModel.setProperty("/title",t);};A.prototype.setSubtitle=function(s){this.setProperty("subtitle",s,true);this.oModel.setProperty("/subtitle",s);};A.prototype.setInfo=function(i){this.setProperty("info",i,true);this.oModel.setProperty("/info",i);};A.prototype.setTileIcon=function(i){this.setProperty("tileIcon",i,true);this.oModel.setProperty("/icon",i);};A.prototype.setShowGroupSelection=function(s){this.setProperty("showGroupSelection",s,true);this.oModel.setProperty("/showGroupSelection",s);};A.prototype.setNumberUnit=function(n){this.setProperty("numberUnit",n,true);this.oModel.setProperty("/numberUnit",n);};A.prototype.setKeywords=function(k){this.setProperty("keywords",k,true);this.oModel.setProperty("/keywords",k);};A.prototype._restoreDialogEditableValuesToDefault=function(){if(this.oModel){this.oModel.setProperty('/title',this.getTitle());this.oModel.setProperty('/subtitle',this.getSubtitle());this.oModel.setProperty('/info',this.getInfo());}};A.prototype._handleOkButtonPress=function(){var t,R,o,b=this.getBookmarkTileView(),d=b.getBookmarkTileData(),a=d.group?d.group.object:"";if(!d.title){t=sap.ui.getCore().byId("bookmarkTitleInput");if(t){t.setValueState(sap.ui.core.ValueState.Error);t.setValueStateText(r.i18n.getText("bookmarkTitleInputError"));return;}}delete d.group;R=sap.ushell.Container.getService("Bookmark").addBookmark(d,a);o=r.i18n;R.done(function(){jQuery.proxy(this._restoreDialogEditableValuesToDefault(),this);if(sap.ushell.Container){sap.ushell.Container.getService('Message').info(o.getText('tile_created_msg'));}}.bind(this));R.fail(function(m){jQuery.sap.log.error("Failed to add bookmark",m,"sap.ushell.ui.footerbar.AddBookmarkButton");if(sap.ushell.Container){sap.ushell.Container.getService('Message').error(o.getText('fail_to_add_tile_msg'));}});this.oDialog.close();this.cb();};A.prototype.setEnabled=function(e){var s="",p=true,o;if(sap.ushell.renderers&&sap.ushell.renderers.fiori2){o=sap.ushell.renderers.fiori2.RendererExtensions.getConfiguration();if(o.appState){s=o.appState;}if(o.enablePersonalization!==undefined){p=o.enablePersonalization;}}if(s==='headerless'||s==='standalone'||s==='embedded'||s==='merged'||!p){e=false;}if(!sap.ushell.Container){if(this.getEnabled()){jQuery.sap.log.warning("Disabling 'Save as Tile' button: unified shell container not initialized",null,"sap.ushell.ui.footerbar.AddBookmarkButton");}e=false;}B.prototype.setEnabled.call(this,e);if(!e){this.addStyleClass("sapUshellAddBookmarkButton");}};return A;});
