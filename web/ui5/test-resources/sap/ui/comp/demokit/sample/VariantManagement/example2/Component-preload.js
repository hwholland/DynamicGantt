sap.ui.require.preload({
	"web/ui5/test-resources/sap/ui/comp/demokit/sample/VariantManagement/example2/Component.js": "jQuery.sap.declare(\"sap.ui.comp.sample.VariantManagement.example2.Component\"),sap.ui.core.UIComponent.extend(\"sap.ui.comp.sample.VariantManagement.example2.Component\",{metadata:{rootView:\"sap.ui.comp.sample.VariantManagement.example2.VariantManagement\",dependencies:{libs:[\"sap.m\",\"sap.ui.comp\"]},config:{sample:{stretch:!0,files:[\"VariantManagement.view.xml\",\"VariantManagement.controller.js\"]}}}});",
	"web/ui5/test-resources/sap/ui/comp/demokit/sample/VariantManagement/example2/VariantManagement.controller.js": "sap.ui.controller(\"sap.ui.comp.sample.VariantManagement.example2.VariantManagement\",{onSave:function(e){\"use strict\";jQuery.sap.require(\"sap.m.MessageToast\");var a=e.getParameters(),s=\"New Name: \"+a.name+\"\\nDefault: \"+a.def+\"\\nOverwrite:\"+a.overwrite+\"\\nSelected Item Key: \"+a.key;sap.m.MessageToast.show(s)},onManage:function(e){\"use strict\";jQuery.sap.require(\"sap.m.MessageToast\");for(var a=e.getParameters(),s=a.renamed,t=a.deleted,r=\"renamed: \\n\",n=0;n<s.length;n++)r+=s[n].key+\"=\"+s[n].name+\"\\n\";r+=\"\\n\\ndeleted: \";for(var o=0;o<t.length;o++)r+=t[o]+\",\";sap.m.MessageToast.show(r)},onSelect:function(e){\"use strict\";var a=\"New Variant Selected: \"+e.getParameters().key;sap.m.MessageToast.show(a)}});",
	"web/ui5/test-resources/sap/ui/comp/demokit/sample/VariantManagement/example2/VariantManagement.view.xml": "<mvc:View\r\n\theight=\"100%\"\r\n\tcontrollerName=\"sap.ui.comp.sample.VariantManagement.example2.VariantManagement\"\r\n\txmlns:mvc=\"sap.ui.core.mvc\"\r\n\txmlns:l=\"sap.ui.layout\"\r\n\txmlns:m=\"sap.m\"\r\n\txmlns=\"sap.ui.comp.variants\"><l:VerticalLayout><m:Label text=\"Variants\"/><VariantManagement select=\"onSelect\" save=\"onSave\" enabled=\"true\" manage=\"onManage\" showExecuteOnSelection=\"true\" showShare=\"true\"><variantItems><VariantItem text=\"ONE\" key=\"1\" global=\"true\" readOnly=\"true\" /><VariantItem text=\"TWO\" key=\"2\" global=\"true\" readOnly=\"true\" /><VariantItem text=\"THREE\" key=\"3\" global=\"true\" readOnly=\"true\" /><VariantItem text=\"FOUR\" key=\"4\" global=\"true\" readOnly=\"true\" /><VariantItem text=\"FIVE\" key=\"5\" global=\"true\" readOnly=\"true\" /><VariantItem text=\"SIX\" key=\"6\" global=\"true\" readOnly=\"true\" /><VariantItem text=\"SEVEN\" key=\"7\" global=\"true\" readOnly=\"true\" /><VariantItem text=\"EIGHT\" key=\"8\" global=\"true\" readOnly=\"true\" /><VariantItem text=\"NINE\" key=\"9\" global=\"true\" readOnly=\"true\" /></variantItems></VariantManagement></l:VerticalLayout></mvc:View>"
}, "web/ui5/test-resources/sap/ui/comp/demokit/sample/VariantManagement/example2/Component-preload");