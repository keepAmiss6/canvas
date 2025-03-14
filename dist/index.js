import { Rect } from './rect.js';
import { Stage } from "./stage.js";
var stage = new Stage();
var rect1 = new Rect(0, 300, 100, 100, 'yellow');
rect1.addEventListener('click', function (event) {
    console.log(1111, event);
});
rect1.addEventListener('click', function (event) {
    console.log(222, event);
});
rect1.addEventListener('click', function (event) {
    console.log(333, event);
});
rect1.onClick = function (event) {
    console.log('第一个click回调函数', event);
};
rect1.onClick = function (event) {
    console.log('第二个click回调函数', event);
};
stage.appendChild(rect1);
var rect2 = new Rect(500, 500, 20, 300, 'red');
// rect2.onClick=function (event){
//   console.log('rect2 click',event)
// }
stage.appendChild(rect2);
var rect3 = new Rect(300, 300, 30, 70, 'blue');
stage.appendChild(rect3);
var rect4 = new Rect(460, 510, 80, 90, 'pink');
stage.appendChild(rect4);
window.rect1 = rect1;
window.rect2 = rect2;
window.rect3 = rect3;
window.rect4 = rect4;
setTimeout(function () {
    // rect1.setAttr('height', 200)
    // rect2.setAttr('width', 400);
    // rect1.setAttr('width', 300)
    // rect1.setAttr('width', 900);
}, 3000);
