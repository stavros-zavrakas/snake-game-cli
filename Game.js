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
      // Move the snake (the head of the snake)
      snake.move();

      // Stop the game if the snake crashed against the wall or its body
      let hasCrashed = snake.hasCrashed();
      if (hasCrashed) {
        this.end(RL, draw);
      }

      // Draw the slither on the console
      draw.slither(RL, snake);

      // Check if the snake just ate the food
      // If just ate place new food and draw it in the grid and don't remove a piece of the tail
      // If didn't eat remove the last piece of the tail
      let hasEaten = snake.hasEaten(food);
      if (hasEaten) {
        food.place(snake.getBody());
        draw.food(RL, food);
      } else {
        snake.removeFromTail();
      }
    }, this.timeout);

    // Place the food, draw the grid and the food on the console
    food.place(snake.getBody());
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