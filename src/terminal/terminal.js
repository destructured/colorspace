'use strict';

const menu = require('./menu');
const blocks = require('./blocks');

menu.generate();
blocks.generate();

let play = document.querySelector('#play');

play.onclick = function () {
  blocks.runService('draw');
  console.log('running service')
};
