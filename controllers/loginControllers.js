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

module.exports = {
  loginUser,
};
