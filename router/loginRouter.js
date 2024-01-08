const { loginUser } = require("../controllers/loginControllers");

const router = require("express").Router();

router.post("/login", loginUser);

module.exports = router;
