'use strict';

let canvas;
let ctx;
let drawing = false;
let flag = false;
let prevX = 0;
let prevY = 0;
let currX = 0;
let currY = 0;
let clientX;
let clientY;
const width = 800;
const height = 600;

let currColor = 'rgba(255, 0, 128, 0.8)';
let currComposition = 'screen';

let color = '#fff';
let brushWidth = 10;

function draw() {
  ctx.lineCap = 'round';
  ctx.globalCompositeOperation = currComposition;
  ctx.beginPath();
  ctx.moveTo(prevX, prevY);
  ctx.lineTo(currX, currY);
  ctx.strokeStyle = color;
  ctx.lineWidth = brushWidth;
  ctx.stroke();
  ctx.shadowBlur = 10;
  ctx.shadowColor = 'rgba(255, 255, 255, 0.95)';
  ctx.stroke();
  ctx.shadowBlur = 12;
  ctx.shadowColor = 'rgba(255, 255, 255, 0.85)';
  ctx.stroke();
  ctx.shadowBlur = 15;
  ctx.shadowColor = currColor;
  ctx.stroke();
  ctx.shadowBlur = 18;
  ctx.shadowColor = currColor;
  ctx.stroke();
  ctx.shadowBlur = 30;
  ctx.shadowColor = currColor;
  ctx.stroke();
  ctx.closePath();
}

function setDraw() {
  ctx = canvas.getContext('2d');

  function setMove(type, e) {
    if (e.touches) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY - 105;
    }

    switch (type) {
      case 'down':
        prevX = currX;
        prevY = currY;
        currX = clientX;
        currY = clientY;

        flag = true;
        drawing = true;

        if (drawing) {
          ctx.beginPath();
          ctx.fillStyle = color;
          ctx.fillRect(currX, currY, 2, 2);
          ctx.closePath();
          drawing = false;
        }
        break;
      case 'up':
      case 'out':
        flag = false;
        break;
      case 'move':
        if (flag) {
          prevX = currX;
          prevY = currY;
          currX = clientX;
          currY = clientY;
          draw();
        }
        break;
    }
  }

  canvas.addEventListener('mouseup', (e) => {
    setMove('up', e);
  }, false);

  canvas.addEventListener('mousedown', (e) => {
    setMove('down', e);
  }, false);

  canvas.addEventListener('mouseout', (e) => {
    setMove('out', e);
  }, false);

  canvas.addEventListener('mousemove', (e) => {
    setMove('move', e);
  }, false);
}

exports.generate = function () {
  canvas = document.createElement('canvas');
  canvas.id = 'service-draw';

  let canvasWrapper = document.createElement('div');
  canvasWrapper.style.width = width + 'px';
  canvasWrapper.style.height = height + 'px';
  canvas.width = width;
  canvas.height = height;

  let handle = document.createElement('div');
  handle.classList.add('handle');
  handle.style.width = width + 'px';

  let close = document.createElement('div');
  close.textContent = '✖';
  close.classList.add('close-service');
  close.onclick = function () {
    document.body.removeChild(this.parentNode);
    currColor = 'rgba(255, 0, 128, 0.8)';
    currComposition = 'screen';
  };
  canvasWrapper.appendChild(close);

  let save = document.createElement('div');
  save.textContent = '⬇';
  save.classList.add('save');
  save.onclick = function () {
    ctx.fillStyle = '#111111';
    ctx.fill();
    let image = canvas.toDataURL('image/jpeg').replace('image/jpeg', 'image/octet-stream');
    window.location.href = image;
  };
  canvasWrapper.appendChild(save);

  let colors = {
    pink: {
      rgba: 'rgba(255, 0, 128, 0.8)'
    },
    blue: {
      rgba: 'rgba(0, 134, 255, 0.8)'
    },
    green: {
      rgba: 'rgba(0, 220, 0, 0.8)'
    }
  };

  let color;

  for (let k in colors) {
    color = document.createElement('div');
    color.classList.add('color');
    color.classList.add(k);
    color.style.backgroundColor = colors[k].rgba;
    color.onclick = function () {
      currColor = this.style.backgroundColor;
      for (let k in colors) {
        document.querySelector('.' + k).classList.remove('active');
      }
      this.classList.add('active');
    };
    handle.appendChild(color);
  }

  let filters = ['screen', 'color-burn'];

  let filter;

  filters.forEach((f) => {
    filter = document.createElement('div');
    filter.classList.add('filter');
    filter.classList.add(f);
    filter.textContent = f;
    filter.onclick = function () {
      currComposition = this.textContent;
      filters.forEach((f) => {
        document.querySelector('.' + f).classList.remove('active');
      });
      this.classList.add('active');
    };
    handle.appendChild(filter);
  });

  canvasWrapper.id = 'canvas-wrapper';
  canvasWrapper.appendChild(handle);
  canvasWrapper.appendChild(canvas);

  handle.querySelector('.pink').classList.add('active');
  handle.querySelector('.screen').classList.add('active');

  document.body.appendChild(canvasWrapper);

  setDraw();
};
