var QuadTree = /** @class */ (function () {
    function QuadTree(_a, capacity) {
        var x = _a.x, y = _a.y, width = _a.width, height = _a.height;
        this.divided = false;
        this.boundary = { x: x, y: y, width: width, height: height };
        this.capacity = capacity;
        this.children = [];
        this.divided = false;
    }
    QuadTree.prototype.insert = function (element) {
        var _a, _b;
        // 1、元素是否在边界范围内
        if (!this.contain({ elementX: element.x, elementY: element.y })) {
            return;
        }
        (_a = this.children) === null || _a === void 0 ? void 0 : _a.push(element);
        // 2、目前元素是否超过设定的容量，超过了则需要分裂,没超过插入元素
        // if (this.children.length < this.capacity) {
        //   this.children.push(element)
        //   return true
        // }
        if (((_b = this.children) === null || _b === void 0 ? void 0 : _b.length) > this.capacity) {
            if (!this.divided) {
                this.subdivide();
                this.divided = true;
                // 将之前放在this.children的元素重新放入四个节点中  
                for (var _i = 0, _c = this.children; _i < _c.length; _i++) {
                    var item = _c[_i];
                    this.northeast.insert(item);
                    this.northwest.insert(item);
                    this.southeast.insert(item);
                    this.southwest.insert(item);
                }
                this.children = null;
            }
        }
    };
    // 把元素放入指定的四个区域里
    // intoSplitBox(element: any) {
    //   this.northeast.insert(element)
    //   this.northwest.insert(element)
    //   this.southeast.insert(element)
    //   this.southwest.insert(element)
    // }
    // 分割节点
    QuadTree.prototype.subdivide = function () {
        var _a = this.boundary, x = _a.x, y = _a.y, width = _a.width, height = _a.height;
        var halfWidth = width / 2;
        var halfHeight = height / 2;
        this.northeast = new QuadTree({ x: x + halfWidth, y: y, width: halfWidth, height: halfHeight }, this.capacity);
        this.northwest = new QuadTree({ x: x, y: y, width: halfWidth, height: halfHeight }, this.capacity);
        this.southeast = new QuadTree({ x: x + halfWidth, y: y + halfHeight, width: halfWidth, height: halfHeight }, this.capacity);
        this.southwest = new QuadTree({ x: x, y: y + halfHeight, width: halfWidth, height: halfHeight }, this.capacity);
    };
    QuadTree.prototype.contain = function (_a) {
        var elementX = _a.elementX, elementY = _a.elementY;
        var _b = this.boundary, x = _b.x, y = _b.y, width = _b.width, height = _b.height;
        return (elementX >= x && elementX <= x + width && elementY >= y && elementY <= y + height);
    };
    QuadTree.prototype.query = function (_a) {
        var x = _a.x, y = _a.y;
        // 检查这个点是否在当前范围
        if (this.contain({ elementX: x, elementY: y })) {
            if (this.divided) {
                // 已经分裂
                this.northeast.query({ x: x, y: y });
                this.northwest.query({ x: x, y: y });
                this.southeast.query({ x: x, y: y });
                this.southwest.query({ x: x, y: y });
            }
            else {
                return this.children;
            }
        }
        else {
            return [];
        }
    };
    return QuadTree;
}());
export { QuadTree };
