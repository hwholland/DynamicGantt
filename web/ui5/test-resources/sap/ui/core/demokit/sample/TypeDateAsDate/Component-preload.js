sap.ui.require.preload({
	"web/ui5/test-resources/sap/ui/core/demokit/sample/TypeDateAsDate/C.controller.js": "sap.ui.define([\"sap/ui/core/mvc/Controller\",\"sap/ui/model/json/JSONModel\"],function(e,t){\"use strict\";return e.extend(\"sap.ui.core.sample.TypeDateAsDate.C\",{_data:{date:new Date},onInit:function(e){var a=new t(this._data);this.getView().setModel(a)}})});",
	"web/ui5/test-resources/sap/ui/core/demokit/sample/TypeDateAsDate/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.ui.core.sample.TypeDateAsDate.Component\",{metadata:{rootView:\"sap.ui.core.sample.TypeDateAsDate.V\",dependencies:{libs:[\"sap.m\",\"sap.ui.layout\"]},config:{sample:{files:[\"V.view.xml\",\"C.controller.js\"]}}}})});",
	"web/ui5/test-resources/sap/ui/core/demokit/sample/TypeDateAsDate/V.view.xml": "<mvc:View\n\tcontrollerName=\"sap.ui.core.sample.TypeDateAsDate.C\"\n\txmlns:mvc=\"sap.ui.core.mvc\"\n\txmlns:form=\"sap.ui.layout.form\"\n\txmlns=\"sap.m\"><form:SimpleForm\n\t\twidth=\"auto\"\n\t\tclass=\"sapUiResponsiveMargin\"\n\t\tlayout=\"ResponsiveGridLayout\"\n\t\teditable=\"true\"\n\t\tlabelSpanL=\"3\"\n\t\tlabelSpanM=\"3\"\n\t\tcolumnsL=\"1\"\n\t\tcolumnsM=\"1\"\n\t\temptySpanL=\"4\"\n\t\temptySpanM=\"4\"\n\t\ttitle=\"Date Input\" ><form:content><Label text=\"Date\" /><DatePicker dateValue=\"{/date}\"/></form:content></form:SimpleForm><form:SimpleForm\n\t\twidth=\"auto\"\n\t\tclass=\"sapUiResponsiveMargin\"\n\t\tlayout=\"ResponsiveGridLayout\"\n\t\tlabelSpanL=\"3\"\n\t\tlabelSpanM=\"3\"\n\t\temptySpanL=\"4\"\n\t\temptySpanM=\"4\"\n\t\tcolumnsL=\"1\"\n\t\tcolumnsM=\"1\"\n\t\ttitle=\"Format Options\" ><form:content><Label text=\"Short\" /><Text text=\"{\n\t\t\t\tpath: '/date',\n\t\t\t\ttype: 'sap.ui.model.type.Date',\n\t\t\t\tformatOptions: {\n\t\t\t\t\tstyle: 'short'\n\t\t\t\t}\n\t\t\t}\" /><Label text=\"Medium\" /><Text text=\"{\n\t\t\t\tpath: '/date',\n\t\t\t\ttype: 'sap.ui.model.type.Date',\n\t\t\t\tformatOptions: {\n\t\t\t\t\tstyle: 'medium'\n\t\t\t\t}\n\t\t\t}\" /><Label text=\"Long\" /><Text text=\"{\n\t\t\t\tpath : '/date',\n\t\t\t\ttype : 'sap.ui.model.type.Date',\n\t\t\t\tformatOptions: {\n\t\t\t\t\tstyle : 'long'\n\t\t\t\t}\n\t\t\t}\" /><Label text=\"Full\" /><Text text=\"{\n\t\t\t\tpath: '/date',\n\t\t\t\ttype: 'sap.ui.model.type.Date',\n\t\t\t\tformatOptions: {\n\t\t\t\t\tstyle: 'full'\n\t\t\t\t}\n\t\t\t}\" /></form:content></form:SimpleForm><form:SimpleForm\n\t\twidth=\"auto\"\n\t\tclass=\"sapUiResponsiveMargin\"\n\t\tlayout=\"ResponsiveGridLayout\"\n\t\tlabelSpanL=\"3\"\n\t\tlabelSpanM=\"3\"\n\t\temptySpanL=\"4\"\n\t\temptySpanM=\"4\"\n\t\tcolumnsL=\"1\"\n\t\tcolumnsM=\"1\"\n\t\ttitle=\"Relative Time Format\" ><form:content><Label text=\"Relative Time\" /><Text text=\"{\n\t\t\t\tpath: '/date',\n\t\t\t\ttype: 'sap.ui.model.type.Date',\n\t\t\t\tformatOptions: {\n\t\t\t\t\trelative: true,\n\t\t\t\t\trelativeScale: 'auto'\n\t\t\t\t}\n\t\t\t}\" /></form:content></form:SimpleForm></mvc:View>\n"
}, "web/ui5/test-resources/sap/ui/core/demokit/sample/TypeDateAsDate/Component-preload");