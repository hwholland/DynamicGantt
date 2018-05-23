sap.ui.require.preload({
	"web/ui5/test-resources/sap/ui/core/samples/components/targets/Component.js": "/*!\n * UI development toolkit for HTML5 (OpenUI5)\n * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.\n * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.\n */\nsap.ui.define([\"jquery.sap.global\",\"samples/components/routing/RouterExtension\",\"sap/ui/commons/Button\",\"sap/ui/core/UIComponent\",\"sap/ui/core/mvc/Controller\",\"sap/ui/core/mvc/JSView\"],function(e,t,n,o,s,r){\"use strict\";return o.extend(\"samples.components.targets.Component\",{metadata:{routing:{config:{targetsClass:\"sap.m.routing.Targets\"},targets:{myTarget:{viewType:\"XML\"}}}},createContent:function(){return s.extend(\"samples.components.routing.TestController\",{}),sap.ui.jsview(\"samples.components.routing.TestView\",{createContent:function(){return new n},getController:function(){return sap.ui.controller(\"samples.components.routing.TestController\")}}),this.oView=sap.ui.jsview(\"samples.components.routing.TestView\"),this.oView}})});"
}, "web/ui5/test-resources/sap/ui/core/samples/components/targets/Component-preload");