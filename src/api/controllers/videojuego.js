const Videojuego = require("../models/Videojuego");


//consultar todos los videojuegos en bbdd
const getVideojuegos = async (req, res, next) => {
    try {
        const videojuegos = await Videojuego.find();
        return res.status(200).json(videojuegos);
    } catch (error){
        return res.estatus(400).json("error");
    }
}

// consultar un videojuego con determinado id
const getVideojuegoById = async (req, res, next) => {
	const id = req.params.id;
	try {
		const videojuego = await Videojuego.findById(id);
		if (videojuego) {
			return res.status(200).json(videojuego);
		} else {
			return res.status(404).json('No se ha encontrado ningún libro con este id');
		}
	} catch (err) {
		return res.status(500).json(err);
	}
}

// consultar un videojuegos por su título
const getVideojuegosByTitulo = async (req, res, next) => {
	const { titulo } = req.params;

	try {
		const videojuegoByTitulo = await Videojuego.find({ titulo: titulo });
		return res.status(200).json(videojuegoByTitulo);
	} catch (err) {
		return res.status(500).json(err);
	}
}

//publicar un videojuego
const postVideojuegos = async (req, res, next) => {
    try {
        const newVideojuego = new Videojuego(req.body);
        const libroGuardado = await newVideojuego.save();
        return res.status(201).json(libroGuardado);
    } catch (error){
        return res.status(400).json("error");
    }
}

//actualizar un videojuegos (por ID)
const updateVideojuegos = async (req, res, next) => {
    try {
        const { id } = req.params;  
        const newVideojuego = new Videojuego(req.body);
        newVideojuego._id = id;
        const videojuegoActualizado = await Libro.findByIdAndUpdate(id, newVideojuego, { new: true, });
        return res.status(201).json(videojuegoActualizado);
    } catch (error){
        return res.status(400).json("error");
    }
}

//borrar un videojuegos
const deleteVideojuegos = async (req, res, next) => {
    try {
        const { id } = req.params;
        const videojuegoDelete = await Videojuego.findByIdAndDelete(id);
        return res.status(200).json(videojuegoDelete);
    } catch (error){
        return res.status(400).json("error");
    }
}

module.exports = {
    getVideojuegos,
    getVideojuegoById,
    getVideojuegosByTitulo,
    postVideojuegos,
    updateVideojuegos,
    deleteVideojuegos
}