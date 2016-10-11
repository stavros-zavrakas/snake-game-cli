'use strict';

const keypress = require('keypress');

const Writable = require('stream').Writable;
const Readline = require('readline');

const Snake = require('./Snake');
const draw = require('./draw');

let snake = new Snake();

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
  snake.move(move);

  let hasCrashed = snake.hasCrashed();
  if (hasCrashed) {
    clearInterval(interval);
  }

  draw.slither(RL, snake);
  snake.removeFromTail();
}, 100);

draw.grid(RL);
