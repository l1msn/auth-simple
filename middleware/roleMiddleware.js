//Инициализация библиотек
const jwt = require("jsonwebtoken");

//Инициализация модулей

//Функция middleware для аунтификации и ролевой действий пользователя
/**
 * @description - Функция middleware для аунтификации и ролевой действий пользователя
 * @function
 * @param roles - роли пользователя
 * @return {(function(*, *, *): (*|undefined))|*}
 */
function roleMiddleware(roles){
    return (request,response,next)=>{
        //Обрабатываем только стандартные методы - POST/GET
        if(request.method === "OPTIONS")
            next();

        try {
            //Получаем из запроса токен
            const token = request.headers.authorization.split(' ')[1];
            //Если token нет - то выбрасываем ошибку
            if(!token)
                throw new Error("No token - Not auth user now");
            console.log(token);
            //Получаем роль пользователя
            const {role: userRoles} = jwt.verify(token, process.env.SECRED_CODE);
            console.log(userRoles);
            //Проверяем наличие роли\совпадение
            let hasRole = false;
            Array.prototype.forEach.call(userRoles,(role)=>{
                if(roles.includes(role))
                    hasRole = true;
            });
            //Если нет прав - то выбрасываем ошибку
            if(!hasRole)
                throw new Error("Not access for this function")
            next();
        } catch (error) {
            //Обрабатываем ошибки и отправляем статус код
            console.log("Error of auth");
            console.log(error);
            return response.status(403).json({message: error.message});
        }
    }
}
//Экспортируем данный модуль
module.exports = roleMiddleware;