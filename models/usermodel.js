//importamos la libreria de mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minLength: 6,
    required: [true, "El correo es obligatoria"],
    match: [/^\S+@\S+\.\S+$/, "Correo incorrecto"],
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
    trim: true,
    minLength: 8,
  },
  role: {
    type: String,
    required: [true, "El rol es obligatorio"],
    enum: ["user", "admin"],
    default: "user",
  },
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "movies",
    },
  ],
});
const userModel = mongoose.model("user", userSchema, "user");

module.exports = userModel;
