'use strict';

const keypress = require('keypress');

const Writable = require('stream').Writable;
const Readline = require('readline');

const Game = require('./Game');
const Snake = require('./Snake');
const Food = require('./Food');
const draw = require('./draw');
const c = require('./constants');
const logger = require('./logger');

let snake = new Snake(c.DIRECTION_RIGHT);
let food = new Food();

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

let game = new Game(100);

RL.input.on('keypress', (chunk, key) => {
  console.log('keyname', key.name);

  RL.clearLine();

  if (c.AVAILABLE_DIRECTIONS.indexOf(key.name) > -1) {
    snake.changeDirection(key.name);
  }
});

game.start(RL, snake, draw);
draw.grid(RL);
food.place();
draw.food(RL, food);
