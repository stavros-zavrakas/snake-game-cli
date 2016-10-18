'use strict';

const helpers = require('./foodHelpers');
const Point = require('./Point');

class Food {
  constructor() {
    this.current = null;
    this.history = [];
  }

  place(snakeBody) {
    let point = helpers.findFreeSpaceForFood(snakeBody);

    this.current = new Point(point.x, point.y);

    this.history.push(this.current);
  }

  getCurrent() {
    return this.current;
  }
}

module.exports = Food;
