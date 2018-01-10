<template>
  <div>
    <b-carousel id="carousel"
                style="text-shadow: 1px 1px 2px #333;"
                controls
                :interval="3000"
                v-model="slide"
                @sliding-start="onSlideStart"
                @sliding-end="onSlideEnd"
    >
      <div v-for='movie in newMovie' :key='movie.title' @click="handleCarouselClick(movie)">
        <b-carousel-slide :img-src="movie.bannerURL"
        ></b-carousel-slide>
      </div>
    </b-carousel>
    <MovieModal ref="movieModal" :movie="this.selectedMovie"></MovieModal>
  </div>
</template>
  
<script>
import { NEW_MOVIE_QUERY } from '@/graphql/new_movie'
import MovieModal from '@/components/MovieModal'

export default {
  name: 'NewArrival',
  data () {
    return {
      slide: 0,
      sliding: null,
      newMovie: [],
      selectedMovie: []
    }
  },
  apollo: {
    newMovie: {
      query: NEW_MOVIE_QUERY
    }
  },
  methods: {
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    },
    handleCarouselClick (movie) {
      this.selectedMovie = movie
      this.$refs.movieModal.$refs.movieModal.show()
    }
  },
  components: {
    MovieModal
  }
}
</script>

<style>
.carousel-item {
  height: 89vh;
  width: auto;
  overflow: hidden;
  min-height: 300px;
  cursor: pointer
}
.carousel-item > img {
  height: inherit;
}
</style>