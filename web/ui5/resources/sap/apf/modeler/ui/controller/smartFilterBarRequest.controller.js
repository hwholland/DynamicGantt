/*!
 * SAP APF Analysis Path Framework
 *
 * (c) Copyright 2012-2014 SAP AG. All rights reserved
 */
sap.ui.define(["sap/apf/modeler/ui/controller/requestOptions"],function(B){"use strict";return B.extend("sap.apf.modeler.ui.controller.smartFilterBarRequest",{setDisplayText:function(){var c=this;var t=c.getView().getViewData().oTextReader;c.byId("idSourceLabel").setText(t("source"));c.byId("idEntityLabel").setText(t("entityType"));},onBeforeRendering:function(){var c=this;c.byId("idSelectPropertiesLabel").setVisible(false);c.byId("idSelectProperties").setVisible(false);},onAfterRendering:function(){var c=this;if(c.byId("idSource").getValue().length===0){c.byId("idSource").focus();}},addOrRemoveMandatoryFieldsAndRequiredFlag:function(r,e){var c=this;c.byId("idEntityLabel").setRequired(r);if(r){c.viewValidator.addFields(["idEntity"]);}else{c.viewValidator.removeFields(["idEntity"]);}},getSource:function(){var c=this;return c.oParentObject.getService();},getAllEntities:function(s){var c=this;return c.oConfigurationEditor.getAllEntityTypesOfService(s);},getEntity:function(){var c=this;return c.oParentObject.getEntityType();},clearSource:function(){var c=this;c.oParentObject.setService(undefined);c.clearEntity();},clearEntity:function(){var c=this;c.oParentObject.setEntityType(undefined);},updateSource:function(s){var c=this;c.oParentObject.setService(s);},updateEntity:function(e){var c=this;c.oParentObject.setEntityType(e);},getValidationState:function(){var c=this;return c.viewValidator.getValidationState();}});});
