'use strict';

const blockActions = {
  draw: ['ff0048', '8f00af', 'ff0048', '8f00af', 'ff0048', '8f00af'],
  camera: ['00cc66', 'ffb600', '0097ff', '00cc66', 'ffb600', '0097ff']
};

let sequenceKeys = {};
let currSequence;

for (let k in blockActions) {
  sequenceKeys[blockActions[k].join(',')] = k;
}

exports.blockActions = function () {
  return blockActions;
};

exports.matchSequence = function (sequence) {
  console.log(sequence)
  return sequenceKeys[sequence] || false;
};

exports.getCurrSequence = function () {
  return currSequence;
};

exports.setCurrSequence = function (sequence) {
  currSequence = sequence;
};
