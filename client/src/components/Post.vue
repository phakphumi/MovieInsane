<template>
  <div> 
    <b-row>
      <b-col offset-sm="1" sm="1.5">
        <p>Movie Title:</p>
      </b-col>
      <b-col>
        <b-form-input 
          v-model="title"
          id="input-small" 
          size="sm" 
          type="text" 
          placeholder="Enter movie title"
        ></b-form-input>
      </b-col>
      <h3>{{movieByTitle.title}}</h3>
      <p>{{movieByTitle.plot}}</p>
    </b-row>
  </div>
</template>

<script>

import { MOVIE_QUERY } from '@/graphql/movie_by_title'
export default {
  data () {
    return {
      title: '',
      movieByTitle: {}
    }
  },
  apollo: {
    movieByTitle: {
      query: MOVIE_QUERY,
      variables () {
        return {
          title: this.title
        }
      }
    }
  }
}
</script>
<style>
</style>