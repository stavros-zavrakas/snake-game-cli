/*eslint no-constant-condition: ["error", { "checkLoops": false }]*/

'use strict';

const config = require('./config');
const libs = require('./libs');

// Ensures that we don't place the food over the snake
function findFreeSpaceForFood (snakeBody) {
  let i;
  let bodyPiece;
  let conflict = false;

  let x = libs.getRandomInt(1, config.WIDTH - 2);
  let y = libs.getRandomInt(1, config.HEIGHT - 2);

  // @todo: we should not have infinite loop here
  // We need to try few times and if this approach fail
  // we have to pick the first free element of the grid
  while (1) {
    // iterate over the snakeBody and check if 
    // there is conflict with the random point
    for (i = 0; i < snakeBody.length; i++) {
      bodyPiece = snakeBody[i];
      conflict = (x === bodyPiece.getX() && y === bodyPiece.getY());
      // break if there is a conflict, there is no
      // reason to continue the iteration
      if (conflict) {
        break;
      }
    }

    // pick random point again in case of conflict
    if (conflict) {
      x = libs.getRandomInt(1, config.WIDTH - 2);
      y = libs.getRandomInt(1, config.HEIGHT - 2);
      conflict = false;
    } else {
      break;
    }
  }

  return {
    x: x,
    y: y
  };
}

module.exports = {
  findFreeSpaceForFood: findFreeSpaceForFood
};