sap.ui.require.preload({
	"web/ui5/test-resources/sap/uxap/demokit/sample/ObjectPageSection/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.uxap.sample.ObjectPageSection.Component\",{metadata:{rootView:\"sap.uxap.sample.ObjectPageSection.ObjectPageSection\",dependencies:{libs:[\"sap.m\"]},config:{sample:{stretch:!0,files:[\"ObjectPageSection.view.xml\"]}}}})},!0);",
	"web/ui5/test-resources/sap/uxap/demokit/sample/ObjectPageSection/ObjectPageSection.view.xml": "<core:View xmlns:core=\"sap.ui.core\"\n\t\t   xmlns=\"sap.uxap\"\n\t\t   xmlns:layout=\"sap.ui.layout\"\n\t\t   xmlns:m=\"sap.m\"\n\t\t   xmlns:sample=\"sap.uxap.sample.AnchorBar.block\"\n\t\t   xmlns:blockcolor=\"sap.uxap.sample.SharedBlocks\"\n\t\t   height=\"100%\"\n\t\t><ObjectPageLayout id=\"ObjectPageLayout\" enableLazyLoading=\"false\"><headerTitle><ObjectPageHeader objectTitle=\"Section sample\"></ObjectPageHeader></headerTitle><headerContent><m:ObjectAttribute title=\"\" text=\"This example explains the rules for the rendering of sections\"/></headerContent><sections><ObjectPageSection title=\"Section 1\"><subSections><ObjectPageSubSection title=\"Subsection 1.1 \"><blocks><blockcolor:BlockBlueT1 id=\"bbt1\"/></blocks></ObjectPageSubSection><ObjectPageSubSection title=\"Subsection 1.2 \"><blocks><blockcolor:BlockBlueT2 id=\"bbt2\"/></blocks></ObjectPageSubSection></subSections></ObjectPageSection><ObjectPageSection title=\"Section 2\"></ObjectPageSection><ObjectPageSection title=\"Section 3\"><subSections><ObjectPageSubSection title=\" \"><blocks><blockcolor:BlockBlueT3 id=\"bbt3\"/></blocks></ObjectPageSubSection></subSections></ObjectPageSection><ObjectPageSection title=\"Section 4\"><subSections><ObjectPageSubSection title=\"Subsection 4.1 \"><blocks><blockcolor:BlockBlueT4 id=\"bbt4\"/></blocks></ObjectPageSubSection></subSections></ObjectPageSection><ObjectPageSection title=\"Section 5\"><subSections><ObjectPageSubSection title=\" \"><blocks><blockcolor:BlockBlueT5 id=\"bbt5\"/></blocks></ObjectPageSubSection></subSections></ObjectPageSection></sections></ObjectPageLayout></core:View>\n"
}, "web/ui5/test-resources/sap/uxap/demokit/sample/ObjectPageSection/Component-preload");