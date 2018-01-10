import gql from 'graphql-tag'

// creating a mutation to update movie status
export const ADD_MOVIE = gql`
  mutation addMovie($title: String!, $bannerURL: String!){
    addMovie(title: $title, bannerURL: $bannerURL) {
      title
    }
  }
`
