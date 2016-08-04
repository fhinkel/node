'use strict';

require('../common');
const assert = require('assert');
const vm = require('vm');

var code =
  'Object.setPrototypeOf(obj, null);' +
  'Object.getPrototypeOf(obj)';

var sandbox = {obj: {}};
assert.strictEqual('object', typeof Object.getPrototypeOf(sandbox.obj));

var context = vm.createContext(sandbox);
assert.strictEqual(null, vm.runInContext(code, context));
assert.strictEqual(null, Object.getPrototypeOf(sandbox.obj));

code =
  'Object.setPrototypeOf(obj, Function.prototype);' +
  'Object.getPrototypeOf(obj)';
context = vm.createContext(sandbox);
const proto = vm.runInContext(code, context);
assert.strictEqual('function', typeof proto);
assert.strictEqual('function', typeof Object.getPrototypeOf(sandbox.obj));
