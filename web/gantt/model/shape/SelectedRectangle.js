sap.ui.define(["sap/gantt/shape/SelectedShape"], function (SelectedShape) {
    var SelectedRectangle = SelectedShape.extend("gantt.model.shape.SelectedRectangle");

    SelectedRectangle.prototype.getStroke = function (oRawData) {
        switch (oRawData.level) {
        case "1":
            return "#B57506";
        default:
            return "#156589";
        }
    };
    SelectedRectangle.prototype.getStrokeWidth = function () {
        return 2;
    };

    return SelectedRectangle;
});