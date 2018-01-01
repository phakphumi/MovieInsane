import Vue from 'vue'
import Router from 'vue-router'
import NewArrival from '@/components/NewArrival'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'NewArrival',
      component: NewArrival
    }
  ]
})
