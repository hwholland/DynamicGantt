sap.ui.jsview("gantt.view.Gantt", {

    getControllerName: function () {
        return "gantt.controller.Gantt";
    },

    createContent: function (oController) {
        var oGanttChartContainer = new sap.gantt.GanttChartContainer();
        var oGanttChartWithTable = new sap.gantt.GanttChartWithTable();
        this._oGanttChartContainer.addGanttChart(this._oGanttChartWithTable);
        return oGanttChartContainer;
    }

});