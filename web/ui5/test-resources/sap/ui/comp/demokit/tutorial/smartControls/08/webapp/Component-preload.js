sap.ui.require.preload({
	"web/ui5/test-resources/sap/ui/comp/demokit/tutorial/smartControls/08/webapp/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(t){\"use strict\";return t.extend(\"sap.ui.demo.smartControls.Component\",{metadata:{manifest:\"json\"},init:function(){t.prototype.init.apply(this,arguments)}})});",
	"web/ui5/test-resources/sap/ui/comp/demokit/tutorial/smartControls/08/webapp/SmartChart.controller.js": "sap.ui.define([\"sap/ui/core/mvc/Controller\",\"sap/m/MessageBox\"],function(e,t){\"use strict\";return e.extend(\"sap.ui.demo.smartControls.SmartChart\",{onNavigationTargetsObtained:function(e){var t=e.getParameters(),a=t.semanticAttributes;t.show(\"Supplier\",new sap.ui.comp.navpopover.LinkData({text:\"Homepage\",href:\"http://www.sap.com\",target:\"_blank\"}),[new sap.ui.comp.navpopover.LinkData({text:\"Go to shopping cart\"})],new sap.ui.layout.form.SimpleForm({maxContainerCols:1,content:[new sap.ui.core.Title({text:\"Product description\"}),new sap.m.Image({src:\"img/HT-1052.jpg\",densityAware:!1,width:\"50px\",height:\"50px\",layoutData:new sap.m.FlexItemData({growFactor:1})}),new sap.m.Text({text:a.Description})]}))},onNavigate:function(e){var a=e.getParameters();\"Homepage\"!==a.text&&t.show(a.text+\" has been pressed\",{icon:sap.m.MessageBox.Icon.INFORMATION,title:\"SmartChart demo\",actions:[sap.m.MessageBox.Action.OK]})}})});",
	"web/ui5/test-resources/sap/ui/comp/demokit/tutorial/smartControls/08/webapp/test/service/server.js": "sap.ui.define([\"sap/ui/core/util/MockServer\",\"sap/ui/fl/FakeLrepConnector\"],function(e,t){\"use strict\";return{init:function(){t.enableFakeConnector(\"./test/service/component-test-changes.json\");var r=new e({rootUri:\"/here/goes/your/serviceUrl/\"});e.config({autoRespond:!0,autoRespondAfter:1e3});var a=jQuery.sap.getModulePath(\"sap.ui.demo.smartControls.test.service\");r.simulate(a+\"/metadata.xml\",a),r.attachAfter(sap.ui.core.util.MockServer.HTTPMETHOD.GET,function(e){var t,r,a,o=e.getParameter(\"oXhr\"),s=[],n=(t=o.url,r=\"search\",a=\"\",decodeURIComponent(t).replace(\"?\",\"&\").split(\"&\").some(function(e){if(r===e.split(\"=\")[0])return a=e.split(\"=\")[1],!0}),a);n&&(e.getParameter(\"oFilteredData\").results.forEach(function(e){JSON.stringify(e).indexOf(n)>-1&&s.push(e)}),e.getParameter(\"oFilteredData\").results=s)}),r.start()}}});",
	"web/ui5/test-resources/sap/ui/comp/demokit/tutorial/smartControls/08/webapp/SmartChart.view.xml": "<mvc:View xmlns=\"sap.m\" xmlns:mvc=\"sap.ui.core.mvc\"\r\n\txmlns:html=\"http://www.w3.org/1999/xhtml\"\r\n\txmlns:app=\"http://schemas.sap.com/sapui5/extension/sap.ui.core.CustomData/1\"\r\n\tcontrollerName=\"sap.ui.demo.smartControls.SmartChart\" xmlns:sl=\"sap.ui.comp.navpopover\"\r\n\txmlns:smartChart=\"sap.ui.comp.smartchart\"><smartChart:SmartChart enableAutoBinding=\"true\"\r\n\t\tentitySet=\"Products\" useVariantManagement=\"true\"\r\n\t\tpersistencyKey=\"SmartChart_Explored\" useChartPersonalisation=\"true\"\r\n\t\theader=\"Products\"><smartChart:semanticObjectController><sl:SemanticObjectController\r\n\t\t\t\tnavigationTargetsObtained=\"onNavigationTargetsObtained\" navigate=\"onNavigate\" /></smartChart:semanticObjectController></smartChart:SmartChart></mvc:View>"
}, "web/ui5/test-resources/sap/ui/comp/demokit/tutorial/smartControls/08/webapp/Component-preload");