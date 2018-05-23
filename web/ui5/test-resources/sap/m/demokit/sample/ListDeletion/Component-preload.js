sap.ui.require.preload({
	"web/ui5/test-resources/sap/m/demokit/sample/ListDeletion/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.m.sample.ListDeletion.Component\",{metadata:{rootView:\"sap.m.sample.ListDeletion.List\",dependencies:{libs:[\"sap.m\",\"sap.ui.layout\"]},config:{sample:{files:[\"List.view.xml\",\"List.controller.js\"]}}}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/ListDeletion/List.controller.js": "sap.ui.define([\"./MockServer\",\"sap/ui/core/mvc/Controller\",\"sap/ui/model/odata/ODataModel\"],function(e,t,o){\"use strict\";return t.extend(\"sap.m.sample.ListDeletion.List\",{onInit:function(t){e.start(),this.oProductModel=new o(\"/mockserver\",!0),this.getView().setModel(this.oProductModel)},onExit:function(){e.stop(),this.oProductModel.destroy()},handleDelete:function(e){var t=e.getSource(),o=e.getParameter(\"listItem\").getBindingContext().getPath();t.attachEventOnce(\"updateFinished\",t.focus,t),this.oProductModel.remove(o)}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/ListDeletion/MockServer.js": "sap.ui.define([\"jquery.sap.global\",\"sap/ui/core/util/MockServer\"],function(e,t){\"use strict\";return{server:null,rootUri:\"/mockserver/\",dataPath:\"test-resources/sap/ui/demokit/explored/mockserver/\",start:function(r){return t.config(e.extend({autoRespond:!0,autoRespondAfter:2e3},r)),this.server=new t({rootUri:this.rootUri}),this.server.simulate(this.dataPath+\"metadata.xml\",this.dataPath),this.server.start(),this.server},stop:function(){this.server.stop(),this.server=null}}},!0);",
	"web/ui5/test-resources/sap/m/demokit/sample/ListDeletion/List.view.xml": "<mvc:View\n\tcontrollerName=\"sap.m.sample.ListDeletion.List\"\n\txmlns:mvc=\"sap.ui.core.mvc\"\n\txmlns=\"sap.m\"><List\n\t\tid=\"list\"\n\t\tmode=\"Delete\"\n\t\tdelete=\"handleDelete\"\n\t\tenableBusyIndicator=\"true\"\n\t\theaderText=\"Products\"\n\t\tgrowing=\"true\"\n\t\titems=\"{\n\t\t\tpath: '/ProductCollection'\n\t\t}\" ><StandardListItem\n\t\t\ttitle=\"{Name}\"\n\t\t\tdescription=\"{ProductId}\"\n\t\t\ticon=\"{ProductPicUrl}\"\n\t\t\ticonDensityAware=\"false\"\n\t\t\ticonInset=\"false\" /></List></mvc:View>\n"
}, "web/ui5/test-resources/sap/m/demokit/sample/ListDeletion/Component-preload");