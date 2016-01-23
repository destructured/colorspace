'use strict';

exports.generate = function () {
  let canvas = document.createElement('canvas');
  canvas.id = 'service-draw';
  document.body.appendChild(canvas);
};
