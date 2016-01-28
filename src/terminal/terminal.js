'use strict';

const menu = require('./menu');
const blocks = require('./blocks');
const commands = require('./commands');

menu.generate();
blocks.generate();

let play = document.querySelector('#play');
let errorMsg = document.querySelector('#error');

play.onclick = function () {
  let service = commands.matchSequence(commands.getCurrSequence());

  if (service) {
    blocks.runService(service);
  } else {
    errorMsg.classList.add('active');
    setTimeout(() => {
      errorMsg.classList.remove('active');
    }, 2000);
  }
};
