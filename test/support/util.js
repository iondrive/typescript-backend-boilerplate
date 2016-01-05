import { assert } from 'chai';
import { JWT_TTL } from '@iondrive/config';
import * as jwt from 'jsonwebtoken';

const URL_REGEX = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;

exports.getUrls = text => {
  return text.match(URL_REGEX);
};

exports.findUrl = (text, portion) => {
  var matches = text.match(URL_REGEX);
  for (var i = 0; i < matches.length; i++) {
    if (matches[i].indexOf(portion) > -1) return matches[i];
  }
};

exports.secondsFromNow = (s = 0) => {
  return Math.floor((Date.now() / 1000) + s);
};

exports.expectJwt = (agent, subject) => {
  return agent
  .expect('Content-Type', /application\/jwt/)
  .expect(200, /^[^.]+\.[^.]+\.[^.]+$/)
  .then(res => {
    var token = jwt.decode(res.text);
    assert.equal(token.type, subject);
    assert.match(token.sub, /^[0-9a-f-]{32}$/i);
    assert.closeTo(token.iat, exports.secondsFromNow(0), 1);
    assert.closeTo(token.exp, exports.secondsFromNow(JWT_TTL.asSeconds()), 1);
    return token;
  });
};