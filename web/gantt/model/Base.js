sap.ui.define(["sap/ui/base/Object", "sap/ui/model/json/JSONModel"], function (
    Object, JSONModel) {
    "use strict";

    /**
     * @class Base
     * @name gantt.model.Base
     */

    return Object.extend("gantt.model.Base", {
        constructor: function () {
            this.model = new JSONModel();
            //this.model.setData(this);
        },
        getModel: function () {
            return this.model;
        },
        getData: function () {
            return this.model.getData();
        },
        setData: function (oData) {
            this.model.setData(oData);
        }

    });
});