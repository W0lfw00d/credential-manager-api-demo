import base64url from './base64url';

function extend(obj, more) {
  return Object.assign({}, obj, more);
}

export default {

  /**
   * Create a WebAuthn credential.
   *
   * @param request: object - A PublicKeyCredentialCreationOptions object, except
   *   where binary values are base64url encoded strings instead of byte arrays
   *
   * @return a PublicKeyCredentialCreationOptions suitable for passing as the
   *   `publicKey` parameter to `navigator.credentials.create()`
   */
  decodePublicKeyCredentialCreationOptions(request) {
    const excludeCredentials = request.excludeCredentials.map(credential => extend(
      credential, {
        id: base64url.toByteArray(credential.id)
      }));

    const publicKeyCredentialCreationOptions = extend(
      request, {
        attestation: 'direct',
        user: extend(
          request.user, {
            id: base64url.toByteArray(request.user.id)
          }),
        challenge: base64url.toByteArray(request.challenge),
        excludeCredentials
      });

    return publicKeyCredentialCreationOptions;
  },

  /**
   * Create a WebAuthn credential.
   *
   * @param request: object - A PublicKeyCredentialCreationOptions object, except
   *   where binary values are base64url encoded strings instead of byte arrays
   *
   * @return the Promise returned by `navigator.credentials.create`
   */
  createCredential(request) {
    return navigator.credentials.create({
      publicKey: this.decodePublicKeyCredentialCreationOptions(request)
    });
  },

  /**
   * Perform a WebAuthn assertion.
   *
   * @param request: object - A PublicKeyCredentialRequestOptions object,
   *   except where binary values are base64url encoded strings instead of byte
   *   arrays
   *
   * @return a PublicKeyCredentialRequestOptions suitable for passing as the
   *   `publicKey` parameter to `navigator.credentials.get()`
   */
  decodePublicKeyCredentialRequestOptions(request) {
    const allowCredentials = request.allowCredentials && request.allowCredentials.map(credential => extend(
      credential, {
        id: base64url.toByteArray(credential.id)
      }));

    const publicKeyCredentialRequestOptions = extend(
      request, {
        allowCredentials,
        challenge: base64url.toByteArray(request.challenge)
      });

    return publicKeyCredentialRequestOptions;
  },

  /**
   * Perform a WebAuthn assertion.
   *
   * @param request: object - A PublicKeyCredentialRequestOptions object,
   *   except where binary values are base64url encoded strings instead of byte
   *   arrays
   *
   * @return the Promise returned by `navigator.credentials.get`
   */
  getAssertion(request) {
    return navigator.credentials.get({
      publicKey: this.decodePublicKeyCredentialRequestOptions(request)
    });
  },

  /** Turn a PublicKeyCredential object into a plain object with base64url encoded binary values */
  responseToObject(response) {
    if (response.response.attestationObject) {
      return {
        id: response.id,
        response: {
          attestationObject: base64url.fromByteArray(response.response.attestationObject),
          clientDataJSON: base64url.fromByteArray(response.response.clientDataJSON)
        }
      };
    } else {
      return {
        id: response.id,
        response: {
          authenticatorData: base64url.fromByteArray(response.response.authenticatorData),
          clientDataJSON: base64url.fromByteArray(response.response.clientDataJSON),
          signature: base64url.fromByteArray(response.response.signature)
        }
      };
    }
  }
};
