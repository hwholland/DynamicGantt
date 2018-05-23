sap.ui.require.preload({
	"web/ui5/test-resources/sap/m/demokit/sample/TimePicker/Component.js": "jQuery.sap.declare(\"sap.m.sample.TimePicker.Component\"),sap.ui.core.UIComponent.extend(\"sap.m.sample.TimePicker.Component\",{metadata:{rootView:\"sap.m.sample.TimePicker.TimePicker\",dependencies:{libs:[\"sap.m\"]},config:{sample:{files:[\"TimePicker.view.xml\",\"TimePicker.controller.js\"]}}}});",
	"web/ui5/test-resources/sap/m/demokit/sample/TimePicker/TimePicker.controller.js": "sap.ui.define([\"sap/ui/core/mvc/Controller\",\"sap/ui/model/json/JSONModel\"],function(e,t){\"use strict\";return e.extend(\"sap.m.sample.TimePicker.TimePicker\",{onInit:function(){var e=new t;e.setData({dateValue:new Date}),this.getView().setModel(e),this.byId(\"TP3\").setDateValue(new Date),this._iEvent=0,sap.ui.getCore().attachParseError(function(e){var t=e.getParameter(\"element\");t.setValueState&&t.setValueState(sap.ui.core.ValueState.Error)}),sap.ui.getCore().attachValidationSuccess(function(e){var t=e.getParameter(\"element\");t.setValueState&&t.setValueState(sap.ui.core.ValueState.None)})},handleChange:function(e){var t=this.byId(\"T1\"),a=e.oSource,r=e.getParameter(\"value\"),i=e.getParameter(\"valid\");this._iEvent++,t.setText(\"Change - Event \"+this._iEvent+\": TimePicker \"+a.getId()+\":\"+r),i?a.setValueState(sap.ui.core.ValueState.None):a.setValueState(sap.ui.core.ValueState.Error)}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/TimePicker/TimePicker.view.xml": "<mvc:View controllerName=\"sap.m.sample.TimePicker.TimePicker\"\n\theight=\"100%\"\n\n\txmlns:mvc=\"sap.ui.core.mvc\"\n\txmlns:core=\"sap.ui.core\"\n\txmlns=\"sap.m\"><VBox class=\"sapUiSmallMargin\"><Label text = \"HH:mm\"/><TimePicker\n\t\t\t\tid=\"TP1\"\n\t\t\t\tvalue=\"19:15\"\n\t\t\t\tvalueFormat=\"HH:mm\"\n\t\t\t\tdisplayFormat=\"HH:mm\"\n\t\t\t\tchange=\"handleChange\"\n\t\t\t\tplaceholder=\"Enter meeting start time\"/><Label text=\"HH:mm:ss\"/><TimePicker\n\t\t\t\tid=\"TP2\"\n\t\t\t\tvalueFormat=\"HH:mm:ss\"\n\t\t\t\tdisplayFormat=\"HH:mm:ss\"\n\t\t\t\tchange=\"handleChange\"\n\t\t\t\tplaceholder=\"Enter meeting end time\"/><Label text=\"hh:mm a\"/><TimePicker\n\t\t\t\tid=\"TP3\"\n\t\t\t\tvalueFormat=\"hh:mm a\"\n\t\t\t\tdisplayFormat=\"hh:mm a\"\n\t\t\t\tchange=\"handleChange\"\n\t\t\t\tplaceholder=\"Enter daily task deadline\"/><Label text=\"hh:mm:ss a\"/><TimePicker\n\t\t\t\tid=\"TP4\"\n\t\t\t\tvalueFormat=\"hh:mm:ss a\"\n\t\t\t\tdisplayFormat=\"hh:mm:ss a\"\n\t\t\t\tchange=\"handleChange\"\n\t\t\t\tplaceholder=\"Enter time\"/><Text\n\t\t\t\tid=\"T1\"\n\t\t\t\ttext=\"change event result\"\n\t\t\t\tclass=\"sapUiSmallMarginTop\"\n\t\t\t\t/></VBox></mvc:View>\n"
}, "web/ui5/test-resources/sap/m/demokit/sample/TimePicker/Component-preload");