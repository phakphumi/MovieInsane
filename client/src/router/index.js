import Vue from 'vue'
import Router from 'vue-router'
import NewArrival from '@/components/NewArrival'
import NowShowing from '@/components/NowShowing'
import ComingSoon from '@/components/ComingSoon'
import AddMovie from '@/components/AddMovie'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'NewArrival',
      component: NewArrival
    },
    {
      path: '/_=_',
      name: 'NewArrivalRe',
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
    },
    {
      path: '/addmovie',
      name: 'AddMovie',
      component: AddMovie
    }
  ]
})
