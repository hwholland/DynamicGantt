/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/base/ManagedObjectObserver","sap/m/Toolbar","sap/m/ToolbarSeparator","sap/m/OverflowToolbar","sap/m/Button","./DynamicPageTitleRenderer"],function(l,C,M,T,a,O,B,D){"use strict";var b=l.DynamicPageTitleArea;var c=sap.ui.getCore();var d=C.extend("sap.f.DynamicPageTitle",{metadata:{library:"sap.f",properties:{primaryArea:{type:"sap.f.DynamicPageTitleArea",group:"Appearance",defaultValue:b.Begin},areaShrinkRatio:{type:"sap.f.DynamicPageTitleShrinkRatio",group:"Appearance",defaultValue:"1:1.6:1.6"}},aggregations:{heading:{type:"sap.ui.core.Control",multiple:false,defaultValue:null},snappedHeading:{type:"sap.ui.core.Control",multiple:false,defaultValue:null},expandedHeading:{type:"sap.ui.core.Control",multiple:false,defaultValue:null},actions:{type:"sap.ui.core.Control",multiple:true,singularName:"action"},navigationActions:{type:"sap.m.Button",multiple:true,singularName:"navigationAction"},content:{type:"sap.ui.core.Control",multiple:true},snappedContent:{type:"sap.ui.core.Control",multiple:true},expandedContent:{type:"sap.ui.core.Control",multiple:true},breadcrumbs:{type:"sap.m.IBreadcrumbs",multiple:false},_actionsToolbar:{type:"sap.m.OverflowToolbar",multiple:false,visibility:"hidden"},_navActionsToolbar:{type:"sap.m.Toolbar",multiple:false,visibility:"hidden"},_navActionsToolbarSeparator:{type:"sap.m.ToolbarSeparator",multiple:false,visibility:"hidden"},_expandButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"}},events:{stateChange:{parameters:{isExpanded:{type:"boolean"}}}},designtime:"sap/f/designtime/DynamicPageTitle.designtime"}});function e(o){if(arguments.length===1){return o&&("length"in o)?o.length>0:!!o;}return Array.prototype.slice.call(arguments).every(function(f){return e(f);});}d.NAV_ACTIONS_PLACEMENT_BREAK_POINT=1280;d.PRIMARY_AREA_MIDDLE_SHRINK_FACTORS={headingAreaShrinkFactor:1.6,contentAreaShrinkFactor:1,actionsAreaShrinkFactor:1.6};d._renderControl=function(o,f){var r;if(!f||!o){return;}r=c.createRenderManager();r.renderControl(f);r.flush(o);r.destroy();};function i(o){return typeof o==="function";}d.prototype.init=function(){this._bExpandedState=true;this._bShowExpandButton=false;this._bIsFocusable=true;this._fnActionSubstituteParentFunction=function(){return this;}.bind(this);this._bNavigationActionsInTopArea=false;this._oRB=c.getLibraryResourceBundle("sap.f");this._oObserver=new M(d.prototype._observeChanges.bind(this));this._oObserver.observe(this,{aggregations:["content","_actionsToolbar"]});this._oRB=sap.ui.getCore().getLibraryResourceBundle("sap.f");};d.prototype.onBeforeRendering=function(){this._getActionsToolbar();this._observeControl(this.getBreadcrumbs());};d.prototype.onAfterRendering=function(){this._cacheDomElements();this._toggleState(this._bExpandedState);this._doNavigationActionsLayout();};d.prototype.exit=function(){if(this._oObserver){this._oObserver.disconnect();this._oObserver=null;}};d.prototype.setPrimaryArea=function(A){var s=this.getAreaShrinkRatio(),S=this._getShrinkFactorsObject(),f=this.getMetadata().getProperty("areaShrinkRatio").getDefaultValue();if(!this.getDomRef()){return this.setProperty("primaryArea",A,true);}if(s!==f){return this.setProperty("primaryArea",A,true);}if(A===b.Begin){this._setShrinkFactors(S.headingAreaShrinkFactor,S.contentAreaShrinkFactor,S.actionsAreaShrinkFactor);}else{this._setShrinkFactors(d.PRIMARY_AREA_MIDDLE_SHRINK_FACTORS.headingAreaShrinkFactor,d.PRIMARY_AREA_MIDDLE_SHRINK_FACTORS.contentAreaShrinkFactor,d.PRIMARY_AREA_MIDDLE_SHRINK_FACTORS.actionsAreaShrinkFactor);}return this.setProperty("primaryArea",A,true);};d.prototype.setAreaShrinkRatio=function(A){A=this.validateProperty("areaShrinkRatio",A);this.setProperty("areaShrinkRatio",A,true);var s=this._getShrinkFactorsObject();if(this.getPrimaryArea()===b.Middle){jQuery.sap.log.warning("DynamicPageTitle :: Property primaryArea is disregarded when areaShrinkRatio is set.",this);}if(s.headingAreaShrinkFactor>1&&s.contentAreaShrinkFactor>1&&s.actionsAreaShrinkFactor>1){jQuery.sap.log.warning("DynamicPageTitle :: One of the shrink factors should be set to 1.",this);}this._setShrinkFactors(s.headingAreaShrinkFactor,s.contentAreaShrinkFactor,s.actionsAreaShrinkFactor);return this;};d.prototype.ontap=function(E){var s=E.srcControl;if(s===this||s===this.getAggregation("_actionsToolbar")||s===this.getAggregation("breadcrumbs")){this.fireEvent("_titlePress");}};d.prototype.onmouseover=function(){this.fireEvent("_titleMouseOver");};d.prototype.onmouseout=function(){this.fireEvent("_titleMouseOut");};d.prototype.onsapspace=function(E){this.onsapenter(E);};d.prototype.onsapenter=function(E){if(E.srcControl===this){this.fireEvent("_titlePress");}};["addAction","insertAction","removeAction","indexOfAction","removeAllActions","destroyActions","getActions"].forEach(function(m){d.prototype[m]=function(o){var t=this._getActionsToolbar(),s=m.replace(/Actions?/,"Content"),S=true,r;if(m==="addAction"||m==="insertAction"){t[s].apply(t,arguments);this._preProcessAction(o,"actions");r=this;}else if(m==="removeAction"){this._postProcessAction(o);}else if(m==="removeAllActions"){this.getActions().forEach(this._postProcessAction,this);}else if(m==="destroyActions"){this.getActions().forEach(this._postProcessAction,this);t[s].apply(t,arguments);r=this;}else if(m==="getActions"){S=false;}r=r||t[s].apply(t,arguments);S&&this._updateSeparatorVisibility();return r;};});["addNavigationAction","insertNavigationAction","removeNavigationAction","indexOfNavigationAction","removeAllNavigationActions","destroyNavigationActions","getNavigationActions"].forEach(function(m){d.prototype[m]=function(o){var t=this._getNavigationActionsToolbar(),s=m.replace(/NavigationActions?/,"Content"),f=true,r;if(m==="addNavigationAction"||m==="insertNavigationAction"){t[s].apply(t,arguments);this._preProcessAction(o,"navigationActions");r=this;}else if(m==="removeNavigationAction"){this._postProcessAction(o);}else if(m==="removeAllNavigationActions"){this.getNavigationActions().forEach(this._postProcessAction,this);}else if(m==="destroyNavigationActions"){this.getNavigationActions().forEach(this._postProcessAction,this);t[s].apply(t,arguments);r=this;}else if(m==="getNavigationActions"){f=false;}r=r||t[s].apply(t,arguments);f&&this._updateTopAreaVisibility();return r;};});d.prototype._cacheDomElements=function(){this.$topNavigationActionsArea=this.$("topNavigationArea");this.$mainNavigationActionsArea=this.$("mainNavigationArea");this.$beginArea=this.$("left-inner");this.$middleArea=this.$("content");this.$snappedHeadingWrapper=this.$("snapped-heading-wrapper");this.$expandHeadingWrapper=this.$("expand-heading-wrapper");this.$snappedWrapper=this.$("snapped-wrapper");this.$expandWrapper=this.$("expand-wrapper");};d.prototype._getActionsToolbar=function(){if(!this.getAggregation("_actionsToolbar")){this.setAggregation("_actionsToolbar",new O({id:this.getId()+"-_actionsToolbar"}).addStyleClass("sapFDynamicPageTitleActionsBar"),true);}return this.getAggregation("_actionsToolbar");};d.prototype._getNavigationActionsToolbar=function(){if(!this.getAggregation("_navActionsToolbar")){this.setAggregation("_navActionsToolbar",new T({id:this.getId()+"-navActionsToolbar"}).addStyleClass("sapFDynamicPageTitleActionsBar"),true);}return this.getAggregation("_navActionsToolbar");};d.prototype._getToolbarSeparator=function(){if(!this.getAggregation("_navActionsToolbarSeparator")){this.setAggregation("_navActionsToolbarSeparator",new a({id:this.getId()+"-separator"}),true);}return this.getAggregation("_navActionsToolbarSeparator");};d.prototype._toggleFocusableState=function(f){var $=this.$();this._bIsFocusable=f;f?$.attr("tabindex",0):$.removeAttr("tabindex");};d.prototype._preProcessAction=function(A,p){if(i(A._fnOriginalGetParent)){return;}this._observeControl(A);A._fnOriginalGetParent=A.getParent;A.getParent=this._fnActionSubstituteParentFunction;A._sOriginalParentAggregationName=A.sParentAggregationName;A.sParentAggregationName=p;};d.prototype._postProcessAction=function(A){if(!i(A._fnOriginalGetParent)){return;}this._unobserveControl(A);A.getParent=A._fnOriginalGetParent;A._fnOriginalGetParent=null;A.sParentAggregationName=A._sOriginalParentAggregationName;A._sOriginalParentAggregationName=null;};d.prototype._observeControl=function(o){this._oObserver.observe(o,{properties:["visible"]});};d.prototype._unobserveControl=function(o){this._oObserver.unobserve(o,{properties:["visible"]});};d.prototype._doNavigationActionsLayout=function(){var r,n,N;if(this.getNavigationActions().length===0){return;}N=this._getNavigationActionsToolbar();r=this._shouldRenderNavigationActionsInTopArea();if(r){n=this.$topNavigationActionsArea[0];}else{n=this.$mainNavigationActionsArea[0];}this._bNavigationActionsInTopArea=r;d._renderControl(n,N);this._updateSeparatorVisibility();};d.prototype._updateTopAreaVisibility=function(f){var n=this._areNavigationActionsInTopArea(),N=this._shouldRenderNavigationActionsInTopArea(f),h=this.getBreadcrumbs()&&this.getBreadcrumbs().getVisible(),s=h||N,S=this.getNavigationActions().length>0&&(N^n);this._toggleTopAreaVisibility(s);if(S){this._toggleNavigationActionsPlacement(N);}else{this._updateSeparatorVisibility();}};d.prototype._onResize=function(f){this._updateTopAreaVisibility(f);};d.prototype._toggleNavigationActionsPlacement=function(s){this["_showNavigationActionsIn"+(s?"Top":"Main")+"Area"]();this._updateSeparatorVisibility();};d.prototype._showNavigationActionsInTopArea=function(){var n=this._getNavigationActionsToolbar();if(this.$topNavigationActionsArea&&this.$topNavigationActionsArea.length>0){this.$topNavigationActionsArea.html(n.$());}this._bNavigationActionsInTopArea=true;};d.prototype._showNavigationActionsInMainArea=function(){var n=this._getNavigationActionsToolbar();if(this.$mainNavigationActionsArea&&this.$mainNavigationActionsArea.length>0){this.$mainNavigationActionsArea.html(n.$());}this._bNavigationActionsInTopArea=false;};d.prototype._areNavigationActionsInTopArea=function(){return this._bNavigationActionsInTopArea;};d.prototype._updateSeparatorVisibility=function(){if(this.getDomRef()){this._getToolbarSeparator().toggleStyleClass("sapUiHidden",!this._shouldShowSeparator());}};d.prototype._toggleTopAreaVisibility=function(s){if(this.getDomRef()){this.$("top").toggleClass("sapUiHidden",!s);}};d.prototype._shouldShowSeparator=function(){var h,H;if(this._bNavigationActionsInTopArea){return false;}h=this._getVisibleActions().length>0;H=this._getVisibleNavigationActions().length>0;return h&&H;};d.prototype._getVisibleActions=function(){return this.getActions().filter(function(A){return A.getVisible();});};d.prototype._getVisibleNavigationActions=function(){return this.getNavigationActions().filter(function(A){return A.getVisible();});};d.prototype._setShrinkFactors=function(h,f,A){this.$("left-inner").css("flex-shrink",h);this.$("content").css("flex-shrink",f);this.$("mainActions").css("flex-shrink",A);};d.prototype._shouldRenderNavigationActionsInTopArea=function(f){var w,h,H;if(this.getNavigationActions().length===0){return false;}w=f?f:this._getWidth();h=this._getVisibleActions().length>0;H=this.getBreadcrumbs()&&this.getBreadcrumbs().getVisible();return w<d.NAV_ACTIONS_PLACEMENT_BREAK_POINT&&(H||h);};d.prototype._toggleState=function(E,u){var o=this._bExpandedState;this._bExpandedState=E;if(e(this.getSnappedContent())){this.$snappedWrapper.toggleClass("sapUiHidden",E);this.$snappedWrapper.parent().toggleClass("sapFDynamicPageTitleMainSnapContentVisible",!E);}if(e(this.getSnappedHeading())){this.$snappedHeadingWrapper.toggleClass("sapUiHidden",E);}if(e(this.getExpandedContent())){this.$expandWrapper.toggleClass("sapUiHidden",!E);this.$expandWrapper.parent().toggleClass("sapFDynamicPageTitleMainExpandContentVisible",E);}if(e(this.getExpandedHeading())){this.$expandHeadingWrapper.toggleClass("sapUiHidden",!E);}if(u&&o!==E){this.fireEvent("stateChange",{isExpanded:E});}};d.prototype._getExpandButton=function(){if(!this.getAggregation("_expandButton")){var E=new B({id:this.getId()+"-expandBtn",icon:"sap-icon://slim-arrow-down",press:this._onExpandButtonPress.bind(this),tooltip:this._oRB.getText("EXPAND_HEADER_BUTTON_TOOLTIP")}).addStyleClass("sapFDynamicPageToggleHeaderIndicator sapUiHidden");this.setAggregation("_expandButton",E,true);}return this.getAggregation("_expandButton");};d.prototype._onExpandButtonPress=function(){this.fireEvent("_titleVisualIndicatorPress");};d.prototype._toggleExpandButton=function(t){this._setShowExpandButton(t);this._getExpandButton().$().toggleClass("sapUiHidden",!t);};d.prototype._getShowExpandButton=function(){return this._bShowExpandButton;};d.prototype._setShowExpandButton=function(v){this._bShowExpandButton=!!v;};d.prototype._focusExpandButton=function(){this._getExpandButton().$().focus();};d.prototype._getWidth=function(){return this.$().outerWidth();};d.prototype._getState=function(){var h=this.getActions().length>0,H=this.getNavigationActions().length>0,f=this.getContent(),s=this.getSnappedContent(),E=this.getExpandedContent(),g=E.length>0,j=s.length>0,S=this._getShrinkFactorsObject(),o=this._getExpandButton(),k=this.getBreadcrumbs(),m=k||H,n=!!(k&&!H),p=H&&!k,A=this.getMetadata().getProperty("areaShrinkRatio").getDefaultValue();if(this.getAreaShrinkRatio()===A&&this.getPrimaryArea()===b.Middle){S.headingAreaShrinkFactor=d.PRIMARY_AREA_MIDDLE_SHRINK_FACTORS.headingAreaShrinkFactor;S.contentAreaShrinkFactor=d.PRIMARY_AREA_MIDDLE_SHRINK_FACTORS.contentAreaShrinkFactor;S.actionsAreaShrinkFactor=d.PRIMARY_AREA_MIDDLE_SHRINK_FACTORS.actionsAreaShrinkFactor;}o.toggleStyleClass("sapUiHidden",!this._getShowExpandButton());return{id:this.getId(),actionBar:this._getActionsToolbar(),navigationBar:this._getNavigationActionsToolbar(),hasActions:h,hasNavigationActions:H,content:f,hasContent:f.length>0,heading:this.getHeading(),snappedHeading:this.getSnappedHeading(),expandedHeading:this.getExpandedHeading(),expandButton:o,snappedContent:s,expandedContent:E,hasSnappedContent:j,hasExpandedContent:g,hasAdditionalContent:g||j,isSnapped:!this._bExpandedState,headingAreaShrinkFactor:S.headingAreaShrinkFactor,contentAreaShrinkFactor:S.contentAreaShrinkFactor,actionsAreaShrinkFactor:S.actionsAreaShrinkFactor,ariaText:this._oRB.getText("TOGGLE_HEADER"),breadcrumbs:this.getBreadcrumbs(),separator:this._getToolbarSeparator(),hasTopContent:m,hasOnlyBreadcrumbs:n,hasOnlyNavigationActions:p,contentAreaFlexBasis:this._sContentAreaFlexBasis,actionsAreaFlexBasis:this._sActionsAreaFlexBasis,isFocusable:this._bIsFocusable};};d.prototype._getShrinkFactorsObject=function(){var r={},A=this.getAreaShrinkRatio().split(":");r.headingAreaShrinkFactor=parseFloat(A[0]);r.contentAreaShrinkFactor=parseFloat(A[1]);r.actionsAreaShrinkFactor=parseFloat(A[2]);return r;};d.prototype._observeChanges=function(o){var f=o.object,s=o.name;if(f===this){if(s==="content"||s==="_actionsToolbar"){this._observeContentChanges(o);}}else if(s==="visible"){this._updateTopAreaVisibility();}};d.prototype._observeContentChanges=function(o){var f=o.child,m=o.mutation;if(!(f instanceof O)){return;}if(m==="insert"){f.attachEvent("_contentSizeChange",this._onContentSizeChange,this);}else if(m==="remove"){f.detachEvent("_contentSizeChange",this._onContentSizeChange,this);this._setContentAreaFlexBasis(0,f.$().parent());}};d.prototype._onContentSizeChange=function(E){var f=E.getParameter("contentSize");this._setContentAreaFlexBasis(f,E.getSource().$().parent());};d.prototype._setContentAreaFlexBasis=function(f,$){var F,s;f=parseInt(f,10);F=f?f+"px":"auto";s=F!=="auto"?F:undefined;$.css({"flex-basis":F});if($.hasClass("sapFDynamicPageTitleMainContent")){this._sContentAreaFlexBasis=s;}else if($.hasClass("sapFDynamicPageTitleMainActions")){this._sActionsAreaFlexBasis=s;}};return d;});