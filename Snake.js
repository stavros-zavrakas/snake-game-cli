'use strict';

const c = require('./constants');
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
  constructor(direction) {
    this.path = [];

    this.head = new Point(2, 1);

    this.path.push(new Point(1, 1));

    // @todo: uncomment if you want to start with a bigger snake
    // this.path.push(new Point(2, 1));
    // this.path.push(new Point(3, 1));
    // this.path.push(new Point(4, 1));
    this.path.push(this.head);

    this.direction = direction;
    this.crashed = false;
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

  changeDirection(direction) {
    let isCurrentUpDown = this.direction === c.DIRECTION_UP || this.direction === c.DIRECTION_DOWN;
    let isNextUpDown = direction === c.DIRECTION_UP || direction === c.DIRECTION_DOWN;

    let isCurrentLeftRight = this.direction === c.DIRECTION_LEFT || this.direction === c.DIRECTION_RIGHT;
    let isNextLeftRight = direction === c.DIRECTION_LEFT || direction === c.DIRECTION_RIGHT;

    if (isCurrentUpDown && isNextUpDown) {
      return;
    } else if (isCurrentLeftRight && isNextLeftRight) {
      return;
    }

    this.direction = direction;
  }

  move() {
    let head = this.getHeadCoordinates();

    let x = head.x;
    let y = head.y;

    if (this.direction === c.DIRECTION_RIGHT) {
      this.moveRight(x, y);
    } else if (this.direction === c.DIRECTION_LEFT) {
      this.moveLeft(x, y);
    } else if (this.direction === c.DIRECTION_UP) {
      this.moveUp(x, y);
    } else if (this.direction === c.DIRECTION_DOWN) {
      this.moveDown(x, y);
    }
  }

  // moveUp and moveDown are acting against axis.y
  moveUp(x, y) {
    y--;
    if (y < 1) {
      this.crashed = true;
    }

    this.addToHead(x, y);
  }

  moveDown(x, y) {
    y++;
    if (y > config.HEIGHT - 2) {
      this.crashed = true;
    }

    this.addToHead(x, y);
  }

  // moveRight and moveLeft are acting against axis.x
  moveLeft(x, y) {
    x--;
    if (x < 1) {
      this.crashed = true;
    }

    this.addToHead(x, y);
  }

  moveRight(x, y) {
    x++;
    if (x > config.WIDTH - 2) {
      this.crashed = true;
    }

    this.addToHead(x, y);
  }

  hasCrashed() {
    return this.crashed;
  }

  addToHead(x, y) {
    this.head = new Point(x, y);

    this.path.push(this.head);
  }

  removeFromTail() {
    this.path.shift();
  }
}

module.exports = Snake;
