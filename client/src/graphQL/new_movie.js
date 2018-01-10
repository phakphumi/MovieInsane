import gql from 'graphql-tag'

export const NEW_MOVIE_QUERY = gql`
  {
    newMovie {
      title
      plot
      genre
      director
      actors
      poster
      bannerURL
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
