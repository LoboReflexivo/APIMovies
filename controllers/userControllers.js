const userModel = require("../models/userModel");
const movieModel = require("../models/movieModel");
const bcrypt = require("bcrypt");
const emailService = require("../services/emailServices");
const { loginUser } = require("./loginControllers");
const { generateToken } = require("../utils/utils");

//añadir un usuario
const addUser = async (req, res) => {
  try {
    const { name, email, password, favorites, role } = req.body;

    const newUser = new userModel({
      name: name,
      email: email,
      password: await bcrypt.hash(password, 10),
      favorites: favorites,
      role: role,
    });

    await emailService.sendEmail(
      name,
      email,
      "usuario creado correctamente",
      ` ha creado un nuevo usuario con el email: ${email}`
    );
    await newUser.save();

    res.status(200).json({
      status: "succeeded",
      newUser,
      error: null,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", data: null, error: error.message });
  }
};
//añadir peliculas a favoritos
const addFav = async (req, res) => {
  try {
    const idMovie = req.params.id; //se coge el id puesto de la peli
    const idUser = req.user.id; //se coge el id del usuario que se ha autenticado

    const favUser = await userModel.findById(idUser);
    const findedMovie = await movieModel.findById(idMovie);
    const favorites = favUser.favorites;

    if (!findedMovie) {
      return res
        .status(404)
        .json({ status: "failed", data: null, error: error.message });
    }

    if (favorites.includes(findedMovie.id)) {
      return console.log("La pelicula ya está dentro");
    } else {
      favorites.push(findedMovie);
      favUser.save();
    }

    console.log(favorites);

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
//ver las peliculas que tenemos en favoritos
const viewFavoriteMovies = async (req, res) => {
  try {
    const idUser = req.user.id; //se coge el id del usuario que se ha autenticado
    const moviesFavorites = await userModel.findById(
      { _id: idUser },
      { favorites: 1 }
    );

    res.status(200).json({
      status: "succeeded",
      moviesFavorites,
      error: null,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", data: null, error: error.message });
  }
};
//eliminar pelicula de favoritos

const deleteFav = async (req, res) => {
  try {
    const movieId = req.params.id; //el id de la pelicula que se quiere eliminar
    const user = await userModel.findById(req.user.id); //se encuentra el usuario
    const arrayMovies = user.favorites; //se encuentra el array de peliculas favoritas del usuario

    console.log(`arrayMovies es ${arrayMovies}`);

    const indexMovies = arrayMovies.indexOf(movieId); //se pone en una variable el indice en el que se encuentra la pelicula en el array

    console.log(`El indexMovies es ${indexMovies}`);

    arrayMovies.splice(indexMovies, 1);

    console.log(`Este es el arrayMovies:   ${arrayMovies}`);

    user.save();

    /*arrayMovies.forEach((movie) => {
      if (movie._id !== movieForDelete) {
        newArray.push(movie);
      }
    });*/

    res.status(200).json({
      status: "succeeded",
      arrayMovies,
      error: null,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", data: null, error: error.message });
  }
};

//GET TOKEN

/*const getToken = async (req, res) => {
  try {
    
    const user = req.user;
    

  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", data: null, error: error.message });
  }
};
*/
module.exports = {
  addUser,
  addFav,
  viewFavoriteMovies,
  deleteFav,
};
