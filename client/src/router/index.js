import Vue from 'vue'
import Router from 'vue-router'
import NewArrival from '@/components/NewArrival'
import NowShowing from '@/components/NowShowing'
import ComingSoon from '@/components/ComingSoon'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'NewArrival',
      component: NewArrival
    },
    {
      path: '/nowshowing',
      name: 'NowShowing',
      component: NowShowing
    },
    {
      path: '/comingsoon',
      name: 'ComingSoon',
      component: ComingSoon
    }
  ]
})
