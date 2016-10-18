'use strict';

// const Point = require('./Point');
// const libs = require('./libs');
// const c = require('./constants');
// const config = require('./config');
const logger = require('./logger');

class Game {
  constructor(timeout) {
    this.timeout = timeout || 100;
    this.interval = null;
  }

  start(RL, snake, food, draw) {
    this.interval = setInterval( () => {
      snake.move();

      let hasCrashed = snake.hasCrashed();
      if (hasCrashed) {
        this.end(RL, draw);
      }

      draw.slither(RL, snake);

      let hasEaten = snake.hasEaten(food);
      logger.info(`hasEaten: ${hasEaten}`);
      if (hasEaten) {
        food.place();
        draw.food(RL, food);
      } else {
        snake.removeFromTail();
      }
    }, this.timeout);

    food.place();
    draw.grid(RL);
    draw.food(RL, food);
  }

  end(RL, draw) {
    clearInterval(this.interval);

    draw.message(RL);
    process.exit(0);
  }
}

module.exports = Game;