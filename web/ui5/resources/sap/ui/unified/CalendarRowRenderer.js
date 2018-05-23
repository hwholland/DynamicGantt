/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/date/UniversalDate'],function(q,U){"use strict";var C={};C.render=function(r,R){var t=R.getTooltip_AsString();r.write("<div");r.writeControlData(R);r.addClass("sapUiCalendarRow");if(!sap.ui.Device.system.phone&&R.getAppointmentsReducedHeight()){r.addClass("sapUiCalendarRowAppsRedHeight");}if(R._sFocusedAppointmentId){r.writeAttribute("tabindex","-1");}else{r.writeAttribute("tabindex","0");}if(t){r.writeAttributeEscaped("title",t);}var w=R.getWidth();if(w){r.addStyle("width",w);}var h=R.getHeight();if(h){r.addStyle("height",h);}r.writeAccessibilityState(R);r.writeClasses();r.writeStyles();r.write(">");this.renderAppointmentsRow(r,R);r.write("</div>");};C.renderAppointmentsRow=function(r,R){r.write("<div id=\""+R.getId()+"-Apps\" class=\"sapUiCalendarRowApps\">");this.renderAppointments(r,R);r.write("</div>");};C.renderAppointments=function(r,R){var a=R._getVisibleAppointments();var I=R._getVisibleIntervalHeaders();var s=R._getStartDate();var n=[];var S=0;var N=0;var b=[];var c=0;var d=0;var e=R.getIntervals();var f=R.getIntervalType();var w=100/e;var i=0;var o=new U(s);var F=false;var l=false;switch(f){case sap.ui.unified.CalendarIntervalType.Hour:n=R.getNonWorkingHours()||[];S=s.getUTCHours();N=24;break;case sap.ui.unified.CalendarIntervalType.Day:n=R._getNonWorkingDays();S=s.getUTCDay();N=7;b=R.getNonWorkingHours()||[];c=s.getUTCHours();d=24;break;case sap.ui.unified.CalendarIntervalType.Month:b=R._getNonWorkingDays();c=s.getUTCDay();d=7;break;default:break;}for(i=0;i<e;i++){if(l){F=true;}else{F=false;}l=false;switch(f){case sap.ui.unified.CalendarIntervalType.Hour:o.setUTCHours(o.getUTCHours()+1);if(o.getUTCHours()==0){l=true;}break;case sap.ui.unified.CalendarIntervalType.Day:o.setUTCDate(o.getUTCDate()+1);if(o.getUTCDate()==1){l=true;}break;case sap.ui.unified.CalendarIntervalType.Month:o.setUTCMonth(o.getUTCMonth()+1);if(o.getUTCMonth()==0){l=true;}break;default:break;}this.renderInterval(r,R,i,w,I,n,S,N,b,c,d,F,l);}r.write("<div id=\""+R.getId()+"-Now\" class=\"sapUiCalendarRowNow\"></div>");for(i=0;i<a.length;i++){var A=a[i];this.renderAppointment(r,R,A);}r.write("<div id=\""+R.getId()+"-DummyApp\" class=\"sapUiCalendarApp sapUiCalendarAppTitleOnly sapUiCalendarAppDummy\"></div>");};C.renderInterval=function(r,R,I,w,a,n,s,N,b,S,c,f,l){var d=R.getId()+"-AppsInt"+I;var i=0;var m;var e=R.getShowIntervalHeaders()&&(R.getShowEmptyIntervalHeaders()||a.length>0);if(e){for(i=0;i<a.length;i++){var o=a[i];if(o.interval==I){m=o;break;}}}r.write("<div id=\""+d+"\"");r.addClass("sapUiCalendarRowAppsInt");r.addStyle("width",w+"%");for(i=0;i<n.length;i++){if((I+s)%N==n[i]){r.addClass("sapUiCalendarRowAppsNoWork");break;}}if(!e){r.addClass("sapUiCalendarRowAppsIntNoHead");}if(f){r.addClass("sapUiCalendarRowAppsIntFirst");}if(l){r.addClass("sapUiCalendarRowAppsIntLast");}r.writeClasses();r.writeStyles();r.write(">");if(e){r.write("<div");r.addClass("sapUiCalendarRowAppsIntHead");if(m){if(m.first){r.writeElementData(m.appointment);d=m.appointment.getId();r.addClass("sapUiCalendarRowAppsIntHeadFirst");}else{d=m.appointment.getId()+"-"+I;r.writeAttribute("id",d);}if(m.appointment.getSelected()){r.addClass("sapUiCalendarRowAppsIntHeadSel");}if(m.appointment.getTentative()){r.addClass("sapUiCalendarRowAppsIntHeadTent");}var t=m.appointment.getTooltip_AsString();if(t){r.writeAttributeEscaped("title",t);}var T=m.appointment.getType();if(T&&T!=sap.ui.unified.CalendarDayType.None){r.addClass("sapUiCalendarRowAppsIntHead"+T);}}r.writeClasses();r.write(">");if(m&&m.first){var g=m.appointment.getIcon();if(g){var h=["sapUiCalendarRowAppsIntHeadIcon"];var A={};A["id"]=d+"-Icon";A["title"]=null;r.writeIcon(g,h,A);}var k=m.appointment.getTitle();if(k){r.write("<span");r.writeAttribute("id",d+"-Title");r.addClass("sapUiCalendarRowAppsIntHeadTitle");r.writeClasses();r.write(">");r.writeEscaped(k,true);r.write("</span>");}var p=m.appointment.getText();if(p){r.write("<span");r.writeAttribute("id",d+"-Text");r.addClass("sapUiCalendarRowAppsIntHeadText");r.writeClasses();r.write(">");r.writeEscaped(p,true);r.write("</span>");}}r.write("</div>");}if(R.getShowSubIntervals()){var u=R.getIntervalType();var v=0;switch(u){case sap.ui.unified.CalendarIntervalType.Hour:v=4;break;case sap.ui.unified.CalendarIntervalType.Day:v=24;break;case sap.ui.unified.CalendarIntervalType.Month:var x=R._getStartDate();var y=new U(x);y.setUTCMonth(y.getUTCMonth()+I+1,0);v=y.getUTCDate();y.setUTCDate(1);s=y.getUTCDay();break;default:break;}var z=100/v;for(i=0;i<v;i++){r.write("<div");r.addClass("sapUiCalendarRowAppsSubInt");r.addStyle("width",z+"%");for(var j=0;j<b.length;j++){if((i+S)%c==b[j]){r.addClass("sapUiCalendarRowAppsNoWork");break;}}r.writeStyles();r.writeClasses();r.write(">");r.write("</div>");}}r.write("</div>");};C.renderAppointment=function(r,R,a){var A=a.appointment;var t=A.getTooltip_AsString();var T=A.getType();var s=A.getTitle();var b=A.getText();var i=A.getIcon();var I=A.getId();r.write("<div");r.writeElementData(A);r.addClass("sapUiCalendarApp");if(A.getSelected()){r.addClass("sapUiCalendarAppSel");}if(A.getTentative()){r.addClass("sapUiCalendarAppTent");}if(!b){r.addClass("sapUiCalendarAppTitleOnly");}if(i){r.addClass("sapUiCalendarAppWithIcon");}if(R._bRTL){r.addStyle("right",a.begin+"%");r.addStyle("left",a.end+"%");}else{r.addStyle("left",a.begin+"%");r.addStyle("right",a.end+"%");}r.writeAttribute("data-sap-level",a.level);if(R._sFocusedAppointmentId==I){r.writeAttribute("tabindex","0");}else{r.writeAttribute("tabindex","-1");}if(t){r.writeAttributeEscaped("title",t);}if(T&&T!=sap.ui.unified.CalendarDayType.None){r.addClass("sapUiCalendarApp"+T);}r.writeAccessibilityState(A);r.writeClasses();r.writeStyles();r.write(">");r.write("<div");r.addClass("sapUiCalendarAppCont");r.writeClasses();r.write(">");if(i){var c=["sapUiCalendarAppIcon"];var m={};m["id"]=I+"-Icon";m["title"]=null;r.writeIcon(i,c,m);}if(s){r.write("<span");r.writeAttribute("id",I+"-Title");r.addClass("sapUiCalendarAppTitle");r.writeClasses();r.write(">");r.writeEscaped(s,true);r.write("</span>");}if(b){r.write("<span");r.writeAttribute("id",I+"-Text");r.addClass("sapUiCalendarAppText");r.writeClasses();r.write(">");r.writeEscaped(b,true);r.write("</span>");}r.write("</div>");r.write("</div>");};return C;},true);
