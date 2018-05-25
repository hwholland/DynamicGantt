sap.ui.define(["sap/gantt/shape/Group"], function (Group) {
    var RectangleGroup = Group.extend("gantt.model.RectangleGroup");

    RectangleGroup.prototype.getRLSAnchors = function (oRawData, oObjectInfo) {
        var shapes = this.getShapes();
        var rectangleShapeClass;
        var _x, _y;

        for (var i in shapes) {
            if (shapes[i] instanceof sap.gantt.shape.Rectangle) {
                rectangleShapeClass = shapes[i];
            }
        }

        _x = rectangleShapeClass.getX(oRawData);
        _y = rectangleShapeClass.getY(oRawData, oObjectInfo) + rectangleShapeClass.getHeight() / 2;

        return {
            startPoint: {
                x: _x,
                y: _y,
                height: rectangleShapeClass.getHeight(oRawData)
            },
            endPoint: {
                x: _x + rectangleShapeClass.getWidth(oRawData),
                y: _y,
                height: rectangleShapeClass.getHeight(oRawData)
            }
        };
    };

    return RectangleGroup;
}, true);