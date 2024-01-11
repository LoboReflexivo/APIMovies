const { loginUser, refreshToken } = require("../controllers/loginControllers");
const { verifyToken } = require("../middlewares/auth");

const router = require("express").Router();

router.post("/login", loginUser);
router.get("/refreshToken", verifyToken, refreshToken),
  (module.exports = router);
