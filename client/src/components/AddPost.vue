<template>
  <div>
    <b-row class="py-2">
      <b-col offset-sm="1" sm="2">
        <p>Movie Title:</p>
      </b-col>
      <b-col sm="7">
        <b-form-input 
          v-model="titleInput"
          id="input-small" 
          type="text" 
          placeholder="Enter movie title"
          @keydown.enter.native="searchMovie"
        ></b-form-input>
      </b-col>
      <b-col sm="1">
        <b-button variant="secondary" @click="searchMovie">Search</b-button>
      </b-col>
    </b-row>
    <b-row class="py-2">
      <b-col offset-sm="1" sm="2">
        Status:
      </b-col>
      <b-col sm="8">
        <div>{{ status }}</div>
      </b-col>
    </b-row>
    <div v-if="movieByTitle.searchStatus === 'omdbfound' && movieByTitle.poster !== 'N/A'">
      <b-row class="py-2">
        <b-col offset-sm="1" sm="2">
          BannerURL:
        </b-col>
        <b-col sm="7">
          <b-form-input 
            v-model="bannerURL"
            id="input-small" 
            type="text" 
            placeholder="Enter Banner URL"
          ></b-form-input>
        </b-col>
      </b-row>
    </div>
    <b-row class="py-2" v-if="bannerURL">
      <b-col offset-sm="1" sm="2">
        Banner Preview:
      </b-col>
      <b-img class="bannerPreview ml-3" :src="bannerURL" fluid alt="Fluid image"/>
    </b-row>
    <div v-if="movieByTitle.searchStatus !== 'notfound' && movieByTitle.searchStatus !== 'waiting' && movieByTitle.poster !== 'N/A'">
      <b-row class="py-2">
        <b-col offset-sm="1" sm="2">
          Poster:
        </b-col>
        <b-img class="ml-3" :src="posterURL" fluid alt="Fluid image"/>
      </b-row>
    </div>
    <div v-if="movieByTitle.searchStatus === 'found'">
      <b-row class="py-2">
        <b-col offset-sm="1" sm="2">
          Theatre Status:
        </b-col>
        <b-col sm="8">
          <b-form-select v-model="theatreStatus" :options="options">
          </b-form-select>
        </b-col>
      </b-row>
    </div>
    <div v-else-if="movieByTitle.searchStatus === 'omdbfound'">
      <b-row class="py-2">
        <b-col offset-sm="3" sm="8">
          <b-button variant="primary" @click="addMovie">Add Movie</b-button>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { ADD_MOVIE } from '@/graphql/add_movie'
import { UPDATE_MOVIE_STATUS } from '@/graphql/update_movie_status'
import { MOVIE_QUERY } from '@/graphql/movie_by_title'

export default {
  data () {
    return {
      title: '',
      titleInput: '',
      bannerURL: null,
      posterURL: null,
      status: 'Input waiting...',
      movieByTitle: {},
      theatreStatus: null,
      options: [
        { value: null, text: 'Change Treatre Status', disabled: true },
        { value: 'COMING', text: 'Coming Soon' },
        { value: 'NEW', text: 'New Arrival' },
        { value: 'NOW', text: 'Now Showing' },
        { value: 'EXPIRED', text: 'Out of Theatre' }
      ]
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
  },
  methods: {
    addMovie (e) {
      this.$apollo.mutate({
        mutation: ADD_MOVIE,
        variables: {
          title: this.title,
          bannerURL: this.bannerURL
        }
      }).then(result => {
        this.title = result.data.addMovie.title
        this.$apollo.queries.movieByTitle.refetch()
      })
    },
    searchMovie (e) {
      this.title = this.titleInput
      this.$apollo.queries.movieByTitle.refetch()
    }
  },
  watch: {
    movieByTitle: function (val, oldVal) {
      // change theatre status to null for prevent multiple mutation
      if (oldVal.searchStatus === 'found') {
        this.theatreStatus = null
      }
      console.log(val)

      if (val.searchStatus === 'wait') {
        this.posterURL = null
        this.status = 'Input waiting...'
      } else if (val.searchStatus === 'notfound') {
        this.posterURL = null
        this.status = 'Movie not found'
      } else if (val.searchStatus === 'omdbfound') {
        this.posterURL = val.poster
        this.status = 'Movie haven\'t in our database but found in OMDB'
      } else if (val.searchStatus === 'found') {
        this.posterURL = val.poster
        this.bannerURL = val.bannerURL
        this.status = 'Movie is already in our database'
        this.theatreStatus = val.status
      }
    },
    theatreStatus: function (val, oldVal) {
      // check null value for prevent multiple mutation
      if (val !== null && oldVal !== null) {
        this.$apollo.mutate({
          mutation: UPDATE_MOVIE_STATUS,
          variables: {
            title: this.title,
            status: val
          }
        })
      }
    }
  }
}
</script>

<style>
.textarea {
  width: 400px;
  height: 70px;
}
.textInput {
  width: 400px;
  height: 20px;
}
.bannerPreview {
  height: 30vh;
}
</style>
