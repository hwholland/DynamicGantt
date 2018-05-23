sap.ui.require.preload({
	"web/ui5/test-resources/sap/m/demokit/sample/TableColumnWidth/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.m.sample.TableColumnWidth.Component\",{metadata:{rootView:\"sap.m.sample.TableColumnWidth.Table\",dependencies:{libs:[\"sap.m\",\"sap.ui.layout\"]},includes:[\"Table.css\"],config:{sample:{files:[\"Table.view.xml\",\"Table.controller.js\",\"Table.css\"]}}}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/TableColumnWidth/Table.controller.js": "sap.ui.define([\"jquery.sap.global\",\"sap/ui/core/mvc/Controller\",\"sap/ui/model/json/JSONModel\"],function(e,o,t){\"use strict\";return o.extend(\"sap.m.sample.TableColumnWidth.Table\",{onInit:function(){this.oProductModel=new t(e.sap.getModulePath(\"sap.ui.demo.mock\",\"/products.json\")),this.oProductModel.setSizeLimit(3),this.oColumnModel=new t,this.oColumnModel.setData(this.oData);var o=e.extend(!0,[],this.oData);o[0].width=\"auto\",this.oColumnModelClone=new t,this.oColumnModelClone.setData(o),this.getView().setModel(this.oColumnModel,\"columns\"),this.getView().setModel(this.oProductModel,\"products\"),this.getView().setModel(this.oColumnModelClone,\"clone\")},onReset:function(e){this.oColumnModel.setData(this.oData)},oData:[{width:\"30%\",header:\"Product Name\",demandPopin:!1,minScreenWidth:\"\",styleClass:\"cellBorderLeft cellBorderRight\"},{width:\"20%\",header:\"Supplier Name\",demandPopin:!1,minScreenWidth:\"\",styleClass:\"cellBorderRight\"},{width:\"50%\",header:\"Description\",demandPopin:!0,minScreenWidth:\"Tablet\",styleClass:\"cellBorderRight\"}]})});",
	"web/ui5/test-resources/sap/m/demokit/sample/TableColumnWidth/Table.view.xml": "<mvc:View\n\tcontrollerName=\"sap.m.sample.TableColumnWidth.Table\"\n\txmlns:l=\"sap.ui.layout\"\n\txmlns:mvc=\"sap.ui.core.mvc\"\n\txmlns=\"sap.m\"><MessageStrip\n\t\ttext=\"Leave the most important column's width empty(or set it to auto) that it takes much space as it can.\"\n\t\ttype=\"Success\"\n\t\tclass=\"sapUiSmallMargin\"\n\t\tshowIcon=\"true\"/><Table\n\t\tmode=\"MultiSelect\"\n\t\titems=\"{\n\t\t\tpath: 'products>/ProductCollection'\n\t\t}\"\n\t\tcolumns=\"{\n\t\t\tpath: 'clone>/'\n\t\t}\"><headerToolbar><Toolbar><Title text=\"Products (Correct Usage)\" level=\"H2\"/></Toolbar></headerToolbar><columns><Column width=\"{clone>width}\" styleClass=\"{clone>styleClass}\" demandPopin=\"{clone>demandPopin}\" minScreenWidth=\"{clone>minScreenWidth}\" popinDisplay=\"WithoutHeader\"><Input value=\"{clone>width}\" description=\"{clone>header}\"/></Column></columns><items><ColumnListItem vAlign=\"Middle\" type=\"Navigation\"><cells><Text text=\"{products>Name}\" wrapping=\"false\" /><Text text=\"{products>SupplierName}\" wrapping=\"false\"/><Text text=\"{products>Description}\" wrapping=\"false\" /></cells></ColumnListItem></items></Table><MessageStrip\n\t\ttext=\"Do not try to give percent width to all columns even it reaches 100% total column width when columns need to be shown as pop-in.\"\n\t\ttype=\"Error\"\n\t\tclass=\"sapUiLargeMarginTop sapUiSmallMargin\"\n\t\tshowIcon=\"true\"/><Table\n\t\tmode=\"MultiSelect\"\n\t\titems=\"{\n\t\t\tpath: 'products>/ProductCollection'\n\t\t}\"\n\t\tcolumns=\"{\n\t\t\tpath: 'columns>/'\n\t\t}\"><headerToolbar><Toolbar><Title text=\"Products (Wrong Usage)\" level=\"H2\"/></Toolbar></headerToolbar><columns><Column width=\"{columns>width}\" styleClass=\"{columns>styleClass}\" demandPopin=\"{columns>demandPopin}\" minScreenWidth=\"{columns>minScreenWidth}\" popinDisplay=\"WithoutHeader\"><Input value=\"{columns>width}\" description=\"{columns>header}\"/></Column></columns><items><ColumnListItem vAlign=\"Middle\" type=\"Navigation\"><cells><Text text=\"{products>Name}\" wrapping=\"false\" /><Text text=\"{products>SupplierName}\" wrapping=\"false\"/><Text text=\"{products>Description}\" wrapping=\"false\" /></cells></ColumnListItem></items></Table></mvc:View>"
}, "web/ui5/test-resources/sap/m/demokit/sample/TableColumnWidth/Component-preload");