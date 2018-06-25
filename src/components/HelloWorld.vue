<template>
  <div class="hello">
    <h1>You're logged in.</h1>
    <p>
      Hope you are happy now.
    </p>
    <button @click="logout">
      logout
    </button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  methods: {
    logout(){
      localStorage.clear();
      location.reload();
    }
  }
}
</script>
