const User = require("../api/models/Usuario");
const { verifyJwt } = require("../utils/jwt");

const isAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(400).json("No estás autorizado a realizar esta petición.");
        }
        //para recibir el token sin bearer
        const parsedToken = token.replace("Bearer ", "");
        const { id } = verifyJwt(parsedToken);
        const user = await User.findById(id);       
        
        console.log(parsedToken);
        
        //una vez identificado el token
        user.password = null;
        req.user  = user;
        next();

    } catch (error){
        return res.status(400).json("Este usuario no está autorizado.");
    }
}
const isAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(400).json("No estás autorizado");
        }
        //para recibir el token sin bearer
        const parsedToken = token.replace("Bearer ", "");
        const { id } = verifyJwt(parsedToken);
        const user = await User.findById(id);

        //sólo pueden eliminar otros usuarios los admin
        if (user.rol === "admin") {          
            user.password = null;
            req.user  = user;
            next();
        } else {
            return res.status(400).json("Este usuario no es admin");
        }

    } catch (error){
        return res.status(400).json("No estás autorizado");
    }
}
module.exports = { isAuth, isAdmin };