/**
 * Created by zhouzhen on 2017/5/24.
 */
/**
 * Created by zhouzhen on 2017/5/24.
 */
import React, {
  Component,
} from 'react';
import './CanvasBg.css';

class CanvasBg extends Component {
  componentDidMount() {
    var canvas = this.myCanvas;
    var wW =  window.innerWidth;
    var wH =  window.innerHeight;
    var circleCount = 100; // 圆个数
    var friedTime, drawTime, time;
    var open = false; // true:爆炸移动/false:跟随鼠标

    canvas.width = wW;
    canvas.height = wH;

// 创建2d画布
    var ctx = canvas.getContext('2d');

// 鼠标移动事件
    var mouse = {};
    canvas.addEventListener('mousemove', track_move, false);

    function track_move(e) {
      mouse.x = e.pageX;
      mouse.y = e.pageY;
    }

// 鼠标点击炸开
    canvas.addEventListener('click', mouse_click, false);

    function mouse_click(e) {
      clearInterval(drawTime);
      clearInterval(friedTime);
      open = !open;
      if (open) {
        // 开启爆炸
        for (var i in circles) {
          // 爆炸后移动速度
          circles[i].speed = 5 * Math.random() + 10;
        }
        friedTime = setInterval(fried, 50);
      } else {
        // 跟随鼠标
        drawTime = setInterval(draw, 50);
      }
    }

// 点击后爆炸
    function fried() {
      ctx.clearRect(0, 0, wW, wH);
      ctx.fillStyle = 'raba(0,0,0,0)';
      ctx.globalCompositeOperation = 'lighter';
      ctx.fillRect(0, 0, wW, wH);
      for (var i in circles) {
        var c = circles[i];

        ctx.beginPath();
        var gradient = ctx.createRadialGradient(c.point.x, c.point.y, 0, c.point.x, c.point.y, c.radius);
        gradient.addColorStop(0, 'rgba(' + c.r + ',' + c.g + ',' + c.b + ',' + c.opacity + ')');
        gradient.addColorStop(1, 'rgba(' + c.r + ',' + c.g + ',' + c.b + ',' + .2 + ')');
        ctx.fillStyle = gradient;
        ctx.arc(c.point.x, c.point.y, c.radius, Math.PI * 2, false);
        ctx.fill();

        // 爆炸移动位置
        if (c.speed > 0) {
          c.point.x += c.move.x * c.speed;
          c.point.y += c.move.y * c.speed;
          c.speed -= .02;
        }
        // 碰到墙随机反射移动
        if (c.point.x - c.radius <= 0 || c.point.x + c.radius >= wW) {
          c.move.x = -c.move.x;
        }
        if (c.point.y - c.radius <= 0 || c.point.y + c.radius >= wH) {
          c.move.y = -c.move.y;
        }
      }
    }

// 初始化圆
    var circles = [];
    for (var i = 0; i < circleCount; i++) {
      circles.push(new Circle());
    }

// 创建圆对象
    function Circle() {
      // 圆半径 10-30
      this.radius = 10 + Math.random() * 20;

      // 圆位置
      if (mouse.x && mouse.y) {
        this.point = {
          x: mouse.x,
          y: mouse.y
        }
      } else {
        this.point = {
          x: wW / 2,
          y: wH / 2
        }
      }

      // 圆随机移动
      this.move = {
        x: -5 + Math.random() * 10,
        y: -5 + Math.random() * 10
      }

      // 圆的颜色
      this.r = Math.round(Math.random() * 255);
      this.g = Math.round(Math.random() * 255);
      this.b = Math.round(Math.random() * 255);

      // 透明度
      this.opacity = .5 + Math.random() * .5;
    }

// 绘制圆跟随鼠标移动
    function draw() {
      ctx.clearRect(0, 0, wW, wH);
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, wW, wH);
      for (var i in circles) {
        var c = circles[i];
        // 随机移动速度
        c.speed = i * Math.random() + 10;

        ctx.beginPath();
        var gradient = ctx.createRadialGradient(c.point.x, c.point.y, 0, c.point.x, c.point.y, c.radius);
        gradient.addColorStop(0, 'rgba(' + c.r + ',' + c.g + ',' + c.b + ',' + c.opacity + ')');
        gradient.addColorStop(1, 'rgba(' + c.r + ',' + c.g + ',' + c.b + ',' + .2 + ')');
        ctx.fillStyle = gradient;
        ctx.arc(c.point.x, c.point.y, c.radius, Math.PI * 2, false);
        ctx.fill();

        // 跟随鼠标移动
        if (mouse.x && mouse.y) {
          if (Math.abs(mouse.x - c.point.x) <= c.speed) {
            c.point.x = mouse.x;
          }
          if (Math.abs(mouse.y - c.point.y) <= c.speed) {
            c.point.y = mouse.y;
          }
          // 圆在鼠标右边,圆向左移动
          if (mouse.x < c.point.x) {
            c.point.x -= c.speed;
          }
          // 圆在鼠标左边，圆向右移动
          if (mouse.x > c.point.x) {
            c.point.x += c.speed;
          }
          // 圆在鼠标下面
          if (mouse.y < c.point.y) {
            c.point.y -= c.speed;
          }
          // 圆在鼠标上面
          if (mouse.y > c.point.y) {
            c.point.y += c.speed;
          }
        }
      }
    }

    drawTime = setInterval(draw, 50);
  }


  render() {
    return (
      <div className="CanvasBgBox">
        <canvas id="myCanvas" ref={(ref) => {
          this.myCanvas = ref;
        }}></canvas>
      </div>
    );
  }
}

export default CanvasBg;

