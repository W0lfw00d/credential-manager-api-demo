<template>
  <div id="app">
    <img src="./assets/logo.png">
    <HellowWorld
      v-if="loggedIn"
      @userStatusChanged="checkUserStatus"
    />
    <LoginForm
      v-else
      @userStatusChanged="checkUserStatus"
    />
  </div>
</template>

<script>
  import LoginForm from './components/LoginForm.vue';
  import SecurePage from './components/SecurePage.vue';

  export default {
    name: 'app',
    components: {
      LoginForm,
      HellowWorld: SecurePage
    },
    data() {
      return {
        loggedIn: false
      };
    },
    methods: {
      checkUserStatus() {
        const token = localStorage.getItem('api_token');
        this.loggedIn = token !== null;
      }
    },
    created() {
      this.checkUserStatus();
    }
  };
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
