import { Rect } from "./rect";
import { QuadTree } from './quadTree.js'

export class Stage {
  dom: HTMLCanvasElement;
  context: any
  private domChildren: Rect[] = []
  private renderChildren: Rect[] = []
  runningLoop: Boolean = false
  centerPointX: number
  centerPointY: number
  starClassify: number = 4 //启动分裂四叉树算法的开关，例如一个区域内大于10个元素即要进行分裂
  quadTree: QuadTree | null

  constructor() {
    this.dom = document.getElementById('rectDrawing') as HTMLCanvasElement
    this.context = this.dom.getContext('2d')
    this.bindEvent()
    this.setCenterPoint()
  }

  setCenterPoint() {
    const domWidth = window.getComputedStyle(this.dom).width
    const domHeight = window.getComputedStyle(this.dom).height
    this.centerPointX = parseInt(domWidth) / 2
    this.centerPointY = parseInt(domHeight) / 2
  }

  bindEvent() {
    // addEventListener方式
    this.dom.addEventListener('click', (e) => {
      const { x, y } = this.getPoint(e)
      // const boxRects = this.getBoxRectsByPoint(x, y)
      // this.renderChildren.forEach(rect => {
      // console.log('将要参与循环的元素：', boxRects)
      let resultRects = this.renderChildren
      if (this.quadTree) {
        resultRects = this.quadTree.query({ x, y })
      }
      console.log('将要参与循环的元素：', resultRects)
      resultRects.length > 0 && resultRects.forEach(rect => {
        Object.keys(rect.eventListeners).length !== 0 && rect.__innerAddEventListener('click', x, y)
        rect.onClick && rect.__innerOnclick(x, y)
        rect.isClickSelf = null
      })
    }, false)
  }
  // getBoxRectsByPoint(x, y) {
  //   if (x < this.centerPointX && y < this.centerPointY) {
  //     return this.boxs.box1
  //   }
  //   if (x < this.centerPointX && y > this.centerPointY) {
  //     return this.boxs.box2
  //   }
  //   if (x > this.centerPointX && y < this.centerPointY) {
  //     return this.boxs.box3
  //   }
  //   if (x >= this.centerPointX && y >= this.centerPointY) {
  //     return this.boxs.box4
  //   }
  //   return []
  // }
  getPoint(e) {
    const clientRect = this.dom.getBoundingClientRect()
    const x = e.clientX - clientRect.left
    const y = e.clientY - clientRect.top
    return { x, y }
  }

  getContext() {
    return this.context
  }

  clearCanvas() {
    this.context.clearRect(0, 0, this.dom.width, this.dom.height)
  }

  appendChild(rect: Rect) {
    this.domChildren.push(rect)
    this.renderChildren = this.domChildren
    rect.parent = this
    this.render()
    // if(!this.runningLoop){
    //   Promise.resolve().then(() => {
    //     //放在微任务里，等render完后再归类
    //     console.log('begain to classify')
    //     this.classifyRect()
    //   })
    //   this.runningLoop = true
    // }

  }

  handleRenderChildren() {
    this.renderChildren = this.domChildren.sort((a, b) => a.zIndex - b.zIndex)
  }

  render(): void {
    if (!this.runningLoop) {
      Promise.resolve().then(() => {
        this.runningLoop = false
        console.log('stage render')
        this.clearCanvas()
        if (this.renderChildren.length > 0) {
          this.renderChildren.forEach(rect => {
            rect.render()
          })
        }
        if (this.renderChildren.length > this.starClassify) {
          // this.classifyRect()
          const domWidth = window.getComputedStyle(this.dom).width
          const domHeight = window.getComputedStyle(this.dom).height
          this.quadTree = new QuadTree({
            x: 0, y: 0, width: parseInt(domWidth), height: parseInt(domHeight)
          }, this.starClassify)
          this.renderChildren.forEach(item => {
            this.quadTree.insert(item)
          })
          console.log('this.quadTree', this.quadTree)
        }
      })
      this.runningLoop = true
    }
  }
  // classifyRect() {
  //   console.log('begain to classify')
  //   this.domChildren.forEach(item => {
  //     if (item.x < this.centerPointX && item.y < this.centerPointY) {
  //       //起点在第一个区域(左上)，则一定在第一个区域上
  //       this.boxs.box1.push(item)
  //       if (item.x + item.width > this.centerPointX) {
  //         // 进入了第三个区域（右上）
  //         this.boxs.box3.push(item)
  //       }
  //       if (item.y + item.height > this.centerPointY) {
  //         // 进入了第二个区域（左下）
  //         this.boxs.box2.push(item)
  //       }
  //       if (item.x + item.width > this.centerPointX && item.y + item.height > this.centerPointY) {
  //         // 进入了第四个区域（右下）
  //         this.boxs.box4.push(item)
  //       }

  //     }
  //     if (item.x < this.centerPointX && item.y > this.centerPointY) {
  //       // 起点在第二个区域（左下），则一定在第二个区域上
  //       this.boxs.box2.push(item)
  //       if (item.x + item.width < this.centerPointX) {
  //         // 进入了第四个区域（右下）
  //         this.boxs.box4.push(item)
  //       }
  //     }
  //     if (item.x > this.centerPointX && item.y < this.centerPointY) {
  //       // 起点在第三个区域（右上），则一定在第三个区域上
  //       this.boxs.box3.push(item)
  //       if (item.y + item.height > this.centerPointY) {
  //         // 进入了第四个区域（右下）
  //         this.boxs.box4.push(item)
  //       }
  //     }
  //     if (item.x >= this.centerPointX && item.y >= this.centerPointY) {
  //       // 起点在第四个区域（右下），则一定在第四个区域上
  //       this.boxs.box4.push(item)
  //     }
  //   })
  //   console.log('分类结果：', this.boxs)
  // }

}
