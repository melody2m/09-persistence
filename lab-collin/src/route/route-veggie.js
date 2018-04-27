'use strict';

const logger = require('../lib/logger');
const Veggie = require('../model/veggie');
const storage = require('../lib/storage');
const response = require('../lib/response');

module.exports = function routeVeggie(router) {
  router.post('/api/veggie', (req, res) => {
    logger.log(logger.INFO, 'VEG-ROUTE: POST /api/veggie');

    try {
      const newVeggie = new Veggie(req.body.color, req.body.texture);
      console.log(newVeggie);
      storage.create('Veggie', newVeggie)
        .then((veggie) => {
          response.sendJSON(res, 201, veggie);
          return undefined;
        });
    } catch (err) {
      logger.log(logger.ERROR, `ROUTE-VEG: There was a bad request ${err}`);
      response.sendText(res, 400, err.message);
      return undefined;
    }
    return undefined;
  });

  router.get('/api/veggie', (req, res) => {
    if (req.url.query.id) {
      storage.fetchOne('Veggie', req.url.query.id)
        .then((item) => {
          response.sendJSON(res, 200, item);
          return undefined;
        })
        .catch((err) => {
          logger.log(logger.ERROR, err, JSON.stringify(err));
          response.sendText(res, 404, 'Resource not found');
          return undefined;
        });
    }
    storage.fetchAll('Veggie')
      .then((itemArray) => {
        response.sendJSON(res, 200, itemArray);
        return undefined;
      })
      .catch((err) => {
        logger.log(logger.ERROR, err, JSON.stringify(err));
        response.sendText(res, 404, 'Resource not found');
        return undefined;
      });
    return undefined;
  });

  router.delete('/api/veggie', (req, res) => {
    if (!req.url.query.id) {
      response.sendText(res, 404, 'Your request requires an id');
      return undefined;
    }
    
    storage.delete('Veggie', req.url.query.id)
      .then((item) => {
        response.sendJSON(res, 200, item);
        return undefined;
      })
      .catch((err) => {
        logger.log(logger.ERROR, err, JSON.stringify(err));
        response.sendText(res, 404, 'Resource not found');
        return undefined;
      });
    return undefined;
  });
};
