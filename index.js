require("dotenv").config();
const express = require("express");
const { connectDB } = require("./src/config/db");
const userRoutes = require("./src/api/routes/usuario");
const videojuegoRouter = require("./src/api/routes/videojuego");
const consolaRouter = require("./src/api/routes/consola");

const app = express();
connectDB();

//para que pueda ser capaz de entender el formato .json
app.use(express.json());

app.use("/users", userRoutes);

app.use('/consolas', consolaRouter);
//para poder ver el listado de consolas accedemos a la ruta /consolas

app.use('/videojuegos', videojuegoRouter);
//para poder ver el listado de videojuegos accedemos a la ruta /videojuegos

app.use("*", (req, res, next) => {
    return res.status(404).json("Ruta no encontrada")
})

app.listen(3000, () => {
    console.log("El servidor está funcionando en http://localhost:3000");
})