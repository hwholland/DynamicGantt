sap.ui.define(["sap/ui/model/Context", "../../js/QuickTemplates/QuickActionBaseController"], function (Context, BaseController) {
    "use strict";


    return BaseController.extend("sap.suite.ui.generic.template.QuickView.view.QuickView", {

            _initialize: function() {
                if (!this._bIsInitialized) {
                    BaseController.prototype._initialize.apply(this);
                    this.sEntityPath = decodeURIComponent(this.getOwnerComponent().getAppComponent().getComponentData().startupParameters["entityPath"]);
                }
            },

            _onMetaModelLoaded: function () {
                var oContext = new Context(this.getView().getModel(), this.sEntityPath);
                this.bindView(oContext);
            }

        }
    );
}, /* bExport= */true);
