sap.ui.require.preload({
	"web/ui5/test-resources/sap/ui/layout/demokit/sample/GridTiles/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.ui.layout.sample.GridTiles.Component\",{metadata:{rootView:\"sap.ui.layout.sample.GridTiles.Grid\",dependencies:{libs:[\"sap.m\",\"sap.ui.layout\"]},config:{sample:{files:[\"Grid.view.xml\",\"Grid.controller.js\",\"Formatter.js\"]}}}})});",
	"web/ui5/test-resources/sap/ui/layout/demokit/sample/GridTiles/Formatter.js": "sap.ui.define(function(){\"use strict\";return{categoryIcon:function(a){var e;switch(a){case\"Projector\":e=\"sap-icon://projector\";break;case\"Graphics Card\":e=\"sap-icon://measure\";break;case\"Accessory\":e=\"sap-icon://widgets\";break;case\"Printer\":e=\"sap-icon://print\";break;case\"Monitor\":e=\"sap-icon://sys-monitor\";break;case\"Laptop\":e=\"sap-icon://laptop\";break;case\"Keyboard\":e=\"sap-icon://collections-management\";break;default:e=\"sap-icon://product\"}return e}}},!0);",
	"web/ui5/test-resources/sap/ui/layout/demokit/sample/GridTiles/Grid.controller.js": "sap.ui.define([\"jquery.sap.global\",\"sap/ui/core/mvc/Controller\",\"./Formatter\",\"sap/ui/model/json/JSONModel\"],function(t,e,i,o){\"use strict\";return e.extend(\"sap.ui.layout.sample.GridTiles.Grid\",{productItemLink:{small:[13,1,2,12,8,9],large:[7,0]},onInit:function(e){var i=new o(t.sap.getModulePath(\"sap.ui.demo.mock\",\"/products.json\"));this.getView().setModel(i);var r=this.getView();for(var n in r.bindElement(\"/ProductCollection\"),this.productItemLink){var s=0;for(var a in this.productItemLink[n])r.byId([\"productitem\",n,s++].join(\"-\")).bindElement(String(this.productItemLink[n][a]))}}})});",
	"web/ui5/test-resources/sap/ui/layout/demokit/sample/GridTiles/Grid.view.xml": "<mvc:View\n\tcontrollerName=\"sap.ui.layout.sample.GridTiles.Grid\"\n\txmlns:mvc=\"sap.ui.core.mvc\"\n\txmlns:l=\"sap.ui.layout\"\n\txmlns=\"sap.m\"><l:Grid defaultSpan=\"L4 M6 S6\" class=\"sapUiSmallMarginTop\"><l:content><ObjectListItem id=\"productitem-small-0\"\n\t\t\t\ttitle=\"{Name}\"\n\t\t\t\tintro=\"{Category}\"\n\t\t\t\ticon=\"{\n\t\t\t\t\tpath: 'Category',\n\t\t\t\t\tformatter: 'sap.ui.layout.sample.GridTiles.Formatter.categoryIcon'\n\t\t\t\t}\" ></ObjectListItem><ObjectListItem id=\"productitem-small-1\"\n\t\t\t\ttitle=\"{Name}\"\n\t\t\t\tintro=\"{Category}\"\n\t\t\t\ticon=\"{\n\t\t\t\t\tpath: 'Category',\n\t\t\t\t\tformatter: 'sap.ui.layout.sample.GridTiles.Formatter.categoryIcon'\n\t\t\t\t}\" ></ObjectListItem><ObjectListItem id=\"productitem-small-2\"\n\t\t\t\ttitle=\"{Name}\"\n\t\t\t\tintro=\"{Category}\"\n\t\t\t\ticon=\"{\n\t\t\t\t\tpath: 'Category',\n\t\t\t\t\tformatter: 'sap.ui.layout.sample.GridTiles.Formatter.categoryIcon'\n\t\t\t\t}\" ></ObjectListItem><ObjectListItem id=\"productitem-small-3\"\n\t\t\t\ttitle=\"{Name}\"\n\t\t\t\tintro=\"{Category}\"\n\t\t\t\ticon=\"{\n\t\t\t\t\tpath: 'Category',\n\t\t\t\t\tformatter: 'sap.ui.layout.sample.GridTiles.Formatter.categoryIcon'\n\t\t\t\t}\" ></ObjectListItem><ObjectListItem id=\"productitem-small-4\"\n\t\t\t\ttitle=\"{Name}\"\n\t\t\t\tintro=\"{Category}\"\n\t\t\t\ticon=\"{\n\t\t\t\t\tpath: 'Category',\n\t\t\t\t\tformatter: 'sap.ui.layout.sample.GridTiles.Formatter.categoryIcon'\n\t\t\t\t}\" ></ObjectListItem><ObjectListItem id=\"productitem-small-5\"\n\t\t\t\ttitle=\"{Name}\"\n\t\t\t\tintro=\"{Category}\"\n\t\t\t\ticon=\"{\n\t\t\t\t\tpath: 'Category',\n\t\t\t\t\tformatter: 'sap.ui.layout.sample.GridTiles.Formatter.categoryIcon'\n\t\t\t\t}\" ></ObjectListItem><ObjectListItem id=\"productitem-large-0\"\n\t\t\t\ttitle=\"{Name}\"\n\t\t\t\tintro=\"{Category}\"\n\t\t\t\ticon=\"{\n\t\t\t\t\tpath: 'Category',\n\t\t\t\t\tformatter: 'sap.ui.layout.sample.GridTiles.Formatter.categoryIcon'\n\t\t\t\t}\" ><layoutData><l:GridData span=\"L6 M12 S12\" /></layoutData></ObjectListItem><ObjectListItem id=\"productitem-large-1\"\n\t\t\t\ttitle=\"{Name}\"\n\t\t\t\tintro=\"{Category}\"\n\t\t\t\ticon=\"{\n\t\t\t\t\tpath: 'Category',\n\t\t\t\t\tformatter: 'sap.ui.layout.sample.GridTiles.Formatter.categoryIcon'\n\t\t\t\t}\" ><layoutData><l:GridData span=\"L6 M12 S12\" /></layoutData></ObjectListItem></l:content></l:Grid></mvc:View>"
}, "web/ui5/test-resources/sap/ui/layout/demokit/sample/GridTiles/Component-preload");