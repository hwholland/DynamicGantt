sap.ui.define(["sap/gantt/shape/Rectangle"], function (Rectangle) {
    var shapeRectangle = Rectangle.extend("gantt.model.shape.Rectangle");

    shapeRectangle.prototype.getFill = function (oRawData) {
        switch (oRawData.level) {
        case "1":
            return "#FAC364";
        default:
            return "#5CBAE5";
        }
    };

    return shapeRectangle;
}, true);