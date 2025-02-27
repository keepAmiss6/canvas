var Rect = /** @class */ (function () {
  function Rect(x, y, width, height, color) {
    if (color === void 0) { color = 'green'; }
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.render();
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
    // 调用父组件全部重绘
    this.parent.render();
  };
  return Rect;
}());
export { Rect };
