sap.ui.define(["sap/ui/base/Object", "sap/m/MessagePopover", "sap/m/MessagePopoverItem", "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(BaseObject, MessagePopover, MessagePopoverItem, Filter, FilterOperator) {
	"use strict";

	function getMethods(oCommonUtils, oController) {

		var oMessagePopover = oCommonUtils.getDialogFragment("sap.suite.ui.generic.template.fragments.MessagePopover");
		var bInitialized = false;
		var aFilterProvider = []; //Callback functions for reuse components that want to add their message filters
		var sCurrentBindingPath;
		
		function addExternalFilter(aFilter) {
			aFilterProvider.forEach(function(fnProvider) {
				var aExternalFilter = fnProvider();
				if (jQuery.isArray(aExternalFilter)) {
					aFilter = aFilter.concat(aExternalFilter);
				} else {
					aFilter.push(aExternalFilter);
				}
			});
			return aFilter;
		}
		
		function getMessageContextFilter(sBindingPath) {
			var aFilter = [];

			var sEntitySetName = "/" + oController.getOwnerComponent().getEntitySet();

			// Show messages for current context including all "property children" AND for
			// messages given for the entire entity set
			var aCombinedFilter = [
				new Filter({
					path: "target",
					operator: FilterOperator.StartsWith,
					value1: sBindingPath
				}),
				new Filter({
					path: "target",
					operator: FilterOperator.EQ,
					value1: sEntitySetName
				}),
				// add additional filter for UiMessages
				new Filter({
					path: "validation",
					operator: FilterOperator.EQ,
					value1: true
				})
			];
			aCombinedFilter = addExternalFilter(aCombinedFilter); //Check/add external filters
			var oFilter = new Filter(aCombinedFilter, false /* filter conjunction OR instead of AND */ );

			aFilter.push(oFilter);
			return aFilter;
		}
		
		function adaptToContext(sBindingPath) {
			if (sBindingPath === undefined){
				if (!bInitialized){
					return;
				}
				sBindingPath = sCurrentBindingPath;
			} else {
				sCurrentBindingPath = sBindingPath;
			}
			var aCombinedFilter = getMessageContextFilter(sBindingPath);
			var oItemBinding = oMessagePopover.getBinding("items");
			oItemBinding.filter(aCombinedFilter);
			if (!bInitialized) {
				var oTemplatePrivate = oController.getOwnerComponent().getModel("_templPriv");
				oTemplatePrivate.setProperty("/generic/messageCount", 0);
				var sMessageButtonTooltip = oCommonUtils.getText("MESSAGE_BUTTON_TOOLTIP_P", 0);
				oTemplatePrivate.setProperty("/objectPage/messageButtonTooltip", sMessageButtonTooltip);
				oItemBinding.attachChange(function() {
					var iCount = oItemBinding.getLength();
					oTemplatePrivate.setProperty("/generic/messageCount", iCount);
					var sMessageButtonTooltip = oCommonUtils.getText("MESSAGE_BUTTON_TOOLTIP_P", iCount);
					if (iCount === 1) {
						sMessageButtonTooltip = oCommonUtils.getText("MESSAGE_BUTTON_TOOLTIP_S", iCount);
					}
					oTemplatePrivate.setProperty("/objectPage/messageButtonTooltip", sMessageButtonTooltip);
				});
				bInitialized = true;
			}
		}

		return {
			adaptToContext: adaptToContext,

			showMessagePopover: function(oEvent) {
				var oButton = oEvent.getSource();
				oMessagePopover.toggle(oButton);
			},
			registerMessageFilterProvider: function(fnProvider) {
				aFilterProvider.push(fnProvider);
				adaptToContext();
			}
		};
	}

	return BaseObject.extend("sap.suite.ui.generic.template.lib.MessageButtonHandler.js", {
		constructor: function(oCommonUtils, oController) {
			jQuery.extend(this, getMethods(oCommonUtils, oController));
		}
	});
});