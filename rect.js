var dom = document.getElementById('rectDrawing');
var context = dom.getContext('2d');
var Rect = /** @class */ (function () {
    function Rect(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.draw();
    }
    Rect.prototype.draw = function () {
        context.clearRect(0, 0, 1000, 1000); //清除整个画布
        context.fillStyle = 'red';
        context.fillRect(this.x, this.y, this.width, this.height);
        // const rectDom = document.getElementById('rectDrawing') as HTMLCanvasElement
        // if (rectDom && rectDom.getContext) {
        //     const context = rectDom.getContext('2d')
        //     context.clearRect(0,0,1000,1000) //清除整个画布
        //     context.fillStyle = 'red'
        //     context.fillRect(this.x, this.y, this.width, this.height)
        // }
    };
    Rect.prototype.setAttr = function (name, value) {
        this[name] = value;
        this.draw();
    };
    return Rect;
}());
var rect1 = new Rect(10, 10, 100, 100);
setTimeout(function () {
    rect1.setAttr('width', 1000);
}, 2000);
// const rect2 = new Rect(90, 50, 150, 50)
// setTimeout(() => {
//     rect2.setAttr('width', 1000)
// }, 2000)
