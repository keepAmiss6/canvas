class Quadtree {
  boundary: { x: number; y: number; width: number; height: number }; // 节点边界
  capacity: number; // 节点容量
  children: any[]; // 存储的元素
  divided: boolean; // 是否已分割
  northeast: Quadtree | null; // 东北子节点
  northwest: Quadtree | null; // 西北子节点
  southeast: Quadtree | null; // 东南子节点
  southwest: Quadtree | null; // 西南子节点

  constructor(boundary: { x: number; y: number; width: number; height: number }, capacity: number) {
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
  insert(element: any): boolean {
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

    return (
      this.northeast!.insert(element) ||
      this.northwest!.insert(element) ||
      this.southeast!.insert(element) ||
      this.southwest!.insert(element)
    );
  }

  // 分割节点
  subdivide() {
    const { x, y, width, height } = this.boundary;
    const halfWidth = width / 2;
    const halfHeight = height / 2;

    this.northeast = new Quadtree({ x: x + halfWidth, y, width: halfWidth, height: halfHeight }, this.capacity);
    this.northwest = new Quadtree({ x, y, width: halfWidth, height: halfHeight }, this.capacity);
    this.southeast = new Quadtree({ x: x + halfWidth, y: y + halfHeight, width: halfWidth, height: halfHeight }, this.capacity);
    this.southwest = new Quadtree({ x, y: y + halfHeight, width: halfWidth, height: halfHeight }, this.capacity);

    this.divided = true;
  }

  // 查询点是否在边界内
  contains(element: any): boolean {
    const { x, y, width, height } = this.boundary;
    return (
      element.x >= x &&
      element.x <= x + width &&
      element.y >= y &&
      element.y <= y + height
    );
  }

  // 查询某个点附近的元素
  query(point: { x: number; y: number }, found: any[] = []): any[] {
    if (!this.contains(point)) {
      return found;
    }

    for (const child of this.children) {
      if (child.containsPoint(point.x, point.y)) {
        found.push(child);
      }
    }

    if (this.divided) {
      this.northeast!.query(point, found);
      this.northwest!.query(point, found);
      this.southeast!.query(point, found);
      this.southwest!.query(point, found);
    }

    return found;
  }
}