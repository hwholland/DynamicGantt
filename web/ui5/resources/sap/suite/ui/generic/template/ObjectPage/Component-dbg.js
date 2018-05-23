sap.ui.define(["sap/suite/ui/generic/template/lib/TemplateAssembler"], function(TemplateAssembler) {
	"use strict";

	function getMethods(oComponent, oComponentUtils) {
		var oViewProxy;

		// helper functions
		function fnBindBreadCrumbs() {
			if (!oViewProxy) {
				return;
			}
			var oRouter = oComponent.getRouter();
			var sPath = oRouter && oRouter.oHashChanger && oRouter.oHashChanger.getHash();

			if (!sPath) {
				return;
			}

			// remove query part if there's one
			sPath = sPath.split("?")[0];
			var aSections = sPath.split("/");

			if (aSections[0] === "" || aSections[0] === "#") {
				// Path started with a / - remove first section
				aSections.splice(0, 1);
			}

			// remove the last one - this is the current shown section
			aSections.pop();

			oViewProxy.bindBreadCrumbs(aSections);
		}

		return {
			onActivate: function(sBindingPath) {
				// preliminary: in draft case maybe on first time property is not set
				var oUIModel = oComponent.getModel("ui");
				if (oComponentUtils.getEditableNDC()) {
					oUIModel.setProperty("/editable", true);
				} else if (oViewProxy && !oViewProxy.isDraftEnabled()) {
					oUIModel.setProperty("/editable", false);
				}
				oViewProxy.onComponentActivate(sBindingPath);
			},
			forView: {
				registerView: function(theViewProxy) {
					oViewProxy = theViewProxy;
				}
			},

			refreshBinding: function(bUnconditional, mRefreshInfos) {
				// default implementation: refresh element binding
				if (bUnconditional){
					var oElementBinding = oComponent.getComponentContainer().getElementBinding();
					if (oElementBinding) {
						oElementBinding.refresh(true);
					}
				} else {
					oViewProxy.refreshFacets(mRefreshInfos);
				}
			},
			
			overwrite: {
				updateBindingContext: function() {

					sap.suite.ui.generic.template.lib.TemplateComponent.prototype.updateBindingContext.apply(oComponent,
							arguments);

					var oBindingContext = oComponent.getBindingContext();
					if (oBindingContext) {
						oComponent.getModel().getMetaModel().loaded()
								.then(
										function() {
											var oTemplatePrivateModel = oComponent.getModel("_templPriv");

											// set draft status to blank according to UI decision
											oTemplatePrivateModel.setProperty("/generic/draftIndicatorState", sap.m.DraftIndicatorState.Clear);

											var oActiveEntity = oBindingContext.getObject();
											if (oActiveEntity) {
												var oUIModel = oComponent.getModel("ui");
												var oDraftController = oComponent.getAppComponent().getTransactionController()
														.getDraftController();
												var oDraftContext = oDraftController.getDraftContext();
												var bIsDraft = oDraftContext.hasDraft(oBindingContext) && !oActiveEntity.IsActiveEntity;
												var bHasActiveEntity = oActiveEntity.HasActiveEntity;
												if (oComponentUtils.getCreateMode()) {
													oUIModel.setProperty("/createMode", true);
													oUIModel.setProperty("/editable", true);
													oUIModel.setProperty("/enabled", true);
												} else if (bIsDraft) {
													if (bHasActiveEntity) {
														oUIModel.setProperty("/createMode", false);
														oUIModel.setProperty("/editable", true);
														oUIModel.setProperty("/enabled", true);
													} else {
														oUIModel.setProperty("/createMode", true);
														oUIModel.setProperty("/editable", true);
														oUIModel.setProperty("/enabled", true);
													}
												} else {
													oUIModel.setProperty("/createMode", false);
													oUIModel.setProperty("/editable", oComponentUtils.getEditableNDC());
													if (oActiveEntity.hasOwnProperty("HasDraftEntity") && oActiveEntity.HasDraftEntity &&
															oDraftContext.hasSiblingEntity(oComponent.getEntitySet())) {
														oUIModel.setProperty("/enabled", false);
														oComponent.getModel().read(
																oBindingContext.getPath(),
																{
																	urlParameters: {
																		"$expand": "SiblingEntity,DraftAdministrativeData"
																	},
																	success: function(oResponseData) {
																		var oSiblingContext = oComponent.getModel().getContext(
																				"/" + oComponent.getModel().getKey(oResponseData.SiblingEntity));
																		if (oSiblingContext) {
																			oViewProxy.draftResume(oSiblingContext, oActiveEntity,
																					oResponseData.DraftAdministrativeData);
																		}
																		// enable the buttons
																		oUIModel.setProperty("/enabled", true);
																	}
																});
													} else {
														// enable the buttons
														oUIModel.setProperty("/enabled", true);
													}
												}
											}
										});
						fnBindBreadCrumbs();
					}
				}
			}
		};
	}

	return TemplateAssembler.getTemplateComponent(getMethods,
			"sap.suite.ui.generic.template.ObjectPage.Component", {

				metadata: {
					library: "sap.suite.ui.generic.template",
					properties: {
						// reference to smart template
						"templateName": {
							"type": "string",
							"defaultValue": "sap.suite.ui.generic.template.ObjectPage.view.Details"
						},
						// shall button "Related Apps" be visible on the object page?
						"showRelatedApps": {
							"type": "boolean",
							"defaultValue": "false"
						},
						// shall it be possible to edit the contents of the header?
						"editableHeaderContent" : {
							"type" : "boolean",
							"defaultValue" : "false"
						},
						"gridTable": "boolean"
					},
					// app descriptor format
					"manifest": "json"
				}
			});
});