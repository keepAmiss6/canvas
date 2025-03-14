import { Rect } from './rect.js'
import { Stage } from "./stage.js";

const stage = new Stage()
const rect1 = new Rect(0, 300, 100, 100, 'yellow')
stage.appendChild(rect1)
const rect2 = new Rect(500, 500, 20, 300, 'red')
stage.appendChild(rect2)
const rect3 = new Rect(300, 300, 30, 70, 'blue')
stage.appendChild(rect3)
const rect4 = new Rect(460, 510, 80, 90, 'pink')
stage.appendChild(rect4)
window.rect1=rect1
window.rect2=rect2
window.rect3=rect3
window.rect4=rect4
setTimeout(() => {
  // rect1.setAttr('height', 200)
  // rect2.setAttr('width', 400);
  // rect1.setAttr('width', 300)
  // rect1.setAttr('width', 900);
}, 3000)
