import gql from 'graphql-tag'

// creating a mutation to update movie status
export const UPDATE_MOVIE_STATUS = gql`
  mutation updateMovieStatus($title: String!, $status: String!){
    updateMovieStatus(title: $title, status: $status) {
      status
    }
  }
`
