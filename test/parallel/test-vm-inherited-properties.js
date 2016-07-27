// https://github.com/nodejs/node/issues/5350
'use strict';
require('../common');
const vm = require('vm');
const assert = require('assert');

var base = Object.create(null);
base.x = 1;
base.y = 2;

var sandbox = Object.create(base);
sandbox.z = 3;

const code = 'x = 0; z = 4;';
vm.runInNewContext(code, sandbox);

assert((Object.keys(sandbox)).indexOf('y') === -1);
