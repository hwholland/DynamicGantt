sap.ui.define(["sap/ui/base/Object","sap/suite/ui/generic/template/ObjectPage/extensionAPI/DraftTransactionController","sap/suite/ui/generic/template/ObjectPage/extensionAPI/NonDraftTransactionController"],function(B,D,N){"use strict";function g(t,c,s){var T;return{getSelectedContexts:function(u){var C=c.byId(u);return t.oCommonUtils.getSelectedContexts(C);},getTransactionController:function(){if(!T){var C=t.oCommonUtils.isDraftEnabled()?D:N;T=new C(t,c);}return T;},attachToView:function(C){t.oCommonUtils.attachControlToView(C);},invokeActions:function(f,C){return t.oServices.oApplicationController.invokeActions(f,C);},attachPageDataLoaded:function(f){t.oComponentUtils.attach(c,"PageDataLoaded",f);},detachPageDataLoaded:function(f){t.oComponentUtils.detach(c,"PageDataLoaded",f);},registerMessageFilterProvider:function(p){s.messageButtonHelper.registerMessageFilterProvider(p);}};}return B.extend("sap.suite.ui.generic.template.ObjectPage.extensionAPI.ExtensionAPI",{constructor:function(t,c,s){jQuery.extend(this,g(t,c,s));}});});
