sap.ui.require.preload({
	"web/ui5/test-resources/sap/ui/core/demokit/tutorial/databinding/11/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.ui.core.tutorial.databinding.11.Component\",{metadata:{config:{sample:{iframe:\"webapp/index.html\",stretch:!0,files:[\"webapp/controller/App.controller.js\",\"webapp/i18n/i18n.properties\",\"webapp/i18n/i18n_de.properties\",\"webapp/view/App.view.xml\",\"webapp/index.html\"]}}}})});",
	"web/ui5/test-resources/sap/ui/core/demokit/tutorial/databinding/11/webapp/controller/App.controller.js": "sap.ui.define([\"sap/ui/core/mvc/Controller\"],function(e){\"use strict\";return e.extend(\"sap.ui.demo.db.controller.App\",{formatMapUrl:function(e,o,r,t){return\"https://maps.googleapis.com/maps/api/staticmap?zoom=13&size=500x300&markers=\"+jQuery.sap.encodeURL(e+\", \"+o+\" \"+r+\", \"+t)}})});",
	"web/ui5/test-resources/sap/ui/core/demokit/tutorial/databinding/11/webapp/view/App.view.xml": "<mvc:View xmlns=\"sap.m\" xmlns:l=\"sap.ui.layout\" xmlns:mvc=\"sap.ui.core.mvc\" controllerName=\"sap.ui.demo.db.controller.App\"><Panel headerText=\"{i18n>panel1HeaderText}\" class=\"sapUiResponsiveMargin\" width=\"auto\"><content><Label text=\"{i18n>firstName}\" class=\"sapUiSmallMargin\" /><Input value=\"{/firstName}\" valueLiveUpdate=\"true\" width=\"200px\" enabled=\"{/enabled}\" /><Label text=\"{i18n>lastName}\" class=\"sapUiSmallMargin\" /><Input value=\"{/lastName}\" valueLiveUpdate=\"true\" width=\"200px\" enabled=\"{/enabled}\" /><CheckBox selected=\"{/enabled}\" text=\"Enabled\" /></content></Panel><Panel headerText=\"{i18n>panel2HeaderText}\" class=\"sapUiResponsiveMargin\"\n\t\twidth=\"auto\"><content><l:VerticalLayout><Label class=\"sapUiSmallMargin\" text=\"{i18n>address}:\" /><Text class=\"sapUiSmallMargin\" text=\"{/address/street}\\n{/address/zip} {/address/city}\\n{/address/country}\" width=\"200px\" /><Image \tclass=\"sapUiSmallMargin\" width=\"500px\" height=\"300px\"\n\t\t\t\t\t\tsrc=\"{\n\t\t\t\t\t\t\t\tparts: [\n\t\t\t\t\t\t\t\t\t\t'/address/street',\n\t\t\t\t\t\t\t\t\t\t'/address/zip',\n\t\t\t\t\t\t\t\t\t\t'/address/city',\n\t\t\t\t\t\t\t\t\t\t'/address/country'\n\t\t\t\t\t\t\t\t\t\t],\n\t\t\t\t\t\t\t\tformatter: '.formatMapUrl'\n\t\t\t\t\t\t\t}\" /></l:VerticalLayout><l:VerticalLayout><Label text=\"{i18n>salesToDate}\" class=\"sapUiSmallMargin\" /><Input width=\"200px\" enabled=\"{/enabled}\" description=\"{/currencyCode}\"\n\t\t\t\t\t\tvalue=\"{ parts: [{path: '/salesToDate'}, {path: '/currencyCode'}], type: 'sap.ui.model.type.Currency', formatOptions: {showMeasure: false } }\"/></l:VerticalLayout></content></Panel></mvc:View>",
	"web/ui5/test-resources/sap/ui/core/demokit/tutorial/databinding/11/webapp/i18n/i18n.properties": "# Field labels\rfirstName=First Name\rlastName=Last Name\renabled=Enabled\raddress=Address\rsalesToDate=Sales to Date\r\r# Screen titles\rpanel1HeaderText=Data Binding Basics \rpanel2HeaderText=Adress Details\r",
	"web/ui5/test-resources/sap/ui/core/demokit/tutorial/databinding/11/webapp/i18n/i18n_de.properties": "# Field labels\rfirstName=Vorname\rlastName=Nachname\renabled=Aktiviert\raddress=Adresse\rsalesToDate=Verk�ufe bis zum heutigen Datum\r\r# Screen titles\rpanel1HeaderText=Data Binding Grundlagen\rpanel2HeaderText=Adress Details"
}, "web/ui5/test-resources/sap/ui/core/demokit/tutorial/databinding/11/Component-preload");