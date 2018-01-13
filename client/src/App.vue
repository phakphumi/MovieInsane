<template>
  <div id="app">
    <b-navbar toggleable="sm" variant="light" sticky="true">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand :to="{ name: 'NewArrival' }">
        <img src="./assets/MovieInsane-logo.png" width="auto" height="60" alt="">
      </b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item :to="{ name: 'NewArrival' }" active-class>New Arrival</b-nav-item>
          <b-nav-item :to="{ name: 'NowShowing' }">Now Showing</b-nav-item>
          <b-nav-item :to="{ name: 'ComingSoon' }">Coming Soon</b-nav-item>
          <b-nav-item v-if="user.isAdmin" :to="{ name: 'AddMovie' }">Add Movie</b-nav-item> 
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import { USER } from '@/graphql/user'

export default {
  name: 'app',
  data () {
    return {
      user: {
        isAdmin: false
      }
    }
  },
  apollo: {
    user: {
      query: USER
    }
  }
}
</script>

<style>
.navbar {
  height: 11vh;
}
</style>
