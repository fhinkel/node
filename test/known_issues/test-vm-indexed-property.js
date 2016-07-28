'use strict';
require('../common');
const assert = require('assert');
const vm = require('vm');
const ctx = vm.createContext();

vm.runInContext('this[2] = "indexed value";', ctx);
assert.strictEqual('indexed value', ctx[2]);
