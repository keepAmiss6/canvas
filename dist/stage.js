var Stage = /** @class */ (function () {
    function Stage() {
        this.rects = [];
        this.dom = document.getElementById('rectDrawing');
        this.setContext();
    }
    Stage.prototype.setContext = function () {
        this.context = this.dom.getContext('2d');
    };
    Stage.prototype.getContext = function () {
        return this.context;
    };
    Stage.prototype.clearCanvas = function () {
        this.context.clearRect(0, 0, this.dom.width, this.dom.height);
    };
    Stage.prototype.addRect = function (rect) {
        this.rects.push(rect);
        this.reDraw();
        // rect.onChange.on(() => this.reDraw(this.rects));
    };
    Stage.prototype.reDraw = function () {
        this.clearCanvas();
        this.rects.forEach(function (rect) {
            rect.draw();
        });
    };
    return Stage;
}());
export { Stage };
