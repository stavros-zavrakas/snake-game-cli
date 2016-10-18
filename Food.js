'use strict';

const Point = require('./Point');
const libs = require('./libs');
const c = require('./constants');
const config = require('./config');
const logger = require('./logger');

class Food {
  constructor() {
    this.current = null;
    this.history = [];
  }

  place(snakeBody) {
    // @todo: check that we don't place it over the snake!
    let i, bodyPiece, conflict = false;
    let x = libs.getRandomInt(1, config.WIDTH - 2);
    let y = libs.getRandomInt(1, config.HEIGHT - 2);

    while (1) {
      // scan to check if there is conflict with the body of the snake
      for (i = 0; i < snakeBody.length; i++) {
        bodyPiece = snakeBody[i];
        conflict = (x === bodyPiece.getX() && y === bodyPiece.getY());
        // If we find a conflict with a part of the body, there is no
        // reason to continue the iteration
        if (conflict) {
          break;
        }
      }

      // If there is conflict, pick random point again, otherwise break
      if (conflict) {
        x = libs.getRandomInt(1, config.WIDTH - 2);
        y = libs.getRandomInt(1, config.HEIGHT - 2);
        conflict = false;
      } else {
        break;
      }
    }

    this.current = new Point(x, y);

    this.history.push(this.current);
  }

  getCurrent() {
    return this.current;
  }
}

module.exports = Food;
