/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2018 SAP SE. All rights reserved
	
 */
sap.ui.define([],function(){"use strict";var c=function(t){if(t==="sap.m.Table"||t==="sap.m.Column"||t.indexOf("sap.ui.table")>-1){return true;}return false;};return{aggregations:{customToolbar:{ignore:true},semanticObjectController:{ignore:true},noData:{ignore:true},items:{propagateMetadata:function(e){var t=e.getMetadata().getName();var i=(t==="sap.ui.comp.navpopover.SmartLink"||t==="sap.m.ObjectIdentifier");if(!i&&(t==="sap.m.Title"||c(t)||c(e.getParent().getMetadata().getName()))){return{actions:null};}}}},annotations:{sortable:{namespace:"Org.OData.Capabilities.V1",annotation:"SortRestrictions",target:["EntitySet"],whiteList:{properties:["NonSortableProperties"]},defaultValue:true,interpretation:"exclude",appliesTo:["columns/#"],group:["Behavior"],since:"1.28.1"},filterable:{namespace:"Org.OData.Capabilities.V1",annotation:"FilterRestrictions",target:["EntitySet"],whiteList:{properties:["NonFilterableProperties"]},defaultValue:true,interpretation:"exclude",appliesTo:["columns/#"],group:["Behavior"],since:"1.28.1"},columnLabelOnProperty:{namespace:"com.sap.vocabularies.Common.v1",annotation:"Label",target:["Property","PropertyPath"],defaultValue:null,appliesTo:["columns/#/label"],group:["Appearance","Behavior"],since:"1.28.1"},columnVisible:{namespace:"com.sap.vocabularies.Common.v1",annotation:"FieldControlType",target:["Property"],whiteList:{values:["Hidden"]},defaultValue:false,appliesTo:["columns/#/visible"],group:["Behavior"],since:"1.28.1"},columnCurrencyCode:{namespace:"Org.OData.Measures.V1",annotation:"ISOCurrency",target:["Property"],defaultValue:null,appliesTo:["columns/#/cellContent"],group:["Behavior"],since:"1.28.1"},columnUnitOfMeasure:{namespace:"Org.OData.Measures.V1",annotation:"Unit",target:["Property"],defaultValue:null,appliesTo:["columns/#/cellContent"],group:["Behavior"],since:"1.28.1"},columnUpperCase:{namespace:"com.sap.vocabularies.Common.v1",annotation:"IsUpperCase",target:["Property","Parameter"],defaultValue:true,appliesTo:["columns/#","columns/#/cellContent"],group:["Behavior"],since:"1.28.1"},lineItem:{namespace:"com.sap.vocabularies.UI.v1",annotation:"LineItem",target:["EntityType"],whiteList:{types:["DataFieldWithUrl","DataField"]},defaultValue:null,appliesTo:["columns"],group:["Behavior"],since:"1.28.1"},presentationVariant:{namespace:"com.sap.vocabularies.UI.v1",annotation:"PresentationVariant",target:["EntitySet","EntityType"],defaultValue:null,appliesTo:["columns"],group:["Behavior"],since:"1.28.1"},columnImportance:{namespace:"com.sap.vocabularies.UI.v1",annotation:"Importance",target:["Record","Annotation"],defaultValue:null,appliesTo:["columns/#/visible"],group:["Behavior"],since:"1.28.1"},columnDataField:{namespace:"com.sap.vocabularies.UI.v1",annotation:"DataField",target:["LineItem/Record"],whiteList:{properties:["Criticality","CriticalityRepresentation","Label","Value"]},defaultValue:null,appliesTo:["columns/cellContent"],group:["Behavior"],since:"1.28.1"},columnDataFieldWithUrl:{namespace:"com.sap.vocabularies.UI.v1",annotation:"DataFieldWithUrl",target:["LineItem/Record"],whiteList:{properties:["Label","Url","Value"]},defaultValue:null,appliesTo:["columns/cellContent"],group:["Behavior"],since:"1.38.1"},columnCriticality:{namespace:"com.sap.vocabularies.UI.v1",annotation:"CriticalityType",target:["PropertyPath"],defaultValue:null,appliesTo:["columns/criticality"],group:["Behavior"],since:"1.38.1"},columnCriticalityRepresentationType:{namespace:"com.sap.vocabularies.UI.v1",annotation:"CriticalityRepresentationType",target:["Property"],whiteList:{values:["WithoutIcon"]},interpretation:"excludeIcon",defaultValue:null,appliesTo:["columns/criticalityIcon"],group:["Behavior"],since:"1.38.1"},semanticKey:{namespace:"com.sap.vocabularies.Common.v1",annotation:"SemanticKey",target:["EntityType"],defaultValue:null,appliesTo:["columns/cellContent"],group:["Behavior"],since:"1.38.1"},semanticObject:{namespace:"com.sap.vocabularies.Common.v1",annotation:"SemanticObject",target:["Property"],defaultValue:null,appliesTo:["columns/cellContent"],group:["Behavior"],since:"1.28.1"},columnIsImageURL:{namespace:"com.sap.vocabularies.UI.v1",annotation:"IsImageURL",target:["Property"],defaultValue:true,appliesTo:["columns/image"],group:["Behavior"],since:"1.38.1"},columnText:{namespace:"com.sap.vocabularies.Common.v1",annotation:"Text",target:["Property"],defaultValue:null,appliesTo:["column/cellContent"],group:["Behavior"],since:"1.28.1"},textArrangement:{namespace:"com.sap.vocabularies.UI.v1",annotation:"TextArrangement",target:["EntityType","com.sap.vocabularies.Common.v1.Text"],defaultValue:null,appliesTo:["column/cellContent"],group:["Appearance","Behavior"],since:"1.38"}},customData:{useSmartField:{type:"boolean",defaultValue:false,group:["Appearance","Behavior"],since:"1.28.1"},dateFormatSettings:{type:"string",defaultValue:"{ UTC : true }",group:["Appearance"],since:"1.28.1"},currencyFormatSettings:{type:"string",defaultValue:null,appliesTo:["cellContent"],since:"1.28.1"},columnKey:{type:"string",defaultValue:null,group:["Behavior"],since:"1.28.1"},sortProperty:{type:"string",defaultValue:null,group:["Behavior"],since:"1.28.1"},filterProperty:{type:"string",defaultValue:null,group:["Behavior"],since:"1.28.1"},type:{type:"string",defaultValue:null,group:["Behavior"],since:"1.28.1"},maxLength:{type:"string",defaultValue:null,group:["Appearance"],since:"1.28.1"},precision:{type:"string",defaultValue:null,group:["Appearance"],since:"1.28.1"},scale:{type:"string",defaultValue:null,group:["Appearance"],since:"1.28.1"}},properties:{entitySet:{ignore:true},smartFilterId:{ignore:true},ignoredFields:{ignore:true},initiallyVisibleFields:{ignore:true},requestAtLeastFields:{ignore:true},ignoreFromPersonalisation:{ignore:true},tableType:{ignore:true},useVariantManagement:{ignore:true},showVariantManagement:{ignore:false},useExportToExcel:{ignore:false},exportType:{ignore:false},useTablePersonalisation:{ignore:true},showTablePersonalisation:{ignore:false},showRowCount:{ignore:false},header:{ignore:false},toolbarStyleClass:{ignore:true},enableCustomFilter:{ignore:true},persistencyKey:{ignore:true},useOnlyOneSolidToolbar:{ignore:true},currentVariantId:{ignore:true},editable:{ignore:false},enableAutoBinding:{ignore:false},tableBindingPath:{ignore:false},editTogglable:{ignore:true},demandPopin:{ignore:false},showFullScreenButton:{ignore:true}}};},false);
