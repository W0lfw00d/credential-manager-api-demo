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
            <p
              v-if="form.message"
              class="help is-success"
            >
              Success: {{form.message}}
            </p>
          </div>
          <div class="field">
            <p class="control has-icons-left">
              <input
                id="username"
                v-model="form.username"
                placeholder="Enter an username"
                name="username"
                class="input"
                autofocus
              >
              <span class="icon is-small is-left">
                <i class="fas fa-user" />
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
                class="button is-primary"
                @click="passwordLogin"
              >
                Login with password
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
          .then(() => this.$router.push({ path: '/secret' }))
          .catch(e => this.form.error = e.message);
      }
    },
    methods: {
      passwordLogin() {
        LoginService.passwordLogin({ id: this.form.username, name: this.form.username, password: this.form.password })
          .then(() => this.$router.push({ path: '/secret' }))
          .catch(this.setError);
      },
      register() {
        LoginService.register(this.form.username)
          .then(this.setMessage('Great success!'))
          .catch(this.setError);
      },
      setError(error){
        this.form.message = '';
        this.form.error = error.message;
      },
      setMessage(message){
        this.form.message = message;
        this.form.error = '';
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
