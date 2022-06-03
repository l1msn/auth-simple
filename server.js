//Инициализация библиотек
const express = require("express");
const monogoose = require("mongoose");
const bodyParser = require("body-parser")
require("dotenv").config();

//Инициализация модулей
const authRouter = require("./routes/authRoutes");
const logger = require("./middleware/logger");

//Инициализируем Express
const app = express();
//Инициализируем возможность работы с json
app.use(express.json());
//Инициализируем парсиринг json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
//Инициализируем логгер
app.use(logger);

//Инициализируем маршутизацию
app.use("/auth", authRouter, express.static(__dirname + '/public', {
    index: false,
    extensions: ['html','htm']
}));

//Константы
const PORT = process.env.PORT || 3000;
const DB_URI = ("mongodb://" + process.env.MONGO_HOST
    + ":" + process.env.MONGO_PORT + "/" + process.env.MONGO_NAME)
        || ("mongodb://127.0.0.1:27017/auth");


//Запускаем сервер

(async () => {
        try {
            //Подключаемся к БД
            await monogoose.connect(DB_URI,
                {
                    useNewUrlParser: true
                }
            );
            //Прослушиваем сервер
            app.listen(PORT, () => {
                console.log("Server is running - http://localhost:" + PORT);
                console.log("Start on login - http://localhost:" + PORT + "/auth/login");
            });
        } catch (error) {
            console.log(error)
        }
    }
)();