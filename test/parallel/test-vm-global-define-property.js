'use strict';
require('../common');
var assert = require('assert');

var vm = require('vm');

var code =
    'Object.defineProperty(this, "f", {\n' +
    '  get: function() { return x; },\n' +
    '  set: function(k) { x = k; },\n' +
    '  configurable: true,\n' +
    '  enumerable: true\n' +
    '});\n' +
    'g = f;\n' +
    'f;\n';

var x = {};
var o = vm.createContext({ console: console, x: x });

var res = vm.runInContext(code, o, 'test');

assert(res);
assert.equal(typeof res, 'object');
assert.equal(res, x);
assert.equal(o.f, res);
assert.deepStrictEqual(Object.keys(o), ['console', 'x', 'f', 'g']);

o.f = 5;
assert.equal(o.f, 5);
assert.equal(o.x, 5);


code =
  'Object.defineProperty(this, "v", {\n' +
  '  value: 42,\n' +
  '});\n';

vm.runInContext(code, o, 'test');

assert.equal(o.v, 42);

// https://github.com/nodejs/node/issues/5679
code =
    '(function() {' +
    '  "use strict";' +
    '  global.x = 10;' +
    '  Object.defineProperty(global, "x", { ' +
    '    writable: false, ' +
    '    enumerable: false, ' +
    '    configurable: false, ' +
    '    value: 20 ' +
    '  }); ' +
    '})()';

var global = {};
global.console = console;
global.global = global;

var context = vm.createContext(global);
vm.runInContext(code, context);


assert.equal(global.x, 20);

assert.throws(function() {global.x = 30;});

assert.equal(global.x, 20);
