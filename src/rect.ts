import {Stage} from "./stage.js";

export class Rect {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  parent: any;
  id: number;
  zIndex: number;

  constructor(x: number, y: number, width: number, height: number, color: string = 'green') {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.color = color
    this.id = Math.random()
    this.zIndex = 0
  }

  render(): void {
    if (this.parent) {
      const context = this.parent.getContext()
      context.fillStyle = this.color
      context.fillRect(this.x, this.y, this.width, this.height)
    }
  }

  setAttr(name: string, value: number): void {
    this[name] = value
    if (name = 'zIndex') {
      this.parent.handleRenderChildren()
    }
    // 调用父组件全部重绘
    this.parent.render()
  }

  onClick(x: number, y: number): void {
    if (x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height) {
      console.log(this.color)
    }
    // if (this.context.isPointInPath(x, y)) {
    //   console.log(this.color)
    // }
  }

}



