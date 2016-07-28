// https://github.com/nodejs/node/issues/5344
'use strict';
require('../common');
const assert = require('assert');
const vm = require('vm');
const ctx = vm.createContext();

vm.runInContext('w = 1;', ctx);
assert.equal(1, ctx.w);

assert.throws(function() {vm.runInContext('"use strict"; x = 1;', ctx);});
assert.equal(undefined, ctx.x);

vm.runInContext('"use strict"; var y = 1;', ctx);
assert.equal(1, ctx.y);

vm.runInContext('"use strict"; this.z = 1;', ctx);
assert.equal(1, ctx.z);

// w has been defined
vm.runInContext('"use strict"; w = 2;', ctx);
assert.equal(2, ctx.w);
