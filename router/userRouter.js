const {
  addUser,
  addFav,
  deleteFav,
  viewFavoriteMovies,
} = require("../controllers/userControllers");
const { verifyToken } = require("../middlewares/auth");
const { generateToken } = require("../utils/utils");

const router = require("express").Router();

router.get("/favorites", verifyToken, viewFavoriteMovies);
router.post("/signup", addUser);
router.get("/generateToken", verifyToken, generateToken); //get
router.post("/addFav/:id", verifyToken, addFav);
router.patch("/deleteFav/:id", verifyToken, deleteFav);

module.exports = router;
