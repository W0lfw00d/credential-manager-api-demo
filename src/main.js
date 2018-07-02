import Vue from 'vue';
import VueRouter from 'vue-router';
import Fido2RegisterForm from './components/Fido2RegisterForm';
import Fido2LoginForm from './components/Fido2LoginForm';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import SecurePage from './components/SecurePage';
import WelcomePage from './components/WelcomePage';
import App from './App.vue';
import 'bulma/css/bulma.css';

Vue.use(VueRouter);

Vue.config.productionTip = false;

const routes = [
  { path: '/', component: WelcomePage },
  { path: '/fido2/register', component: Fido2RegisterForm },
  { path: '/fido2/login', component: Fido2LoginForm },
  { path: '/register', component: RegisterForm },
  { path: '/login', component: LoginForm },
  {
    path: '/secret',
    component: SecurePage,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('api_token');
      if (token) {
        next();
      } else {
        next(false);
      }
    }
  }
];

const router = new VueRouter({
  routes
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
