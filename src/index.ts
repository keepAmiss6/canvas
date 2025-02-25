import {Rect} from './rect.js'
import {Stage} from "./stage.js";

const stage = new Stage()
const rect1 = new Rect(10, 10, 100, 100, 'yellow')
stage.addRect(rect1)
const rect2 = new Rect(500, 500, 20, 300, 'red')
stage.addRect(rect2)

setTimeout(()=>{
    rect1.setAttr('height',200)
},1000)
setTimeout(()=>{
    rect2.setAttr('width',800)
},2000)
