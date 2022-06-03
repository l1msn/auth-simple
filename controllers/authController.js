//Инициализация библиотек
const bcrypt = require("bcryptjs");
const validator = require("express-validator")
const jwt = require("jsonwebtoken")

//Инициализация модулей
const User = require("../models/userModel");

//Класс контроллер для аунтификации и действий пользователя
/**
 * @description - Класс контроллер для аунтификации и действий пользователя
 * @class
 */
class authController {
    /**
     * @description - Метод регистрации пользователя
     * @method
     * @async
     * @param request - запрос
     * @param response - ответ
     * @return {Promise<*>}
     */
    async registration(request,response){
        try {
            //Ошибки полученные путем валидации
            const errors = validator.validationResult(request);
            //При наличие ошибок валидации - выбрасываем ошибку
            if(!errors.isEmpty())
                throw new Error("Validation error");

            //Получаем с запроса данные форм для регистрации
            const {name, email, password, role} = request.body;
            console.log("Request is: ",name,email,password,role);
            //Ищем пользователя в БД
            const candidate = await User.findOne({name: name, email: email, password: password, role: role});
            //Если такой пользователь есть - выбрасываем ошибку
            if(candidate)
                throw new Error("User already exist");

            //Шифруем пароль
            const hashPassword =  bcrypt.hashSync(password,bcrypt.genSaltSync(7));
            //Если произошла ошибка шифрования - выбрасываем ошибку
            if(!hashPassword)
                throw new Error("Hash password error");

            console.log("New hash password: ", hashPassword);
            //Помещаем пользователя в БД
            const user = new User({name: name, email: email, password: hashPassword, role: role});
            //Если не получаеться поместить в БД - выбрасываем ошибку
            if(!user)
                throw new Error("Error save error");

            //Сохраняем пользователя
            await user.save();
            console.log("New user is: ", user);
            //Возвращаем ответ клиенту
            return response.json({message: "Success new User"});
        } catch (error) {
            //Обрабатываем ошибки и отправляем статус код
           console.log("Error of registration");
           console.log(error);
            return response.status(400).json({message: error.message});
        }
    }
    /**
     * @description - Метод авторизации пользователя
     * @method
     * @async
     * @param request - запрос
     * @param response - ответ
     * @return {Promise<*>}
     */
    async login(request,response){
        try {
            //Получаем с запроса данные форм для авторизации
            const {email, password} = request.body;
            console.log("Request is: ", email, password);
            //Ищем в БД такого пользователя
            const user = await User.findOne({email: email});
            console.log("Founded user is: ", user);
            //Если не нашли - то выбрасываем ошибку
            if(!user)
                throw new Error("User not found");

            //Расшифруем пароль и сравним с текущем
            const validPassword = bcrypt.compareSync(password,user.password);
            //Если не совпадает - то выбрасываем угадайте-что!
            if(!validPassword)
                throw new Error("Password invalid");

            //Функция для создания jwt token
            const token = ((id, role)=>{
                const payload = {
                    id,
                    role
                }
                return jwt.sign(payload, process.env.SECRED_CODE, {expiresIn: "24h"});
            })(user._id,user.role);
            //Если не удалост сформировать его - то выбрасываем ошибку
            if(!token)
                throw new Error("Error to create jwt token");
            console.log("JWT token is: ",token);
            //Возвращаем ответ клиенту - jwt token
            return response.json({token});
        } catch (error) {
            //Обрабатываем ошибки и отправляем статус код
            console.log("Error of login");
            console.log(error);
            return response.status(400).json({message: error.message});
        }
    }
    /**
     * @description - Метод получения всех пользователей для Admin
     * @method
     * @async
     * @param request - запрос
     * @param response - ответ
     * @return {Promise<*>}
     */
    async getUsers(request,response){
        try {
            //Получаем с БД всех пользователей
            const users = await User.find();
            //Если не получилось - то выбрасываем ошибку
            if(!users)
                throw new Error("Without users");

            //Возвращаем ответ клиенту - всех пользователей
            response.send(users);
        } catch (error) {
            //Обрабатываем ошибки и отправляем статус код
            console.log("Error of get users");
            console.log(error);
            return response.status(400).json({message: error.message});
        }
    }
}

//Экспортируем данный модуль
module.exports = new authController();