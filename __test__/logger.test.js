'use strict';

const logger = require('../lib/logger');

describe('Loggre middleware', () => {

  let consoleSpy;
  let req = {};
  let res = {};
  let next = jest.fn();

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('Check if log output', () => {
    logger(req, res, next);
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('Check if can move to th next', () => {
    logger(req, res, next);
    expect(next).toHaveBeenCalled();
  });

});