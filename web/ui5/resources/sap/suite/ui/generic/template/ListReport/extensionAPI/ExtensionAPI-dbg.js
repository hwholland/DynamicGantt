sap.ui.define(["sap/ui/base/Object",
		"sap/suite/ui/generic/template/ListReport/extensionAPI/NonDraftTransactionController"], function(BaseObject,
		NonDraftTransactionController) {
	"use strict";
	/**
	 * API to be used in extensions of ListReport. Breakout coding can access an instance of this class via
	 * <code>this.extensionAPI</code>. Do not instantiate yourself.
	 * @class
	 * @name sap.suite.ui.generic.template.ListReport.extensionAPI.ExtensionAPI
	 * @public
	 */

	function getMethods(oTemplateUtils, oController, oState) {
		var oTransactionController;
		return /** @lends sap.suite.ui.generic.template.ListReport.extensionAPI.ExtensionAPI.prototype */ {
			/**
			 * Get the list entries currently selected
			 * 
			 * @return {sap.ui.model.Context[]} contains one entry per line selected
			 * @public
			 */
			getSelectedContexts: function() {
				return oTemplateUtils.oCommonUtils.getSelectedContexts(oState.oSmartTable);
			},
			/**
			 * Get the transaction controller for editing actions on the list Note: Currently implemented for non draft case
			 * 
			 * @return {sap.suite.ui.generic.template.ListReport.extensionAPI.NonDraftTransactionController} the transaction controller
			 * @public
			 */
			getTransactionController: function() {
				if (oTemplateUtils.oCommonUtils.isDraftEnabled()) {
					throw new Error("Transaction support on ListReport for draft case not implemented yet");
				}
				oTransactionController = oTransactionController
						|| new NonDraftTransactionController(oTemplateUtils, oController, oState);
				return oTransactionController;
			},
			/**
			 * Refreshes the List from the backend
			 * 
			 * @public
			 */
			refreshTable: function() {
				oState.oSmartTable.rebindTable();
			},
			/**
			 * Attaches a control to the current View. Should be called whenever a new control is created and used in the
			 * context of this view. This applies especially for dialogs, action sheets, popovers, ... This method cares for
			 * defining dependency and handling device specific style classes
			 * 
			 * @param {sap.ui.core.Control} oControl the control to be attached to the view
			 * @public
			 */			
			attachToView: function(oControl){
				oTemplateUtils.oCommonUtils.attachControlToView(oControl);
			},
			/**
			 * Invokes multiple time the action with the given name and submits changes to the back-end.
			 *
			 * @param {string} sFunctionName The name of the function or action
			 * @param {array} aContext The given binding contexts
			 * @returns {Promise} A <code>Promise</code> for asynchronous execution of the action
			 * @throws {Error} Throws an error if the OData function import does not exist or the action input parameters are invalid
			 * @public
			 */
			invokeActions: function(sFunctionName, aContext){
				return oTemplateUtils.oServices.oApplicationController.invokeActions(sFunctionName, aContext);
			}
		};
	}

	return BaseObject.extend("sap.suite.ui.generic.template.ListReport.extensionAPI.ExtensionAPI", {
		constructor: function(oTemplateUtils, oController, oState) {
			jQuery.extend(this, getMethods(oTemplateUtils, oController, oState));

		}
	});
});