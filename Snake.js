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

    this.head = new Point(2, 1);

    this.path.push(new Point(1, 1));

    // @todo: uncomment if you want to have bigger snake
    // this.path.push(new Point(2, 1));
    // this.path.push(new Point(3, 1));
    // this.path.push(new Point(4, 1));
    this.path.push(this.head);

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

  move(direction) {
    let head = this.getHeadCoordinates();

    let x = head.x;
    let y = head.y;

    if (direction === 'right') {
      this.moveRight(x, y);
    } else if (direction === 'left') {
      this.moveLeft(x, y);
    } else if (direction === 'up') {
      this.moveUp(x, y);
    } else if (direction === 'down') {
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
