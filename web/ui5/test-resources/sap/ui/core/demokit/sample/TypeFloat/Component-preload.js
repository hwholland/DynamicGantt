sap.ui.require.preload({
	"web/ui5/test-resources/sap/ui/core/demokit/sample/TypeFloat/C.controller.js": "sap.ui.define([\"sap/ui/core/mvc/Controller\",\"sap/ui/model/json/JSONModel\"],function(e,t){\"use strict\";return e.extend(\"sap.ui.core.sample.TypeFloat.C\",{_data:{number:\"123.456\"},onInit:function(e){var n=new t(this._data);this.getView().setModel(n)}})});",
	"web/ui5/test-resources/sap/ui/core/demokit/sample/TypeFloat/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.ui.core.sample.TypeFloat.Component\",{metadata:{rootView:\"sap.ui.core.sample.TypeFloat.V\",dependencies:{libs:[\"sap.m\",\"sap.ui.layout\"]},config:{sample:{files:[\"V.view.xml\",\"C.controller.js\"]}}}})});",
	"web/ui5/test-resources/sap/ui/core/demokit/sample/TypeFloat/V.view.xml": "<mvc:View\n\tcontrollerName=\"sap.ui.core.sample.TypeFloat.C\"\n\txmlns:mvc=\"sap.ui.core.mvc\"\n\txmlns:form=\"sap.ui.layout.form\"\n\txmlns=\"sap.m\"><form:SimpleForm\n\t\twidth=\"auto\"\n\t\tclass=\"sapUiResponsiveMargin\"\n\t\tlayout=\"ResponsiveGridLayout\"\n\t\teditable=\"true\"\n\t\tlabelSpanL=\"3\"\n\t\tlabelSpanM=\"3\"\n\t\temptySpanL=\"4\"\n\t\temptySpanM=\"4\"\n\t\tcolumnsL=\"1\"\n\t\tcolumnsM=\"1\"\n\t\ttitle=\"Number Input\" ><form:content><Label text=\"Number\" /><Input value=\"{path:'/number', type:'sap.ui.model.type.Float'}\"/></form:content></form:SimpleForm><form:SimpleForm\n\t\twidth=\"auto\"\n\t\tclass=\"sapUiResponsiveMargin\"\n\t\tlayout=\"ResponsiveGridLayout\"\n\t\tlabelSpanL=\"3\"\n\t\tlabelSpanM=\"3\"\n\t\temptySpanL=\"4\"\n\t\temptySpanM=\"4\"\n\t\tcolumnsL=\"1\"\n\t\tcolumnsM=\"1\"\n\t\ttitle=\"Min Integer Digits (minimal number of non-fraction digits)\"><form:content><Label text=\"3 digits\" /><Text text=\"{\n\t\t\t\tpath: '/number',\n\t\t\t\ttype: 'sap.ui.model.type.Float',\n\t\t\t\tformatOptions: {\n\t\t\t\t\tminIntegerDigits: 3\n\t\t\t\t}\n\t\t\t}\" /><Label text=\"5 digits\" /><Text text=\"{\n\t\t\t\tpath: '/number',\n\t\t\t\ttype: 'sap.ui.model.type.Float',\n\t\t\t\tformatOptions: {\n\t\t\t\t\tminIntegerDigits: 5\n\t\t\t\t}\n\t\t\t}\" /></form:content></form:SimpleForm><form:SimpleForm\n\t\twidth=\"auto\"\n\t\tclass=\"sapUiResponsiveMargin\"\n\t\tlayout=\"ResponsiveGridLayout\"\n\t\tlabelSpanL=\"3\"\n\t\tlabelSpanM=\"3\"\n\t\temptySpanL=\"4\"\n\t\temptySpanM=\"4\"\n\t\tcolumnsL=\"1\"\n\t\tcolumnsM=\"1\"\n\t\ttitle=\"Max Integer Digits (maximal number of non-fraction digits)\"><form:content><Label text=\"2 digits\" /><Text text=\"{\n\t\t\t\tpath: '/number',\n\t\t\t\ttype: 'sap.ui.model.type.Float',\n\t\t\t\tformatOptions: {\n\t\t\t\t\tmaxIntegerDigits: 2\n\t\t\t\t}\n\t\t\t}\" /><Label text=\"5 digits\" /><Text text=\"{\n\t\t\t\tpath: '/number',\n\t\t\t\ttype: 'sap.ui.model.type.Float',\n\t\t\t\tformatOptions: {\n\t\t\t\t\tmaxIntegerDigits: 5\n\t\t\t\t}\n\t\t\t}\" /></form:content></form:SimpleForm><form:SimpleForm\n\t\twidth=\"auto\"\n\t\tclass=\"sapUiResponsiveMargin\"\n\t\tlayout=\"ResponsiveGridLayout\"\n\t\tlabelSpanL=\"3\"\n\t\tlabelSpanM=\"3\"\n\t\temptySpanL=\"4\"\n\t\temptySpanM=\"4\"\n\t\tcolumnsL=\"1\"\n\t\tcolumnsM=\"1\"\n\t\ttitle=\"Min Fraction Digits (minimal number of fraction digits)\"><form:content><Label text=\"2 digits\" /><Text text=\"{\n\t\t\t\tpath: '/number',\n\t\t\t\ttype: 'sap.ui.model.type.Float',\n\t\t\t\tformatOptions: {\n\t\t\t\t\tminFractionDigits: 2\n\t\t\t\t}\n\t\t\t}\" /><Label text=\"5 digits\" /><Text text=\"{\n\t\t\t\tpath: '/number',\n\t\t\t\ttype: 'sap.ui.model.type.Float',\n\t\t\t\tformatOptions: {\n\t\t\t\t\tminFractionDigits: 5\n\t\t\t\t}\n\t\t\t}\" /></form:content></form:SimpleForm><form:SimpleForm\n\t\twidth=\"auto\"\n\t\tclass=\"sapUiResponsiveMargin\"\n\t\tlayout=\"ResponsiveGridLayout\"\n\t\tlabelSpanL=\"3\"\n\t\tlabelSpanM=\"3\"\n\t\temptySpanL=\"4\"\n\t\temptySpanM=\"4\"\n\t\tcolumnsL=\"1\"\n\t\tcolumnsM=\"1\"\n\t\ttitle=\"Max Fraction Digits (maximal number of fraction digits)\"><form:content><Label text=\"2 digits\" /><Text text=\"{\n\t\t\t\tpath: '/number',\n\t\t\t\ttype: 'sap.ui.model.type.Float',\n\t\t\t\tformatOptions: {\n\t\t\t\t\tmaxFractionDigits: 2\n\t\t\t\t}\n\t\t\t}\" /><Label text=\"5 digits\" /><Text text=\"{\n\t\t\t\tpath: '/number',\n\t\t\t\ttype: 'sap.ui.model.type.Float',\n\t\t\t\tformatOptions: {\n\t\t\t\t\tmaxFractionDigits: 5\n\t\t\t\t}\n\t\t\t}\" /></form:content></form:SimpleForm></mvc:View>\n"
}, "web/ui5/test-resources/sap/ui/core/demokit/sample/TypeFloat/Component-preload");