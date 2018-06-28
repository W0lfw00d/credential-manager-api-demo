import base64js from 'base64-js';

export default {
  ensureUint8Array(arg) {
    if (arg instanceof ArrayBuffer) {
      return new Uint8Array(arg);
    } else {
      return arg;
    }
  },

  base64UrlToMime(code) {
    return code.replace(/-/g, '+').replace(/_/g, '/') + '===='.substring(0, (4 - (code.length % 4)) % 4);
  },

  mimeBase64ToUrl(code) {
    return code.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  },

  fromByteArray(bytes) {
    return this.mimeBase64ToUrl(base64js.fromByteArray(this.ensureUint8Array(bytes)));
  },

  toByteArray(code) {
    return base64js.toByteArray(this.base64UrlToMime(code));
  }
};
