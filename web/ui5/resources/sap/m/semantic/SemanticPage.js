/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/m/semantic/SegmentedContainer','sap/m/semantic/SemanticConfiguration','sap/m/Button','sap/m/Title','sap/m/ActionSheet','sap/m/Page','sap/m/OverflowToolbar','sap/m/OverflowToolbarButton','sap/m/OverflowToolbarLayoutData','sap/m/ToolbarSpacer','sap/m/Bar','sap/ui/core/CustomData','sap/ui/base/ManagedObject','sap/ui/core/AccessibleLandmarkRole','sap/m/PageAccessibleLandmarkInfo'],function(q,S,a,B,T,A,P,O,b,c,d,e,C,M,f,g){"use strict";var h=sap.ui.core.Control.extend("sap.m.semantic.SemanticPage",{metadata:{library:"sap.m",properties:{title:{type:"string",group:"Misc",defaultValue:null},titleLevel:{type:"sap.ui.core.TitleLevel",group:"Appearance",defaultValue:sap.ui.core.TitleLevel.Auto},showNavButton:{type:"boolean",group:"Appearance",defaultValue:false},showSubHeader:{type:"boolean",group:"Appearance",defaultValue:true},enableScrolling:{type:"boolean",group:"Behavior",defaultValue:true},showFooter:{type:"boolean",group:"Appearance",defaultValue:true}},defaultAggregation:"content",aggregations:{subHeader:{type:"sap.m.IBar",multiple:false},content:{type:"sap.ui.core.Control",multiple:true,singularName:"content"},customHeaderContent:{type:"sap.m.Button",multiple:true,singularName:"customHeaderContent"},customFooterContent:{type:"sap.m.Button",multiple:true,singularName:"customFooterContent"},landmarkInfo:{type:"sap.m.PageAccessibleLandmarkInfo",multiple:false},_page:{type:"sap.m.Page",multiple:false,visibility:"hidden"}},events:{navButtonPress:{}},designTime:true}});h.prototype.init=function(){this._currentMode=a._PageMode.display;this._getPage().setCustomHeader(this._getInternalHeader());this._getPage().setFooter(new O(this.getId()+"-footer"));this._getPage().setLandmarkInfo(new g());};h.prototype.exit=function(){if(this._oInternalHeader){this._oInternalHeader.destroy();this._oInternalHeader=null;}if(this._oWrappedFooter){this._oWrappedFooter.destroy();this._oWrappedFooter=null;}if(this._oTitle){this._oTitle.destroy();this._oTitle=null;}if(this._oNavButton){this._oNavButton.destroy();this._oNavButton=null;}this._oPositionsMap=null;};h.prototype.setSubHeader=function(o,j){this._getPage().setSubHeader(o,j);return this;};h.prototype.getSubHeader=function(){return this._getPage().getSubHeader();};h.prototype.destroySubHeader=function(j){this._getPage().destroySubHeader(j);return this;};h.prototype.getShowSubHeader=function(){return this._getPage().getShowSubHeader();};h.prototype.setShowSubHeader=function(j,k){this._getPage().setShowSubHeader(j,k);this.setProperty("showSubHeader",j,true);return this;};h.prototype.getShowFooter=function(){return this._getPage().getShowFooter();};h.prototype.setShowFooter=function(j,k){this._getPage().setShowFooter(j,k);this.setProperty("showFooter",j,true);return this;};h.prototype.getContent=function(){return this._getPage().getContent();};h.prototype.addContent=function(o,j){this._getPage().addContent(o,j);return this;};h.prototype.indexOfContent=function(o){return this._getPage().indexOfContent(o);};h.prototype.insertContent=function(o,I,j){this._getPage().insertContent(o,I,j);return this;};h.prototype.removeContent=function(o,j){return this._getPage().removeContent(o,j);};h.prototype.removeAllContent=function(j){return this._getPage().removeAllContent(j);};h.prototype.destroyContent=function(j){this._getPage().destroyContent(j);return this;};h.prototype.setTitle=function(t){var o=this._getTitle();if(o){o.setText(t);if(!o.getParent()){this._getInternalHeader().addContentMiddle(o);}}this.setProperty("title",t,true);return this;};h.prototype.setTitleLevel=function(t){this.setProperty("titleLevel",t,true);this._getTitle().setLevel(t);return this;};h.prototype.setShowNavButton=function(j){var o=this._getNavButton();if(o){o.setVisible(j);if(!o.getParent()){this._getInternalHeader().addContentLeft(o);}}this.setProperty("showNavButton",j,true);return this;};h.prototype.setEnableScrolling=function(E){this._getPage().setEnableScrolling(E);this.setProperty("enableScrolling",E,true);return this;};h.prototype.setLandmarkInfo=function(l){return this._getPage().setLandmarkInfo(l);};h.prototype.getLandmarkInfo=function(){return this._getPage().getLandmarkInfo();};h.prototype.destroyLandmarkInfo=function(){return this._getPage().destroyLandmarkInfo();};h.prototype.getCustomFooterContent=function(){return this._getSegmentedFooter().getSection("customRight").getContent();};h.prototype.addCustomFooterContent=function(o,j){this._getSegmentedFooter().getSection("customRight").addContent(o,j);return this;};h.prototype.indexOfCustomFooterContent=function(o){return this._getSegmentedFooter().getSection("customRight").indexOfContent(o);};h.prototype.insertCustomFooterContent=function(o,I,j){this._getSegmentedFooter().getSection("customRight").insertContent(o,I,j);return this;};h.prototype.removeCustomFooterContent=function(o,j){return this._getSegmentedFooter().getSection("customRight").removeContent(o,j);};h.prototype.removeAllCustomFooterContent=function(j){return this._getSegmentedFooter().getSection("customRight").removeAllContent(j);};h.prototype.destroyCustomFooterContent=function(j){var k=this.getCustomFooterContent();if(!k){return this;}if(j){this.iSuppressInvalidate++;}this._getSegmentedFooter().getSection("customRight").destroy(j);if(!this.isInvalidateSuppressed()){this.invalidate();}if(j){this.iSuppressInvalidate--;}return this;};h.prototype.getCustomHeaderContent=function(){return this._getSegmentedHeader().getSection("customRight").getContent();};h.prototype.addCustomHeaderContent=function(o,j){this._getSegmentedHeader().getSection("customRight").addContent(o,j);return this;};h.prototype.indexOfCustomHeaderContent=function(o){return this._getSegmentedHeader().getSection("customRight").indexOfContent(o);};h.prototype.insertCustomHeaderContent=function(o,I,j){this._getSegmentedHeader().getSection("customRight").insertContent(o,I,j);return this;};h.prototype.removeCustomHeaderContent=function(o,j){return this._getSegmentedHeader().getSection("customRight").removeContent(o,j);};h.prototype.removeAllCustomHeaderContent=function(j){return this._getSegmentedHeader().getSection("customRight").removeAllContent(j);};h.prototype.destroyCustomHeaderContent=function(j){var k=this.getCustomHeaderContent();if(!k){return this;}if(j){this.iSuppressInvalidate++;}this._getSegmentedHeader().getSection("customRight").destroy(j);if(!this.isInvalidateSuppressed()){this.invalidate();}if(j){this.iSuppressInvalidate--;}return this;};h.prototype.setAggregation=function(j,o,k){var l=this.mAggregations[j];if(l===o){return this;}o=this.validateAggregation(j,o,false);var t=this.getMetadata().getManagedAggregation(j).type;if(a.isKnownSemanticType(t)){if(l){this._stopMonitor(l);this._removeFromInnerAggregation(l._getControl(),a.getPositionInPage(t),k);}if(o){this._initMonitor(o);this._addToInnerAggregation(o._getControl(),a.getPositionInPage(t),a.getSequenceOrderIndex(t),k);}}return M.prototype.setAggregation.call(this,j,o,k);};h.prototype.destroyAggregation=function(j,k){var o=this.getMetadata().getAggregations()[j];if(o&&a.isKnownSemanticType(o.type)){var l=M.prototype.getAggregation.call(this,j);if(l){this._stopMonitor(l);if(!l._getControl().bIsDestroyed){this._removeFromInnerAggregation(l._getControl(),a.getPositionInPage(o.type),k);}}}return M.prototype.destroyAggregation.call(this,j,l,k);};h.prototype._getTitle=function(){if(!this._oTitle){this._oTitle=new T(this.getId()+"-title",{text:this.getTitle()});}return this._oTitle;};h.prototype._getNavButton=function(){if(!this._oNavButton){this._oNavButton=new B(this.getId()+"-navButton",{type:sap.m.ButtonType.Up,tooltip:sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("PAGE_NAVBUTTON_TEXT"),press:q.proxy(this.fireNavButtonPress,this)});}return this._oNavButton;};h.prototype._initMonitor=function(o){var j=o._getConfiguration();if(j.triggers){o.attachEvent("press",this._updateCurrentMode,this);}var k=j.states,t=this;if(k){q.each(a._PageMode,function(l,v){if(k[l]){t.attachEvent(l,o._onPageStateChanged,o);}});}};h.prototype._stopMonitor=function(o){o.detachEvent("press",this._updateCurrentMode,this);var j=o._getConfiguration();var k=j.states,t=this;if(k){q.each(a._PageMode,function(l,v){if(k[l]){t.detachEvent(l,o._onPageStateChanged,o);}});}};h.prototype._updateCurrentMode=function(E){var o=E.oSource._getConfiguration();if(typeof o.triggers==='string'){this._currentMode=o.triggers;}else{var l=o.triggers.length;if(l&&l>0){for(var I=0;I<l;I++){var t=o.triggers[I];if(t&&(t.inState===this._currentMode)){this._currentMode=t.triggers;break;}}}}this.fireEvent(this._currentMode);};h.prototype._removeFromInnerAggregation=function(o,p,j){var k=this._getSemanticPositionsMap()[p];if(k&&k.oContainer&&k.sAggregation){k.oContainer["remove"+i(k.sAggregation)](o,j);}};h.prototype._addToInnerAggregation=function(o,p,j,k){if(!o||!p){return;}var l=this._getSemanticPositionsMap()[p];if(!l||!l.oContainer||!l.sAggregation){return;}if(typeof j!=='undefined'){o.addCustomData(new C({key:"sortIndex",value:j}));}return l.oContainer["add"+i(l.sAggregation)](o,k);};h.prototype._getSemanticPositionsMap=function(o,j){if(!this._oPositionsMap){this._oPositionsMap={};this._oPositionsMap[a.prototype._PositionInPage.headerLeft]={oContainer:this._getInternalHeader(),sAggregation:"contentLeft"};this._oPositionsMap[a.prototype._PositionInPage.headerRight]={oContainer:this._getSegmentedHeader().getSection("semanticRight"),sAggregation:"content"};this._oPositionsMap[a.prototype._PositionInPage.headerMiddle]={oContainer:this._getInternalHeader(),sAggregation:"contentMiddle"};this._oPositionsMap[a.prototype._PositionInPage.footerLeft]={oContainer:this._getSegmentedFooter().getSection("semanticLeft"),sAggregation:"content"};this._oPositionsMap[a.prototype._PositionInPage.footerRight_IconOnly]={oContainer:this._getSegmentedFooter().getSection("semanticRight_IconOnly"),sAggregation:"content"};this._oPositionsMap[a.prototype._PositionInPage.footerRight_TextOnly]={oContainer:this._getSegmentedFooter().getSection("semanticRight_TextOnly"),sAggregation:"content"};}return this._oPositionsMap;};h.prototype._getPage=function(){var p=this.getAggregation("_page");if(!p){this.setAggregation("_page",new P(this.getId()+"-page"));p=this.getAggregation("_page");}return p;};h.prototype._getInternalHeader=function(){if(!this._oInternalHeader){this._oInternalHeader=new e(this.getId()+"-intHeader");}return this._oInternalHeader;};h.prototype._getAnyHeader=function(){return this._getInternalHeader();};h.prototype._getSegmentedHeader=function(){if(!this._oWrappedHeader){var H=this._getInternalHeader();if(!H){q.sap.log.error("missing page header",this);return null;}this._oWrappedHeader=new S(H,"contentRight");this._oWrappedHeader.addSection({sTag:"customRight"});this._oWrappedHeader.addSection({sTag:"semanticRight"});}return this._oWrappedHeader;};h.prototype._getSegmentedFooter=function(){if(!this._oWrappedFooter){var F=this._getPage().getFooter();if(!F){q.sap.log.error("missing page footer",this);return null;}this._oWrappedFooter=new S(F);this._oWrappedFooter.addSection({sTag:"semanticLeft"});this._oWrappedFooter.addSection({sTag:"spacer",aContent:[new d()]});this._oWrappedFooter.addSection({sTag:"semanticRight_TextOnly",fnSortFunction:s});this._oWrappedFooter.addSection({sTag:"customRight"});this._oWrappedFooter.addSection({sTag:"semanticRight_IconOnly",fnSortFunction:s});}return this._oWrappedFooter;};function i(n){return n.substring(0,1).toUpperCase()+n.substring(1);}function s(o,j){var k=o.data("sortIndex");var l=j.data("sortIndex");if((typeof k==='undefined')||(typeof l==='undefined')){q.sap.log.warning("sortIndex missing",this);return null;}return(k-l);}return h;},false);
