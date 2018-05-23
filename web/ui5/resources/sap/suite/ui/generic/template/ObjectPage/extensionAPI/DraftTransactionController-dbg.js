sap.ui.define(["sap/ui/base/Object"], function(BaseObject) {
	"use strict";
	/**
	 * Draft transaction controller to be used in extensions of ObjectPage. Breakout coding can access an instance of this
	 * class via <code>ExtensionAPI.getTransactionController</code>. Do not instantiate yourself.
	 * 
	 * @class
	 * @name sap.suite.ui.generic.template.ObjectPage.extensionAPI.DraftTransactionController
	 * @public
	 */

	function getMethods(oTemplateUtils, oController) {
		return /** @lends sap.suite.ui.generic.template.ObjectPage.extensionAPI.DraftTransactionController.prototype */	{
			/**
			 * Attach a handler to the activate event
			 * 
			 * @param {function} fnFunction the handler function
			 * @public
			 */
			attachAfterActivate: function(fnFunction) {
				oTemplateUtils.oComponentUtils.attach(oController, "AfterActivate", fnFunction);
			},
			/**
			 * Detach a handler from the activate event
			 * 
			 * @param {function} fnFunction the handler function
			 * @public
			 */
			detachAfterActivate: function(fnFunction) {
				oTemplateUtils.oComponentUtils.detach(oController, "AfterActivate", fnFunction);
			},
			/**
			 * Attach a handler to the discard event
			 * 
			 * @param {function} fnFunction the handler function
			 * @public
			 */
			attachAfterCancel: function(fnFunction) {
				oTemplateUtils.oComponentUtils.attach(oController, "AfterCancel", fnFunction);
			},
			/**
			 * Detach a handler from the discard event
			 * 
			 * @param {function} fnFunction the handler function
			 * @public
			 */
			detachAfterCancel: function(fnFunction) {
				oTemplateUtils.oComponentUtils.detach(oController, "AfterCancel", fnFunction);
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
			}
		};
	}

	return BaseObject.extend("sap.suite.ui.generic.template.ObjectPage.extensionAPI.NonDraftTransactionController", {
		constructor: function(oTemplateUtils, oController) {
			jQuery.extend(this, getMethods(oTemplateUtils, oController));

		}
	});
});