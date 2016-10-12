'use strict';

// const Point = require('./Point');
// const libs = require('./libs');
// const c = require('./constants');
// const config = require('./config');
// const logger = require('./logger');

class Game {
  constructor(timeout) {
    this.timeout = timeout || 100;
    this.interval = null;
  }

  start(RL, snake, draw) {
    this.interval = setInterval(function () {
      snake.move();

      let hasCrashed = snake.hasCrashed();
      if (hasCrashed) {
        this.end(RL, draw);
      }

      draw.slither(RL, snake);
      snake.removeFromTail();
    }, this.timeout);

  }

  end(RL, draw) {
    clearInterval(this.interval);

    draw.message(RL);
    process.exit(0);
  }
}

module.exports = Game;