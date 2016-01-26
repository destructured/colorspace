'use strict';

const menu = require('./menu');
const blocks = require('./blocks');
const commands = require('./commands');

menu.generate();
blocks.generate();

let play = document.querySelector('#play');

play.onclick = function () {
  let service = commands.matchSequence(commands.getCurrSequence());

  if (service) {
    blocks.runService(service);
    console.log('running service');
  } else {
    console.log('no such serivce');
  }
};
