sap.ui.require.preload({
	"web/ui5/test-resources/sap/ui/vbm/demokit/sample/GeoMapLabels/C.controller.js": "sap.ui.define([\"sap/ui/model/json/JSONModel\",\"sap/ui/Device\"],function(e,t){\"use strict\";sap.ui.controller(\"sap.ui.vbm.sample.GeoMapLabels.C\",{onInit:function(){var i=new sap.ui.model.json.JSONModel(\"test-resources/sap/ui/vbm/demokit/sample/GeoMapLabels/Data.json\");this.getView().setModel(i);var n=new e(t);n.setDefaultBindingMode(\"OneWay\"),this.getView().setModel(n,\"device\")},onPressLegend:function(){1==this.byId(\"vbi\").getLegendVisible()?(this.byId(\"vbi\").setLegendVisible(!1),this.byId(\"btnLegend\").setTooltip(\"Show legend\")):(this.byId(\"vbi\").setLegendVisible(!0),this.byId(\"btnLegend\").setTooltip(\"Hide legend\"))},onPressResize:function(){\"Minimize\"==this.byId(\"btnResize\").getTooltip()?(sap.ui.Device.system.phone?this.byId(\"vbi\").minimize(132,56,1320,560):this.byId(\"vbi\").minimize(168,72,1680,720),this.byId(\"btnResize\").setTooltip(\"Maximize\")):(this.byId(\"vbi\").maximize(),this.byId(\"btnResize\").setTooltip(\"Minimize\"))},onDropItem:function(e){sap.m.MessageToast.show(\"Item dropped!!\")},onClickSpot:function(e){e.getSource().openDetailWindow(\"My Detail Window\",\"0\",\"0\")},onContextMenuSpot:function(e){if(e.mParameters&&e.mParameters.menu){var t=function(e){sap.m.MessageToast.show(\"clicked on \"+e.oSource.mProperties.text)},i=e.mParameters.menu,n=new sap.ui.unified.MenuItem({text:\"First Item\"});n.attachSelect(t),i.addItem(n);var s=new sap.ui.unified.MenuItem({text:\"Second Item\"});s.attachSelect(t),i.addItem(s);var o=new sap.ui.unified.MenuItem({text:\"Disabled Item\",enabled:!1});i.addItem(o);var a=new sap.ui.unified.Menu({ariaDescription:\"a sub menu\"});s.setSubmenu(a);var d=new sap.ui.unified.MenuItem({text:\"New TXT file\",tooltip:\"Creates a new TXT file.\"});d.attachSelect(t),a.addItem(d);var u=new sap.ui.unified.MenuItem({text:\"New RAR file\",tooltip:\"Creates a new RAR file.\"});u.attachSelect(t),a.addItem(u),e.getSource().openContextMenu(i)}},onCloseDetail:function(e){},onOpenDetail:function(e){var t=document.getElementById(e.getParameter(\"contentarea\").id);t.innerHTML=\"Content for Spots\",t.style.color=\"Blue\"}})},!0);",
	"web/ui5/test-resources/sap/ui/vbm/demokit/sample/GeoMapLabels/Component.js": "sap.ui.define(function(){\"use strict\";return sap.ui.core.UIComponent.extend(\"sap.ui.vbm.sample.GeoMapLabels.Component\",{metadata:{rootView:\"sap.ui.vbm.sample.GeoMapLabels.V\",dependencies:{libs:[\"sap.m\"]},config:{sample:{stretch:!0,files:[\"V.view.xml\",\"C.controller.js\",\"Data.json\"]}}}})});",
	"web/ui5/test-resources/sap/ui/vbm/demokit/sample/GeoMapLabels/V.view.xml": "<mvc:View controllerName=\"sap.ui.vbm.sample.GeoMapLabels.C\"\r\n\txmlns:mvc=\"sap.ui.core.mvc\" xmlns:core=\"sap.ui.core\" xmlns:commons=\"sap.ui.commons\"\r\n\txmlns=\"sap.m\" xmlns:vbm=\"sap.ui.vbm\" xmlns:l=\"sap.ui.layout\" height=\"100%\"\r\n\tdisplayBlock=\"true\"><l:FixFlex class=\"fixFlexFixedSize\"><l:fixContent><Panel expandable=\"true\" expanded=\"{= !${device>/system/phone} }\"\r\n\t\t\t\theaderText=\"Description\"><headerToolbar><Toolbar><Title text=\"Description\" /><ToolbarSpacer /><Button id=\"btnLegend\" icon=\"sap-icon://legend\" press=\"onPressLegend\"\r\n\t\t\t\t\t\t\ttooltip=\"Hide legend\" /><Button id=\"btnResize\" icon=\"sap-icon://resize\" press=\"onPressResize\"\r\n\t\t\t\t\t\t\ttooltip=\"Minimize\" /></Toolbar></headerToolbar><content><VBox class=\"sapUiTinyMargin\"><Text\r\n\t\t\t\t\t\t\ttext=\"You can use a label to provide more information about a symbol or standalone with an anchor. The label supports multiple lines, content will be translated. For routes the position of the label will adapt to the map section. The label is available in five different colors: default white label and the semantic labels.\" /><Text class=\"sapUiTinyMarginTop\" text=\"See also: \" /><Link class=\"sapUiLargeMarginLeft\" text=\"Visual business best practices\"\r\n\t\t\t\t\t\t\ttarget=\"_blank\" href=\"test-resources/sap/ui/vbm/bestpractices.html\" /></VBox></content></Panel></l:fixContent><l:flexContent><vbm:GeoMap id=\"vbi\" width=\"100%\" xmlns:l=\"sap.ui.layout\"\r\n\t\t\t\theight=\"100%\" initialZoom=\"1\" openWindow=\"onOpenDetail\" closeWindow=\"onCloseDetail\"><vbm:resources><vbm:Resource name=\"white_label.png\"\r\n\t\t\t\t\t\tsrc=\"test-resources/sap/ui/vbm/demokit/media/images/Label_sample_White_rect_border.png\"></vbm:Resource></vbm:resources><vbm:vos><vbm:Spots click=\"onClickItem\" posChangeable=\"true\"\r\n\t\t\t\t\t\tscaleChangeable=\"false\" contextMenu=\"onContextMenuItem\" items=\"{/Spots/items}\"><vbm:items><vbm:Spot id=\"Spot\" type=\"Hidden\" labelPos=\"5\" position=\"{pos}\"\r\n\t\t\t\t\t\t\t\ttooltip=\"{tooltip}\" labelType=\"{type}\" labelText=\"{text}\"\r\n\t\t\t\t\t\t\t\tlabelArrow=\"true\" contentOffset=\"{contentOffset}\" click=\"onClickSpot\"\r\n\t\t\t\t\t\t\t\tcontextMenu=\"onContextMenuSpot\"></vbm:Spot></vbm:items></vbm:Spots><vbm:Spots><vbm:Spot id=\"SAPSpot\" position=\"8.641568;49.293789;0\"\r\n\t\t\t\t\t\t\tlabelType=\"Default\" labelText=\"Default\" labelPos=\"5\" click=\"onClickSpot\"\r\n\t\t\t\t\t\t\tcontextMenu=\"onContextMenuSpot\"></vbm:Spot></vbm:Spots></vbm:vos><vbm:legend><vbm:Legend id=\"legend\" caption=\"Legend\"><vbm:LegendItem text=\"Default Label without semantic\"\r\n\t\t\t\t\t\t\timage=\"white_label.png\" /><vbm:LegendItem text=\"Semantic label: Neutral\"\r\n\t\t\t\t\t\t\tcolor=\"rgb(132,143,148)\" /><vbm:LegendItem text=\"Semantic label: Positive\"\r\n\t\t\t\t\t\t\tcolor=\"rgb(97,166,86)\" /><vbm:LegendItem text=\"Semantic label: Warning\"\r\n\t\t\t\t\t\t\tcolor=\"rgb(225,123,36)\" /><vbm:LegendItem text=\"Semantic label: Error\" color=\"rgb(211,32,48)\" /></vbm:Legend></vbm:legend></vbm:GeoMap></l:flexContent></l:FixFlex></mvc:View>\n"
}, "web/ui5/test-resources/sap/ui/vbm/demokit/sample/GeoMapLabels/Component-preload");