<template>
  <div class="hello">
    <h1 class="title">Secure page</h1>
    <p>
      This page is only visible to verified users and you, {{ username }}, are one of them. <br />
      Luck you!
    </p>
    <button @click="logout">
      logout
    </button>
  </div>
</template>

<script>
  import loginService from '../service/login.service';

  export default {
    name: 'HelloWorld',
    data() {
      return {
        username: localStorage.getItem('username')
      };
    },
    methods: {
      logout() {
        loginService.logout();
        this.$emit('userStatusChanged');
      }
    }
  };
</script>
