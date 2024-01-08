//IMPORTACIONES
//importamos el framework express
const express = require("express");
//importamos la library de mongoose
const mongoose = require("mongoose");
//Obtenemos la informción de configuraciñon de .env(previamente intalado a través de "npm install dotenv")
require("dotenv").config();

//CONEXION CON EL SERVIDOR
//Seleccionamos el puerto
const PORT = 1998;
//inicializamos expres y accedemos a sus funciones
const app = express();
//analizamos los archvos JSON
app.use(express.json());

//CONEXIÓN CON MONGO
//conectamos la base de datos con este archivo principal
const url_mongo = process.env.DATABASE_URL_DEV;

mongoose.connect(url_mongo);

const db = mongoose.connection;

db.on("error", (error) => {
  console.log(`Error al conectar con mongo ${error}`);
});

db.on("connected", () => {
  console.log(`Succecss connect`);
});

db.on("disconected", () => {
  console.log(`Mongo is disconected`);
});

//CONECTADOR CON ROUTER

const userRouter = require("./router/userRouter");
const movieRouter = require("./router/movieRouter");
const loginRouter = require("./router/loginRouter");

app.use("/users", userRouter);
app.use("/movies", movieRouter);
app.use("/auth", loginRouter);

//Aquí escuhamos al puerto
app.listen(PORT, () => {
  console.log(`Server running http://localhost:${PORT}`);
});
