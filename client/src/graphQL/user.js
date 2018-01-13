import gql from 'graphql-tag'

export const USER = gql`
  {
    user {
      isAdmin
    }
  }
`
