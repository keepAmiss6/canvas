var dom = document.getElementById('rectDrawing');
var context = dom.getContext('2d');
function clearCanvas() {
    context.clearRect(0, 0, dom.width, dom.height);
}
var Rect = /** @class */ (function () {
    function Rect(x, y, width, height, color) {
        if (color === void 0) { color = 'green'; }
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.draw();
    }
    Rect.prototype.draw = function () {
        // context.clearRect(0, 0, 1000, 1000) //清除整个画布
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    };
    Rect.prototype.setAttr = function (name, value) {
        this[name] = value;
        this.reDraw();
    };
    Rect.prototype.reDraw = function () {
        clearCanvas();
        rects.forEach(function (rect) {
            rect.draw();
        });
    };
    return Rect;
}());
var rects = [];
var rect1 = new Rect(10, 10, 100, 100, 'yellow');
var rect2 = new Rect(100, 100, 20, 300, 'red');
rects.push(rect1, rect2);
setTimeout(function () {
    rect1.setAttr('width', 1000);
}, 2000);
setTimeout(function () {
    rect2.setAttr('width', 100);
});
