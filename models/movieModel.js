const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const moviesSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: [
    {
      type: String,
      required: true,
    },
  ],
  director: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  posterUrl: {
    type: String,
    required: true,
  },
  trailer: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const movieModel = mongoose.model("movies", moviesSchema, "movies");

module.exports = movieModel;
