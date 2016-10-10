'use strict';

const config = require('./config');
const logger = require('./logger');
// let Point = require('./Point');

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
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

  getHeadCoordinates() {
    let x = this.head.getX();
    let y = this.head.getY();

    return {
      x: x,
      y: y
    };
  }

  getTail() {
    let tail = null;

    if (this.path[0]) {
      tail = this.path[0];
    }

    return tail;
  }

  // moveUp and moveDown are acting against axis.y
  moveUp() {
    let head = this.getHeadCoordinates();

    let x = head.x;
    let y = head.y;

    y--;
    if (y < 1) {
      y = 1;
    }

    this.addToHead(x, y);
  }

  moveDown() {
    let head = this.getHeadCoordinates();

    let x = head.x;
    let y = head.y;

    y++;
    if (y >= config.HEIGHT - 2) {
      y = config.HEIGHT - 2;
    }

    this.addToHead(x, y);
  }

  // moveRight and moveLeft are acting against axis.x
  moveLeft() {
    let head = this.getHeadCoordinates();

    let x = head.x;
    let y = head.y;

    x--;
    if (x < 1) {
      x = 1;
    }

    this.addToHead(x, y);
  }

  moveRight() {
    let head = this.getHeadCoordinates();

    let x = head.x;
    let y = head.y;

    x++;
    if (x >= config.WIDTH - 2) {
      x = config.WIDTH - 2;
    }

    this.addToHead(x, y);
  }

  addToHead(x, y) {
    this.head = new Point(x, y);

    this.path.push(this.head);
  }

  removeFromTail() {
    this.path.shift();

    // logger.info(this.path);
  }
}

module.exports = Snake;
