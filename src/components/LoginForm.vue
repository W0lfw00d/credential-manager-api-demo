<template>
  <div class="columns is-centered">
    <div class="column is-half">
      <section class="form">
        <h1 class="title">Login</h1>
        <form @submit.prevent="formSubmit">
          <div class="field">
            <p
              v-if="form.error"
              class="help is-danger"
            >
              {{form.error}}
            </p>
          </div>
          <div class="field">
            <p class="control has-icons-left">
              <input
                id="username"
                v-model="form.username"
                placeholder="dev@elop.ers"
                name="username"
                class="input"
                type="email"
                autofocus
              >
              <span class="icon is-small is-left">
                <i class="fas fa-envelope" />
              </span>
            </p>
          </div>
          <div class="field">
            <p class="control has-icons-left">
              <input
                id="password"
                v-model="form.password"
                placeholder="secret"
                name="password"
                class="input"
                type="password"
              >
              <span class="icon is-small is-left">
                <i class="fas fa-lock" />
              </span>
            </p>
          </div>
          <div class="field">
            <p class="control">
              <button
                :disabled="!formValid"
                class="button is-primary e2e-button-login"
              >
                Login
              </button>
            </p>
          </div>
        </form>
      </section>
    </div>
  </div>

</template>

<script>
  import LoginService from '../service/login.service';

  export default {
    name: 'LoginForm',
    data() {
      return {
        form: {
          username: '',
          password: '',
          error: ''
        },
        isCredentialApiAvailable: window.PasswordCredential || window.FederatedCredential
      };
    },
    computed: {
      formValid() {
        return this.form.username && this.form.password;
      }
    },
    created() {

      if (this.isCredentialApiAvailable) {
        (async () => {

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
              this.passwordLogin(credentials);
            } else if (credentials.type === 'federated' && credentials.provider === 'https://accounts.google.com') {
              console.log('Google login', 'TODO...');
              // this.signInWithGoogle(credentials);
            } else if (credentials.type === 'federated' && credentials.provider === 'https://facebook.com') {
              console.log('Facebook login', 'TODO...');
              // this.signInWithFacebook(credentials);
            }
          }

        })();
      }
    },
    methods: {
      formSubmit() {
        this.passwordLogin({ id: this.form.username, name: this.form.username, password: this.form.password });
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

        LoginService.login(credentials)
          .then(() => this.$emit('userStatusChanged'))
          .catch(e => this.form.error = e.message);

        this.resetForm();
      },
      resetForm() {
        this.form.username = '';
        this.form.password = '';
        this.form.error = '';
      }
    }
  };
</script>
