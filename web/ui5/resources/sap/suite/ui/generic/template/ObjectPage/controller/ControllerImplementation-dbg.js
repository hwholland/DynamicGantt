sap.ui
	.define(
		["sap/ui/base/Object", "sap/ui/core/format/DateFormat", "sap/ui/core/routing/HashChanger", "sap/m/ActionSheet", "sap/m/Button",
			"sap/m/MessageBox", "sap/m/MessageToast", "sap/ui/model/json/JSONModel", "sap/ushell/ui/footerbar/AddBookmarkButton",
			"sap/ui/table/AnalyticalTable", "sap/ui/generic/app/navigation/service/SelectionVariant",
			"sap/suite/ui/generic/template/lib/MessageButtonHelper",
			"sap/suite/ui/generic/template/ObjectPage/extensionAPI/ExtensionAPI", "sap/suite/ui/generic/template/lib/MessageUtils"
		],
		function(BaseObject, DateFormat, HashChanger, ActionSheet, Button, MessageBox, MessageToast, JSONModel, AddBookmarkButton,
			AnalyticalTable, SelectionVariant, MessageButtonHelper, ExtensionAPI, MessageUtils) {
			"use strict";

			return {
				getMethods: function(oTemplateUtils, oController) {
					var oState = {}; // contains attributes oSmartFilterbar and oSmartTable. Initialized in onInit.
					var bIsObjectRoot; // will currently be set first time, when edit button is pressed
					var oMessageButtonHelper;

					// Helper Functions
					function handleError(sOperation, reject, oError, mParameters) {
						MessageUtils.handleError(sOperation, oController, oTemplateUtils.oCommonUtils.getContentDensityClass(), oTemplateUtils.oServices, oError, mParameters);
						return (reject || jQuery.noop)(oError);
					}

					function setEditable(bIsEditable) {
						var oUIModel = oController.getView().getModel("ui");
						oUIModel.setProperty("/editable", bIsEditable);
						if (!oTemplateUtils.oCommonUtils.isDraftEnabled() && bIsObjectRoot) {
							oTemplateUtils.oComponentUtils.setEditableNDC(bIsEditable);
						}
					}
					
					function fnProcessNonDraftDataLossConfirmationAndFunction(fnProcessFunction) {
						// DataLost Popup only for Non-Draft
						if (!oTemplateUtils.oCommonUtils.isDraftEnabled()) {
							if (oController.getView().getModel().hasPendingChanges()) {
								oTemplateUtils.oCommonUtils.dataLossConfirmation(function() {
									setEditable(false);
									oController.getView().getModel().resetChanges();
									//Notification for reuse components and extensions
									oTemplateUtils.oComponentUtils.fire(oController, "AfterCancel", {});
									fnProcessFunction();
								});
								return;
							}
							setEditable(false);
						}
						fnProcessFunction();
					}

					function fnOnShareObjectPageEmailPress(sObjectTitle, sObjectSubtitle) {
						var sEmailSubject = sObjectTitle;
						if (sObjectSubtitle) {
							sEmailSubject = sEmailSubject + " - " + sObjectSubtitle;
						}
						sap.m.URLHelper.triggerEmail(null, sEmailSubject, document.URL);
					}

					function fnOnShareObjectPageInJamPress(sObjectTitle, sObjectSubtitle) {
						var oShareDialog = sap.ui.getCore().createComponent({
							name: "sap.collaboration.components.fiori.sharing.dialog",
							settings: {
								object: {
									id: document.URL,
									share: sObjectTitle + " " + sObjectSubtitle
								}
							}
						});
						oShareDialog.open();
					}

					function getObjectHeader() {
						var oObjectPage = oController.byId("objectPage");
						return oObjectPage.getHeaderTitle();
					}

					function onShareObjectPageActionButtonPress(oEvent) {
						var oShareActionSheet = oTemplateUtils.oCommonUtils.getDialogFragment(
							"sap.suite.ui.generic.template.ObjectPage.view.fragments.ShareSheet", {
								shareEmailPressed: function() {
									var oShareModel = oShareActionSheet.getModel("share");
									fnOnShareObjectPageEmailPress(oShareModel.getProperty("/objectTitle"), oShareModel
										.getProperty("/objectSubtitle"));
								},
								shareJamPressed: function() {
									var oShareModel = oShareActionSheet.getModel("share");
									fnOnShareObjectPageInJamPress(oShareModel.getProperty("/objectTitle"), oShareModel
										.getProperty("/objectSubtitle"));
								}

							}, "share", function(oFragment, oShareModel) {
								var oResource = sap.ui.getCore().getLibraryResourceBundle("sap.m");
								oShareModel.setProperty("/emailButtonText", oResource.getText("SEMANTIC_CONTROL_SEND_EMAIL"));
								oShareModel.setProperty("/jamButtonText", oResource.getText("SEMANTIC_CONTROL_SHARE_IN_JAM"));
								oShareModel
									.setProperty("/bookmarkButtonText", oResource.getText("SEMANTIC_CONTROL_SAVE_AS_TILE"));
								var fnGetUser = jQuery.sap.getObject("sap.ushell.Container.getUser");
								oShareModel.setProperty("/jamVisible", !!fnGetUser && fnGetUser().isJamActive());
							});
						var oShareModel = oShareActionSheet.getModel("share");
						var oObjectHeader = getObjectHeader();
						oShareModel.setProperty("/objectTitle", oObjectHeader.getProperty("objectTitle"));
						oShareModel.setProperty("/objectSubtitle", oObjectHeader.getProperty("objectSubtitle"));
						oShareModel.setProperty("/bookmarkCustomUrl", document.URL);
						oShareActionSheet.openBy(oEvent.getSource());
					}

					function getRelatedAppsSheet() {
						var oRelatedAppsSheet = oTemplateUtils.oCommonUtils.getDialogFragment(
							"sap.suite.ui.generic.template.ObjectPage.view.fragments.RelatedAppsSheet", {
								buttonPressed: function(oEvent) {
									var oButton = oEvent.getSource();
									var oButtonsContext = oButton.getBindingContext("buttons");
									var oLink = oButtonsContext.getProperty("link");
									var oParam = oButtonsContext.getProperty("param");
									var str = oLink.intent;
									var sSemanticObject = str.substring(1, str.indexOf("-"));
									var sPos = (str.indexOf("~") > -1) ? str.indexOf("~") : str.length;
									var sAction = str.substring(str.indexOf("-") + 1, sPos);
									var oNavArguments = {
										target: {
											semanticObject: sSemanticObject,
											action: sAction
										},
										params: oParam
									};
									sap.ushell.Container.getService("CrossApplicationNavigation").toExternal(oNavArguments);
								}
							}, "buttons");
						return oRelatedAppsSheet;
					}

					function showDeleteMsgBox() {
						var oComponent = oController.getOwnerComponent();
						var sNavigationProperty = oComponent.getNavigationProperty();
						var oUtils = oTemplateUtils.oCommonUtils;
						var oPageHeader = oController.byId("objectPageHeader");

						var sParam2 = oPageHeader.getProperty("objectSubtitle") ? oPageHeader.getProperty("objectSubtitle") : '';
						var aParams = [oController.byId("objectTypeName").getText(), oPageHeader.getProperty("objectTitle").trim(), sParam2];
						var sMessageText = oUtils.getText("DELETE_WITH_OBJECTINFO", aParams);

						MessageBox.show(sMessageText, {
							icon: MessageBox.Icon.WARNING,
							styleClass: oTemplateUtils.oCommonUtils.getContentDensityClass(),
							title: oUtils.getText("DELETE"),
							actions: [MessageBox.Action.DELETE, MessageBox.Action.CANCEL],
							onClose: function(oAction) {
								if (oAction === MessageBox.Action.DELETE) {
									var oDeleteEntityPromise = oTemplateUtils.oServices.oCRUDManager.deleteEntity();
									oDeleteEntityPromise.then(function() {
										oTemplateUtils.oServices.oNavigationController.setParentToDirty(oComponent, sNavigationProperty);
										oTemplateUtils.oServices.oNavigationController.unbindChildren(oComponent);

										// document was deleted, go back to previous page
										window.history.back();
									});
									var oEvent = {
										deleteEntityPromise: oDeleteEntityPromise
									};
									oTemplateUtils.oComponentUtils.fire(oController, "AfterDelete", oEvent);
								}
							}
						});
					}

					function fnStartEditing(oResult){
						var oDraft, oContext;
						if (oResult) {
						    oContext = oResult.context || oResult;
						    if (oTemplateUtils.oServices.oDraftController.getDraftContext().hasDraft(oContext)) {
								oTemplateUtils.oServices.oNavigationController.setRootPageToDirty();
								oDraft = oResult.context && oResult.context.context || oResult.context || oResult;
					        }
						}
						if (oDraft) {
							// navigate to draft
							oTemplateUtils.oServices.oNavigationController.navigateToContext(oDraft, undefined, true);
						} else {
							setEditable(true);
						}
					}

					function fnEditEntity(bPreserveChanges) {
						oTemplateUtils.oServices.oCRUDManager.editEntity(bPreserveChanges).then(
								function(oResult) {
									if (oResult && oResult.unsavedChanges) {
										//check edit status: rc409 can also mean status = locked
										var oComponent = oController.getOwnerComponent();
										var sEntitySet = oComponent.getEntitySet();
										// check whether Draft exists
										var oDraftContext = oTemplateUtils.oServices.oDraftController.getDraftContext();
										if (oDraftContext.isDraftRoot(sEntitySet)) {
											// In case of DeepLink the DraftAdministrativeData still not retrieved
											var oBindingContext = oComponent.getBindingContext();
											var oModel = oComponent.getModel();
											oModel.read(oBindingContext.getPath(), {
												urlParameters: {
													"$expand": "DraftAdministrativeData"
												},
												success: function(oResponseData) {
													// check whether lock by other user is expired
													if (!oResponseData.DraftAdministrativeData.DraftIsProcessedByMe &&
															!oResponseData.DraftAdministrativeData.InProcessByUser) {

														// start "Expired Lock Dialog", because lock by other user is expired
														fnExpiredLockDialog(oResponseData.DraftAdministrativeData.CreatedByUserDescription || oResponseData.DraftAdministrativeData.CreatedByUser);
													} else if (!oResponseData.DraftAdministrativeData.DraftIsProcessedByMe && oResponseData.DraftAdministrativeData.InProcessByUser) {
														handleError(MessageUtils.operations.editEntity, null, oResult, oResult);
													} else {
														//start editing
														fnStartEditing(oResult);
													}
												}
											});
											return; // in this case editing is delayed until admin data have been read successfully
										} else {
											handleError(MessageUtils.operations.editEntity, null, oResult, oResult);
										}
									} else {
										//start editing
										fnStartEditing(oResult);
									}
								}
						);
					}

					function fnExpiredLockDialog(sCreatedByUser) {
						var oUnsavedChangesDialog = oTemplateUtils.oCommonUtils.getDialogFragment(
							"sap.suite.ui.generic.template.ObjectPage.view.fragments.UnsavedChangesDialog", {
								onEdit: function() {
									oUnsavedChangesDialog.close();
									fnEditEntity();
								},
								onCancel: function() {
									oUnsavedChangesDialog.close();
								}
							}, "Dialog");
						var oDialogModel = oUnsavedChangesDialog.getModel("Dialog");
						var sDialogContentText = oTemplateUtils.oCommonUtils.getText("DRAFT_LOCK_EXPIRED", [sCreatedByUser]);
						oDialogModel.setProperty("/unsavedChangesQuestion", sDialogContentText);
						oUnsavedChangesDialog.open();
					}

					var sDefaultObjectTitleForCreated; // instantiated on demand

					function getDefaultObjectTitleForCreated() {
						sDefaultObjectTitleForCreated = sDefaultObjectTitleForCreated || oTemplateUtils.oCommonUtils
							.getText("NEW_OBJECT", [oController.byId("objectTypeName").getText()]);
						return sDefaultObjectTitleForCreated;
					}

					// Helper functions for view-proxy for component
					var oHashChanger; // initialized on first use
					function fnBindBreadcrumbs(aSections) {
						if (!aSections.length) {
							return;
						}

						// there's at least one section left - create / bind breadcrumbs
						var oTitle = getObjectHeader();
						var aBreadCrumbs = oTitle && oTitle.getBreadCrumbsLinks();

						if (!aBreadCrumbs || !aBreadCrumbs.length) {
							return;
						}

						oHashChanger = oHashChanger || HashChanger.getInstance();

						var sBreadCrumbLink = "",
							oCustomData, sEntitySet, sSection, oLink, aSubSections, sCanonicalUrl, sHash;
						for (var i = 0; i < aSections.length; i++) {
							sSection = aSections[i];
							sBreadCrumbLink = sBreadCrumbLink + "/" + sSection;

							if (aBreadCrumbs[i]) {
								oLink = aBreadCrumbs[i];

								/*
								 * we don't use the navigation path but the canonical URL. The reason for this is that there's no
								 * join done in the backend, therefore the GET-request is much faster in deeper breadcrumbs. Also
								 * the UI5 Odata model keeps track of already requested ressources, so if user navigates from the
								 * top level there's no additional request, if he uses a bookmark the request is only done once. We
								 * assume that the key of the navigation path is the same as the canonical URL. This is an
								 * assumption that does not fit to all ODATA services (but 99% of them) - BUT: Smart Templates and
								 * the navigation controller already takes this assumption. Once this is changed also this coding
								 * needs to be changed. Ideally with a configuration as most of the ODATA services have a big
								 * benefit through reading with the canonical URL
								 */

								oCustomData = oLink.getCustomData() && oLink.getCustomData()[0];
								if (oCustomData && oCustomData.getKey() === "entitySet") {
									sEntitySet = oCustomData.getValue();
									aSubSections = sSection.split("(");
									if (aSubSections && aSubSections[1]) {

										if (oHashChanger.hrefForAppSpecificHash) {
											// shell active, ask shell for hash
											sHash = oHashChanger.hrefForAppSpecificHash(sBreadCrumbLink);
										} else {
											sHash = "#" + sBreadCrumbLink;
										}

										sCanonicalUrl = "/" + sEntitySet + "(" + aSubSections[1];
										oLink.setHref(sHash);
										oLink.bindElement(sCanonicalUrl);
									}
								}
							}
						}
					}

					function fnRefreshFacets(mRefreshInfos) {
						oController.getView().getContent()[0].getContent()[0].getSections().forEach(function (oSection) {
							oSection.getSubSections().forEach(function (oSubSection) {
								oSubSection.getBlocks().forEach(function (oBlock) {
									oBlock.getContent().forEach(function (oContent) {
										if (oContent instanceof sap.ui.comp.smarttable.SmartTable) {
											if (mRefreshInfos[oContent.getTableBindingPath()]) {
												oContent.rebindTable();
												if (oTemplateUtils.oCommonUtils.isDraftEnabled()) {
													oController.getOwnerComponent().getAppComponent().getApplicationController().executeSideEffects(oController.getOwnerComponent().getBindingContext(), [], [oContent.getTableBindingPath()]);
												}
											}
										}
									});
								});
							});
						});
					}


					function setLockButtonVisible(bVisible) {
						var oLockButton = sap.ui.getCore().byId(getObjectHeader().getId() + "-lock");
						oLockButton.setVisible(bVisible);
					}

					function fnDraftResume(oSiblingContext, oActiveEntity, oDraftAdministrativeData) {
						var oSiblingEntity = oSiblingContext.getObject();
						if (!oSiblingEntity || !oSiblingEntity.hasOwnProperty("IsActiveEntity") || oSiblingEntity.IsActiveEntity !== false) {
							return;
						}

						var oModel = oController.getView().getModel();
						var oMetaModel = oModel.getMetaModel();
						var oModelEntitySet = oMetaModel.getODataEntitySet(oController.getOwnerComponent().getEntitySet());
						var oDataEntityType = oMetaModel.getODataEntityType(oModelEntitySet.entityType);

						var sType = "";
						var sPath;
						// TODO: not use String directly but Thomas Ch. helpers, sometimes the value is behind a path
						// to do so best way would be to extract this in a DraftResumeDialoge
						// determining the value from an annotation path is not yet supported
						if (oDataEntityType["com.sap.vocabularies.Common.v1.Label"]) {
							sType = oDataEntityType["com.sap.vocabularies.Common.v1.Label"].String;
							if (sType === "") {
								sPath = oDataEntityType["com.sap.vocabularies.Common.v1.Label"].Path;
								if (sPath) {
									sType = oActiveEntity[sPath];
								}
							}
						}
						if (oDataEntityType["com.sap.vocabularies.UI.v1.HeaderInfo"] && oDataEntityType["com.sap.vocabularies.UI.v1.HeaderInfo"].TypeName) {
							if (sType === "") {
								sType = oDataEntityType["com.sap.vocabularies.UI.v1.HeaderInfo"].TypeName.String;
							}
							if (sType === "") {
								sPath = oDataEntityType["com.sap.vocabularies.UI.v1.HeaderInfo"].TypeName.Path;
								if (sPath) {
									sType = oActiveEntity[sPath];
								}
							}
						}

						var sObjectKey = "";
						var aSemKey = oDataEntityType["com.sap.vocabularies.Common.v1.SemanticKey"];
						for (var i in aSemKey) {
							var oPropertyRef = aSemKey[i];
							if (sObjectKey === "") {
								sObjectKey = oActiveEntity[oPropertyRef.PropertyPath];
							} else {
								sObjectKey = sObjectKey + "-" + oActiveEntity[oPropertyRef.PropertyPath];
							}
						}

						var sChangedAt = "-";
						if (oDraftAdministrativeData && oDraftAdministrativeData.LastChangeDateTime !== null) {
							var oDateFormatter = DateFormat.getDateTimeInstance({
								pattern: "MMMM d, yyyy HH:mm",
								style: "long"
							});
							sChangedAt = oDateFormatter.format(oDraftAdministrativeData.LastChangeDateTime);
						}

						var aParams = [sType, sObjectKey, sChangedAt];
						var sDraftFoundText = oTemplateUtils.oCommonUtils.getText("DRAFT_FOUND_RESUME", aParams);

						var oDialogModel;
						var oResumeDialog = oTemplateUtils.oCommonUtils.getDialogFragment(
							"sap.suite.ui.generic.template.ObjectPage.view.fragments.DraftResumeDialog", {
								onDraftResume: function() {
									oResumeDialog.close();
									// Do not use variable oSiblingContext directly, because this will always be the instance used
									// at the first use of this fragment!
									oTemplateUtils.oServices.oNavigationController.navigateToContext(
										oDialogModel.getProperty("/siblingContext"), null, true);
								},
								onDraftDiscard: function() {
									oResumeDialog.close();
									// enable the buttons
									oController.getView().getModel("ui").setProperty("/enabled", true);
									// delete the draft node
									oTemplateUtils.oServices.oCRUDManager.deleteEntity(true);
									setLockButtonVisible(false);
									// Do not use variable oActiveEntity directly, because this will always be the instance used at
									// the first use of this fragment!
									oDialogModel.getProperty("/activeEntity").HasDraftEntity = false;
									// refresh the nodes
									var oContainers = oTemplateUtils.oServices.oNavigationController.getViews();
									for (var sContainer in oContainers) {
										var oContainerComponent = oContainers[sContainer].getComponentInstance();
										if (oContainerComponent.setIsRefreshRequired) {
											oContainerComponent.setIsRefreshRequired(true);
										}
									}
								},
								onResumeDialogClosed: function() {
									// support garbage collection
									oDialogModel.setProperty("/siblingContext", null);
									oDialogModel.setProperty("/activeEntity", null);
								}
							}, "Dialog");
						oDialogModel = oResumeDialog.getModel("Dialog");
						oDialogModel.setProperty("/draftResumeText", sDraftFoundText);
						oDialogModel.setProperty("/siblingContext", oSiblingContext);
						oDialogModel.setProperty("/activeEntity", oActiveEntity);
						oResumeDialog.open();
					}

					function getSelectionVariant() {
						// oTemplateUtils, oController
						// if there is no selection we pass an empty one with the important escaping of ", passing "" or
						// null...was not possible
						// "{\"SelectionVariantID\":\"\"}";
						var sResult = "{\"SelectionVariantID\":\"\"}";

						/*
						 * rules don't follow 1:1 association, only header entity type fields don't send fields with empty
						 * values also send not visible fields remove Ux fields (e.g. UxFcBankStatementDate) send all kinds of
						 * types String, Boolean, ... but stringify all types
						 */

						var oComponent = oController.getOwnerComponent();
						var sEntitySet = oComponent.getEntitySet();
						var model = oComponent.getModel();
						var oMetaModel = model.getMetaModel();
						var oEntitySet = oMetaModel.getODataEntitySet(sEntitySet);
						var oEntityType = oMetaModel.getODataEntityType(oEntitySet.entityType);
						var aAllFieldsMetaModel = oEntityType.property;

						// collect the names of attributes to be deleted (objects with existing sap:field-control attribute)
						var aFieldsToBeIgnored = [];
						for (var x in aAllFieldsMetaModel) {
							var controlname = aAllFieldsMetaModel[x]["sap:field-control"];
							if (controlname && aFieldsToBeIgnored.indexOf(controlname) < 0) {
								aFieldsToBeIgnored.push(aAllFieldsMetaModel[x]["sap:field-control"]);
							}
						}

						var context = oController.getView().getBindingContext();
						var object = context.getObject();

						var oSelectionVariant = new SelectionVariant();
						for (var i in aAllFieldsMetaModel) {
							var type = aAllFieldsMetaModel[i].type;
							var name = aAllFieldsMetaModel[i].name;
							var value = object[aAllFieldsMetaModel[i].name];

							if (aFieldsToBeIgnored.indexOf(name) > -1) {
								continue;
							}

							if (name && (value || type === "Edm.Boolean")) { // also if boolean is false this must be sent
								if (type === "Edm.Time" && value.ms !== undefined) { // in case of Time an object is returned
									value = value.ms;
								}
								if (typeof value !== "string") {
									value = value.toString();
								}
								oSelectionVariant.addParameter(name, value);
							}
						}

						sResult = oSelectionVariant.toJSONString();
						return sResult;
					}

					function getImageDialog() {
						var oImageDialog = oController.byId("imageDialog") || oTemplateUtils.oCommonUtils.getDialogFragment(
							"sap.suite.ui.generic.template.ObjectPage.view.fragments.ImageDialog", {
								onImageDialogClose: function() {
									oImageDialog.close();
								}
							}, "headerImage");

						return oImageDialog;
					}

					var mEntriesFromPreviousPage = {};
					var oDataFromPreviousPage;

					function onComponentActivate(sBindingPath) {
						var oDisplayObject = oTemplateUtils.oComponentUtils.getCurrentDisplayObject();
						if (oDisplayObject.isBack) {
							oDataFromPreviousPage = mEntriesFromPreviousPage[sBindingPath];
						} else {
							oDataFromPreviousPage = oDisplayObject.dataFromLastPage;
							mEntriesFromPreviousPage[sBindingPath] = oDataFromPreviousPage;
						}
						oMessageButtonHelper.adaptToContext(sBindingPath);
                        // set visibility of up/down buttons based for back navigation scenario
                        computeAndSetVisibleParamsForNavigationBtns();
					}

					// This method returns the data provided form the page this page was originally reached by.
					// The data must have been provided by method addDataForNextPage of class sap.suite.ui.generic.template.lib.Application.
					// Note that these data can normally also be retrieved via method getCurrentDisplayObject of the same class.
					// The two versions differ, when the page is reached via a back navigation.
					// Assume the navigation is as follows: A -> B -> C -> B, where the last navigation is a back navigation.
					// In this case getCurrentDisplayObject provides the data provided by C, whereas getDataFromPreviousPage still provides
					// the data provided by A.

                    function getDataFromPreviousPage() {
                        return oDataFromPreviousPage;
                    }

                    function computeAndSetVisibleParamsForNavigationBtns() {
                        var oDataFromLastOPage = getDataFromPreviousPage() || oTemplateUtils.oComponentUtils.getCurrentDisplayObject().dataFromLastPage;
                        var oComponent = oController.getOwnerComponent();
                        var oTemplatePrivateModel = oComponent.getModel("_templPriv");
						if (!oTemplatePrivateModel.getProperty("/objectPage")) {
							oTemplatePrivateModel.setProperty("/objectPage", {});
						}
						var oResource = sap.ui.getCore().getLibraryResourceBundle("sap.m");
						oTemplatePrivateModel.setProperty("/objectPage/navDownTooltip", oResource.getText("FACETFILTER_NEXT"));
						oTemplatePrivateModel.setProperty("/objectPage/navUpTooltip", oResource.getText("FACETFILTER_PREVIOUS"));

                        if (oDataFromLastOPage && oDataFromLastOPage.nextObjectPageInfo) {
                            var oCurrentObjectNavPage = oDataFromLastOPage.nextObjectPageInfo;

                            var bNavUpEnabled, bNavDownEnabled;

                            var aAllContexts = oCurrentObjectNavPage.objectPageNavigationContexts;

                            bNavDownEnabled = !!aAllContexts && ((oCurrentObjectNavPage.selectedRelativeIndex) !== oCurrentObjectNavPage.endIndex);
                            bNavUpEnabled = !!aAllContexts && !(oCurrentObjectNavPage.selectedRelativeIndex <= 0 && oCurrentObjectNavPage.startIndex <= 0);
                            oTemplatePrivateModel.setProperty("/objectPage/navUpEnabled", bNavUpEnabled);
                            oTemplatePrivateModel.setProperty("/objectPage/navDownEnabled", bNavDownEnabled);


                            // if both buttons are disabled - hide them all
                            if (!bNavDownEnabled && !bNavUpEnabled) {
                                oTemplatePrivateModel.setProperty("/objectPage/navBtnsVisible", false);
                            } else {
                                oTemplatePrivateModel.setProperty("/objectPage/navBtnsVisible", true);
                            }
                        } else {
                            oTemplatePrivateModel.setProperty("/objectPage/navUpEnabled", false);
                            oTemplatePrivateModel.setProperty("/objectPage/navDownEnabled", false);
                            oTemplatePrivateModel.setProperty("/objectPage/navBtnsVisible", false);
                        }
                    }
					// Generation of Event Handlers
					return {
						onInit: function() {
							oTemplateUtils.oCommonUtils.executeGlobalSideEffect();
							// Register myself at my component and provide suitable functions that may be called by it
							oTemplateUtils.oComponentAPI.registerView({
								onComponentActivate: onComponentActivate,
								draftResume: fnDraftResume,
								bindBreadCrumbs: fnBindBreadcrumbs,
								isDraftEnabled: oTemplateUtils.oCommonUtils.isDraftEnabled,
								refreshFacets: fnRefreshFacets
							});
							oMessageButtonHelper = new MessageButtonHelper(oTemplateUtils.oCommonUtils, oController);
							oState.messageButtonHelper = oMessageButtonHelper;
						},

						handlers: {
							addEntry: function(oEvent) {
								oTemplateUtils.oCommonEventHandlers.addEntry(oEvent);
							},

							onBack: function() {
								fnProcessNonDraftDataLossConfirmationAndFunction(function() {
									window.history.back();
								});
								
							},
							//Cancel event is only triggered in non-draft scenario. For draft see onDiscardDraft
							onCancel: function() {
								setEditable(false);
								oController.getView().getModel().resetChanges();
								//Notification for reuse components and extensions
                                oTemplateUtils.oComponentUtils.fire(oController, "AfterCancel", {});
								if (oTemplateUtils.oComponentUtils.getCreateMode()) {
									// in case of create mode navigate back to list
									window.history.back();
								}
							},

							onContactDetails: function(oEvent) {
								oTemplateUtils.oCommonEventHandlers.onContactDetails(oEvent);
							},
							onPressDraftInfo: function(oEvent) {
								var oBindingContext = oController.getView().getBindingContext();
								var oLockButton = sap.ui.getCore().byId(
									oEvent.getSource().getId() + (oEvent.getId() === "markChangesPress" ? "-changes" : "-lock"));

								oTemplateUtils.oCommonUtils.showDraftPopover(oBindingContext, oLockButton);
							},
							onShareObjectPageActionButtonPress: onShareObjectPageActionButtonPress,
							onRelatedApps: function(oEvent) {
								var oButton = oEvent.getSource();
								var oParsedUrl = sap.ushell.Container.getService("URLParsing").parseShellHash(
									document.location.hash);
								var oLinks = sap.ushell.Container.getService("CrossApplicationNavigation").getSemanticObjectLinks(
									oParsedUrl.semanticObject);
								var oActionSheet = getRelatedAppsSheet();
								var oButtonsModel = oActionSheet.getModel("buttons");
								oButtonsModel.setProperty("/buttons", []);
								oActionSheet.openBy(oButton);
								oLinks
									.done(function(aLinks) {
										var oMetaModel = oController.getOwnerComponent().getModel().getMetaModel();
										var oContext = oController.getView().getBindingContext();
										var oEntity = oContext.getObject();
										var sEntityType = oEntity.__metadata.type;
										var oDataEntityType = oMetaModel.getODataEntityType(sEntityType);
										var aSemKey = oDataEntityType["com.sap.vocabularies.Common.v1.SemanticKey"];
										var oParam = {};
										// var oSemKeyParam = {};
										if (aSemKey && aSemKey.length > 0) {
											for (var j = 0; j < aSemKey.length; j++) {
												var sSemKey = aSemKey[j].PropertyPath;
												if (!oParam[sSemKey]) {
													oParam[sSemKey] = [];
													oParam[sSemKey].push(oEntity[sSemKey]);
												}
											}
										} else {
											// Fallback if no SemanticKey
											for (var k in oDataEntityType.key.propertyRef) {
												var sObjKey = oDataEntityType.key.propertyRef[k].name;
												if (!oParam[sObjKey]) {
													oParam[sObjKey] = [];
													oParam[sObjKey].push(oEntity[sObjKey]);
												}
											}
										}
										// filter current semanticObject-action
										var aButtons = [];
										var sCurrentAction = "#" + oParsedUrl.semanticObject + "-" + oParsedUrl.action;
										for (var i = 0; i < aLinks.length; i++) {
											var oLink = aLinks[i];
											if (oLink.intent != sCurrentAction) {	
												aButtons.push({
													enabled: true, // used in declarative binding
													text: oLink.text, // used in declarative binding
													link: oLink, // used by the event handler
													param: oParam
													// used by the event handler
												});
											}
										}
										if (aButtons.length === 0) {
											aButtons.push({
												enabled: false, // used in declarative binding
												text: oTemplateUtils.oCommonUtils.getText("NO_RELATED_APPS")
												// used in declarative binding
											});
										}
										oButtonsModel.setProperty("/buttons", aButtons);
									});
							},
                            handleNavigateToObject: function (oContext, oCurrentObjectNavPage) {
                                if (oCurrentObjectNavPage) {
                                    // Get navigation property.. to be used in construction of new URL
                                    if (oContext !== null && oContext !== undefined && oCurrentObjectNavPage) {
                                        var sNavigationProperty = oCurrentObjectNavPage.NavPropertyToUse;
                                        // set data for next page
                                        oTemplateUtils.oComponentUtils.addDataForNextPage({
                                            "nextObjectPageInfo": oCurrentObjectNavPage
                                        });

                                        if (oCurrentObjectNavPage.nested) {
                                            // for the case where you navigate to an object page from an object page
                                            oTemplateUtils.oServices.oNavigationController.navigateToContext(oContext, sNavigationProperty, true);
                                        } else {
                                            oTemplateUtils.oServices.oNavigationController.navigateToContext(oContext, null, true);
                                        }
                                    }
                                }
                            },

                            handleShowNextObject: function (oEvent) {
                                // now navigate to next object page
                                var oDataFromLastPage = getDataFromPreviousPage() || oTemplateUtils.oComponentUtils.getCurrentDisplayObject().dataFromLastPage;
                                if (oDataFromLastPage && oDataFromLastPage.nextObjectPageInfo) {
                                    var oCurrentObjectNavPage = jQuery.extend(true, {}, oDataFromLastPage.nextObjectPageInfo);

                                    var oListBinding = oCurrentObjectNavPage.listBinding;
                                    var iEndIdx = oCurrentObjectNavPage.endIndex;
                                    var iNextIdx = oCurrentObjectNavPage.selectedRelativeIndex + 1;
                                    var aAllContexts = oCurrentObjectNavPage.objectPageNavigationContexts;
                                    var iTableMaxCount = oCurrentObjectNavPage.tableMaxItems;
                                    var iTableGrowingIncrement = oCurrentObjectNavPage.growingThreshold;
                                    var oComponent = oController.getOwnerComponent();
                                    var oTemplatePrivateModel = oComponent.getModel("_templPriv");

                                    if (iNextIdx && aAllContexts) {
                                        var oNextContext = aAllContexts[iNextIdx];

                                        if (oNextContext &&
                                            oNextContext.getPath &&
                                            iNextIdx < iEndIdx &&
                                            iNextIdx !== iTableMaxCount - 1) {
                                            oCurrentObjectNavPage.selectedRelativeIndex = iNextIdx;
                                            oController._templateEventHandlers.handleNavigateToObject(oNextContext, oCurrentObjectNavPage);
                                        } else if (iNextIdx === iEndIdx &&
                                            iNextIdx !== iTableMaxCount - 1) {
                                            var newEndIdx = iEndIdx + 1 + iTableGrowingIncrement;

                                            var fetchAndUpdateRecords = function (mParameters) {
                                                // get new fetched contexts and do stuff
                                                var aAllContexts = mParameters.oSource.getContexts(0, newEndIdx);
                                                oCurrentObjectNavPage.objectPageNavigationContexts = aAllContexts;
                                                oCurrentObjectNavPage.endIndex = newEndIdx;
                                                oNextContext = aAllContexts[iNextIdx];

                                                if (oNextContext && oNextContext.getPath) {
                                                    // enable the down button
                                                    oTemplatePrivateModel.setProperty("/objectPage/navDownEnabled", true);
                                                }
                                                oListBinding.detachDataReceived(fetchAndUpdateRecords);
                                            };

                                            oListBinding.attachDataReceived(fetchAndUpdateRecords);

                                            oListBinding.loadData(0, newEndIdx);

                                            // also.. navigate
                                            oCurrentObjectNavPage.selectedRelativeIndex = iNextIdx;
                                            oController._templateEventHandlers.handleNavigateToObject(oNextContext, oCurrentObjectNavPage);
                                        } else if (iNextIdx === iTableMaxCount - 1) {
                                            // just navigate
                                            oCurrentObjectNavPage.selectedRelativeIndex = iNextIdx;
                                            oController._templateEventHandlers.handleNavigateToObject(oNextContext, oCurrentObjectNavPage);
                                        }
                                    }
                                }
                            },

                            handleShowPrevObject: function (oEvent) {
                                // get data from "temp" model
                                var oDataFromLastPage = getDataFromPreviousPage() || oTemplateUtils.oComponentUtils.getCurrentDisplayObject().dataFromLastPage;
                                if (oDataFromLastPage && oDataFromLastPage.nextObjectPageInfo) {
                                    var oCurrentObjectNavPage = jQuery.extend(true, {}, oDataFromLastPage.nextObjectPageInfo);
                                    var iNextIdx = oCurrentObjectNavPage.selectedRelativeIndex - 1;
                                    var aAllContexts = oCurrentObjectNavPage.objectPageNavigationContexts;

                                    if (iNextIdx && aAllContexts) {
                                        var oNextContext = aAllContexts[iNextIdx];
                                        if (oNextContext &&
                                            oNextContext.getPath) {
                                            oCurrentObjectNavPage.selectedRelativeIndex = iNextIdx;
                                            oController._templateEventHandlers.handleNavigateToObject(oNextContext, oCurrentObjectNavPage);
                                        }
                                    }
                                }
                            },
							onShowMessages: function(oEvent) {
								oMessageButtonHelper.showMessagePopover(oEvent);
							},

							onEdit: function() {
								bIsObjectRoot = true; // temporarily logic until we know how to decide this in onInit

								// "Expired Lock Dialog" for "unsaved changes" in case of "lock of other user expired"
								// check whether Draft exists
								if (oTemplateUtils.oCommonUtils.isDraftEnabled) {
									var oDraftContext = oTemplateUtils.oServices.oDraftController.getDraftContext();
									var oComponent = oController.getOwnerComponent();
									var sEntitySet = oComponent.getEntitySet();
									if (oDraftContext.isDraftRoot(sEntitySet)) {
										//if edit action has preserveChanges parameter, directly start editing (with preserving changes)
										//otherwise, keep old logic (read DraftAdministrativeData first)
										var oBindingContext = oComponent.getBindingContext();
										if (oDraftContext.hasPreserveChanges(oBindingContext)){
											fnEditEntity(true); //add preserveChanges=true; consider unsaved changes
										} else {
											// In case of DeepLink the DraftAdministrativeData still is not retrieved
											var oModel = oComponent.getModel();
											oModel.read(oBindingContext.getPath(), {
												urlParameters: {
													"$expand": "DraftAdministrativeData"
												},
												success: function(oResponseData) {
													// check whether lock by other user is expired
													if (oResponseData.DraftAdministrativeData && !oResponseData.DraftAdministrativeData.DraftIsProcessedByMe && !oResponseData.DraftAdministrativeData
															.InProcessByUser) {
														// start "Expired Lock Dialog", because lock by other user is expired
														fnExpiredLockDialog(oResponseData.DraftAdministrativeData.CreatedByUserDescription || oResponseData.DraftAdministrativeData.CreatedByUser);
													} else {
														fnEditEntity();
													}
												}
											});
										}
										return;
									}
								}
								fnEditEntity(); //preserveChanges is not necessary in all other cases
							},

							// The event is only called in a non-draft scenario. For draft see onActivate
							onSave: function() {
								var oCurrentContext = oController.getView().getBindingContext();
								var oPendingChanges =  oController.getView().getModel().getPendingChanges();
								oPendingChanges = oPendingChanges && oPendingChanges[oCurrentContext.getPath().replace("/", "")] || {};
								var aPendingChanges = Object.keys(oPendingChanges) || [];

								var oSaveEntityPromise = oTemplateUtils.oServices.oCRUDManager.saveEntity();
								oSaveEntityPromise.then(function(oContext) {
									// switch to display mode
									if (!oTemplateUtils.oCommonUtils.isDraftEnabled() && bIsObjectRoot) {
										setEditable(false);
									}else if ( oTemplateUtils.oCommonUtils.isDraftEnabled() ){
										setEditable(false);
									}

									if (oTemplateUtils.oComponentUtils.getCreateMode()) {
										// in case of create mode navigate to new item
										if (oContext) {
											oTemplateUtils.oServices.oNavigationController.navigateToContext(oContext, undefined, true);
										}

										// setTimeout: assumption: needed because of navigation, navigationController should return a
										// promise better
										// sap.m.MessageToast - use via sap.ui.define?
										setTimeout(function() {
											MessageToast.show(oTemplateUtils.oCommonUtils.getText("OBJECT_CREATED")); // "Object was
											// created");
										}, 10);
									} else {
										MessageToast.show(oTemplateUtils.oCommonUtils.getText("OBJECT_SAVED")); // "Object was saved");
									  //for NON-Draf: navigate back after save if not root object
										if (!oTemplateUtils.oCommonUtils.isDraftEnabled() && !bIsObjectRoot) {
											window.history.back();
										}
									}

									if (oPendingChanges){
										oTemplateUtils.oServices.oApplicationController.executeSideEffects(oCurrentContext, aPendingChanges);
									}

								});
								var oEvent = {
									saveEntityPromise: oSaveEntityPromise
								};
								oTemplateUtils.oComponentUtils.fire(oController, "AfterSave", oEvent);
							},

							onActivate: function() {
								var oActivationPromise = oTemplateUtils.oServices.oCRUDManager.activateDraftEntity();
								oActivationPromise.then(function(oResponse) {
									MessageToast.show(oTemplateUtils.oCommonUtils.getText("OBJECT_SAVED"));
									if (oResponse && oResponse.context) {
										// Set Root to dirty
										oTemplateUtils.oServices.oNavigationController.setRootPageToDirty();
										oTemplateUtils.oServices.oNavigationController.unbindChildren(oController.getOwnerComponent());

										// navigate to activate document
										oTemplateUtils.oServices.oNavigationController.navigateToContext(
											oResponse.context, undefined, true);
									}
								});
								var oEvent = {
									activationPromise: oActivationPromise
								};
								oTemplateUtils.oComponentUtils.fire(oController, "AfterActivate", oEvent);
							},

							onChange: function(oEvent) {
								oTemplateUtils.oCommonEventHandlers.onChange(oEvent);
							},

							onDiscardDraft: function(oEvent) {
								oTemplateUtils.oCommonEventHandlers.onDiscardDraft(oEvent);
							},

							onDelete: function(oEvent) {
								showDeleteMsgBox();
							},

							onCallAction: function(oEvent) {
								var oComponent = oController.getOwnerComponent();
								var sNavigationProperty = oComponent.getNavigationProperty();

								var oCustomData = oTemplateUtils.oCommonUtils.getCustomData(oEvent);
								var aContext = [];
								aContext.push(oController.getView().getBindingContext());
								if (aContext[0] && oCustomData.Type === "com.sap.vocabularies.UI.v1.DataFieldForAction") {
									var mParameters = {
										functionImportPath: oCustomData.Action,
										contexts: aContext,
										sourceControl: "",
										label: oCustomData.Label,
										operationGrouping: oCustomData.OperationGrouping,
										navigationProperty: oController.getOwnerComponent().getNavigationProperty()
									};
									oTemplateUtils.oServices.oCRUDManager.callAction(mParameters).then(function(aResponses){
										var oResponse = aResponses && aResponses[0];
										if (oResponse && oResponse.response && oResponse.response.context && (!oResponse.actionContext || oResponse.actionContext && oResponse.response.context.getPath() !== oResponse.actionContext.getPath())){
											// set my parent page to dirty
											oTemplateUtils.oServices.oNavigationController.setParentToDirty(oComponent, sNavigationProperty);
										}
									});
								}
							},
							onCallActionFromList: function(oEvent) {
								oTemplateUtils.oCommonEventHandlers.onCallActionFromList(oEvent);
							},
							onBeforeRebindDetailTable: function(oEvent) {
								oTemplateUtils.oCommonEventHandlers.onBeforeRebindTable(oEvent);

								if (oEvent.getSource().getTable() instanceof AnalyticalTable) {
									var oBindingParams = oEvent.getParameter("bindingParams");
									oBindingParams.parameters.entitySet = oEvent.getSource().getEntitySet();
								}
							},
							onShowDetails: function(oEvent) {
								var oEventSource = oEvent.getSource();
								fnProcessNonDraftDataLossConfirmationAndFunction(function() {
									oTemplateUtils.oCommonEventHandlers.onShowDetails(oEventSource);
								});
							},
							onShowDetailsIntent: function(oEvent) {
								var oEventSource = oEvent.getSource();
								fnProcessNonDraftDataLossConfirmationAndFunction(function() {
									oTemplateUtils.oCommonEventHandlers.onShowDetailsIntent(oEventSource);
								});
							},
							onListNavigate: function(oEvent) {
								var oEventSource = oEvent.getSource();
								fnProcessNonDraftDataLossConfirmationAndFunction(function() {
									oTemplateUtils.oCommonEventHandlers.onListNavigate(oEventSource);
								});
							},
							onListNavigateIntent: function(oEvent) {
								var oEventSource = oEvent.getSource();
								fnProcessNonDraftDataLossConfirmationAndFunction(function() {
									oTemplateUtils.oCommonEventHandlers.onListNavigateIntent(oEventSource);
								});
							},
							onBeforeSemanticObjectLinkPopoverOpens: function(oEvent) {
								var oNavigationHandler = oTemplateUtils.oCommonUtils.getNavigationHandler();
								if (oNavigationHandler) {
									var sSelectionVariant = getSelectionVariant();
									var oParams = oEvent.getParameters();
									oNavigationHandler.processBeforeSmartLinkPopoverOpens(oParams, sSelectionVariant);
								} else {
									oEvent.getParameters().open();
								}
							},
							onDataReceived: function(oEvent) {
								var oPage = oController.getOwnerComponent().getAggregation("rootControl");
								var oSmartTable = oEvent.getSource().getTable();
								var oTableLengthText = oPage.byId(oSmartTable.sId + "-tableLengthText");

								// oTableLengthText is only available if long table feature is activated
								if (oTableLengthText) {
									var totalLength, visibleLength = 0;
									var oRowBinding = oSmartTable.getBinding("items"); // ResponsiveTable: binding is "items"
									if (!oRowBinding) {
										// GridTable or Analytical: binding is "rows"
										oRowBinding = oSmartTable.getBinding("rows");
									}

									totalLength = oRowBinding.getLength();
									if (totalLength > 5) {
										visibleLength = 5;
									} else {
										visibleLength = totalLength;
									}
									var oBundle = this.getView().getModel("i18n").getResourceBundle();
									oTableLengthText.setText(oBundle.getText("TABLE_LENGTH", [visibleLength, totalLength]));
								}
							},
							onShowAll: function(oEvent) {
								var oAppComponent = oController.getOwnerComponent().getAppComponent();
								var sEntitySet = oEvent.getSource().getParent().getParent().getEntitySet();
								var sNavProp = oTemplateUtils.oCommonUtils.getNavigationProperty(oAppComponent.getConfig().pages[0].pages, sEntitySet);
								oAppComponent.getNavigationController().navigateToContext(null, sNavProp);
							},
							onHeaderImagePress: function(oEvent) {
								var oImageDialog = getImageDialog();
								var oImageDialogModel = oImageDialog.getModel("headerImage");
								oImageDialogModel.setProperty("/src", oEvent.getSource().getSrc());

								if (sap.ui.Device.system.phone) {
									oImageDialog.setProperty("stretch", true);
								}

								oImageDialog.open();
							},
							onInlineDataFieldForAction: function(oEvent) {
								// Assuming that this action is triggered from an action inside a table row.
								// Also this action is intended for triggering an OData operation.
								// i.e: Action, ActionImport, Function, FunctionImport
								// We require some properties to be defined in the Button's customData:
								//   Action: Fully qualified name of an Action, ActionImport, Function or FunctionImport to be called
								//   Label: Used to display in error messages
								var oButton = oEvent.getSource();
								var oCustomData = oTemplateUtils.oCommonUtils.getElementCustomData(oButton);
								var oTable = oTemplateUtils.oCommonUtils.getParentTable(oButton);
								var sTablePath = oTable.getParent().getTableBindingPath();
								oTemplateUtils.oServices.oCRUDManager.callAction({
									functionImportPath: oCustomData.Action,
									contexts: [oButton.getBindingContext()],
									sourceControl: oTable,
									label: oCustomData.Label,
									operationGrouping: "",
									navigationProperty: ""
								}).then(function(aResponses) {
									if (aResponses) {
										var oResponse = aResponses[0];

										if (oResponse.response && oResponse.response.context && (!oResponse.actionContext || oResponse.actionContext && oResponse.response.context.getPath() !== oResponse.actionContext.getPath())) {
											oTemplateUtils.oServices.oNavigationController.setMeToDirty(this.getOwnerComponent(), sTablePath);
										}
									}
								});
							},
							onInlineDataFieldForIntentBasedNavigation: function(oEvent) {
								// Assuming that this action is triggered from an action inside a table row.
								// Also this action is intended for triggering an intent based navigation.
								// We require some properties to be defined in the Button's customData:
								//   Action: The view to be displayed within the application
								//   Label: Used to display in error messages
								//   SemanticOject: Application to navigate to
								var oButton = oEvent.getSource();
								var oCustomData = oTemplateUtils.oCommonUtils.getElementCustomData(oButton);
								var oNavigationHandler = oTemplateUtils.oCommonUtils.getNavigationHandler();
								if (oNavigationHandler) {
									var mSemanticAttributes = {};
									mSemanticAttributes = oButton.getBindingContext().getObject();
									delete mSemanticAttributes.__metadata;
									jQuery.extend(mSemanticAttributes, this.getView().getBindingContext().getObject());
									var mOutboundParameters = oTemplateUtils.oCommonUtils.extractODataEntityPropertiesFromODataJSONFormattedEntity(mSemanticAttributes);
									mOutboundParameters = JSON.stringify(mOutboundParameters);
									var oInnerAppData = {};
									oNavigationHandler.navigate(oCustomData.SemanticObject, oCustomData.Action, mOutboundParameters, oInnerAppData, function(oError) {
										if (oError instanceof sap.ui.generic.app.navigation.service.NavError) {
											sap.m.MessageBox.show(oError.getErrorCode(), {
												title: oTemplateUtils.oCommonUtils.getText("ST_GENERIC_ERROR_TITLE")
											});
										}
									});
								}
							},
							onBeforeRebindChart: function(oEvent) {
								var oSmartChart = oEvent.getSource();
								oSmartChart.oModels = oSmartChart.getChart().oPropagatedProperties.oModels;
							}
						},
						formatters: {
							formatDefaultObjectTitle: function(bCreateMode) {
								// return DefaultTitle in createMode
								var oContext = oController.getView().getBindingContext();
								var oObject = oContext && oContext.getObject();
								if (bCreateMode && oObject && (oObject.IsActiveEntity === undefined || oObject.IsActiveEntity === false || oObject.HasActiveEntity ===
									false)) {
									return getDefaultObjectTitleForCreated();
								}
							}
						},
						extensionAPI: new ExtensionAPI(oTemplateUtils, oController, oState)
					};
				}
			};

		});
