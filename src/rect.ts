import {Stage} from "./stage.js";
// import {rects} from "./index.js";

export class Rect extends Stage {
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
        // 触发事件通知父组件
        // this.onChange.dispatch();
        // this.reDraw(rects)
    }
    // 事件机制
    // onChange = new Phaser.Events.EventEmitter();

}



