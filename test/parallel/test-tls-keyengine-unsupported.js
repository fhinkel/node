// Flags: --expose-internals
'use strict';
const common = require('../common');

if (!common.hasCrypto)
  common.skip('missing crypto');

// Monkey-patch SecureContext
const { internalBinding } = require('internal/test/binding');
const binding = internalBinding('crypto');
const NativeSecureContext = binding.SecureContext;

binding.SecureContext = function() {
  const rv = new NativeSecureContext();
  rv.setEngineKey = undefined;
  return rv;
};

const tls = require('tls');

{
  common.expectsError(
    () => {
      tls.createSecureContext({
        privateKeyEngine: 'engine',
        privateKeyIdentifier: 'key'
      });
    },
    {
      code: 'ERR_CRYPTO_CUSTOM_ENGINE_NOT_SUPPORTED',
      message: 'Custom engines not supported by this OpenSSL'
    }
  );
}
