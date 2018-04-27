'use strict';

const server = require('../lib/server');
const superagent = require('superagent');

const testPort = 5000;
const mockResource = { color: 'yellow', texture: 'chewy' };
let mockId = null; 

beforeAll(() => server.start(testPort));
afterAll(() => server.stop());

describe('VALID request to the API', () => {
  describe('POST /api/veggie', () => {
    it('should respond with status 201 and create a new veggie', () => {
      return superagent.post(`:${testPort}/api/veggie`)
        .send(mockResource)
        .then((res) => {
          mockId = res.body.id; 
          expect(res.body.color).toEqual(mockResource.color);
          expect(res.body.texture).toEqual(mockResource.texture);
          expect(res.status).toEqual(201);
        })
        .catch(err => console.error(err));
    });
  });
  describe('GET /api/veggie', () => {
    it('should respond with status 200 get the veggie data', () => {
      return superagent.get(`:${testPort}/api/veggie?id=${mockId}`)
        .then((res) => {
          expect(res.body.color).toEqual(mockResource.color);
          expect(res.body.texture).toEqual(mockResource.texture);
          expect(res.status).toEqual(200);
        })
        .catch(err => console.error(err));
    });
  });
});

describe('INVALID request to the API', () => {
  describe('DELETE /api/veggie', () => {
    it('should respond with status 204 delete the veggie data', () => {
      return superagent.delete(`:${testPort}/api/veggie?id=${mockId}`)
        .then((res) => {
          expect(res.body).toEqual('');
          expect(res.status).toEqual(204);
        });
    });
  });
  describe('INVALID request', () => {
    describe('GET /api/veggie', () => {
      it('should err out with 404 status code when id not found', () => {
        return superagent.get(`:${testPort}/api/veggie?id=vegable`)
          .catch((err) => {
            expect(err.status).toEqual(404);
            expect(err).toBeTruthy();
          });
      });
      it('should err out with 400 status code when no id provided', () => {
        return superagent.get(`:${testPort}/api/veggie?id=`)
          .catch((err) => {
            expect(err.status).toEqual(400);
            expect(err).toBeTruthy();
          });
      });
    });
  });
});
