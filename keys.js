'use strict';

const keypress = require('keypress');

const Writable = require('stream').Writable;
const Readline = require('readline');

const axis = require('./axis');
const draw = require('./draw');

// custom stdout to suppress output
const customStdout = new Writable({
  write: draw.writeBuffer
});

// create the readline interface
const RL = Readline.createInterface({
  input: process.stdin,
  output: customStdout,
  terminal: true,
  historySize: 0,
});

// some options I've been playing with
Readline.emitKeypressEvents(process.stdin);
process.stdin.setEncoding('utf8');
process.stdin.setRawMode(true);

keypress(process.stdin);

let move = 'right';
let availableMoves = ['right', 'left', 'up', 'down'];

RL.input.on('keypress', (chunk, key) => {
  console.log('keyname', key.name);

  RL.clearLine();

  if (availableMoves.indexOf(key.name) > -1) {
    move = key.name;
  }
});

let interval = setInterval(function () {
  console.log('calling');
  if (move === 'right') {
    axis.moveRight();
  } else if (move === 'left') {
    axis.moveLeft();
  } else if (move === 'up') {
    axis.moveUp();
  } else if (move === 'down') {
    axis.moveDown();
  }

  draw.board(RL);
}, 100);

draw.frame(RL);

process.on('SIGINT', () => {
  clearInterval(interval);
  console.log('Received SIGINT.  Press Control-D to exit.');
});