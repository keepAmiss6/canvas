import { QuadTree } from './quadTree.js';
var Stage = /** @class */ (function () {
    function Stage() {
        this.domChildren = [];
        this.renderChildren = [];
        this.runningLoop = false;
        this.starClassify = 4; //启动分裂四叉树算法的开关，例如一个区域内大于10个元素即要进行分裂
        this.dom = document.getElementById('rectDrawing');
        this.context = this.dom.getContext('2d');
        this.bindEvent();
        this.setCenterPoint();
    }
    Stage.prototype.setCenterPoint = function () {
        var domWidth = window.getComputedStyle(this.dom).width;
        var domHeight = window.getComputedStyle(this.dom).height;
        this.centerPointX = parseInt(domWidth) / 2;
        this.centerPointY = parseInt(domHeight) / 2;
    };
    Stage.prototype.bindEvent = function () {
        var _this = this;
        // addEventListener方式
        this.dom.addEventListener('click', function (e) {
            var _a = _this.getPoint(e), x = _a.x, y = _a.y;
            // const boxRects = this.getBoxRectsByPoint(x, y)
            // this.renderChildren.forEach(rect => {
            // console.log('将要参与循环的元素：', boxRects)
            var resultRects = _this.renderChildren;
            if (_this.quadTree) {
                resultRects = _this.quadTree.query({ x: x, y: y });
            }
            console.log('将要参与循环的元素：', resultRects);
            resultRects.length > 0 && resultRects.forEach(function (rect) {
                Object.keys(rect.eventListeners).length !== 0 && rect.__innerAddEventListener('click', x, y);
                rect.onClick && rect.__innerOnclick(x, y);
                rect.isClickSelf = null;
            });
        }, false);
    };
    // getBoxRectsByPoint(x, y) {
    //   if (x < this.centerPointX && y < this.centerPointY) {
    //     return this.boxs.box1
    //   }
    //   if (x < this.centerPointX && y > this.centerPointY) {
    //     return this.boxs.box2
    //   }
    //   if (x > this.centerPointX && y < this.centerPointY) {
    //     return this.boxs.box3
    //   }
    //   if (x >= this.centerPointX && y >= this.centerPointY) {
    //     return this.boxs.box4
    //   }
    //   return []
    // }
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
        // if(!this.runningLoop){
        //   Promise.resolve().then(() => {
        //     //放在微任务里，等render完后再归类
        //     console.log('begain to classify')
        //     this.classifyRect()
        //   })
        //   this.runningLoop = true
        // }
    };
    Stage.prototype.handleRenderChildren = function () {
        this.renderChildren = this.domChildren.sort(function (a, b) { return a.zIndex - b.zIndex; });
    };
    Stage.prototype.render = function () {
        var _this = this;
        if (!this.runningLoop) {
            Promise.resolve().then(function () {
                _this.runningLoop = false;
                console.log('stage render');
                _this.clearCanvas();
                if (_this.renderChildren.length > 0) {
                    _this.renderChildren.forEach(function (rect) {
                        rect.render();
                    });
                }
                if (_this.renderChildren.length > _this.starClassify) {
                    // this.classifyRect()
                    var domWidth = window.getComputedStyle(_this.dom).width;
                    var domHeight = window.getComputedStyle(_this.dom).height;
                    _this.quadTree = new QuadTree({
                        x: 0, y: 0, width: parseInt(domWidth), height: parseInt(domHeight)
                    }, _this.starClassify);
                    _this.renderChildren.forEach(function (item) {
                        _this.quadTree.insert(item);
                    });
                    console.log('this.quadTree', _this.quadTree);
                }
            });
            this.runningLoop = true;
        }
    };
    return Stage;
}());
export { Stage };
