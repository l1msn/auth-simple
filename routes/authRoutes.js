//Инициализация библиотек
const router = require("express");
const validator = require("express-validator");

//Инициализация модулей
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
//Инициализируем Роутрер
const authRouter = new router();

//Запросы Роутера
//URL, Валидация, Контроллер управления
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

//Экспортируем данный модуль
module.exports = authRouter;