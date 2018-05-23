sap.ui.require.preload({
	"web/ui5/test-resources/sap/ui/unified/sample/CalendarSpecialDaysLegend/CalendarSpecialDaysLegend.controller.js": "sap.ui.define([\"sap/ui/core/mvc/Controller\",\"sap/ui/unified/CalendarLegendItem\",\"sap/ui/unified/DateTypeRange\"],function(e,a,t){\"use strict\";return e.extend(\"sap.ui.unified.sample.CalendarSpecialDaysLegend.CalendarSpecialDaysLegend\",{handleShowSpecialDays:function(e){var d=this.getView().byId(\"calendar1\"),i=this.getView().byId(\"legend1\"),n=this.getView().byId(\"calendar2\"),l=this.getView().byId(\"legend2\");if(e.getParameter(\"pressed\"))for(var s=new Date,r=1;r<=10;r++){s.setDate(r);var p=\"\";p=r<10?\"Type0\"+r:\"Type\"+r,d.addSpecialDate(new t({startDate:new Date(s),type:p,tooltip:\"Placeholder \"+r})),n.addSpecialDate(new t({startDate:new Date(s),type:p,tooltip:\"Placeholder \"+r})),i.addItem(new a({text:\"Placeholder \"+r})),l.addItem(new a({text:\"Placeholder \"+r}))}else d.destroySpecialDates(),n.destroySpecialDates(),i.destroyItems(),l.destroyItems()}})});",
	"web/ui5/test-resources/sap/ui/unified/sample/CalendarSpecialDaysLegend/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.ui.unified.sample.CalendarSpecialDaysLegend.Component\",{metadata:{rootView:\"sap.ui.unified.sample.CalendarSpecialDaysLegend.CalendarSpecialDaysLegend\",dependencies:{libs:[\"sap.ui.unified\",\"sap.ui.layout\",\"sap.m\"]},includes:[\"../style.css\"],config:{sample:{files:[\"CalendarSpecialDaysLegend.view.xml\",\"CalendarSpecialDaysLegend.controller.js\"]}}}})});",
	"web/ui5/test-resources/sap/ui/unified/sample/CalendarSpecialDaysLegend/CalendarSpecialDaysLegend.view.xml": "<mvc:View\n\t\tcontrollerName=\"sap.ui.unified.sample.CalendarSpecialDaysLegend.CalendarSpecialDaysLegend\"\n\t\txmlns:l=\"sap.ui.layout\"\n\t\txmlns:u=\"sap.ui.unified\"\n\t\txmlns:mvc=\"sap.ui.core.mvc\"\n\t\txmlns=\"sap.m\"\n\t\txmlns:html=\"http://www.w3.org/1999/xhtml\"\n\t\tclass=\"viewPadding\"><l:VerticalLayout><l:content><u:Calendar\n\t\t\t\t\tid=\"calendar1\" /><u:CalendarLegend\n\t\t\t\t\tid=\"legend1\" /><u:Calendar\n\t\t\t\t\tid=\"calendar2\" /><u:CalendarLegend\n\t\t\t\t\tid=\"legend2\" /></l:content><ToggleButton text=\"Special Days\" press=\"handleShowSpecialDays\"></ToggleButton></l:VerticalLayout></mvc:View>\n"
}, "web/ui5/test-resources/sap/ui/unified/sample/CalendarSpecialDaysLegend/Component-preload");