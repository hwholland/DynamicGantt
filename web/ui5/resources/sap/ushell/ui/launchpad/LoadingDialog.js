/*!
 * Copyright (c) 2009-2017 SAP SE, All Rights Reserved
 */
sap.ui.define(['sap/m/Label','sap/ui/core/Control','sap/ui/core/Icon','sap/ui/core/Popup','sap/ushell/library','./AccessibilityCustomData'],function(L,C,I,P,l,A){"use strict";var a=C.extend("sap.ushell.ui.launchpad.LoadingDialog",{metadata:{library:"sap.ushell",properties:{iconUri:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:null},text:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:null},loadAnimationWithInterval:{type:"boolean",group:"Appearance",defaultValue:true}}}});a.prototype.init=function(){this._oPopup=new P();this._oPopup.restoreFocus=false;this._oPopup.setShadow(false);this._oPopup.setModal(true,"sapUshellLoadingDialog");this.oIcon=new I();this._oLabel=new L(this.getId()+'loadingLabel');this.sState="idle";this.sLoadingString=sap.ushell.resources.i18n.getText("genericLoading").replace("..."," ");};a.prototype.exit=function(){this._oPopup.close();this._oPopup.destroy();this.oIcon.destroy();this._oLabel.destroy();};a.prototype.isOpen=function(){return this._oPopup.isOpen();};a.prototype.openLoadingScreen=function(){if(this.sState==="idle"){this.sState="busy";}if(this.getLoadAnimationWithInterval()){this.toggleStyleClass('sapUshellVisibilityHidden',true);this._iTimeoutId=setTimeout(function(){this.toggleStyleClass('sapUshellVisibilityHidden',false);this.$().focus();}.bind(this),3000);}else{this.toggleStyleClass('sapUshellVisibilityHidden',false);this.$().focus();}if(!this.getVisible()){this.setProperty('visible',true,true);this.$().show();}if(!this.isOpen()){this._oPopup.setContent(this);this._oPopup.setPosition("center center","center center",document,"0 0","fit");this._oPopup.open();}};a.prototype.setLoadAnimationWithInterval=function(s){this.setProperty('loadAnimationWithInterval',s,true);};a.prototype.showAppInfo=function(s,i,b){this.setProperty('text',s,true);this.setProperty('iconUri',i,true);this.oIcon.setSrc(i);this._oLabel.setText(s);this._oLabel.addCustomData(new A({key:'aria-hidden',value:"true",writeToDom:true}));if(jQuery("#"+this.getId()+"accessibility-helper")[0]&&b){jQuery("#"+this.getId()+"accessibility-helper")[0].innerText=this.sLoadingString;}};a.prototype.closeLoadingScreen=function(){if(this._iTimeoutId){clearTimeout(this._iTimeoutId);}if(this.getVisible()){this.sState="idle";this.setProperty('visible',false,true);this.$().hide();this._oPopup.close();}};a.prototype.onAfterRendering=function(){this.$().css("width","20rem");};return a;});
