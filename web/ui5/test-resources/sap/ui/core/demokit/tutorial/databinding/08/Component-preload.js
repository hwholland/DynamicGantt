sap.ui.require.preload({
	"web/ui5/test-resources/sap/ui/core/demokit/tutorial/databinding/08/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.ui.core.tutorial.databinding.08.Component\",{metadata:{config:{sample:{iframe:\"webapp/index.html\",stretch:!0,files:[\"webapp/i18n/i18n.properties\",\"webapp/i18n/i18n_de.properties\",\"webapp/view/App.view.xml\",\"webapp/index.html\"]}}}})});",
	"web/ui5/test-resources/sap/ui/core/demokit/tutorial/databinding/08/webapp/view/App.view.xml": "<mvc:View \txmlns=\"sap.m\"\n\t\t\txmlns:l=\"sap.ui.layout\"\n\t\t\txmlns:mvc=\"sap.ui.core.mvc\"><Panel headerText=\"{i18n>panel1HeaderText}\" class=\"sapUiResponsiveMargin\" width=\"auto\"><content><Label text=\"{i18n>firstName}\" class=\"sapUiSmallMargin\" /><Input value=\"{/firstName}\" valueLiveUpdate=\"true\" width=\"200px\" enabled=\"{/enabled}\" /><Label text=\"{i18n>lastName}\" class=\"sapUiSmallMargin\" /><Input value=\"{/lastName}\" valueLiveUpdate=\"true\" width=\"200px\" enabled=\"{/enabled}\" /><CheckBox selected=\"{/enabled}\" text=\"Enabled\" /></content></Panel><Panel headerText=\"{i18n>panel2HeaderText}\" class=\"sapUiResponsiveMargin\"\n\t\twidth=\"auto\"><content><l:VerticalLayout><Label class=\"sapUiSmallMargin\" text=\"{i18n>address}:\" /><Text class=\"sapUiSmallMargin\" text=\"{/address/street}\\n{/address/zip} {/address/city}\\n{/address/country}\" width=\"200px\" /></l:VerticalLayout></content></Panel></mvc:View>",
	"web/ui5/test-resources/sap/ui/core/demokit/tutorial/databinding/08/webapp/i18n/i18n.properties": "# Field labels\rfirstName=First Name\rlastName=Last Name\renabled=Enabled\raddress=Address\r\r# Screen titles\rpanel1HeaderText=Data Binding Basics \rpanel2HeaderText=Adress Details\r",
	"web/ui5/test-resources/sap/ui/core/demokit/tutorial/databinding/08/webapp/i18n/i18n_de.properties": "# Field labels\rfirstName=Vorname\rlastName=Nachname\renabled=Aktiviert\raddress=Adresse\r\r# Screen titles\rpanel1HeaderText=Data Binding Grundlagen\rpanel2HeaderText=Adress Details"
}, "web/ui5/test-resources/sap/ui/core/demokit/tutorial/databinding/08/Component-preload");