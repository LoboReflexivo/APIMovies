const {
  loadMovie,
  getMovies,
  getMovieById,
  popularMovies,
  recentMovies,
} = require("../controllers/movieControllers");

const router = require("express").Router();

router.get("", getMovies);
router.post("", loadMovie);
router.get("/most_popular", popularMovies);
router.get("/recent", recentMovies);
router.get("/id/:id", getMovieById);

module.exports = router;
