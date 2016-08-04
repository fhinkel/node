'use strict';

require('../common');
const assert = require('assert');
const vm = require('vm');

var x = {};
Object.defineProperty(x, 'prop', {
  configurable: false,
  enumerable: false,
  writable: false,
  value: 'val'
});

var o = vm.createContext(x);

var code = 'Object.getOwnPropertyDescriptor(this, "prop")';
var res = vm.runInContext(code, o, 'test');

assert(res);
assert.strictEqual(typeof res, 'object');
assert.strictEqual(res.value, 'val');
assert.strictEqual(res.configurable, false, 'should not be configurable');
assert.strictEqual(res.enumerable, false, 'should not be enumerable');
assert.strictEqual(res.writable, false, 'should not be writable');


code =
  'Object.freeze(x);' +
  'Object.isFrozen(x)';

var sandbox = {x: {}};
var context = vm.createContext(sandbox);
assert.strictEqual(true, vm.runInContext(code, context));
assert.strictEqual(true, Object.isFrozen(sandbox.x));


code =
  'Object.preventExtensions(y);' +
  'Object.isExtensible(y)';

sandbox = {y: {}};
context = vm.createContext(sandbox);
assert.strictEqual(false, vm.runInContext(code, context));
assert.strictEqual(false, Object.isExtensible(sandbox.y));

code =
  'Object.seal(z);' +
  'Object.isSealed(z)';

sandbox = {z: {}};
context = vm.createContext(sandbox);
assert.strictEqual(true, vm.runInContext(code, context));
assert.strictEqual(true, Object.isSealed(sandbox.z));
