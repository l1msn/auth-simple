//Инициализация библиотек
const jwt = require("jsonwebtoken")

//Инициализация модулей

//Функция middleware для аунтификации и действий пользователя
/**
 * @description - Функция middleware для аунтификации и действий пользователя
 * @function
 * @param request - запрос
 * @param response - ответ
 * @param next - следушая функция middleware
 * @return {*}
 */
function authMiddleware (request,response,next){
    //Обрабатываем только стандартные методы - POST/GET
    if(request.method === "OPTIONS")
        next();

    try {
        //Получаем из запроса токен
        const token = request.headers.authorization.split(' ')[1];
        //Если token нет - то выбрасываем ошибку
        if(!token)
            throw new Error("No token");
        console.log(token);
        //Декодируем token
        const decode = jwt.verify(token,process.env.SECRED_CODE);
        //Сохраняем юзера в сессии
        request.user = decode;
        next();
    } catch (error) {
        //Обрабатываем ошибки и отправляем статус код
        console.log("Error of auth");
        console.log(error);
        return response.status(403).json({message: error.message});
    }
}
//Экспортируем данный модуль
module.exports = authMiddleware;