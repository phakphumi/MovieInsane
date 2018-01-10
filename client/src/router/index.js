import Vue from 'vue'
import Router from 'vue-router'
import NewArrival from '@/components/NewArrival'
import NowShowing from '@/components/NowShowing'
import ComingSoon from '@/components/ComingSoon'
import AddPost from '@/components/AddPost'
import Post from '@/components/Post'

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
    },
    {
      path: '/add',
      name: 'AddPost',
      component: AddPost
    },
    {
      path: '/post/:id',
      name: 'Post',
      component: Post,
      props: true
    }
  ]
})
