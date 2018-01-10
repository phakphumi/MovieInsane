// OMDB Connector
const rp = require('request-promise')

module.exports = {
  getMovieDetailsByTitle(title) {
    return rp({
      uri: `http://www.omdbapi.com/?t=${ title }`,
      qs: {
        apikey: "c8ffdc0" // -> uri + '?access_token=xxxxx%20xxxxx'
      },
      headers: {
        'User-Agent': 'Request-Promise'
      },
      json: true // Automatically parses the JSON string in the response
    })
  }
}