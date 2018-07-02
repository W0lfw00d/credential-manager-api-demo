<template>
  <div class="columns is-centered">
    <div class="column is-half">
      <section class="form">
        <h1 class="title">Login with Fido2</h1>
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
                placeholder="your username"
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
            <p class="control">
              <button
                :disabled="!formValid"
                class="button is-primary"
                @click="keyLogin"
              >
                Login with FIDO2
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
    name: 'Fido2LoginForm',
    data() {
      return {
        form: {
          username: '',
          message: '',
          error: ''
        }
      };
    },
    computed: {
      formValid() {
        return this.form.username;
      }
    },
    methods: {
      keyLogin() {
        LoginService.keyLogin(this.form.username)
          .then(() => this.$router.push({ path: '/secret' }))
          .catch(error => {
            if (error.response) {
              this.setError(error.response.data.messages[0]);
            } else {
              this.setError(error.message);
            }
          });
      },
      setError(error) {
        this.form.message = '';
        this.form.error = error;
      },
      setMessage(message) {
        this.form.message = message;
        this.form.error = '';
      },
      resetForm() {
        this.form.username = '';
        this.form.message = '';
        this.form.error = '';
      }
    }
  };
</script>
