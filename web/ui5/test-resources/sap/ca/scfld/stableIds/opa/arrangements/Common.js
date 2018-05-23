// Copyright (C) 2015 SAP SE or an SAP affiliate company. All rights reserved
(function () {
    "use strict";
    /*global jQuery, sap*/
    jQuery.sap.declare("sap.ca.scfld.stableids.opa.arrangement.Common");
    jQuery.sap.require("sap.ui.test.Opa5");

    sap.ca.scfld.stableids.opa.arrangement.Common =
        sap.ui.test.Opa5.extend("sap.ca.scfld.stableids.opa.arrangement.Common", {

            iStartMyApp : function (sURLParameters) {
                return this.iStartMyAppInAFrame("app/index.html?responderOn=true&sap-language=EN&"
                    + (sURLParameters || ""));
            }
        });
}());