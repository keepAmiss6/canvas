import {Rect} from "./rect";

export class Stage {
  dom: HTMLCanvasElement;
  context: any
  private domChildren: Rect[] = []
  private renderChildren: Rect[] = []
  runningLoop: Boolean = false

  constructor() {
    this.dom = document.getElementById('rectDrawing') as HTMLCanvasElement
    this.context = this.dom.getContext('2d')
  }

  getContext() {
    return this.context
  }

  clearCanvas() {
    this.context.clearRect(0, 0, this.dom.width, this.dom.height)
  }

  appendChild(rect: Rect) {
    this.domChildren.push(rect)
    this.renderChildren = this.domChildren
    rect.parent = this
    this.render()
  }

  handleRenderChildren() {
    this.renderChildren = this.domChildren.sort((a, b) => a.zIndex - b.zIndex)
  }

  render(): void {
    if (!this.runningLoop) {
      Promise.resolve().then(() => {
        this.runningLoop = false
        console.log('stage render')
        this.clearCanvas()
        if (this.renderChildren.length > 0) {
          this.renderChildren.forEach(rect => {
            rect.render()
          })
        }
      })
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
      this.runningLoop = true
    }
  }
}

