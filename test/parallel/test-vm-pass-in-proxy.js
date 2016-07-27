// https://github.com/nodejs/node/issues/6158
'use strict';
require('../common');
const vm = require('vm');
const assert = require('assert');

assert.equal(typeof vm.runInNewContext('String', {}), 'function');
assert.equal(typeof vm.runInNewContext('String', new Proxy({}, {})),
             'function');
