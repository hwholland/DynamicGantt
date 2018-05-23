sap.ui.define(["sap/suite/ui/generic/template/lib/TemplateAssembler","sap/m/MessageBox","./AnnotationHelper"],function(T,M,A){"use strict";function g(t,c){return{onInit:function(){c.oTemplateUtils=t;c._initialize();}};}var B=T.getTemplateController(g,"sap.suite.ui.generic.template.js.QuickTemplates.QuickActionBaseController",{_initialize:function(){if(!this._bIsInitialized){this._bIsInitialized=true;var c=this.getOwnerComponent();var v=this.getView();v.setModel(c.getModel());this.sEntitySet=c.getEntitySet();this.oDraftController=this.oTemplateUtils.oServices.oDraftController;this.bDraftEnabled=this.oDraftController.getDraftContext().isDraftEnabled(this.sEntitySet);var m=this.getView().getModel().getMetaModel();this.oEntitySetMeta=m.getODataEntitySet(this.sEntitySet);this.oEntityTypeMeta=m.getODataEntityType(this.oEntitySetMeta.entityType);this.oSmartFieldEventDelegate={onAfterRendering:jQuery.proxy(function(e){this._onSmartFieldAfterRendering(e);},this)};}},_onMetaModelLoaded:function(){},_onSmartFieldAfterRendering:function(e){},onBeforeRendering:function(){if(!this._bMetaDataInit){this._bMetaDataInit=true;this.getView().getModel().getMetaModel().loaded().then(jQuery.proxy(this._onMetaModelLoaded,this),jQuery.proxy(this.onError,this));}this.setBusy(false);},setBusy:function(b){if(this.getView().getModel("ui")){this.getView().getModel("ui").setProperty("/busy",b);this.getView().getModel("ui").updateBindings();}},bindView:function(c){var i=this._getFormatterInterface(c);var e=A.formatExpandBindingPathForHeaderObject(i,this.oEntityTypeMeta.namespace+"."+this.oEntityTypeMeta.name);this.oContext=c;this.getView().bindElement({path:c.getPath(),parameters:{expand:e}});},onError:function(e){this.setBusy(false);if(e.message){this._showErrorMessage(e);}else if(e.response){this._showErrorMessage(e.response);}else{this._showErrorMessage({message:this.oTemplateUtils.oCommonUtils.getText("QuickAction_Generic_Error")});}},onSmartFieldsCreated:function(e){var c=e.getParameters()[0];if(c&&typeof c.addEventDelegate==='function'){c.removeEventDelegate(this.oSmartFieldEventDelegate);c.addEventDelegate(this.oSmartFieldEventDelegate);}},formatI18NMessage:function(){if(arguments&&arguments[0]){var i=arguments[0];var r=this.getView().getModel("i18n").getResourceBundle();if(arguments.length>1){var a=Array.prototype.slice.call(arguments);return r.getText(i,a.splice(1,arguments.length-1));}return r.getText(i);}return arguments;},_getFormatterInterface:function(c){var a=c?c:this.getView().getBindingContext();return A.createFormatterInterface(a);},_setBindingContext:function(c){this.getView().setBindingContext(c);this.setBusy(false);},_showErrorMessage:function(e){var a=e.response||e;var d=a.message;if(a.statusText){d=a.statusText;}if(a&&a.responseText){try{var E=jQuery.parseJSON(a.responseText);var s=this._getErrorDetail(E);d=(s&&s.length>0)?s:d;}catch(b){}}M.show(d,{icon:M.Icon.ERROR,title:this.oTemplateUtils.oCommonUtils.getText("QuickAction_Error_Popover"),actions:[M.Action.OK]});},_getErrorDetail:function(e){var d="";if(e&&e.error&&e.error.message){if(e.error.innererror&&e.error.innererror.errordetails&&e.error.innererror.errordetails.length>0){jQuery.each(e.error.innererror.errordetails,jQuery.proxy(function(i,a){d+=a.severity+": "+a.message+"\n\n";},this));}else if(e.error.message.value){d=e.error.message.value;}}return d;}});return B;},true);