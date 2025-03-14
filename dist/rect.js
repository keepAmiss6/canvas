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
        this.onClick = null;
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
    Rect.prototype.__innerOnclick = function (x, y) {
        if (x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height) {
            var event_1 = {
                x: x,
                y: y,
                color: this.color
            };
            this.onClick(event_1);
        }
    };
    return Rect;
}());
export { Rect };
