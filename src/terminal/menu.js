'use strict';

const blockActions = {
  draw: ['ff0048', '8f00af', 'ff0048', '8f00af', 'ff0048', '8f00af'],
  camera: ['00cc66', 'ffb600', '0097ff', '00cc66', 'ffb600', '0097ff']
};

const blocks = require('./blocks').getBlocks();

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
    listItem.setAttribute('data-service', k);
    listItem.onclick = function () {
      let buttons = listItem.querySelectorAll('.block');

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
