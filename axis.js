'use strict';

let config = require('./config');

let axis = {
  x: 1,
  y: 1
};

// moveUp and moveDown are acting against axis.y
function moveUp() {
  axis.y--;
  if (axis.y < 1) {
    axis.y = 1;
  }
}

function moveDown() {
  axis.y++;
  if (axis.y >= config.HEIGHT - 2) {
    axis.y = config.HEIGHT - 2;
  }
}

// moveRight and moveLeft are acting against axis.x
function moveLeft() {
  axis.x--;
  if (axis.x < 1) {
    axis.x = 1;
  }
}

function moveRight() {
  axis.x++;
  if (axis.x >= config.WIDTH - 2) {
    axis.x = config.WIDTH - 2;
  }
}

function getX() {
  return axis.x;
}

function getY() {
  return axis.y;
}

module.exports = {
  moveUp: moveUp,
  moveDown: moveDown,
  moveLeft: moveLeft,
  moveRight: moveRight,
  getX: getX,
  getY: getY
};
