jQuery.sap.declare("sap.ui.comp.sample.personalization.example7.Component");

sap.ui.core.UIComponent.extend("sap.ui.comp.sample.personalization.example7.Component", {
	metadata: {
		rootView: "sap.ui.comp.sample.personalization.example7.Example",
		dependencies: {
			libs: [
				"sap.m", "sap.ui.comp"
			]
		},
		config: {
			sample: {
				files: [
					"Example.view.xml", "Example.controller.js", "../mockserver/metadata.xml"
				]
			}
		}
	}
});
