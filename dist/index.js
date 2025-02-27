import { Rect } from './rect.js';
import { Stage } from "./stage.js";
var stage = new Stage();
var rect1 = new Rect(10, 10, 100, 100, 'yellow');
stage.appendChild(rect1);
rect1.setAttr('width', 900);
// const rect2 = new Rect(500, 500, 20, 300, 'red')
// stage.appendChild(rect2)
// window.rect1=rect1
// setTimeout(() => {
//   rect1.setAttr('height', 200)
//   rect1.setAttr('width',300)
//   rect2.setAttr('width', 800)
//   rect2.setAttr('height',500)
// }, 3000)
