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
function board(RL) {
  muted = false; // stdout enabled

  Readline.cursorTo(RL, 2, 2); // go to second line

  // RL.write(`║ ${Date.now()}`); // print timestamp
  RL.write(`#`); // print timestamp

  Readline.cursorTo(RL, 0, config.HEIGHT); // go to last nile

  muted = true; // stdout disabled to ignore other input
}

function writeBuffer(chunk, encoding, callback) {

  if (!muted) {
    logger.info(Buffer.byteLength(chunk, 'utf8'));

    process.stdout.write(chunk, encoding);
  }

  return callback();
}

module.exports = {
  frame: frame,
  board: board,
  writeBuffer: writeBuffer
};