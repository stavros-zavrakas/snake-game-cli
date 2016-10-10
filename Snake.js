'use strict';

const logger = require('./logger');
// let Point = require('./Point');

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Snake {
  constructor() {
    this.path = [];

    this.head = new Point(1, 1);
    this.path.push(this.head);
  }

  getHead() {
    return this.head;
  }

  getTail() {
    let tail = null;

    if (this.path[0]) {
      tail = this.path[0];
    }

    return tail;
  }

  addToHead(x, y) {
    this.head = new Point(x, y);

    this.path.push(this.head);
  }

  removeFromTail() {
    this.path.shift();

    logger.info(this.path);
  }
}

module.exports = Snake;
