sap.ui.define(
	["sap/ui/base/Object", "sap/suite/ui/generic/template/ObjectPage/extensionAPI/DraftTransactionController",
		"sap/suite/ui/generic/template/ObjectPage/extensionAPI/NonDraftTransactionController"
	],
	function(BaseObject, DraftTransactionController, NonDraftTransactionController) {
		"use strict";
		/**
		 * API to be used in extensions of ObjectPage. Breakout coding can access an instance of this class via
		 * <code>this.extensionAPI</code>. Do not instantiate yourself.
		 * @class
		 * @name sap.suite.ui.generic.template.ObjectPage.extensionAPI.ExtensionAPI
		 * @public
		 */

		function getMethods(oTemplateUtils, oController, oState) {
			var oTransactionController;
			return /** @lends sap.suite.ui.generic.template.ObjectPage.extensionAPI.ExtensionAPI.prototype */ {
				/**
				 * Get the entries currently selected in one ui element
				 *
				 * @param {string} sUiElementId the id identifying the ui element the selected context is requested for
				 * @return {sap.ui.model.Context[]} contains one entry per entry selected
				 * @public
				 */
				getSelectedContexts: function(sUiElementId) {
					var oControl = oController.byId(sUiElementId);
					return oTemplateUtils.oCommonUtils.getSelectedContexts(oControl);
				},
				/**
				 * Get the transaction controller for editing actions on the page. Note: Currently implemented for draft case
				 *
				 * @return {sap.suite.ui.generic.template.ObjectPage.extensionAPI.DraftTransactionController} the transaction
				 *         controller
				 * @public
				 */
				getTransactionController: function() {
					if (!oTransactionController) {
						var Class = oTemplateUtils.oCommonUtils.isDraftEnabled() ? DraftTransactionController : NonDraftTransactionController;
						oTransactionController = new Class(oTemplateUtils, oController);
					}
					return oTransactionController;
				},
				/**
				 * Attaches a control to the current View. Should be called whenever a new control is created and used in the
				 * context of this view. This applies especially for dialogs, action sheets, popovers, ... This method cares
				 * for defining dependency and handling device specific style classes
				 *
				 * @param {sap.ui.core.Control} oControl the control to be attached to the view
				 * @public
				 */
				attachToView: function(oControl) {
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
				invokeActions: function(sFunctionName, aContext) {
					return oTemplateUtils.oServices.oApplicationController.invokeActions(sFunctionName, aContext);
				},
				/**
				 * Attach a handler to the PageDataLoaded event.
				 * This event is fired each time the object page is navigated to or the object to be displayed is changed
				 * Note, that the event will not be fired before:
				 * <ul compact>
				 * <li>the navigation to the page has been completed
				 * <li>the header data of the object are available
				 * </ul>
				 * @param {function} fnFunction the handler function. Note that the event passed to this function possesses an attribute <code>context</code>
				 * which contains the current header context
				 * @public
				 */
				attachPageDataLoaded: function(fnFunction) {
					oTemplateUtils.oComponentUtils.attach(oController, "PageDataLoaded", fnFunction);
				},
				/**
				 * Detach a handler from the PageDataLoaded event
				 * 
				 * @param {function} fnFunction the handler function
				 * @public
				 */
				detachPageDataLoaded: function(fnFunction) {
					oTemplateUtils.oComponentUtils.detach(oController, "PageDataLoaded", fnFunction);
				},
				/**
				 * Registers a filter provider for the the message popover
				 * 
				 * @param {fnProvider} Callback function to provide single or array of sap.ui.model.Filter
				 * @public
				 */
				registerMessageFilterProvider: function(fnProvider) {
					oState.messageButtonHelper.registerMessageFilterProvider(fnProvider);
				}

			};
		}

		return BaseObject.extend("sap.suite.ui.generic.template.ObjectPage.extensionAPI.ExtensionAPI", {
			constructor: function(oTemplateUtils, oController, oState) {
				jQuery.extend(this, getMethods(oTemplateUtils, oController, oState));

			}
		});
	});