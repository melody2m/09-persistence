'use strict';

const uuid = require('uuid/v4');
const logger = require('../lib/logger');

module.exports = class Veggie {
  constructor(color, texture) {
    if (!color || !texture) throw new Error('POST request requires color and texture of Veggie');
    this.color = color;
    this.texture = texture;
    this.id = uuid();
    logger.log(logger.INFO, `NOTE: created a new Veggie ${JSON.stringify(this)}`);
  }
};

