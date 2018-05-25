/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/Device','./InputBase','./DateTimeField','sap/ui/core/date/UniversalDate','./library','sap/ui/core/Control','sap/ui/core/library',"./DatePickerRenderer"],function(q,D,I,a,U,l,C,c,b){"use strict";var T=c.TextAlign;var d=c.CalendarType;var e;var f=a.extend("sap.m.DatePicker",{metadata:{library:"sap.m",properties:{displayFormatType:{type:"string",group:"Appearance",defaultValue:""},secondaryCalendarType:{type:"sap.ui.core.CalendarType",group:"Appearance",defaultValue:null},minDate:{type:"object",group:"Misc",defaultValue:null},maxDate:{type:"object",group:"Misc",defaultValue:null}},aggregations:{specialDates:{type:"sap.ui.core.Element",multiple:true,singularName:"specialDate"}},associations:{legend:{type:"sap.ui.core.Control",multiple:false}},events:{navigate:{parameters:{dateRange:{type:"sap.ui.unified.DateRange"}}}},designtime:"sap/m/designtime/DatePicker.designtime"}});f.prototype.init=function(){I.prototype.init.apply(this,arguments);this._bIntervalSelection=false;this._bOnlyCalendar=true;this._bValid=true;this._oMinDate=new Date(1,0,1);this._oMinDate.setFullYear(1);this._oMaxDate=new Date(9999,11,31,23,59,59,999);};f.prototype.exit=function(){I.prototype.exit.apply(this,arguments);if(this._oPopup){if(this._oPopup.isOpen()){this._oPopup.close();}delete this._oPopup;}if(this._oCalendar){this._oCalendar.destroy();delete this._oCalendar;}if(this._iInvalidateCalendar){q.sap.clearDelayedCall(this._iInvalidateCalendar);}this._sUsedDisplayPattern=undefined;this._sUsedDisplayCalendarType=undefined;this._oDisplayFormat=undefined;this._sUsedValuePattern=undefined;this._sUsedValueCalendarType=undefined;this._oValueFormat=undefined;};f.prototype.invalidate=function(O){if(!O||O!=this._oCalendar){C.prototype.invalidate.apply(this,arguments);this._iInvalidateCalendar=q.sap.delayedCall(0,this,o);}};f.prototype.onBeforeRendering=function(){I.prototype.onBeforeRendering.apply(this,arguments);this._checkMinMaxDate();};f.prototype.setWidth=function(w){return I.prototype.setWidth.call(this,w||"100%");};f.prototype.getWidth=function(w){return this.getProperty("width")||"100%";};f.prototype.applyFocusInfo=function(F){this._bFocusNoPopup=true;I.prototype.applyFocusInfo.apply(this,arguments);};f.prototype.onfocusin=function(E){if(!q(E.target).hasClass("sapUiIcon")){I.prototype.onfocusin.apply(this,arguments);}this._bFocusNoPopup=undefined;};f.prototype.onsapshow=function(E){g.call(this);E.preventDefault();};f.prototype.onsaphide=f.prototype.onsapshow;f.prototype.onsappageup=function(E){i.call(this,1,"day");E.preventDefault();};f.prototype.onsappageupmodifiers=function(E){if(!E.ctrlKey&&E.shiftKey){i.call(this,1,"month");}else{i.call(this,1,"year");}E.preventDefault();};f.prototype.onsappagedown=function(E){i.call(this,-1,"day");E.preventDefault();};f.prototype.onsappagedownmodifiers=function(E){if(!E.ctrlKey&&E.shiftKey){i.call(this,-1,"month");}else{i.call(this,-1,"year");}E.preventDefault();};f.prototype.onkeypress=function(E){if(!E.charCode||E.metaKey||E.ctrlKey){return;}var F=this._getFormatter(true);var s=String.fromCharCode(E.charCode);if(s&&F.sAllowedCharacters&&F.sAllowedCharacters.indexOf(s)<0){E.preventDefault();}};f.prototype.onclick=function(E){if(q(E.target).hasClass("sapUiIcon")){g.call(this);}};f.prototype._dateValidation=function(p){this._bValid=true;if(p&&(p.getTime()<this._oMinDate.getTime()||p.getTime()>this._oMaxDate.getTime())){this._bValid=false;}this.setProperty("dateValue",p);return p;};f.prototype.setMinDate=function(p){if(this._isValidDate(p)){throw new Error("Date must be a JavaScript date object; "+this);}if(q.sap.equal(this.getMinDate(),p)){return this;}if(p){var y=p.getFullYear();if(y<1||y>9999){throw new Error("Date must be between 0001-01-01 and 9999-12-31; "+this);}this._oMinDate=new Date(p.getTime());var r=this.getDateValue();if(r&&r.getTime()<p.getTime()){q.sap.log.warning("DateValue not in valid date range",this);}}else{this._oMinDate=new Date(1,0,1);this._oMinDate.setFullYear(1);}this.setProperty("minDate",p);if(this._oCalendar){this._oCalendar.setMinDate(p);}this._oMinDate.setHours(0,0,0,0);return this;};f.prototype.setMaxDate=function(p){if(this._isValidDate(p)){throw new Error("Date must be a JavaScript date object; "+this);}if(q.sap.equal(this.getMaxDate(),p)){return this;}if(p){var y=p.getFullYear();if(y<1||y>9999){throw new Error("Date must be between 0001-01-01 and 9999-12-31; "+this);}this._oMaxDate=new Date(p.getTime());var r=this.getDateValue();if(r&&r.getTime()>p.getTime()){q.sap.log.warning("DateValue not in valid date",this);}}else{this._oMaxDate=new Date(9999,11,31,23,59,59,999);}this.setProperty("maxDate",p);if(this._oCalendar){this._oCalendar.setMaxDate(p);}this._oMaxDate.setHours(23,59,59,999);return this;};f.prototype._checkMinMaxDate=function(){if(this._oMinDate.getTime()>this._oMaxDate.getTime()){q.sap.log.warning("minDate > MaxDate -> dates switched",this);var M=new Date(this._oMinDate.getTime());var p=new Date(this._oMaxDate.getTime());this._oMinDate=new Date(p.getTime());this._oMaxDate=new Date(M.getTime());this.setProperty("minDate",p,true);this.setProperty("maxDate",M,true);if(this._oCalendar){this._oCalendar.setMinDate(p);this._oCalendar.setMaxDate(M);}}var r=this.getDateValue();if(r&&(r.getTime()<this._oMinDate.getTime()||r.getTime()>this._oMaxDate.getTime())){q.sap.log.error("dateValue "+r.toString()+"(value="+this.getValue()+") does not match "+"min/max date range("+this._oMinDate.toString()+" - "+this._oMaxDate.toString()+"). App. "+"developers should take care to maintain dateValue/value accordingly.",this);}};f.prototype.getDisplayFormatType=function(){return this.getProperty("displayFormatType");};f.prototype._handleDateValidation=function(p){this._bValid=true;if(!p||p.getTime()<this._oMinDate.getTime()||p.getTime()>this._oMaxDate.getTime()){this._bValid=false;q.sap.log.warning("Value can not be converted to a valid date",this);}this.setProperty("dateValue",p);};f.prototype.setDisplayFormatType=function(s){if(s){var F=false;for(var t in d){if(t==s){F=true;break;}}if(!F){throw new Error(s+" is not a valid calendar type"+this);}}this.setProperty("displayFormatType",s,true);this.setDisplayFormat(this.getDisplayFormat());return this;};f.prototype.setSecondaryCalendarType=function(s){this._bSecondaryCalendarTypeSet=true;this.setProperty("secondaryCalendarType",s,true);if(this._oCalendar){this._oCalendar.setSecondaryCalendarType(s);}return this;};f.prototype.addSpecialDate=function(s){n.call(this,s);this.addAggregation("specialDates",s,true);o.call(this);return this;};f.prototype.insertSpecialDate=function(s,p){n.call(this,s);this.insertAggregation("specialDates",s,p,true);o.call(this);return this;};f.prototype.removeSpecialDate=function(s){var r=this.removeAggregation("specialDates",s,true);o.call(this);return r;};f.prototype.removeAllSpecialDates=function(){var r=this.removeAllAggregation("specialDates",true);o.call(this);return r;};f.prototype.destroySpecialDates=function(){this.destroyAggregation("specialDates",true);o.call(this);return this;};f.prototype.setLegend=function(L){this.setAssociation("legend",L,true);var s=this.getLegend();if(s){var p=sap.ui.require("sap/ui/unified/CalendarLegend");L=sap.ui.getCore().byId(s);if(L&&!(typeof p=="function"&&L instanceof p)){throw new Error(L+" is not an sap.ui.unified.CalendarLegend. "+this);}}if(this._oCalendar){this._oCalendar.setLegend(s);}return this;};f.prototype.onChange=function(E){if(!this.getEditable()||!this.getEnabled()){return;}var v=this._$input.val();var O=this._formatValue(this.getDateValue());if(v==O&&this._bValid){return;}var p;this._bValid=true;if(v!=""){p=this._parseValue(v,true);if(!p||p.getTime()<this._oMinDate.getTime()||p.getTime()>this._oMaxDate.getTime()){this._bValid=false;p=undefined;}else{v=this._formatValue(p);}}if(this.getDomRef()&&(this._$input.val()!==v)){this._$input.val(v);this._curpos=this._$input.cursorPos();}if(p){v=this._formatValue(p,true);}if(this._lastValue!==v||(p&&this.getDateValue()&&p.getFullYear()!==this.getDateValue().getFullYear())){this._lastValue=v;this.setProperty("value",v,true);var N=this.getValue();if(this._bValid&&v==N){this.setProperty("dateValue",p,true);}v=N;if(this._oPopup&&this._oPopup.isOpen()){if(this._bValid){p=this.getDateValue();}this._oCalendar.focusDate(p);var s=this._oDateRange.getStartDate();if((!s&&p)||(s&&p&&s.getTime()!=p.getTime())){this._oDateRange.setStartDate(new Date(p.getTime()));}else if(s&&!p){this._oDateRange.setStartDate(undefined);}}this.fireChangeEvent(v,{valid:this._bValid});}};f.prototype._getInputValue=function(v){v=(typeof v=="undefined")?this._$input.val():v.toString();var p=this._parseValue(v,true);v=this._formatValue(p,true);return v;};f.prototype.updateDomValue=function(v){if(this.isActive()&&(this._$input.val()!==v)){this._bCheckDomValue=true;v=(typeof v=="undefined")?this._$input.val():v.toString();this._curpos=this._$input.cursorPos();var p=this._parseValue(v,true);v=this._formatValue(p);this._$input.val(v);this._$input.cursorPos(this._curpos);}return this;};f.prototype._storeInputSelection=function(p){if(D.browser.msie||D.browser.edge){this._oInputSelBeforePopupOpen={iStart:p.selectionStart,iEnd:p.selectionEnd};p.selectionStart=0;p.selectionEnd=0;}};f.prototype._restoreInputSelection=function(p){if(D.browser.msie||D.browser.edge){p.selectionStart=this._oInputSelBeforePopupOpen.iStart;p.selectionEnd=this._oInputSelBeforePopupOpen.iEnd;}};function _(){this._createPopup();this._createPopupContent();var s;var B=this.getBinding("value");if(B&&B.oType&&B.oType.oOutputFormat){s=B.oType.oOutputFormat.oFormatOptions.calendarType;}else if(B&&B.oType&&B.oType.oFormat){s=B.oType.oFormat.oFormatOptions.calendarType;}if(!s){s=this.getDisplayFormatType();}if(s){this._oCalendar.setPrimaryCalendarType(s);}var v=this._bValid?this._formatValue(this.getDateValue()):this.getValue();if(v!=this._$input.val()){this.onChange();}this._fillDateRange();this._openPopup();this.fireNavigate({dateRange:this._getVisibleDatesRange(this._oCalendar)});}f.prototype._createPopup=function(){if(!this._oPopup){q.sap.require("sap.ui.core.Popup");this._oPopup=new sap.ui.core.Popup();this._oPopup.setAutoClose(true);this._oPopup.setDurations(0,0);this._oPopup.attachOpened(j,this);this._oPopup.attachClosed(k,this);}};f.prototype._openPopup=function(){if(!this._oPopup){return;}this._oPopup.setAutoCloseAreas([this.getDomRef()]);var p=sap.ui.core.Popup.Dock;var A;if(this.getTextAlign()==T.End){A=p.EndBottom+"-4";this._oPopup.open(0,p.EndTop,A,this,null,"fit",true);}else{A=p.BeginBottom+"-4";this._oPopup.open(0,p.BeginTop,A,this,null,"fit",true);}};f.prototype._getVisibleDatesRange=function(p){var v=p._getVisibleDays();return new sap.ui.unified.DateRange({startDate:v[0].toLocalJSDate(),endDate:v[v.length-1].toLocalJSDate()});};f.prototype._createPopupContent=function(){if(!this._oCalendar){if(!e){sap.ui.getCore().loadLibrary("sap.ui.unified");e=sap.ui.requireSync("sap/ui/unified/Calendar");}this._oCalendar=new e(this.getId()+"-cal",{intervalSelection:this._bIntervalSelection,minDate:this.getMinDate(),maxDate:this.getMaxDate(),legend:this.getLegend(),startDateChange:function(){this.fireNavigate({dateRange:this._getVisibleDatesRange(this._oCalendar)});}.bind(this)});this._oDateRange=new sap.ui.unified.DateRange();this._oCalendar.addSelectedDate(this._oDateRange);if(this.$().closest(".sapUiSizeCompact").length>0){this._oCalendar.addStyleClass("sapUiSizeCompact");}if(this._bSecondaryCalendarTypeSet){this._oCalendar.setSecondaryCalendarType(this.getSecondaryCalendarType());}if(this._bOnlyCalendar){this._oCalendar.attachSelect(this._selectDate,this);this._oCalendar.attachCancel(h,this);this._oCalendar.attachEvent("_renderMonth",m,this);this._oCalendar.setPopupMode(true);this._oCalendar.setParent(this,undefined,true);this._oPopup.setContent(this._oCalendar);}}};f.prototype._fillDateRange=function(){var p=this.getDateValue();if(p&&p.getTime()>=this._oMinDate.getTime()&&p.getTime()<=this._oMaxDate.getTime()){this._oCalendar.focusDate(new Date(p.getTime()));if(!this._oDateRange.getStartDate()||this._oDateRange.getStartDate().getTime()!=p.getTime()){this._oDateRange.setStartDate(new Date(p.getTime()));}}else{var r=this.getInitialFocusedDateValue();var F=r?r:new Date();var M=this._oMaxDate.getTime()+86400000;if(F.getTime()<this._oMinDate.getTime()||F.getTime()>M){F=this._oMinDate;}this._oCalendar.focusDate(F);if(this._oDateRange.getStartDate()){this._oDateRange.setStartDate(undefined);}}};f.prototype.getAccessibilityInfo=function(){var r=this.getRenderer();var p=I.prototype.getAccessibilityInfo.apply(this,arguments);var v=this.getValue()||"";if(this._bValid){var s=this.getDateValue();if(s){v=this._formatValue(s);}}p.type=sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("ACC_CTR_TYPE_DATEINPUT");p.description=[v,r.getLabelledByAnnouncement(this),r.getDescribedByAnnouncement(this)].join(" ").trim();return p;};function g(){if(this.getEditable()&&this.getEnabled()){if(!this._oPopup||!this._oPopup.isOpen()){_.call(this);}else{h.call(this);}}}f.prototype._selectDate=function(E){var p=this.getDateValue();var r=this._getSelectedDate();var v="";if(!q.sap.equal(r,p)){this.setDateValue(new Date(r.getTime()));v=this.getValue();this.fireChangeEvent(v,{valid:true});if(this.getDomRef()&&(D.system.desktop||!D.support.touch)&&!q.sap.simulateMobileOnDesktop){this._curpos=this._$input.val().length;this._$input.cursorPos(this._curpos);}}else if(!this._bValid){v=this._formatValue(r);if(v!=this._$input.val()){this._bValid=true;if(this.getDomRef()){this._$input.val(v);this._lastValue=v;}this.setProperty("value",v,true);this.fireChangeEvent(v,{valid:true});}}else if((D.system.desktop||!D.support.touch)&&!q.sap.simulateMobileOnDesktop){this.focus();}this._oPopup.close();};f.prototype._getSelectedDate=function(){var s=this._oCalendar.getSelectedDates();var p;if(s.length>0){p=s[0].getStartDate();}return p;};function h(E){if(this._oPopup&&this._oPopup.isOpen()){this._oPopup.close();if((D.system.desktop||!D.support.touch)&&!q.sap.simulateMobileOnDesktop){this.focus();}}}function i(N,u){var O=this.getDateValue();var p=this._$input.cursorPos();if(O&&this.getEditable()&&this.getEnabled()){var s;var B=this.getBinding("value");if(B&&B.oType&&B.oType.oOutputFormat){s=B.oType.oOutputFormat.oFormatOptions.calendarType;}else if(B&&B.oType&&B.oType.oFormat){s=B.oType.oFormat.oFormatOptions.calendarType;}if(!s){s=this.getDisplayFormatType();}var r=U.getInstance(new Date(O.getTime()),s);O=U.getInstance(new Date(O.getTime()),s);switch(u){case"day":r.setDate(r.getDate()+N);break;case"month":r.setMonth(r.getMonth()+N);var M=(O.getMonth()+N)%12;if(M<0){M=12+M;}while(r.getMonth()!=M){r.setDate(r.getDate()-1);}break;case"year":r.setFullYear(r.getFullYear()+N);while(r.getMonth()!=O.getMonth()){r.setDate(r.getDate()-1);}break;default:break;}if(r.getTime()<this._oMinDate.getTime()){r=new U(this._oMinDate.getTime());}else if(r.getTime()>this._oMaxDate.getTime()){r=new U(this._oMaxDate.getTime());}if(!q.sap.equal(this.getDateValue(),r.getJSDate())){this.setDateValue(new Date(r.getTime()));this._curpos=p;this._$input.cursorPos(this._curpos);var v=this.getValue();this.fireChangeEvent(v,{valid:true});}}}function j(E){this._storeInputSelection(this._$input.get(0));this._renderedDays=this._oCalendar.$("-Month0-days").find(".sapUiCalItem").length;this.$("inner").attr("aria-owns",this.getId()+"-cal");this.$("inner").attr("aria-expanded",true);}function k(E){this.$("inner").attr("aria-expanded",false);this._restoreInputSelection(this._$input.get(0));}function m(E){var p=E.getParameter("days");if(p>this._renderedDays){this._renderedDays=p;this._oPopup._applyPosition(this._oPopup._oLastPosition);}}function n(s){var p=sap.ui.require("sap/ui/unified/DateTypeRange");if(s&&!(p&&s instanceof p)){throw new Error(s+"is not valid for aggregation \"specialDates\" of "+this);}}function o(){if(this._oPopup&&this._oPopup.isOpen()){this._oCalendar._bDateRangeChanged=true;this._oCalendar.invalidate();}}return f;});
