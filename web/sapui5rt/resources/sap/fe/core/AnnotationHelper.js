/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2017 SAP SE. All rights reserved
    
 */
(function(){"use strict";jQuery.sap.declare("sap.fe.core.AnnotationHelper");sap.fe.core.AnnotationHelper={getLineItemPresentation:function(p){var P=p.getObject();var m=P.metaModel;var M=p.getModel();var w;if(M.getProperty("/workingContext")){w=M.getProperty("/workingContext");}else{w=sap.fe.core.AnnotationHelper._getWorkingContext(m,P.entitySet,undefined);M.setProperty("/workingContext",w);}return m.getMetaContext(w.lineItemPath);},getChartPresentation:function(p){var P=p.getObject();var m=P.metaModel;var M=p.getModel();var w;if(M.getProperty("/workingContext")){w=M.getProperty("/workingContext");}else{w=sap.fe.core.AnnotationHelper._getWorkingContext(m,P.entitySet,undefined);M.setProperty("/workingContext",w);}return m.getMetaContext(w.chartPath);},_getWorkingContext:function(m,e,q){var a,w={},s,p,E='/'+e;a=E+"/@com.sap.vocabularies.UI.v1.SelectionPresentationVariant"+(q?"#"+q:"");w.selectionPresentationVariant=m.getObject(a);w.selectionPresentationVariantQualifier=a.split("#")[1]||"";w.selectionPresentationVariantPath=a;s=w.selectionPresentationVariant;if(s&&s.PresentationVariant){if(s.PresentationVariant.$Path){a=E+"/"+s.PresentationVariant.$Path;}else{a=a+"/PresentationVariant";}}else{a=E+"/@com.sap.vocabularies.UI.v1.PresentationVariant"+(q?"#"+q:"");}if(typeof a==="string"){w.presentationVariant=m.getObject(a);w.presentationVariantPath=a;w.presentationVariantQualifier=a.split("#")[1]||"";p=w.presentationVariant;}if(p&&p.Visualizations){p.Visualizations.forEach(function(v){a=E+'/'+v.$AnnotationPath;if(v.$AnnotationPath.indexOf("com.sap.vocabularies.UI.v1.LineItem")>-1){w.lineItem=m.getObject(a);w.lineItemPath=a;w.lineItemQualifier=a.split("#")[1]||"";}if(v.$AnnotationPath.indexOf("com.sap.vocabularies.UI.v1.Chart")>-1){w.chart=m.getObject(a);w.chartPath=a;w.chartQualifier=a.split("#")[1]||"";}});}if(!w.lineItem){a=E+"/@com.sap.vocabularies.UI.v1.LineItem";w.lineItem=m.getObject(a);w.lineItemPath=a;w.lineItemQualifier="";}if(!w.chart){a=E+"/@com.sap.vocabularies.UI.v1.Chart";w.chart=m.getObject(a);w.chartPath=a;w.chartQualifier="";}return w;},replaceSpecialCharsInId:function(i){if(i.indexOf(" ")>=0){jQuery.sap.log.error("Annotation Helper: Spaces are not allowed in ID parts. Please check the annotations, probably something is wrong there.");}return i.replace(/@/g,"").replace(/\//g,"::").replace(/#/g,"::");}};sap.fe.core.AnnotationHelper.getLineItemPresentation.requiresIContext=true;sap.fe.core.AnnotationHelper.getChartPresentation.requiresIContext=true;})();
