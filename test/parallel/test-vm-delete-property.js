/* eslint-disable no-debugger */
'use strict';
require('../common');
var assert = require('assert');
var vm = require('vm');

// https://github.com/nodejs/node/issues/6287

const sbox = { };
vm.createContext(sbox);
vm.runInContext('this.x = "w00t";delete this.x;', sbox);

assert.equal(sbox.x, undefined);
