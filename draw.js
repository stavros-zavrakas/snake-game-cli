'use strict';

const Readline = require('readline');

let config = require('./config');
let logger = require('./logger');

let muted;

// draw the frame only
function frame(RL) {
  muted = false; // stdout enabled

  Readline.cursorTo(RL, 0, 0);
  Readline.clearScreenDown(RL);

  RL.write(`╔${'═'.repeat(config.WIDTH - 2 )}╗\n`);
  RL.write(`║${' '.repeat(config.WIDTH - 2 )}║\n`.repeat(config.HEIGHT - 2));
  RL.write(`╚${'═'.repeat(config.WIDTH - 2 )}╝\n`);

  // board(RL);
  muted = true;
}

// reset cursor and draw inside of frame
function board(RL, snake) {
  muted = false; // stdout enabled

  let tail = snake.getTail();
  let head = snake.getHead();
  logger.info(tail);

  // Print the new body of the snake
  Readline.cursorTo(RL, head.x, head.y);
  RL.write(`#`);

  // Print the new body of the snake
  if (tail) {
    Readline.cursorTo(RL, tail.x, tail.y);
    RL.write(` `);
  }

  Readline.cursorTo(RL, 0, config.HEIGHT); // go to last line

  muted = true; // stdout disabled to ignore other input
}

function writeBuffer(chunk, encoding, callback) {

  if (!muted) {
    process.stdout.write(chunk, encoding);
  }

  return callback();
}

module.exports = {
  frame: frame,
  board: board,
  writeBuffer: writeBuffer
};