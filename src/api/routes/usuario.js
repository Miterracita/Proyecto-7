const { isAuth, isAdmin } = require("../../middlewares/auth");
const { registro, login, deleteUser, getUsers } = require("../controllers/usuario");
const userRoutes = require("express").Router();

userRoutes.post("/registro", registro);
userRoutes.post("/login", login);
//isAdmin nos limina a sólo el tipo de usuario indicado en el middlewares (admin) pueda o no ejecutar esta función
userRoutes.delete("/:id", [isAdmin], deleteUser);
userRoutes.get("/", [isAuth], getUsers);

module.exports = userRoutes;