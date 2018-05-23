/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./Popover','./TabStripSelectList','./library','sap/ui/core/Control','sap/ui/core/EnabledPropagator','sap/ui/core/IconPool','sap/m/Select','sap/m/TabStripItem'],function(q,P,T,l,C,E,I,S,a){"use strict";var b=S.extend("sap.m.TabStripSelect",{metadata:{library:"sap.m"}});b.CSS_CLASS='sapMTSSlt';b.CSS_CLASS_INVISIBLE='sapMSltInvisible';b.SPACE_BETWEEN_SELECT_BUTTON_AND_POPOVER=-5;b.prototype.init=function(){this.setPickerType(sap.ui.Device.system.phone?"Dialog":"Popover");this.createPicker(this.getPickerType());this._oSelectionOnFocus=null;this._bRenderingPhase=false;this._bFocusoutDueRendering=false;this._bProcessChange=false;};b.prototype.createList=function(){this._oList=new T({width:"100%"}).attachSelectionChange(this.onSelectionChange,this).addEventDelegate({ontap:function(e){this.close();}},this);return this._oList;};b.prototype._callMethodInControl=function(f,A){var r,L;if(A[0]==="items"){L=this.getList();if(L){r=T.prototype[f].apply(L,A);}if(f==='removeAggregation'&&this.isOpen()){this.getPicker().rerender();}}else{r=C.prototype[f].apply(this,A);}return r;};b.prototype._createPopover=function(){var t=this,p=new P({showArrow:false,showHeader:false,placement:sap.m.PlacementType.Vertical,offsetX:0,offsetY:sap.ui.Device.system.phone?0:b.SPACE_BETWEEN_SELECT_BUTTON_AND_POPOVER,initialFocus:this,bounce:false});p.addEventDelegate({ontouchstart:function(e){var o=this.getDomRef("cont");if(e.target===o){t._bProcessChange=false;}}},p);this._decoratePopover(p);return p;};b.prototype._createDialog=function(){var c=this.getRenderer().CSS_CLASS;var d=new sap.m.Dialog({stretch:true,customHeader:new sap.m.Bar({contentLeft:new sap.m.InputBase({width:"100%",editable:false}).addStyleClass(b.CSS_CLASS+"Input").addStyleClass(c+"Input")}).addStyleClass(b.CSS_CLASS+"Bar").addStyleClass(c+"Bar")}).addStyleClass(b.CSS_CLASS+"Dialog");d.getAggregation("customHeader").attachBrowserEvent("tap",function(){d.close();},this);return d;};b.prototype.onAfterRenderingPicker=function(){var p,c=sap.ui.getCore().getConfiguration().getRTL();S.prototype.onAfterRenderingPicker.call(this);if(c){p=this.$().width()-this.getPicker().$().width();}else{p=this.getPicker().$().width()-this.$().width();}if(this.getPicker()instanceof sap.m.Popover===true){this.getPicker().setOffsetX(-p);this.getPicker()._calcPlacement();}};b.prototype.exit=function(){S.prototype.exit.call(this);this._oList.destroy();this._oList=null;};b.prototype.ontouchstart=function(e){e.setMarked();if(this.getEnabled()&&this.isOpenArea(e.target)){this.addStyleClass(this.getRenderer().CSS_CLASS+"Pressed");}};b.prototype.ontouchend=function(e){e.setMarked();if(this.getEnabled()&&(!this.isOpen()||!this.hasContent())&&this.isOpenArea(e.target)){this.removeStyleClass(this.getRenderer().CSS_CLASS+"Pressed");}};b.prototype.onBeforeClose=function(){var d=this.getFocusDomRef();if(d){d.removeAttribute("aria-owns");d.removeAttribute("aria-activedescendant");}this.removeStyleClass(this.getRenderer().CSS_CLASS+"Pressed");};b.prototype.onAfterClose=function(){var d=this.getFocusDomRef();if(d){d.setAttribute("aria-expanded","false");d.removeAttribute("aria-owns");}};b.prototype.getDefaultSelectedItem=function(i){if(sap.ui.Device.system.phone){return S.prototype.getDefaultSelectedItem.apply(this,arguments);}return null;};b.prototype.setValue=function(v){var m=this.$().find(".sapMTabStripSelectListItemModified").eq(0);S.prototype.setValue.apply(this,arguments);if(this.getSelectedItem().getProperty('modified')){m.removeClass(a.CSS_CLASS_STATE_INVISIBLE);}else{m.addClass(a.CSS_CLASS_STATE_INVISIBLE);}};b.prototype.onSelectionChange=function(e){var i=e.getParameter("selectedItem");if(this.fireChange({selectedItem:i})){this.close();this.setSelection(i);this.setValue(this._getSelectedItemText());}else{e.preventDefault();}};b.prototype.fireChange=function(p){this._oSelectionOnFocus=p.selectedItem;var A=true;return this.fireEvent("change",p,A);};return b;},false);
