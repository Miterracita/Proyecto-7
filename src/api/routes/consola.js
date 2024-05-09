const { isAuth, isAdmin } = require("../../middlewares/auth");
const consolaRouter = require("express").Router();
const { getConsola, postConsola } = require("../controllers/consola");

consolaRouter.get("/", [isAuth], getConsola);
consolaRouter.post("/nueva", [isAdmin], postConsola);

module.exports = consolaRouter;