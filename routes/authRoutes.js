//Lib require
const router = require("express");

//Module require
const authController = require("../controllers/authController");
//Init authRouter
const authRouter = new router();

//authRouter request
authRouter.post("/registration",authController.registration);
authRouter.post("/login",authController.login);
authRouter.get("/users",authController.getUsers);

//Export
module.exports = authRouter;