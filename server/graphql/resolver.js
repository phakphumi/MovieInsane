const omdb =  require('./omdb_connector')

module.exports = {
  Movie: {
    async comments(root, args, { DB }) {
      const movie = root
      const comments = await DB.Movie.findOne({ title: movie.title.toLowerCase() }).comments   
      return comments
    }
  },
  Query: {
    async user (root, args, { DB, user }) {
      return {
        isAdmin: user.isAdmin
      }
    },
    async comingMovie (root, args, { DB }) {
      const movie_db = await DB.Movie.find({ status: "COMING" })
      let movies = await Promise.all(movie_db.map(async (movie) => {
        const movie_api = await omdb.getMovieDetailsByTitle(movie.title)
        return {
          id: movie.id,
          title: movie_api.Title,
          plot: movie_api.Plot,
          genre: movie_api.Genre,
          director: movie_api.Director,
          actors: movie_api.Actors,
          poster: movie_api.Poster,
          country: movie_api.Country,
          production: movie_api.Production,
          released: movie_api.Released,
          runtime: movie_api.Runtime,
          imdbRating: movie_api.imdbRating,
          rottenRating: movie_api.Ratings.find(rating => rating.Source === "Rotten Tomatoes") ? movie_api.Ratings.find(rating => rating.Source === "Rotten Tomatoes").Value : 'N/A',
          metacriticRating: movie_api.Metascore,
          status: movie.status,
        }
      }))
      return movies
    },
    async newMovie (root, args, { DB }) {
      const movie_db = await DB.Movie.find({ status: "NEW" })
      let movie = await Promise.all(movie_db.map(async (movie) => {
        const movie_api = await omdb.getMovieDetailsByTitle(movie.title)
        return {
          id: movie.id,
          title: movie_api.Title,
          plot: movie_api.Plot,
          genre: movie_api.Genre,
          director: movie_api.Director,
          actors: movie_api.Actors,
          poster: movie_api.Poster,
          bannerURL: movie.bannerURL,
          country: movie_api.Country,
          production: movie_api.Production,
          released: movie_api.Released,
          runtime: movie_api.Runtime,
          imdbRating: movie_api.imdbRating,
          rottenRating: movie_api.Ratings.find(rating => rating.Source === "Rotten Tomatoes") ? movie_api.Ratings.find(rating => rating.Source === "Rotten Tomatoes").Value : 'N/A',
          metacriticRating: movie_api.Metascore,
          status: movie.status,
        }
      }))
      return movie
    },
    async nowMovie (root, args, { DB }) {
      const movie_db = await DB.Movie.find({$or: [
        { status: "NEW" }, { status: "NOW" }
      ]})
      let movie = await Promise.all(movie_db.map(async (movie) => {
        const movie_api = await omdb.getMovieDetailsByTitle(movie.title)
        return {
          id: movie.id,
          title: movie_api.Title,
          plot: movie_api.Plot,
          genre: movie_api.Genre,
          director: movie_api.Director,
          actors: movie_api.Actors,
          poster: movie_api.Poster,
          country: movie_api.Country,
          production: movie_api.Production,
          released: movie_api.Released,
          runtime: movie_api.Runtime,
          imdbRating: movie_api.imdbRating,
          rottenRating: movie_api.Ratings.find(rating => rating.Source === "Rotten Tomatoes") ? movie_api.Ratings.find(rating => rating.Source === "Rotten Tomatoes").Value : 'N/A',
          metacriticRating: movie_api.Metascore,
          status: movie.status,
        }
      }))
      return movie
    },
    async movieByTitle (root, args, { DB }) {
      const { title } = args
      const movie_db = await DB.Movie.findOne({ title: title.toLowerCase() })
      const movie_api = await omdb.getMovieDetailsByTitle(title)
      if( title === '' ) {
        return {
          title: title,
          searchStatus: 'waiting'
        }
      } else if (movie_db && movie_api) {
        return {
          id: movie_db.id,
          title: movie_api.Title,
          plot: movie_api.Plot,
          genre: movie_api.Genre,
          director: movie_api.Director,
          actors: movie_api.Actors,
          poster: movie_api.Poster,
          bannerURL: movie_db.bannerURL,
          country: movie_api.Country,
          production: movie_api.Production,
          released: movie_api.Released,
          runtime: movie_api.Runtime,
          imdbRating: movie_api.imdbRating,
          rottenRating: movie_api.Ratings.find(rating => rating.Source === "Rotten Tomatoes") ? movie_api.Ratings.find(rating => rating.Source === "Rotten Tomatoes").Value : 'N/A',
          metacriticRating: movie_api.Metascore,
          status: movie_db.status,
          searchStatus: 'found'
        }
      } else if ( !movie_db && movie_api.Response === 'True' && title.toLowerCase() === movie_api.Title.toLowerCase() ) {
        return {
          title: title,
          poster: movie_api.Poster,
          searchStatus: 'omdbfound'
        }
      } else {
        return {
          title: title,
          searchStatus: 'notfound'
        }
      }
    }
  },
  Mutation: {
    async addMovie (root, args, { DB, user }) {
      if (user.isAdmin) {
        const movie = args
        movie.title = movie.title.toLowerCase()
        movie.bannerURL = movie.bannerURL
        const newMovie = await new DB.Movie(movie)
        return newMovie.save()
      }
    },
    async updateMovieStatus ( root, args, { DB, user }) {
      if(user.isAdmin) {
        const movie = args
        let updateMovie = await DB.Movie.findOne({ title: movie.title.toLowerCase() })
        updateMovie.status = movie.status
        return updateMovie.save()
      }
    }
  }
}