sap.ui.require.preload({
	"web/ui5/test-resources/sap/m/demokit/sample/ContainerNoPadding/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.m.sample.ContainerNoPadding.Component\",{metadata:{rootView:\"sap.m.sample.ContainerNoPadding.Page\",dependencies:{libs:[\"sap.m\"]},config:{sample:{stretch:!0,files:[\"Page.view.xml\",\"Page.controller.js\"]}}}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/ContainerNoPadding/Page.controller.js": "sap.ui.define([\"jquery.sap.global\",\"sap/ui/core/mvc/Controller\",\"sap/ui/model/json/JSONModel\"],function(e,o,n){\"use strict\";return o.extend(\"sap.m.sample.ContainerNoPadding.Page\",{onInit:function(o){var s=new n(e.sap.getModulePath(\"sap.ui.demo.mock\",\"/products.json\"));this.getView().setModel(s)}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/ContainerNoPadding/Page.view.xml": "<mvc:View\n\theight=\"100%\"\n\tcontrollerName=\"sap.m.sample.ContainerNoPadding.Page\"\n\txmlns:mvc=\"sap.ui.core.mvc\"\n\txmlns=\"sap.m\"><MessageStrip text=\"The IconTabBar and other container controls have a content padding by default.\n\t\tYou can override default container content paddings by setting the CSS class 'sapUiNoContentPadding'\n\t\tto the container control\" class=\"sapUiTinyMargin\"/><IconTabBar\n\t\tid=\"idIconTabBar\"\n\t\tclass=\"sapUiNoContentPadding\"><content><Text text=\"IconTabBar content without padding\"></Text></content><items><IconTabFilter\n\t\t\t\tshowAll=\"true\"\n\t\t\t\tcount=\"{/ProductCollectionStats/Counts/Total}\"\n\t\t\t\ttext=\"Products\"\n\t\t\t\tkeys=\"All\" /><IconTabSeparator /><IconTabFilter\n\t\t\t\ticon=\"sap-icon://begin\"\n\t\t\t\ticonColor=\"Positive\"\n\t\t\t\tcount=\"{/ProductCollectionStats/Counts/Weight/Ok}\"\n\t\t\t\ttext=\"Ok\"\n\t\t\t\tkey=\"Ok\" /><IconTabFilter\n\t\t\t\ticon=\"sap-icon://compare\"\n\t\t\t\ticonColor=\"Critical\"\n\t\t\t\tcount=\"{/ProductCollectionStats/Counts/Weight/Heavy}\"\n\t\t\t\ttext=\"Heavy\"\n\t\t\t\tkey=\"Heavy\" /><IconTabFilter\n\t\t\t\ticon=\"sap-icon://inventory\"\n\t\t\t\ticonColor=\"Negative\"\n\t\t\t\tcount=\"{/ProductCollectionStats/Counts/Weight/Overweight}\"\n\t\t\t\ttext=\"Overweight\"\n\t\t\t\tkey=\"Overweight\" /></items></IconTabBar></mvc:View>\n"
}, "web/ui5/test-resources/sap/m/demokit/sample/ContainerNoPadding/Component-preload");