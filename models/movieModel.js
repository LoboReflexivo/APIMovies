const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentsSchema = new Schema({
  //El esquema para añadir los comentarios
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  comment: {
    type: String,
    required: [true, "El comentario es obligatorio"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

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
  comment: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "movies",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const movieModel = mongoose.model("movies", moviesSchema, "movies");

module.exports = movieModel;
