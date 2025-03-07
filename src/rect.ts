import {Stage} from "./stage.js";

export class Rect {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  parent: any;
  id: number

  constructor(x: number, y: number, width: number, height: number, color: string = 'green') {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.color = color
    this.id = Math.random()
    // this.render()
  }

  render(): void {
    console.log('rect render')
    if (this.parent) {
      const context = this.parent.getContext()
      context.fillStyle = this.color
      context.fillRect(this.x, this.y, this.width, this.height)
    }

  }

  setAttr(name: string, value: number): void {
    this[name] = value
    this.parent.handleQueue(this)
    // 调用父组件全部重绘
    this.parent.render()
  }

}



