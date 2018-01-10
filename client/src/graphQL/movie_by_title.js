import gql from 'graphql-tag'

export const MOVIE_QUERY = gql`
  query movie($title: String!) {
    movieByTitle(title: $title) {
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
      searchStatus
    }
  }
`
