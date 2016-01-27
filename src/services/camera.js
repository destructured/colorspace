'use strict';

const width = 600;
const height = 450;

const constraints = {
  audio: false,
  video: true
};

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;

function success(stream) {
  let video = document.createElement('video');
  video.setAttribute('autoplay', true);

  let videoWrapper = document.createElement('div');
  videoWrapper.style.width = width + 'px';
  videoWrapper.style.height = height + 'px';

  let handle = document.createElement('div');
  handle.classList.add('handle');
  handle.style.width = width + 'px';

  let close = document.createElement('div');
  close.textContent = '✖';
  close.classList.add('close-service');
  close.onclick = function () {
    document.body.removeChild(this.parentNode);
  };

  videoWrapper.appendChild(close);
  videoWrapper.appendChild(handle);
  videoWrapper.appendChild(video);
  videoWrapper.id = 'video-wrapper';
  document.body.appendChild(videoWrapper);

  window.stream = stream;
  video.src = window.URL.createObjectURL(stream);
}

function error(err) {
  console.log('navigator.getUserMedia error: ', err);
}

exports.generate = function () {
  navigator.getUserMedia(constraints, success, error);
};
