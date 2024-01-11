const movieModel = require("../models/movieModel");

//añadir pelis(solo admin)
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
      error: null,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", data: null, error: error.message });
  }
};
//borrar pelis (solo admin)

const deleteMovieDDBB = async (req, res) => {
  try {
    const idMovie = req.params.id;
    console.log(idMovie);

    await movieModel.findByIdAndDelete(idMovie);

    res.status(200).json({
      status: "succeeded",
      error: null,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", data: null, error: error.message });
  }
};

//Actualizar pelicula (solo admin)

const updateMovie = async (req, res) => {
  try {
    const movieId = req.params.id; //el id de la pelicula que se quiere editar
    const update = req.body; //Lo que se quiere actualizar
    const movie = await movieModel.findByIdAndUpdate(movieId, update); //Se encuentra la pelicula por el id y se guarda en la constante

    if (!movie) {
      //si no hay peliucla sale este error
      return res.status(404).json({
        status: "failed",
        message: "No hay pelicula",
        error: error.message,
      });
    }

    await movie.save(); //se guarda la pelicula
    console.log(movie);

    res.status(200).json({ status: "succeeded", movie, error: null }); // Devuelve la movie actualizado
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", data: null, error: error.message });
  }
};

//Ver todas las peliculas de la base de datos
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

//ver una pelicula por su ID
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

//ver las 10 peliculas mas populates
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

//ver las 10 peliculas que se han añadido recientemente a la base de datos
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

//ver las peliculas por paginación

const moviePage = async (req, res) => {
  try {
    const limit = req.query.limit;
    const page = req.query.page;
    const startIndex = (page - 1) * limit;
    const movies = await movieModel.find().skip(startIndex).limit(limit);
    /*

    Con JavaScript
    
    cons limit = req.query.limit;
    const movies = await movieModel.find()
    const dondeSeEmpieza = page * limit - limit;
    const dondeAcaba = page * limit + 1;
    const final = movies.slice(dondeSeEmpieza, dondeAcaba);

    console.log(`Aqui empieza ${dondeSeEmpieza} y aquí se acaba ${dondeAcaba}`);
    console.log(`El resultado final:     ${final}`);*/

    res.status(201).json({ status: "succeeded", movies, error: null });
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
  deleteMovieDDBB,
  updateMovie,
  moviePage,
};
