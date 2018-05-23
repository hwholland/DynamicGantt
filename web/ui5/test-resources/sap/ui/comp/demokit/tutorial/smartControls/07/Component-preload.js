sap.ui.require.preload({
	"web/ui5/test-resources/sap/ui/comp/demokit/tutorial/smartControls/07/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.ui.comp.tutorial.smartControls.07.Component\",{metadata:{config:{sample:{iframe:\"webapp/index.html\",stretch:!0,files:[\"webapp/test/service/Category.json\",\"webapp/test/service/component-test-changes.json\",\"webapp/test/service/Currency.json\",\"webapp/test/service/metadata.xml\",\"webapp/test/service/Products.json\",\"webapp/test/service/server.js\",\"webapp/Component.js\",\"webapp/index.html\",\"webapp/manifest.json\",\"webapp/VariantManagement.controller.js\",\"webapp/VariantManagement.view.xml\"]}}}})});",
	"web/ui5/test-resources/sap/ui/comp/demokit/tutorial/smartControls/07/webapp/Component-preload.js": "sap.ui.require.preload({\"web/ui5/test-resources/sap/ui/comp/demokit/tutorial/smartControls/07/webapp/Component.js\":'sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.ui.demo.smartControls.Component\",{metadata:{manifest:\"json\"}})});',\"web/ui5/test-resources/sap/ui/comp/demokit/tutorial/smartControls/07/webapp/VariantManagement.controller.js\":'sap.ui.define([\"sap/ui/core/mvc/Controller\"],function(e){\"use strict\";return e.extend(\"sap.ui.demo.smartControls.VariantManagement\")});',\"web/ui5/test-resources/sap/ui/comp/demokit/tutorial/smartControls/07/webapp/test/service/server.js\":'sap.ui.define([\"sap/ui/core/util/MockServer\"],function(e){\"use strict\";return{init:function(){jQuery.sap.require(\"sap.ui.fl.FakeLrepConnector\"),sap.ui.fl.FakeLrepConnector.enableFakeConnector(\"./test/service/component-test-changes.json\");var t=new e({rootUri:\"/here/goes/your/serviceUrl/\"});e.config({autoRespond:!0,autoRespondAfter:1e3});var r=jQuery.sap.getModulePath(\"sap.ui.demo.smartControls.test.service\");t.simulate(r+\"/metadata.xml\",r),t.attachAfter(sap.ui.core.util.MockServer.HTTPMETHOD.GET,function(e){var t,r,a,o=e.getParameter(\"oXhr\"),s=[],n=(t=o.url,r=\"search\",a=\"\",decodeURIComponent(t).replace(\"?\",\"&\").split(\"&\").some(function(e){if(r===e.split(\"=\")[0])return a=e.split(\"=\")[1],!0}),a);n&&(e.getParameter(\"oFilteredData\").results.forEach(function(e){JSON.stringify(e).indexOf(n)>-1&&s.push(e)}),e.getParameter(\"oFilteredData\").results=s)}),t.start()}}});',\"web/ui5/test-resources/sap/ui/comp/demokit/tutorial/smartControls/07/webapp/VariantManagement.view.xml\":'<mvc:View \\n\\txmlns=\"sap.m\"\\n\\txmlns:mvc=\"sap.ui.core.mvc\"\\n\\tcontrollerName=\"sap.ui.demo.smartControls.VariantManagement\"\\n\\txmlns:smartFilterBar=\"sap.ui.comp.smartfilterbar\"\\n\\txmlns:smartTable=\"sap.ui.comp.smarttable\"><smartFilterBar:SmartFilterBar \\n\\t\\tid=\"smartFilterBar\"\\n\\t\\tentityType=\"Product\"\\n\\t\\tpersistencyKey=\"SmartFilterPKey\"><smartFilterBar:controlConfiguration><smartFilterBar:ControlConfiguration\\n\\t\\t\\t\\tkey=\"Category\" \\n\\t\\t\\t\\tvisibleInAdvancedArea=\"true\"\\n\\t\\t\\t\\tpreventInitialDataFetchInValueHelpDialog=\"false\"></smartFilterBar:ControlConfiguration></smartFilterBar:controlConfiguration></smartFilterBar:SmartFilterBar><smartTable:SmartTable \\n\\t\\tid=\"smartTable_ResponsiveTable\"\\n\\t\\tsmartFilterId=\"smartFilterBar\" \\n\\t\\ttableType=\"ResponsiveTable\" \\n\\t\\teditable=\"false\"\\n\\t\\tentitySet=\"Products\" \\n\\t\\tuseVariantManagement=\"true\"\\n\\t\\tuseTablePersonalisation=\"true\" \\n\\t\\theader=\"Products\" \\n\\t\\tshowRowCount=\"true\"\\n\\t\\tuseExportToExcel=\"false\" \\n\\t\\tenableAutoBinding=\"true\"\\n\\t\\tpersistencyKey=\"SmartTablePKey\"></smartTable:SmartTable></mvc:View>'},\"web/ui5/test-resources/sap/ui/comp/demokit/tutorial/smartControls/07/webapp/Component-preload\");",
	"web/ui5/test-resources/sap/ui/comp/demokit/tutorial/smartControls/07/webapp/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.ui.demo.smartControls.Component\",{metadata:{manifest:\"json\"}})});",
	"web/ui5/test-resources/sap/ui/comp/demokit/tutorial/smartControls/07/webapp/VariantManagement.controller.js": "sap.ui.define([\"sap/ui/core/mvc/Controller\"],function(e){\"use strict\";return e.extend(\"sap.ui.demo.smartControls.VariantManagement\")});",
	"web/ui5/test-resources/sap/ui/comp/demokit/tutorial/smartControls/07/webapp/test/service/server.js": "sap.ui.define([\"sap/ui/core/util/MockServer\"],function(e){\"use strict\";return{init:function(){jQuery.sap.require(\"sap.ui.fl.FakeLrepConnector\"),sap.ui.fl.FakeLrepConnector.enableFakeConnector(\"./test/service/component-test-changes.json\");var t=new e({rootUri:\"/here/goes/your/serviceUrl/\"});e.config({autoRespond:!0,autoRespondAfter:1e3});var r=jQuery.sap.getModulePath(\"sap.ui.demo.smartControls.test.service\");t.simulate(r+\"/metadata.xml\",r),t.attachAfter(sap.ui.core.util.MockServer.HTTPMETHOD.GET,function(e){var t,r,a,o=e.getParameter(\"oXhr\"),s=[],n=(t=o.url,r=\"search\",a=\"\",decodeURIComponent(t).replace(\"?\",\"&\").split(\"&\").some(function(e){if(r===e.split(\"=\")[0])return a=e.split(\"=\")[1],!0}),a);n&&(e.getParameter(\"oFilteredData\").results.forEach(function(e){JSON.stringify(e).indexOf(n)>-1&&s.push(e)}),e.getParameter(\"oFilteredData\").results=s)}),t.start()}}});",
	"web/ui5/test-resources/sap/ui/comp/demokit/tutorial/smartControls/07/webapp/VariantManagement.view.xml": "<mvc:View \n\txmlns=\"sap.m\"\n\txmlns:mvc=\"sap.ui.core.mvc\"\n\tcontrollerName=\"sap.ui.demo.smartControls.VariantManagement\"\n\txmlns:smartFilterBar=\"sap.ui.comp.smartfilterbar\"\n\txmlns:smartTable=\"sap.ui.comp.smarttable\"><smartFilterBar:SmartFilterBar \n\t\tid=\"smartFilterBar\"\n\t\tentityType=\"Product\"\n\t\tpersistencyKey=\"SmartFilterPKey\"><smartFilterBar:controlConfiguration><smartFilterBar:ControlConfiguration\n\t\t\t\tkey=\"Category\" \n\t\t\t\tvisibleInAdvancedArea=\"true\"\n\t\t\t\tpreventInitialDataFetchInValueHelpDialog=\"false\"></smartFilterBar:ControlConfiguration></smartFilterBar:controlConfiguration></smartFilterBar:SmartFilterBar><smartTable:SmartTable \n\t\tid=\"smartTable_ResponsiveTable\"\n\t\tsmartFilterId=\"smartFilterBar\" \n\t\ttableType=\"ResponsiveTable\" \n\t\teditable=\"false\"\n\t\tentitySet=\"Products\" \n\t\tuseVariantManagement=\"true\"\n\t\tuseTablePersonalisation=\"true\" \n\t\theader=\"Products\" \n\t\tshowRowCount=\"true\"\n\t\tuseExportToExcel=\"false\" \n\t\tenableAutoBinding=\"true\"\n\t\tpersistencyKey=\"SmartTablePKey\"></smartTable:SmartTable></mvc:View>"
}, "web/ui5/test-resources/sap/ui/comp/demokit/tutorial/smartControls/07/Component-preload");