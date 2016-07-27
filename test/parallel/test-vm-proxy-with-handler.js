// https://github.com/nodejs/node/issues/7458
'use strict';

require('../common');
const vm = require('vm');
const assert = require('assert');

assert.strictEqual(
  typeof vm.runInNewContext('String',
    new Proxy({}, {})),
  'function');

assert.strictEqual(
  typeof vm.runInNewContext('String',
    new Proxy({}, {
      get: function(target, property, receiver) {
        return Reflect.get(global, property);
      }
    })),
  'function');
