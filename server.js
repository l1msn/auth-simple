//Lib require
const express = require("express");
const monogoose = require("mongoose");
const bodyParser = require("body-parser")
require("dotenv").config();

//Module require
const authRouter = require("./routes/authRoutes");
const logger = require("./middleware/logger");

//Express
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(logger);

app.use("/auth", authRouter, express.static(__dirname + '/public', {
    index: false,
    extensions: ['html','htm']
}));

//Const parameters
const PORT = process.env.PORT || 3000;
const DB_URI = ("mongodb://" + process.env.MONGO_HOST
    + ":" + process.env.MONGO_PORT + "/" + process.env.MONGO_NAME)
        || ("mongodb://127.0.0.1:27017/auth");


//Start Server
(async () => {
        try {
            await monogoose.connect(DB_URI,
                {
                    useNewUrlParser: true
                }
            );
            app.listen(PORT, () => {
                console.log("Server is running - http://localhost:" + PORT);
                console.log("Start on login - http://localhost:" + PORT + "/auth/login");
            });
        } catch (error) {
            console.log(error)
        }
    }
)();