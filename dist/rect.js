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
import { Stage } from "./stage.js";
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
        // 调用父组件全部重绘
        // super.render()
    };
    return Rect;
}(Stage));
export { Rect };
