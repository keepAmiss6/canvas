var Quadtree = /** @class */ (function () {
    function Quadtree(boundary, capacity) {
        this.boundary = boundary;
        this.capacity = capacity;
        this.children = [];
        this.divided = false;
        this.northeast = null;
        this.northwest = null;
        this.southeast = null;
        this.southwest = null;
    }
    // 插入元素
    Quadtree.prototype.insert = function (element) {
        if (!this.contains(element)) {
            return false;
        }
        if (this.children.length < this.capacity) {
            this.children.push(element);
            return true;
        }
        if (!this.divided) {
            this.subdivide();
        }
        return (this.northeast.insert(element) ||
            this.northwest.insert(element) ||
            this.southeast.insert(element) ||
            this.southwest.insert(element));
    };
    // 分割节点
    Quadtree.prototype.subdivide = function () {
        var _a = this.boundary, x = _a.x, y = _a.y, width = _a.width, height = _a.height;
        var halfWidth = width / 2;
        var halfHeight = height / 2;
        this.northeast = new Quadtree({ x: x + halfWidth, y: y, width: halfWidth, height: halfHeight }, this.capacity);
        this.northwest = new Quadtree({ x: x, y: y, width: halfWidth, height: halfHeight }, this.capacity);
        this.southeast = new Quadtree({ x: x + halfWidth, y: y + halfHeight, width: halfWidth, height: halfHeight }, this.capacity);
        this.southwest = new Quadtree({ x: x, y: y + halfHeight, width: halfWidth, height: halfHeight }, this.capacity);
        this.divided = true;
    };
    // 查询点是否在边界内
    Quadtree.prototype.contains = function (element) {
        var _a = this.boundary, x = _a.x, y = _a.y, width = _a.width, height = _a.height;
        return (element.x >= x &&
            element.x <= x + width &&
            element.y >= y &&
            element.y <= y + height);
    };
    // 查询某个点附近的元素
    Quadtree.prototype.query = function (point, found) {
        if (found === void 0) { found = []; }
        if (!this.contains(point)) {
            return found;
        }
        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
            var child = _a[_i];
            if (child.containsPoint(point.x, point.y)) {
                found.push(child);
            }
        }
        if (this.divided) {
            this.northeast.query(point, found);
            this.northwest.query(point, found);
            this.southeast.query(point, found);
            this.southwest.query(point, found);
        }
        return found;
    };
    return Quadtree;
}());
