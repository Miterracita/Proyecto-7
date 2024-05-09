const mongoose = require('mongoose');

const consolaSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    videojuegos: [{ type: mongoose.Types.ObjectId, ref: "videojuegos", required: false }],
    //el nombre de la ref debe ser igual al de la coleccion a relacionar
  },
  {
    timestamps: true,
    collection: "consolas"
  }
);

const Consola = mongoose.model('consolas', consolaSchema, 'consolas');
module.exports = Consola;