"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var stage_1 = require("./stage");
var Rect = /** @class */ (function (_super) {
    __extends(Rect, _super);
    function Rect(x, y, width, height, color) {
        if (color === void 0) { color = 'green'; }
        var _this = _super.call(this) || this;
        _this.x = x;
        _this.y = y;
        _this.width = width;
        _this.height = height;
        _this.color = color;
        _this.draw();
        return _this;
    }
    Rect.prototype.draw = function () {
        var context = _super.prototype.getContext.call(this);
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    };
    Rect.prototype.setAttr = function (name, value) {
        this[name] = value;
        this.reDraw();
    };
    Rect.prototype.reDraw = function () {
        _super.prototype.clearCanvas.call(this);
        rects.forEach(function (rect) {
            rect.draw();
        });
    };
    return Rect;
}(stage_1.Stage));
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
