//Lib require
const router = require("express");
const validator = require("express-validator");

//Module require
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware")
//Init authRouter
const authRouter = new router();

//authRouter request
authRouter.post("/registration",[
    validator.check("name","Name must not empty").notEmpty(),
    validator.check("email","Email must not empty").notEmpty(),
    validator.check("password","Password must not empty").notEmpty(),
],authController.registration);

authRouter.post("/login",[
    validator.check("email","Email must not empty").notEmpty(),
    validator.check("password","Password must not empty").notEmpty()
],authController.login);

authRouter.get("/users",roleMiddleware("Admin"),authController.getUsers);

//Export
module.exports = authRouter;