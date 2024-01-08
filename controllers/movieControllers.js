const movieModel = require("../models/movieModel");

const loadMovie = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      director,
      rating,
      posterUrl,
      trailer,
      year,
    } = req.body;

    const newMovie = new movieModel({
      title: title,
      description: description,
      category: category,
      director: director,
      rating: rating,
      posterUrl: posterUrl,
      trailer: trailer,
      year: year,
    });

    await newMovie.save();

    res.status(200).json({
      status: "succeeded",
      newMovie,
      error: null,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", data: null, error: error.message });
  }
};

const getMovies = async (req, res) => {
  try {
    const movies = await movieModel.find();

    res.status(200).json({ status: "succeeded", movies, error: null });
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", data: null, error: error.message });
  }
};

const getMovieById = async (req, res) => {
  try {
    const movieId = req.params.id;

    const movie = await movieModel.findById(movieId);

    res.status(201).json({ status: "succeeded", movie, error: null });
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", data: null, error: error.message });
  }
};

const popularMovies = async (req, res) => {
  try {
    let movie = await movieModel.aggregate([
      { $sort: { rating: -1 } },
      { $limit: 10 },
    ]);

    res.status(201).json({ status: "succeeded", movie, error: null });
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", data: null, error: error.message });
  }
};

const recentMovies = async (req, res) => {
  try {
    let movie = await movieModel.aggregate([
      { $sort: { createAt: -1 } },
      { $limit: 10 },
    ]);

    res.status(201).json({ status: "succeeded", movie, error: null });
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", data: null, error: error.message });
  }
};

module.exports = {
  loadMovie,
  getMovies,
  getMovieById,
  popularMovies,
  recentMovies,
};
