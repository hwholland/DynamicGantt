sap.ui.require.preload({
	"web/ui5/test-resources/sap/ui/core/qunit/component/inherit/Component.js": "sap.ui.define([\"jquery.sap.global\",\"./parent/Component\"],function(e,t){\"use strict\";return t.extend(\"sap.ui.test.inherit.Component\",{metadata:\"json\"})});",
	"web/ui5/test-resources/sap/ui/core/qunit/component/inherit/parent/Component-preload.js": "sap.ui.require.preload({\"web/ui5/test-resources/sap/ui/core/qunit/component/inherit/parent/Component.js\":'sap.ui.define([\"jquery.sap.global\",\"sap/ui/core/UIComponent\"],function(e,t){\"use strict\";return t.extend(\"sap.ui.test.inherit.parent.Component\",{metadata:\"json\"})});'},\"web/ui5/test-resources/sap/ui/core/qunit/component/inherit/parent/Component-preload\");",
	"web/ui5/test-resources/sap/ui/core/qunit/component/inherit/parent/Component.js": "sap.ui.define([\"jquery.sap.global\",\"sap/ui/core/UIComponent\"],function(e,t){\"use strict\";return t.extend(\"sap.ui.test.inherit.parent.Component\",{metadata:\"json\"})});",
	"web/ui5/test-resources/sap/ui/core/qunit/component/inherit/script.js": "",
	"web/ui5/test-resources/sap/ui/core/qunit/component/inherit/i18n/i18n.properties": "title=App Title\ndescription=App Description\nmytext=This is my text"
}, "web/ui5/test-resources/sap/ui/core/qunit/component/inherit/Component-preload");