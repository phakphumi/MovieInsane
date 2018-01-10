<template>
  <div>
    <b-card-group columns>
      <div v-for='movie in nowMovie' :key='movie.title'>
        <b-card :title='movie.title'
          :img-src='movie.poster'
          img-fluid
          img-alt="image"
          img-top
          @click="handleCardClick(movie)"
        >
          <p class="card-text text-muted">
            {{ movie.plot }}
          </p>
          <p class="card-text text-muted">
            Genre: {{ movie.genre }}
          </p>
          <p class="card-text">
            <small class="text-muted">
              Release Date: {{ movie.released }}
            </small>
          </p>
          <p class="card-text text-center">
            <img src="../assets/tomatoes-icon.png" width="auto" height="40"> <b>{{ movie.rottenRating }}</b> 
            <img src="../assets/metacritic-icon.png" width="auto" height="40"> <b>{{ movie.metacriticRating }}</b>
            <img src="../assets/imdb-icon.png" width="auto" height="40"> <b>{{ movie.imdbRating }}</b>
          </p>
        </b-card>
      </div>
    </b-card-group>
    <MovieModal ref="movieModal" :movie="this.selectedMovie"></MovieModal>
  </div>
  <!-- card-group-3.vue -->
</template>

<script>
import { NOW_MOVIE_QUERY } from '@/graphql/now_movie'
import MovieModal from '@/components/MovieModal'

export default {
  name: 'NowShowing',
  data () {
    return {
      loading: 0,
      nowMovie: [],
      selectedMovie: []
    }
  },
  apollo: {
    nowMovie: {
      query: NOW_MOVIE_QUERY
    }
  },
  methods: {
    handleCardClick (movie) {
      this.selectedMovie = movie
      this.$refs.movieModal.$refs.movieModal.show()
    }
  },
  components: {
    MovieModal
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@media (min-width: 34em) {
    .card-columns {
        -webkit-column-count: 1;
        -moz-column-count: 1;
        column-count: 1;
    }
}

@media (min-width: 48em) {
    .card-columns {
        -webkit-column-count: 2;
        -moz-column-count: 2;
        column-count: 2;
    }
}

@media (min-width: 62em) {
    .card-columns {
        -webkit-column-count: 3;
        -moz-column-count: 3;
        column-count: 3;
    }
}

@media (min-width: 75em) {
    .card-columns {
        -webkit-column-count: 4;
        -moz-column-count: 4;
        column-count: 4;
    }
}
a {
  color:inherit;
}
.card {
  cursor: pointer
}
</style>