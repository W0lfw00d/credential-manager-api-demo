<template>
  <div id="app">
    <div class="columns">
      <div class="column is-one-fifth">
        <aside class="menu">
          <p class="menu-label">
            FIDO2
          </p>
          <ul class="menu-list">
            <li>
              <router-link
                class="navbar-item"
                to="/fido2/register"
              >
                Register
              </router-link>
            </li>
            <li>
              <router-link
                class="navbar-item"
                to="/fido2/login"
              >
                Login
              </router-link>
            </li>
          </ul>
          <p class="menu-label">
            User/pass
          </p>
          <ul class="menu-list">

            <li>
              <router-link
                class="navbar-item"
                to="/register"
              >
                Register
              </router-link>
            </li>
            <li>
              <router-link
                class="navbar-item"
                to="/login"
              >
                Login
              </router-link>
            </li>
          </ul>

        </aside>
      </div>

      <div class="column ">
        <div class="is-flex swisscom-logo">
          <img
            title="Swisscom logo"
            alt="Swisscom logo"
            src="./assets/logo_swisscom.png"
            srcset="./assets/logo_swisscom.png 1x, ./assets/logo_swisscom@2x.png 2x"
          >
          <span>
            Swisscom
          </span>
        </div>

        <router-view></router-view>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app'
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

  .swisscom-logo {
    padding: 20px;
    width: 100%;
    color: #001155;
    font-size: 24px;
    font-family: SwisscomIcons, sans-serif !important;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    justify-content: center;
  }

  .swisscom-logo span {
    padding-left: 10px;
  }
</style>
