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
  onClick: any;
  eventListeners: Object

  constructor(x: number, y: number, width: number, height: number, color: string = 'green') {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.color = color
    this.id = Math.random()
    this.zIndex = 0
    this.onClick = null
    this.eventListeners = {}
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

  __innerOnclick(x, y) {
    if (x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height) {
      const event = {
        x, y, color: this.color
      }
      this.onClick(event)
    }
  }

  __innerAddEventListener(type, x, y) {
    if (x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height) {
      this.dispatchEvent(type)
    }
  }

  addEventListener(eventType, listener) {
    if (!this.eventListeners[eventType]) {
      this.eventListeners[eventType] = []
    }
    this.eventListeners[eventType].push(listener)
  }

  dispatchEvent(eventType) {
    const listeners = this.eventListeners[eventType]
    if (listeners && listeners.length > 0) {
      const event = {type: eventType, target: this}
      listeners.forEach(listener => {
        listener(event)
      })
    }
  }

  removeEventListener(eventType, unBindListener) {
    const listeners = this.eventListeners[eventType]
    if (listeners && listeners.length > 0) {
      // 比较两个函数的地址
      this.eventListeners[eventType] = listeners.filter(ls => ls !== unBindListener)
    }

  }

  // onClick(x: number, y: number): void {
  //   if (x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height) {
  //     console.log(this.color)
  //   }
  // 使用fillRect方法画出来的图形没有轨迹，所以不能使用isPointInPath来判断
  // if (this.context.isPointInPath(x, y)) {
  //   console.log(this.color)
  // }
  // }

}



