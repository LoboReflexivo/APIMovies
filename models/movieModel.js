const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//El esquema para añadir los comentarios
const commentsSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  name: {
    type: String,
    ref: "users",
    required: true,
  },
  comment: {
    type: String,
    required: [true, "El comentario es obligatorio"], //El comentario es el único que lo ponemos en el body
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
  trailerUrl: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  comment: [commentsSchema], //Para añadir el esquema de los comentarios, solamente pongo el esquema aquí dentro de un array
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const movieModel = mongoose.model("movies", moviesSchema, "movies");

module.exports = { movieModel };
