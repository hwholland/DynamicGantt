sap.ui.define(["sap/ui/base/Object"], function(BaseObject) {
	"use strict";

	// Class for busy handling
	function getMethods(oTemplateContract) {

		function setAllPagesDirty(){
			for (var sId in oTemplateContract.componentRegistry){
				var oComponentRegistryEntry = oTemplateContract.componentRegistry[sId];
				oComponentRegistryEntry.oComponent.setIsRefreshRequired(true);
			}
		}

		return {
			setAllPagesDirty: setAllPagesDirty
		};
	}

	return BaseObject.extend("sap.suite.ui.generic.template.lib.ViewDependencyHelper", {
		constructor: function(oTemplateContract) {
			jQuery.extend(this, getMethods(oTemplateContract));
		}
	});
});