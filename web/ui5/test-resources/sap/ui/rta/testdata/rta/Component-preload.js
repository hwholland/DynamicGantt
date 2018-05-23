sap.ui.require.preload({
	"web/ui5/test-resources/sap/ui/rta/testdata/rta/ComplexTest.controller.js": "!function(){\"use strict\";sap.ui.controller(\"sap.ui.rta.test.ComplexTest\",{onInit:function(){jQuery.sap.require(\"sap.ui.core.util.MockServer\"),e=\"/destinations/E91/sap/opu/odata/SAP/FAC_FINANCIAL_DOCUMENT_SRV_01/?sap-documentation=all\";var e,t,a,o=new sap.ui.core.util.MockServer({rootUri:e});this._sResourcePath=jQuery.sap.getResourcePath(\"sap/ui/rta/test\"),o.simulate(this._sResourcePath+\"/../mockserver/metadata.xml\",this._sResourcePath+\"/../mockserver\"),o.start(),(t=new sap.ui.model.odata.ODataModel(e,{json:!0,loadMetadataAsync:!0})).setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay),t.setCountSupported(!1),this._oModel=t,(a=this.getView()).setModel(t);var s=new sap.ui.model.json.JSONModel;s.setData({readonly:!1,mandatory:!1,visible:!0,enabled:!0}),a.setModel(s,\"state\"),this.getView().byId(\"obheader0\").bindElement(\"/Headers(AccountingDocument='100015012',CompanyCode='0001',FiscalYear='2015')\"),this.getView().byId(\"MainForm\").bindElement(\"/Headers(AccountingDocument='100015012',CompanyCode='0001',FiscalYear='2015')\")},_getUrlParameter:function(e){for(var t=\"\",a=window.location.search.substring(1).split(\"&\"),o=0;o<a.length;o++){var s=a[o].split(\"=\");s[0]==e&&(t=s[1])}return t},switchToAdaptionMode:function(){jQuery.sap.require(\"sap.ui.rta.RuntimeAuthoring\"),new sap.ui.rta.RuntimeAuthoring({rootControl:sap.ui.getCore().byId(\"idMain1\"),customFieldUrl:this._sResourcePath+\"/testdata/rta/CustomField.html\",showCreateCustomField:\"true\"==this._getUrlParameter(\"sap-ui-xx-ccf\")}).start()}})}();",
	"web/ui5/test-resources/sap/ui/rta/testdata/rta/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\",\"sap/ui/fl/FakeLrepConnector\",\"sap/ui/rta/util/FakeLrepConnectorLocalStorage\"],function(e,t,a){\"use strict\";return e.extend(\"sap.ui.rta.test.Component\",{metadata:{manifest:\"json\"},init:function(){this._bShowAdaptButton=!!this.getComponentData().showAdaptButton&&this.getComponentData().showAdaptButton,sap.ui.core.UIComponent.prototype.init.apply(this,arguments)},createContent:function(){this._createFakeLrep();var e=new sap.m.App,t=new sap.ui.model.json.JSONModel({showAdaptButton:this._bShowAdaptButton}),a=sap.ui.view(\"idMain1\",{viewName:\"sap.ui.rta.test.ComplexTest\",type:sap.ui.core.mvc.ViewType.XML});return a.setModel(t,\"view\"),e.addPage(a),e},_createFakeLrep:function(){/[&?](sap-rta-clear-cache-lrep=(true|x)[&#]?)+/i.test(window.location.search)&&(jQuery.extend(t.prototype,a),t.deleteChanges()),/[&?](sap-rta-mock-lrep=(true|x)[&#]?)+/i.test(window.location.search)&&(jQuery.extend(t.prototype,a),t.enableFakeConnector(jQuery.sap.getModulePath(\"sap.ui.rta.test.FakeLrepConnector\")+\".json\"))}})});",
	"web/ui5/test-resources/sap/ui/rta/testdata/rta/Test.controller.js": "!function(){\"use strict\";sap.ui.controller(\"rta.view.Test\",{onInit:function(){}})}();",
	"web/ui5/test-resources/sap/ui/rta/testdata/rta/ComplexTest.view.xml": "<core:View xmlns:core=\"sap.ui.core\" xmlns=\"sap.m\"\n\txmlns:smartField=\"sap.ui.comp.smartfield\" xmlns:smartForm=\"sap.ui.comp.smartform\"\n\txmlns:form=\"sap.ui.layout.form\" xmlns:smartTable=\"sap.ui.comp.smarttable\"\n\txmlns:html=\"http://www.w3.org/1999/xhtml\"\n\txmlns:sap.ui.layout=\"sap.ui.layout\"\n\txmlns:sap.ui.rta=\"sap.ui.rta\"\n\txmlns:app=\"http://schemas.sap.com/sapui5/extension/sap.ui.core.CustomData/1\"\n\tcontrollerName=\"sap.ui.rta.test.ComplexTest\"><Page title=\"{i18n>appTitle}\"><headerContent><Button text=\"{i18n>btnAdapt}\" visible=\"{view>/showAdaptButton}\" press=\".switchToAdaptionMode\" /></headerContent><content><sap.ui.layout:VerticalLayout id=\"layout0\" width=\"100%\"><ObjectHeader id=\"obheader0\" title=\"{CompanyCodeName}\" number=\"{Summary}\" numberUnit=\"{CoCodeCurrency}\"><attributes><ObjectAttribute id=\"attribute1\" title=\"{AccountingDocumentTypeName}\" text=\"{AccountingDocument}\" active=\"false\"/></attributes><statuses><ObjectStatus id=\"status1\" text=\"{AccountingDocumentStatus}\" state=\"Error\"/></statuses><attributes><ObjectAttribute id=\"attribute2\" title=\"{OverallDiscount}\" text=\"{OverallDiscountAmount}\" active=\"false\"/></attributes><statuses><ObjectStatus id=\"status2\" text=\"{ExpirationState}\" state=\"Error\"/></statuses></ObjectHeader></sap.ui.layout:VerticalLayout><sap.ui.layout:VerticalLayout width=\"100%\"><smartForm:SmartForm id=\"MainForm\" title=\"Information\" editable=\"true\" entityType=\"Header\" ignoredFields=\"TransactionCode\"><smartForm:Group id=\"GeneralLedgerDocument\" label=\"General Ledger Document\" ><smartForm:GroupElement id=\"GeneralLedgerDocument.Name\" ><smartField:SmartField editable=\"true\" contextEditable=\"true\" value=\"{AccountingDocument}\"/></smartForm:GroupElement><smartForm:GroupElement id=\"GeneralLedgerDocument.CompanyCode\" ><smartField:SmartField value=\"{CompanyCode}\"/></smartForm:GroupElement><smartForm:GroupElement label=\"Ship-to-Adress\" id=\"GeneralLedgerDocument.CompanyAdress\" ><smartField:SmartField value=\"{CompanyAdress}\"></smartField:SmartField></smartForm:GroupElement><smartForm:GroupElement id=\"GeneralLedgerDocument.TextArea\" ><TextArea value=\"{CreatedByUserName}\"/></smartForm:GroupElement><smartForm:GroupElement id=\"GeneralLedgerDocument.Mandatory\" ><smartField:SmartField value=\"Some Value\" mandatory=\"true\"></smartField:SmartField></smartForm:GroupElement><smartForm:GroupElement label=\"Hello\" id=\"GeneralLedgerDocument.I18NTest\" ><smartField:SmartField value=\"{i18n>groupElementLabelText}\"></smartField:SmartField></smartForm:GroupElement><smartForm:GroupElement label=\"One-Bound-Field\" id=\"GeneralLedgerDocument.BoundButton\" ><Button text=\"{i18n>buttonText}\"></Button><TextArea value=\"{CreatedByUser}\"></TextArea></smartForm:GroupElement><smartForm:GroupElement label=\"No-Bound-Field\" id=\"GeneralLedgerDocument.BoundButton34\" ><Button text=\"{i18n>buttonText}\"></Button><TextArea value=\"Some Text\"></TextArea></smartForm:GroupElement><smartForm:GroupElement id=\"GeneralLedgerDocument.UnboundButton\" ><Button text=\"No Binding\"></Button></smartForm:GroupElement><smartForm:GroupElement label=\"Expiry Date\" id=\"GeneralLedgerDocument.ExpirationDate\" ><smartField:SmartField value=\"{ExpirationDate}\" /></smartForm:GroupElement><smartForm:GroupElement id=\"GeneralLedgerDocument.ValidityFrom\" ><smartField:SmartField value=\"{ValidityFrom}\" /></smartForm:GroupElement><smartForm:GroupElement id=\"GeneralLedgerDocument.ValidityTo\" ><smartField:SmartField editable=\"true\" contextEditable=\"true\" value=\"{ValidityTo}\" /></smartForm:GroupElement><smartForm:GroupElement id=\"GeneralLedgerDocument.RequestedDeliveryDate\" ><smartField:SmartField value=\"{RequestedDeliveryDate}\" /></smartForm:GroupElement></smartForm:Group><smartForm:Group label=\"Dates\" id=\"Dates\" ><smartForm:GroupElement label=\"Belegdatum\" id=\"Dates.DocumentDate\" ><smartField:SmartField value=\"{DocumentDate}\" /></smartForm:GroupElement><smartForm:GroupElement label=\"Two-Bound-Fields\" id=\"GeneralLedgerDocument.BoundButton35\" ><Button text=\"{PostingDate}\"></Button><TextArea value=\"{CreationDate}\"></TextArea></smartForm:GroupElement></smartForm:Group><smartForm:Group label=\"Reversal\" id=\"Reversal\" ><smartForm:GroupElement  label=\"Storniert mit\" id=\"Reversal.ReversalDocument\" ><smartField:SmartField value=\"{ReverseDocument}\" /></smartForm:GroupElement><smartForm:GroupElement label=\"Text\" id=\"Reversal.ReversalReasonName\" ><smartField:SmartField value=\"{ReversalReasonName}\" /></smartForm:GroupElement><smartForm:GroupElement></smartForm:GroupElement></smartForm:Group><smartForm:Group label=\"Group without stable Id\"><smartForm:GroupElement  id=\"FieldInGroupWithoutStableId\" ><smartField:SmartField value=\"{FiscalYear}\" /></smartForm:GroupElement></smartForm:Group></smartForm:SmartForm></sap.ui.layout:VerticalLayout><sap.ui.layout:VerticalLayout width=\"100%\"><form:SimpleForm id=\"SimpleForm\"\n\t\t\t\t\tmaxContainerCols=\"3\"\n\t\t\t\t\teditable=\"true\"\n\t\t\t\t\tlayout=\"ResponsiveGridLayout\"\n\t\t\t\t\ttitle=\"Address\"\n\t\t\t\t\tlabelSpanXL=\"4\"\n\t\t\t\t\tlabelSpanL=\"4\"\n\t\t\t\t\tlabelSpanM=\"4\"\n\t\t\t\t\temptySpanXL=\"0\"\n\t\t\t\t\temptySpanL=\"0\"\n\t\t\t\t\temptySpanM=\"0\"\n\t\t\t\t\tcolumnsXL=\"3\"\n\t\t\t\t\tcolumnsL=\"2\"\n\t\t\t\t\tcolumnsM=\"2\"\n\t\t\t\t\tclass=\"editableForm\"><form:content><core:Title id=\"Title0\" text=\"Office\" /><Label id=\"Label0\" text=\"Name\" /><Input id=\"Input0\" value=\"{SupplierName}\" /><Label id=\"Label1\" text=\"Street/No.\" /><Input id=\"Input1\" value=\"{Street}\"></Input><Input id=\"Input2\" value=\"{HouseNumber}\"><layoutData><sap.ui.layout:GridData span=\"L3 M3 S4\" /></layoutData></Input><Label id=\"Label2\" text=\"ZIP Code/City\" /><Input id=\"Input3\" value=\"{ZIPCode}\"><layoutData><sap.ui.layout:GridData span=\"L3 M3 S4\" /></layoutData></Input><Input id=\"Input4\" value=\"{City}\" /><Label id=\"Label3\" text=\"Country\" /><Select id=\"Select0\" width=\"100%\"><items><core:Item text=\"Germany\" /><core:Item text=\"USA\" /><core:Item text=\"England\" /></items></Select><core:Title id=\"Title1\" text=\"Online\" /><Label id=\"Label4\" text=\"Web\" /><Input id=\"Input5\" value=\"{Url}\" /><Label id=\"Label5\" text=\"Twitter\" /><Input id=\"Input6\" value=\"{Twitter}\" /><core:Title id=\"Title2\" text=\"Contact data\" /><Label id=\"Label6\" text=\"Email\" /><Input id=\"Input7\" value=\"{EMail}\" type=\"Email\" /><Label id=\"Label7\" text=\"Tel.\" /><Input id=\"Input8\" value=\"{Tel}\" type=\"Tel\" /><Label id=\"Label8\" text=\"SMS\" /><Input id=\"Input9\" value=\"{Sms}\" type=\"Tel\" /></form:content></form:SimpleForm></sap.ui.layout:VerticalLayout><sap.ui.layout:VerticalLayout width=\"100%\"><smartForm:SmartForm title=\"SmartForm without stable ids\" entityType=\"Header, Tax\"><smartForm:layout><smartForm:Layout columnsL=\"2\" breakpointL=\"900\" /></smartForm:layout><smartForm:Group label=\"General Ledger Document\" ><smartForm:GroupElement label=\"Ship-to-Party\"><smartField:SmartField value=\"{CompanyCode}\"/></smartForm:GroupElement></smartForm:Group><smartForm:Group label=\"Dates\" ><smartForm:GroupElement label=\"BLA42\" ><smartField:SmartField value=\"{DocumentDate}\" /></smartForm:GroupElement><smartForm:GroupElement label=\"Buchungsdatum\" ><smartField:SmartField value=\"{PostingDate}\" /></smartForm:GroupElement></smartForm:Group></smartForm:SmartForm></sap.ui.layout:VerticalLayout></content></Page></core:View>\n",
	"web/ui5/test-resources/sap/ui/rta/testdata/rta/Test.view.xml": "<sap.ui.core.mvc:View controllerName=\"rta.view.Test\"\n    xmlns=\"sap.m\"\n    xmlns:sap.ui.layout=\"sap.ui.layout\"\n    xmlns:sap.ui.core.mvc=\"sap.ui.core.mvc\" ><Page title=\"Title\"><content><sap.ui.layout:VerticalLayout id=\"layout0\" width=\"50%\"><Button id=\"button0\" text=\"Button 0\" width=\"100px\"></Button><sap.ui.layout:HorizontalLayout id=\"layout0-0\"><Button id=\"button0-0\" text=\"Button 0 0\" width=\"100px\"></Button></sap.ui.layout:HorizontalLayout></sap.ui.layout:VerticalLayout><sap.ui.layout:VerticalLayout id=\"layout1\" width=\"50%\"><Button id=\"button1\" text=\"Button 1\" width=\"100px\"></Button></sap.ui.layout:VerticalLayout></content></Page></sap.ui.core.mvc:View>",
	"web/ui5/test-resources/sap/ui/rta/testdata/rta/i18n/i18n.properties": "#This is the properties file for the sap.ui.rta demo application\r\n# __ldi.translation.uuid=8ef1b150-0e8d-11e5-b939-0800200c9a66\r\n\r\n#XTIT: Application Title\r\nappTitle=RTA Test Application\r\n#XTXT: Application Description\r\nappDescription=Test Application for Runtime Adaptation\r\n#XBUT: Button for starting the UI adaptation mode\r\nbtnAdapt=Adapt UI\r\ngroupElementLabelText=Some label text"
}, "web/ui5/test-resources/sap/ui/rta/testdata/rta/Component-preload");