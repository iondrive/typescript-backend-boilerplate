var assign = require('lodash').assign;
var env = require(__dirname + '/env/' + (process.env.NODE_ENV || 'development'));
assign(process.env, env);