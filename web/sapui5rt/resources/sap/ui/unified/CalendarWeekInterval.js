/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/unified/calendar/CalendarUtils','sap/ui/unified/calendar/CalendarDate','./library','sap/ui/unified/CalendarDateInterval','sap/ui/unified/CalendarDateIntervalRenderer'],function(C,a,l,b,c){"use strict";var d=b.extend("sap.ui.unified.CalendarWeekInterval",{renderer:c});d.prototype._getDaysLarge=function(){return 6;};d.prototype._handleFocus=function(e){var o=!!e.getParameter("_outsideBorder"),D,f,g;if(o){D=e.getParameter("date");this._oFocusDateWeek=a.fromLocalJSDate(D);f=C._getFirstDateOfWeek(this._oFocusDateWeek);g=this.getAggregation("month")[0];if(g.getDomRef()){this._setStartDate(f,false,true);}}return b.prototype._handleFocus.apply(this,arguments);};d.prototype._focusDateExtend=function(D,o,n){var e,L;if(!this._oFocusDateWeek){return b.prototype._focusDateExtend.apply(this,arguments);}e=this.getAggregation("month")[0];L=this._oFocusDateWeek.toLocalJSDate();this._setFocusedDate(this._oFocusDateWeek);e.setDate(L);this._oFocusDateWeek=null;return!n;};d.prototype._dateMatchesVisibleRange=function(D){var i=this.getDays(),o=a.fromLocalJSDate(D),s=a.fromLocalJSDate(this.getStartDate()),e=a.fromLocalJSDate(this.getStartDate());e.setDate(e.getDate()+i);return o.isSameOrAfter(s)&&o.isBefore(e);};d.prototype._showCalendarPicker=function(){var o=this._getFocusedDate(),e=this._getStartDate(),f=this._getCalendarPicker(),s=new sap.ui.unified.DateRange(),g;g=new a(e);g.setDate(g.getDate()+this._getDays()-1);s.setStartDate(e.toLocalJSDate());s.setEndDate(g.toLocalJSDate());f.displayDate(o.toLocalJSDate(),false);f.removeAllSelectedDates();f.addSelectedDate(s);f.setMinDate(this.getMinDate());f.setMaxDate(this.getMaxDate());this._openPickerPopup(f);this._showOverlay();};d.prototype._handleCalendarPickerDateSelect=function(e){var o=this._getCalendarPicker(),f=o._getFocusedDate(),F;if(this._dateMatchesVisibleRange(f.toLocalJSDate())){this._oFocusDateWeek=o._getFocusedDate();this._focusDate(this._oFocusDateWeek,false,true);}else{F=C._getFirstDateOfWeek(f);this._setStartDate(F);this._oFocusDateWeek=o._getFocusedDate();this._focusDate(this._oFocusDateWeek,false,true);}this._closeCalendarPicker(true);};return d;});
