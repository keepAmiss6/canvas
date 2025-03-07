import {Rect} from "./rect";

export class Stage {
  dom: HTMLCanvasElement;
  context: any
  private rectsQueue: Rect[] = []
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
    this.rectsQueue.push(rect)
    rect.parent = this
    this.render()
  }

  handleQueue(currentRect) {
    this.rectsQueue = this.rectsQueue.filter(item => item.id !== currentRect.id)
    this.rectsQueue.push(currentRect)
  }

  render(): void {
    if (!this.runningLoop) {
      Promise.resolve().then(() => {
        this.runningLoop = false
        console.log('stage render')
        this.clearCanvas()
        if (this.rectsQueue.length > 0) {
          this.rectsQueue.forEach(rect => {
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

