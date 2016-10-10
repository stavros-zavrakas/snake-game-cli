'use strict';

const Readline = require('readline');

let logger = require('./logger');

// size of frame
const MINWIDTH = 120;
const MINHEIGHT = 40;

let muted;

// draw the frame only
function frame(RL) {
  muted = false; // stdout enabled

  Readline.cursorTo(RL, 0, 0);
  Readline.clearScreenDown(RL);

  RL.write(`╔${'═'.repeat( MINWIDTH - 2 )}╗\n`);
  RL.write(`║${' '.repeat( MINWIDTH - 2 )}║\n`.repeat(MINHEIGHT - 2));
  RL.write(`╚${'═'.repeat( MINWIDTH - 2 )}╝\n`);

  // board(RL);
  muted = true;
}

// reset cursor and draw inside of frame
function board(RL) {
  muted = false; // stdout enabled

  Readline.cursorTo(RL, 2, 2); // go to second line

  // RL.write(`║ ${Date.now()}`); // print timestamp
  RL.write(`#`); // print timestamp

  Readline.cursorTo(RL, 0, MINHEIGHT); // go to last nile

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