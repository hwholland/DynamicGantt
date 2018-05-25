/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./Bar','./Dialog','./InputBase','./List','./Popover','sap/ui/core/Item','./ColumnListItem','./StandardListItem','./DisplayListItem','sap/ui/core/ListItem','./Table','./Toolbar','./ToolbarSpacer','./library','sap/ui/core/IconPool','sap/ui/core/InvisibleText','sap/ui/Device','sap/ui/core/ResizeHandler','sap/ui/core/Control','./InputRenderer'],function(q,B,D,I,L,P,a,C,S,b,c,T,d,e,l,f,g,h,R,j,k){"use strict";var m=l.ListMode;var n=l.PlacementType;var o=l.ListType;var p=l.InputTextFormatMode;var r=l.InputType;var s=I.extend("sap.m.Input",{metadata:{library:"sap.m",properties:{type:{type:"sap.m.InputType",group:"Data",defaultValue:r.Text},maxLength:{type:"int",group:"Behavior",defaultValue:0},dateFormat:{type:"string",group:"Misc",defaultValue:'YYYY-MM-dd',deprecated:true},showValueHelp:{type:"boolean",group:"Behavior",defaultValue:false},showSuggestion:{type:"boolean",group:"Behavior",defaultValue:false},valueHelpOnly:{type:"boolean",group:"Behavior",defaultValue:false},filterSuggests:{type:"boolean",group:"Behavior",defaultValue:true},maxSuggestionWidth:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:null},startSuggestion:{type:"int",group:"Behavior",defaultValue:1},showTableSuggestionValueHelp:{type:"boolean",group:"Behavior",defaultValue:true},description:{type:"string",group:"Misc",defaultValue:null},fieldWidth:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:'50%'},valueLiveUpdate:{type:"boolean",group:"Behavior",defaultValue:false},selectedKey:{type:"string",group:"Data",defaultValue:""},textFormatMode:{type:"sap.m.InputTextFormatMode",group:"Misc",defaultValue:p.Value},textFormatter:{type:"any",group:"Misc",defaultValue:""},suggestionRowValidator:{type:"any",group:"Misc",defaultValue:""},enableSuggestionsHighlighting:{type:"boolean",group:"Behavior",defaultValue:true}},defaultAggregation:"suggestionItems",aggregations:{suggestionItems:{type:"sap.ui.core.Item",multiple:true,singularName:"suggestionItem"},suggestionColumns:{type:"sap.m.Column",multiple:true,singularName:"suggestionColumn",bindable:"bindable",forwarding:{getter:"_getSuggestionsTable",aggregation:"columns"}},suggestionRows:{type:"sap.m.ColumnListItem",multiple:true,singularName:"suggestionRow",bindable:"bindable",forwarding:{getter:"_getSuggestionsTable",aggregation:"items"}},_valueHelpIcon:{type:"sap.ui.core.Icon",multiple:false,visibility:"hidden"}},associations:{selectedItem:{type:"sap.ui.core.Item",multiple:false},selectedRow:{type:"sap.m.ColumnListItem",multiple:false}},events:{liveChange:{parameters:{value:{type:"string"},escPressed:{type:"boolean"},previousValue:{type:"string"}}},valueHelpRequest:{parameters:{fromSuggestions:{type:"boolean"}}},suggest:{parameters:{suggestValue:{type:"string"},suggestionColumns:{type:"sap.m.ListBase"}}},suggestionItemSelected:{parameters:{selectedItem:{type:"sap.ui.core.Item"},selectedRow:{type:"sap.m.ColumnListItem"}}},submit:{parameters:{value:{type:"string"}}}},designtime:"sap/m/designtime/Input.designtime"}});f.insertFontFaceStyle();s._wordStartsWithValue=function(t,v){var i;while(t){if(q.sap.startsWithIgnoreCase(t,v)){return true;}i=t.indexOf(' ');if(i==-1){break;}t=t.substring(i+1);}return false;};s._DEFAULTFILTER=function(v,i){if(i instanceof c&&s._wordStartsWithValue(i.getAdditionalText(),v)){return true;}return s._wordStartsWithValue(i.getText(),v);};s._DEFAULTFILTER_TABULAR=function(v,t){var u=t.getCells(),i=0;for(;i<u.length;i++){if(u[i].getText){if(s._wordStartsWithValue(u[i].getText(),v)){return true;}}}return false;};s._DEFAULTRESULT_TABULAR=function(t){var u=t.getCells(),i=0;for(;i<u.length;i++){if(u[i].getText){return u[i].getText();}}return"";};s.prototype.init=function(){I.prototype.init.call(this);this._fnFilter=s._DEFAULTFILTER;this._bUseDialog=h.system.phone;this._bFullScreen=h.system.phone;this._iSetCount=0;this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.m");};s.prototype.exit=function(){this._deregisterEvents();this.cancelPendingSuggest();if(this._iRefreshListTimeout){q.sap.clearDelayedCall(this._iRefreshListTimeout);this._iRefreshListTimeout=null;}if(this._oSuggestionPopup){this._oSuggestionPopup.destroy();this._oSuggestionPopup=null;}if(this._oList){this._oList.destroy();this._oList=null;}if(this._oSuggestionTable){this._oSuggestionTable.destroy();this._oSuggestionTable=null;}if(this._oButtonToolbar){this._oButtonToolbar.destroy();this._oButtonToolbar=null;}if(this._oShowMoreButton){this._oShowMoreButton.destroy();this._oShowMoreButton=null;}};s.prototype._resizePopup=function(F){var t=this;if(F){this._shouldResizePopup=true;}if(this._oList&&this._oSuggestionPopup&&this._shouldResizePopup){if(this.getMaxSuggestionWidth()){this._oSuggestionPopup.setContentWidth(this.getMaxSuggestionWidth());}else{this._oSuggestionPopup.setContentWidth((this.$().outerWidth())+"px");}setTimeout(function(){if(t._oSuggestionPopup&&t._oSuggestionPopup.isOpen()&&t._oSuggestionPopup.$().outerWidth()<t.$().outerWidth()){t._oSuggestionPopup.setContentWidth((t.$().outerWidth())+"px");}},0);}};s.prototype.onBeforeRendering=function(){var i=this.getSelectedKey();I.prototype.onBeforeRendering.call(this);this._deregisterEvents();if(i){this.setSelectedKey(i);}if(this.getShowSuggestion()){if(this.getShowTableSuggestionValueHelp()){this._addShowMoreButton();}else{this._removeShowMoreButton();}}};s.prototype.onAfterRendering=function(){var t=this;I.prototype.onAfterRendering.call(this);if(!this._bFullScreen){this._sPopupResizeHandler=R.register(this.getDomRef(),function(){t._resizePopup();});}if(this._bUseDialog&&this.getEditable()&&this.getEnabled()){this.$().on("click",q.proxy(function(E){if(this._onclick){this._onclick(E);}if(this.getShowSuggestion()&&this._oSuggestionPopup&&E.target.id!=this.getId()+"-vhi"){this._resizePopup(true);this._oSuggestionPopup.open();}},this));}};s.prototype._getDisplayText=function(i){var t=this.getTextFormatter();if(t){return t(i);}var u=i.getText(),K=i.getKey(),v=this.getTextFormatMode();switch(v){case p.Key:return K;case p.ValueKey:return u+' ('+K+')';case p.KeyValue:return'('+K+') '+u;default:return u;}};s.prototype._onValueUpdated=function(i){if(this._bSelectingItem||i===this._sSelectedValue){return;}var K=this.getSelectedKey(),H;if(K===''){return;}if(this._hasTabularSuggestions()){H=!!this._oSuggestionTable.getSelectedItem();}else{H=!!this._oList.getSelectedItem();}if(H){return;}this.setProperty("selectedKey",'',true);this.setAssociation("selectedRow",null,true);this.setAssociation("selectedItem",null,true);this.fireSuggestionItemSelected({selectedItem:null,selectedRow:null});};s.prototype._updateSelectionFromList=function(){if(this._iPopupListSelectedIndex<0){return false;}var i=this._oList.getSelectedItem();if(i){if(this._hasTabularSuggestions()){this.setSelectionRow(i,true);}else{this.setSelectionItem(i._oItem,true);}}return true;};s.prototype.setSelectionItem=function(i,t){if(!i){this.setAssociation("selectedItem",null,true);this.setProperty("selectedKey",'',true);this.setValue('');return;}this._bSelectingItem=true;var u=this._iSetCount,N;this.setAssociation("selectedItem",i,true);this.setProperty("selectedKey",i.getKey(),true);if(t){this.fireSuggestionItemSelected({selectedItem:i});}if(u!==this._iSetCount){N=this.getValue();}else{N=this._getDisplayText(i);}this._sSelectedValue=N;this.updateInputField(N);this._iPopupListSelectedIndex=-1;if(!(this._bUseDialog&&this instanceof sap.m.MultiInput&&this._isMultiLineMode)){this._closeSuggestionPopup();}if(!h.support.touch){this._doSelect();}this._bSelectingItem=false;};s.prototype.setSelectedItem=function(i){if(typeof i==="string"){i=sap.ui.getCore().byId(i);}if(i!==null&&!(i instanceof a)){return this;}this.setSelectionItem(i);return this;};s.prototype.setSelectedKey=function(K){K=this.validateProperty("selectedKey",K);if(this._hasTabularSuggestions()){this.setProperty("selectedKey",K,true);return this;}if(!K){this.setSelectionItem();return this;}var i=this.getSuggestionItemByKey(K);if(i){this.setSelectionItem(i);}else{this.setProperty("selectedKey",K,true);}return this;};s.prototype.getSuggestionItemByKey=function(K){var t=this.getSuggestionItems()||[],u,i;for(i=0;i<t.length;i++){u=t[i];if(u.getKey()===K){return u;}}};s.prototype.setSelectionRow=function(i,t){if(!i){this.setAssociation("selectedRow",null,true);this.setProperty("selectedKey",'',true);this.setValue('');return;}this._bSelectingItem=true;var u,v=this.getSuggestionRowValidator();if(v){u=v(i);if(!(u instanceof a)){u=null;}}var w=this._iSetCount,K="",N;this.setAssociation("selectedRow",i,true);if(u){K=u.getKey();}this.setProperty("selectedKey",K,true);if(t){this.fireSuggestionItemSelected({selectedRow:i});}if(w!==this._iSetCount){N=this.getValue();}else{if(u){N=this._getDisplayText(u);}else{N=this._fnRowResultFilter?this._fnRowResultFilter(i):s._DEFAULTRESULT_TABULAR(i);}}this._sSelectedValue=N;this.updateInputField(N);this._iPopupListSelectedIndex=-1;if(!(this._bUseDialog&&this instanceof sap.m.MultiInput&&this._isMultiLineMode)){this._closeSuggestionPopup();}if(!h.support.touch){this._doSelect();}this._bSelectingItem=false;};s.prototype.setSelectedRow=function(i){if(typeof i==="string"){i=sap.ui.getCore().byId(i);}if(i!==null&&!(i instanceof C)){return this;}this.setSelectionRow(i);return this;};s.prototype._getValueHelpIcon=function(){var t=this,v=this.getAggregation("_valueHelpIcon"),u;if(v){return v;}u=f.getIconURI("value-help");v=f.createControlByURI({id:this.getId()+"-vhi",src:u,useIconTooltip:false,noTabStop:true});v.addStyleClass("sapMInputValHelpInner");v.attachPress(function(i){if(!t.getValueHelpOnly()){this.getParent().focus();t.bValueHelpRequested=true;t.fireValueHelpRequest({fromSuggestions:false});}});this.setAggregation("_valueHelpIcon",v);return v;};s.prototype._fireValueHelpRequestForValueHelpOnly=function(){if(this.getEnabled()&&this.getEditable()&&this.getShowValueHelp()&&this.getValueHelpOnly()){this.fireValueHelpRequest({fromSuggestions:false});}};s.prototype.ontap=function(E){I.prototype.ontap.call(this,E);this._fireValueHelpRequestForValueHelpOnly();};s.prototype.setWidth=function(w){return I.prototype.setWidth.call(this,w||"100%");};s.prototype.getWidth=function(){return this.getProperty("width")||"100%";};s.prototype.setFilterFunction=function(F){if(F===null||F===undefined){this._fnFilter=s._DEFAULTFILTER;return this;}this._fnFilter=F;return this;};s.prototype.setRowResultFunction=function(F){var i;if(F===null||F===undefined){this._fnRowResultFilter=s._DEFAULTRESULT_TABULAR;return this;}this._fnRowResultFilter=F;i=this.getSelectedRow();if(i){this.setSelectedRow(i);}return this;};s.prototype.closeSuggestions=function(){this._closeSuggestionPopup();};s.prototype._doSelect=function(i,E){if(h.support.touch){return;}var t=this._$input[0];if(t){var $=this._$input;t.focus();$.selectText(i?i:0,E?E:$.val().length);}return this;};s.prototype._scrollToItem=function(i){var t=this._oSuggestionPopup,u=this._oList,v,w,x,y,z;if(!(t instanceof P)||!u){return;}v=t.getScrollDelegate();if(!v){return;}var A=u.getItems()[i],E=A&&A.getDomRef();if(!E){return;}w=t.getDomRef("cont").getBoundingClientRect();x=E.getBoundingClientRect();y=w.top-x.top;z=x.bottom-w.bottom;if(y>0){v.scrollTo(v._scrollX,Math.max(v._scrollY-y,0));}else if(z>0){v.scrollTo(v._scrollX,v._scrollY+z);}};s.prototype._isSuggestionItemSelectable=function(i){return i.getVisible()&&(this._hasTabularSuggestions()||i.getType()!==o.Inactive);};s.prototype._isIncrementalType=function(){var t=this.getType();if(t==="Number"||t==="Date"||t==="Datetime"||t==="Month"||t==="Time"||t==="Week"){return true;}return false;};s.prototype._onsaparrowkey=function(E,i,t){if(!this.getEnabled()||!this.getEditable()){return;}if(i!=="up"&&i!=="down"){return;}if(this._isIncrementalType()){E.setMarked();}if(!this._oSuggestionPopup||!this._oSuggestionPopup.isOpen()){return;}E.preventDefault();E.stopPropagation();var F=false,u=this._oList,v=this.getSuggestionItems(),w=u.getItems(),x=this._iPopupListSelectedIndex,N,O=x;if(i==="up"&&x===0){return;}if(i=="down"&&x===w.length-1){return;}var y;if(t>1){if(i=="down"&&x+t>=w.length){i="up";t=1;w[x].setSelected(false);y=x;x=w.length-1;F=true;}else if(i=="up"&&x-t<0){i="down";t=1;w[x].setSelected(false);y=x;x=0;F=true;}}if(x===-1){x=0;if(this._isSuggestionItemSelectable(w[x])){O=x;F=true;}else{i="down";}}if(i==="down"){while(x<w.length-1&&(!F||!this._isSuggestionItemSelectable(w[x]))){w[x].setSelected(false);x=x+t;F=true;t=1;if(y===x){break;}}}else{while(x>0&&(!F||!w[x].getVisible()||!this._isSuggestionItemSelectable(w[x]))){w[x].setSelected(false);x=x-t;F=true;t=1;if(y===x){break;}}}if(!this._isSuggestionItemSelectable(w[x])){if(O>=0){w[O].setSelected(true).updateAccessibilityState();this.$("inner").attr("aria-activedescendant",w[O].getId());}return;}else{w[x].setSelected(true).updateAccessibilityState();this.$("inner").attr("aria-activedescendant",w[x].getId());}if(h.system.desktop){this._scrollToItem(x);}if(C&&w[x]instanceof C){N=this._getInputValue(this._fnRowResultFilter(w[x]));}else{var z=(v[0]instanceof c?true:false);if(z){N=this._getInputValue(w[x].getLabel());}else{N=this._getInputValue(w[x].getTitle());}}this.setDOMValue(N);this._sSelectedSuggViaKeyboard=N;this._doSelect();this._iPopupListSelectedIndex=x;};s.prototype.onsapup=function(E){this._onsaparrowkey(E,"up",1);};s.prototype.onsapdown=function(E){this._onsaparrowkey(E,"down",1);};s.prototype.onsappageup=function(E){this._onsaparrowkey(E,"up",5);};s.prototype.onsappagedown=function(E){this._onsaparrowkey(E,"down",5);};s.prototype.onsaphome=function(E){if(this._oList){this._onsaparrowkey(E,"up",this._oList.getItems().length);}};s.prototype.onsapend=function(E){if(this._oList){this._onsaparrowkey(E,"down",this._oList.getItems().length);}};s.prototype.onsapescape=function(E){var i;if(this._oSuggestionPopup&&this._oSuggestionPopup.isOpen()){E.originalEvent._sapui_handledByControl=true;this._iPopupListSelectedIndex=-1;this._closeSuggestionPopup();if(this._sBeforeSuggest!==undefined){if(this._sBeforeSuggest!==this.getValue()){i=this._lastValue;this.setValue(this._sBeforeSuggest);this._lastValue=i;}this._sBeforeSuggest=undefined;}return;}if(I.prototype.onsapescape){I.prototype.onsapescape.apply(this,arguments);}};s.prototype.onsapenter=function(E){this.cancelPendingSuggest();if(this._oSuggestionPopup&&this._oSuggestionPopup.isOpen()){if(!this._updateSelectionFromList()){this._closeSuggestionPopup();}}if(I.prototype.onsapenter){I.prototype.onsapenter.apply(this,arguments);}if(this.getEnabled()&&this.getEditable()&&!(this.getValueHelpOnly()&&this.getShowValueHelp())){this.fireSubmit({value:this.getValue()});}};s.prototype.onsapfocusleave=function(E){var i=this._oSuggestionPopup;if(i instanceof P){if(E.relatedControlId&&q.sap.containsOrEquals(i.getDomRef(),sap.ui.getCore().byId(E.relatedControlId).getFocusDomRef())){this._bPopupHasFocus=true;this.focus();}else{if(this.getDOMValue()===this._sSelectedSuggViaKeyboard){this._sSelectedSuggViaKeyboard=null;}}}var F=sap.ui.getCore().byId(E.relatedControlId);if(!(i&&F&&q.sap.containsOrEquals(i.getDomRef(),F.getFocusDomRef()))){I.prototype.onsapfocusleave.apply(this,arguments);}this.bValueHelpRequested=false;};s.prototype.onmousedown=function(E){var i=this._oSuggestionPopup;if((i instanceof P)&&i.isOpen()){E.stopPropagation();}};s.prototype._deregisterEvents=function(){if(this._sPopupResizeHandler){R.deregister(this._sPopupResizeHandler);this._sPopupResizeHandler=null;}if(this._bUseDialog&&this._oSuggestionPopup){this.$().off("click");}};s.prototype.updateSuggestionItems=function(){this._bSuspendInvalidate=true;this.updateAggregation("suggestionItems");this._bShouldRefreshListItems=true;this._refreshItemsDelayed();this._bSuspendInvalidate=false;return this;};s.prototype.invalidate=function(){if(!this._bSuspendInvalidate){j.prototype.invalidate.apply(this,arguments);}};s.prototype.cancelPendingSuggest=function(){if(this._iSuggestDelay){q.sap.clearDelayedCall(this._iSuggestDelay);this._iSuggestDelay=null;}};s.prototype._triggerSuggest=function(v){this.cancelPendingSuggest();this._bShouldRefreshListItems=true;if(!v){v="";}if(v.length>=this.getStartSuggestion()){this._iSuggestDelay=q.sap.delayedCall(300,this,function(){if(this._sPrevSuggValue!==v){this._bBindingUpdated=false;this.fireSuggest({suggestValue:v});if(!this._bBindingUpdated){this._refreshItemsDelayed();}this._sPrevSuggValue=v;}});}else if(this._bUseDialog){if(this._oList instanceof T){this._oList.addStyleClass("sapMInputSuggestionTableHidden");}else if(this._oList&&this._oList.destroyItems){this._oList.destroyItems();}}else if(this._oSuggestionPopup&&this._oSuggestionPopup.isOpen()){q.sap.delayedCall(0,this,function(){var N=this.getDOMValue()||'';if(N<this.getStartSuggestion()){this._iPopupListSelectedIndex=-1;this._closeSuggestionPopup();}});}};(function(){s.prototype.setShowSuggestion=function(V){this.setProperty("showSuggestion",V,true);this._iPopupListSelectedIndex=-1;if(V){this._lazyInitializeSuggestionPopup(this);}else{v(this);}return this;};s.prototype.setShowTableSuggestionValueHelp=function(V){this.setProperty("showTableSuggestionValueHelp",V,true);if(!this._oSuggestionPopup){return this;}if(V){this._addShowMoreButton();}else{this._removeShowMoreButton();}return this;};s.prototype._getShowMoreButton=function(){var i=this,M=this._oRb;return this._oShowMoreButton||(this._oShowMoreButton=new sap.m.Button({text:M.getText("INPUT_SUGGESTIONS_SHOW_ALL"),press:function(){if(i.getShowTableSuggestionValueHelp()){i.fireValueHelpRequest({fromSuggestions:true});i._iPopupListSelectedIndex=-1;i._closeSuggestionPopup();}}}));};s.prototype._getButtonToolbar=function(){var i=this._getShowMoreButton();return this._oButtonToolbar||(this._oButtonToolbar=new d({content:[new e(),i]}));};s.prototype._addShowMoreButton=function(i){if(!this._oSuggestionPopup||!i&&!this._hasTabularSuggestions()){return;}if(this._oSuggestionPopup instanceof D){var y=this._getShowMoreButton();this._oSuggestionPopup.setEndButton(y);}else{var z=this._getButtonToolbar();this._oSuggestionPopup.setFooter(z);}};s.prototype._removeShowMoreButton=function(){if(!this._oSuggestionPopup||!this._hasTabularSuggestions()){return;}if(this._oSuggestionPopup instanceof D){this._oSuggestionPopup.setEndButton(null);}else{this._oSuggestionPopup.setFooter(null);}};s.prototype.oninput=function(E){I.prototype.oninput.call(this,E);if(E.isMarked("invalid")){return;}var i=this.getDOMValue();if(this.getValueLiveUpdate()){this.setProperty("value",i,true);this._onValueUpdated(i);}this.fireLiveChange({value:i,newValue:i});if(this.getShowSuggestion()&&!this._bUseDialog){this._triggerSuggest(i);}};s.prototype.getValue=function(){return this.getDomRef("inner")&&this._$input?this.getDOMValue():this.getProperty("value");};s.prototype._refreshItemsDelayed=function(){q.sap.clearDelayedCall(this._iRefreshListTimeout);this._iRefreshListTimeout=q.sap.delayedCall(0,this,x,[this]);};s.prototype.addSuggestionItem=function(i){this.addAggregation("suggestionItems",i,true);this._bShouldRefreshListItems=true;this._refreshItemsDelayed();u(this);return this;};s.prototype.insertSuggestionItem=function(i,y){this.insertAggregation("suggestionItems",y,i,true);this._bShouldRefreshListItems=true;this._refreshItemsDelayed();u(this);return this;};s.prototype.removeSuggestionItem=function(i){var y=this.removeAggregation("suggestionItems",i,true);this._bShouldRefreshListItems=true;this._refreshItemsDelayed();return y;};s.prototype.removeAllSuggestionItems=function(){var i=this.removeAllAggregation("suggestionItems",true);this._bShouldRefreshListItems=true;this._refreshItemsDelayed();return i;};s.prototype.destroySuggestionItems=function(){this.destroyAggregation("suggestionItems",true);this._bShouldRefreshListItems=true;this._refreshItemsDelayed();return this;};s.prototype.addSuggestionRow=function(i){i.setType(o.Active);this.addAggregation("suggestionRows",i);this._bShouldRefreshListItems=true;this._refreshItemsDelayed();u(this);return this;};s.prototype.insertSuggestionRow=function(i,y){i.setType(o.Active);this.insertAggregation("suggestionRows",y,i);this._bShouldRefreshListItems=true;this._refreshItemsDelayed();u(this);return this;};s.prototype.removeSuggestionRow=function(i){var y=this.removeAggregation("suggestionRows",i);this._bShouldRefreshListItems=true;this._refreshItemsDelayed();return y;};s.prototype.removeAllSuggestionRows=function(){var i=this.removeAllAggregation("suggestionRows");this._bShouldRefreshListItems=true;this._refreshItemsDelayed();return i;};s.prototype.destroySuggestionRows=function(){this.destroyAggregation("suggestionRows");this._bShouldRefreshListItems=true;this._refreshItemsDelayed();return this;};s.prototype.bindAggregation=function(){if(arguments[0]==="suggestionRows"||arguments[0]==="suggestionColumns"||arguments[0]==="suggestionItems"){u(this,arguments[0]==="suggestionRows"||arguments[0]==="suggestionColumns");this._bBindingUpdated=true;}return I.prototype.bindAggregation.apply(this,arguments);};s.prototype._lazyInitializeSuggestionPopup=function(){if(!this._oSuggestionPopup){t(this);}};s.prototype._closeSuggestionPopup=function(){if(this._oSuggestionPopup){this._bShouldRefreshListItems=false;this.cancelPendingSuggest();this._oSuggestionPopup.close();if(!this._bUseDialog&&this.$().hasClass("sapMInputFocused")){this.openValueStateMessage();}this.$("SuggDescr").text("");this.$("inner").removeAttr("aria-haspopup");this.$("inner").removeAttr("aria-activedescendant");this._sPrevSuggValue=null;}};function t(i){var M=i._oRb;if(i._bUseDialog){i._oPopupInput=new s(i.getId()+"-popup-input",{width:"100%",valueLiveUpdate:true,showValueHelp:i.getShowValueHelp(),valueHelpRequest:function(E){i.fireValueHelpRequest({fromSuggestions:true});i._iPopupListSelectedIndex=-1;i._closeSuggestionPopup();},liveChange:function(E){var V=E.getParameter("newValue");i.setDOMValue(i._getInputValue(i._oPopupInput.getValue()));i._triggerSuggest(V);i.fireLiveChange({value:V,newValue:V});}}).addStyleClass("sapMInputSuggInDialog");}i._oSuggestionPopup=!i._bUseDialog?(new P(i.getId()+"-popup",{showArrow:false,showHeader:false,placement:n.Vertical,initialFocus:i,horizontalScrolling:true}).attachAfterClose(function(){i._updateSelectionFromList();if(i._oList instanceof T){i._oList.removeSelections(true);}else{i._oList.destroyItems();}i._shouldResizePopup=false;}).attachBeforeOpen(function(){i._sBeforeSuggest=i.getValue();})):(new D(i.getId()+"-popup",{beginButton:new sap.m.Button(i.getId()+"-popup-closeButton",{text:M.getText("MSGBOX_CLOSE"),press:function(){i._closeSuggestionPopup();}}),stretch:i._bFullScreen,contentHeight:i._bFullScreen?undefined:"20rem",customHeader:new B(i.getId()+"-popup-header",{contentMiddle:i._oPopupInput.addEventDelegate({onsapenter:function(){if(!(sap.m.MultiInput&&i instanceof sap.m.MultiInput)){i._closeSuggestionPopup();}}},this)}),horizontalScrolling:false,initialFocus:i._oPopupInput}).attachBeforeOpen(function(){i._oPopupInput.setPlaceholder(i.getPlaceholder());i._oPopupInput.setMaxLength(i.getMaxLength());}).attachBeforeClose(function(){i.setDOMValue(i._getInputValue(i._oPopupInput.getValue()));i.onChange();if(i instanceof sap.m.MultiInput&&i._bUseDialog){i._onDialogClose();}}).attachAfterClose(function(){if(i instanceof sap.m.MultiInput&&i._isMultiLineMode){i._showIndicator();}if(i._oList){if(T&&!(i._oList instanceof T)){i._oList.destroyItems();}else{i._oList.removeSelections(true);}}}).attachAfterOpen(function(){var V=i.getValue();i._oPopupInput.setValue(V);i._triggerSuggest(V);x(i);}));i._oSuggestionPopup.addStyleClass("sapMInputSuggestionPopup");i._oSuggestionPopup.addAriaLabelledBy(g.getStaticId("sap.m","INPUT_AVALIABLE_VALUES"));i.addDependent(i._oSuggestionPopup);if(!i._bUseDialog){w(i._oSuggestionPopup,i);}if(i._oList){i._oSuggestionPopup.addContent(i._oList);}if(i.getShowTableSuggestionValueHelp()){i._addShowMoreButton();}}function u(i,y){if(i._bIsBeingDestroyed||i._oList){return;}if(!i._hasTabularSuggestions()&&!y){i._oList=new L(i.getId()+"-popup-list",{showNoData:false,mode:m.SingleSelectMaster,rememberSelections:false,itemPress:function(E){var F=E.getParameter("listItem");i.setSelectionItem(F._oItem,true);}});i._oList.addEventDelegate({onAfterRendering:i._highlightListText.bind(i)});}else{if(i._fnFilter===s._DEFAULTFILTER){i._fnFilter=s._DEFAULTFILTER_TABULAR;}if(!i._fnRowResultFilter){i._fnRowResultFilter=s._DEFAULTRESULT_TABULAR;}i._oList=i._getSuggestionsTable();if(i.getShowTableSuggestionValueHelp()){i._addShowMoreButton(y);}}if(i._oSuggestionPopup){if(i._bUseDialog){i._oSuggestionPopup.addAggregation("content",i._oList,true);var z=i._oSuggestionPopup.$("scrollCont")[0];if(z){var A=sap.ui.getCore().createRenderManager();A.renderControl(i._oList);A.flush(z);A.destroy();}}else{i._oSuggestionPopup.addContent(i._oList);}}}function v(i){if(i._oSuggestionPopup){if(i._oList instanceof T){i._oSuggestionPopup.removeAllContent();i._removeShowMoreButton();}i._oSuggestionPopup.destroy();i._oSuggestionPopup=null;}if(i._oList instanceof L){i._oList.destroy();i._oList=null;}}function w(i,y){i.open=function(){this.openBy(y,false,true);};i.oPopup.setAnimations(function($,z,O){O();},function($,z,A){A();});}function x(y){var z=y.getShowSuggestion();var A=y._oRb;y._iPopupListSelectedIndex=-1;if(!z||!y._bShouldRefreshListItems||!y.getDomRef()||(!y._bUseDialog&&!y.$().hasClass("sapMInputFocused"))){return false;}var E,F=y.getSuggestionItems(),G=y.getSuggestionRows(),H=y.getDOMValue()||"",J=y._oList,K=y.getFilterSuggests(),M=[],N=0,O=y._oSuggestionPopup,Q={ontouchstart:function(X){(X.originalEvent||X)._sapui_cancelAutoClose=true;}},U,i;if(y._oList){if(y._oList instanceof T){J.removeSelections(true);}else{J.destroyItems();}}if(H.length<y.getStartSuggestion()){if(!y._bUseDialog){y._iPopupListSelectedIndex=-1;this.cancelPendingSuggest();O.close();}else{if(y._hasTabularSuggestions()&&y._oList){y._oList.addStyleClass("sapMInputSuggestionTableHidden");}}y.$("SuggDescr").text("");y.$("inner").removeAttr("aria-haspopup");y.$("inner").removeAttr("aria-activedescendant");return false;}if(y._hasTabularSuggestions()){if(y._bUseDialog&&y._oList){y._oList.removeStyleClass("sapMInputSuggestionTableHidden");}for(i=0;i<G.length;i++){if(!K||y._fnFilter(H,G[i])){G[i].setVisible(true);M.push(G[i]);}else{G[i].setVisible(false);}}y._oSuggestionTable.invalidate();}else{var V=(F[0]instanceof c?true:false);for(i=0;i<F.length;i++){E=F[i];if(!K||y._fnFilter(H,E)){if(V){U=new b(E.getId()+"-dli");U.setLabel(E.getText());U.setValue(E.getAdditionalText());}else{U=new S(E.getId()+"-sli");U.setTitle(E.getText());}U.setType(E.getEnabled()?o.Active:o.Inactive);U._oItem=E;U.addEventDelegate(Q);M.push(U);}}}N=M.length;var W="";if(N>0){if(N==1){W=A.getText("INPUT_SUGGESTIONS_ONE_HIT");}else{W=A.getText("INPUT_SUGGESTIONS_MORE_HITS",N);}y.$("inner").attr("aria-haspopup","true");if(!y._hasTabularSuggestions()){for(i=0;i<N;i++){J.addItem(M[i]);}}if(!y._bUseDialog){if(y._sCloseTimer){clearTimeout(y._sCloseTimer);y._sCloseTimer=null;}if(!O.isOpen()&&!y._sOpenTimer&&(this.getValue().length>=this.getStartSuggestion())){y._sOpenTimer=setTimeout(function(){y._resizePopup(true);y._sOpenTimer=null;O.open();},0);}}}else{W=A.getText("INPUT_SUGGESTIONS_NO_HIT");y.$("inner").removeAttr("aria-haspopup");y.$("inner").removeAttr("aria-activedescendant");if(!y._bUseDialog){if(O.isOpen()){y._sCloseTimer=setTimeout(function(){y._iPopupListSelectedIndex=-1;y.cancelPendingSuggest();O.close();},0);}}else{if(y._hasTabularSuggestions()&&y._oList){y._oList.addStyleClass("sapMInputSuggestionTableHidden");}}}y.$("SuggDescr").text(W);}})();s.prototype._createHighlightedText=function(i){var t=i.innerText,v=this.getValue().toLowerCase(),u=v.length,w=t.toLowerCase(),x,y='';if(!s._wordStartsWithValue(t,v)){return q.sap.encodeHTML(t);}var z=w.indexOf(v);if(z>0){z=w.indexOf(' '+v)+1;}if(z>-1){y+=q.sap.encodeHTML(t.substring(0,z));x=t.substring(z,z+u);y+='<span class="sapMInputHighlight">'+q.sap.encodeHTML(x)+'</span>';y+=q.sap.encodeHTML(t.substring(z+u));}else{y=q.sap.encodeHTML(t);}return y;};s.prototype._highlightListText=function(){if(!this.getEnableSuggestionsHighlighting()){return;}var i,t,u=this._oList.$().find('.sapMDLILabel, .sapMSLITitleOnly, .sapMDLIValue');for(i=0;i<u.length;i++){t=u[i];t.innerHTML=this._createHighlightedText(t);}};s.prototype._highlightTableText=function(){if(!this.getEnableSuggestionsHighlighting()){return;}var i,t,u=this._oSuggestionTable.$().find('tbody .sapMLabel');for(i=0;i<u.length;i++){t=u[i];t.innerHTML=this._createHighlightedText(t);}};s.prototype.onfocusin=function(E){I.prototype.onfocusin.apply(this,arguments);this.$().addClass("sapMInputFocused");if(!this._bUseDialog&&this._oSuggestionPopup&&this._oSuggestionPopup.isOpen()){this.closeValueStateMessage();}if(!this._bPopupHasFocus&&!this.getStartSuggestion()&&!this.getValue()){this._triggerSuggest(this.getValue());}this._bPopupHasFocus=undefined;this._sPrevSuggValue=null;};s.prototype.onsapshow=function(E){if(!this.getEnabled()||!this.getEditable()||!this.getShowValueHelp()){return;}this.bValueHelpRequested=true;this.fireValueHelpRequest({fromSuggestions:false});E.preventDefault();E.stopPropagation();};s.prototype.onsaphide=s.prototype.onsapshow;s.prototype.onsapselect=function(E){this._fireValueHelpRequestForValueHelpOnly();};s.prototype.onfocusout=function(E){I.prototype.onfocusout.apply(this,arguments);this.$().removeClass("sapMInputFocused");this.closeValueStateMessage(this);};s.prototype._hasTabularSuggestions=function(){return!!(this.getAggregation("suggestionColumns")&&this.getAggregation("suggestionColumns").length);};s.prototype._getSuggestionsTable=function(){if(this._bIsBeingDestroyed){return;}var t=this;if(!this._oSuggestionTable){this._oSuggestionTable=new T(this.getId()+"-popup-table",{mode:m.SingleSelectMaster,showNoData:false,showSeparators:"All",width:"100%",enableBusyIndicator:false,rememberSelections:false,selectionChange:function(E){var i=E.getParameter("listItem");t.setSelectionRow(i,true);}});this._oSuggestionTable.addEventDelegate({onAfterRendering:this._highlightTableText.bind(this)});if(this._bUseDialog){this._oSuggestionTable.addStyleClass("sapMInputSuggestionTableHidden");}this._oSuggestionTable.updateItems=function(){T.prototype.updateItems.apply(this,arguments);t._refreshItemsDelayed();return this;};}return this._oSuggestionTable;};s.prototype._fireSuggestionItemSelectedEvent=function(){if(this._iPopupListSelectedIndex>=0){var i=this._oList.getItems()[this._iPopupListSelectedIndex];if(i){if(C&&i instanceof C){this.fireSuggestionItemSelected({selectedRow:i});}else{this.fireSuggestionItemSelected({selectedItem:i._oItem});}}this._iPopupListSelectedIndex=-1;}};s.prototype.clone=function(){var i=j.prototype.clone.apply(this,arguments),t;t=this.getBindingInfo("suggestionColumns");if(t){i.bindAggregation("suggestionColumns",q.extend({},t));}else{this.getSuggestionColumns().forEach(function(u){i.addSuggestionColumn(u.clone(),true);});}t=this.getBindingInfo("suggestionRows");if(t){i.bindAggregation("suggestionRows",q.extend({},t));}else{this.getSuggestionRows().forEach(function(u){i.addSuggestionRow(u.clone(),true);});}i.setRowResultFunction(this._fnRowResultFilter);return i;};s.prototype.setValue=function(v){this._iSetCount++;I.prototype.setValue.call(this,v);this._onValueUpdated(v);return this;};s.prototype.setDOMValue=function(v){this._$input.val(v);};s.prototype.getDOMValue=function(){return this._$input.val();};s.prototype.updateInputField=function(N){if(this._oSuggestionPopup&&this._oSuggestionPopup.isOpen()&&this._bUseDialog){this._oPopupInput.setValue(N);this._oPopupInput._doSelect();}else{N=this._getInputValue(N);this.setDOMValue(N);this.onChange(null,null,N);}};s.prototype.getAccessibilityInfo=function(){var i=I.prototype.getAccessibilityInfo.apply(this,arguments);i.description=((i.description||"")+" "+this.getDescription()).trim();return i;};s.prototype.preventChangeOnFocusLeave=function(E){return this.bFocusoutDueRendering||this.bValueHelpRequested;};return s;});
