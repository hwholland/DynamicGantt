/*!
 * SAP APF Analysis Path Framework
 *
 * (c) Copyright 2012-2014 SAP AG. All rights reserved
 */
/*global sap*/
sap.ui.define([ "sap/apf/modeler/ui/controller/requestOptions" ], function(BaseController) {
	"use strict";
	return BaseController.extend("sap.apf.modeler.ui.controller.smartFilterBarRequest", {
		// Called on initialization of the view and sets the static texts for all controls in UI
		setDisplayText : function() {
			var oController = this;
			var oTextReader = oController.getView().getViewData().oTextReader;
			oController.byId("idSourceLabel").setText(oTextReader("source"));
			oController.byId("idEntityLabel").setText(oTextReader("entityType"));
		},
		// Hide property fields before render
		onBeforeRendering : function() {
			var oController = this;
			oController.byId("idSelectPropertiesLabel").setVisible(false);
			oController.byId("idSelectProperties").setVisible(false);
		},
		onAfterRendering : function() {
			var oController = this;
			if (oController.byId("idSource").getValue().length === 0) {
				oController.byId("idSource").focus();
			}
		},
		// Adds/removes required tag to entity type and source fields and accepts a boolean to determine required
		addOrRemoveMandatoryFieldsAndRequiredFlag : function(bRequired, oEvent) {
			var oController = this;
			oController.byId("idEntityLabel").setRequired(bRequired);
			if (bRequired) {
				oController.viewValidator.addFields([ "idEntity" ]);
			} else {
				oController.viewValidator.removeFields([ "idEntity" ]);
			}
		},
		// returns smart filter bar service
		getSource : function() {
			var oController = this;
			return oController.oParentObject.getService();
		},
		// returns all entity types in a service
		getAllEntities : function(sSource) {
			var oController = this;
			return oController.oConfigurationEditor.getAllEntityTypesOfService(sSource);
		},
		// returns entity type of service
		getEntity : function() {
			var oController = this;
			return oController.oParentObject.getEntityType();
		},
		// clearSource clears smart filter bar service. It calls clears entity to clear smart filter entity type as well.
		clearSource : function() {
			var oController = this;
			oController.oParentObject.setService(undefined);
			oController.clearEntity();
		},
		clearEntity : function() {
			var oController = this;
			oController.oParentObject.setEntityType(undefined);
		},
		// updates smart filter bar service
		updateSource : function(sSource) {
			var oController = this;
			oController.oParentObject.setService(sSource);
		},
		// updates smart filter bar entity type
		updateEntity : function(sEntity) {
			var oController = this;
			oController.oParentObject.setEntityType(sEntity);
		},
		// returns the current validation state of sub view
		getValidationState : function() {
			var oController = this;
			return oController.viewValidator.getValidationState();
		}
	});
});
