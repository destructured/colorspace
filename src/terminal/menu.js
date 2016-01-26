'use strict';

const commands = require('./commands');

const blockActions = commands.blockActions();

const blocks = require('./blocks').getBlocks();

let play = document.querySelector('#play');

exports.blockActions = function () {
  return blockActions;
};

exports.generate = function () {
  let menuBtn = document.querySelector('#menu');
  let menuItems = document.querySelector('#menu-items');
  let display = false;

  for (let k in blockActions) {
    let listItem = document.createElement('li');
    let p = document.createElement('p');
    p.textContent = k;
    listItem.id = 'menu-' + k;
    listItem.setAttribute('data-id', blockActions[k].join(','));
    listItem.setAttribute('data-service', k);
    listItem.onclick = function () {
      let buttons = listItem.querySelectorAll('.block');

      commands.setCurrSequence(this.getAttribute('data-id'));

      for (let i = 0; i < buttons.length; i++) {
        console.log(buttons[i]);
        blocks[i].setColor(buttons[i].getAttribute('data-color'));
      }

      menuBtn.click();
    };

    blockActions[k].forEach((color) => {
      let item = document.createElement('button');
      item.classList.add('block');
      item.style.backgroundColor = '#' + color;
      item.setAttribute('data-color', color);
      listItem.appendChild(item);
      listItem.appendChild(p);
    });

    menuItems.appendChild(listItem);
  }

  menuBtn.onclick = function () {
    if (display) {
      menuItems.classList.remove('active');
    } else {
      menuItems.classList.add('active');
    }

    display = !display;
  };
};
