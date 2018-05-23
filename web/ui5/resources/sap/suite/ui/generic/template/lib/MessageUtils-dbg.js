/* Class containing static methods for message handling.
Note that this contains redundancies with the Denver layer.
This should be cleaned up as soon as the Denver layer provides the functionality in a consumable way.
*/

sap.ui.define(["sap/ui/core/ValueState", "sap/ui/model/Filter", "sap/ui/model/FilterOperator", "sap/m/MessageToast", "sap/m/MessageBox",
		"sap/ui/generic/app/util/ModelUtil", "sap/ui/generic/app/util/MessageUtil"
	],
	function(ValueState, Filter, FilterOperator, MessageToast, MessageBox, ModelUtil, GenericMessageUtil) {
		"use strict";


		// Template specific
		function getShowMessages(oController) {
			var oView = oController.getView();
			var oUIModel = oView.getModel("ui");
			return !oUIModel || !oUIModel.getProperty("/editable");
		}

		function getErrorContext(sOperation, mParameters, oDraftController, oController) {
			var result = {};
			mParameters = mParameters || {};
			var sEntitySet;
			var oDraftContext = oDraftController && oDraftController.getDraftContext();
			if (oDraftContext) {
				// context is only present for details view via this.getContext()
				var oContext = mParameters.context || oController.getView().getBindingContext();
				// context is not given when creating a new draft entity and the corresponding POST request fails
				sEntitySet = oContext ? ModelUtil.getEntitySetFromContext(oContext) : oController.getOwnerComponent().getEntitySet();
				if (sEntitySet) {
					result.entitySet = sEntitySet;
					result.isDraft = oDraftContext.isDraftEnabled(sEntitySet);
				}
			}

			result.lastOperation = sOperation;
			result.showMessages = getShowMessages(oController);

			return result;
		}

		function fnHandleErrorTemplate(sOperation, oController, sContentDensityClass, oServices, oError, mParameters) {
			var mParametersGeneric = {
				// if error context is not set - allow to pass values to getErrorContext via mParameters - required for actions on list as context needs to be
				// provided
				errorContext: (mParameters && mParameters.errorContext) || getErrorContext(sOperation, mParameters, oServices.oDraftController,
					oController),
				response: oError
			};

			GenericMessageUtil.handleError(mParametersGeneric, oController, sContentDensityClass, oServices.oNavigationController);
		}
		
		return {
			operations: GenericMessageUtil.operations,
			handleTransientMessages: GenericMessageUtil.handleTransientMessages,
			handleError: fnHandleErrorTemplate
		};
	});