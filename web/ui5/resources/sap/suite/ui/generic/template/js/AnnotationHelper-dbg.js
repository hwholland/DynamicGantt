(function () {
	"use strict";
	jQuery.sap.require("sap.ui.comp.smartfield.SmartField");
	jQuery.sap.require("sap.suite.ui.generic.template.extensionAPI.UIMode");
	var UIMode = sap.ui.require("sap/suite/ui/generic/template/extensionAPI/UIMode");

	jQuery.sap.declare("sap.suite.ui.generic.template.js.AnnotationHelper");
	sap.suite.ui.generic.template.js.AnnotationHelper = {

		formatIndicatorValue : function(sValue){
			return parseFloat(sValue);
		},

		ratingIndicatorFormatter : function(oDataPoint, oValue){
			var sTargetValue;
			if (oDataPoint.Value.Decimal) {
				sTargetValue = oDataPoint.Value.Decimal;
			} else {
				sTargetValue = oDataPoint.Value.Path;
			}
			return "{parts: [{path: '" + sTargetValue + "'}], formatter: 'sap.suite.ui.generic.template.js.AnnotationHelper.formatIndicatorValue'}";
		},

		createProgressFormatter : function(oDataPoint, oValue){

            var sDataPoint, sValue;
            if (!oDataPoint.Value){
                return;
            }

            if (oDataPoint.TargetValue){
                sDataPoint = oDataPoint.TargetValue.Path;
            }
            if (oValue["Org.OData.Measures.V1.Unit"]){
                sValue = oValue["Org.OData.Measures.V1.Unit"].Path;
            } else if (oValue["Org.OData.Measures.V1.ISOCurrency"]) {
                sValue = oValue["Org.OData.Measures.V1.ISOCurrency"].Path;
            }
            
            return "{parts: [{path: '" + oDataPoint.Value.Path + "'}, {path: '" + sDataPoint + "'}, {path: '" + sValue + "'}], formatter: 'sap.suite.ui.generic.template.js.AnnotationHelper.calcProgressPerc'}";
	    },
	    
	    calcProgressPerc : function(sValue, sTargetValue, sUnitOfMeasure){
	        var sPercValue;
	        var sDisplayValue;
	        if (!sTargetValue){
	            sTargetValue = this.data("fixTargetValue");    
	        }
	        
	        var oResourceBundle = this.getModel("i18n").getResourceBundle();
	        
	        if (sUnitOfMeasure === "%") {
	            sPercValue = parseFloat(sValue);
	            sDisplayValue = oResourceBundle.getText("PROGRESS_INDICATOR_DISPLAY_VALUE_UOM_IS_PERCENT", [sValue]);
	        } else if (sValue && sTargetValue){
	            if (sTargetValue !== "0"){
	                sPercValue = (parseFloat(sValue) / parseFloat(sTargetValue)) * 100;   
	            } else {
	                sPercValue = 0;
	            }
	            
	            if (sUnitOfMeasure){
	                sDisplayValue = oResourceBundle.getText("PROGRESS_INDICATOR_DISPLAY_VALUE_UOM_IS_NOT_PERCENT", [sValue, sTargetValue, sUnitOfMeasure]);
	            } else {
	                sDisplayValue = oResourceBundle.getText("PROGRESS_INDICATOR_DISPLAY_VALUE_NO_UOM", [sValue, sTargetValue]);
	            }
	            
	        } else {
	            sPercValue = 0;
	            if (sUnitOfMeasure){
	                sDisplayValue = oResourceBundle.getText("PROGRESS_INDICATOR_DISPLAY_VALUE_UOM_IS_NOT_PERCENT_NO_TARGET_VALUE", [sValue, sUnitOfMeasure]);
	            } else {
	                sDisplayValue = sValue;   
	            }
	        } 
	        
	        if (sPercValue > 100){
	            sPercValue = 100;
	        }
	        
	        this.setDisplayValue(sDisplayValue);
	        
	        return sPercValue;
	    },
	    
	    createProgressStateFormatter : function(sDataFieldCriticality, sDataPointCriticality){
	        var sCriticality = (sDataFieldCriticality) ? sDataFieldCriticality : sDataPointCriticality;
	        if (!sCriticality && !sCriticality.Path) {
	            return "";
	        }
	        
	        return "{path: '" + sCriticality.Path + "', formatter:'sap.suite.ui.generic.template.js.AnnotationHelper.formatProgressState'}";
	        
	    },
	    
	    formatProgressState : function(sCriticality){

	        if (sCriticality === "1" || sCriticality === "com.sap.vocabularies.UI.v1.CriticalityType/Negative"){
	            return sap.ui.core.ValueState.Error;
	        } else if (sCriticality === "2" || sCriticality === "com.sap.vocabularies.UI.v1.CriticalityType/Critical") {
	            return sap.ui.core.ValueState.Warning;
	        } else if (sCriticality === "3" || sCriticality === "com.sap.vocabularies.UI.v1.CriticalityType/Positive") {
	            return sap.ui.core.ValueState.Success;
	        } else {
	            return sap.ui.core.ValueState.None;
	        }
	    },

		getIdForMoreBlockContent : function(oFacet){			
			if (oFacet["com.sap.vocabularies.UI.v1.PartOfPreview"] && oFacet["com.sap.vocabularies.UI.v1.PartOfPreview"].Bool === "false"){
				return "::MoreContent";
			}
		},	
			
		checkMoreBlockContent : function(oFacetContext){
			return sap.suite.ui.generic.template.js.AnnotationHelper.checkFacetContent(oFacetContext, false);
		},	
			
		checkBlockContent : function(oFacetContext){
			return sap.suite.ui.generic.template.js.AnnotationHelper.checkFacetContent(oFacetContext, true);
		},
		
		checkFacetContent : function(oFacetContext, bBlock){
			var sPath;
			var oInterface = oFacetContext.getInterface(0);
			var aFacets = oFacetContext.getModel().getProperty("", oFacetContext);
			
			//for Reference Facets directly under UI-Facets we need to check facets one level higher - by removing the last part of the path
			var aForPathOfFacetOneLevelHigher = oFacetContext.getPath().split("/Facets");
			var sContextOfFacetOneLevelHigher = oInterface.getModel().getContext(aForPathOfFacetOneLevelHigher[0]);
			if (oInterface.getModel().getProperty('', sContextOfFacetOneLevelHigher).RecordType === "com.sap.vocabularies.UI.v1.ReferenceFacet"){
				return sContextOfFacetOneLevelHigher.getPath();
			} else {
				if (!aFacets){	
					return; 
				}
				
				for (var iFacet = 0; iFacet < aFacets.length; iFacet++) {
					if (!bBlock){
						if (aFacets[iFacet]["com.sap.vocabularies.UI.v1.PartOfPreview"] && aFacets[iFacet]["com.sap.vocabularies.UI.v1.PartOfPreview"].Bool === "false"){
							sPath = oInterface.getPath() + "/" + iFacet;
							break;
						}
					} else {
						if (aFacets[iFacet].RecordType !== "com.sap.vocabularies.UI.v1.ReferenceFacet" || (!aFacets[iFacet]["com.sap.vocabularies.UI.v1.PartOfPreview"] || aFacets[iFacet]["com.sap.vocabularies.UI.v1.PartOfPreview"].Bool === "true")){
							sPath = oInterface.getPath() + "/" + iFacet;
							break;
						}
					}
				}
			}
				
			return sPath;
		},
		
		isImageUrl : function(oPropertyAnnotations) {
			var oShowImage = oPropertyAnnotations["com.sap.vocabularies.UI.v1.IsImageURL"] || oPropertyAnnotations["com.sap.vocabularies.UI.v1.IsImageUrl"];
			if (oShowImage && oShowImage.Bool && oShowImage.Bool === "false") {
				return false;
			} else if (oShowImage) {
				return true;
			}
			return false;
		},
		hasBreadCrumbs : function(oInterface, sViewHierarchy) {
			if (sViewHierarchy) {
				var aSections = sViewHierarchy.split("/");
				var sPath = "", aBreadCrumbs = [], oDataBag;

				// remove the last one - this is the current shown section
				aSections.pop();

				if (aSections.length > 0) {
					for (var i = 0; i < aSections.length; i++) {
						sPath = (sPath) ? (sPath + "/" + aSections[i]) : aSections[i];
						aBreadCrumbs.push(sPath);
					}
					oDataBag = oInterface.getSetting("preprocessorsData");
					oDataBag.breadCrumbs = aBreadCrumbs;
					return true;
				}
			}
		},

		matchesBreadCrumb: function(oInterface, oCandidate, sPath) {
			if (sPath) {
				var aSections = sPath.split("/");
				var oEntitySet, oEntityType, oAssociationEnd;

				if (aSections.length > 0) {
					// there's at least one section left - crate breadcrumbs
					var oMetaModel = oInterface.getInterface(0).getModel();
					var sEntitySet = aSections[0];

					for (var i = 0; i < aSections.length; i++) {
						if (i > 0) {
							oEntitySet = oMetaModel.getODataEntitySet(sEntitySet);
							oEntityType = oMetaModel.getODataEntityType(oEntitySet.entityType);
							oAssociationEnd = oMetaModel.getODataAssociationSetEnd(oEntityType, aSections[i]);
							sEntitySet = oAssociationEnd.entitySet;
						}

						if ((i + 1) === aSections.length) {
							if (sEntitySet === oCandidate.name) {
								return true;
							} else {
								return false;
							}
						}
					}
				}
			}
		},
		
		isObjectPageWithoutComplexTable : function(sEntitySet, oRouteConfig, oFacet) {
			if (oFacet && !sap.suite.ui.generic.template.js.AnnotationHelper.isOrHasComplexTable(sEntitySet, oRouteConfig, oFacet)) {
				return true;
			}
			return false;
		},
		isOrHasComplexTable : function(sEntitySet, oRouteConfig, oFacet) {
			if (oRouteConfig) {
				var oManifestPages = oRouteConfig.pages;
			}
			if (oManifestPages && oFacet) {
				// Object page
				var sFacetId = sap.suite.ui.generic.template.js.AnnotationHelper.getStableIdPartFromFacet(oFacet);
				return sap.suite.ui.generic.template.js.AnnotationHelper._hasComplexTableForFacetId(sEntitySet, oManifestPages, sFacetId);
			} else {
				return sap.suite.ui.generic.template.js.AnnotationHelper.isComplexTable(oRouteConfig);
			}
		},
		showFullScreenButton : function(oRouteConfig, oFacet) {
			if (oRouteConfig && oFacet) {
				var sFacetId = sap.suite.ui.generic.template.js.AnnotationHelper.getStableIdPartFromFacet(oFacet);
				if (oRouteConfig.component
						&& oRouteConfig.component.settings
						&& oRouteConfig.component.settings.sections
						&& oRouteConfig.component.settings.sections[sFacetId]
						&& oRouteConfig.component.settings.sections[sFacetId].tableMode === "FullScreenTable") {
					return true;
				}
			}
			return false;
		},
		_hasComplexTableForFacetId : function(sEntitySet, oManifestPages, sFacetId) {
			for ( var i in oManifestPages) {
				var oPage = oManifestPages[i];
				if (oPage.entitySet && oPage.component && oPage.component.settings && oPage.component.settings.complexListId) {
					if (oPage.navigationProperty && oPage.entitySet === sEntitySet && oPage.component.settings.complexListId === sFacetId && oPage.component.list) {
						return true;
					}
				}
				if (oPage.pages) {
					var res = sap.suite.ui.generic.template.js.AnnotationHelper._hasComplexTableForFacetId(sEntitySet, oPage.pages, sFacetId);
				}
				if (res === true) {
					return true;
				}
			}
			return false;
		},
		isComplexTable : function(oRouteConfig) {
			if (oRouteConfig && oRouteConfig.component && oRouteConfig.component.list && oRouteConfig.component.settings && oRouteConfig.component.settings.complexListId && oRouteConfig.navigationProperty) {
				return true;
			}
			return false;
		},
		getPersistencyKeyForSmartTable : function(oRouteConfig) {
			if (sap.suite.ui.generic.template.js.AnnotationHelper.isComplexTable(oRouteConfig)) {
				// ComplexTable -> return complexListId (FacetID)
				return oRouteConfig.component.settings.complexListId;
			}
			// ListReport
			return "listReportFloorplanTable";
		},
		getDisplayNavigationIntent: function (sListEntitySet, aSubPages, sAnnotationPath) {
			return sap.suite.ui.generic.template.js.AnnotationHelper.getSubObjectPageIntent(sListEntitySet, aSubPages, sAnnotationPath, 'display');
		},
		getSubObjectPageIntent: function (sListEntitySet, aSubPages, sAnnotationPath, sMode) {
			var sNavigationProperty;
			if (sAnnotationPath){
				//AnnotationPath is only filled on Object Page which contains facets->annotationPath
				sNavigationProperty = sAnnotationPath.split("/")[0];
			}
			if (sListEntitySet && aSubPages && aSubPages.length > 0) {
				if (sNavigationProperty){
					for (var i = 0; i < aSubPages.length; i++) {
						if (sListEntitySet === aSubPages[i].entitySet && sNavigationProperty === aSubPages[i].navigationProperty && aSubPages[i].navigation && aSubPages[i].navigation[sMode]) {
							return aSubPages[i].navigation[sMode].target;
						}
					}
				} else {
					for (var i = 0; i < aSubPages.length; i++) {
						if (sListEntitySet === aSubPages[i].entitySet && aSubPages[i].navigation && aSubPages[i].navigation[sMode]) {
							return aSubPages[i].navigation[sMode].target;
						}
					}
				}
			}
		},	
		extensionPointFragmentExists: function (oFacet, sFragmentId) {
			var sId = sap.suite.ui.generic.template.js.AnnotationHelper.getStableIdPartFromFacet(oFacet);
			if (sId === sFragmentId) {
				return true;
			} else {
				return false;
			}
		},
		formatWithExpandSimple: function (oInterface, oDataField, oEntitySet) {
			var aExpand = [], sExpand, oEntityType;
			var oMetaModel = oInterface && oInterface.getModel && oInterface.getModel();
			if (!oMetaModel) {
				// called with entity set therefore use the correct interface
				oInterface = oInterface.getInterface(0);
				oMetaModel = oInterface.getModel();
			}

			if (oEntitySet) {
				oEntityType = oMetaModel.getODataEntityType(oEntitySet.entityType);
			} else {
				// TODO: check with UI2 if helper to get entity type can be used, avoid using this path
				var aMatches = /^(\/dataServices\/schema\/\d+\/entityType\/\d+)(?:\/|$)/.exec(oInterface.getPath());
				if (aMatches && aMatches.length && aMatches[0]) {
					var oEntityTypeContext = oMetaModel.getProperty(aMatches[0]);
					var sNamespace = oMetaModel.getODataEntityContainer().namespace;
					oEntityType = oMetaModel.getODataEntityType(sNamespace + '.' + oEntityTypeContext.name);
				}
			}

			if (oEntityType) {
				// check if expand is needed
				if (oDataField && oDataField.Path) {
					sExpand = sap.suite.ui.generic.template.js.AnnotationHelper._getNavigationPrefix(oMetaModel, oEntityType, oDataField.Path);
					if (sExpand) {
						aExpand.push(sExpand);
					}

				} else if (oDataField && oDataField.Apply && oDataField.Apply.Name === "odata.concat") {
					oDataField.Apply.Parameters.forEach(function (oParameter) {
						if (oParameter.Type === "Path") {
							sExpand = sap.suite.ui.generic.template.js.AnnotationHelper._getNavigationPrefix(oMetaModel, oEntityType, oParameter.Value);
							if (sExpand) {
								if (aExpand.indexOf(sExpand) === -1) {
									aExpand.push(sExpand);
								}
							}
						}
					});
				}

				if (aExpand.length > 0) {
					// we analyze a facet that is part of the root context
					// set expand to expand data bag
					var oPreprocessorsData = oInterface.getSetting("preprocessorsData");
					if (oPreprocessorsData) {
						var aRootContextExpand = oPreprocessorsData.rootContextExpand || [];
						for (var j = 0; j < aExpand.length; j++) {
							if (aRootContextExpand.indexOf(aExpand[j]) === -1) {
								aRootContextExpand.push(aExpand[j]);
							}
						}
						oPreprocessorsData.rootContextExpand = aRootContextExpand;
					}

				}
			}

			return sap.ui.model.odata.AnnotationHelper.format(oInterface, oDataField);
		},

		formatWithExpand: function (oInterface, oDataField, oEntitySet) {
			sap.suite.ui.generic.template.js.AnnotationHelper.getNavigationPathWithExpand(oInterface, oDataField, oEntitySet);

			oInterface = oInterface.getInterface(0);
			sap.suite.ui.generic.template.js.AnnotationHelper.formatWithExpandSimple(oInterface, oDataField, oEntitySet);
			return sap.ui.model.odata.AnnotationHelper.format(oInterface, oDataField);
		},

		_getNavigationPrefix: function (oMetaModel, oEntityType, sProperty) {
			var sExpand = "";
			var aParts = sProperty.split("/");

			if (aParts.length > 1) {
				for (var i = 0; i < (aParts.length - 1); i++) {
					var oAssociationEnd = oMetaModel.getODataAssociationEnd(oEntityType, aParts[i]);
					if (oAssociationEnd) {
						oEntityType = oMetaModel.getODataEntityType(oAssociationEnd.type);
						if (sExpand) {
							sExpand = sExpand + "/";
						}
						sExpand = sExpand + aParts[i];
					} else {
						return sExpand;
					}
				}
			}

			return sExpand;
		},

		getNavigationPathWithExpand: function (oInterface, oContext, oEntitySetContext) {
			oInterface = oInterface.getInterface(0);
			var aDependents = [], aExpand = [], oFacetContent, aFacetContent = [];
			var oMetaModel = oInterface.getModel();
			var oEntitySet = oMetaModel.getODataEntitySet(oEntitySetContext.name || '');
			var sResolvedPath = sap.ui.model.odata.AnnotationHelper.resolvePath(oMetaModel.getContext(oInterface.getPath()));

			var sNavigationPath = sap.ui.model.odata.AnnotationHelper.getNavigationPath(oInterface, oContext);
			var sNavigationProperty = sNavigationPath.replace("{", "").replace("}", "");
			if (sNavigationProperty) {
				// from now on we need to set the entity set to the target
				var oEntityType = oMetaModel.getODataEntityType(oEntitySet.entityType);
				var oAssociationEnd = oMetaModel.getODataAssociationSetEnd(oEntityType, sNavigationProperty);
				if (oAssociationEnd && oAssociationEnd.entitySet) {
					oEntitySet = oMetaModel.getODataEntitySet(oAssociationEnd.entitySet);
				}
			} else {
				var oEntityType = oMetaModel.getODataEntityType(oEntitySetContext.entityType);
			}
			if (sResolvedPath) {
				aFacetContent = oMetaModel.getObject(sResolvedPath);
			}

			aFacetContent = aFacetContent.Data || aFacetContent;

			var fnGetDependents = function (sProperty, bIsValue) {
				var sExpand = sap.suite.ui.generic.template.js.AnnotationHelper._getNavigationPrefix(oMetaModel, oEntityType, sProperty);
				if (sExpand) {
					// check if already in expand array - if not yet add it
					if (aExpand.indexOf(sExpand) === -1) {
						aExpand.push(sExpand);
					}
				}
				if (bIsValue) {
					try {
						aDependents = sap.ui.comp.smartfield.SmartField.getSupportedAnnotationPaths(oMetaModel, oEntitySet, sProperty, true) || [];
					} catch (e) {
						aDependents = [];
					}
					for (var i = 0; i < aDependents.length; i++) {
						if (aExpand.indexOf(aDependents[i]) === -1) {
							aExpand.push(aDependents[i]);
						}
					}
				}
			};

			var fnAnalyzeApplyFunctions = function (oParameter) {
				if (oParameter.Type === "LabeledElement") {
					fnGetDependents(oParameter.Value.Path);
				} else if (oParameter.Type === "Path") {
					fnGetDependents(oParameter.Value);
				}
			};

			for (var i = 0; i < aFacetContent.length; i++) {
				oFacetContent = aFacetContent[i];

				if (oFacetContent.Value && oFacetContent.Value.Path) {
					fnGetDependents(oFacetContent.Value.Path, true);
				}

				if (oFacetContent.Value && oFacetContent.Value.Apply && oFacetContent.Value.Apply.Name === "odata.concat") {
					oFacetContent.Value.Apply.Parameters.forEach(fnAnalyzeApplyFunctions);
				}

				if (oFacetContent.Action && oFacetContent.Action.Path) {
					fnGetDependents(oFacetContent.Action.Path);
				}

				if (oFacetContent.Target && oFacetContent.Target.Path) {
					fnGetDependents(oFacetContent.Target.Path);
				}

				if (oFacetContent.SemanticObject && oFacetContent.SemanticObject.Path) {
					fnGetDependents(oFacetContent.SemanticObject.Path);
				}

				if (oFacetContent.Url && oFacetContent.Url.Path) {
					fnGetDependents(oFacetContent.Url.Path);
				}

				if (oFacetContent.Url && oFacetContent.Url.Apply && oFacetContent.Url.Apply.Parameters) {
					oFacetContent.Url.Apply.Parameters.forEach(fnAnalyzeApplyFunctions);
				}


				if (oFacetContent.UrlContentType && oFacetContent.UrlContentType.Path) {
					fnGetDependents(oFacetContent.UrlContentType.Path);
				}

			}

			if (aFacetContent.name) {
				fnGetDependents(aFacetContent.name, true);
			}

			if (aExpand.length > 0) {
				if (sNavigationProperty === "") {
					// we analyze a facet that is part of the root context
					// set expand to expand data bag
					var oPreprocessorsData = oInterface.getSetting("preprocessorsData");
					if (oPreprocessorsData) {
						var aRootContextExpand = oPreprocessorsData.rootContextExpand || [];
						for (var j = 0; j < aExpand.length; j++) {
							if (aRootContextExpand.indexOf(aExpand[j]) === -1) {
								aRootContextExpand.push(aExpand[j]);
							}
						}
						oPreprocessorsData.rootContextExpand = aRootContextExpand;
					}
				} else {
					// add expand to navigation path
					sNavigationPath = "{ path : '" + sNavigationProperty + "', parameters : { expand : '" + aExpand.join(',') + "'} }";
				}
			}

			return sNavigationPath;

		},

		isSelf: function (sPath) {
			if (sPath === undefined || (sPath && sPath.indexOf('@') === 0 && sPath.indexOf('/') === -1)) {
				return true;
			}
			return false;
		},
		// Needed for analytics fragments
		number: function (val) {
			if (!val) {
				return NaN;
			} else if (val.Decimal) {
				return +val.Decimal;
			} else if (val.Path) {
				return '{' + val.Path + '}';
			} else {
				return NaN;
			}
		},
		// Needed for analytics fragments
		formatColor: (function () {
			function formatVal(val) {
				if (!val) {
					return NaN;
				} else if (val.Decimal) {
					return val.Decimal;
				} else if (val.EnumMember) {
					return '\'' + val.EnumMember + '\'';
				} else if (val.Path) {
					return '${' + val.Path + '}';
				} else {
					return NaN;
				}
			}

			function formatCriticality(oDataPoint) {
				var criticality = oDataPoint.Criticality;

				return '{= ' + formatVal(criticality) + ' === \'UI.CriticalityType/Negative\' ? \'Error\' : ' + formatVal(criticality) + '=== \'UI.CriticalityType/Critical\' ? \'Critical\' : \'Good\'}';
			}

			function formatCriticalityCalculation(oDataPoint) {
				var value = formatVal(oDataPoint.Value);
				var oCriticalityCalc = oDataPoint.CriticalityCalculation;

				return '{= (' + value + ' < ' + formatVal(oCriticalityCalc.DeviationRangeLowValue) + ' || ' + value + ' > ' + formatVal(oCriticalityCalc.DeviationRangeHighValue) + ') ? \'Error\' : (' + value
					+ ' < ' + formatVal(oCriticalityCalc.ToleranceRangeLowValue) + ' || ' + value + ' > ' + formatVal(oCriticalityCalc.ToleranceRangeHighValue) + ') ? \'Critical\' : \'Good\'}';
			}

			return function (oDataPoint) {
				if (oDataPoint.Criticality) {
					return formatCriticality(oDataPoint);
				} else if (oDataPoint.CriticalityCalculation) {
					return formatCriticalityCalculation(oDataPoint);
				}
			};
		})(),

		_determineColumnIndex: function (oContext) {
			var sColumn = oContext.getPath();
			var iColumnIndex = Number(sColumn.slice(sColumn.lastIndexOf("/") + 1));
			var sLineItem = sColumn.slice(0, sColumn.lastIndexOf("/"));
			var oLineItem = oContext.getModel().getObject(sLineItem);
			for (var iRecord = 0; iRecord < iColumnIndex; iRecord++) {
				if ((oLineItem[iRecord].RecordType === "com.sap.vocabularies.UI.v1.DataFieldForAction" || 
					oLineItem[iRecord].RecordType === "com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation") && 
					(!oLineItem[iRecord].Inline || oLineItem[iRecord].Inline.Bool === "false")) {
						iColumnIndex--;
				}
			}
			return iColumnIndex;
		},
		
		createP13NColumnForAction: function (iContext, oDataField) {
			
			var iColumnIndex = sap.suite.ui.generic.template.js.AnnotationHelper._determineColumnIndex( iContext );
			
			var sP13N = '\\{"columnKey":"' + oDataField.Label.String + '", "columnIndex":"' + iColumnIndex + '", "actionButton":"true" \\}';
			return sP13N;
		},
		
		createP13NColumnForIndicator: function (oInterface, oContextSet, oContextProp, oDataField, oDataFieldTarget, oDataFieldTargetValue) {
			
			var sP13N = sap.suite.ui.generic.template.js.AnnotationHelper.createP13N(oInterface, oContextSet, oContextProp, oDataField, oDataFieldTarget, oDataFieldTargetValue);
			var sOwnP13N = sP13N.slice(0, sP13N.lastIndexOf("\\}") - 1); //get rid of terminator string
		
			//Determine column index
			var oContext = oInterface.getInterface(2); 
			var iColumnIndex = sap.suite.ui.generic.template.js.AnnotationHelper._determineColumnIndex( oContext );
			if (iColumnIndex) {
				sOwnP13N += ', "columnIndex":"' + iColumnIndex;
			}
			
			sOwnP13N += '" \\}'; //add terminator string again

			return sOwnP13N;
		},
		
		createP13N: function (oInterface, oContextSet, oContextProp, oDataField, oDataFieldTarget, oDataFieldTargetValue) {
			var sP13N = "", aAdditionalProperties = [], sNavigation = "";
			
			if (oDataField.RecordType === "com.sap.vocabularies.UI.v1.DataField" || oDataField.RecordType === "com.sap.vocabularies.UI.v1.DataFieldForAnnotation") {
				
			if (oDataField["RecordType"] === "com.sap.vocabularies.UI.v1.DataFieldForAnnotation" && oDataField.Target){
				if (oDataFieldTarget){
				    if (oDataField.Criticality){
				        oDataFieldTarget.Criticality = oDataField.Criticality;
				    }
				    
				    if (oDataFieldTarget.TargetValue && oDataFieldTarget.TargetValue.Path){
                        aAdditionalProperties.push(oDataFieldTarget.TargetValue.Path);
				    }
				    
					oDataField = oDataFieldTarget;
					oContextProp = oDataFieldTargetValue;
				}
			}
			if (oDataField.Value.Path) {
			    
			    var sColumnKey = oDataField.Value.Path;
				if (oDataField.Visualization && oDataField.Visualization.EnumMember){
					sColumnKey = sColumnKey + oDataField.Visualization.EnumMember.slice(oDataField.Visualization.EnumMember.lastIndexOf("/") + 1, oDataField.Visualization.EnumMember.length);
				}
				sP13N = '\\{"columnKey":"' + sColumnKey + '", "leadingProperty":"' + oDataField.Value.Path;
				// get Navigation Prefix
				var oMetaModel = oInterface.getInterface(0).getModel("meta");
				if (oMetaModel){
					var oEntityType = oMetaModel.getODataEntityType(oContextSet.entityType);
					if (oEntityType){
						sNavigation = sap.suite.ui.generic.template.js.AnnotationHelper._getNavigationPrefix(oMetaModel, oEntityType, oDataField.Value.Path);
						if (sNavigation){
							sNavigation = sNavigation + "/";
						}
					}
				}
			} else if (oDataField.Value.Apply && oDataField.Value.Apply.Name === "odata.concat") {
				oDataField.Value.Apply.Parameters.forEach(function (oParameter) {
					if (oParameter.Type === "Path") {
						if (!sP13N) {
							sP13N = '\\{"columnKey":"' + oParameter.Value + '", "leadingProperty":"' + oParameter.Value;
						} else {
							aAdditionalProperties.push(oParameter.Value);
						}
					}
				});
			}
			if ((oContextProp.type === "Edm.DateTime") && (oContextProp["sap:display-format"] === "Date")) {
				sP13N += '", "type":"date';
			}
			if (oDataField.Criticality && oDataField.Criticality.Path) {
				aAdditionalProperties.push(oDataField.Criticality.Path);
			}
			if (oContextProp["com.sap.vocabularies.Common.v1.Text"] && oContextProp["com.sap.vocabularies.Common.v1.Text"].Path) {
				aAdditionalProperties.push(sNavigation + oContextProp["com.sap.vocabularies.Common.v1.Text"].Path);
			}
			if (oContextProp["Org.OData.Measures.V1.ISOCurrency"] && oContextProp["Org.OData.Measures.V1.ISOCurrency"].Path) {
				aAdditionalProperties.push(sNavigation + oContextProp["Org.OData.Measures.V1.ISOCurrency"].Path);
			}
			if (oContextProp["Org.OData.Measures.V1.Unit"] && oContextProp["Org.OData.Measures.V1.Unit"].Path) {
				aAdditionalProperties.push(sNavigation + oContextProp["Org.OData.Measures.V1.Unit"].Path);
			}
			if (oContextProp["com.sap.vocabularies.Common.v1.FieldControl"] && oContextProp["com.sap.vocabularies.Common.v1.FieldControl"].Path) {
				aAdditionalProperties.push(sNavigation + oContextProp["com.sap.vocabularies.Common.v1.FieldControl"].Path);
			}
			if ((oDataField["RecordType"] === "com.sap.vocabularies.UI.v1.DataFieldWithUrl") && oDataField.Url && oDataField.Url.Apply && oDataField.Url.Apply.Parameters) {
				oDataField.Url.Apply.Parameters.forEach(function (oParameter) {
					if (oParameter.Type === "LabeledElement") {
						aAdditionalProperties.push(oParameter.Value.Path);
					}
				});
			}
			if ((oDataField["RecordType"] === "com.sap.vocabularies.UI.v1.DataFieldWithUrl") && oDataField.Url && oDataField.Url.Path) {
				aAdditionalProperties.push(oDataField.Url.Path);
			}
			if (aAdditionalProperties.length > 0) {
				var sAdditionalProperties = "";
				aAdditionalProperties.forEach(function (oProperty) {
					if (sAdditionalProperties) {
						sAdditionalProperties = sAdditionalProperties + ",";
					}
					sAdditionalProperties = sAdditionalProperties + oProperty;
				});
				sP13N += '", "additionalProperty":"' + sAdditionalProperties;
			}
			var bNotSortable = false;
			if (oContextSet["Org.OData.Capabilities.V1.SortRestrictions"] && oContextSet["Org.OData.Capabilities.V1.SortRestrictions"].NonSortableProperties) {
				var aNonSortableProperties = oContextSet["Org.OData.Capabilities.V1.SortRestrictions"].NonSortableProperties;
				for (var i = aNonSortableProperties.length - 1; i >= 0; i--) {
					if (aNonSortableProperties[i].PropertyPath === oDataField.Value.Path) {
						bNotSortable = true;
						break;
					}
				}
			}
			if (!bNotSortable) {
				if (sNavigation) {
					sP13N += '", "sortProperty":"' + sNavigation + oContextProp.name;
				} else {
					sP13N += '", "sortProperty":"' + oContextProp.name;
				}
			}
			var bNotFilterable = false;
			if (oContextSet["Org.OData.Capabilities.V1.FilterRestrictions"]) {
				if (oContextSet["Org.OData.Capabilities.V1.FilterRestrictions"].Filterable !== 'false') {
					if (oContextSet["Org.OData.Capabilities.V1.FilterRestrictions"].NonFilterableProperties) {
						var aNonFilterableProperties = oContextSet["Org.OData.Capabilities.V1.FilterRestrictions"].NonFilterableProperties;
						for (var j = aNonFilterableProperties.length - 1; j >= 0; j--) {
							if (aNonFilterableProperties[j].PropertyPath === oDataField.Value.Path) {
								bNotFilterable = true;
								break;
							}
						}
					}
				} else {
					bNotFilterable = true;
				}
			}
			if (!bNotFilterable) {
				sP13N += '", "filterProperty":"' + oContextProp.name;
			}
			} else {
				sP13N = '\\{"columnKey":"' + oDataField.Label.String;
				sP13N += '", "actionButton":"true';
			}
			return sP13N + '" \\}';
		},
		
		hasActions: function (Par) {
			for (var i = 0; i < Par.length; i++) {
				if (Par[i].RecordType === "com.sap.vocabularies.UI.v1.DataFieldForAction" || Par[i].RecordType === "com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation") {
					return true;
				}
			}
			return false;
		},
		hasCustomActions: function(oRouteConfig, sEntitySet, oManifestExt, oFacet) {
			if (sEntitySet && oManifestExt) {
				if (oFacet) {
					// helper was called from facet (i.e. Object Page table)
					if (oManifestExt[sEntitySet]) {
						var oManifestExtEntitySet = oManifestExt[sEntitySet];
						if (oManifestExtEntitySet.EntitySet === sEntitySet) {
							// helper was called from fragment (i.e. SmartTable)
							var sFacetId = sap.suite.ui.generic.template.js.AnnotationHelper.getStableIdPartFromFacet(oFacet);
							var oSection = oManifestExtEntitySet.Sections[sFacetId];
							if (oSection && oSection.id === sFacetId && oSection.Actions) {
								for (var i in oSection.Actions) {
									if (oSection.Actions[i].requiresSelection !== false) {
										return true;
									}
								}
							}
						}
					}
				} else {
					// helper was called from ListReport or ComplexTable
					if (sap.suite.ui.generic.template.js.AnnotationHelper.isComplexTable(oRouteConfig)) {
						oManifestExt = oManifestExt["sap.suite.ui.generic.template.ListReport.view.ComplexTable"]["sap.ui.generic.app"];
					} else {
						oManifestExt = oManifestExt["sap.suite.ui.generic.template.ListReport.view.ListReport"]["sap.ui.generic.app"];
					}
					if (oManifestExt && oManifestExt[sEntitySet]) {
						var oManifestExtEntitySet = oManifestExt[sEntitySet];
						if (oManifestExtEntitySet.EntitySet === sEntitySet) {
							if (oManifestExtEntitySet.Actions) {
								for (var i in oManifestExtEntitySet.Actions) {
									if (oManifestExtEntitySet.Actions[i].requiresSelection !== false) {
										return true;
									}
								}
							}
						}
					}
				}
			}
			return false;
		},
		// Determine selection mode of grid table
		getSelectionModeGridTable: function(aEntities, sRootEntitySet, oManifestExt, oFacet, oEntitySet, oRouteConfig) {
			var sSelectionMode = "None";
			for ( var i in oRouteConfig.pages) {
				if (oRouteConfig.pages[i].entitySet === sRootEntitySet &&  sap.suite.ui.generic.template.js.AnnotationHelper.hasSubObjectPage(oEntitySet, oRouteConfig.pages[i].pages)) {
					sSelectionMode = "Single";
					break;
				}
			}
			if (sap.suite.ui.generic.template.js.AnnotationHelper.isOrHasComplexTable(oEntitySet.name, oRouteConfig, oFacet)){
				return sSelectionMode;
			}
			if (sap.suite.ui.generic.template.js.AnnotationHelper.hasActions(aEntities) || sap.suite.ui.generic.template.js.AnnotationHelper.hasCustomActions(oRouteConfig, sRootEntitySet, oManifestExt, oFacet)) {
				sSelectionMode = "Single";
			}
			return sSelectionMode;
		},
		// Determine selection mode of responsive table
		getSelectionModeResponsiveTable: function(aEntities, sRootEntitySet, oManifestExt, oFacet, oEntitySet, oRouteConfig) {
			var sSelectionMode = "None";
			if (sap.suite.ui.generic.template.js.AnnotationHelper.isOrHasComplexTable(oEntitySet.name, oRouteConfig, oFacet)){
				return sSelectionMode;
			}
			if (sap.suite.ui.generic.template.js.AnnotationHelper.hasActions(aEntities) || sap.suite.ui.generic.template.js.AnnotationHelper.hasCustomActions(oRouteConfig, sRootEntitySet, oManifestExt, oFacet)) {
					sSelectionMode = "SingleSelectLeft";
			}
			return sSelectionMode;
		},

		getSortOrder: function (Par) {
			var str = '';
			for (var i = 0; i < Par.length; i++) {
				if (!str) {
					str = Par[i].Property.PropertyPath;
				} else {
					str = str + ', ' + Par[i].Property.PropertyPath;
				}
				if (Par[i].Descending) {
					str = str + ' ' + Par[i].Descending.Bool;
				}
			}
			return str;
		},
		replaceSpecialCharsInId: function (sId) {
			if (sId.indexOf(" ") >= 0) {
				jQuery.sap.log.error("Annotation Helper: Spaces are not allowed in ID parts. Please check the annotations, probably something is wrong there.");
			}
			return sId.replace(/@/g, "").replace(/\//g, "::").replace(/#/g, "::");
		},
		getStableIdPartFromDataField: function (oDataField) {
			var sPathConcat = "", sIdPart = "";
			if (oDataField.RecordType && oDataField.RecordType === "com.sap.vocabularies.UI.v1.DataFieldForAction") {
				return sap.suite.ui.generic.template.js.AnnotationHelper.replaceSpecialCharsInId(oDataField.Action.String);
			} else if (oDataField.RecordType && oDataField.RecordType === "com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation") {
				if (oDataField.SemanticObject.String) {
					sIdPart = sap.suite.ui.generic.template.js.AnnotationHelper.replaceSpecialCharsInId(oDataField.SemanticObject.String);
				} else if (oDataField.SemanticObject.Path) {
					sIdPart = sap.suite.ui.generic.template.js.AnnotationHelper.replaceSpecialCharsInId(oDataField.SemanticObject.Path);
				}
				if (oDataField.Action && oDataField.Action.String) {
					sIdPart = sIdPart + "::" + sap.suite.ui.generic.template.js.AnnotationHelper.replaceSpecialCharsInId(oDataField.Action.String);
				} else if (oDataField.Action && oDataField.Action.Path) {
					sIdPart = sIdPart + "::" + sap.suite.ui.generic.template.js.AnnotationHelper.replaceSpecialCharsInId(oDataField.Action.Path);
				}
				return sIdPart;
			} else if (oDataField.RecordType && oDataField.RecordType === "com.sap.vocabularies.UI.v1.DataFieldForAnnotation") {
				return sap.suite.ui.generic.template.js.AnnotationHelper.replaceSpecialCharsInId(oDataField.Target.AnnotationPath);
			} else if (oDataField.Value && oDataField.Value.Path) {
				return sap.suite.ui.generic.template.js.AnnotationHelper.replaceSpecialCharsInId(oDataField.Value.Path);
			} else if (oDataField.Value && oDataField.Value.Apply && oDataField.Value.Apply.Name === "odata.concat") {
				for (var i = 0; i < oDataField.Value.Apply.Parameters.length; i++) {
					if (oDataField.Value.Apply.Parameters[i].Type === "Path") {
						if (sPathConcat) {
							sPathConcat = sPathConcat + "::";
						}
						sPathConcat = sPathConcat + sap.suite.ui.generic.template.js.AnnotationHelper.replaceSpecialCharsInId(oDataField.Value.Apply.Parameters[i].Value);
					}
				}
				return sPathConcat;
			} else {
				// In case of a string or unknown property
				jQuery.sap.log.error("Annotation Helper: Unable to create a stable ID. Please check the annotations.");
			}
		},
		getStableIdPartFromDataPoint: function (oDataPoint) {
			var sPathConcat = "";
			if (oDataPoint.Value && oDataPoint.Value.Path) {
				return sap.suite.ui.generic.template.js.AnnotationHelper.replaceSpecialCharsInId(oDataPoint.Value.Path);
			} else if (oDataPoint.Value && oDataPoint.Value.Apply && oDataPoint.Value.Apply.Name === "odata.concat") {
				for (var i = 0; i < oDataPoint.Value.Apply.Parameters.length; i++) {
					if (oDataPoint.Value.Apply.Parameters[i].Type === "Path") {
						if (sPathConcat) {
							sPathConcat = sPathConcat + "::";
						}
						sPathConcat = sPathConcat + sap.suite.ui.generic.template.js.AnnotationHelper.replaceSpecialCharsInId(oDataPoint.Value.Apply.Parameters[i].Value);
					}
				}
				return sPathConcat;
			} else {
				// In case of a string or unknown property
				jQuery.sap.log.error("Annotation Helper: Unable to create stable ID derived from annotations.");
			}
		},
		getStableIdPartFromFacet: function (oFacet) {
			var sHeaderFacetPrefix = "";
			if (typeof this.getContext === "function" && this.getContext() && this.getContext().getPath() && this.getContext().getPath().indexOf("com.sap.vocabularies.UI.v1.HeaderFacets") >= 0) {
				sHeaderFacetPrefix = "headerEditable::";
			}
			if (oFacet.RecordType && oFacet.RecordType === "com.sap.vocabularies.UI.v1.CollectionFacet") {
				if (oFacet.ID && oFacet.ID.String) {
					return sHeaderFacetPrefix + oFacet.ID.String;
				} else {
					// If the ID is missing a random value is returned because a duplicate ID error will be thrown as soon as there is
					// more than one form on the UI.
					jQuery.sap.log.error("Annotation Helper: Unable to create a stable ID. You have to set an ID at all collection facets.");
					return Math.floor((Math.random() * 99999) + 1).toString();
				}
			} else if (oFacet.RecordType && oFacet.RecordType === "com.sap.vocabularies.UI.v1.ReferenceFacet") {
				if (oFacet.ID && oFacet.ID.String) {
					return sHeaderFacetPrefix + oFacet.ID.String;
				} else {
					return sHeaderFacetPrefix + sap.suite.ui.generic.template.js.AnnotationHelper.replaceSpecialCharsInId(oFacet.Target.AnnotationPath);
				}
			} else {
				jQuery.sap.log.error("Annotation Helper: Unable to create a stable ID. Please check the facet annotations.");
				return Math.floor((Math.random() * 99999) + 1).toString();
			}
		},
		extensionPointBeforeFacetExists: function (sEntitySet, oFacet, oManifestExtend) {
			var sExtensionPointId = "BeforeFacet|" + sEntitySet + "|" + sap.suite.ui.generic.template.js.AnnotationHelper.getStableIdPartFromFacet(oFacet);
			if (oManifestExtend[sExtensionPointId]) {
				return "true";
			} else {
				return "";
			}
		},
		extensionPointAfterFacetExists: function (sEntitySet, oFacet, oManifestExtend) {
			var sExtensionPointId = "AfterFacet|" + sEntitySet + "|" + sap.suite.ui.generic.template.js.AnnotationHelper.getStableIdPartFromFacet(oFacet);
			if (oManifestExtend[sExtensionPointId]) {
				return "true";
			} else {
				return "";
			}
		},
		getExtensionPointBeforeFacetTitle: function (sEntitySet, oFacet, oManifestExtend) {
			var sExtensionPointId = "BeforeFacet|" + sEntitySet + "|" + sap.suite.ui.generic.template.js.AnnotationHelper.getStableIdPartFromFacet(oFacet);
			var oExtension = oManifestExtend[sExtensionPointId];
			if (oExtension && oExtension['sap.ui.generic.app'] && oExtension['sap.ui.generic.app'].title) {
				return oExtension['sap.ui.generic.app'].title;
			}
		},
		getExtensionPointAfterFacetTitle: function (sEntitySet, oFacet, oManifestExtend) {
			var sExtensionPointId = "AfterFacet|" + sEntitySet + "|" + sap.suite.ui.generic.template.js.AnnotationHelper.getStableIdPartFromFacet(oFacet);
			var oExtension = oManifestExtend[sExtensionPointId];
			if (oExtension && oExtension['sap.ui.generic.app'] && oExtension['sap.ui.generic.app'].title) {
				return oExtension['sap.ui.generic.app'].title;
			}
		},
		getRepeatIndex: function (oValue) {
			if (oValue && oValue.getPath()) {
				var sPadding = "0000000000";
				var sPaddedIndex = sPadding + ((parseInt(oValue.getPath().substring(oValue.getPath().lastIndexOf("/") + 1), 10) + 1 ) * 10).toString();
				return sPaddedIndex.substr(sPaddedIndex.length - sPadding.length);
			} else {
				jQuery.sap.log.error("Annotation Helper: Unable to get index.");
			}
		},
		getColumnListItemType: function (oListEntitySet, aSubPages) {
			if (sap.suite.ui.generic.template.js.AnnotationHelper.hasSubObjectPage(oListEntitySet, aSubPages)) {
				return "Navigation";
			} else {
				return "Inactive";
			}
		},
		hasSubObjectPage: function (oListEntitySet, aSubPages) {
			var bHasSubObjectPage = false;
			if (oListEntitySet.name && aSubPages && aSubPages.length > 0) {
				aSubPages.forEach(function (oSubPage) {
					if (oListEntitySet.name === oSubPage.entitySet) {
						if (!sap.suite.ui.generic.template.js.AnnotationHelper.isComplexTable(oSubPage)) {
							bHasSubObjectPage = true;
						}
					}
				});
			}
			return bHasSubObjectPage;
		},
		actionControlHeader: function (oInterface, sActionApplicablePath, sEntityType) {
			sap.suite.ui.generic.template.js.AnnotationHelper._actionControlExpand(oInterface, sActionApplicablePath, sEntityType);
			if (sActionApplicablePath) {
				return "{= !${ui>/editable} && ${path: '" + sActionApplicablePath + "'} }";
			} else {
				return "{= !${ui>/editable} }";
			}
		},
		actionControlFooter: function (oInterface, sActionApplicablePath, sEntityType) {
			sap.suite.ui.generic.template.js.AnnotationHelper._actionControlExpand(oInterface, sActionApplicablePath, sEntityType);
			if (sActionApplicablePath) {
				return "{path: '" + sActionApplicablePath + "'}";
			} else {
				return "true";
			}
		},
		_actionControlExpand: function (oInterface, sActionApplicablePath, sEntityType) {
			var aExpand = [], sExpand;
			oInterface = oInterface.getInterface(0);
			var oMetaModel = oInterface.getModel();
			var oEntityType = oMetaModel.getODataEntityType(sEntityType);
			// check if expand is needed
			if (sActionApplicablePath) {
				sExpand = sap.suite.ui.generic.template.js.AnnotationHelper._getNavigationPrefix(oMetaModel, oEntityType, sActionApplicablePath);
				if (sExpand) {
					aExpand.push(sExpand);
				}
			}
			if (aExpand.length > 0) {
				// we analyze a facet that is part of the root context
				// set expand to expand data bag
				var oPreprocessorsData = oInterface.getSetting("preprocessorsData");
				if (oPreprocessorsData) {
					var aRootContextExpand = oPreprocessorsData.rootContextExpand || [];
					for (var j = 0; j < aExpand.length; j++) {
						if (aRootContextExpand.indexOf(aExpand[j]) === -1) {
							aRootContextExpand.push(aExpand[j]);
						}
					}
					oPreprocessorsData.rootContextExpand = aRootContextExpand;
				}
			}
		},
		getEntityTypesForFormPersonalization: function (oInterface, oFacet, oEntitySetContext) {
			oInterface = oInterface.getInterface(0);
			var aEntityTypes = [];
			var oMetaModel = oInterface.getModel();
			var oEntitySet = oMetaModel.getODataEntitySet(oEntitySetContext.name || '');
			var aFacets = [];
			if (oFacet.RecordType === "com.sap.vocabularies.UI.v1.CollectionFacet" && oFacet.Facets) {
				aFacets = oFacet.Facets;
			} else if (oFacet.RecordType === "com.sap.vocabularies.UI.v1.ReferenceFacet") {
				aFacets.push(oFacet);
			}
			aFacets.forEach(function (oFacet) {
				var sNavigationProperty;
				if (oFacet.Target && oFacet.Target.AnnotationPath && oFacet.Target.AnnotationPath.indexOf("/") > 0) {
					sNavigationProperty = oFacet.Target.AnnotationPath.split("/")[0];
					var oEntityType = oMetaModel.getODataEntityType(oEntitySet.entityType);
					var oAssociationEnd = oMetaModel.getODataAssociationSetEnd(oEntityType, sNavigationProperty);
					if (oAssociationEnd && oAssociationEnd.entitySet) {
						oEntitySet = oMetaModel.getODataEntitySet(oAssociationEnd.entitySet);
						if (aEntityTypes.indexOf(oEntitySet.entityType.split(".")[1]) === -1) {
							aEntityTypes.push(oEntitySet.entityType.split(".")[1]);
						}
					}
				} else {
					if (aEntityTypes.indexOf(oEntitySetContext.entityType.split(".")[1]) === -1) {
						aEntityTypes.push(oEntitySetContext.entityType.split(".")[1]);
					}
				}
			});
			return aEntityTypes.join(", ");
		},

		formatHeaderTitle: function(oInterface, oDataField) {
			// return Expression Binding for DefaultTitle in createMode
			return "{path: 'ui>/createMode', formatter: '._templateFormatters.formatDefaultObjectTitle'}" ;
		},

		getTextArrangementForSmartControl: function (oInterface, sValue, oEntitySet) {
			oInterface = oInterface.getInterface(0);
			var oMetaModel = oInterface.getModel();
			var oEntityType = oMetaModel.getODataEntityType(oEntitySet.entityType);
			var sTextArrangement = "descriptionAndId";
			if (oEntityType["com.sap.vocabularies.UI.v1.TextArrangement"] && oEntityType["com.sap.vocabularies.UI.v1.TextArrangement"].EnumMember) {
				switch (oEntityType["com.sap.vocabularies.UI.v1.TextArrangement"].EnumMember) {
					case "com.sap.vocabularies.UI.v1.TextArrangementType/TextLast":
						sTextArrangement = "idAndDescription";
						break;
					case "com.sap.vocabularies.UI.v1.TextArrangementType/TextSeparate":
						sTextArrangement = "idOnly";
						break;
					default:
						break;
				}
			}
			return sTextArrangement;
		},

		isDeepFacetHierarchy: function (oFacet) {
			if (oFacet.Facets) {
				for (var i = 0; i < oFacet.Facets.length; i++) {
					if (oFacet.Facets[i].RecordType === "com.sap.vocabularies.UI.v1.CollectionFacet") {
						return true;
					}
				}
			}
			return false;
		},

		doesCollectionFacetOnlyContainForms: function (oFacet) {
			var bReturn = true;
			if (oFacet.Facets) {
				for (var i = 0; i < oFacet.Facets.length; i++) {
					if (oFacet.Facets[i].Target && oFacet.Facets[i].Target.AnnotationPath) {
						if ((oFacet.Facets[i].Target.AnnotationPath.indexOf("com.sap.vocabularies.UI.v1.FieldGroup") < 0)
							&& (oFacet.Facets[i].Target.AnnotationPath.indexOf("com.sap.vocabularies.UI.v1.Identification") < 0) 
							&& (oFacet.Facets[i].Target.AnnotationPath.indexOf("com.sap.vocabularies.UI.v1.DataPoint") < 0)) {
							bReturn = false;
						}
					}
				}
			} else {
				bReturn = false;
			}
			return bReturn;
		},

		doesFieldGroupContainOnlyOneMultiLineDataField: function (oFieldGroup, oFirstDataFieldProperties) {
			if (oFieldGroup.Data.length !== 1) {
				return false;
			}
			if ((oFirstDataFieldProperties['com.sap.vocabularies.UI.v1.MultiLineText'] === undefined)
				|| (oFieldGroup.Data[0].RecordType !== "com.sap.vocabularies.UI.v1.DataField")) {
				return false;
			}
			return true;
		},
		testFormatter: function(value) {
			return "formatted:" + value;
		},
		getFacetID: function(sEntitySet, oFacet) {
			return sEntitySet + "|" + sap.suite.ui.generic.template.js.AnnotationHelper.getStableIdPartFromFacet(oFacet);
		},
		reuseComponentForFacetExists: function(sEntitySet, oFacet, oReuseComponents) {
			var sFacetID = sap.suite.ui.generic.template.js.AnnotationHelper.getFacetID(sEntitySet, oFacet);
			if (oReuseComponents[sFacetID]) {
				return "true";
			} else {
				return "";
			}
		},
		getNameOfReuseComponentForFacet: function(sEntitySet, oFacet, oReuseComponents) {
			var sFacetID = sap.suite.ui.generic.template.js.AnnotationHelper.getFacetID(sEntitySet, oFacet);
			return oReuseComponents[sFacetID].componentName;
		},
		formatComponentSettings: function(oInterface, oEntitySet, oFacet, oReuseComponents) {
			var oThisInterface = oInterface.getInterface(0),
				sFacetID = sap.suite.ui.generic.template.js.AnnotationHelper.getFacetID(oEntitySet.name, oFacet),
				oReuseComponent = oReuseComponents[sFacetID];

			var sNavigationPath = sap.ui.model.odata.AnnotationHelper.getNavigationPath(oThisInterface, oFacet.Target);
			var sNavigationProperty = sNavigationPath.replace("{", "").replace("}", "");
			return sap.suite.ui.generic.template.js.AnnotationHelper.formatComponentSettingsInt(oInterface, oEntitySet, oReuseComponent, sNavigationProperty);
		},
		formatComponentSettingsInt: function(oInterface, oEntitySet, oReuseComponent, sNavigationProperty)	{
			var oThisInterface = oInterface.getInterface(0),
				oMetaModel = oThisInterface.getModel(),
				oEntityType = oMetaModel.getODataEntityType(oEntitySet.entityType);
			sNavigationProperty = sNavigationProperty || oReuseComponent.binding;
			if (sNavigationProperty) {
				// from now on we need to set the entity set to the target
				var oAssociationEnd = oMetaModel.getODataAssociationSetEnd(oEntityType, sNavigationProperty);
				if (oAssociationEnd && oAssociationEnd.entitySet) {
					oEntitySet = oMetaModel.getODataEntitySet(oAssociationEnd.entitySet);
					//fix the type to the target type
					oEntityType = oMetaModel.getODataEntityType(oEntitySet.entityType);
				}
			}
			var sSemanticObject = sap.ui.model.odata.AnnotationHelper.format(oThisInterface, oEntitySet["com.sap.vocabularies.Common.v1.SemanticObject"]);
			var sObjectKeys = "";
			oEntityType.key.propertyRef.forEach(function (key) {
				sObjectKeys += "{" + key.name + "}::";
			});
			sObjectKeys = sObjectKeys.replace(/::$/, "");
			var	settings = {
			        //Bind the UI mode to the component. Three states are allowed (display,edit,create)
					"uiMode": "{= ${ui>/createMode} ? '" +
					    UIMode.Create +
					    "' : ( ${ui>/editable} ? '" + 
					    UIMode.Edit + 
					    "' : '" + 
					    UIMode.Display +
					    "') }",
                    //The semanti cobject is constant for this context
					"semanticObject": sSemanticObject || ""
				};


			if (oReuseComponent) {
				jQuery.extend(settings, oReuseComponent.settings);
				var sValue = JSON.stringify(settings);
				sValue = sValue.replace(/\}/g, "\\}").replace(/\{/g, "\\{"); // check bindingparser.js escape function
				return sValue;
			}
		},
		isListReportTemplate: function(oRouteConfig) {
			if (oRouteConfig) {
				return oRouteConfig.template === "sap.suite.ui.generic.template.ListReport";
			}
		},
		
		getStableIdPartForDatafieldActionButton: function(oDatafield, oFacet) {
			var sStableId = "";
			var sDatafieldStableId = "";
			var sFacetStableId = "";
			if (oFacet) {
				sFacetStableId = sap.suite.ui.generic.template.js.AnnotationHelper.getStableIdPartFromFacet(oFacet);
			}
			if (oDatafield) {
				sDatafieldStableId = sap.suite.ui.generic.template.js.AnnotationHelper.getStableIdPartFromDataField(oDatafield);
			}
			sStableId = (sFacetStableId !== "" ? sFacetStableId + "::" : "") + "action::" + sDatafieldStableId;
			return sStableId;
		}
	};
	sap.suite.ui.generic.template.js.AnnotationHelper.formatComponentSettingsInt.requiresIContext = true;
	sap.suite.ui.generic.template.js.AnnotationHelper.formatComponentSettings.requiresIContext = true;
	sap.suite.ui.generic.template.js.AnnotationHelper.getRepeatIndex.requiresIContext = true;
	sap.suite.ui.generic.template.js.AnnotationHelper.formatWithExpand.requiresIContext = true;
	sap.suite.ui.generic.template.js.AnnotationHelper.formatWithExpandSimple.requiresIContext = true;
	sap.suite.ui.generic.template.js.AnnotationHelper.getNavigationPathWithExpand.requiresIContext = true;
	sap.suite.ui.generic.template.js.AnnotationHelper.getEntityTypesForFormPersonalization.requiresIContext = true;
	sap.suite.ui.generic.template.js.AnnotationHelper.actionControlHeader.requiresIContext = true;
	sap.suite.ui.generic.template.js.AnnotationHelper.actionControlFooter.requiresIContext = true;
	sap.suite.ui.generic.template.js.AnnotationHelper.formatHeaderTitle.requiresIContext = true;
	sap.suite.ui.generic.template.js.AnnotationHelper.getTextArrangementForSmartControl.requiresIContext = true;
	sap.suite.ui.generic.template.js.AnnotationHelper.matchesBreadCrumb.requiresIContext = true;
	sap.suite.ui.generic.template.js.AnnotationHelper.hasBreadCrumbs.requiresIContext = true;
	sap.suite.ui.generic.template.js.AnnotationHelper.createP13N.requiresIContext = true;
	sap.suite.ui.generic.template.js.AnnotationHelper.createP13NColumnForIndicator.requiresIContext = true;
	sap.suite.ui.generic.template.js.AnnotationHelper.createP13NColumnForAction.requiresIContext = true;
})();