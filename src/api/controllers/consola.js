const Consola = require("../models/Consola");

//consultar todas las consolas en bbdd
const getConsola = async (req, res, next) => {
    try {
        const consolas = await Consola.find().populate("videojuegos");
        return res.status(200).json(consolas);
    } catch (error){
        return res.estatus(400).json("error");
    }
}

//publicar una consola
const postConsola = async (req, res, next) => {
    try {
        const newConsola = new Consola(req.body);
        const consolaGuardada = await newConsola.save();
        return res.status(201).json(consolaGuardada);
    } catch (error){
        return res.status(400).json("error");
    }
}

module.exports = {
    getConsola,
    postConsola,
}