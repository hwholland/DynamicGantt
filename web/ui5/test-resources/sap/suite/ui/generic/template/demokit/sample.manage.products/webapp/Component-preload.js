sap.ui.require.preload({
	"web/ui5/test-resources/sap/suite/ui/generic/template/demokit/sample.manage.products/webapp/Component.js": "jQuery.sap.declare(\"ManageProductsNS.Component\"),sap.ui.getCore().loadLibrary(\"sap.ui.generic.app\"),jQuery.sap.require(\"sap.ui.generic.app.AppComponent\"),sap.ui.generic.app.AppComponent.extend(\"ManageProductsNS.Component\",{metadata:{manifest:\"json\"}});",
	"web/ui5/test-resources/sap/suite/ui/generic/template/demokit/sample.manage.products/webapp/localService/mockserver.js": "sap.ui.define([\"sap/ui/core/util/MockServer\"],function(e){\"use strict\";var t;return{_sServiceUrl:\"/sap/opu/odata/sap/SEPMRA_PROD_MAN/\",_sAnnotationsUrl:\"/sap/opu/odata/IWFND/CATALOGSERVICE;v=2/Annotations(TechnicalName='SEPMRA_PROD_MAN_ANNO_MDL',Version='0001')/$value/\",_sModulePath:\"ManageProductsNS.localService\",init:function(){var a=jQuery.sap.getUriParameters(),r=jQuery.sap.getModulePath(this._sModulePath),n=a.get(\"errorType\"),o=\"badRequest\"===n?400:500;jQuery.sap.log.info(\"MockServer 1: init\"),t=new e({rootUri:this._sServiceUrl}),e.config({autoRespond:!0,autoRespondAfter:a.get(\"serverDelay\")||1e3}),t.simulate(r+\"/metadata.xml\",{sMockdataBaseUrl:r,bGenerateMissingMockData:!0});var s=t.getRequests(),i=function(e,t,a){a.response=function(a){a.respond(e,{\"Content-Type\":\"text/plain;charset=utf-8\"},t)}};a.get(\"metadataError\")&&s.forEach(function(e){e.path.toString().indexOf(\"$metadata\")>-1&&i(500,\"metadata Error\",e)}),n&&s.forEach(function(e){e.path.toString().indexOf(\"Objects\")>-1&&i(o,n,e)}),t.start(),new e({rootUri:this._sAnnotationsUrl,requests:[{method:\"GET\",path:new RegExp(\"annotation\\\\.xml/([?#].*)?\"),response:function(e){jQuery.sap.require(\"jquery.sap.xml\");var t=jQuery.sap.sjax({url:r+\"/annotations.xml\",dataType:\"xml\"}).data;return e.respondXML(200,{},jQuery.sap.serializeXML(t)),!0}}]}).start(),jQuery.sap.log.info(\"Running the app with mock data\")},getMockServer:function(){return t}}});",
	"web/ui5/test-resources/sap/suite/ui/generic/template/demokit/sample.manage.products/webapp/i18n/ListReport/SEPMRA_C_PD_Product/i18n.properties": "# Manage Products - List Report\n# __ldi.translation.uuid=1e8d37b0-2097-11e5-867f-0800200c9a66\n\n#specific keys+text combination that overwrite template keys+text\n#scan the original i18n of the template component for the keys\n#you can find it by starting the application in the WebIDE with a run configuration that has unchecked 'open with frame'\n#and modify the URL in the browser to /resources/sap/suite/ui/generic/template/<template component name>/i18n/i18n.properties\n#<EXISTING_KEY>=<new text for the key>\n\n# XTIT,30: title of the page in ListReport.view.xml, this may be replaced by the application\nPAGEHEADER=Manage Products\n#XFLD: Custom filter breakout label\nxfld.Price=Price\n#XTIT: Price range 0-100\nxtit.Price_0-100=Price between 0-100\n#XTIT: Price range 100-500\nxtit.Price_100-500=Price between 100-500\n#XTIT: Price range 500-1000\nxtit.Price_500-1000=Price between 500-1000\n#XTIT: Price range Over 1000\nxtit.Price_GE1000=Price: Over 1000",
	"web/ui5/test-resources/sap/suite/ui/generic/template/demokit/sample.manage.products/webapp/i18n/ListReport/SEPMRA_C_PD_Product/i18n_en.properties": "\r\n#specific keys+text combination that overwrite template keys+text\r\n#scan the original i18n of the template component for the keys\r\n#you can find it by starting the application in the WebIDE with a run configuration that has unchecked 'open with frame'\r\n#and modify the URL in the browser to /resources/sap/suite/ui/generic/template/<template component name>/i18n/i18n.properties\r\n#<EXISTING_KEY>=<new text for the key>\r\n\r\n# XTIT,30: title of the page in ListReport.view.xml, this may be replaced by the application\r\nPAGEHEADER=Manage Products\r\n#XFLD: Custom filter breakout label\r\n#XTIT: Price range 0-100\r\n#XTIT: Price range 100-500\r\n#XTIT: Price range 500-1000\r\n#XTIT: Price range Over 1000\r\n",
	"web/ui5/test-resources/sap/suite/ui/generic/template/demokit/sample.manage.products/webapp/i18n/ListReport/SEPMRA_C_PD_Product/i18n_en_US_sappsd.properties": "\r\n#specific keys+text combination that overwrite template keys+text\r\n#scan the original i18n of the template component for the keys\r\n#you can find it by starting the application in the WebIDE with a run configuration that has unchecked 'open with frame'\r\n#and modify the URL in the browser to /resources/sap/suite/ui/generic/template/<template component name>/i18n/i18n.properties\r\n#<EXISTING_KEY>=<new text for the key>\r\n\r\n# XTIT,30: title of the page in ListReport.view.xml, this may be replaced by the application\r\nPAGEHEADER=[[[\\u039C\\u0105\\u014B\\u0105\\u011F\\u0113 \\u01A4\\u0157\\u014F\\u018C\\u0171\\u010B\\u0163\\u015F\\u2219\\u2219\\u2219\\u2219]]]\r\n#XFLD: Custom filter breakout label\r\nxfld.Price=[[[\\u01A4\\u0157\\u012F\\u010B\\u0113\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n#XTIT: Price range 0-100\r\nxtit.Price_0-100=[[[\\u01A4\\u0157\\u012F\\u010B\\u0113 \\u0183\\u0113\\u0163\\u0175\\u0113\\u0113\\u014B 0-100\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n#XTIT: Price range 100-500\r\nxtit.Price_100-500=[[[\\u01A4\\u0157\\u012F\\u010B\\u0113 \\u0183\\u0113\\u0163\\u0175\\u0113\\u0113\\u014B 100-500\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n#XTIT: Price range 500-1000\r\nxtit.Price_500-1000=[[[\\u01A4\\u0157\\u012F\\u010B\\u0113 \\u0183\\u0113\\u0163\\u0175\\u0113\\u0113\\u014B 500-1000\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n#XTIT: Price range Over 1000\r\nxtit.Price_GE1000=[[[\\u01A4\\u0157\\u012F\\u010B\\u0113\\: \\u014E\\u028B\\u0113\\u0157 1000\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n",
	"web/ui5/test-resources/sap/suite/ui/generic/template/demokit/sample.manage.products/webapp/i18n/ListReport/SEPMRA_C_PD_Product/i18n_en_US_saptrc.properties": "\r\n#specific keys+text combination that overwrite template keys+text\r\n#scan the original i18n of the template component for the keys\r\n#you can find it by starting the application in the WebIDE with a run configuration that has unchecked 'open with frame'\r\n#and modify the URL in the browser to /resources/sap/suite/ui/generic/template/<template component name>/i18n/i18n.properties\r\n#<EXISTING_KEY>=<new text for the key>\r\n\r\n# XTIT,30: title of the page in ListReport.view.xml, this may be replaced by the application\r\nPAGEHEADER=w1KE5XzDtjAjSrBxZiBYyw_Manage Products\r\n#XFLD: Custom filter breakout label\r\nxfld.Price=Tawfujo7fiCpZyCg1+YF1g_Price\r\n#XTIT: Price range 0-100\r\nxtit.Price_0-100=oedGG0bFPedo1t5iPo10BQ_Price between 0-100\r\n#XTIT: Price range 100-500\r\nxtit.Price_100-500=KHRyc7ISFmvchEhEMYddyg_Price between 100-500\r\n#XTIT: Price range 500-1000\r\nxtit.Price_500-1000=Bwo6u0L/Pw7ZS8Z5mBweFw_Price between 500-1000\r\n#XTIT: Price range Over 1000\r\nxtit.Price_GE1000=+NA7KAnuNROxXI493TIK3A_Price\\: Over 1000\r\n",
	"web/ui5/test-resources/sap/suite/ui/generic/template/demokit/sample.manage.products/webapp/i18n/ObjectPage/SEPMRA_C_PD_Product/i18n.properties": "# Manage Products - Object Page\n# __ldi.translation.uuid=edaa6aa0-2096-11e5-867f-0800200c9a66\n\n#specific keys+text combination that overwrite template keys+text\n#scan the original i18n of the template component for the keys\n#you can find it by starting the application in the WebIDE with a run configuration that has unchecked 'open with frame'\n#and modify the URL in the browser to /resources/sap/suite/ui/generic/template/<template component name>/i18n/i18n.properties\n#<EXISTING_KEY>=<new text for the key>\n\n# XTIT,30: title of the page in ListReport.view.xml, this may be replaced by the application\nPAGEHEADER=Manage Products\n#XTIT: Line Chart\nxtit.lineChart=Line Chart\n#XTIT: Bar Chart\nxtit.barChart=Bar Chart\n#XFLD Labels for Screen Reader only (Aria)\nxfld.timeRange=Time Range\n#XFLD: Date dimension selector text for half year\nxfld.dateHalfYear=Six Months\n#XFLD: Date dimension selector text for one year\nxfld.dateOneYear=One Year\n#XFLD: Date axis\nxfld.dateAxis=Month\n#XFLD: Amount axis\nxfld.amountAxis=Revenue\n#XTIT: Chart title\nxtit.chartTitle=Revenue History (in {0})",
	"web/ui5/test-resources/sap/suite/ui/generic/template/demokit/sample.manage.products/webapp/i18n/ObjectPage/SEPMRA_C_PD_Product/i18n_en.properties": "\r\n#specific keys+text combination that overwrite template keys+text\r\n#scan the original i18n of the template component for the keys\r\n#you can find it by starting the application in the WebIDE with a run configuration that has unchecked 'open with frame'\r\n#and modify the URL in the browser to /resources/sap/suite/ui/generic/template/<template component name>/i18n/i18n.properties\r\n#<EXISTING_KEY>=<new text for the key>\r\n\r\n# XTIT,30: title of the page in ListReport.view.xml, this may be replaced by the application\r\nPAGEHEADER=Manage Products\r\n#XTIT: Line Chart\r\nxtit.lineChart=Line Chart\r\n#XTIT: Bar Chart\r\nxtit.barChart=Bar Chart\r\n#XFLD Labels for Screen Reader only (Aria)\r\nxfld.timeRange=Time Range\r\n#XFLD: Date dimension selector text for half year\r\nxfld.dateHalfYear=6 Months\r\n#XFLD: Date dimension selector text for one year\r\nxfld.dateOneYear=One Year\r\n#XFLD: Date axis\r\nxfld.dateAxis=Month\r\n#XFLD: Amount axis\r\nxfld.amountAxis=Revenue\r\n#XTIT: Chart title\r\nxtit.chartTitle=Revenue History (in {0})\r\n",
	"web/ui5/test-resources/sap/suite/ui/generic/template/demokit/sample.manage.products/webapp/i18n/ObjectPage/SEPMRA_C_PD_Product/i18n_en_US_sappsd.properties": "\r\n#specific keys+text combination that overwrite template keys+text\r\n#scan the original i18n of the template component for the keys\r\n#you can find it by starting the application in the WebIDE with a run configuration that has unchecked 'open with frame'\r\n#and modify the URL in the browser to /resources/sap/suite/ui/generic/template/<template component name>/i18n/i18n.properties\r\n#<EXISTING_KEY>=<new text for the key>\r\n\r\n# XTIT,30: title of the page in ListReport.view.xml, this may be replaced by the application\r\nPAGEHEADER=[[[\\u039C\\u0105\\u014B\\u0105\\u011F\\u0113 \\u01A4\\u0157\\u014F\\u018C\\u0171\\u010B\\u0163\\u015F\\u2219\\u2219\\u2219\\u2219]]]\r\n#XTIT: Line Chart\r\nxtit.lineChart=[[[\\u013B\\u012F\\u014B\\u0113 \\u0108\\u0125\\u0105\\u0157\\u0163\\u2219\\u2219\\u2219\\u2219]]]\r\n#XTIT: Bar Chart\r\nxtit.barChart=[[[\\u0181\\u0105\\u0157 \\u0108\\u0125\\u0105\\u0157\\u0163\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n#XFLD Labels for Screen Reader only (Aria)\r\nxfld.timeRange=[[[\\u0162\\u012F\\u0271\\u0113 \\u0158\\u0105\\u014B\\u011F\\u0113\\u2219\\u2219\\u2219\\u2219]]]\r\n#XFLD: Date dimension selector text for half year\r\nxfld.dateHalfYear=[[[\\u015C\\u012F\\u03C7 \\u039C\\u014F\\u014B\\u0163\\u0125\\u015F\\u2219\\u2219\\u2219\\u2219]]]\r\n#XFLD: Date dimension selector text for one year\r\nxfld.dateOneYear=[[[\\u014E\\u014B\\u0113 \\u0176\\u0113\\u0105\\u0157\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n#XFLD: Date axis\r\nxfld.dateAxis=[[[\\u039C\\u014F\\u014B\\u0163\\u0125\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n#XFLD: Amount axis\r\nxfld.amountAxis=[[[\\u0158\\u0113\\u028B\\u0113\\u014B\\u0171\\u0113\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n#XTIT: Chart title\r\nxtit.chartTitle=[[[\\u0158\\u0113\\u028B\\u0113\\u014B\\u0171\\u0113 \\u0124\\u012F\\u015F\\u0163\\u014F\\u0157\\u0177 (\\u012F\\u014B {0})]]]\r\n",
	"web/ui5/test-resources/sap/suite/ui/generic/template/demokit/sample.manage.products/webapp/i18n/ObjectPage/SEPMRA_C_PD_Product/i18n_en_US_saptrc.properties": "\r\n#specific keys+text combination that overwrite template keys+text\r\n#scan the original i18n of the template component for the keys\r\n#you can find it by starting the application in the WebIDE with a run configuration that has unchecked 'open with frame'\r\n#and modify the URL in the browser to /resources/sap/suite/ui/generic/template/<template component name>/i18n/i18n.properties\r\n#<EXISTING_KEY>=<new text for the key>\r\n\r\n# XTIT,30: title of the page in ListReport.view.xml, this may be replaced by the application\r\nPAGEHEADER=qD+57tqvZpa7iegtiMAnYw_Manage Products\r\n#XTIT: Line Chart\r\nxtit.lineChart=63j7xSsffJcUdlfilf+FEA_Line Chart\r\n#XTIT: Bar Chart\r\nxtit.barChart=ECaxPq+aZVXF1+hYAvBanA_Bar Chart\r\n#XFLD Labels for Screen Reader only (Aria)\r\nxfld.timeRange=4hjiL7WjhZ+5sJvYQc0KGw_Time Range\r\n#XFLD: Date dimension selector text for half year\r\nxfld.dateHalfYear=QSgC4Ublilx8e7kqITQ2fA_Six Months\r\n#XFLD: Date dimension selector text for one year\r\nxfld.dateOneYear=JZg8ObyQXc8ruwZGOJy8kQ_One Year\r\n#XFLD: Date axis\r\nxfld.dateAxis=oBqvad7tbBthpXwG8bux1w_Month\r\n#XFLD: Amount axis\r\nxfld.amountAxis=Y+n0JpdpZNgL2PGc5Gj8MA_Revenue\r\n#XTIT: Chart title\r\nxtit.chartTitle=PE8/ducnsRlXPa6t1oMygA_Revenue History (in {0})\r\n",
	"web/ui5/test-resources/sap/suite/ui/generic/template/demokit/sample.manage.products/webapp/i18n/ObjectPage/SEPMRA_C_PD_ProductText/i18n.properties": "#<Describe your application/i18n file here; required for translation >\n# __ldi.translation.uuid=d8da4240-3044-11e5-a2cb-0800200c9a66\n\n#specific keys+text combination that overwrite template keys+text\n#scan the original i18n of the template component for the keys\n#you can find it by starting the application in the WebIDE with a run configuration that has unchecked 'open with frame'\n#and modify the URL in the browser to /resources/sap/suite/ui/generic/template/<template component name>/i18n/i18n.properties\n#<EXISTING_KEY>=<new text for the key>\n\n# XTIT,30: title of the page in ListReport.view.xml, this may be replaced by the application\nPAGEHEADER=Manage Products",
	"web/ui5/test-resources/sap/suite/ui/generic/template/demokit/sample.manage.products/webapp/i18n/ObjectPage/SEPMRA_C_PD_ProductText/i18n_en.properties": "\r\n#specific keys+text combination that overwrite template keys+text\r\n#scan the original i18n of the template component for the keys\r\n#you can find it by starting the application in the WebIDE with a run configuration that has unchecked 'open with frame'\r\n#and modify the URL in the browser to /resources/sap/suite/ui/generic/template/<template component name>/i18n/i18n.properties\r\n#<EXISTING_KEY>=<new text for the key>\r\n\r\n# XTIT,30: title of the page in ListReport.view.xml, this may be replaced by the application\r\nPAGEHEADER=Manage Products\r\n",
	"web/ui5/test-resources/sap/suite/ui/generic/template/demokit/sample.manage.products/webapp/i18n/ObjectPage/SEPMRA_C_PD_ProductText/i18n_en_US_sappsd.properties": "\r\n#specific keys+text combination that overwrite template keys+text\r\n#scan the original i18n of the template component for the keys\r\n#you can find it by starting the application in the WebIDE with a run configuration that has unchecked 'open with frame'\r\n#and modify the URL in the browser to /resources/sap/suite/ui/generic/template/<template component name>/i18n/i18n.properties\r\n#<EXISTING_KEY>=<new text for the key>\r\n\r\n# XTIT,30: title of the page in ListReport.view.xml, this may be replaced by the application\r\nPAGEHEADER=[[[\\u039C\\u0105\\u014B\\u0105\\u011F\\u0113 \\u01A4\\u0157\\u014F\\u018C\\u0171\\u010B\\u0163\\u015F\\u2219\\u2219\\u2219\\u2219]]]\r\n",
	"web/ui5/test-resources/sap/suite/ui/generic/template/demokit/sample.manage.products/webapp/i18n/ObjectPage/SEPMRA_C_PD_ProductText/i18n_en_US_saptrc.properties": "\r\n#specific keys+text combination that overwrite template keys+text\r\n#scan the original i18n of the template component for the keys\r\n#you can find it by starting the application in the WebIDE with a run configuration that has unchecked 'open with frame'\r\n#and modify the URL in the browser to /resources/sap/suite/ui/generic/template/<template component name>/i18n/i18n.properties\r\n#<EXISTING_KEY>=<new text for the key>\r\n\r\n# XTIT,30: title of the page in ListReport.view.xml, this may be replaced by the application\r\nPAGEHEADER=sDEmVSjrCdQL1jifBwtxsg_Manage Products\r\n",
	"web/ui5/test-resources/sap/suite/ui/generic/template/demokit/sample.manage.products/webapp/i18n/i18n.properties": "# Manage Products - general \n# __ldi.translation.uuid=dae33f10-2095-11e5-867f-0800200c9a66\n\n#Texts for manifest.json\n\n#XTIT: Application name\nappTitle=Manage Products\n \n#YDES: Application description\nappDescription=EPM Reference Smart Template App 'Manage Products'\n#XTIT: Sales Data breakout facet header\nxtit.salesData=Sales Data\n\n#XTIT: Facet Label\n@GeneralInformation=General Information\n#XTIT: Facet Label\n@TechnicalData=Technical Data\n#XTIT: Facet Label\n@ProductCategory=Product Category\n#XTIT: Facet Label\n@ProductDescription=Product Description\n#XTIT: Facet Label\n@ProductDescriptions=Product Descriptions\n#XTIT: Facet Label\n@Supplier=Supplier\n#XTIT: Facet Label\n@Contacts=Contacts",
	"web/ui5/test-resources/sap/suite/ui/generic/template/demokit/sample.manage.products/webapp/i18n/i18n_en.properties": "\r\n#Texts for manifest.json\r\n\r\n#XTIT: Application name\r\nappTitle=Manage Products\r\n\r\n#YDES: Application description\r\nappDescription=EPM Reference Smart Template App 'Manage Products'\r\n#XTIT: Sales Data breakout facet header\r\nxtit.salesData=Sales Data\r\n\r\n#XTIT: Facet Label\r\n@GeneralInformation=General Information\r\n#XTIT: Facet Label\r\n@TechnicalData=Technical Data\r\n#XTIT: Facet Label\r\n@ProductCategory=Product Category\r\n#XTIT: Facet Label\r\n@ProductDescription=Product Description\r\n#XTIT: Facet Label\r\n@ProductDescriptions=Product Descriptions\r\n#XTIT: Facet Label\r\n@Supplier=Supplier\r\n#XTIT: Facet Label\r\n@Contacts=Contacts\r\n",
	"web/ui5/test-resources/sap/suite/ui/generic/template/demokit/sample.manage.products/webapp/i18n/i18n_en_US_sappsd.properties": "\r\n#Texts for manifest.json\r\n\r\n#XTIT: Application name\r\nappTitle=[[[\\u039C\\u0105\\u014B\\u0105\\u011F\\u0113 \\u01A4\\u0157\\u014F\\u018C\\u0171\\u010B\\u0163\\u015F\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n#YDES: Application description\r\nappDescription=[[[\\u0114\\u01A4\\u039C \\u0158\\u0113\\u0192\\u0113\\u0157\\u0113\\u014B\\u010B\\u0113 \\u015C\\u0271\\u0105\\u0157\\u0163 \\u0162\\u0113\\u0271\\u03C1\\u013A\\u0105\\u0163\\u0113 \\u0100\\u03C1\\u03C1 '\\u039C\\u0105\\u014B\\u0105\\u011F\\u0113 \\u01A4\\u0157\\u014F\\u018C\\u0171\\u010B\\u0163\\u015F'\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n#XTIT: Sales Data breakout facet header\r\nxtit.salesData=[[[\\u015C\\u0105\\u013A\\u0113\\u015F \\u010E\\u0105\\u0163\\u0105\\u2219\\u2219\\u2219\\u2219]]]\r\n\r\n#XTIT: Facet Label\r\n@GeneralInformation=[[[\\u0122\\u0113\\u014B\\u0113\\u0157\\u0105\\u013A \\u012C\\u014B\\u0192\\u014F\\u0157\\u0271\\u0105\\u0163\\u012F\\u014F\\u014B\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n#XTIT: Facet Label\r\n@TechnicalData=[[[\\u0162\\u0113\\u010B\\u0125\\u014B\\u012F\\u010B\\u0105\\u013A \\u010E\\u0105\\u0163\\u0105\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n#XTIT: Facet Label\r\n@ProductCategory=[[[\\u01A4\\u0157\\u014F\\u018C\\u0171\\u010B\\u0163 \\u0108\\u0105\\u0163\\u0113\\u011F\\u014F\\u0157\\u0177\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n#XTIT: Facet Label\r\n@ProductDescription=[[[\\u01A4\\u0157\\u014F\\u018C\\u0171\\u010B\\u0163 \\u010E\\u0113\\u015F\\u010B\\u0157\\u012F\\u03C1\\u0163\\u012F\\u014F\\u014B\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n#XTIT: Facet Label\r\n@ProductDescriptions=[[[\\u01A4\\u0157\\u014F\\u018C\\u0171\\u010B\\u0163 \\u010E\\u0113\\u015F\\u010B\\u0157\\u012F\\u03C1\\u0163\\u012F\\u014F\\u014B\\u015F\\u2219\\u2219\\u2219\\u2219]]]\r\n#XTIT: Facet Label\r\n@Supplier=[[[\\u015C\\u0171\\u03C1\\u03C1\\u013A\\u012F\\u0113\\u0157\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n#XTIT: Facet Label\r\n@Contacts=[[[\\u0108\\u014F\\u014B\\u0163\\u0105\\u010B\\u0163\\u015F\\u2219\\u2219\\u2219\\u2219\\u2219\\u2219]]]\r\n",
	"web/ui5/test-resources/sap/suite/ui/generic/template/demokit/sample.manage.products/webapp/i18n/i18n_en_US_saptrc.properties": "\r\n#Texts for manifest.json\r\n\r\n#XTIT: Application name\r\nappTitle=6vp1rSE95oDrWoiVKNkBsA_Manage Products\r\n\r\n#YDES: Application description\r\nappDescription=uXBRVz9moFsyXM/nlcUv4Q_EPM Reference Smart Template App 'Manage Products'\r\n#XTIT: Sales Data breakout facet header\r\nxtit.salesData=1sM6RDLnQ8eXYXvRhyya1A_Sales Data\r\n\r\n#XTIT: Facet Label\r\n@GeneralInformation=7ia9W23kbrlaANKh+kT1MQ_General Information\r\n#XTIT: Facet Label\r\n@TechnicalData=zL3/Aa5MuqsJ1pXrpT415Q_Technical Data\r\n#XTIT: Facet Label\r\n@ProductCategory=ey2JO0uTPwGtByvoTB3OOg_Product Category\r\n#XTIT: Facet Label\r\n@ProductDescription=ceDf2Oxv0cNc5Q7/X/zS6g_Product Description\r\n#XTIT: Facet Label\r\n@ProductDescriptions=8mgRtcTFp/x3XFUIko+fdw_Product Descriptions\r\n#XTIT: Facet Label\r\n@Supplier=K1bSPoSJSxN8kHGSXkcCtw_Supplier\r\n#XTIT: Facet Label\r\n@Contacts=GbFMfqJKc+x4pfBYak042A_Contacts\r\n"
}, "web/ui5/test-resources/sap/suite/ui/generic/template/demokit/sample.manage.products/webapp/Component-preload");