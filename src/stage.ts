import { Rect } from "./rect";
let runningLoop = false
export class Stage {
  dom: HTMLCanvasElement;
  context: any
  private rects: Rect[] = []

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
    this.rects.push(rect)
    rect.parent = this
    rect.render()
  }

  render(): void {
    if (!runningLoop) {
      requestIdleCallback(() => {
        runningLoop = false
        console.log('stage render')
        this.clearCanvas()
        if (this.rects.length > 0) {
          this.rects.forEach(rect => {
            rect.render()
          })
        }
      })
      runningLoop = true
    }
  }
}

