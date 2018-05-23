sap.ui.define(["sap/ui/core/ValueState","sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/m/MessageToast","sap/m/MessageBox"],function(V,F,a,M,b){"use strict";var h={badRequest:"400",forbidden:"403",methodNotAllowed:"405",preconditionFailed:"428",internalServerError:"500"};var o={callAction:"callAction",addEntry:"addEntry",saveEntity:"saveEntity",deleteEntity:"deleteEntity",editEntity:"editEntity",modifyEntity:"modifyEntity",activateDraftEntity:"activateDraftEntity",saveAndPrepareDraftEntity:"saveAndPrepareDraftEntity"};function s(p,C){b.show(p.message,{icon:p.messageBoxIcon||b.Icon.ERROR,title:p.title||sap.ui.getCore().getLibraryResourceBundle("sap.ui.generic.template").getText("ERROR_TITLE"),actions:[b.Action.OK],styleClass:C});}function S(p,n){n.navigateToMessagePage({entitySet:p.entitySet,title:p.title,text:p.message});}function c(g){var D={onMessageDialogClose:function(){e.close();r();}};var e=g("sap.ui.generic.app.fragments.MessageDialog",D);var m=e.getContent()[0];var B=m.getBinding("items");B.filter(new F("target",a.StartsWith,"/#"));var C=B.getContexts();if(C.length===1&&C[0].getObject().type===V.Success){M.show(C[0].getObject().message,{onClose:r});}else if(C.length>0){e.open();}}function r(){var m;var R=[];var e=sap.ui.getCore().getMessageManager();var f=e.getMessageModel().getObject("/");for(var i=0;i<f.length;i++){m=f[i];if(m.target.startsWith("/#")){R.push(m);}}if(R.length>0){e.removeMessages(R);}}function d(p,C,e,n){p=p||{};var E=p.errorContext||{};var f=p.response;var m=sap.ui.getCore().getLibraryResourceBundle("sap.ui.generic.template").getText("ERROR_UNKNOWN");var H;if(f instanceof Error){if(f.message){m=f.message;}}else if(f.response){if(f.response.message){m=f.response.message;}if(f.response.statusCode){H=f.response.statusCode;}if(f.response.headers){for(var g in f.response.headers){if(g.toLowerCase()==="content-type"){var i=f.response.headers[g];if(i.toLowerCase().indexOf("application/json")===0){if(f.response.responseText){var O=JSON.parse(f.response.responseText);if(O&&O.error&&O.error.message&&O.error.message.value){m=O.error.message.value;}}}else{if(f.message){m=f.message;}}break;}}}}var j=true;switch(E.lastOperation.name){case"":break;case o.callAction:break;case o.addEntry:j=false;break;case o.modifyEntity:if(h.preconditionFailed===H){j=false;}break;case o.saveEntity:j=!E.isDraft;break;case o.deleteEntity:break;case o.editEntity:break;case o.activateDraftEntity:break;default:break;}var k={entitySet:E.entitySet,title:p.title,message:m};if(j){if(E.showMessages){s(k,e);}}else{S(k,n);}}return{operations:o,handleTransientMessages:c,removeTransientMessages:r,handleError:d};},true);
