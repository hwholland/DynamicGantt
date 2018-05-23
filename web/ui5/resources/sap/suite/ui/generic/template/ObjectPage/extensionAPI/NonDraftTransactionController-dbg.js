sap.ui.define(["sap/ui/base/Object"], function(BaseObject) {
	"use strict";
	/**
	 * Non Draft transaction controller to be used in extensions of ObjectPage. Breakout coding can access an instance of this
	 * class via <code>ExtensionAPI.getTransactionController</code>. Do not instantiate yourself.
	 * 
	 * @class
	 * @name sap.suite.ui.generic.template.ObjectPage.extensionAPI.NonDraftTransactionController
	 * @public
	 */

	function getMethods(oTemplateUtils, oController) {
		return /** @lends sap.suite.ui.generic.template.ObjectPage.extensionAPI.NonDraftTransactionController.prototype */	{
			/**
			 * Attach a handler to the save event
			 * 
			 * @param {function} fnFunction the handler function
			 * @public
			 */
			attachAfterSave: function(fnFunction) {
				oTemplateUtils.oComponentUtils.attach(oController, "AfterSave", fnFunction);
			},
			/**
			 * Detach a handler from the save event
			 * 
			 * @param {function} fnFunction the handler function
			 * @public
			 */
			detachAfterSave: function(fnFunction) {
				oTemplateUtils.oComponentUtils.detach(oController, "AfterSave", fnFunction);
			},
			/**
			 * Attach a handler to the delete event
			 * 
			 * @param {function} fnFunction the handler function
			 * @public
			 */
			attachAfterDelete: function(fnFunction) {
				oTemplateUtils.oComponentUtils.attach(oController, "AfterDelete", fnFunction);
			},
			/**
			 * Detach a handler from the delete event
			 * 
			 * @param {function} fnFunction the handler function
			 * @public
			 */
			detachAfterDelete: function(fnFunction) {
				oTemplateUtils.oComponentUtils.detach(oController, "AfterDelete", fnFunction);
			},
			/**
			 * Attach a handler to the cancel event
			 * 
			 * @param {function} fnFunction the handler function
			 * @public
			 */
			attachAfterCancel: function(fnFunction) {
				oTemplateUtils.oComponentUtils.attach(oController, "AfterCancel", fnFunction);
			},
			/**
			 * Detach a handler from the cancel event
			 * 
			 * @param {function} fnFunction the handler function
			 * @public
			 */
			detachAfterCancel: function(fnFunction) {
				oTemplateUtils.oComponentUtils.detach(oController, "AfterCancel", fnFunction);
			}		
		};
	}

	return BaseObject.extend("sap.suite.ui.generic.template.ObjectPage.extensionAPI.NonDraftTransactionController", {
		constructor: function(oTemplateUtils, oController) {
			jQuery.extend(this, getMethods(oTemplateUtils, oController));

		}
	});
});