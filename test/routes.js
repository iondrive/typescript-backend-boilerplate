import request from '@iondrive/supertest';
import app from '../lib/app';

describe('GET /a-missing-route', () => {
  var agent;

  beforeEach(() => agent = request.agent(app));

  it('should respond 404 Not Found', () => {
    return agent.post('/a-missing-route').expect(404);
  });
});