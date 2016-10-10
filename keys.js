'use strict';

const keypress = require('keypress');
const bunyan = require('bunyan');

const log = bunyan.createLogger({
  name: 'keys',
  streams: [{
    level: 'info',
    path: 'keys.log' // log INFO and above to stdout
  }, {
    level: 'error',
    path: 'keys.log' // log ERROR and above to a file
  }]
});

const Writable = require('stream').Writable;
const Readline = require('readline');

// size of frame
const MINWIDTH = 120;
const MINHEIGHT = 40;

let keyName = null;
let i = 0; 

// custom stdout to suppress output
const customStdout = new Writable({
  write: function (chunk, encoding, callback) {

    if (!this.muted) {
      log.info(keyName);
      log.info(Buffer.byteLength(chunk, 'utf8'));
      // log.info(chunk.toString('utf8'));
      process.stdout.write(chunk, encoding);
    }
    
    return callback();
  }
});

// draw the frame only
function drawFrame(RL) {
  customStdout.muted = false; // stdout enabled

  Readline.cursorTo(RL, 0, 0);
  Readline.clearScreenDown(RL);

  RL.write(`╔${'═'.repeat( MINWIDTH - 2 )}╗\n`);
  RL.write(`║${' '.repeat( MINWIDTH - 2 )}║\n`.repeat(MINHEIGHT - 2));
  RL.write(`╚${'═'.repeat( MINWIDTH - 2 )}╝\n`);

  drawBoard(RL); // now draw inside
}


// reset cursor and draw inside of frame
function drawBoard(RL) {
  customStdout.muted = false; // stdout enabled

  Readline.cursorTo(RL, 0, 2); // go to second line

  RL.write(`║ ${Date.now()}`); // print timestamp

  Readline.cursorTo(RL, 0, MINHEIGHT); // go to last nile

  customStdout.muted = true; // stdout disabled to ignore other input
}

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

RL.input.on("keypress", (chunk, key) => {
  console.log('keyname', key.name);

  RL.clearLine();

  if (
    key.name === 'right' ||
    key.name === 'left' ||
    key.name === 'up' ||
    key.name === 'down'
  ) {
    drawBoard(RL); // redraw board only
  } else {
    return; // do nothing
  }
});

drawFrame(RL); // now go off and draw frame
