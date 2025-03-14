var Stage = /** @class */ (function () {
    function Stage() {
        this.domChildren = [];
        this.renderChildren = [];
        this.runningLoop = false;
        this.dom = document.getElementById('rectDrawing');
        this.context = this.dom.getContext('2d');
        this.bindEvent();
    }
    Stage.prototype.bindEvent = function () {
        var _this = this;
        this.dom.addEventListener('click', function (e) {
            var clientRect = _this.dom.getBoundingClientRect();
            var x = e.clientX - clientRect.left;
            var y = e.clientY - clientRect.top;
            _this.renderChildren.forEach(function (rect) {
                rect.onClick && rect.__innerOnclick(x, y);
                // rect.onClick(x, y)
            });
        }, false);
    };
    Stage.prototype.getContext = function () {
        return this.context;
    };
    Stage.prototype.clearCanvas = function () {
        this.context.clearRect(0, 0, this.dom.width, this.dom.height);
    };
    Stage.prototype.appendChild = function (rect) {
        this.domChildren.push(rect);
        this.renderChildren = this.domChildren;
        rect.parent = this;
        this.render();
    };
    Stage.prototype.handleRenderChildren = function () {
        this.renderChildren = this.domChildren.sort(function (a, b) { return a.zIndex - b.zIndex; });
    };
    Stage.prototype.render = function () {
        var _this = this;
        if (!this.runningLoop) {
            Promise.resolve().then(function () {
                _this.runningLoop = false;
                // console.log('stage render')
                _this.clearCanvas();
                if (_this.renderChildren.length > 0) {
                    _this.renderChildren.forEach(function (rect) {
                        rect.render();
                    });
                }
            });
            // requestIdleCallback(() => {
            //   this.runningLoop = false
            //   console.log('stage render')
            //   this.clearCanvas()
            //   if (this.rects.length > 0) {
            //     this.rects.forEach(rect => {
            //       rect.render()
            //     })
            //   }
            // })
            this.runningLoop = true;
        }
    };
    return Stage;
}());
export { Stage };
