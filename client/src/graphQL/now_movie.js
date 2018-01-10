import gql from 'graphql-tag'

export const NOW_MOVIE_QUERY = gql`
  {
    nowMovie {
      title
      plot
      genre
      director
      actors
      poster
      country
      production
      released
      runtime
      imdbRating
      rottenRating
      metacriticRating
      status
    }
  }
`
