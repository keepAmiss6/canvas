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
        // addEventListener方式
        this.dom.addEventListener('click', function (e) {
            var _a = _this.getPoint(e), x = _a.x, y = _a.y;
            _this.renderChildren.forEach(function (rect) {
                Object.keys(rect.eventListeners).length !== 0 && rect.__innerAddEventListener('click', x, y);
                rect.onClick && rect.__innerOnclick(x, y);
                rect.isClickSelf = null;
            });
        }, false);
    };
    Stage.prototype.getPoint = function (e) {
        var clientRect = this.dom.getBoundingClientRect();
        var x = e.clientX - clientRect.left;
        var y = e.clientY - clientRect.top;
        return { x: x, y: y };
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
            this.runningLoop = true;
        }
    };
    return Stage;
}());
export { Stage };
