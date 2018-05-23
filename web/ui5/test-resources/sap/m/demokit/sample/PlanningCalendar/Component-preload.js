sap.ui.require.preload({
	"web/ui5/test-resources/sap/m/demokit/sample/PlanningCalendar/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.m.sample.PlanningCalendar.Component\",{metadata:{rootView:\"sap.m.sample.PlanningCalendar.Page\",dependencies:{libs:[\"sap.m\",\"sap.ui.unified\"]},config:{sample:{files:[\"Page.view.xml\",\"Page.controller.js\"]}}}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/PlanningCalendar/Page.controller.js": "sap.ui.define([\"sap/ui/core/mvc/Controller\",\"sap/ui/model/json/JSONModel\"],function(e,t){\"use strict\";return e.extend(\"sap.m.sample.PlanningCalendar.Page\",{onInit:function(){var e=new t;e.setData({startDate:new Date(\"2015\",\"11\",\"15\",\"8\",\"0\"),people:[{pic:\"sap-icon://employee\",name:\"Max Mustermann\",role:\"team member\",appointments:[{start:new Date(\"2015\",\"11\",\"15\",\"10\",\"0\"),end:new Date(\"2015\",\"11\",\"15\",\"12\",\"0\"),title:\"Team meeting\",info:\"room 1\",type:\"Type01\",pic:\"sap-icon://sap-ui5\",tentative:!1},{start:new Date(\"2015\",\"11\",\"16\",\"0\",\"0\"),end:new Date(\"2015\",\"11\",\"16\",\"23\",\"59\"),title:\"Vacation\",info:\"out of office\",type:\"Type04\",tentative:!1}],headers:[{start:new Date(\"2015\",\"11\",\"16\",\"0\",\"0\"),end:new Date(\"2015\",\"11\",\"16\",\"23\",\"59\"),title:\"Private\",type:\"Type05\"}]},{pic:\"test-resources/sap/ui/demokit/explored/img/johnDoe.png\",name:\"John Doe\",role:\"team member\",appointments:[{start:new Date(\"2015\",\"11\",\"15\",\"08\",\"30\"),end:new Date(\"2015\",\"11\",\"15\",\"09\",\"30\"),title:\"Meeting\",type:\"Type02\",tentative:!1},{start:new Date(\"2015\",\"11\",\"15\",\"10\",\"0\"),end:new Date(\"2015\",\"11\",\"15\",\"12\",\"0\"),title:\"Team meeting\",info:\"room 1\",type:\"Type01\",pic:\"sap-icon://sap-ui5\",tentative:!1},{start:new Date(\"2015\",\"11\",\"15\",\"11\",\"30\"),end:new Date(\"2015\",\"11\",\"15\",\"13\",\"30\"),title:\"Lunch\",type:\"Type03\",tentative:!0}],headers:[{start:new Date(\"2015\",\"11\",\"15\",\"8\",\"0\"),end:new Date(\"2015\",\"11\",\"15\",\"10\",\"0\"),title:\"Reminder\",type:\"Type06\"}]}]}),this.getView().setModel(e)},handleAppointmentSelect:function(e){var t=e.getParameter(\"appointment\");if(t)alert(\"Appointment selected: \"+t.getTitle());else{var n=e.getParameter(\"appointments\").length+\" Appointments selected\";alert(n)}}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/PlanningCalendar/Page.view.xml": "<mvc:View\n\tcontrollerName=\"sap.m.sample.PlanningCalendar.Page\"\n\txmlns:mvc=\"sap.ui.core.mvc\"\n\txmlns:unified=\"sap.ui.unified\"\n\txmlns=\"sap.m\"><VBox class=\"sapUiSmallMargin\"><PlanningCalendar\n\t\t\tid=\"PC1\"\n\t\t\tstartDate=\"{path: '/startDate'}\"\n\t\t\trows=\"{path: '/people'}\"\n\t\t\tappointmentSelect=\"handleAppointmentSelect\"><toolbarContent><Title text=\"Title\" titleStyle=\"H4\"/></toolbarContent><rows><PlanningCalendarRow\n\t\t\t\t\ticon=\"{pic}\"\n\t\t\t\t\ttitle=\"{name}\"\n\t\t\t\t\ttext=\"{role}\"\n\t\t\t\t\tappointments=\"{appointments}\"\n\t\t\t\t\tintervalHeaders=\"{headers}\"><appointments><unified:CalendarAppointment\n\t\t\t\t\t\t\tstartDate=\"{start}\"\n\t\t\t\t\t\t\tendDate=\"{end}\"\n\t\t\t\t\t\t\ticon=\"{pic}\"\n\t\t\t\t\t\t\ttitle=\"{title}\"\n\t\t\t\t\t\t\ttext=\"{info}\"\n\t\t\t\t\t\t\ttype=\"{type}\"\n\t\t\t\t\t\t\ttentative=\"{tentative}\"></unified:CalendarAppointment></appointments><intervalHeaders><unified:CalendarAppointment\n\t\t\t\t\t\t\tstartDate=\"{start}\"\n\t\t\t\t\t\t\tendDate=\"{end}\"\n\t\t\t\t\t\t\ticon=\"{pic}\"\n\t\t\t\t\t\t\ttitle=\"{title}\"\n\t\t\t\t\t\t\ttype=\"{type}\"></unified:CalendarAppointment></intervalHeaders></PlanningCalendarRow></rows></PlanningCalendar></VBox></mvc:View>"
}, "web/ui5/test-resources/sap/m/demokit/sample/PlanningCalendar/Component-preload");