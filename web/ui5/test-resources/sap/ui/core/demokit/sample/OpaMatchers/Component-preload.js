sap.ui.require.preload({
	"web/ui5/test-resources/sap/ui/core/demokit/sample/OpaMatchers/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.ui.core.sample.OpaMatchers.Component\",{metadata:{dependencies:{libs:[\"sap.m\"]},config:{sample:{iframe:\"OpaMatchers.html\",stretch:!0,files:[\"OpaMatchers.html\",\"applicationUnderTest/view/Main.view.xml\",\"applicationUnderTest/view/Main.controller.js\",\"applicationUnderTest/index.html\",\"applicationUnderTest/Component.js\"]}}}})});",
	"web/ui5/test-resources/sap/ui/core/demokit/sample/OpaMatchers/applicationUnderTest/Component-preload.js": "sap.ui.require.preload({\"web/ui5/test-resources/sap/ui/core/demokit/sample/OpaMatchers/applicationUnderTest/Component.js\":'sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"appUnderTest.Component\",{metadata:{rootView:\"appUnderTest.view.Main\"}})});',\"web/ui5/test-resources/sap/ui/core/demokit/sample/OpaMatchers/applicationUnderTest/view/Main.controller.js\":'sap.ui.define([\"sap/ui/core/mvc/Controller\"],function(n){\"use strict\";return n.extend(\"appUnderTest.view.Main\",{onInit:function(){var n=this;window.setTimeout(function(){n.byId(\"changingButton\").setText(\"Changed text\")},5e3)}})});',\"web/ui5/test-resources/sap/ui/core/demokit/sample/OpaMatchers/applicationUnderTest/view/Main.view.xml\":'<mvc:View controllerName=\"appUnderTest.view.Main\"\\n\\txmlns=\"sap.m\"\\n\\txmlns:mvc=\"sap.ui.core.mvc\"><App><Page id=\"myPage\"><headerContent><Button id=\"changingButton\" text=\"My text will change after 5 seconds\" class=\"mySuperButton\"/></headerContent><content><Button text=\"Button in a Page\" id=\"buttonInAPage\"></Button></content><footer><Toolbar><Button text=\"You won\\'t find me\" /><Button text=\"Me neither\" /></Toolbar></footer></Page></App></mvc:View>\\n'},\"web/ui5/test-resources/sap/ui/core/demokit/sample/OpaMatchers/applicationUnderTest/Component-preload\");",
	"web/ui5/test-resources/sap/ui/core/demokit/sample/OpaMatchers/applicationUnderTest/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"appUnderTest.Component\",{metadata:{rootView:\"appUnderTest.view.Main\"}})});",
	"web/ui5/test-resources/sap/ui/core/demokit/sample/OpaMatchers/applicationUnderTest/view/Main.controller.js": "sap.ui.define([\"sap/ui/core/mvc/Controller\"],function(n){\"use strict\";return n.extend(\"appUnderTest.view.Main\",{onInit:function(){var n=this;window.setTimeout(function(){n.byId(\"changingButton\").setText(\"Changed text\")},5e3)}})});",
	"web/ui5/test-resources/sap/ui/core/demokit/sample/OpaMatchers/applicationUnderTest/view/Main.view.xml": "<mvc:View controllerName=\"appUnderTest.view.Main\"\n\txmlns=\"sap.m\"\n\txmlns:mvc=\"sap.ui.core.mvc\"><App><Page id=\"myPage\"><headerContent><Button id=\"changingButton\" text=\"My text will change after 5 seconds\" class=\"mySuperButton\"/></headerContent><content><Button text=\"Button in a Page\" id=\"buttonInAPage\"></Button></content><footer><Toolbar><Button text=\"You won't find me\" /><Button text=\"Me neither\" /></Toolbar></footer></Page></App></mvc:View>\n"
}, "web/ui5/test-resources/sap/ui/core/demokit/sample/OpaMatchers/Component-preload");