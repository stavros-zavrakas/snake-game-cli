'use strict';

const keypress = require('keypress');

const Writable = require('stream').Writable;
const Readline = require('readline');

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

RL.input.on('keypress', (chunk, key) => {
  console.log('keyname', key.name);

  RL.clearLine();

  if (
    key.name === 'right' ||
    key.name === 'left' ||
    key.name === 'up' ||
    key.name === 'down'
  ) {
    draw.board(RL);
  }
});

draw.frame(RL);
