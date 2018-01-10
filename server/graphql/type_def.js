module.exports = `
  type Movie {
    id: ID
    title: String!
    plot: String
    genre: String
    director: String
    actors: String
    poster: String
    bannerURL: String
    country: String
    production: String
    released: String
    runtime: String
    imdbRating: String
    rottenRating: String
    metacriticRating: String
    status: String
    searchStatus: String
    comments: [Comment]
  }
  type Comment {
    fb_id: String!
    text: String!
  }
  type Query {
    allMovie: [Movie]!
    comingMovie: [Movie]!
    newMovie: [Movie]!
    nowMovie: [Movie]!
    movieByTitle(title: String!): Movie!
  }
  type Mutation {
    addMovie(title: String!, bannerURL: String!): Movie
    updateMovieStatus(title: String!, status: String!): Movie
  }
`