sap.ui.define(["sap/suite/ui/generic/template/lib/TemplateAssembler"], function(TemplateAssembler) {
	"use strict";

	function getMethods(oComponent) {
		return {
			init: function() {
				var oTemplatePrivate = oComponent.getModel("_templPriv");
				oTemplatePrivate.setProperty("/listReport", {}); // Note that component properties are not yet available here
				oTemplatePrivate.setProperty("/complexTable", {}); 
			},
			setContainer: function() {
				var oSettings = oComponent.getComponentContainer().getSettings();
				if (sap.suite.ui.generic.template.js.AnnotationHelper.isComplexTable(oSettings.routeConfig)) {
					oComponent.setTemplateName("sap.suite.ui.generic.template.ListReport.view.ComplexTable");
				}
			},
			forView: {
				hasDraft: function() {
					return oComponent.getAppComponent().getTransactionController().getDraftController().getDraftContext()
						.isDraftEnabled(oComponent.getEntitySet());
				}
			},
			refreshBinding: function(bUnconditional) {
				// refresh list binding
				// always refresh for ListReport and ComplexTable
				/*
				if (!bUnconditional){
					return;  // list binding only updated if necessary	
				}
				*/
				var oView = oComponent.getAggregation("rootControl");
				if (oView instanceof sap.ui.core.mvc.XMLView) {
					// Rebind table
					var oSmartTable = oView.byId("listReport");
					if (oSmartTable && oSmartTable.rebindTable) {
						oSmartTable.rebindTable();
					}
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
											var oUIModel = oComponent.getModel("ui");

											var oActiveEntity = oBindingContext.getObject();
											if (oActiveEntity) {

												var oDraftController = oComponent.getAppComponent().getTransactionController()
														.getDraftController();
												var oDraftContext = oDraftController.getDraftContext();
												var bIsDraft = oDraftContext.hasDraft(oBindingContext) && !oActiveEntity.IsActiveEntity;
												//var bHasActiveEntity = oActiveEntity.HasActiveEntity;
												if (bIsDraft) {
													oUIModel.setProperty("/editable", true);
													oUIModel.setProperty("/enabled", true);
												}
											}
										});
						//fnBindBreadCrumbs();
					}
				}
			}
		};
	}

	return TemplateAssembler.getTemplateComponent(getMethods,
		"sap.suite.ui.generic.template.ListReport.Component", {
			metadata: {
				library: "sap.suite.ui.generic.template",
				properties: {
					"templateName": {
						"type": "string",
						"defaultValue": "sap.suite.ui.generic.template.ListReport.view.ListReport"
					},
					"gridTable": "boolean",
					"multiSelect": "boolean",
					"smartVariantManagement": "boolean",
					"hideTableVariantManagement": "boolean",
					"complexListId": "string"
				},
				"manifest": "json"
			}
		});
});