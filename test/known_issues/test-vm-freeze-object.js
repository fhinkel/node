'use strict';
require('../common');
const assert = require('assert');
const vm = require('vm');

const script =
  'Object.freeze(this);\n' +
  'x = 17;' +
  'Object.isFrozen(this);';

assert(vm.runInNewContext(script, {}));
