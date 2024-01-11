//Esto sirve para autenticar el token, para verificar que es correcto

const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access denied");

  try {
    const verified = jwt.verify(token, process.env.TOKEN);
    req.user = verified;
    next();
  } catch (error) {
    try {
      const verified = jwt.verify(token, process.env.REFRESH_TOKEN);
      console.log("verified", verified);
      req.user = verified;
      next();
    } catch (error) {
      res.status(400).send("Expired Token");
    }
  }
};

const verifyTokenAdmin = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access denied");

  try {
    const verified = jwt.verify(token, process.env.TOKEN);
    const role = verified.role;

    if (role === "user") {
      return res.status(401).json({
        status: "succeeded",
        message: "No tienes acceso",
        error: null,
      });
    } else {
      req.user = verified;
      next();
    }
  } catch (error) {
    res.status(400).send("Expired Token");
  }
};

module.exports = { verifyToken, verifyTokenAdmin };
