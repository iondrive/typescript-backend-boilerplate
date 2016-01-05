import * as request from '@iondrive/supertest';
import app from '../lib/app';

describe('POST /ping', () => {
  var agent;

  beforeEach(() => {
    agent = request.agent(app)
  });

  it('should respond 200 OK with data "pong"', () => {
    return agent.post('/ping').expect(200, 'pong');
  });
});