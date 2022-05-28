//Lib require
const express = require("express");
const monogoose = require("mongoose");

//Module require
const authRouter = require("./routes/authRoutes");
const logger = require("./middleware/logger");

//Express
const app = express();
app.use(express.json());
app.use(logger);
app.use(express.static(__dirname + '/public', {
    extensions: ['html']
}));
app.use("/auth", authRouter);

//Const parameters
const PORT = process.env.PORT || 3000;
const DB_URL = "mongodb://localhost:27017/";
const DB_NAME = "auth";


//Start Server
(async () => {
        try {
            await monogoose.connect(DB_URL + DB_NAME);
            app.listen(PORT, () => {
                console.log("Server is running - http://localhost:" + PORT);
                console.log("Start on login - http://localhost:" + PORT + "/login");
            });
        } catch (error) {
            console.log(error)
        }
    }
)();