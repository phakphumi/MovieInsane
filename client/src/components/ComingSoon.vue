<template>
  <div>
    <b-card-group columns>
      <div v-for='movie in comingMovie' :key='movie.title'>
        <b-card :title='movie.title'
          :img-src='movie.poster'
          img-fluid
          img-alt="image"
          img-top
          @click="handleCardClick(movie.title)"
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
</template>

<script>
import { COMING_MOVIE_QUERY } from '@/graphql/coming_movie'
import MovieModal from '@/components/MovieModal'

export default {
  name: 'ComingSoon',
  data () {
    return {
      loading: 0,
      comingMovie: [],
      selectedMovie: []
    }
  },
  apollo: {
    comingMovie: {
      query: COMING_MOVIE_QUERY
    }
  },
  methods: {
    handleCardClick (title) {
      this.selectedMovie = this.comingMovie.find(movie => movie.title === title)
      this.$refs.movieModal.$refs.movieModal.show()
    }
  },
  components: {
    MovieModal
  },
  beforeMount () {
    this.$apollo.queries.comingMovie.refetch()
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