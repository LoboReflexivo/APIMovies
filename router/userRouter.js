const { addUser } = require("../controllers/userControllers");

const router = require("express").Router();

router.post("/signup", addUser);

module.exports = router;
