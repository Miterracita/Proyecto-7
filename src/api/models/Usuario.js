const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, trim: true, required: true, unique: true },
    nombreUsuario: { type: String, trim: true, required: true, unique: true },
    password: { type: String, trim: true, required: true },
    añoNacimiento: { type: Number, trim: true, required: false },
    rol: { type: String, enum: ["admin", "user"], required: false},
    imagenPerfil: { type: String, trim: true, required: false}
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