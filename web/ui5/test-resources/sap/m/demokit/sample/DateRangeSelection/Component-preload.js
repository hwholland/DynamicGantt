sap.ui.require.preload({
	"web/ui5/test-resources/sap/m/demokit/sample/DateRangeSelection/C.controller.js": "sap.ui.define([\"sap/ui/core/mvc/Controller\",\"sap/ui/model/json/JSONModel\"],function(e,t){\"use strict\";return e.extend(\"sap.m.sample.DateRangeSelection.C\",{onInit:function(){var e=new Date;e.setUTCDate(2),e.setUTCMonth(1),e.setUTCFullYear(2014);var a=new Date;a.setUTCDate(17),a.setUTCMonth(1),a.setUTCFullYear(2014);var n=new t;n.setData({delimiterDRS1:\"@\",dateValueDRS1:e,secondDateValueDRS1:a,dateFormatDRS1:\"yyyy/MM/dd\",dateValueDRS2:new Date(2016,1,16),secondDateValueDRS2:new Date(2016,1,18),dateMinDRS2:new Date(2016,0,1),dateMaxDRS2:new Date(2016,11,31)}),this.getView().setModel(n),this._iEvent=0},handleChange:function(e){var t=e.getParameter(\"from\"),a=e.getParameter(\"to\"),n=e.getParameter(\"valid\");this._iEvent++,this.byId(\"TextEvent\").setText(\"Id: \"+e.oSource.getId()+\"\\nFrom: \"+t+\"\\nTo: \"+a);var r=e.oSource;n?r.setValueState(sap.ui.core.ValueState.None):r.setValueState(sap.ui.core.ValueState.Error)}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/DateRangeSelection/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.m.sample.DateRangeSelection.Component\",{metadata:{rootView:\"sap.m.sample.DateRangeSelection.V\",dependencies:{libs:[\"sap.m\",\"sap.ui.layout\",\"sap.ui.unified\"]},config:{sample:{files:[\"V.view.xml\",\"C.controller.js\"]}}}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/DateRangeSelection/V.view.xml": "<mvc:View\n\tcontrollerName=\"sap.m.sample.DateRangeSelection.C\"\n\txmlns:l=\"sap.ui.layout\"\n\txmlns:mvc=\"sap.ui.core.mvc\"\n\txmlns=\"sap.m\" ><VBox class=\"sapUiSmallMargin\"><Label text=\"DateRangeSelection with delimiter '@' and displayFormat 'yyyy/MM/dd', set via binding:\" labelFor=\"DRS1\"/><DateRangeSelection\n\t\t\tid=\"DRS1\"\n\t\t\tdelimiter=\"{path:'/delimiterDRS1'}\"\n\t\t\tdateValue=\"{path:'/dateValueDRS1'}\"\n\t\t\tsecondDateValue=\"{path:'/secondDateValueDRS1'}\"\n\t\t\tdisplayFormat=\"{path:'/dateFormatDRS1'}\"\n\t\t\tchange=\"handleChange\"\n\t\t/><Label text=\"DateRangeSelection with minDate=2016-01-01 and maxDate=2016-12-31:\" labelFor=\"DRS2\"/><DateRangeSelection\n\t\t\tid=\"DRS2\"\n\t\t\tdateValue=\"{path:'/dateValueDRS2'}\"\n\t\t\tsecondDateValue=\"{path:'/secondDateValueDRS2'}\"\n\t\t\tminDate=\"{path:'/dateMinDRS2'}\"\n\t\t\tmaxDate=\"{path:'/dateMaxDRS2'}\"\n\t\t\tchange=\"handleChange\"\n\t\t/><Label text=\"Change event\" labelFor=\"TextEvent\" /><Text\n\t\t\tid=\"TextEvent\"\n\t\t/></VBox></mvc:View>\n"
}, "web/ui5/test-resources/sap/m/demokit/sample/DateRangeSelection/Component-preload");