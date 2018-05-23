sap.ui.define(["sap/ui/base/Object", "sap/m/MessageToast", "sap/ui/generic/app/util/ModelUtil", "sap/ui/generic/app/util/ActionUtil", "sap/suite/ui/generic/template/lib/MessageUtils"],
	function(BaseObject, MessageToast, ModelUtil, ActionUtil, MessageUtils) {
		"use strict";

		function getMethods(oController, oComponentUtils, oServices, oCommonUtils, oBusyHelper) {
			var oRejectedPromise = Promise.reject();
			oRejectedPromise.catch(jQuery.noop);


			function handleError(sOperation, reject, oError, mParameters) {
				MessageUtils.handleError(sOperation, oController, oCommonUtils.getContentDensityClass(), oServices, oError, mParameters);
				return (reject || jQuery.noop)(oError);
			}

			function handleSuccess() {
				MessageUtils.handleTransientMessages(oCommonUtils.getDialogFragment);
			}

			/*
			 * Prepares current OData entity for editing. The entity can either
			 * be a non-draft document or draft root.
			 * @param {boolean} [bPreserveChanges] Set to <code>true</code> to avoid the creation of a new draft when unsaved changes exist in the back-end
			 * @returns {Promise} A <code>Promise</code> for asynchronous execution
			 * @public
			 */
			function editEntity(bPreserveChanges) {
				return new Promise(
					function(resolve, reject) {
						oServices.oTransactionController.editEntity(oController.getView().getBindingContext(), bPreserveChanges).then(
							function(oResponse) { //success
								oComponentUtils.rebindHeaderData(oResponse.context.getPath());
								handleSuccess(oResponse);
								return resolve(oResponse.context);
							},
							function(oResponse) { // error handler
								if (oResponse && oResponse.response && oResponse.response.statusCode === '409' && bPreserveChanges) { //there might be unsaved changes
									oResponse.unsavedChanges = true;
									//remove transient message associated with rc 409 in order to prevent message pop-up
									var oMesssageManager = sap.ui.getCore().getMessageManager();
									var aMessages =  oMesssageManager.getMessageModel().oData;
									var aMessagesToBeRemoved = [];
									for (var i = 0; i < aMessages.length; i++) {
										 if (aMessages[i].getCode() === "SDRAFT_COMMON/000") {
											 aMessagesToBeRemoved.push(aMessages[i]); 
										 }
									}
									if (aMessagesToBeRemoved.length > 0) {
										oMesssageManager.removeMessages(aMessagesToBeRemoved);
									}
									return resolve(oResponse);
								} else {
									handleError(MessageUtils.operations.editEntity, reject, oResponse, oResponse);
								}
							}
						);
					}
				);
			}

			/*
			 * Deletes current OData entity. The entity can either be a
			 * non-draft document or a draft document. *
			 *
			 * @param {boolean}
			 *          bDeleteDraftForActiveEntity Can be set to
			 *          <code>true</code> in order to delete the draft entity,
			 *          although the current binding context belongs to the
			 *          active entity
			 * @returns {Promise} A <code>Promise</code> for asynchronous
			 *          execution
			 * @public
			 */
			function deleteEntity(bDeleteDraftForActiveEntity) {
				var oContext = oController.getView().getBindingContext();
				var bIsActiveEntity = oServices.oDraftController.isActiveEntity(oContext);
				var bHasActiveEntity = oServices.oDraftController.hasActiveEntity(oContext);

				return new Promise(
					function(resolve, reject) {
						var fnError = function(oError) {
							oController.getOwnerComponent().getComponentContainer().bindElement(oContext.getPath());
							return handleError(MessageUtils.operations.deleteEntity, reject, oError);
						};
						if (bIsActiveEntity && bDeleteDraftForActiveEntity) {
							// Current context is the active document. But we have to
							// delete the draft of this active document.
							oServices.oDraftController.getDraftForActiveEntity(oContext).then(
								function(oResponse) {
									oServices.oTransactionController.deleteEntity(oResponse.context).then(
										function() {
											setTimeout(
												function() {
													MessageToast.show(oCommonUtils.getText("ST_GENERIC_DRAFT_WITH_ACTIVE_DOCUMENT_DELETED"));
												}, 50);

											return resolve();
										});
								}, fnError);
						} else {
							oServices.oTransactionController.deleteEntity(oContext).then(
								function() {
									var sEntitySet = ModelUtil.getEntitySetFromContext(oContext);
									var oDraftContext = oServices.oDraftController.getDraftContext();
									var bRoot = oDraftContext.isDraftRoot(sEntitySet);
									var sMessageText = oCommonUtils.getText("ST_GENERIC_OBJECT_DELETED");
	
									// replace the message only for the root.
									if (!bIsActiveEntity && bRoot) {
										sMessageText = oCommonUtils.getText(bHasActiveEntity ? "ST_GENERIC_DRAFT_WITH_ACTIVE_DOCUMENT_DELETED" : "ST_GENERIC_DRAFT_WITHOUT_ACTIVE_DOCUMENT_DELETED");
									}
									setTimeout(function() {
										MessageToast.show(sMessageText);
									}, 50);
	
									return resolve();
								}, 
							fnError);
						}
					}
				);
			}

			/**
			 * Deletes current OData entity. The entity can either be a non-draft document or a draft document. *
			 *
			 * @param {array} aPath Binding contexts or paths (strings) which identify the entities
			 * @returns {Promise} A <code>Promise</code> that receives an array with the responses of the delete requests
			 * @public
			 */
			function deleteEntities(aPath) {

				return new Promise(function(resolve, reject) {
					oServices.oTransactionController.deleteEntities(aPath).then(
						function(aDeleteResults) {
							var aFailedPath = []; // Failed paths
							var aODataMessage = sap.ui.getCore().getMessageManager().getMessageModel().getData(); // OData error messages

							// Find the failed entity paths by comparing aPath and the paths from the OData error messages
							for (var i = 0; i < aODataMessage.length; i++) {
								var sMessageObjectPath = aODataMessage[i].getTarget(); // entity path

								for (var j = 0; j < aPath.length; j++) {
									if (sMessageObjectPath.indexOf(aPath[j]) > -1 /*&& aFailedPath.indexOf(sMessageObjectPath) === -1*/ ) { // match entity path
										aFailedPath.push(sMessageObjectPath);
										break;
									}
								}
							}
							return resolve(aFailedPath);
						},
						function(oError) {
							return reject(oError);
						}
					);
				});
			}

			/*
			 * Modifies current OData entity. The entity can either be a non-draft document or a draft document.
			 *
			 * @param {string} sValue The value that has to be modified
			 * @param {sap.ui.core.Control} oControl The control that modified the entry
			 * @returns {Promise} A <code>Promise</code> for asynchronous execution
			 * @public
			 */
			function modifyEntity(sValue, oControl) {

				return new Promise(function(resolve, reject) {
					var oComponent = oController.getOwnerComponent();
					var sEntitySet = oComponent.getEntitySet();
					if (!oServices.oDraftController.getDraftContext().isDraftEnabled(sEntitySet)) {
						return resolve();
					}

					var oBinding = oComponent.getComponentContainer().getElementBinding();
					oServices[oControl ? "oApplicationController" : "oTransactionController"].propertyChanged(sEntitySet, sValue, oBinding, oControl).then(function() {
						return resolve();
					}, handleError.bind(null, MessageUtils.operations.modifyEntity, reject));
				});
			}

			/*
			 * Saves current OData entity. The entity can either be a non-draft document or a draft document.
			 *
			 * @returns {Promise} A <code>Promise</code> for asynchronous execution
			 * @public
			 */
			function saveEntity() {
				return new Promise(function(resolve, reject) {
					oServices.oTransactionController.triggerSubmitChanges().then(function(oResponse) {
						handleSuccess();
						return resolve(oResponse.context);
					}, handleError.bind(null, MessageUtils.operations.saveEntity, reject));
				});
			}

			/*
			 * Activates a draft OData entity. Only the root entity can be activated.
			 *
			 * @returns {Promise} A <code>Promise</code> for asynchronous execution
			 * @public
			 */
			function activateDraftEntity() {

				return new Promise(function(resolve, reject) {
					oServices.oDraftController.activateDraftEntity(oController.getView().getBindingContext()).then(function(oResponse) {
						var oComponent = oController.getOwnerComponent();
						var oComponentContainer = oComponent.getComponentContainer();
						oComponentContainer.unbindElement();
						oComponentUtils.rebindHeaderData(oResponse.context.getPath());
						// Refresh has be enforeced on the Object Binding to reload the dependent data
						// which is displayed on the UI
						oComponentContainer.getObjectBinding().refresh(true);

						handleSuccess();
						return resolve(oResponse);
					}, handleError.bind(null, MessageUtils.operations.activateDraftEntity, reject));
				});
			}

			function getActionUtil(mParameters){
				return new ActionUtil(mParameters);
			}
			
			function callActionImpl(mParameters, fnResolve, fnReject) {
				if (oBusyHelper.isBusy()) {
					fnReject();
					return;
				}
				
				var sFunctionImportPath = mParameters.functionImportPath;
				var aCurrentContexts = mParameters.contexts;
				var oSourceControl = mParameters.sourceControl;
				var sFunctionImportLabel = mParameters.label;
				var sNavigationProperty = mParameters.navigationProperty;

				var oActionProcessor = getActionUtil({
					controller: oController,
					contexts: aCurrentContexts,
					applicationController: oServices.oApplicationController
				});

				var fnActionCallResolve = function(aResponses) {
					var oResponse, oResponseContext;

					if (jQuery.isArray(aResponses) && aResponses.length === 1) {
						// only one context, handle as single action call
						oResponse = aResponses[0];
						oResponseContext = oResponse.response && oResponse.response.context;

						if (oResponseContext && oResponseContext !== oResponse.actionContext && oResponseContext.getPath() !== "/undefined") {
							if (oSourceControl) {
								oCommonUtils.navigateFromListItem(oResponseContext, oSourceControl);
							} else {
								oServices.oNavigationController.navigateToContext(oResponseContext, sNavigationProperty, false);
							}
						}
					}
					fnResolve(aResponses);
				};

				var fnActionCallReject = function(oError) {
					if (!jQuery.isArray(oError)) {
						var mErrorParameters = {
							context: aCurrentContexts
						};
						handleError(MessageUtils.operations.callAction, null, oError, mErrorParameters);
						fnReject(oError);
					}
				};

				oActionProcessor.call(sFunctionImportPath, sFunctionImportLabel).then(function(oResult){
					if (oResult && oResult.executionPromise){
//						new logic
						oBusyHelper.setBusy(oResult.executionPromise);
						oResult.executionPromise.then(fnActionCallResolve,fnActionCallReject);
					} else {
//						old logic - can be deleted as soon as promise from actionUtil.call always resolves to a second promise
						if (!oResult){
//							user cancellation
							fnReject();
						} else {
							fnActionCallResolve(oResult);
						}
					}
				}, function(oError){
					if (!oError){
//						new logic
//						user cancellation
						fnReject();
					} else {
//						old logic - can be deleted as soon as promise from actionUtil.call always resolves to a second promise
						fnActionCallReject(oError);
					}
				});
						
			}

			/*
			 * Calls an OData action (also called OData function import). Afterwards the message handling
			 * is triggered for the returned messages.
			 *
			 * @param {object} mParameters Parameters which are used to identify and fire action
			 * @param {array} mParameters.contexts Contexts relevant for action
			 * @param {string} mParameters.functionImportPath Path to the OData function import
			 * @param {object} [mParameters.sourceControl] Control where a navigation starts (e.g. table)
			 * @param {object} [mParameters.navigationProperty] Property to navigate after action
			 * @param {string} [mParameters.label] Text for the confirmation popup
			 *
			 * @returns {Promise} A Promise that resolves if the action has been executed successfully
			 *
			 * @public
			 */
			function callAction(mParameters) {
				var oRet = new Promise(function(fnResolve, fnReject){
					callActionImpl(mParameters, fnResolve, fnReject);	
				});
				return oRet;
			}
			
			/*
			 * Adds an entry to a table.
			 *
			 * @param {sap.ui.table.Table|sap.m.Table|sap.ui.comp.smarttable.SmartTable} oTable The table to which an entry has been added
			 */
			function addEntry(oTable) {

				if (!oTable) {
					throw new Error("Unknown Table");
				}

				var sBindingPath = "";
				var sTableBindingPath = "";
				var sEntitySet = oController.getOwnerComponent().getEntitySet();
				var oEntityType, oEntitySet, oNavigationEnd, oMetaModel;
				var oView = oController.getView();
				var oModel = oView.getModel();

				var oViewContext = oView.getBindingContext();
				if (oViewContext) {
					// Detail screen
					sTableBindingPath = oCommonUtils.getTableBinding(oTable).path;

					// get entityset of navigation property
					oMetaModel = oModel.getMetaModel();
					oEntitySet = oMetaModel.getODataEntitySet(sEntitySet);
					oEntityType = oMetaModel.getODataEntityType(oEntitySet.entityType);
					oNavigationEnd = oMetaModel.getODataAssociationSetEnd(oEntityType, sTableBindingPath);
					if (oNavigationEnd) {
						sEntitySet = oNavigationEnd.entitySet;
					}

					// create binding path
					sTableBindingPath = "/" + sTableBindingPath;
					sBindingPath = oViewContext.getPath() + sTableBindingPath;
				} else {
					// on list, support only one entityset mapped to the root component
					sBindingPath = "/" + sEntitySet;
				}

				return new Promise(function(resolve, reject) {
					if (oServices.oDraftController.getDraftContext().isDraftEnabled(sEntitySet)) {
						oServices.oDraftController.createNewDraftEntity(sEntitySet, sBindingPath).then(function(oResponse) {
							return resolve({
								newContext: oResponse.context,
								tableBindingPath: sTableBindingPath
							});
						}, handleError.bind(null, MessageUtils.operations.addEntry, reject));
					} else {
						var oNewContext = oModel.createEntry(sBindingPath, {
							batchGroupId: "Changes",
							changeSetId: "Changes"
						});
						return resolve({
							newContext: oNewContext,
							tableBindingPath: sTableBindingPath
						});
					}
				});
			}

			return {
				editEntity: editEntity,
				deleteEntity: deleteEntity,
				deleteEntities: deleteEntities,
				modifyEntity: modifyEntity,
				saveEntity: saveEntity,
				activateDraftEntity: activateDraftEntity,
				callAction: callAction,
				addEntry: addEntry
			};
		}

		return BaseObject.extend(
			"sap.suite.ui.generic.template.lib.CRUDManager.js", {
				constructor: function(oController, oComponentUtils, oServices, oCommonUtils, oBusyHelper) {
					jQuery.extend(this, getMethods(oController, oComponentUtils, oServices, oCommonUtils, oBusyHelper));
				}
			});
	});