sap.ui.require.preload({
	"web/ui5/test-resources/sap/ui/core/demokit/sample/BasicThemeParameters/BasicThemeParameters.controller.js": "sap.ui.define([\"jquery.sap.global\",\"sap/ui/core/mvc/Controller\",\"sap/ui/model/json/JSONModel\",\"sap/ui/core/theming/Parameters\"],function(e,t,a,o){\"use strict\";return t.extend(\"sap.ui.core.sample.BasicThemeParameters.BasicThemeParameters\",{onInit:function(){this.oModel=null,this.getView().attachAfterRendering(function(){this.beforeShow()},this),sap.ui.getCore().attachThemeChanged(this._reloadModel,this),this._reloadModel()},beforeShow:function(t){e(\".ParamSample\").each(function(e,t){t.style.background=t.innerHTML,t.style.color=t.innerHTML,t.title=t.innerHTML})},paramFormatter:function(e){return\"@\"+e},_reloadModel:function(t){var r=e.sap.getModulePath(\"sap.ui.core.sample.BasicThemeParameters\",\"/parameters.json\");this.oModel=new a(r),this.oModel.attachRequestCompleted(function(){var t=this.oModel.getData().params;for(var a in t)this.oModel.setProperty(\"/params/\"+a+\"/value\",o.get(t[a].name));this.getView().setModel(this.oModel),e.sap.delayedCall(0,this,function(){this.beforeShow()})},this)}})});",
	"web/ui5/test-resources/sap/ui/core/demokit/sample/BasicThemeParameters/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.ui.core.sample.BasicThemeParameters.Component\",{metadata:{rootView:\"sap.ui.core.sample.BasicThemeParameters.BasicThemeParameters\",dependencies:{libs:[\"sap.ui.core\"]},config:{sample:{stretch:!1,files:[\"BasicThemeParameters.view.xml\",\"BasicThemeParameters.controller.js\",\"parameters.json\"]}}}})});",
	"web/ui5/test-resources/sap/ui/core/demokit/sample/BasicThemeParameters/BasicThemeParameters.view.xml": "<mvc:View\n\tcontrollerName=\"sap.ui.core.sample.BasicThemeParameters.BasicThemeParameters\"\n\txmlns:l=\"sap.ui.layout\"\n\txmlns:mvc=\"sap.ui.core.mvc\"\n\txmlns=\"sap.m\"\n\txmlns:core=\"sap.ui.core\"><Table id=\"idProductsTable\"\n\titems=\"{\n\t\tpath:'/params',\n\t\tsorter:\n\t\t[{\n\t\t\tpath: 'usage',\n\t\t\tdescending: false,\n\t\t\tgroup: true\n\t\t},{\n\t\t\tpath: 'name',\n\t\t\tdescending: false\n\t\t}]\n\t\t}\"><headerToolbar><Toolbar><Label text=\"Basic Theme Parameters. Available in 'High Contrast Black' and 'Bluecrystal'\"></Label></Toolbar></headerToolbar><columns><Column mergeDuplicates=\"true\"\n\t\t\tminScreenWidth=\"tablet\"\n\t\t\twidth=\"5em\"></Column><Column\n\t\t\tdemandPopin=\"true\"><Text text=\"Parameter Name\" /></Column><Column\n\t\t\tminScreenWidth=\"Tablet\"\n\t\t\twidth=\"5em\"><Text text=\"Available since:\"/></Column><Column><Text text=\"Sample Display\"/></Column><Column\n\t\t\tminScreenWidth=\"Tablet\"\n\t\t\twidth=\"5em\"></Column></columns><items><ColumnListItem><cells><Text text=\"\" /><Text text=\"{path:'name', formatter:'.paramFormatter'}\" /><Text text=\"{since}\" class=\"ParamValue\" /><Text text=\"{value}\" class=\"ParamSample\" width=\"100%\"/></cells></ColumnListItem></items></Table></mvc:View>"
}, "web/ui5/test-resources/sap/ui/core/demokit/sample/BasicThemeParameters/Component-preload");