'use strict';

const sinon = require('sinon');
const proxyquire = require('proxyquire');
const expect = require('chai').expect;

const Point = require('../lib/Point');

function initSnakeBody () {
  let snakeBody = [];

  snakeBody.push(new Point(4, 1));
  snakeBody.push(new Point(3, 1));
  snakeBody.push(new Point(2, 1));
  snakeBody.push(new Point(1, 1));

  return snakeBody.slice();
}

describe('food placement', function() {
  before(function () {
    this.config = {
      WIDTH: 10,
      HEIGHT: 10
    };

    this.libs = {
      getRandomInt: sinon.stub()
    };

    this.foodHelpers = proxyquire('../lib/foodHelpers', {
      './config': this.config,
      './libs': this.libs
    });
  });

  it('should not conflict with the snake body', function() {
    this.libs.getRandomInt.onCall(0).returns(5);
    this.libs.getRandomInt.onCall(1).returns(5);

    let snakeBody = initSnakeBody();

    let food = this.foodHelpers.findFreeSpaceForFood(snakeBody);

    expect(this.libs.getRandomInt.firstCall.calledWith(1, 8)).to.equal(true);
    expect(this.libs.getRandomInt.secondCall.calledWith(1, 8)).to.equal(true);

    expect(food.x).to.equal(5);
    expect(food.y).to.equal(5);
  });

  it('should conflict once with the snake body', function() {
    this.libs.getRandomInt.onCall(0).returns(1);
    this.libs.getRandomInt.onCall(1).returns(1);

    this.libs.getRandomInt.onCall(2).returns(1);
    this.libs.getRandomInt.onCall(3).returns(5);

    let snakeBody = initSnakeBody();

    let food = this.foodHelpers.findFreeSpaceForFood(snakeBody);

    expect(this.libs.getRandomInt.firstCall.calledWith(1, 8)).to.equal(true);
    expect(this.libs.getRandomInt.secondCall.calledWith(1, 8)).to.equal(true);
    expect(this.libs.getRandomInt.thirdCall.calledWith(1, 8)).to.equal(true);
    expect(this.libs.getRandomInt.lastCall.calledWith(1, 8)).to.equal(true);

    expect(food.x).to.equal(1);
    expect(food.y).to.equal(5);
  });

  it('should conflict more than once with the snake body', function() {
    this.libs.getRandomInt.onCall(0).returns(1);
    this.libs.getRandomInt.onCall(1).returns(1);

    this.libs.getRandomInt.onCall(2).returns(1);
    this.libs.getRandomInt.onCall(3).returns(2);

    this.libs.getRandomInt.onCall(4).returns(5);
    this.libs.getRandomInt.onCall(5).returns(5);

    let snakeBody = initSnakeBody();

    let food = this.foodHelpers.findFreeSpaceForFood(snakeBody);

    expect(this.libs.getRandomInt.firstCall.calledWith(1, 8)).to.equal(true);
    expect(this.libs.getRandomInt.secondCall.calledWith(1, 8)).to.equal(true);
    expect(this.libs.getRandomInt.thirdCall.calledWith(1, 8)).to.equal(true);
    expect(this.libs.getRandomInt.lastCall.calledWith(1, 8)).to.equal(true);

    expect(food.x).to.equal(5);
    expect(food.y).to.equal(5);
  });
});