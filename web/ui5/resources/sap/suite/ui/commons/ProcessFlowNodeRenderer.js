/*
 * 
		SAP UI development toolkit for HTML5 (SAPUI5)
		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(['jquery.sap.global','./library','sap/ui/Device'],function(q,l,D){"use strict";var P={};P._constants={top:"top",right:"right",bottom:"bottom",left:"left",corner:"corner"};P._nodeLevels={iLevel0:0,iLevel1:1,iLevel2:2,iLevel3:3};P.render=function(r,c){var f=null;var C=c._getCurrentZoomLevelContent();if(c._getFoldedCorner()){f=c._getFoldedCornerControl();}var h=c._getHeaderControl();var i=c._getIconControl();var s=c._getStateTextControl();var t=c._createText1Control();var T=c._createText2Control();r.write("<div");r.writeControlData(c);if(C){r.addClass("sapSuiteUiCommonsProcessFlowNodeCustom");}P._assignNodeClasses(r,c,0);r.write(">");switch(c._getDisplayState()){case l.ProcessFlowDisplayState.Highlighted:case l.ProcessFlowDisplayState.HighlightedFocused:case l.ProcessFlowDisplayState.SelectedHighlighted:case l.ProcessFlowDisplayState.SelectedHighlightedFocused:r.write("<div");P._assignShadowClasses(r,c,"top");r.write("></div>");r.write("<div");P._assignShadowClasses(r,c,"right");r.write("></div>");r.write("<div");P._assignShadowClasses(r,c,"bottom");r.write("></div>");r.write("<div");P._assignShadowClasses(r,c,"left");r.write("></div>");if(c._getFoldedCorner()){r.write("<div");P._assignShadowClasses(r,c,"corner");r.write("></div>");}break;default:}r.write("<div");P._assignNodeClasses(r,c,1);r.write(">");if(c._getFoldedCorner()){r.renderControl(f);}r.write("</div>");r.write("<div");P._assignNodeClasses(r,c,2);r.write(">");r.write("</div>");r.write("<div");P._assignNodeClasses(r,c,3);r.write(">");if(C){r.write("<div");r.addClass("sapSuiteUiCommonsProcessFlowNode3ContentPadding");r.writeClasses();r.write(">");r.renderControl(C);r.write("</div>");}else{r.write("<div");P._assignNodeTitleClasses(r,c);r.write(">");r.renderControl(h);r.write("</div>");r.write("<div");P._assignNodeStateClasses(r,c);r.write(">");r.write("<div");P._assignNodeIconClasses(r,c);r.write(">");r.renderControl(i);r.write("</div>");r.write("<div");P._assignNodeStateTextClasses(r,c);r.write(">");r.renderControl(s);r.write("</div>");r.write("</div>");r.write("<div");P._assignNodeText1Classes(r,c);r.write(">");r.renderControl(t);r.write("</div>");r.write("<div");P._assignNodeText2Classes(r,c);r.write(">");r.renderControl(T);r.write("</div>");r.write("</div>");}r.write("</div>");};P._assignNodeClasses=function(r,c,n){switch(n){case P._nodeLevels.iLevel0:break;case P._nodeLevels.iLevel1:r.writeAttribute("id",c.getId()+"-corner-container");break;case P._nodeLevels.iLevel2:r.writeAttribute("id",c.getId()+"-top-container");break;case P._nodeLevels.iLevel3:r.writeAttribute("id",c.getId()+"-content-container");break;default:}if(n>P._nodeLevels.iLevel0){switch(c.getState()){case l.ProcessFlowNodeState.Planned:if((n===P._nodeLevels.iLevel1)&&(c._getFoldedCorner())){r.addClass("sapSuiteUiCommonsProcessFlowFoldedCornerPlanned");}else{r.addClass("sapSuiteUiCommonsProcessFlowNodeStatePlanned");r.addClass("sapSuiteUiCommonsProcessFlowNodeStatePlannedDashedBorder");}break;case l.ProcessFlowNodeState.PlannedNegative:if((n===P._nodeLevels.iLevel1)&&(c._getFoldedCorner())){r.addClass("sapSuiteUiCommonsProcessFlowFoldedCornerPlanned");}else{r.addClass("sapSuiteUiCommonsProcessFlowNodeStatePlanned");r.addClass("sapSuiteUiCommonsProcessFlowNodeStatePlannedDashedBorder");}break;default:}if(c._getNavigationFocus()){r.addClass("sapSuiteUiCommonsProcessFlowFoldedCornerDisplayStateNavigation");}switch(c._getDisplayState()){case l.ProcessFlowDisplayState.RegularFocused:case l.ProcessFlowDisplayState.HighlightedFocused:case l.ProcessFlowDisplayState.DimmedFocused:case l.ProcessFlowDisplayState.SelectedHighlightedFocused:case l.ProcessFlowDisplayState.SelectedFocused:if((n===P._nodeLevels.iLevel1)&&(c._getFoldedCorner())){r.addClass("sapSuiteUiCommonsProcessFlowFoldedCornerDisplayStateFocused");}else{r.addClass("sapSuiteUiCommonsProcessFlowNodeDisplayStateFocused");}break;default:}switch(c._getDisplayState()){case l.ProcessFlowDisplayState.Regular:case l.ProcessFlowDisplayState.RegularFocused:case l.ProcessFlowDisplayState.Selected:if((n===P._nodeLevels.iLevel1)&&(c._getFoldedCorner())){r.addClass("sapSuiteUiCommonsProcessFlowFoldedCornerDisplayStateRegular");}else{r.addClass("sapSuiteUiCommonsProcessFlowNodeDisplayStateRegular");}break;case l.ProcessFlowDisplayState.Highlighted:case l.ProcessFlowDisplayState.HighlightedFocused:case l.ProcessFlowDisplayState.SelectedHighlighted:case l.ProcessFlowDisplayState.SelectedHighlightedFocused:if(n===P._nodeLevels.iLevel1&&c._getFoldedCorner()){r.addClass("sapSuiteUiCommonsProcessFlowFoldedCornerDisplayStateHighlighted");}else{r.addClass("sapSuiteUiCommonsProcessFlowNodeDisplayStateHighlighted");}break;case l.ProcessFlowDisplayState.Dimmed:case l.ProcessFlowDisplayState.DimmedFocused:if(n===P._nodeLevels.iLevel1&&c._getFoldedCorner()){r.addClass("sapSuiteUiCommonsProcessFlowFoldedCornerDisplayStateDimmed");}else{r.addClass("sapSuiteUiCommonsProcessFlowNodeDisplayStateDimmed");}break;default:}}if(n===P._nodeLevels.iLevel0){if(c._getNavigationFocus()){r.addClass("sapSuiteUiCommonsProcessFlowFoldedCornerDisplayStateNavigation");}if(c._getDisplayState()===l.ProcessFlowDisplayState.Highlighted){r.addClass("sapSuiteUiCommonsProcessFlowNodeDisplayStateHighlighted");}if(c.getType()===l.ProcessFlowNodeType.Aggregated){P._assignAggregatedNodeClasses(r,c);}}switch(c._getZoomLevel()){case l.ProcessFlowZoomLevel.One:r.addClass(q.sap.encodeHTML("sapSuiteUiCommonsProcessFlowNode"+n+"ZoomLevel1"));break;case l.ProcessFlowZoomLevel.Two:r.addClass(q.sap.encodeHTML("sapSuiteUiCommonsProcessFlowNode"+n+"ZoomLevel2"));break;case l.ProcessFlowZoomLevel.Three:r.addClass(q.sap.encodeHTML("sapSuiteUiCommonsProcessFlowNode"+n+"ZoomLevel3"));break;case l.ProcessFlowZoomLevel.Four:r.addClass(q.sap.encodeHTML("sapSuiteUiCommonsProcessFlowNode"+n+"ZoomLevel4"));break;default:}if(n===P._nodeLevels.iLevel1){if(c._getFoldedCorner()){r.addClass("sapSuiteUiCommonsProcessFlowNode1FoldedBorderStyle");}else{r.addClass("sapSuiteUiCommonsProcessFlowNode1BorderStyle");r.addClass("sapSuiteUiCommonsProcessFlowNodeBorderStandard");}}else if(n>P._nodeLevels.iLevel1){r.addClass(q.sap.encodeHTML("sapSuiteUiCommonsProcessFlowNode"+n+"BorderStyle"));r.addClass("sapSuiteUiCommonsProcessFlowNodeBorderStandard");}if(((n===P._nodeLevels.iLevel1)&&(c._getFoldedCorner()))){r.addClass("sapSuiteUiCommonsProcessFlowFoldedCornerNode1");}else{r.addClass(q.sap.encodeHTML("sapSuiteUiCommonsProcessFlowNode"+n));}if(((n===P._nodeLevels.iLevel0)&&(c._getFoldedCorner()))){r.addClass("sapSuiteUiCommonsProcessFlowFoldedCornerIndication");}r.writeClasses();};P._assignAggregatedNodeClasses=function(r,c){switch(c._getDisplayState()){case l.ProcessFlowDisplayState.Highlighted:case l.ProcessFlowDisplayState.Regular:case l.ProcessFlowDisplayState.Selected:if(c._getZoomLevel()===l.ProcessFlowZoomLevel.Four){r.addClass("sapSuiteUiCommonsProcessFlowNodeAggregatedZoomLevel4");}else{r.addClass("sapSuiteUiCommonsProcessFlowNodeAggregated");}break;case l.ProcessFlowDisplayState.Dimmed:if(c._getZoomLevel()===l.ProcessFlowZoomLevel.Four){r.addClass("sapSuiteUiCommonsProcessFlowNodeAggregatedDimmedZoomLevel4");}else{r.addClass("sapSuiteUiCommonsProcessFlowNodeAggregatedDimmed");}break;default:if(c._getZoomLevel()===l.ProcessFlowZoomLevel.Four){r.addClass("sapSuiteUiCommonsProcessFlowNodeAggregatedFocusedZoomLevel4");}else{r.addClass("sapSuiteUiCommonsProcessFlowNodeAggregatedFocused");}break;}};P._assignShadowClasses=function(r,c,b){r.addClass("sapSuiteUiCommonsShadowedDivCommon");switch(b){case P._constants.top:if(c._getFoldedCorner()){r.addClass("sapSuiteUiCommonsShadowedDivFoldedCornerBorderTop");}else{r.addClass("sapSuiteUiCommonsShadowedDivBorderTop");}break;case P._constants.right:r.addClass("sapSuiteUiCommonsShadowedDivBorderRight");break;case P._constants.bottom:r.addClass("sapSuiteUiCommonsShadowedDivBorderBottom");break;case P._constants.left:if(c._getFoldedCorner()){r.addClass("sapSuiteUiCommonsShadowedDivFoldedCornerBorderLeft");}else{r.addClass("sapSuiteUiCommonsShadowedDivBorderLeft");}break;case P._constants.corner:if(D.browser.safari){r.addClass("sapSuiteUiCommonsShadowedDivFoldedCornerSafari");}else{r.addClass("sapSuiteUiCommonsShadowedDivFoldedCorner");}break;default:}r.writeClasses();};P._assignNodeTitleClasses=function(r,c){r.writeAttribute("id",c.getId()+"-title");switch(c._getZoomLevel()){case l.ProcessFlowZoomLevel.One:r.addClass("sapSuiteUiCommonsProcessFlowNode3TitleZoomLevel1");break;case l.ProcessFlowZoomLevel.Two:r.addClass("sapSuiteUiCommonsProcessFlowNode3TitleZoomLevel2");break;case l.ProcessFlowZoomLevel.Three:r.addClass("sapSuiteUiCommonsProcessFlowNode3TitleZoomLevel3");break;case l.ProcessFlowZoomLevel.Four:r.addClass("sapSuiteUiCommonsProcessFlowNode3TitleZoomLevel4");break;default:}r.addClass("sapSuiteUiCommonsProcessFlowNode3Title");r.writeClasses();};P._assignNodeStateClasses=function(r,c){r.writeAttribute("id",c.getId()+"-state");switch(c._getZoomLevel()){case l.ProcessFlowZoomLevel.One:r.addClass("sapSuiteUiCommonsProcessFlowNode3StateZoomLevel1");break;case l.ProcessFlowZoomLevel.Two:r.addClass("sapSuiteUiCommonsProcessFlowNode3StateZoomLevel2");break;case l.ProcessFlowZoomLevel.Three:r.addClass("sapSuiteUiCommonsProcessFlowNode3StateZoomLevel3");break;case l.ProcessFlowZoomLevel.Four:r.addClass("sapSuiteUiCommonsProcessFlowNode3StateZoomLevel4");break;default:}r.addClass("sapSuiteUiCommonsProcessFlowNode3State");r.writeClasses();};P._assignNodeIconClasses=function(r,c){r.writeAttribute("id",c.getId()+"-icon-container");switch(c.getState()){case l.ProcessFlowNodeState.Positive:r.addClass("sapSuiteUiCommonsProcessFlowNodeStatePositive");break;case l.ProcessFlowNodeState.Negative:r.addClass("sapSuiteUiCommonsProcessFlowNodeStateNegative");break;case l.ProcessFlowNodeState.Planned:r.addClass("sapSuiteUiCommonsProcessFlowNodeStatePlanned");break;case l.ProcessFlowNodeState.Neutral:r.addClass("sapSuiteUiCommonsProcessFlowNodeStateNeutral");break;case l.ProcessFlowNodeState.PlannedNegative:r.addClass("sapSuiteUiCommonsProcessFlowNodeStateNegative");break;case l.ProcessFlowNodeState.Critical:r.addClass("sapSuiteUiCommonsProcessFlowNodeStateCritical");break;default:}switch(c._getZoomLevel()){case l.ProcessFlowZoomLevel.One:r.addClass("sapSuiteUiCommonsProcessFlowNode3StateIconZoomLevel1");break;case l.ProcessFlowZoomLevel.Two:r.addClass("sapSuiteUiCommonsProcessFlowNode3StateIconZoomLevel2");break;case l.ProcessFlowZoomLevel.Three:r.addClass("sapSuiteUiCommonsProcessFlowNode3StateIconZoomLevel3");break;case l.ProcessFlowZoomLevel.Four:r.addClass("sapSuiteUiCommonsProcessFlowNode3StateIconZoomLevel4");break;default:}r.addClass("sapSuiteUiCommonsProcessFlowNode3StateIcon");r.writeClasses();};P._assignNodeStateTextClasses=function(r,c){r.writeAttribute("id",c.getId()+"-state-text");switch(c.getState()){case l.ProcessFlowNodeState.Positive:r.addClass("sapSuiteUiCommonsProcessFlowNodeStatePositive");break;case l.ProcessFlowNodeState.Negative:r.addClass("sapSuiteUiCommonsProcessFlowNodeStateNegative");break;case l.ProcessFlowNodeState.Planned:r.addClass("sapSuiteUiCommonsProcessFlowNodeStatePlanned");break;case l.ProcessFlowNodeState.Neutral:r.addClass("sapSuiteUiCommonsProcessFlowNodeStateNeutral");break;case l.ProcessFlowNodeState.PlannedNegative:r.addClass("sapSuiteUiCommonsProcessFlowNodeStateNegative");break;case l.ProcessFlowNodeState.Critical:r.addClass("sapSuiteUiCommonsProcessFlowNodeStateCritical");break;default:}switch(c._getZoomLevel()){case l.ProcessFlowZoomLevel.One:r.addClass("sapSuiteUiCommonsProcessFlowNode3StateTextZoomLevel1");break;case l.ProcessFlowZoomLevel.Two:r.addClass("sapSuiteUiCommonsProcessFlowNode3StateTextZoomLevel2");break;case l.ProcessFlowZoomLevel.Three:r.addClass("sapSuiteUiCommonsProcessFlowNode3StateTextZoomLevel3");break;case l.ProcessFlowZoomLevel.Four:r.addClass("sapSuiteUiCommonsProcessFlowNode3StateTextZoomLevel4");break;default:}r.addClass("sapSuiteUiCommonsProcessFlowNode3StateText");r.writeClasses();};P._assignNodeText1Classes=function(r,c){r.writeAttribute("id",c.getId()+"-text1");switch(c._getZoomLevel()){case l.ProcessFlowZoomLevel.One:r.addClass("sapSuiteUiCommonsProcessFlowNode3TextWithGapZoomLevel1");r.addClass("sapSuiteUiCommonsProcessFlowNode3TextZoomLevel1");break;case l.ProcessFlowZoomLevel.Two:r.addClass("sapSuiteUiCommonsProcessFlowNode3TextWithGapZoomLevel2");r.addClass("sapSuiteUiCommonsProcessFlowNode3TextZoomLevel2");break;case l.ProcessFlowZoomLevel.Three:r.addClass("sapSuiteUiCommonsProcessFlowNode3TextZoomLevel3");break;case l.ProcessFlowZoomLevel.Four:r.addClass("sapSuiteUiCommonsProcessFlowNode3TextZoomLevel4");break;default:}r.addClass("sapSuiteUiCommonsProcessFlowNode3Text");r.writeClasses();};P._assignNodeText2Classes=function(r,c){r.writeAttribute("id",c.getId()+"-text2");switch(c._getZoomLevel()){case l.ProcessFlowZoomLevel.One:r.addClass("sapSuiteUiCommonsProcessFlowNode3TextZoomLevel1");break;case l.ProcessFlowZoomLevel.Two:r.addClass("sapSuiteUiCommonsProcessFlowNode3TextZoomLevel2");break;case l.ProcessFlowZoomLevel.Three:r.addClass("sapSuiteUiCommonsProcessFlowNode3TextZoomLevel3");break;case l.ProcessFlowZoomLevel.Four:r.addClass("sapSuiteUiCommonsProcessFlowNode3TextZoomLevel4");break;default:}r.addClass("sapSuiteUiCommonsProcessFlowNode3Text");r.writeClasses();};return P;},true);
