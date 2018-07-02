<template>
  <div class="columns is-centered">
    <div class="column is-half">
      <section class="form">
        <h1 class="title">Register</h1>
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
              class="help has-text-primary"
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
                @click="register"
              >
                Register
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
    name: 'RegisterForm',
    data() {
      return {
        form: {
          username: '',
          password: '',
          message: '',
          error: ''
        }
      };
    },
    computed: {
      formValid() {
        return this.form.username && this.form.password;
      }
    },
    methods: {
      register() {
        LoginService.register(this.form.username, this.form.password)
          .then(this.setMessage)
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
