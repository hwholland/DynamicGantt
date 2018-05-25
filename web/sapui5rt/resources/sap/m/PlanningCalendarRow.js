/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/Element','sap/ui/core/Control','./StandardListItem','./StandardListItemRenderer','sap/ui/core/Renderer','./library','sap/ui/unified/library','sap/ui/unified/DateRange','sap/ui/unified/CalendarRow','sap/ui/unified/CalendarRowRenderer','sap/m/ColumnListItem','sap/m/ColumnListItemRenderer','sap/ui/core/dnd/DragDropInfo'],function(q,E,C,S,a,R,l,u,D,b,c,d,e,f){"use strict";var g=u.CalendarIntervalType;var P=E.extend("sap.m.PlanningCalendarRow",{metadata:{library:"sap.m",properties:{title:{type:"string",group:"Data"},text:{type:"string",group:"Data"},icon:{type:"sap.ui.core.URI",group:"Data",defaultValue:null},nonWorkingDays:{type:"int[]",group:"Misc",defaultValue:null},nonWorkingHours:{type:"int[]",group:"Misc",defaultValue:null},selected:{type:"boolean",group:"Data",defaultValue:false},key:{type:"string",group:"Data",defaultValue:null},enableAppointmentsDragAndDrop:{type:"boolean",group:"Misc",defaultValue:false}},aggregations:{appointments:{type:"sap.ui.unified.CalendarAppointment",multiple:true,singularName:"appointment"},intervalHeaders:{type:"sap.ui.unified.CalendarAppointment",multiple:true,singularName:"intervalHeader"},dragDropConfig:{name:"dragDropConfig",type:"sap.ui.core.dnd.DragDropBase",multiple:true},_nonWorkingDates:{type:"sap.ui.unified.DateRange",multiple:true,visibility:"hidden"}},events:{appointmentDrop:{parameters:{appointment:{type:"sap.ui.unified.CalendarAppointment"},startDate:{type:"object"},endDate:{type:"object"}}}}},applySettings:function(s,o){C.prototype.applySettings.apply(this,arguments);var i=this.getCalendarRow();if(!this.getEnableAppointmentsDragAndDrop()){return;}this.removeAllDragDropConfig();this.addDragDropConfig(new f({sourceAggregation:"appointments",targetAggregation:"_intervalPlaceholders",targetElement:i,dragStart:function(n){var H=function(){var $=i.$().find(".sapUiCalendarRowAppsOverlay");setTimeout(function(){$.addClass("sapUiCalendarRowAppsOverlayDragging");});q(document).one("dragend",function(){$.removeClass("sapUiCalendarRowAppsOverlayDragging");});};if(i._isOneMonthIntervalOnSmallSizes()){n.preventDefault();return;}H();},dragEnter:function(n){var p=n.getParameter("dragSession"),t=this.getTargetElement(),A=function(){var $=q(p.getIndicator()),r=p.dropControl.getDomRef().getBoundingClientRect(),v=sap.ui.getCore().byId(t).getDomRef().getBoundingClientRect(),w=p.draggedControl.$().outerWidth(),x=sap.ui.getCore().getConfiguration().getRTL(),y=x?Math.ceil(r.right)-v.left:v.right-Math.ceil(r.left);$.css("min-width",(w<y)?w:y).css(x?"border-left-width":"border-right-width",(w>y)?"0":"").css("margin-left",x?-($.outerWidth()-parseFloat($.context.style.width)):"");};if(i.getIntervalType()!==g.Hour){return;}if(!p.getIndicator()){setTimeout(function(){A();},0);}else{A();}},drop:function(n){var p=n.getParameter("dragSession"),A=p.draggedControl,r=i.getIntervalType(),t=i.getStartDate(),v=i.indexOfAggregation("_intervalPlaceholders",p.dropControl),w;if(r===g.Hour){w=this._calcNewHoursAppPos(t,A.getStartDate(),A.getEndDate(),v);}else if(r===g.Day||r===g.Week||(r===g.OneMonth&&!i._isOneMonthIntervalOnSmallSizes())){w=this._calcNewDaysAppPos(t,A.getStartDate(),A.getEndDate(),v);}else if(r===g.Month){w=this._calcNewMonthsAppPos(t,A.getStartDate(),A.getEndDate(),v);}q(p.getIndicator()).css("min-width","").css("border-right-width","").css("border-left-width","").css("margin-left","");i.$().find(".sapUiCalendarRowAppsOverlay").removeClass("sapUiCalendarRowAppsOverlayDragging");if(A.getStartDate().getTime()===w.startDate.getTime()){return;}this.fireAppointmentDrop({appointment:A,startDate:w.startDate,endDate:w.endDate});}.bind(this)}));}});P.PC_FOREIGN_KEY_NAME="relatedToPCDateRange";P.AGGR_NONWORKING_DATES_NAME="_nonWorkingDates";var h=S.extend("CalenderRowHeader",{metadata:{associations:{parentRow:{type:"sap.m.PlanningCalendarRow",multiple:false}}},setParentRow:function(i){this.setAssociation("parentRow",i,true);if(!i){this._oRow=undefined;}else if(typeof i=="string"){this._oRow=sap.ui.getCore().byId(i);}else{this._oRow=i;}return this;},renderer:R.extend(a)});CalenderRowHeaderRenderer.openItemTag=function(r,L){r.write("<div");};CalenderRowHeaderRenderer.closeItemTag=function(r,L){r.write("</div>");};CalenderRowHeaderRenderer.renderTabIndex=function(r,L){};var j=R.extend(c);j.getLegendItems=function(o){var t=[],L,s=o.getLegend();if(s){L=sap.ui.getCore().byId(s);if(L){t=L.getAppointmentItems?L.getAppointmentItems():L.getItems();}else{q.sap.log.error("PlanningCalendarLegend with id '"+s+"' does not exist!",o);}}return t;};j.renderBeforeAppointments=function(r,o){var n;if(!o._oPlanningCalendarRow.getEnableAppointmentsDragAndDrop()||o._isOneMonthIntervalOnSmallSizes()){return;}n=o.getAggregation("_intervalPlaceholders");r.write("<div class=\"sapUiCalendarRowAppsOverlay\">");if(n){for(var i=0;i<n.length;i++){var p=n[i];p.setWidth(100/n.length+"%");r.renderControl(p);}}r.write("</div>");};var k=b.extend("CalendarRowInPlanningCalendar",{metadata:{aggregations:{_intervalPlaceholders:{type:"IntervalPlaceholder",multiple:true,visibility:"hidden"}}},constructor:function(){b.apply(this,arguments);},renderer:j});k.prototype._updatePlaceholders=function(){var p=this.getProperty("intervals");if(this.getIntervalType()===g.Hour){p*=2;}this.removeAllAggregation("_intervalPlaceholders");for(var i=0;i<p;i++){this.addAggregation("_intervalPlaceholders",new I());}};k.prototype.onBeforeRendering=function(){b.prototype.onBeforeRendering.call(this);this._updatePlaceholders();};var I=C.extend("IntervalPlaceholder",{metadata:{properties:{width:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:null}}},renderer:function(r,o){r.write("<div");r.writeControlData(o);r.addStyle("width",o.getWidth());r.writeStyles();r.addClass("sapUiCalendarRowAppsPlaceholder");r.writeClasses();r.write("></div>");}});var m=d.extend("ColumnListItemInPlanningCalendar",{metadata:{associations:{planningCalendarRow:{type:"sap.m.PlanningCalendarRow",multiple:false,visibility:"hidden"}}},renderer:e});m.prototype.getCustomData=function(){return sap.ui.getCore().byId(this.getAssociation("planningCalendarRow")).getCustomData();};P.prototype._calcNewHoursAppPos=function(r,A,o,i){var s=new Date(r.getFullYear(),r.getMonth(),r.getDate(),r.getHours());s=new Date(s.getTime()+(i*30*60*1000));return{startDate:s,endDate:new Date(s.getTime()+o.getTime()-A.getTime())};};P.prototype._calcNewDaysAppPos=function(r,A,o,i){var s=new Date(r);s.setDate(s.getDate()+i);s=new Date(s.getFullYear(),s.getMonth(),s.getDate(),A.getHours(),A.getMinutes(),A.getSeconds());return{startDate:s,endDate:new Date(s.getTime()+o.getTime()-A.getTime())};};P.prototype._calcNewMonthsAppPos=function(r,A,o,i){var s=new Date(r);s.setMonth(s.getMonth()+i);s=new Date(s.getFullYear(),s.getMonth(),s.getDate(),A.getHours(),A.getMinutes(),A.getSeconds());return{startDate:s,endDate:new Date(s.getTime()+o.getTime()-A.getTime())};};P.prototype.init=function(){var i=this.getId();var o=new h(i+"-Head",{parentRow:this});var n=new k(i+"-CalRow",{checkResize:false,updateCurrentTime:false,ariaLabelledBy:i+"-Head"});n._oPlanningCalendarRow=this;n.getAppointments=function(){if(this._oPlanningCalendarRow){return this._oPlanningCalendarRow.getAppointments();}else{return[];}};n.getIntervalHeaders=function(){if(this._oPlanningCalendarRow){return this._oPlanningCalendarRow.getIntervalHeaders();}else{return[];}};this._oColumnListItem=new m(this.getId()+"-CLI",{cells:[o,n],planningCalendarRow:this});};P.prototype.exit=function(){if(this._oColumnListItem.getCells()[1]){this._oColumnListItem.getCells()[1].destroy();}this._oColumnListItem.destroy();this._oColumnListItem=undefined;};P.prototype.setTooltip=function(t){this.setAggregation("tooltip",t,true);this._oColumnListItem.getCells()[0].setTooltip(t);return this;};P.prototype.setTitle=function(t){this.setProperty("title",t,true);this._oColumnListItem.getCells()[0].setTitle(t);return this;};P.prototype.setText=function(t){this.setProperty("text",t,true);this._oColumnListItem.getCells()[0].setDescription(t);if(t){this._oColumnListItem.getCells()[1].addStyleClass("sapMPlanCalRowLarge");}else{this._oColumnListItem.getCells()[1].removeStyleClass("sapMPlanCalRowLarge");}return this;};P.prototype.setIcon=function(i){this.setProperty("icon",i,true);this._oColumnListItem.getCells()[0].setIcon(i);return this;};P.prototype.setNonWorkingDays=function(n){this.setProperty("nonWorkingDays",n,true);this.getCalendarRow().setNonWorkingDays(n);return this;};P.prototype.setNonWorkingHours=function(n){this.setProperty("nonWorkingHours",n,true);this.getCalendarRow().setNonWorkingHours(n);return this;};P.prototype.invalidate=function(o){if(!o||!(o instanceof sap.ui.unified.CalendarAppointment)){E.prototype.invalidate.apply(this,arguments);}else if(this._oColumnListItem){this.getCalendarRow().invalidate(o);}};P.prototype.removeAppointment=function(o){var r=this.removeAggregation("appointments",o,true);this.getCalendarRow().invalidate();return r;};P.prototype.removeAllAppointments=function(){var r=this.removeAllAggregation("appointments",true);this.getCalendarRow().invalidate();return r;};P.prototype.destroyAppointments=function(){var o=this.destroyAggregation("appointments",true);this.getCalendarRow().invalidate();return o;};P.prototype.removeIntervalHeader=function(o){var r=this.removeAggregation("intervalHeaders",o,true);this.getCalendarRow().invalidate();return r;};P.prototype.removeAllIntervalHeaders=function(){var r=this.removeAllAggregation("intervalHeaders",true);this.getCalendarRow().invalidate();return r;};P.prototype.destroyIntervalHeaders=function(){var o=this.destroyAggregation("intervalHeaders",true);this.getCalendarRow().invalidate();return o;};P.prototype.setSelected=function(s){this.setProperty("selected",s,true);this._oColumnListItem.setSelected(s);return this;};P.prototype.getColumnListItem=function(){return this._oColumnListItem;};P.prototype.getCalendarRow=function(){if(!this._oColumnListItem){return null;}return this._oColumnListItem.getCells()[1];};P.prototype.applyFocusInfo=function(F){this.getCalendarRow().applyFocusInfo(F);return this;};P.prototype.addAggregation=function(A,o,s){if(b.AGGR_NONWORKING_DATES_NAME===A){this.getCalendarRow().addAggregation(b.AGGR_NONWORKING_DATES_NAME,this._buildCalendarRowDateRange(o),s);}return E.prototype.addAggregation.apply(this,arguments);};P.prototype.insertAggregation=function(A,o,i,s){if(P.AGGR_NONWORKING_DATES_NAME===A){this.getCalendarRow().insertAggregation(b.AGGR_NONWORKING_DATES_NAME,this._buildCalendarRowDateRange(o),i,s);}return E.prototype.insertAggregation.apply(this,arguments);};P.prototype.removeAggregation=function(A,o,s){var r;if(P.AGGR_NONWORKING_DATES_NAME===A&&this.getAggregation(P.AGGR_NONWORKING_DATES_NAME)){r=this.getCalendarRow().getAggregation(b.AGGR_NONWORKING_DATES_NAME).filter(function(n){return n.data(b.PCROW_FOREIGN_KEY_NAME)===o.getId();});if(r.length){this.getCalendarRow().removeAggregation("_nonWorkingDates",r[0]);}}return E.prototype.removeAggregation.apply(this,arguments);};P.prototype.removeAllAggregation=function(A,s){if(P.AGGR_NONWORKING_DATES_NAME===A){this.getCalendarRow().removeAllAggregation(b.AGGR_NONWORKING_DATES_NAME,s);}return E.prototype.removeAllAggregation.apply(this,arguments);};P.prototype.destroyAggregation=function(A,s){if(P.AGGR_NONWORKING_DATES_NAME===A){if(this.getCalendarRow()){this.getCalendarRow().destroyAggregation(b.AGGR_NONWORKING_DATES_NAME,s);}}return E.prototype.destroyAggregation.apply(this,arguments);};P.prototype._buildCalendarRowDateRange=function(s){var r=new D();if(s.getStartDate()){r.setStartDate(new Date(s.getStartDate().getTime()));}if(s.getEndDate()){r.setEndDate(new Date(s.getEndDate().getTime()));}r.data(b.PCROW_FOREIGN_KEY_NAME,s.getId());return r;};return P;});