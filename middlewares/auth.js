//Esto sirve para autenticar el token, para verificar que es correcto

const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access denied");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    try {
      const verified = jwt.verify(token, process.env.TOKEN_SECRET_REFRESH);
      console.log("verified", verified);
      req.user = verified;
      next();
    } catch (error) {
      res.status(400).send("Expired Token");
    }
  }
};
