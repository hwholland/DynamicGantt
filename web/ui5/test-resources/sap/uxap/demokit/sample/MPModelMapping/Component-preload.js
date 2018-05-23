sap.ui.require.preload({
	"web/ui5/test-resources/sap/uxap/demokit/sample/MPModelMapping/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.uxap.sample.MPModelMapping.Component\",{metadata:{rootView:\"sap.uxap.sample.MPModelMapping.ModelMapping\",dependencies:{libs:[\"sap.m\"]},config:{sample:{stretch:!0,files:[\"ModelMapping.view.xml\",\"ModelMapping.controller.js\",\"ModelMappingBlock.js\",\"ModelMappingBlock.view.xml\"]}}}})},!0);",
	"web/ui5/test-resources/sap/uxap/demokit/sample/MPModelMapping/ModelMapping.controller.js": "sap.ui.define([\"sap/ui/model/json/JSONModel\",\"sap/ui/core/mvc/Controller\"],function(e,n){\"use strict\";return n.extend(\"sap.uxap.sample.MPModelMapping.ModelMapping\",{onInit:function(){var n=new e({Employee:{firstName:\"John\",lastName:\"Miller\"}});this.getView().setModel(n,\"jsonModel\")}})},!0);",
	"web/ui5/test-resources/sap/uxap/demokit/sample/MPModelMapping/ModelMappingBlock.js": "sap.ui.define([\"sap/uxap/BlockBase\"],function(a){\"use strict\";return a.extend(\"sap.uxap.sample.MPModelMapping.ModelMappingBlock\",{metadata:{}})},!0);",
	"web/ui5/test-resources/sap/uxap/demokit/sample/MPModelMapping/ModelMapping.view.xml": "<core:View\n\t\txmlns:core=\"sap.ui.core\"\n\t\txmlns:uxap=\"sap.uxap\"\n\t\txmlns:sample=\"sap.uxap.sample.MPModelMapping\"\n\t\tcontrollerName=\"sap.uxap.sample.MPModelMapping.ModelMapping\"><sample:ModelMappingBlock id=\"block\"><uxap:ModelMapping externalModelName=\"jsonModel\" externalPath=\"/Employee\" internalModelName=\"Contact\"/></sample:ModelMappingBlock></core:View>\n",
	"web/ui5/test-resources/sap/uxap/demokit/sample/MPModelMapping/ModelMappingBlock.view.xml": "<mvc:View\n\t\txmlns:mvc=\"sap.ui.core.mvc\"\n\t\txmlns:forms=\"sap.ui.layout.form\"\n\t\txmlns:core=\"sap.ui.core\"\n\t\txmlns=\"sap.m\"><forms:SimpleForm\n\t\t\tmaxContainerCols=\"2\"\n\t\t\teditable=\"false\"\n\t\t\tlayout=\"ResponsiveGridLayout\"><core:Title text=\"My name\"></core:Title><Text text=\"{Contact>firstName}\"/><Text text=\"{Contact>lastName}\"/></forms:SimpleForm></mvc:View>\n"
}, "web/ui5/test-resources/sap/uxap/demokit/sample/MPModelMapping/Component-preload");