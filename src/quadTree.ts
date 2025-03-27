export class QuadTree {
  boundary: { x: number, y: number, width: number, height: number };//节点的范围
  capacity: number;//节点里的容量，能放几个元素
  children: any;
  divided: Boolean = false;
  northeast: QuadTree | null;//东北子节点
  northwest: QuadTree | null;//西北子节点
  southeast: QuadTree | null;// 东南子节点
  southwest: QuadTree | null;//西南子节点

  constructor({ x, y, width, height }, capacity) {
    this.boundary = { x, y, width, height }
    this.capacity = capacity
    this.children = []
    this.divided = false

  }

  insert(element: any) {
    // 1、元素是否在边界范围内
    if (!this.contain({ elementX: element.x, elementY: element.y })) {
      return
    }
    this.children.push(element)
    // 2、目前元素是否超过设定的容量，超过了则需要分裂,没超过插入元素
    // if (this.children.length < this.capacity) {
    //   this.children.push(element)
    //   return true
    // }
    if(this.children.length>this.capacity){
      if (!this.divided) {
        this.subdivide()
        this.divided = true
        // 将之前放在this.children的元素重新放入四个节点中  
        for (const item of this.children) {
          this.northeast.insert(item)
          this.northwest.insert(item)
          this.southeast.insert(item)
          this.southwest.insert(item)
        }
        this.children = null
      }
    }
   
  }
  // 把元素放入指定的四个区域里
  // intoSplitBox(element: any) {
  //   this.northeast.insert(element)
  //   this.northwest.insert(element)
  //   this.southeast.insert(element)
  //   this.southwest.insert(element)

  // }
  // 分割节点
  subdivide() {
    const { x, y, width, height } = this.boundary
    const halfWidth = width / 2
    const halfHeight = height / 2
    this.northeast = new QuadTree({ x: x + halfWidth, y, width: halfWidth, height: halfHeight }, this.capacity)
    this.northwest = new QuadTree({ x, y, width: halfWidth, height: halfHeight }, this.capacity)
    this.southeast = new QuadTree({ x: x + halfWidth, y: y + halfHeight, width: halfWidth, height: halfHeight }, this.capacity)
    this.southwest = new QuadTree({ x, y: y + halfHeight, width: halfWidth, height: halfHeight }, this.capacity)
  }
  contain({ elementX, elementY }): boolean {
    const { x, y, width, height } = this.boundary
    return (elementX >= x && elementX <= x + width && elementY >= y && elementY <= y + height)
  }

  query({ x, y }) {
    // 检查这个点是否在当前范围
    if (this.contain({ elementX: x, elementY: y })) {
      if (this.divided) {
        // 已经分裂
        this.northeast.query({ x, y })
        this.northwest.query({ x, y })
        this.southeast.query({ x, y })
        this.southwest.query({ x, y })
      } else {
        return this.children
      }
    } else {
      return []
    }
  }
}