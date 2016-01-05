import { assign } from 'lodash';

var env = require('../../env/test');
assign(process.env, env);