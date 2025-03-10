var Stage = /** @class */ (function () {
    function Stage() {
        this.rectsQueue = [];
        this.runningLoop = false;
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
        this.rectsQueue.push(rect);
        rect.parent = this;
        this.render();
    };
    Stage.prototype.handleQueue = function () {
        this.rectsQueue = this.rectsQueue.sort(function (a, b) { return a.zIndex - b.zIndex; });
    };
    Stage.prototype.render = function () {
        var _this = this;
        if (!this.runningLoop) {
            Promise.resolve().then(function () {
                _this.runningLoop = false;
                console.log('stage render');
                _this.clearCanvas();
                if (_this.rectsQueue.length > 0) {
                    // let rect
                    // while (rect = this.rectsQueue.shift()){
                    //   rect.render()
                    // }
                    _this.rectsQueue.forEach(function (rect) {
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
