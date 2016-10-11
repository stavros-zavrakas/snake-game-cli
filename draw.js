'use strict';

const Readline = require('readline');

let config = require('./config');
let logger = require('./logger');

let mutex;

// Draw the frame
function frame(RL) {
  mutex = false; // stdout enabled

  Readline.cursorTo(RL, 0, 0);
  Readline.clearScreenDown(RL);

  RL.write(`╔${'═'.repeat(config.WIDTH - 2 )}╗\n`);
  RL.write(`║${' '.repeat(config.WIDTH - 2 )}║\n`.repeat(config.HEIGHT - 2));
  RL.write(`╚${'═'.repeat(config.WIDTH - 2 )}╝\n`);

  mutex = true;
}

// Draw the snake move. It is moving the cursor to the
// head of the snake and prints the # symbol and then if
// the tail exists, the cursor is moving to the tail
// coordinates and prints the whitespace symbol
function board(RL, snake) {
  mutex = false; // stdout enabled

  let head = snake.getHead();
  let tail = snake.getTail();
  logger.info(tail);

  // Print the new head of the snake
  Readline.cursorTo(RL, head.x, head.y);
  RL.write(`#`);

  // Remove the tail from the board
  if (tail) {
    Readline.cursorTo(RL, tail.x, tail.y);
    RL.write(` `);
  }

  // Move the cursor just after the frame
  Readline.cursorTo(RL, 0, config.HEIGHT);

  mutex = true; // stdout disabled to ignore other input
}

// Write the stream to the stdout
function writeBuffer(chunk, encoding, callback) {
  if (!mutex) {
    process.stdout.write(chunk, encoding);
  }

  return callback();
}

module.exports = {
  frame: frame,
  board: board,
  writeBuffer: writeBuffer
};
