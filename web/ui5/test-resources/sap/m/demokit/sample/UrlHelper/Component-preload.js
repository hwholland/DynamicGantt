sap.ui.require.preload({
	"web/ui5/test-resources/sap/m/demokit/sample/UrlHelper/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.m.sample.UrlHelper.Component\",{metadata:{rootView:\"sap.m.sample.UrlHelper.List\",dependencies:{libs:[\"sap.m\",\"sap.ui.layout\"]},config:{sample:{files:[\"List.view.xml\",\"List.controller.js\"]}}}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/UrlHelper/List.controller.js": "sap.ui.define([\"jquery.sap.global\",\"sap/ui/core/mvc/Controller\",\"sap/ui/model/json/JSONModel\"],function(e,t,s){\"use strict\";return t.extend(\"sap.m.sample.UrlHelper.List\",{onInit:function(){var t=new s(e.sap.getModulePath(\"sap.ui.demo.mock\",\"/supplier.json\"));this.getView().setModel(t)},_getVal:function(e){return sap.ui.getCore().byId(e.getParameter(\"id\")).getValue()},handleTelPress:function(e){sap.m.URLHelper.triggerTel(this._getVal(e))},handleSmsPress:function(e){sap.m.URLHelper.triggerSms(this._getVal(e))},handleEmailPress:function(e){sap.m.URLHelper.triggerEmail(this._getVal(e),\"Info Request\")},handleUrlPress:function(e){sap.m.URLHelper.redirect(this._getVal(e),!0)}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/UrlHelper/List.view.xml": "<mvc:View\n\tcontrollerName=\"sap.m.sample.UrlHelper.List\"\n\txmlns:l=\"sap.ui.layout\"\n\txmlns:mvc=\"sap.ui.core.mvc\"\n\txmlns=\"sap.m\"><List\n\t\theaderText=\"{SupplierName}\"\n\t\tbinding=\"{/SupplierCollection/0}\" ><items><DisplayListItem\n\t\t\t\tlabel=\"Telephone\"\n\t\t\t\tvalue=\"{Tel}\"\n\t\t\t\ttype=\"Active\"\n\t\t\t\tpress=\"handleTelPress\" /><DisplayListItem\n\t\t\t\tlabel=\"SMS\"\n\t\t\t\tvalue=\"{Sms}\"\n\t\t\t\ttype=\"Active\"\n\t\t\t\tpress=\"handleSmsPress\" /><DisplayListItem\n\t\t\t\tlabel=\"Email\"\n\t\t\t\tvalue=\"{Email}\"\n\t\t\t\ttype=\"Active\"\n\t\t\t\tpress=\"handleEmailPress\" /><DisplayListItem\n\t\t\t\tlabel=\"Website\"\n\t\t\t\tvalue=\"{Url}\"\n\t\t\t\ttype=\"Active\"\n\t\t\t\tpress=\"handleUrlPress\" /></items></List></mvc:View>"
}, "web/ui5/test-resources/sap/m/demokit/sample/UrlHelper/Component-preload");