sap.ui.require.preload({
	"web/ui5/test-resources/sap/ui/fl/qunit/testComponent/Component.js": "/*\n * @SAP UI development toolkit for HTML5 (SAPUI5)\n\n(c) Copyright 2014-2016 SAP SE. All rights reserved\n */\nsap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"testComponent.Component\",{init:function(){sap.ui.core.UIComponent.prototype.init.apply(this,arguments)},createContent:function(){return sap.ui.view({id:this.createId(\"myView\"),viewName:\"testComponent.View\",type:sap.ui.core.mvc.ViewType.XML,async:!1})}})});",
	"web/ui5/test-resources/sap/ui/fl/qunit/testComponent/View.view.xml": "<mvc:View\n\t\txmlns:simpleform=\"sap.ui.layout.form\"\n\t\txmlns=\"sap.m\"\n\t\txmlns:mvc=\"sap.ui.core.mvc\"><simpleform:SimpleForm id=\"myForm\"><Title id=\"myGroup\" /><Label id=\"myGroupElement\" /><Input id=\"myGroupField\" /></simpleform:SimpleForm></mvc:View>\n"
}, "web/ui5/test-resources/sap/ui/fl/qunit/testComponent/Component-preload");