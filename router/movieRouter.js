const {
  loadMovie,
  getMovies,
  getMovieById,
  popularMovies,
  recentMovies,
  deleteMovieDDBB,
  updateMovie,
  moviePage,
} = require("../controllers/movieControllers");
const { verifyToken, verifyTokenAdmin } = require("../middlewares/auth");

const router = require("express").Router();

router.get("", getMovies);
router.post("", verifyTokenAdmin, loadMovie); //only admin
router.get("/most_popular", popularMovies);
router.get("/recent", recentMovies);
router.get("/page", moviePage);
router.delete("/id/:id", verifyTokenAdmin, deleteMovieDDBB); //only admin
router.get("/id/:id", getMovieById);
router.patch("/:id", verifyTokenAdmin, updateMovie); //onlyadmin

module.exports = router;
