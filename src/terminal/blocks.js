'use strict';

const commands = require('./commands');

// Services
const draw = require('../services/draw');
const camera = require('../services/camera');

const colorArr = [
  'ff0048', // dark pink
  'ff6500', // orange
  'ffb600', // yellow
  '00cc66', // green blue
  '0097ff', // blue
  '8f00af' // dark purple
];

let blocks = {};

exports.getBlocks = function () {
  return blocks;
};

exports.runService = function (service) {
  switch (service) {
    case 'draw':
      draw.generate();
      break;
    case 'camera':
      camera.generate();
      break;
    default:
      break;
  }
};

exports.generate = function () {
  let terminal = document.querySelector('.terminal');

  let Block = function () {
    this.setColor = function (color) {
      this.color = color;
      document.querySelector('#block-' + this.position).style.backgroundColor = '#' + this.color;
      localforage.setItem('blocks', JSON.stringify(blocks), (err) => {
        if (err) {
          console.log(err);
        }
      });
    };

    this.cycleColor = function () {
      this.colorPosition++;

      if (this.colorPosition > colorArr.length - 1) {
        this.colorPosition = 0;
      }

      this.color = colorArr[this.colorPosition];
      document.querySelector('#block-' + this.position).style.backgroundColor = '#' + this.color;

      let blocksArr = [];

      for (let k in blocks) {
        blocksArr.push(blocks[k].color);
      }

      commands.setCurrSequence(blocksArr.join(','));

      localforage.setItem('blocks', JSON.stringify(blocks), (err) => {
        if (err) {
          console.log(err);
        }
      });
    }.bind(this);
  };

  function setBlockItem(opts) {
    blocks[opts.count] = new Block();
    blocks[opts.count].color = opts.color;
    // This is the current position selected
    blocks[opts.count].colorPosition = opts.colorPosition;
    // This is the constant position of the block in the row
    blocks[opts.count].position = opts.position;

    let blockEl = document.createElement('button');
    blockEl.classList.add('block');
    blockEl.id = 'block-' + opts.count;
    blockEl.style.backgroundColor = '#' + opts.color;
    terminal.appendChild(blockEl);
    blockEl.onclick = function () {
      this.cycleColor();
    }.bind(blocks[opts.count]);
  }

  let blocksArr = [];

  localforage.getItem('blocks', (err, blks) => {
    if (err || !blks) {
      let count = 0;
      colorArr.forEach((color) => {
        setBlockItem({
          count: count,
          color: color,
          colorPosition: count,
          position: count
        });
        blocksArr.push(color);
        count++;
      });
    } else {
      blks = JSON.parse(blks);
      for (let k in blks) {
        setBlockItem({
          count: k,
          color: blks[k].color,
          colorPosition: blks[k].colorPosition,
          position: blks[k].position
        });
        blocksArr.push(blks[k].color);
      }
    }

    commands.setCurrSequence(blocksArr.join(','));
  });
};
