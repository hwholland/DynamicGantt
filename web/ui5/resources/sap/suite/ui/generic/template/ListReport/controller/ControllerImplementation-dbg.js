/* global hasher */
sap.ui.define(["sap/ui/base/Object", "sap/ui/model/json/JSONModel", "sap/m/ObjectIdentifier", "sap/m/Table",
		"sap/m/Text", "sap/ui/comp/smartfield/SmartField", "sap/ui/generic/app/navigation/service/SelectionVariant",
		"sap/suite/ui/generic/template/ListReport/extensionAPI/ExtensionAPI"
	],
	function(BaseObject, JSONModel, ObjectIdentifier, Table, Text, SmartField, SelectionVariant, ExtensionAPI) {
		"use strict";

		// Constants which are used as property names for storing custom filter data and generic filter data
		var customDataPropertyName = "sap.suite.ui.generic.template.customData",
			genericDataPropertyName = "sap.suite.ui.generic.template.genericData";

		function fnNullify(oObject) {
			if (oObject) {
				for (var sProp in oObject) {
					oObject[sProp] = null;
				}
			}
		}

		return {
			getMethods: function(oTemplateUtils, oController) {
				var oState = {}; // contains attributes oSmartFilterbar and oSmartTable. Initialized in onInit.  

				// Helper Functions

				function getFilterState() {
					var oCustomAndGenericData = {};
					oCustomAndGenericData[customDataPropertyName] = {};
					oCustomAndGenericData[genericDataPropertyName] = {};
					var oEditStateFilter = oController.byId("editStateFilter");
					if (oEditStateFilter) {
						oCustomAndGenericData[genericDataPropertyName].editStateFilter = oEditStateFilter.getSelectedKey();
					}
					// extension is responsible for retrieving custom filter state. The method has a more generic name
					// for historical reasons (change would be incompatible).
					oController.getCustomAppStateDataExtension(oCustomAndGenericData[customDataPropertyName]);
					return oCustomAndGenericData;
				}

				function getCurrentAppState() {
					/*
					 * Special handling for selection fields, for which defaults are defined: If a field is visible in the
					 * SmartFilterBar and the user has cleared the input value, the field is not included in the selection
					 * variant, which is returned by getDataSuiteFormat() of the SmartFilterBar. But since it was cleared by
					 * purpose, we have to store the selection with the value "", in order to set it again to an empty value,
					 * when restoring the selection after a back navigation. Otherwise, the default value would be set.
					 */
					var oSelectionVariant = new SelectionVariant(oState.oSmartFilterbar.getDataSuiteFormat());
					var aVisibleFields = oController.getVisibleSelectionsWithDefaults();
					for (var i = 0; i < aVisibleFields.length; i++) {
						if (!oSelectionVariant.getValue(aVisibleFields[i])) {
							oSelectionVariant.addSelectOption(aVisibleFields[i], "I", "EQ", "");
						}
					}
					return {
						selectionVariant: oSelectionVariant.toJSONString(),
						tableVariantId: oState.oSmartTable.getCurrentVariantId(),
						customData: getFilterState()
					};
				}

				function fnStoreCurrentAppStateAndAdjustURL(oCurrentAppState) {
					// oCurrentAppState is optional
					// - nothing, if NavigationHandler not available
					// - adjusts URL immediately
					// - stores appState for this URL (asynchronously)
					oCurrentAppState = oCurrentAppState || getCurrentAppState();
					// currently NavigationHandler raises an exception when ushellContainer is not available, should be changed
					// by
					// Denver
					try {
						oTemplateUtils.oCommonUtils.getNavigationHandler().storeInnerAppState(oCurrentAppState);
					} catch (err) {
						jQuery.sap.log.error("ListReport.fnStoreCurrentAppStateAndAdjustURL: " + err);
					}
				}

				// -- Begin of methods that are used in onInit only
				function fnSetIsLeaf() {
					var oComponent = oController.getOwnerComponent();
					var oTemplatePrivateModel = oComponent.getModel("_templPriv");
					oTemplatePrivateModel.setProperty("/listReport/isLeaf", oComponent.getIsLeaf());
				}
				
				function fnSetBackToMain() {
					var oComponent = oController.getOwnerComponent();
					var oSettings = oComponent.getComponentContainer().getSettings();
					var oTemplatePrivateModel = oComponent.getModel("_templPriv");
					var sText = "";
					sText = oTemplateUtils.oCommonUtils.getText("BACK");
					var sParentEntitySet = oSettings.routeConfig.parentEntitySet;
					
					var sMainObject = "";
					if (sParentEntitySet !== undefined && sParentEntitySet !== "") {
						var oMetaModel = oComponent.getModel().getMetaModel();
						var oParentEntitySet = oMetaModel.getODataEntitySet(sParentEntitySet);
						//it would be better to call the AnnotationHelper from here, since the TypeName not necessarily is in an String - calling AnnotationHelper is not working
						//result = sap.ui.model.odata.AnnotationHelper.format(oInterfaceFirst, oEntitySetContext);				
						var oParentEntityType = oMetaModel.getODataEntityType(oParentEntitySet.entityType);
						var oHeaderInfo = oParentEntityType["com.sap.vocabularies.UI.v1.HeaderInfo"];
						if (oHeaderInfo && oHeaderInfo.TypeName && oHeaderInfo.TypeName.String !== ""){
							sMainObject = oHeaderInfo.TypeName.String;
							sText = oTemplateUtils.oCommonUtils.getText("BACK_TO_MAIN", sMainObject);
						}
					}
					oTemplatePrivateModel.setProperty("/complexTable/backToMain", sText);
				}				

				function fnSetShareModel() {
					var fnGetUser = jQuery.sap.getObject("sap.ushell.Container.getUser");
					var oManifest = oController.getOwnerComponent().getAppComponent().getMetadata().getManifestEntry("sap.ui");
					var sBookmarkIcon = (oManifest && oManifest.icons && oManifest.icons.icon) || "";
					// share Model: holds all the sharing relevant texts and info used in the XML view
					var oShareInfo = {
						// BOOKMARK
						bookmarkIcon: sBookmarkIcon,
						bookmarkCustomUrl: function() {
							fnStoreCurrentAppStateAndAdjustURL();
							return hasher.getHash() ? ("#" + hasher.getHash()) : window.location.href;
						},
						bookmarkServiceUrl: function() {
							var oTable = oState.oSmartTable.getTable();
							var oBinding = oTable.getBinding("rows") || oTable.getBinding("items");
							return oBinding ? oBinding.getDownloadUrl() + "&$top=0&$inlinecount=allpages" : "";
						},
						// JAM
						isShareInJamActive: !!fnGetUser && fnGetUser().isJamActive()
					};
					var oTemplatePrivateModel = oController.getOwnerComponent().getModel("_templPriv");
					oTemplatePrivateModel.setProperty("/listReport/share", oShareInfo);
				}
				// -- End of used in onInit only

				function fnRestoreGenericFilterState(oGenericData) {
					if (oGenericData && oGenericData.editStateFilter !== undefined) {
						var oEditStateFilter = oController.byId("editStateFilter");
						if (oEditStateFilter) {
							oEditStateFilter.setSelectedKey((oGenericData.editStateFilter === null) ? 0 : oGenericData.editStateFilter);
						}
					}
				}

				// method is responsible for retrieving custom filter state. The correspomding extension-method has a more generic name
				// for historical reasons (change would be incompatible).
				function fnRestoreCustomFilterState(oCustomData) {
					oController.restoreCustomAppStateDataExtension(oCustomData || {});
				}

				// This method is responsible for restoring the data which have been stored via getFilterState.
				// However, it must be taken care of data which have been stored with another (historical) format.
				// Therefore, it is checked whether oCustomAndGenericData possesses two properties with the right names.
				// If this is this case it is assumed that the data have been stored according to curreent logic. Otherwise, it is
				// assumed that the data have been stored with the current logic. Otherwise, it is assumed that the properties have been
				// stored with a logic containing only custom properties (with possible addition of _editStateFilter).
				function fnRestoreFilterState(oCustomAndGenericData) {
					oCustomAndGenericData = oCustomAndGenericData || {};
					if (oCustomAndGenericData.hasOwnProperty(customDataPropertyName) && oCustomAndGenericData.hasOwnProperty(genericDataPropertyName)) {
						fnRestoreGenericFilterState(oCustomAndGenericData[genericDataPropertyName]);
						fnRestoreCustomFilterState(oCustomAndGenericData[customDataPropertyName]);
					} else { // historic format. May still have property _editStateFilter which was used generically.
						if (oCustomAndGenericData._editStateFilter !== undefined) {
							fnRestoreGenericFilterState({
								editStateFilter: oCustomAndGenericData._editStateFilter
							});
							delete oCustomAndGenericData._editStateFilter;
						}
						fnRestoreCustomFilterState(oCustomAndGenericData);
					}
				}

				function fnInitAppState() {

					var oParseNavigationPromise = oTemplateUtils.oCommonUtils.getNavigationHandler().parseNavigation();

					oParseNavigationPromise.done(function(oAppData, oURLParameters, sNavType) {
						if (sNavType !== sap.ui.generic.app.navigation.service.NavType.initial) {
							var bHasOnlyDefaults = oAppData && oAppData.bNavSelVarHasDefaultsOnly;
							var oSelectionVariant = new SelectionVariant(oAppData.selectionVariant);
							var aSelectionVariantProperties = oSelectionVariant.getParameterNames().concat(
								oSelectionVariant.getSelectOptionsPropertyNames());
							for (var i = 0; i < aSelectionVariantProperties.length; i++) {
								oState.oSmartFilterbar.addFieldToAdvancedArea(aSelectionVariantProperties[i]);
							}
							if (bHasOnlyDefaults && oState.oSmartFilterbar.isCurrentVariantStandard()){
								// given variant has only default values (set by user in FLP), and variant (already loaded) is not user specific
								// => default values have to be added without removing existing values (but overriding them if values for the same filter exist)
								oState.oSmartFilterbar.setDataSuiteFormat(oAppData.selectionVariant);
							} else if (!bHasOnlyDefaults || oState.oSmartFilterbar.isCurrentVariantStandard()) {
								oState.oSmartFilterbar.clearVariantSelection();
								oState.oSmartFilterbar.clear();
								oState.oSmartFilterbar.setDataSuiteFormat(oAppData.selectionVariant, true);
							}
							if (oAppData.tableVariantId) {
								oState.oSmartTable.setCurrentVariantId(oAppData.tableVariantId);
							}
							fnRestoreFilterState(oAppData.customData);
							if (!bHasOnlyDefaults) {
								oState.oSmartFilterbar.search();
							}
						}
					});
					// todo: check for better error handling
					oParseNavigationPromise.fail(function(oError) {
						if (oError instanceof Error) {
							oError.showMessageBox();
						}
					});
				}

				var sNewObjectTooltip; // initialized on demand

				function getNewObjectTooltip() {
					sNewObjectTooltip = sNewObjectTooltip || oTemplateUtils.oCommonUtils.getText("CREATE_NEW_OBJECT_DYN", [oController.byId(
							"idEntityTypeName")
						.getValue()
					]);
					return sNewObjectTooltip;
				}

				// Generation of Event Handlers
				return {
					onInit: function() {
						oState.oSmartFilterbar = oController.byId("listReportFilter");
						oState.oSmartTable = oController.byId("listReport");
						fnSetIsLeaf();
						fnSetShareModel();
						var oComponent = oController.getOwnerComponent();
						var oSettings = oComponent.getComponentContainer().getSettings();
						var bIsComplexTable = sap.suite.ui.generic.template.js.AnnotationHelper.isComplexTable(oSettings.routeConfig);
						if (bIsComplexTable){
							fnSetBackToMain();							
						}
					},

					handlers: {
						onBack: function() {
							window.history.back();
						},
						addEntry: function(oEvent) {
							oTemplateUtils.oCommonEventHandlers.addEntry(oEvent).then(function() {
								oTemplateUtils.oComponentUtils.addDataForNextPage({
									isObjectRoot: true
								});
							});
						},
						deleteEntries: function(oEvent) {
							oTemplateUtils.oCommonEventHandlers.deleteEntries(oEvent);
						},
						onChange: function(oEvent) {
							oTemplateUtils.oCommonEventHandlers.onChange(oEvent);
						},
						onContactDetails: function(oEvent) {
							oTemplateUtils.oCommonEventHandlers.onContactDetails(oEvent);
						},
						onInitSmartFilterBar: function(oEvent) {
							oController.onInitSmartFilterBarExtension(oEvent);
							fnInitAppState();
						},

						onEditStateFilterChanged: function(oEvent) {
							oEvent.getSource().fireChange();
						},

						onBeforeSFBVariantSave: function() {
							/*
							 * When the app is started, the VariantManagement of the SmartFilterBar saves the initial state in the
							 * STANDARD (=default) variant and therefore this event handler is called. So, even though the name of
							 * the event handler is confusing, we need to provide the initial state to allow the SmartFilterBar to
							 * restore it when needed (i.e. when the user clicks on restore). Thus, no check against STANDARD
							 * context is needed!
							 */
							var oCurrentAppState = getCurrentAppState();
							oState.oSmartFilterbar.setFilterData({
								_CUSTOM: oCurrentAppState.customData
							});
							fnStoreCurrentAppStateAndAdjustURL(oCurrentAppState);
						},
						onAfterSFBVariantLoad: function() {
							var oData = oState.oSmartFilterbar.getFilterData();
							if (oData._CUSTOM !== undefined) {
								fnRestoreFilterState(oData._CUSTOM);
							} else {
								// make sure that the custom data are nulled for the STANDARD variant
								var oCustomAndGenericData = getFilterState();
								fnNullify(oCustomAndGenericData[customDataPropertyName]);
								fnNullify(oCustomAndGenericData[genericDataPropertyName]);
								fnRestoreFilterState(oCustomAndGenericData);
							}
							// store navigation context
							fnStoreCurrentAppStateAndAdjustURL();
						},
						onBeforeRebindTable: function(oEvent) {
							oTemplateUtils.oCommonEventHandlers.onBeforeRebindTable(oEvent);
							oController.onBeforeRebindTableExtension(oEvent);
						},
						onShowDetails: function(oEvent) {
							var oEventSource = oEvent.getSource();
							oTemplateUtils.oCommonEventHandlers.onShowDetails(oEventSource);
						},
						onShowDetailsIntent: function(oEvent) {
							var oEventSource = oEvent.getSource();
							oTemplateUtils.oCommonEventHandlers.onShowDetailsIntent(oEventSource, oState.oSmartFilterbar);
						},
						onListNavigate: function(oEvent) {
							var oEventSource = oEvent.getSource();
							oTemplateUtils.oCommonEventHandlers.onListNavigate(oEventSource);
						},
						onListNavigateIntent: function(oEvent) {
							var oEventSource = oEvent.getSource();
							oTemplateUtils.oCommonEventHandlers.onListNavigateIntent(oEventSource, oState.oSmartFilterbar);
						},
						onCallAction: function(oEvent) {
							oTemplateUtils.oCommonEventHandlers.onCallActionFromList(oEvent, oState.oSmartFilterbar);
						},
						onCallActionFromList: function(oEvent) {
							oTemplateUtils.oCommonEventHandlers.onCallActionFromList(oEvent);
						},
						onBeforeSemanticObjectLinkPopoverOpens: function(oEvent) {
							var oNavigationHandler = oTemplateUtils.oCommonUtils.getNavigationHandler();
							if (oNavigationHandler) {
								var oParams = oEvent.getParameters();
								var sSelectionVariant = oState.oSmartFilterbar.getDataSuiteFormat();
								oNavigationHandler.processBeforeSmartLinkPopoverOpens(oParams, sSelectionVariant);
							} else {
								oEvent.getParameters().open();
							}
						},

						// ---------------------------------------------
						// store navigation context
						// note: function itself is handled by the corresponding control
						// ---------------------------------------------
						onSearchButtonPressed: function() {
							var oModel = oController.getOwnerComponent().getModel();
							oModel.attachEventOnce('requestSent', function() {
								fnStoreCurrentAppStateAndAdjustURL();
							});
						},
						onSemanticObjectLinkPopoverLinkPressed: function() {
							fnStoreCurrentAppStateAndAdjustURL();
						},
						onAfterTableVariantSave: function() {
							fnStoreCurrentAppStateAndAdjustURL();
						},
						onAfterApplyTableVariant: function() {
							fnStoreCurrentAppStateAndAdjustURL();
						},
						// ---------------------------------------------
						// END store navigation context
						// ---------------------------------------------

						// ---------------------------------------------
						// EVENT HANDLERS FOR COLLABORATION ACTIONS
						// ---------------------------------------------
						onShareEmailPress: function() {
							fnStoreCurrentAppStateAndAdjustURL();
							sap.m.URLHelper.triggerEmail(null, oTemplateUtils.oCommonUtils.getText("EMAIL_HEADER", [oTemplateUtils.oCommonUtils.getText(
								"PAGEHEADER")]), document.URL);
						},
						onShareInJamPress: function() {
							fnStoreCurrentAppStateAndAdjustURL();
							var oShareDialog = sap.ui.getCore().createComponent({
								name: "sap.collaboration.components.fiori.sharing.dialog",
								settings: {
									object: {
										id: document.URL,
										share: oTemplateUtils.oCommonUtils.getText("PAGEHEADER")
									}
								}
							});
							oShareDialog.open();
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
							var oTable = oTemplateUtils.oCommonUtils.getParentTable(oButton);
							var oNavigationHandler = oTemplateUtils.oCommonUtils.getNavigationHandler();
							if (oNavigationHandler) {
								var mSemanticAttributes = {};
								mSemanticAttributes = oButton.getBindingContext().getObject();
								delete mSemanticAttributes.__metadata;
								var sSelectionVariant = oState.oSmartFilterbar.getDataSuiteFormat() || "{}";
								mSemanticAttributes = oTemplateUtils.oCommonUtils.extractODataEntityPropertiesFromODataJSONFormattedEntity(mSemanticAttributes);
								var mOutboundParameters = oNavigationHandler.mixAttributesAndSelectionVariant(mSemanticAttributes, sSelectionVariant).toJSONString();
								var oInnerAppData = {
									selectionVariant: oState.oSmartFilterbar.getDataSuiteFormat(),
									tableVariantID: oTable.getParent().getCurrentVariantId()
								};
								oNavigationHandler.navigate(oCustomData.SemanticObject, oCustomData.Action, mOutboundParameters, oInnerAppData, function(oError) {
									if (oError instanceof sap.ui.generic.app.navigation.service.NavError) {
										sap.m.MessageBox.show(oError.getErrorCode(), {
											title: oTemplateUtils.oCommonUtils.getText("ST_GENERIC_ERROR_TITLE")
										});
									}
								});
							}
						}

						// ---------------------------------------------
						// END COLLABORATION ACTIONS
						// ---------------------------------------------
					},
					formatters: {
						formatNewObjectTooltip: getNewObjectTooltip,
						
						formatDraftLink: function(oDraftAdministrativeData, bIsActiveEntity, bHasDraftEntity) {
							if (oDraftAdministrativeData && oDraftAdministrativeData.DraftUUID) {
								if (!bIsActiveEntity) {
									return oTemplateUtils.oCommonUtils.getText("DRAFT_OBJECT");
								} else if (bHasDraftEntity) {
									return oTemplateUtils.oCommonUtils.getText(oDraftAdministrativeData.InProcessByUser ? "LOCKED_OBJECT" : "UNSAVED_CHANGES");
								} 
							} 
							return "";
						},

						formatDraftIcon: function(oDraftAdministrativeData, bIsActiveEntity, bHasDraftEntity) {
							if (oDraftAdministrativeData && oDraftAdministrativeData.DraftUUID && bIsActiveEntity && bHasDraftEntity) {
								if (oDraftAdministrativeData.InProcessByUser) {
									return "sap-icon://locked";
								} else {
									return "sap-icon://request";
								}
							}
							return "";
						}
					},
					
					extensionAPI: new ExtensionAPI(oTemplateUtils, oController, oState)
				};
			}
		};

	});