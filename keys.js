'use strict';

const keypress = require('keypress');

const Writable = require('stream').Writable;
const Readline = require('readline');

const Snake = require('./Snake');
const draw = require('./draw');
const c = require('./constants');

let snake = new Snake(c.DIRECTION_RIGHT);

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

RL.input.on('keypress', (chunk, key) => {
  console.log('keyname', key.name);

  RL.clearLine();

  if (c.AVAILABLE_DIRECTIONS.indexOf(key.name) > -1) {
    snake.changeDirection(key.name);
  }
});

let interval = setInterval(function () {
  snake.move();

  let hasCrashed = snake.hasCrashed();
  if (hasCrashed) {
    clearInterval(interval);

    draw.message(RL);
    process.exit(0);
  }

  draw.slither(RL, snake);
  snake.removeFromTail();
}, 100);

draw.grid(RL);
draw.placeFood(RL);
