// 本程式畫圖對不準之 bug 的解決，必須直接設定 <canvas class="whiteboard" width="300", height="300"></canvas>
// 而不能用 css 去設 width, height ， 否則 canvas 的 width, height 會變成 300, 150 (這很奇怪，感覺是個 bug)
// 而且會導致畫 line 從 (0,0) 到 (100,100) 整個走樣，變成橫軸寬度減半。
'use strict';

(function() {

  var socket = io('http://localhost:3000')  // var socket = io(); 改成新版 socket.io 2.0 的語法
  var canvas = document.querySelectorAll('.whiteboard')[0];
  var colors = document.querySelectorAll('.color');
  var context = canvas.getContext('2d');

  var current = {
    color: 'black'
  };
  var drawing = false;

  canvas.addEventListener('mousedown', onMouseDown, false);
  canvas.addEventListener('mouseup', onMouseUp, false);
  canvas.addEventListener('mouseout', onMouseUp, false);
  canvas.addEventListener('mousemove', throttle(onMouseMove, 10), false);

  for (var i = 0; i < colors.length; i++){
    colors[i].addEventListener('click', onColorUpdate, false);
  }

  socket.on('drawing', onDrawingEvent);

  window.addEventListener('resize', onResize, false);
  onResize();


  function drawLine(x0, y0, x1, y1, color, emit){
    context.beginPath();
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.strokeStyle = color;
    context.lineWidth = 2;
    context.stroke();
    context.closePath();

    if (!emit) { return; }
    // var w = canvas.width;
    // var h = canvas.height;

    socket.emit('drawing', {
      x0: x0, // / w,
      y0: y0, // / h,
      x1: x1, // / w,
      y1: y1, // / h,
      color: color
    });
  }

  function onMouseDown(e){
    drawing = true;
    current.x = e.offsetX;
    current.y = e.offsetY;
    console.log('current=', current, 'e=', e)
  }

  function onMouseUp(e){
    if (!drawing) { return; }
    drawing = false;
    drawLine(current.x, current.y, e.offsetX, e.offsetY, current.color, true);
  }

  function onMouseMove(e){
    if (!drawing) { return; }
    drawLine(current.x, current.y, e.offsetX, e.offsetY, current.color, true);
    current.x = e.offsetX;
    current.y = e.offsetY;
  }

  function onColorUpdate(e){
    current.color = e.target.className.split(' ')[1];
  }

  // limit the number of events per second
  function throttle(callback, delay) {
    var previousCall = new Date().getTime();
    return function() {
      var time = new Date().getTime();

      if ((time - previousCall) >= delay) {
        previousCall = time;
        callback.apply(null, arguments);
      }
    };
  }

  function onDrawingEvent(data){
    // var w = canvas.width;
    // var h = canvas.height;
    // drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
    drawLine(data.x0, data.y0, data.x1, data.y1, data.color);
  }

  // make the canvas fill its parent
  function onResize() {
    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;
    // canvas.width = 100
    // canvas.height = 100
    // console.log('onResize:canvas(w,h)=', canvas.width, canvas.height)
    drawLine(0, 0, 100, 100, 'black', true);
  }

})();
