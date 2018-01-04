<template>
  <div>
    <h4 v-if='loading'>Loading...... </h4>
    <div v-for='post in allPost' :key='post.id'>
      <router-link :to='post.id' exact>
        <h3>{{post.title}}</h3>
      </router-link>
      <p>{{post.content}}</p>
    </div>
  </div>
</template>

<script>
import { ALL_POST_QUERY } from '../graphql/all_post'

export default {
  name: 'ComingSoon',
  data () {
    return {
      loading: 0,
      allPost: []
    }
  },
  apollo: {
    allPost: {
      query: ALL_POST_QUERY
    }
  }
}
</script>