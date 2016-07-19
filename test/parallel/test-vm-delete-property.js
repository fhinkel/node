'use strict';
require('../common');
const assert = require('assert');
const vm = require('vm');

// https://github.com/nodejs/node/issues/6287

const sbox = { };
vm.createContext(sbox);
vm.runInContext('this.x = "w00t";delete this.x;', sbox);

assert.equal(sbox.x, undefined);
