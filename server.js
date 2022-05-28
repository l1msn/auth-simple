//Lib require
const express = require("express");
const monogoose = require("mongoose");
//Module require
const authRouter = require("./routes/authRoutes")

//Express
const app = express();
app.use(express.json());
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
                console.log("Server is running http://localhost" + PORT)
            });
        } catch (error) {
            console.log(error)
        }
    }
)();