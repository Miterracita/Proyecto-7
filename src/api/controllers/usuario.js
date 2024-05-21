const { generateSing } = require("../../utils/jwt");
const User = require("../models/Usuario");
const bcrypt = require("bcrypt");

//postUser - create
const registro = async (req, res, next) => {
  try {

    const newUser = new User(req.body);

    //al crear un usuario asignaremos por defecto el rol user
    newUser.rol = "user";

    //comprobamos si un nombre de usuario ya existe
    const userDuplicated = await User.findOne ({
      nombreUsuario: req.body.nombreUsuario
    });

    //si un usuario ya existe nos salta un mensaje de aviso y no crea el nuevo usuario
    if (userDuplicated) {
      return res.status(400).json("Ese nombre de usuario ya existe");
    }  

    const userSaved = await newUser.save();
    return res.status(201).json(userSaved);

  } catch (error) {
    return res.status(400).json(error);
  }
}

//
const login = async (req, res, next) => {

  try {
    
    const user = await User.findOne({ nombreUsuario: req.body.nombreUsuario });
    
    if (!user){
      return res.status(400).json("Este nombre de usuario no existe");   
    }    
    //comparamos el password introducido con el usuario, en el caso de que el usuario exista
    if(bcrypt.compareSync(req.body.password, user.password)){
      
      //lo que pasa cuando te logueas con jsonwebtoken
      const token = generateSing(user._id);
      return res.status(200).json(`Te has logueado como: ${user.nombreUsuario} ${token}`);
    
    } else {       
      return res.status(400).json("La contraseña es incorrecta");
    }

  } catch (error) {
    return res.status(400).json(error);
  }
}

//con esta funcion todos los que estén logueados pueden eliminar otro usuario
const deleteUser = async (req, res, next) => {
  try {    
    const { id } = req.params;
    const userDeleted = await User.findByIdAndDelete(id);
    return res.status(200).json({
      mensaje: "Este usuario se ha eliminado",
      userDeleted,
    });

  } catch {
    return res.status(400).json(error);
  }
}
//ver todos los usuarios
const getUsers = async (req, res, next) => {

  try {
    const users = await User.find();
    return res.status(200).json(users);

  } catch (error){
    return res.status(400).json(error);
  }
}

//actualizar un usuario (por ID)
const updateUser = async (req, res, next) => {
  try {
      const { id } = req.params;
      const newUsuario = new User(req.body);
      newUsuario._id = id;

      const userActualizado = await User.findByIdAndUpdate(id, newUsuario, { new: true, });
      console.log(userActualizado);
      return res.status(200).json(userActualizado);

  } catch (error){
      return res.status(400).json("error al actualizar el usuario");
  }
}

module.exports = { registro, login, deleteUser, getUsers, updateUser };