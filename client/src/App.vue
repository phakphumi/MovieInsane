<template>
  <div id="app">
    <b-navbar toggleable="sm" variant="light" sticky="true">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand :to="{ name: 'NewArrival' }">
        <img src="./assets/logo.png" width="40" height="40" alt="">
        MovieInsane
      </b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item :to="{ name: 'NewArrival' }" active-class>New Arrival</b-nav-item>
          <b-nav-item :to="{ name: 'NowShowing' }">Now Showing</b-nav-item>
          <b-nav-item :to="{ name: 'ComingSoon' }">Coming Soon</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view></router-view>
  </div>
</template>

<script>
// import Navigation from './components/Navigation'
// import Carousel from './components/Carousel'
// import NowShowing from './components/NowShowing'
// import ComingSoon from './components/ComingSoon'

export default {
  name: 'app',
  components: {
    // Navigation,
    // Carousel,
    // NowShowing,
    // ComingSoon
  },
  data () {
    return {
      page: 0,
      scrollPosition: 0
    }
  },
  methods: {
    // handleScroll (e) {
    //   let nowShowing = document.getElementById('now-showing')
    //   let comingSoon = document.getElementById('coming-soon')
    //   // console.log(nowShowing.offsetHeight)
    //   if (this.scrollPosition < window.scrollY) {
    //     // scroll down
    //     if (this.page === 0 && window.scrollY >= nowShowing.offsetTop) {
    //       document.getElementById('nav-new-arrival').classList.remove('active')
    //       document.getElementById('nav-now-showing').classList.add('active')

    //       // window.scrollTo(nowShowing.offsetLeft, nowShowing.offsetTop)
    //       this.page = 1
    //     } else if (this.page === 1 && window.scrollY >= comingSoon.offsetTop) {
    //       document.getElementById('nav-now-showing').classList.remove('active')
    //       document.getElementById('nav-coming-soon').classList.add('active')

    //       // window.scrollTo(nowShowing.offsetLeft, nowShowing.offsetTop + nowShowing.offsetHeight)
    //       this.page = 2
    //     }
    //   } else if (this.scrollPosition > window.scrollY) {
    //     // scroll up
    //     if (this.page === 1 && window.scrollY <= nowShowing.offsetTop) {
    //       document.getElementById('nav-now-showing').classList.remove('active')
    //       document.getElementById('nav-new-arrival').classList.add('active')

    //       // window.scrollTo(0, 0)
    //       this.page = 0
    //     } else if (this.page === 2 && window.scrollY <= comingSoon.offsetTop) {
    //       document.getElementById('nav-coming-soon').classList.remove('active')
    //       document.getElementById('nav-now-showing').classList.add('active')
    //       // window.scrollTo(nowShowing.offsetLeft, nowShowing.offsetHeight)
    //       this.page = 1
    //     }
    //   }
    //   this.scrollPosition = window.scrollY
    //   // console.log(this.scrollPosition)
    // }
  },
  created: function () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed: function () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style>
</style>
