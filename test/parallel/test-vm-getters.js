'use strict';
// Refs: https://github.com/nodejs/node/issues/2734
require('../common');
const assert = require('assert');
const vm = require('vm');
const sandbox = {};

const descriptor = {
  get: function() {
    return 'foo';
  },
  configurable: true,
};

Object.defineProperty(sandbox, 'prop', descriptor);

const code = 'Object.getOwnPropertyDescriptor(this, "prop");';

const context = vm.createContext(sandbox);
const result = vm.runInContext(code, context);

assert.strictEqual(result.get, descriptor.get);
assert.strictEqual(result.set, result.set);
assert.strictEqual(result.enumerable, false);
assert.strictEqual(result.writable, undefined);
assert.strictEqual(result.configurable, descriptor.configurable);
assert.strictEqual('foo', result.get());
