import axios from 'axios';
import webauthn from './webauthn';

const LoginService = {
  register(username, password) {
    return new Promise((resolve, reject) => {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      if (users.some(user => user.username === username)) {
        reject(new Error('User already exists'));
      }

      users.push({ username, password });
      localStorage.setItem('users', JSON.stringify(users));
      resolve('User registered');
    });
  },
  async autoLogin() {
    const credentials = await navigator.credentials.get({
      password: true,
      federated: {
        providers: [
          'https://accounts.google.com',
          'https://facebook.com'
        ]
      }
    });

    if (credentials) {
      if (credentials.type === 'password') {
        return LoginService.passwordLogin(credentials);
      } else if (credentials.type === 'federated' && credentials.provider === 'https://accounts.google.com') {
        // TODO: Google login
        // this.signInWithGoogle(credentials);
      } else if (credentials.type === 'federated' && credentials.provider === 'https://facebook.com') {
        // TODO: Facebook login
        // this.signInWithFacebook(credentials);
      }
    }
  },
  async passwordLogin({ id, name, password }) {
    let credentials;

    if (window.PasswordCredential) {
      credentials = new PasswordCredential({
        id,
        name,
        password
      });

      if (credentials instanceof Credential) {
        await navigator.credentials.store(credentials);
      }
    } else {
      credentials = { id, name, password };
    }
    return this.login(credentials);
  },
  login(credentials) {
    return new Promise((resolve, reject) => {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(user => credentials.name === user.username && credentials.password === user.password);
      if (user) {
        const token = 'VERY-REAL-FORT-KNOX-SECURITY-TOKEN';
        localStorage.setItem('username', user.username);
        localStorage.setItem('api_token', token);
        resolve(true);
      } else {
        reject(new Error('Wrong credentials!'));
      }
    });
  },

  async keyRegister(username) {
    const startPayload = `username=${username}&displayName=${username}&credentialNickname=`;
    const response = await axios.post('https://localhost:8443/webauthn/api/v1/register', startPayload);

    if (response.status !== 200 || !response.data.success) {
      return new Error(`failed request: ${response.statusText}`);
    }

    const authenticatorResponse = await webauthn.createCredential(response.data.request.publicKeyCredentialCreationOptions);

    const finishPayload = {
      requestId: response.data.request.requestId,
      credential: webauthn.responseToObject(authenticatorResponse)
    };
    return this.keyRegisterFinish(response.data.actions.finish, finishPayload);
  },
  keyRegisterFinish(url, payload) {
    return axios.post(url, payload)
      .then(response => {
        if (response.status === 200) {
          return response.data;
        } else {
          return new Error(`failed request: ${response.statusText}`);
        }
      });
  },

  async keyLogin(username) {
    const startPayload = `username=${username}`;
    const response = await axios.post('https://localhost:8443/webauthn/api/v1/authenticate', startPayload);

    if (!response.data.success) {
      return new Error(`failed request: ${response.statusText}`);
    }

    const authenticatorResponse = await webauthn.getAssertion(response.data.request.publicKeyCredentialRequestOptions);

    const finishPayload = {
      requestId: response.data.request.requestId,
      credential: webauthn.responseToObject(authenticatorResponse)
    };
    return this.keyLoginFinish(response.data.actions.finish, finishPayload);
  },
  keyLoginFinish(url, payload) {
    return axios.post(url, payload)
      .then(response => {
        if (response.status === 200) {
          localStorage.setItem('username', response.data.registrations[0].userIdentity.displayName);
          localStorage.setItem('api_token', response.data.registrations[0].registration.publicKeyCose);
          return response.data;
        } else {
          return new Error(`failed request: ${response.statusText}`);
        }
      });
  },

  logout() {
    localStorage.removeItem('api_token');
    if (navigator.credentials && navigator.credentials.preventSilentAccess) {
      navigator.credentials.preventSilentAccess();
    }
  }
};

export default LoginService;
