const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true, minlength: 1 },
  status: { type: String, enum: ['COMING', 'NEW', 'NOW', 'EXPIRED'], default: 'COMING' },
  bannerURL : { type: String, required: true, minlength: 1 },
  comments: {
    fb_id: { type: String },
    text: { type: String },
    createdAt: { type: Date, default: Date.now }
  },
  user_rates: {
    cookie_id: { type: String }, // for detect who is rating.
    ip: { type: String }, // for filtering if there is an issue
    scores: { type: String, enum: ['worth', 'waste', 'intermediate'] },
    createdAt: { type: Date, default: Date.now }
  },
  createdAt: { type: Date, default: Date.now }
})

// using the schema to make a collection in our DB
const Movie = mongoose.model('Movie', movieSchema)
module.exports = Movie