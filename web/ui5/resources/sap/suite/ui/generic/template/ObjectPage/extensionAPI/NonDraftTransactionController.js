sap.ui.define(["sap/ui/base/Object"],function(B){"use strict";function g(t,c){return{attachAfterSave:function(f){t.oComponentUtils.attach(c,"AfterSave",f);},detachAfterSave:function(f){t.oComponentUtils.detach(c,"AfterSave",f);},attachAfterDelete:function(f){t.oComponentUtils.attach(c,"AfterDelete",f);},detachAfterDelete:function(f){t.oComponentUtils.detach(c,"AfterDelete",f);},attachAfterCancel:function(f){t.oComponentUtils.attach(c,"AfterCancel",f);},detachAfterCancel:function(f){t.oComponentUtils.detach(c,"AfterCancel",f);}};}return B.extend("sap.suite.ui.generic.template.ObjectPage.extensionAPI.NonDraftTransactionController",{constructor:function(t,c){jQuery.extend(this,g(t,c));}});});