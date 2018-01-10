<template>
  <div>
    <b-modal ref="movieModal" hide-footer :title="movie.title">
      <div class="d-block">
        <b-img center :src="movie.poster" fluid alt="Responsive image" />
        <br/>
        <p class="text-muted">
          {{ movie.plot }}
        </p>
        <p class="text-muted">
          <b>Genres:</b> {{ movie.genre }}
        </p>
        <p class="text-muted">
          <b>Runtime:</b> {{ movie.runtime }}
        </p>
        <p class="text-muted">
          <b>Director:</b> {{ movie.director }}
        </p>
        <p class="text-muted">
          <b>Stars:</b> {{ movie.actors }}
        </p>
        <p class="text-muted">
          <b>Production:</b> {{ movie.production }}
        </p>
        <p class="text-muted">
          <b>Country:</b> {{ movie.country }}
        </p>
        <p class="text-muted">
          <b>Release Date:</b> {{ movie.released }}
        </p>
        <p>
          <img src="../assets/tomatoes-icon.png" width="auto" height="40"> <b>{{ movie.rottenRating }}</b> 
          <img src="../assets/metacritic-icon.png" width="auto" height="40"> <b>{{ movie.metacriticRating }}</b>
          <img src="../assets/imdb-icon.png" width="auto" height="40"> <b>{{ movie.imdbRating }}</b>
        </p>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'movieModal',
  props: ['movie']
}
</script>

<!-- modal-methods-1.vue -->