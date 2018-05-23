sap.ui.require.preload({
	"web/ui5/test-resources/sap/ui/core/demokit/sample/ViewTemplate/tiny/Component.js": "/*!\n * UI development toolkit for HTML5 (OpenUI5)\n * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.\n * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.\n */\nsap.ui.define([\"jquery.sap.global\",\"sap/m/MessageBox\",\"sap/m/Title\",\"sap/m/VBox\",\"sap/ui/core/TitleLevel\",\"sap/ui/core/UIComponent\",\"sap/ui/core/mvc/View\",\"sap/ui/core/mvc/ViewType\",\"sap/ui/model/odata/v2/ODataModel\"],function(e,t,a,o,n,i,s,p,r){\"use strict\";return i.extend(\"sap.ui.core.sample.ViewTemplate.tiny.Component\",{metadata:\"json\",createContent:function(){var e=new r(\"proxy/sap/opu/odata/IWBEP/GWSAMPLE_BASIC/\",{annotationURI:\"proxy/sap/opu/odata/IWFND/CATALOGSERVICE;v=2/Annotations(TechnicalName='ZANNO4SAMPLE_ANNO_MDL',Version='0001')/$value\",json:!0,loadMetadataAsync:!0}),i=e.getMetaModel(),s=\"/ProductSet('HT-1021')/ToSupplier\",l=new o({items:[new a({text:\"This is meant to be a pure code sample. (To run it, you would need a proxy which is configured properly.)\",titleStyle:n.H3})]});return i.loaded().then(function(){var t=sap.ui.view({preprocessors:{xml:{bindingContexts:{meta:i.getMetaContext(s)},models:{meta:i}}},type:p.XML,viewName:\"sap.ui.core.sample.ViewTemplate.tiny.Template\"});t.setModel(e),t.bindElement(s),l.destroyItems(),l.addItem(t)},function(e){t.alert(e.message,{icon:t.Icon.ERROR,title:\"Missing Proxy?\"})}),l}})});",
	"web/ui5/test-resources/sap/ui/core/demokit/sample/ViewTemplate/tiny/Field.fragment.xml": "<core:FragmentDefinition\n\txmlns=\"sap.m\"\n\txmlns:core=\"sap.ui.core\"\n\txmlns:template=\"http://schemas.sap.com/sapui5/extension/sap.ui.core.template/1\"><HBox><template:with path=\"field>Value\" helper=\".AH.resolvePath\" var=\"target\"><template:if test=\"{= ${target>sap:semantics} === 'tel'}\" ><core:Icon src=\"sap-icon://phone\" width=\"2em\"/></template:if></template:with><Text text=\"{path: 'field>Value', formatter: '.AH.format'}\"/></HBox></core:FragmentDefinition>",
	"web/ui5/test-resources/sap/ui/core/demokit/sample/ViewTemplate/tiny/Template.view.xml": "<mvc:View\n\txmlns=\"sap.m\"\n\txmlns:core=\"sap.ui.core\"\n\txmlns:form=\"sap.ui.layout.form\"\n\txmlns:mvc=\"sap.ui.core.mvc\"\n\txmlns:template=\"http://schemas.sap.com/sapui5/extension/sap.ui.core.template/1\"><template:alias name=\".AH\" value=\"sap.ui.model.odata.AnnotationHelper\"><template:with path=\"meta>com.sap.vocabularies.UI.v1.Badge\" var=\"badge\"><form:SimpleForm layout=\"ResponsiveGridLayout\"><form:title><core:Title text=\"{path: 'badge>HeadLine', formatter: '.AH.format'}\"/></form:title><Label text=\"{path: 'badge>Title/Label', formatter: '.AH.format'}\"/><Text text=\"{path: 'badge>Title/Value', formatter: '.AH.format'}\"/><Label text=\"{path: 'badge>MainInfo/Label', formatter: '.AH.format'}\"/><template:with path=\"badge>MainInfo\" var=\"field\"><core:Fragment fragmentName=\"sap.ui.core.sample.ViewTemplate.tiny.Field\" type=\"XML\"/></template:with><Label text=\"{path: 'badge>SecondaryInfo/Label', formatter: '.AH.format'}\"/><template:with path=\"badge>SecondaryInfo\" var=\"field\"><core:Fragment fragmentName=\"sap.ui.core.sample.ViewTemplate.tiny.Field\" type=\"XML\"/></template:with></form:SimpleForm></template:with></template:alias></mvc:View>\n"
}, "web/ui5/test-resources/sap/ui/core/demokit/sample/ViewTemplate/tiny/Component-preload");