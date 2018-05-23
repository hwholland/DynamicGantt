sap.ui.require.preload({
	"web/ui5/test-resources/sap/ui/vbm/demokit/sample/GeoMapCharts/C.controller.js": "sap.ui.define([\"sap/ui/model/json/JSONModel\",\"sap/ui/Device\"],function(e,i){\"use strict\";sap.ui.controller(\"sap.ui.vbm.sample.GeoMapCharts.C\",{onInit:function(){var s=new sap.ui.model.json.JSONModel(\"test-resources/sap/ui/vbm/demokit/sample/GeoMapCharts/Data.json\");this.getView().setModel(s);var t=new e(i);t.setDefaultBindingMode(\"OneWay\"),this.getView().setModel(t,\"device\"),this.byId(\"vbi\").setVisualFrame({minLon:-15,maxLon:20,minLat:37.5,maxLat:57,minLOD:5})},onPressLegend:function(){1==this.byId(\"vbi\").getLegendVisible()?(this.byId(\"vbi\").setLegendVisible(!1),this.byId(\"btnLegend\").setTooltip(\"Show legend\")):(this.byId(\"vbi\").setLegendVisible(!0),this.byId(\"btnLegend\").setTooltip(\"Hide legend\"))},onPressResize:function(){\"Minimize\"==this.byId(\"btnResize\").getTooltip()?(sap.ui.Device.system.phone?this.byId(\"vbi\").minimize(132,56,1320,560):this.byId(\"vbi\").minimize(168,72,1680,720),this.byId(\"btnResize\").setTooltip(\"Maximize\")):(this.byId(\"vbi\").maximize(),this.byId(\"btnResize\").setTooltip(\"Minimize\"))},onClickItem:function(e){alert(\"onClick\")},onContextMenuItem:function(e){alert(\"onContextMenu\")},onChartpress:function(e){sap.m.MessageToast.show(\"The chart was pressed.\")},onImagePress:function(e){sap.m.MessageToast.show(\"The image was pressed\")},press:function(e){sap.m.MessageToast.show(\"Something was pressed\")}})},!0);",
	"web/ui5/test-resources/sap/ui/vbm/demokit/sample/GeoMapCharts/Component.js": "sap.ui.define(function(){\"use strict\";return sap.ui.core.UIComponent.extend(\"sap.ui.vbm.sample.GeoMapCharts.Component\",{metadata:{rootView:\"sap.ui.vbm.sample.GeoMapCharts.V\",dependencies:{libs:[\"sap.m\"]},config:{sample:{stretch:!0,files:[\"V.view.xml\",\"C.controller.js\",\"Data.json\"]}}}})});",
	"web/ui5/test-resources/sap/ui/vbm/demokit/sample/GeoMapCharts/V.view.xml": "<mvc:View controllerName=\"sap.ui.vbm.sample.GeoMapCharts.C\"\r\n\txmlns:mvc=\"sap.ui.core.mvc\" xmlns:html=\"http://www.w3.org/1999/xhtml\"\r\n\txmlns:core=\"sap.ui.core\" xmlns=\"sap.suite.ui.microchart\" xmlns:m=\"sap.m\"\r\n\txmlns:vbm=\"sap.ui.vbm\" xmlns:l=\"sap.ui.layout\" height=\"100%\"\r\n\tdisplayBlock=\"true\"><html:style>\r\n\t\t.chart-bg {\r\n\t\tbackground-color: rgba(255,255,255,0.75);\r\n\t\tborder: 3px solid\r\n\t\ttransparent;\r\n\t\t}\r\n\t</html:style><l:FixFlex class=\"fixFlexFixedSize\"><l:fixContent><m:Panel expandable=\"true\" expanded=\"{= !${device>/system/phone} }\"\r\n\t\t\t\theaderText=\"Description\"><m:headerToolbar><m:Toolbar><m:Title text=\"Description\" /><m:ToolbarSpacer /><m:Button id=\"btnLegend\" icon=\"sap-icon://legend\" press=\"onPressLegend\"\r\n\t\t\t\t\t\t\ttooltip=\"Hide legend\" /><m:Button id=\"btnResize\" icon=\"sap-icon://resize\" press=\"onPressResize\"\r\n\t\t\t\t\t\t\ttooltip=\"Minimize\" /></m:Toolbar></m:headerToolbar><m:content><m:VBox class=\"sapUiTinyMargin\"><m:Text\r\n\t\t\t\t\t\t\ttext=\"You can use containers to display an arbitrary SAP UI5 control on the map. The map control only provides the container. The application can personalize the container (fill, border, size) and add an arbitrary SAP UI5 control.\" /><m:Text class=\"sapUiTinyMarginTop\" text=\"See also: \" /><m:Link class=\"sapUiLargeMarginLeft\" text=\"Visual business best practices\"\r\n\t\t\t\t\t\t\ttarget=\"_blank\" href=\"test-resources/sap/ui/vbm/bestpractices.html\" /></m:VBox></m:content></m:Panel></l:fixContent><l:flexContent><vbm:GeoMap id=\"vbi\" width=\"100%\" xmlns:l=\"sap.ui.layout\"\r\n\t\t\t\theight=\"100%\" initialPosition=\"3;45;0\" initialZoom=\"5\"><vbm:Containers items=\"{/Containers}\" click=\"onClickItem\"\r\n\t\t\t\t\tcontextMenu=\"onContextMenuItem\"><vbm:Container position=\"{pos}\" tooltip=\"{tooltip}\"\r\n\t\t\t\t\t\tclick=\"onClickItem\" contextMenu=\"onContextMenuItem\"><vbm:item><DeltaMicroChart size=\"M\" press=\"onChartpress\" value1=\"{value1}\"\r\n\t\t\t\t\t\t\t\tvalue2=\"{value2}\" title1=\"{title1}\" title2=\"{title2}\"\r\n\t\t\t\t\t\t\t\tdisplayValue1=\"{displayValue1}\" displayValue2=\"{displayValue2}\"\r\n\t\t\t\t\t\t\t\tdeltaDisplayValue=\"{deltaDisplayValue}\" color=\"{color}\" class=\"chart-bg\" /></vbm:item></vbm:Container></vbm:Containers><vbm:legend><vbm:Legend id=\"legend\" caption=\"Passengers in aviation\"\r\n\t\t\t\t\t\titems=\"{/Legend}\"><vbm:LegendItem text=\"{text}\" color=\"{color}\" /></vbm:Legend></vbm:legend></vbm:GeoMap></l:flexContent></l:FixFlex></mvc:View>\n"
}, "web/ui5/test-resources/sap/ui/vbm/demokit/sample/GeoMapCharts/Component-preload");