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

  place() {
    // @todo: check that we don't place it over the snake!
    let x = libs.getRandomInt(0, config.WIDTH);
    let y = libs.getRandomInt(0, config.HEIGHT);

    this.current = new Point(x, y);

    this.history.push(this.current);
  }

  getCurrent() {
    return this.current;
  }
}

module.exports = Food;