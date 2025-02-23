const dom = document.getElementById('rectDrawing') as HTMLCanvasElement
const context = dom.getContext('2d')
class Rect {
    private x: number;
    private y: number;
    private width: number;
    private height: number;

    constructor(x: number, y: number, width: number, height: number) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.draw()
    }

    draw(): void {
        context.clearRect(0,0,1000,1000) //清除整个画布
        context.fillStyle = 'red'
        context.fillRect(this.x, this.y, this.width, this.height)
        // const rectDom = document.getElementById('rectDrawing') as HTMLCanvasElement
        // if (rectDom && rectDom.getContext) {
        //     const context = rectDom.getContext('2d')
        //     context.clearRect(0,0,1000,1000) //清除整个画布
        //     context.fillStyle = 'red'
        //     context.fillRect(this.x, this.y, this.width, this.height)
        // }
    }

    setAttr(name: string, value: number): void {
        this[name] = value
        this.draw()
    }

}

const rect1 = new Rect(10, 10, 100, 100)
setTimeout(()=>{
    rect1.setAttr('width',1000)
},2000)
// const rect2 = new Rect(90, 50, 150, 50)
// setTimeout(() => {
//     rect2.setAttr('width', 1000)
// }, 2000)
