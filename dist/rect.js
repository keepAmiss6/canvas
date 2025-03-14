var Rect = /** @class */ (function () {
    function Rect(x, y, width, height, color) {
        if (color === void 0) { color = 'green'; }
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.id = Math.random();
        this.zIndex = 0;
    }
    Rect.prototype.render = function () {
        if (this.parent) {
            var context = this.parent.getContext();
            context.fillStyle = this.color;
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    };
    Rect.prototype.setAttr = function (name, value) {
        this[name] = value;
        if (name = 'zIndex') {
            this.parent.handleRenderChildren();
        }
        // 调用父组件全部重绘
        this.parent.render();
    };
    Rect.prototype.onClick = function (x, y) {
        if (x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height) {
            console.log(this.color);
        }
        // if (this.context.isPointInPath(x, y)) {
        //   console.log(this.color)
        // }
    };
    return Rect;
}());
export { Rect };
