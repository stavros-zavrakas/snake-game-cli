'use strict';

const Point = require('./Point');
const c = require('./constants');
const config = require('./config');
const logger = require('./logger');

class Snake {
  constructor(direction) {
    this.body = [];

    this.head = new Point(5, 1);

    this.body.push(new Point(4, 1));

    // @todo: uncomment if you want to start with a bigger snake
    this.body.push(new Point(3, 1));
    this.body.push(new Point(2, 1));
    this.body.push(new Point(1, 1));
    this.body.push(this.head);

    this.direction = direction;
    this.crashed = false;
  }

  getHead() {
    return this.head;
  }

  getBody() {
    return this.body.slice();
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

    if (this.body[0]) {
      tail = this.body[0];
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
    // Use this to get a copy of the head coordinates
    let headBeforeMove = this.getHeadCoordinates();

    let x = headBeforeMove.x;
    let y = headBeforeMove.y;

    if (this.direction === c.DIRECTION_RIGHT) {
      this.moveRight(x, y);
    } else if (this.direction === c.DIRECTION_LEFT) {
      this.moveLeft(x, y);
    } else if (this.direction === c.DIRECTION_UP) {
      this.moveUp(x, y);
    } else if (this.direction === c.DIRECTION_DOWN) {
      this.moveDown(x, y);
    }

    this.checkBodyConfict();
  }

  checkBodyConfict() {
    // Get a copy of the body and remove the last element
    // that is matching with the head. We do not want to filter
    // the head against the head.
    var bodyCopy = this.body.slice();
    bodyCopy.pop();

    // Get the head after executing the move
    let head = this.getHeadCoordinates();
    let x = head.x;
    let y = head.y;

    // check here if there is a confict with another part of the body
    let confict = bodyCopy.filter(function (value) {
      let bodyX = value.getX();
      let bodyY = value.getY();

      return bodyX === x && bodyY === y;
    });

    // If there are elements in the conflict array, 
    // then the snake crashed against the body
    if (confict.length) {
      this.crashed = true;
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

  hasEaten(food) {
    let place = food.getCurrent();

    let x = place.getX();
    let y = place.getY();

    let head = this.getHeadCoordinates();

    if (x === head.x && y === head.y) {
      return true;
    }

    return false;
  }

  addToHead(x, y) {
    this.head = new Point(x, y);

    this.body.push(this.head);
  }

  removeFromTail() {
    this.body.shift();
  }
}

module.exports = Snake;
