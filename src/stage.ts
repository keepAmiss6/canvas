import {Rect} from "./rect";

export class Stage {
    dom: HTMLCanvasElement;
    context: any
    private rects: Rect[] = []

    constructor() {
        this.dom = document.getElementById('rectDrawing') as HTMLCanvasElement
        this.setContext()
    }

    setContext() {
        this.context = this.dom.getContext('2d')
    }

    getContext() {
        return this.context
    }

    clearCanvas() {
        this.context.clearRect(0, 0, this.dom.width, this.dom.height)
    }

    addRect(rect: Rect) {
        this.rects.push(rect)
        this.reDraw()
        // rect.onChange.on(() => this.reDraw(this.rects));
    }

    reDraw(): void {
        this.clearCanvas()
        this.rects.forEach(rect => {
            rect.draw()
        })
    }
}

