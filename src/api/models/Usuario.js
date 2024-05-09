const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, trim: true, required: true, unique: true },
    nombreUsuario: { type: String, trim: true, required: true, unique: true },
    password: { type: String, trim: true, required: true },
    añoNacimiento: { type: Number, trim: true, required: true },
    rol: { type: String, trim: true, required: true },
    imagenPerfil: { type: String, trim: true}
  },
  {
    timestamps: true,
    collection: "usuarios"
  }
);

//encriptamos la contraseña
userSchema.pre("save", function() {
  this.password = bcrypt.hashSync(this.password, 10);
});

const User = mongoose.model('usuarios', userSchema, 'usuarios');
module.exports = User;