'use strict';

var terminal = document.querySelector('.terminal');

var colorArr = [
  'f60078', // dark pink
  'ff81ff', // light pink
  '8100c5', // purple
  'aa63bc', // light purple
  '00e3ee', // blue
  '0097ff', // green blue
  'eeeeee' // almost white
];

var blocks = {};
var count = 0;

var Block = function () {
  this.cycleColor = function () {
    console.log('current position ', document.querySelector('#block-' + this.position));
    this.colorPosition++;

    if (this.colorPosition > 6) {
      this.colorPosition = 0;
    }

    this.color = colorArr[this.colorPosition];
    document.querySelector('#block-' + this.position).style.backgroundColor = '#' + this.color;
  }.bind(this);
};

colorArr.forEach(function (color) {
  blocks[count] = new Block();
  blocks[count].color = color;
  // This is the current position selected
  blocks[count].colorPosition = count;
  // This is the constant position of the block in the row
  blocks[count].position = count;

  var blockEl = document.createElement('button');
  blockEl.classList.add('block');
  blockEl.id = 'block-' + count;
  blockEl.style.backgroundColor = '#' + color;
  terminal.appendChild(blockEl);
  blockEl.onclick = function () {
    this.cycleColor();
  }.bind(blocks[count]);

  count++;
});
