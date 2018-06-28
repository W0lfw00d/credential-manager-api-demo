<template>
  <div class="columns is-centered">
    <div class="column is-half">
      <section class="form">
        <h1 class="title">Login</h1>
        <form @submit.prevent>
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
          <div class="field is-grouped">
            <p class="control">
              <button
                :disabled="!formValid"
                class="button is-primary"
                @click="passwordLogin"
              >
                Login with password
              </button>
            </p>
            <p class="control">
              <button
                :disabled="!form.username"
                class="button is-primary"
                @click="keyLogin"
              >
                Login with FIDO2
              </button>
            </p>
            <p class="control">
              <button
                :disabled="!form.username"
                class="button is-primary"
                @click="register"
              >
                register
              </button>
            </p>
            <div class="field">
              <p
                v-if="form.message"
                class="help is-success"
              >
                {{form.message}}
              </p>
            </div>
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
          message: '',
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
        LoginService.autoLogin()
          .then(() => this.$emit('userStatusChanged'))
          .catch(e => this.form.error = e.message);
      }
    },
    methods: {
      passwordLogin() {
        LoginService.passwordLogin({ id: this.form.username, name: this.form.username, password: this.form.password })
          .then(() => this.$emit('userStatusChanged'))
          .catch(e => this.form.error = e.message);
      },
      register() {
        LoginService.register(this.form.username)
          .then(response => this.form.message = 'Great success!')
          .catch(e => this.form.error = e.message);
      },
      keyLogin() {
        LoginService.keyLogin(this.form.username)
          .then(() => this.$emit('userStatusChanged'))
          .catch(e => this.form.error = e.message);
      },
      resetForm() {
        this.form.username = '';
        this.form.password = '';
        this.form.message = '';
        this.form.error = '';
      }
    }
  };
</script>
