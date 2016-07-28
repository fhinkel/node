'use strict';
require('../common');
const assert = require('assert');
const vm = require('vm');
const ctx = vm.createContext({setTimeout});

vm.runInContext('var that = this; ' +
  'setTimeout( function () {' +
  '  Object.defineProperty(that, "bar", {get: function() {return 17}});' +
  '}, 1);', ctx);
assert.equal(undefined, ctx.bar);

setTimeout(function() {assert.equal(17, ctx.bar);}, 5);

