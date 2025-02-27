var runningLoop = false;
var Stage = /** @class */ (function () {
    function Stage() {
        this.rects = [];
        this.dom = document.getElementById('rectDrawing');
        this.context = this.dom.getContext('2d');
    }
    Stage.prototype.getContext = function () {
        return this.context;
    };
    Stage.prototype.clearCanvas = function () {
        this.context.clearRect(0, 0, this.dom.width, this.dom.height);
    };
    Stage.prototype.appendChild = function (rect) {
        this.rects.push(rect);
        rect.parent = this;
        rect.render();
    };
    Stage.prototype.render = function () {
        var _this = this;
        if (!runningLoop) {
            requestIdleCallback(function () {
                runningLoop = false;
                console.log('stage render');
                _this.clearCanvas();
                if (_this.rects.length > 0) {
                    _this.rects.forEach(function (rect) {
                        rect.render();
                    });
                }
            });
            runningLoop = true;
        }
    };
    return Stage;
}());
export { Stage };
