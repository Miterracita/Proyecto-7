const { isAuth, isAdmin } = require("../../middlewares/auth");
const videojuegoRouter = require("express").Router();
const { getVideojuegos, getVideojuegoById, getVideojuegosByTitulo, postVideojuegos, updateVideojuegos, deleteVideojuegos } = require("../controllers/videojuego");

videojuegoRouter.get('/:id', getVideojuegoById);
videojuegoRouter.get('/titulo/:titulo', getVideojuegosByTitulo);

videojuegoRouter.get("/", getVideojuegos);
videojuegoRouter.post("/nuevo", [isAuth], postVideojuegos);
videojuegoRouter.put("/:id", [isAdmin], updateVideojuegos);
videojuegoRouter.delete("/:id", [isAdmin], deleteVideojuegos);

module.exports = videojuegoRouter;

//a partir de la ruta establecida en el index app.use('/libros', librosRouter); sumamos, es decir
// libros/titulo - libros/id