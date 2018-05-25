sap.ui.define(["jquery.sap.global","sap/ui/base/Object","sap/m/ListBase","sap/ui/comp/smarttable/SmartTable","sap/suite/ui/generic/template/ObjectPage/extensionAPI/DraftTransactionController","sap/suite/ui/generic/template/ObjectPage/extensionAPI/NonDraftTransactionController","sap/suite/ui/generic/template/extensionAPI/NavigationController"],function(q,B,L,S,D,N,a){"use strict";function g(t,c,b){return{getSelectedContexts:function(u){var C=c.byId(u);return t.oCommonUtils.getSelectedContexts(C);},rebind:function(u){var C=c.byId(u);if(C instanceof S){C.rebindTable();}},refresh:function(u){if(!u){t.oComponentUtils.refreshBinding(true);return;}var C=c.byId(u);if(C instanceof S){t.oCommonUtils.refreshSmartTable(C);return;}var A;if(C instanceof L){A="items";}else if(t.oCommonUtils.isUiTable(C)){A="rows";}var o=A&&C.getBinding(A);if(o){o.refresh();}},getTransactionController:b.extensionAPI.getTransactionControllerFunction(),attachToView:function(C){t.oCommonUtils.attachControlToView(C);},invokeActions:function(f,C,u){var d,p;if(!C){d=[];}else if(C instanceof sap.ui.model.Context){d=[C];}else{d=C;}if(u){p={urlParameters:u};}var P=t.oServices.oApplicationController.invokeActions(f,d,p);t.oComponentUtils.getBusyHelper().setBusy(P);return P;},attachPageDataLoaded:function(f){t.oComponentUtils.attach(c,"PageDataLoaded",f);},detachPageDataLoaded:function(f){t.oComponentUtils.detach(c,"PageDataLoaded",f);},registerMessageFilterProvider:function(p){b.state.messageButtonHelper.registerMessageFilterProvider(p);},getNavigationController:b.extensionAPI.getNavigationControllerFunction(),getCommunicationObject:function(l){return t.oComponentUtils.getCommunicationObject(l);},securedExecution:function(f,p){return t.oCommonUtils.securedExecution(f,p,b.state);},refreshAncestors:function(l){var C=c.getOwnerComponent();if(l<0){l=null;}t.oServices.oViewDependencyHelper.setParentToDirty(C,undefined,l);},onCustomStateChange:function(){b.stateChanged();}};}return B.extend("sap.suite.ui.generic.template.ObjectPage.extensionAPI.ExtensionAPI",{constructor:function(t,c,b){q.extend(this,g(t,c,b));}});});
