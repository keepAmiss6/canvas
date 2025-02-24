const dom = document.getElementById('rectDrawing') as HTMLCanvasElement
const context = dom.getContext('2d')

function clearCanvas() {
    context.clearRect(0, 0, dom.width, dom.height)
}

class Rect {
    private x: number;
    private y: number;
    private width: number;
    private height: number;
    private color: string;

    constructor(x: number, y: number, width: number, height: number, color: string = 'green') {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
        this.draw()
    }

    draw(): void {
        // context.clearRect(0, 0, 1000, 1000) //清除整个画布
        context.fillStyle = this.color
        context.fillRect(this.x, this.y, this.width, this.height)
    }

    setAttr(name: string, value: number): void {
        this[name] = value
        this.reDraw()
    }

    reDraw(): void {
        clearCanvas()
        rects.forEach(rect => {
            rect.draw()
        })
    }

}

const rects: Rect[] = []
const rect1 = new Rect(10, 10, 100, 100, 'yellow')
const rect2 = new Rect(100, 100, 20, 300, 'red')
rects.push(rect1, rect2)

setTimeout(() => {
    rect1.setAttr('width', 1000)
}, 2000)
setTimeout(() => {
    rect2.setAttr('width', 100)
})

