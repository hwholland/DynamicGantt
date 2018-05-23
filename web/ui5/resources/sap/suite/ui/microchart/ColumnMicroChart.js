/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2016 SAP SE. All rights reserved
	
 */
sap.ui.define(['jquery.sap.global','./library','sap/ui/core/Control'],function(q,l,C){"use strict";var a=C.extend("sap.suite.ui.microchart.ColumnMicroChart",{metadata:{library:"sap.suite.ui.microchart",properties:{size:{group:"Misc",type:"sap.m.Size",defaultValue:"Auto"},width:{group:"Misc",type:"sap.ui.core.CSSSize"},height:{group:"Misc",type:"sap.ui.core.CSSSize"},isResponsive:{type:"boolean",group:"Appearance",defaultValue:false}},events:{press:{}},defaultAggregation:"columns",aggregations:{columns:{multiple:true,type:"sap.suite.ui.microchart.ColumnMicroChartData",defaultValue:null,bindable:"bindable"},leftTopLabel:{multiple:false,type:"sap.suite.ui.microchart.ColumnMicroChartLabel",defaultValue:null},rightTopLabel:{multiple:false,type:"sap.suite.ui.microchart.ColumnMicroChartLabel",defaultValue:null},leftBottomLabel:{multiple:false,type:"sap.suite.ui.microchart.ColumnMicroChartLabel",defaultValue:null},rightBottomLabel:{multiple:false,type:"sap.suite.ui.microchart.ColumnMicroChartLabel",defaultValue:null}}}});a.EDGE_CASE_WIDTH_SHOWCHART=32;a.EDGE_CASE_HEIGHT_SHOWCANVAS=16;a.EDGE_CASE_HEIGHT_SHOWLABELS=16;a.EDGE_CASE_HEIGHT_SHOWTOPLABEL=32;a.EDGE_CASE_WIDTH_RESIZEFONT=168;a.EDGE_CASE_HEIGHT_RESIZEFONT=72;a.prototype.init=function(){this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.suite.ui.microchart");this.setAggregation("tooltip","{AltText}",true);this._bThemeApplied=true;if(!sap.ui.getCore().isInitialized()){this._bThemeApplied=false;sap.ui.getCore().attachInit(this._handleCoreInitialized.bind(this));}else{this._handleCoreInitialized();}};a.prototype._handleCoreInitialized=function(){this._bThemeApplied=sap.ui.getCore().isThemeApplied();if(!this._bThemeApplied){sap.ui.getCore().attachThemeChanged(this._handleThemeApplied,this);}};a.prototype._handleThemeApplied=function(){this._bThemeApplied=true;this.invalidate();sap.ui.getCore().detachThemeChanged(this._handleThemeApplied,this);};a.prototype.onBeforeRendering=function(){if(l._isInGenericTile(this)){this.setIsResponsive(true);l._removeStandardMargins(this);}this.$().unbind("mouseenter",this._addTitleAttribute);this.$().unbind("mouseleave",this._removeTitleAttribute);};a.prototype.onAfterRendering=function(){if(this._sChartResizeHandlerId){sap.ui.core.ResizeHandler.deregister(this._sChartResizeHandlerId);}this._sChartResizeHandlerId=sap.ui.core.ResizeHandler.register(q.sap.domById(this.getId()),q.proxy(this._calcColumns,this));this._fChartWidth=undefined;this._fChartHeight=undefined;this._aBars=[];var c=this.getColumns().length;for(var i=0;i<c;i++){this._aBars.push({});}this._adjustToParent();l._checkControlIsVisible(this,this._onControlIsVisible);this.$().bind("mouseenter",this._addTitleAttribute.bind(this));this.$().bind("mouseleave",this._removeTitleAttribute.bind(this));};a.prototype._onControlIsVisible=function(){this._calcColumns();this._resize();};a.prototype.exit=function(){sap.ui.core.ResizeHandler.deregister(this._sChartResizeHandlerId);};a.prototype._adjustToParent=function(){if(this.getIsResponsive()){if(!q.isFunction(this.getParent)){return;}var p=this.getParent();var $=this.$();if(q.isFunction(p.getHeight)){var P=parseFloat(p.$().height())-2;$.height(P);}if(q.isFunction(p.getWidth)){var s=parseFloat(p.$().width())-2;$.width(s);}}};a.prototype._resize=function(){if(this.getIsResponsive()){this._resizeHorizontally();this._resizeVertically();this._resizeBars();}};a.prototype._resizeVertically=function(){var $=this.$();var c=$.find(".sapSuiteClMCBars");var h=parseFloat(c.css("height"));if(h<=a.EDGE_CASE_HEIGHT_SHOWCANVAS){c.hide();}var H=parseFloat($.css("height"));if($.find(".sapSuiteClMCPositionBtm.sapSuiteClMCLbls").length!==0){if(H<=a.EDGE_CASE_HEIGHT_SHOWTOPLABEL){$.find(".sapSuiteClMCPositionTop.sapSuiteClMCLbls").hide();}if(H<=a.EDGE_CASE_HEIGHT_SHOWLABELS){$.find(".sapSuiteClMCPositionBtm.sapSuiteClMCLbls").hide();}}else if(H<=a.EDGE_CASE_HEIGHT_SHOWLABELS){$.find(".sapSuiteClMCPositionTop.sapSuiteClMCLbls").hide();}if(H<=a.EDGE_CASE_HEIGHT_RESIZEFONT){this._resizeFont();}};a.prototype._resizeHorizontally=function(){var $=this.$();var w=parseFloat($.css("width"));if(w<=a.EDGE_CASE_WIDTH_SHOWCHART){$.hide();return;}if(w<=a.EDGE_CASE_WIDTH_RESIZEFONT){this._resizeFont();}var L=$.find(".sapSuiteClMCPositionTop.sapSuiteClMCLbls");if(this._isTruncatedLabel(L)){L.hide();}L=$.find(".sapSuiteClMCPositionBtm.sapSuiteClMCLbls");if(this._isTruncatedLabel(L)){L.hide();}};a.prototype._resizeBars=function(){var w=this.getDomRef().getBoundingClientRect().width-1;var $=this.$();var n=$.find(".sapSuiteClMCBar").size();var m=parseFloat($.find(".sapSuiteClMCBar").css("min-width"));if((m===0)||isNaN(m)){m=1;}var N=n-1;if(n*m+N>=w){$.hide();}else if(parseFloat($.find(".sapSuiteClMCBar:last").css("margin-left"))<1){$.find(".sapSuiteClMCBar:not(:first)").css("margin-left","1px");$.find(".sapSuiteClMCBar").css("width",(((w-N)/n)));}};a.prototype._isTruncatedLabel=function(L){var $=L.find(".sapSuiteClMCPositionRight.sapSuiteClMCLbl,.sapSuiteClMCPositionLeft.sapSuiteClMCLbl");for(var i=0;i<$.size();i++){if($[i].offsetWidth+1<$[i].scrollWidth){this._resizeFont();}if($[i].offsetWidth+1<$[i].scrollWidth){return true;}}return false;};a.prototype._resizeFont=function(){this.$().find(".sapSuiteClMCLbl").addClass("sapSuiteClMCSmallFont");};a.prototype._calcColumns=function(){var c=this.getColumns().length;if(c){var f=parseFloat(this.$().css("width"));if(f!=this._fChartWidth){this._fChartWidth=f;var b=0;var B;if(c>1){B=q.sap.byId(this.getId()+"-bar-1");var r=sap.ui.getCore().getConfiguration().getRTL();b=parseInt(B.css("margin-"+(r?"right":"left")),10);}else{B=q.sap.byId(this.getId()+"-bar-0");}var d=parseInt(B.css("min-width"),10);this._calcColumnsWidth(b,d,f,this._aBars);}var e=parseFloat(this.$().css("height"));if(e!=this._fChartHeight){this._fChartHeight=e;this._calcColumnsHeight(e,this._aBars);}for(var i=0;i<c;i++){q.sap.byId(this.getId()+"-bar-"+i).css(this._aBars[i]);}if(this._aBars.overflow){q.sap.log.warning(this.toString()+" Chart overflow","Some columns were not rendered");}}};a.prototype._calcColumnsWidth=function(c,b,f,B){var d=this.getColumns().length;var v=Math.floor((f+c)/(b+c));var m=2;var e=(100-m*(d-1))/d;for(var i=0;i<d;i++){if(i<v){B[i].width=e+"%";if(i>0){B[i]["margin-left"]=m+"%";}}else{B[i].display="none";}}B.overflow=v!=d;};a.prototype._calcColumnsHeight=function(c,b){var d=this.getColumns().length;var m,M,v;m=M=0;for(var i=0;i<d;i++){var o=this.getColumns()[i];if(m<o.getValue()){m=o.getValue();}else if(M>o.getValue()){M=o.getValue();}}var D=m-M;var O=D/c;var f,t;f=t=0;for(var e=0;e<d;e++){v=this.getColumns()[e].getValue();if(Math.abs(v)<O){if(v>=0){if(v==m){t=O-v;}}else if(v==M){f=O+v;}}}if(t){m+=t;M-=t;}if(f){m-=f;M+=f;}var n=0-O;for(var g=0;g<d;g++){v=this.getColumns()[g].getValue();var h=v;if(v>=0){h=Math.max(h+t-f,O);}else{h=Math.min(h+t-f,n);}b[g].value=h;}function j(v){return(v/D*100).toFixed(2)+"%";}var z=j(m);for(var k=0;k<d;k++){v=b[k].value;b[k].top=(v<0)?z:j(m-v);b[k].height=j(Math.abs(v));}};a.prototype.attachEvent=function(e,d,f,L){sap.ui.core.Control.prototype.attachEvent.call(this,e,d,f,L);if(this.hasListeners("press")){this.$().attr("tabindex",0).addClass("sapSuiteUiMicroChartPointer");}return this;};a.prototype.detachEvent=function(e,f,L){sap.ui.core.Control.prototype.detachEvent.call(this,e,f,L);if(!this.hasListeners("press")){this.$().removeAttr("tabindex").removeClass("sapSuiteUiMicroChartPointer");}return this;};a.prototype.getLocalizedColorMeaning=function(c){if(c){return this._oRb.getText(("SEMANTIC_COLOR_"+c).toUpperCase());}};a.prototype.getAltText=function(){var A="";var I=true;var L=this.getLeftTopLabel();var r=this.getRightTopLabel();var o=this.getLeftBottomLabel();var R=this.getRightBottomLabel();var c;if(L&&L.getLabel()||o&&o.getLabel()){if(L){c=L.getColor();}else if(o){c=o.getColor();}else{c="";}A+=(I?"":"\n")+this._oRb.getText(("COLUMNMICROCHART_START"))+": "+(o?o.getLabel()+" ":"")+(L?L.getLabel()+" ":"")+this.getLocalizedColorMeaning(c);I=false;}if(r&&r.getLabel()||R&&R.getLabel()){if(r){c=r.getColor();}else if(R){c=R.getColor();}else{c="";}A+=(I?"":"\n")+this._oRb.getText(("COLUMNMICROCHART_END"))+": "+(R?R.getLabel()+" ":"")+(r?r.getLabel()+" ":"")+this.getLocalizedColorMeaning(c);I=false;}var b=this.getColumns();for(var i=0;i<b.length;i++){var B=b[i];var m=this.getLocalizedColorMeaning(B.getColor());A+=((!I||i!=0)?"\n":"")+B.getLabel()+" "+B.getValue()+" "+m;}return A;};a.prototype.getTooltip_AsString=function(){var t=this.getTooltip();var T=this.getAltText();if(typeof t==="string"||t instanceof String){T=t.split("{AltText}").join(T).split("((AltText))").join(T);return T;}else if(this.isBound("tooltip")&&!t){return T;}return t?t:"";};a.prototype.ontap=function(e){if(sap.ui.Device.browser.edge){this.onclick(e);}};a.prototype.onclick=function(e){if(!this.fireBarPress(e)){if(sap.ui.Device.browser.internet_explorer||sap.ui.Device.browser.edge){this.$().focus();}this.firePress();}};a.prototype.onkeydown=function(e){var t,f;switch(e.keyCode){case q.sap.KeyCodes.SPACE:e.preventDefault();break;case q.sap.KeyCodes.ARROW_LEFT:case q.sap.KeyCodes.ARROW_UP:f=this.$().find(":focusable");t=f.index(e.target);if(f.length>0){f.eq(t-1).get(0).focus();e.preventDefault();e.stopPropagation();}break;case q.sap.KeyCodes.ARROW_DOWN:case q.sap.KeyCodes.ARROW_RIGHT:f=this.$().find(":focusable");t=f.index(e.target);if(f.length>0){f.eq((t+1<f.length)?t+1:0).get(0).focus();e.preventDefault();e.stopPropagation();}break;default:}};a.prototype.onkeyup=function(e){if(e.which==q.sap.KeyCodes.ENTER||e.which==q.sap.KeyCodes.SPACE){if(!this.fireBarPress(e)){this.firePress();e.preventDefault();}}};a.prototype.fireBarPress=function(e){var b=q(e.target);if(b&&b.attr("data-bar-index")){var i=parseInt(b.attr("data-bar-index"),10);var c=this.getColumns()[i];if(c&&c.hasListeners("press")){c.firePress();e.preventDefault();e.stopPropagation();if(sap.ui.Device.browser.internet_explorer){b.focus();}return true;}}return false;};a.prototype._getBarAltText=function(b){var B=this.getColumns()[b];var m=this.getLocalizedColorMeaning(B.getColor());return B.getLabel()+" "+B.getValue()+" "+m;};a.prototype.setBarPressable=function(b,p){if(p){var B=this._getBarAltText(b);q.sap.byId(this.getId()+"-bar-"+b).addClass("sapSuiteUiMicroChartPointer").attr("tabindex",0).attr("title",B).attr("role","presentation").attr("aria-label",B);}else{q.sap.byId(this.getId()+"-bar-"+b).removeAttr("tabindex").removeClass("sapSuiteUiMicroChartPointer").removeAttr("title").removeAttr("role").removeAttr("aria-label");}};a.prototype.onsaptabnext=function(e){var L=this.$().find(":focusable").last();if(L){this._bIgnoreFocusEvt=true;L.get(0).focus();}};a.prototype.onsaptabprevious=function(e){if(e.target.id!=e.currentTarget.id){var f=this.$().find(":focusable").first();if(f){f.get(0).focus();}}};a.prototype.onfocusin=function(e){if(this._bIgnoreFocusEvt){this._bIgnoreFocusEvt=false;return;}if(this.getId()+"-hidden"==e.target.id){this.$().focus();e.preventDefault();e.stopPropagation();}};a.prototype._addTitleAttribute=function(){if(this.$().attr("title")){return;}else{this.$().attr("title",this.getTooltip_AsString());}};a.prototype._removeTitleAttribute=function(){if(this.$().attr("title")){this.$().removeAttr("title");}};return a;});
