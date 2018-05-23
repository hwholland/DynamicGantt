/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2016 SAP SE. All rights reserved
 */
sap.ui.define(['jquery.sap.global','sap/ui/comp/odata/MetadataAnalyser','sap/ui/comp/odata/ChartMetadata','sap/ui/comp/odata/ODataType','./ControlProvider'],function(q,M,C,O,a){"use strict";var b=function(p){if(p){this._oParentODataModel=p.model;this.sEntitySet=p.entitySet;this._sIgnoredFields=p.ignoredFields;this.useSmartField=p.useSmartField;this._bSkipAnnotationParse=p.skipAnnotationParse==="true";this._oDefaultDropDownDisplayBehaviour=p.defaultDropDownDisplayBehaviour;try{this._oDateFormatSettings=p.dateFormatSettings?JSON.parse(p.dateFormatSettings):undefined;this._oCurrencyFormatSettings=p.currencyFormatSettings?JSON.parse(p.currencyFormatSettings):undefined;}catch(e){}}this._aODataFieldMetadata=[];this._oChartViewMetadata=null;this._oChartDataPointMetadata=null;this._aIgnoredFields=[];this._oMetadataAnalyser=new M(this._oParentODataModel);this._intialiseMetadata();};b.prototype._intialiseMetadata=function(){var c,d=[],f,i,l=0;this._aODataFieldMetadata=this._oMetadataAnalyser.getFieldsByEntitySetName(this.sEntitySet);this._sFullyQualifiedEntityTypeName=this._oMetadataAnalyser.getEntityTypeNameFromEntitySetName(this.sEntitySet);if(!this._bSkipAnnotationParse){this._oPresentationVariant=this._oMetadataAnalyser.getPresentationVariantAnnotation(this._sFullyQualifiedEntityTypeName);if(this._oPresentationVariant&&this._oPresentationVariant.chartAnnotation){this._oChartAnnotation=this._oPresentationVariant.chartAnnotation;}else{this._oChartAnnotation=this._oMetadataAnalyser.getChartAnnotation(this._sFullyQualifiedEntityTypeName);}}if(!this._oDefaultDropDownDisplayBehaviour){this._oDefaultDropDownDisplayBehaviour=this._oMetadataAnalyser.getTextArrangementValue(this._sFullyQualifiedEntityTypeName);}this._generateIgnoredFieldsArray();this._oControlProvider=new a({metadataAnalyser:this._oMetadataAnalyser,model:this._oParentODataModel,fieldsMetadata:this._aODataFieldMetadata,dateFormatSettings:this._oDateFormatSettings,currencyFormatSettings:this._oCurrencyFormatSettings,defaultDropDownDisplayBehaviour:this._oDefaultDropDownDisplayBehaviour,useSmartField:this.useSmartField,enableDescriptions:false,entitySet:this.sEntitySet});if(this._aODataFieldMetadata){l=this._aODataFieldMetadata.length;}for(i=0;i<l;i++){f=this._aODataFieldMetadata[i];if(this._aIgnoredFields.indexOf(f.name)>-1||!f.visible){continue;}if(f.type.indexOf("Edm.")===0){c=this._getFieldViewMetadata(f);this._enrichWithChartViewMetadata(f,c);d.push(f);}}if(this._oChartAnnotation){this._oChartViewMetadata=q.extend({},this._oChartAnnotation);this._oChartViewMetadata.chartType=C.getChartType(this._oChartViewMetadata.chartType);this._oChartViewMetadata.fields=d;}};b.prototype._setAnnotationMetadata=function(f){var A=null;if(f&&f.fullName){A=this._oMetadataAnalyser.getSemanticObjectAnnotation(f.fullName);if(A){f.semanticObject=A.semanticObject;}}};b.prototype._getFieldViewMetadata=function(f){var c=this._oControlProvider.getFieldViewMetadata(f,false);this._setAnnotationMetadata(c);return c;};b.prototype._generateIgnoredFieldsArray=function(){if(this._sIgnoredFields){this._aIgnoredFields=this._sIgnoredFields.split(",");}};b.prototype._enrichWithChartViewMetadata=function(f,v){f.isMeasure=f.aggregationRole&&f.aggregationRole==="measure";f.isDimension=f.aggregationRole&&f.aggregationRole==="dimension";f.role=this._getRole(f);f.filterType=v.filterType;if(v.template){f.template=v.template;}if(f.isDimension){f.displayBehaviour=v.displayBehaviour;}f.isSemanticObject=(v.semanticObject)?true:false;this._setInResult(f);this._setSortOrder(f);};b.prototype._setInResult=function(f){if(this._oPresentationVariant){if(this._oPresentationVariant.requestAtLeastFields&&this._oPresentationVariant.requestAtLeastFields.indexOf(f.name)>-1){f.inResult=true;}}};b.prototype._setSortOrder=function(f){var l;if(this._oPresentationVariant&&this._oPresentationVariant.sortOrderFields){l=this._oPresentationVariant.sortOrderFields.length;for(var i=0;i<l;i++){if(this._oPresentationVariant.sortOrderFields[i].name===f.name){f.sorted=true;f.sortOrder=this._oPresentationVariant.sortOrderFields[i].descending?"Descending":"Ascending";break;}}}};b.prototype._unmarkTextDimensions=function(f,t){var i,F;for(i=0;i<f.length;i++){F=f[i];if(F.isDimension){if(t.indexOf(F.name)>-1){F.isDimension=false;}}}};b.prototype._getRole=function(f){if(this._oChartAnnotation){if(f.isDimension&&this._oChartAnnotation.dimensionAttributes){return C.getDimensionRole(this._oChartAnnotation.dimensionAttributes[f.name]);}else if(f.isMeasure&&this._oChartAnnotation.measureAttributes){return C.getMeasureRole(this._oChartAnnotation.measureAttributes[f.name]);}}};b.prototype.getChartViewMetadata=function(){return this._oChartViewMetadata;};b.prototype.getChartDataPointMetadata=function(){if(!this._oChartDataPointMetadata&&this._sFullyQualifiedEntityTypeName){this._oChartDataPointMetadata=this._oMetadataAnalyser.getDataPointAnnotation(this._sFullyQualifiedEntityTypeName);}return this._oChartDataPointMetadata;};b.prototype.getIsUTCDateHandlingEnabled=function(){return this._oDateFormatSettings?this._oDateFormatSettings.UTC:false;};b.prototype.destroy=function(){if(this._oMetadataAnalyser&&this._oMetadataAnalyser.destroy){this._oMetadataAnalyser.destroy();}this._oMetadataAnalyser=null;if(this._oControlProvider&&this._oControlProvider.destroy){this._oControlProvider.destroy();}this._oControlProvider=null;this._aODataFieldMetadata=null;this._oChartViewMetadata=null;this._oChartDataPointMetadata=null;this._sIgnoredFields=null;this.bIsDestroyed=true;};return b;},true);
