sap.ui.require.preload({
	"web/ui5/test-resources/sap/ui/core/samples/components/oneview/Component.js": "/*!\n * UI development toolkit for HTML5 (OpenUI5)\n * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.\n * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.\n */\nsap.ui.define([\"jquery.sap.global\",\"sap/ui/commons/Button\",\"sap/ui/core/UIComponent\"],function(t,e,n){\"use strict\";var o=n.extend(\"samples.components.oneview.Component\",{metadata:{properties:{text:\"string\"}}});return o.prototype.createContent=function(){return this.oButton=new e(this.createId(\"mybutn\")),this.getManifestEntry(\"sap.app\").text&&this.oButton.setText(this.getManifestEntry(\"sap.app\").text),this.oButton},o.prototype.setText=function(t){return this.oButton.setText(t),this.setProperty(\"text\",t),this},o});",
	"web/ui5/test-resources/sap/ui/core/samples/components/oneview/view/Main.controller.js": "",
	"web/ui5/test-resources/sap/ui/core/samples/components/oneview/view/Main.view.js": ""
}, "web/ui5/test-resources/sap/ui/core/samples/components/oneview/Component-preload");