// @copyright@
/**
 * @fileOverview This file contains miscellaneous functions which may be used
 * to override/replace existing SAPUI5 methods.
 */

(function () {
    "use strict";
    /*global jQuery, sap */

    // ensure that sap.ushell exists
    jQuery.sap.declare("sap.ovp.test.mockservers");
    jQuery.sap.require("sap.ui.core.util.MockServer");

    sap.ovp.test.mockservers = {};

    var oMockServers = [];

    sap.ovp.test.mockservers.loadMockServer = function (sMockServerBaseUri, rootUri, isMockServerForTestRequired, namespace){

        if (!namespace) {
            namespace = 'ovp';
        }
        if (!oMockServers[namespace]) {
            oMockServers[namespace] = [];
        }
        var oMockServersNS = oMockServers[namespace];

        //This method has two mockservers, the order which they pushed is important.
        //This mockserver has lower priority
        if (isMockServerForTestRequired) {
            oMockServersNS.push(new sap.ui.core.util.MockServer({
                requests: [
                    {
                        method: "HEAD",
                        // have MockServer fixed and pass just the URL!
                        path: rootUri,
                        response: function (oXHR) {
                            oXHR.respond(200, {}, "");
                        }
                    }
                    ,
                    {
                        method: "POST",
                        // have MockServer fixed and pass just the URL!
                        path: new RegExp(sap.ui.core.util.MockServer.prototype._escapeStringForRegExp(rootUri) + ".*"),
                        response: function (oXHR) {
                            oXHR.respondXML(200, {}, "");
                        }
                    }
                ]
            }));
            oMockServersNS[oMockServersNS.length - 1].start();
        }
        //This mockserver has higher priority
        oMockServersNS.push(new sap.ui.core.util.MockServer({rootUri: rootUri}));
        oMockServersNS[oMockServersNS.length - 1].simulate(/* sServiceUri?!*/sMockServerBaseUri + "metadata.xml", {
            sMockdataBaseUrl: sMockServerBaseUri,
            bGenerateMissingMockData: true
        });
        oMockServersNS[oMockServersNS.length - 1].start();
    };

    sap.ovp.test.mockservers.loadRequestMockServer = function (sComponent, requestResponseConfig, namespace) {
        if (!namespace) {
            namespace = 'ovp';
        }
        if (!oMockServers[namespace]) {
            oMockServers[namespace] = [];
        }
        var oMockServersNS = oMockServers[namespace];

        var requestsArr = [];

        if (requestResponseConfig.head) {
            requestsArr.push({
                method: "HEAD",
                // have MockServer fixed and pass just the URL!
                path: new RegExp(requestResponseConfig.head.path + ".*"),
                response: function(oXHR) {
                    oXHR.respond(requestResponseConfig.head.responseCode, {}, "");
                }
            });
        }
        if (requestResponseConfig.get) {
            requestsArr.push({
                method: "GET",
                // have MockServer fixed and pass just the URL!
                path: new RegExp(requestResponseConfig.get.path + sComponent + ".*"),
                response: function(oXHR) {
                    oXHR.respond(requestResponseConfig.get.responseCode,{}, "");
                }
            });
        }
        if (requestResponseConfig.post) {
            requestsArr.push({
                method: "POST",
                // have MockServer fixed and pass just the URL!
                path: new RegExp(requestResponseConfig.post.path + ".*"),
                response: function(oXHR) {
                    oXHR.respond(requestResponseConfig.post.responseCode,{}, "");
                }
            });
        }

        oMockServersNS.push(new sap.ui.core.util.MockServer({
            requests: requestsArr
        }));
        oMockServersNS[oMockServersNS.length - 1].start();
    };

    sap.ovp.test.mockservers.close = function (namespace) {
        if (!namespace) {
            namespace = 'ovp';
        }
        var oMockServersNS = oMockServers[namespace];

        for (var i = 0, len = oMockServersNS.length; i < len; i++){
            oMockServersNS[i].destroy();
        }
        oMockServers[namespace] = [];
    };
}());
