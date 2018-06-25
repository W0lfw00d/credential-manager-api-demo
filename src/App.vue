<template>
  <div id="app">
    <img src="./assets/logo.png">
    <HellowWorld v-if="loggedIn" />
    <LoginForm v-else />
  </div>
</template>

<script>
  import LoginForm from './components/LoginForm.vue';
  import HellowWorld from './components/HelloWorld.vue';

  export default {
    name: 'app',
    components: {
      LoginForm,
      HellowWorld
    },
    data() {
      return {
        loggedIn: false
      };
    },
    created() {
      const token = localStorage.getItem('user-token');
      this.loggedIn = token !== null;
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
