sap.ui.require.preload({
	"web/ui5/test-resources/sap/ui/dt/demokit/ObjectPageWithDesignTime/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.ui.dt.demo.Component\",{metadata:{rootView:\"sap.ui.dt.demo.ObjectPageWithDesignTime\",dependencies:{libs:[\"sap.m\"]},config:{sample:{stretch:!0,files:[\"ObjectPageWithDesignTime.view.xml\",\"ObjectPageWithDesignTime.controller.js\"]}}}})},!0);",
	"web/ui5/test-resources/sap/ui/dt/demokit/ObjectPageWithDesignTime/ObjectPageWithDesignTime.controller.js": "sap.ui.define([\"sap/ui/core/mvc/Controller\",\"sap/ui/dt/DesignTime\",\"sap/ui/dt/ElementUtil\",\"sap/ui/dt/plugin/TabHandling\",\"sap/ui/dt/plugin/ControlDragDrop\",\"sap/ui/dt/plugin/MouseSelection\"],function(e,i,n,t,a,o){\"use strict\";return e.extend(\"sap.ui.dt.demo.ObjectPageWithDesignTime\",{onInit:function(){var e=new t({}),n=new o({}),u=new a({draggableTypes:[\"sap.uxap.ObjectPageSection\",\"sap.ui.layout.form.FormElement\",\"sap.ui.layout.form.FormContainer\"]}),s=this.getView();new i({rootElements:[s],plugins:[e,n,u]})}})},!0);",
	"web/ui5/test-resources/sap/ui/dt/demokit/ObjectPageWithDesignTime/ObjectPageWithDesignTime.view.xml": "<core:View xmlns:core=\"sap.ui.core\"\n\t\t   xmlns=\"sap.uxap\"\n\t\t   xmlns:layout=\"sap.ui.layout\"\n\t\t   xmlns:m=\"sap.m\"\n\t\t   xmlns:f=\"sap.ui.layout.form\"\n\t\t   controllerName=\"sap.ui.dt.demo.ObjectPageWithDesignTime\"\n\t\t   height=\"100%\"><ObjectPageLayout id=\"ObjectPageLayout\"\n\t\t\t\t\t  enableLazyLoading=\"false\"\n\t\t\t\t\t  showTitleInHeaderContent=\"true\"\n\t\t\t\t\t  showEditHeaderButton=\"true\"\n\t\t\t\t\t  editHeaderButtonPress=\"handleEditBtnPress\"><headerTitle><ObjectPageHeader objectTitle=\"Denise Smith\"\n\t\t\t\t\t\t\t  objectImageShape=\"Circle\"\n\t\t\t\t\t\t\t  objectImageAlt=\"Denise Smith\"\n\t\t\t\t\t\t\t  objectSubtitle=\"Senior UI Developer\"\n\n\t\t\t\t\t\t\t  isObjectIconAlwaysVisible=\"false\"\n\t\t\t\t\t\t\t  isObjectTitleAlwaysVisible=\"false\"\n\t\t\t\t\t\t\t  isObjectSubtitleAlwaysVisible=\"false\"></ObjectPageHeader></headerTitle><headerContent><layout:VerticalLayout><m:Link text=\"+33 6 4512 5158\"/><m:Link text=\"DeniseSmith@sap.com\"/></layout:VerticalLayout><layout:VerticalLayout><m:Label text=\"Hello! I am Tim and I use UxAP\"/><m:VBox height=\"63px\"><m:Label text=\"Achieved goals\"/><m:ProgressIndicator\n\t\t\t\t\t\t\tpercentValue=\"30\"\n\t\t\t\t\t\t\tdisplayValue=\"30%\"\n\t\t\t\t\t\t\tshowValue=\"true\"\n\t\t\t\t\t\t\tstate=\"None\"/></m:VBox></layout:VerticalLayout><layout:VerticalLayout><m:Label text=\"San Jose, USA\"/></layout:VerticalLayout></headerContent><sections><ObjectPageSection title=\"Section 1\"><subSections><ObjectPageSubSection title=\"Subsection 1.1\"><blocks><m:Label text=\"Block 1.1 content\"/></blocks></ObjectPageSubSection></subSections></ObjectPageSection><ObjectPageSection title=\"Section 2\" importance=\"Medium\"><subSections><ObjectPageSubSection title=\"Subsection 2.1\"><blocks><m:Label text=\"Block 2.1 content\"/></blocks></ObjectPageSubSection><ObjectPageSubSection title=\"Subsection 2.2\"><blocks><m:Label text=\"Block 2.2 content\"/></blocks></ObjectPageSubSection></subSections></ObjectPageSection><ObjectPageSection title=\"Section 3\"><subSections><ObjectPageSubSection title=\"Subsection 3.1\"><blocks><f:Form><f:layout><f:ResponsiveGridLayout /></f:layout><f:formContainers><f:FormContainer title=\"Form Container With Title\"><f:formElements><f:FormElement label=\"Name\"><f:fields><m:Input value=\"SupplierName\" id=\"name\"/></f:fields></f:FormElement><f:FormElement label=\"Street\"><f:fields><m:Input value=\"Street\" /><m:Input value=\"HouseNumber\"></m:Input></f:fields></f:FormElement><f:FormElement label=\"ZIP Code/City\"><f:fields><m:Input value=\"ZIPCode\"></m:Input><m:Input value=\"City\" /></f:fields></f:FormElement><f:FormElement label=\"Country\"><f:fields><m:Select width=\"100%\" id=\"country\" selectedKey=\"Country\"></m:Select></f:fields></f:FormElement></f:formElements></f:FormContainer><f:FormContainer><f:formElements><f:FormElement label=\"2\"><f:fields><m:Input value=\"3\" id=\"name3\"/></f:fields></f:FormElement><f:FormElement label=\"4\"><f:fields><m:Input value=\"Street\" /><m:Input value=\"HouseNumber\"></m:Input></f:fields></f:FormElement></f:formElements></f:FormContainer></f:formContainers></f:Form></blocks></ObjectPageSubSection></subSections></ObjectPageSection></sections></ObjectPageLayout></core:View>\n"
}, "web/ui5/test-resources/sap/ui/dt/demokit/ObjectPageWithDesignTime/Component-preload");