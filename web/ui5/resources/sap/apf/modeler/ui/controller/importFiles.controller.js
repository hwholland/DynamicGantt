/*!
 * SAP APF Analysis Path Framework
 *
 * (c) Copyright 2012-2014 SAP AG. All rights reserved
 */
jQuery.sap.require("sap.apf.modeler.ui.utils.nullObjectChecker");sap.ui.define(["sap/apf/modeler/ui/controller/overwriteExistingConfiguration"],function(B){"use strict";var c,p,a,o,b;var n=new sap.apf.modeler.ui.utils.NullObjectChecker();function _(C){var t=c.getText;C.byId("idImportFilesDialog").setTitle(t("importConfig"));C.byId("idJsonFileLabel").setText(t("jsonFile"));C.byId("idJsonFileUploader").setPlaceholder(t("jsonFileInputPlaceHolder"));C.byId("idTextFileLabel").setText(t("textFile"));C.byId("idTextFileUploader").setPlaceholder(t("textFileInputPlaceHolder"));C.byId("idUploadOfConfig").setText(t("upload"));C.byId("idCancelImportOfConfig").setText(t("cancel"));}function d(C,h,i,j){var k=new sap.ui.core.CustomData({value:{callbackOverwrite:h,callbackCreateNew:i}});o=sap.ui.xmlfragment("idOverwriteConfirmationFragment","sap.apf.modeler.ui.fragment.overwriteConfirmation",C);C.getView().addDependent(o);C.setOverwriteConfirmationDialogText(c.getText);o.removeAllCustomData();o.addCustomData(k);sap.ui.core.Fragment.byId("idOverwriteConfirmationFragment","idNewConfigTitleInput").setValue(j);o.open();}function e(C){var i=C.byId("idImportFilesDialog");if(o&&o.isOpen()){C.handleCancelOfOverwriteDialog();}if(i&&i.isOpen()){C.handleCancelOfImportFilesDialog();}}function f(h,m,i){var C=this;var s=c.getText("successsMsgForConfigFileImport");var t=C.byId("idTextFileUploader");if(!n.checkIsNotUndefined(i)){p.fireEvent("updateAppListEvent");sap.m.MessageToast.show(s);if(t&&t.getValue()){t.upload();}}else{var M=c.createMessageObject({code:"11502"});M.setPrevious(i);c.putMessage(M);}if(t&&!t.getValue()){e(C);}}function g(C,P){var s=c.getText("successsMsgForPropertyFileImport");c.importTexts(P,function(m){if(!n.checkIsNotUndefined(m)){sap.m.MessageToast.show(s);}else{var M=c.createMessageObject({code:"11503"});M.setPrevious(m);c.putMessage(M);}});e(C);}return B.extend("sap.apf.modeler.ui.controller.importFiles",{onInit:function(){var C=this;c=C.getView().getViewData().oCoreApi;p=C.getView().getViewData().oParentControl;c.getApplicationHandler(function(h){a=h;});_(C);C.byId("idImportFilesDialog").open();},addAcceptAttribute:function(){var C=this;var j=jQuery("#"+C.getView().getId()+"--idJsonFileUploader-fu");var h=jQuery("#"+C.getView().getId()+"--idTextFileUploader-fu");j.attr('accept','.json');h.attr('accept','.properties');},handleTypeMissmatchForJSONFile:function(){sap.m.MessageToast.show(c.getText("jsonFileMissmatch"));},handleTypeMissmatchForPropertiesFile:function(){sap.m.MessageToast.show(c.getText("propertiesFileMissmatch"));},handleJSONFileUploadComplete:function(E){var C=this;var m=c.getText("errorReadingJSONFile");var h=E.getSource().oFileUpload.files[0];if(h){var r=new FileReader();r.readAsText(h,"UTF-8");r.onload=function(i){b=JSON.parse(i.target.result).configHeader.Application;c.importConfiguration(JSON.stringify(JSON.parse(i.target.result)),function(j,k,l){d(C,j,k,l);},f.bind(C));};r.onerror=function(){sap.m.MessageToast.show(m);};}},handleTextFileUploadComplete:function(E){var C=this,h,j;h=E.getSource().oFileUpload.files[0];j=C.byId("idJsonFileUploader");if(h){var r=new FileReader();r.readAsText(h,"UTF-8");r.onload=function(k){var l=k.target.result.split(/\r?\n/);var m,i,q;for(i=0;i<l.length;i++){m=/^\#\s*ApfApplicationId=[0-9A-F]+\s*$/.exec(l[i]);if(n.checkIsNotNull(m)){q=l[i].split('=')[1];}}var s;if(a){for(i=0;i<a.getList().length;i++){if(q===a.getList()[i].Application){s=true;break;}else{s=false;}}}if(!s&&j&&!j.getValue()){sap.m.MessageToast.show(c.getText("chooseJsonFile"));}else if(j&&j.getValue()){if(b&&q&&q!==b){sap.m.MessageToast.show(c.getText("asyncMsg"));e(C);}else{g(C,k.target.result);}}else if(s&&j&&!j.getValue()){g(C,k.target.result);}};r.onerror=function(){sap.m.MessageToast.show(c.getText("errorReadingPropertiesFile"));};}},handleUploadOfConfig:function(){var C=this;var j=n.checkIsNotNullOrUndefinedOrBlank(C.byId("idJsonFileUploader").getValue());var t=n.checkIsNotNullOrUndefinedOrBlank(C.byId("idTextFileUploader").getValue());if((j&&t)||j){C.byId("idJsonFileUploader").upload();}else{C.byId("idTextFileUploader").upload();}},handleCancelOfImportFilesDialog:function(){var C=this;C.getView().destroy();}});});
