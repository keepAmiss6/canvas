import {Stage} from './stage'

class Rect extends Stage {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;

    constructor(x: number, y: number, width: number, height: number, color: string = 'green') {
        super()
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
        this.draw()

    }

    draw(): void {
        const context = super.getContext()
        context.fillStyle = this.color
        context.fillRect(this.x, this.y, this.width, this.height)
    }

    setAttr(name: string, value: number): void {
        this[name] = value
        this.reDraw()
    }

    reDraw(): void {
        super.clearCanvas()
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

