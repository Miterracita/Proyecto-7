const mongoose = require('mongoose');

const videojuegoSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    calificacion: { type: Number, min: 0, max: 10 },
  },
  {
    timestamps: true,
    collection: "videojuegos"
  }
);

const Videojuego = mongoose.model('videojuegos', videojuegoSchema, 'videojuegos');
module.exports = Videojuego;