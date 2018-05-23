sap.ui.require.preload({
	"web/ui5/test-resources/sap/m/demokit/sample/PlanningCalendarOneLine/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.m.sample.PlanningCalendarOneLine.Component\",{metadata:{rootView:\"sap.m.sample.PlanningCalendarOneLine.Page\",dependencies:{libs:[\"sap.m\",\"sap.ui.unified\"]},config:{sample:{files:[\"Page.view.xml\",\"Page.controller.js\"]}}}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/PlanningCalendarOneLine/Page.controller.js": "sap.ui.define([\"sap/ui/core/mvc/Controller\",\"sap/ui/model/json/JSONModel\"],function(e,t){\"use strict\";return e.extend(\"sap.m.sample.PlanningCalendarOneLine.Page\",{onInit:function(){var e=new t;e.setData({startDate:new Date(\"2016\",\"2\",\"8\",\"8\",\"0\"),people:[{pic:\"sap-icon://employee\",name:\"Max Mustermann\",role:\"team member\",appointments:[{start:new Date(\"2016\",\"2\",\"8\",\"9\",\"0\"),end:new Date(\"2016\",\"2\",\"8\",\"11\",\"0\"),title:\"Team meeting\",info:\"room 1\",type:\"Type01\",pic:\"sap-icon://sap-ui5\",tentative:!1},{start:new Date(\"2016\",\"2\",\"8\",\"9\",\"30\"),end:new Date(\"2016\",\"2\",\"8\",\"11\",\"30\"),title:\"Meeting 1\",type:\"Type02\",pic:\"sap-icon://sap-ui5\",tentative:!1},{start:new Date(\"2016\",\"2\",\"8\",\"11\",\"0\"),end:new Date(\"2016\",\"2\",\"8\",\"13\",\"0\"),title:\"Meeting 2\",type:\"Type03\",pic:\"\",tentative:!0},{start:new Date(\"2016\",\"2\",\"8\",\"11\",\"0\"),end:new Date(\"2016\",\"2\",\"8\",\"13\",\"0\"),title:\"Meeting 3\",type:\"Type04\",pic:\"\",tentative:!1},{start:new Date(\"2016\",\"2\",\"9\",\"9\",\"0\"),end:new Date(\"2016\",\"2\",\"9\",\"16\",\"0\"),title:\"Busy\",type:\"Type08\",tentative:!1}],headers:[{start:new Date(\"2016\",\"2\",\"9\",\"8\",\"0\"),end:new Date(\"2016\",\"2\",\"9\",\"9\",\"0\"),title:\"UI5\",pic:\"sap-icon://sap-ui5\",type:\"Type05\"}]},{pic:\"test-resources/sap/ui/demokit/explored/img/johnDoe.png\",name:\"John Doe\",role:\"team member\",appointments:[{start:new Date(\"2016\",\"2\",\"8\",\"07\",\"0\"),end:new Date(\"2016\",\"2\",\"8\",\"09\",\"0\"),title:\"Meeting 1\",type:\"Type05\",tentative:!1},{start:new Date(\"2016\",\"2\",\"8\",\"08\",\"0\"),end:new Date(\"2016\",\"2\",\"8\",\"09\",\"0\"),title:\"Meeting 2\",type:\"Type06\",tentative:!1},{start:new Date(\"2016\",\"2\",\"8\",\"9\",\"0\"),end:new Date(\"2016\",\"2\",\"8\",\"11\",\"0\"),title:\"Team meeting\",info:\"room 1\",type:\"Type01\",pic:\"sap-icon://sap-ui5\",tentative:!1}],headers:[{start:new Date(\"2016\",\"2\",\"8\",\"8\",\"0\"),end:new Date(\"2016\",\"2\",\"8\",\"9\",\"0\"),title:\"UI5\",pic:\"sap-icon://sap-ui5\",type:\"Type07\"}]}]}),this.getView().setModel(e)},handleAppointmentSelect:function(e){var t=e.getParameter(\"appointment\");if(t)alert(\"Appointment selected: \"+t.getTitle());else{var n=e.getParameter(\"appointments\").length+\" Appointments selected\";alert(n)}},handleIntervalSelect:function(e){var t=e.oSource,n=e.getParameter(\"startDate\"),a=e.getParameter(\"endDate\"),i=e.getParameter(\"row\"),p=(e.getParameter(\"subInterval\"),this.getView().getModel()),s=p.getData(),r=-1,o={start:n,end:a,title:\"new appointment\",type:\"Type09\"};if(i)r=t.indexOfRow(i),s.people[r].appointments.push(o);else for(var l=t.getSelectedRows(),m=0;m<l.length;m++)r=t.indexOfRow(l[m]),s.people[r].appointments.push(o);p.setData(s)}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/PlanningCalendarOneLine/Page.view.xml": "<mvc:View\n\tcontrollerName=\"sap.m.sample.PlanningCalendarOneLine.Page\"\n\txmlns:mvc=\"sap.ui.core.mvc\"\n\txmlns:unified=\"sap.ui.unified\"\n\txmlns=\"sap.m\"><VBox class=\"sapUiSmallMargin\"><PlanningCalendar\n\t\t\tid=\"PC1\"\n\t\t\tshowIntervalHeaders=\"true\"\n\t\t\tshowEmptyIntervalHeaders=\"false\"\n\t\t\tappointmentsReducedHeight=\"true\"\n\t\t\tstartDate=\"{path: '/startDate'}\"\n\t\t\trows=\"{path: '/people'}\"\n\t\t\tappointmentSelect=\"handleAppointmentSelect\"\n\t\t\tintervalSelect=\"handleIntervalSelect\"><toolbarContent><Title text=\"Title\" titleStyle=\"H4\"/></toolbarContent><rows><PlanningCalendarRow\n\t\t\t\t\ticon=\"{pic}\"\n\t\t\t\t\ttitle=\"{name}\"\n\t\t\t\t\ttext=\"{role}\"\n\t\t\t\t\tappointments=\"{appointments}\"\n\t\t\t\t\tintervalHeaders=\"{headers}\"><appointments><unified:CalendarAppointment\n\t\t\t\t\t\t\tstartDate=\"{start}\"\n\t\t\t\t\t\t\tendDate=\"{end}\"\n\t\t\t\t\t\t\ticon=\"{pic}\"\n\t\t\t\t\t\t\ttitle=\"{title}\"\n\t\t\t\t\t\t\ttext=\"{info}\"\n\t\t\t\t\t\t\ttype=\"{type}\"\n\t\t\t\t\t\t\ttentative=\"{tentative}\"></unified:CalendarAppointment></appointments><intervalHeaders><unified:CalendarAppointment\n\t\t\t\t\t\t\tstartDate=\"{start}\"\n\t\t\t\t\t\t\tendDate=\"{end}\"\n\t\t\t\t\t\t\ticon=\"{pic}\"\n\t\t\t\t\t\t\ttitle=\"{title}\"\n\t\t\t\t\t\t\ttype=\"{type}\"></unified:CalendarAppointment></intervalHeaders></PlanningCalendarRow></rows></PlanningCalendar></VBox></mvc:View>"
}, "web/ui5/test-resources/sap/m/demokit/sample/PlanningCalendarOneLine/Component-preload");