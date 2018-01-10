import gql from 'graphql-tag'

export const COMING_MOVIE_QUERY = gql`
  {
    comingMovie {
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
