sap.ui.require.preload({
	"web/ui5/test-resources/sap/uxap/demokit/sample/HeaderContent/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.uxap.sample.HeaderContent.Component\",{metadata:{rootView:\"sap.uxap.sample.HeaderContent.HeaderContent\",dependencies:{libs:[\"sap.m\"]},config:{sample:{stretch:!0,files:[\"HeaderContent.view.xml\",\"HeaderContent.controller.js\",\"employee.json\",\"products.json\"]}}}})},!0);",
	"web/ui5/test-resources/sap/uxap/demokit/sample/HeaderContent/HeaderContent.controller.js": "sap.ui.define([\"sap/ui/model/json/JSONModel\",\"sap/ui/core/mvc/Controller\"],function(e,t){\"use strict\";return t.extend(\"sap.uxap.sample.HeaderContent.HeaderContent\",{onInit:function(){var t=new e(\"./test-resources/sap/uxap/demokit/sample/HeaderContent/employee.json\");this.getView().setModel(t,\"ObjectPageModel\")}})},!0);",
	"web/ui5/test-resources/sap/uxap/demokit/sample/HeaderContent/HeaderContent.view.xml": "<core:View\n\n\t\txmlns:core=\"sap.ui.core\"\n\t\txmlns=\"sap.uxap\"\n\t\txmlns:layout=\"sap.ui.layout\"\n\t\txmlns:m=\"sap.m\"\n\t\txmlns:f=\"sap.ui.layout.form\"\n\t\tcontrollerName=\"sap.uxap.sample.HeaderContent.HeaderContent\"\n\t\theight=\"100%\"><ObjectPageHeaderContent><content><layout:VerticalLayout><m:ObjectStatus title=\"User ID\" text=\"12345678\"/><m:ObjectStatus title=\"Functional Area\" text=\"Developement\"/><m:ObjectStatus title=\"Cost Center\" text=\"PI DFA GD Programs and Product\"/><m:ObjectStatus title=\"Email\" text=\"email@address.com\"/></layout:VerticalLayout><m:Text width=\"200px\"\n\t\t\t\t\ttext=\"Hi, I'm Denise. I am passionate about what I do and I'll go the extra mile to make the customer win.\"/><m:ObjectStatus text=\"In Stock\" state=\"Error\"/><m:ObjectStatus title=\"Label\" text=\"In Stock\" state=\"Warning\"/><m:ObjectNumber number=\"1000\" numberUnit=\"SOOK\" emphasized=\"false\" state=\"Success\"/><m:ProgressIndicator\n\t\t\t\t\tpercentValue=\"30\"\n\t\t\t\t\tdisplayValue=\"30%\"\n\t\t\t\t\tshowValue=\"true\"\n\t\t\t\t\tstate=\"None\"/><layout:VerticalLayout><layout:layoutData><ObjectPageHeaderLayoutData\n\t\t\t\t\t\t\tshowSeparatorAfter=\"false\"/></layout:layoutData><m:Label text=\"PC, Unrestricted-Use Stock\"/><m:ObjectNumber number=\"219\" numberUnit=\"K\"></m:ObjectNumber></layout:VerticalLayout><layout:VerticalLayout><layout:layoutData><ObjectPageHeaderLayoutData\n\t\t\t\t\t\t\tvisibleS=\"false\"\n\t\t\t\t\t\t\tshowSeparatorAfter=\"false\"/></layout:layoutData><m:Label text=\"PC, Not in Small Size\"/><m:ObjectNumber number=\"220\" numberUnit=\"K\"></m:ObjectNumber></layout:VerticalLayout><layout:VerticalLayout><layout:layoutData><ObjectPageHeaderLayoutData\n\t\t\t\t\t\t\tvisibleM=\"false\"\n\t\t\t\t\t\t\tshowSeparatorAfter=\"false\"/></layout:layoutData><m:Label text=\"PC, Not in Medium Size\"/><m:ObjectNumber number=\"221\" numberUnit=\"K\"></m:ObjectNumber></layout:VerticalLayout><layout:VerticalLayout><layout:layoutData><ObjectPageHeaderLayoutData\n\t\t\t\t\t\t\tvisibleL=\"false\"\n\t\t\t\t\t\t\tshowSeparatorAfter=\"true\"/></layout:layoutData><m:Label text=\"PC, Not in Large Size\"/><m:ObjectNumber number=\"219\" numberUnit=\"K\"></m:ObjectNumber></layout:VerticalLayout><m:ObjectAttribute title=\"Label\" text=\"In Stock\"/><m:Button icon=\"sap-icon://nurse\"/><m:Tokenizer><m:Token text=\"Wayne Enterprises\"/><m:Token text=\"Big's Caramels\"/></m:Tokenizer></content></ObjectPageHeaderContent></core:View>\n"
}, "web/ui5/test-resources/sap/uxap/demokit/sample/HeaderContent/Component-preload");