export class Stage {
    dom: HTMLCanvasElement;
    context: any

    constructor() {
        this.dom = document.getElementById('rectDrawing') as HTMLCanvasElement
    }

    getContext(){
        return this.dom.getContext('2d')
    }
    clearCanvas() {
        this.context.clearRect(0, 0, this.dom.width, this.dom.height)
    }

}
