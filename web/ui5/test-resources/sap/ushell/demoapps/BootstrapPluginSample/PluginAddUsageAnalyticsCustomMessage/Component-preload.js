sap.ui.require.preload({
	"web/ui5/test-resources/sap/ushell/demoapps/BootstrapPluginSample/PluginAddUsageAnalyticsCustomMessage/Component.js": "!function(){\"use strict\";jQuery.sap.declare(\"sap.ushell.demo.PluginAddUsageAnalyticsCustomMessage.Component\"),jQuery.sap.require(\"sap.ui.core.UIComponent\"),sap.ui.core.UIComponent.extend(\"sap.ushell.demo.PluginAddUsageAnalyticsCustomMessage.Component\",{metadata:{manifest:\"json\"},createContent:function(){jQuery.sap.require(\"sap.ui.model.resource.ResourceModel\");new sap.ui.model.json.JSONModel;var e=this.getModel(\"i18n\").getResourceBundle();sap.ushell.Container.getService(\"UsageAnalytics\").setLegalText(e.getText(\"legal_message\"))}})}();",
	"web/ui5/test-resources/sap/ushell/demoapps/BootstrapPluginSample/PluginAddUsageAnalyticsCustomMessage/i18n/resources.properties": "# Translatable texts for the Ushell-lib component of Fiori Launchpad project\n# __ldi.translation.uuid=a66d2140-0e4c-11e3-8ffd-0800200c9a66\n\n# Copyright (c) 2009-2014 SAP SE, All Rights Reserved\n\n# Fiori Launchpad's Search Panel translatable texts\n\n#XFLD\nlegal_message= This is the legal text that the administrators of the Fiori Launchpad have to define for their users in case they want to track their usage behavior. Do you confirm this terms?\n\n"
}, "web/ui5/test-resources/sap/ushell/demoapps/BootstrapPluginSample/PluginAddUsageAnalyticsCustomMessage/Component-preload");