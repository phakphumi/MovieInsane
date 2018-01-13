// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { apolloProvider } from './vue_apollo'
import Login from '@/components/Login'

const Home = { template: '<App/>', components: { App } }

const routes = {
  '/': Home,
  '/login': Login
}

Vue.use(BootstrapVue)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {
    currentRoute: window.location.pathname
  },
  apolloProvider,
  router,
  computed: {
    ViewComponent () {
      return routes[this.currentRoute] || 'NotFound'
    }
  },
  render (h) { return h(this.ViewComponent) }
})
