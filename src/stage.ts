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
    this.bindEvent()
  }

  bindEvent() {
    // addEventListener方式
    this.dom.addEventListener('click', (e) => {
      const {x, y} = this.getPoint(e)
      this.renderChildren.forEach(rect => {
        Object.keys(rect.eventListeners).length !== 0 && rect.__innerAddEventListener('click', x, y)
        rect.onClick && rect.__innerOnclick(x, y)
        rect.isClickSelf = null
      })
    }, false)
  }

  getPoint(e) {
    const clientRect = this.dom.getBoundingClientRect()
    const x = e.clientX - clientRect.left
    const y = e.clientY - clientRect.top
    return {x, y}
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
        // console.log('stage render')
        this.clearCanvas()
        if (this.renderChildren.length > 0) {
          this.renderChildren.forEach(rect => {
            rect.render()
          })
        }
      })
      this.runningLoop = true
    }
  }
}
