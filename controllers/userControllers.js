const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

const addUser = async (req, res) => {
  try {
    const { name, email, password, favorites } = req.body;

    const newUser = new userModel({
      name: name,
      email: email,
      password: await bcrypt.hash(password, 10),
      favorites: favorites,
    });

    await newUser.save();

    res.status(200).json({
      status: "succeeded",
      newUser,
      error: null,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", data: null, error: error.message });
  }
};

module.exports = {
  addUser,
};
