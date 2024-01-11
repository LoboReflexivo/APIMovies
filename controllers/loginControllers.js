const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/utils.js");

const loginUser = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });

    if (user) {
      const validatePassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (validatePassword) {
        const token = generateToken(
          { id: user.id, email: user.email, role: user.role },
          false
        );
        const refreshToken = generateToken(
          { id: user.id, email: user.email, role: user.role },
          true
        );
        return res.status(201).json({
          status: "Sucess",
          message: "Usuario logueado correctamente",
          data: {
            user: user,
            token: token,
            refreshToken: refreshToken,
          },
        });
      }
      return res.status(400).json({
        status: "Failed",
        data: null,
        error: "Usuario y contraseña no encontrado",
      });
    }

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

/*
Con el endpoint de refresh token podemos
generar un nuevo token sin la necesidad de loguearnos
nuevamente
*/
const refreshToken = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Acceso denegado" });
  }
  const user = { id: req.user.id, email: req.user.email, role: req.user.role };
  const token = generateToken(user, false);
  const refreshToken = generateToken(user, true);
  res.status(200).json({
    status: "succeeded",
    data: {
      token,
      refreshToken,
    },
    error: null,
  });
};

module.exports = {
  loginUser,
  refreshToken,
};
