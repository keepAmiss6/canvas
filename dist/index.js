import { Rect } from './rect.js';
import { Stage } from "./stage.js";
var stage = new Stage();
var rect1 = new Rect(10, 10, 100, 100, 'yellow');
stage.addRect(rect1);
var rect2 = new Rect(500, 500, 20, 300, 'red');
stage.addRect(rect2);
setTimeout(function () {
    rect1.setAttr('height', 200);
    stage.render();
}, 1000);
setTimeout(function () {
    rect2.setAttr('width', 800);
    stage.render();
}, 2000);
