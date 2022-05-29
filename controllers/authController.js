//Lib require
const bcrypt = require("bcryptjs");

//Module require
const User = require("../models/userModel");

//authController class
class authController {
    async registration(request,response){
        try {
            const {name, email, password, role} = request.body;
            const candidate = await User.findOne({name: name, email: email, password: password, role: role});
            if(candidate){
                throw new Error("User already exist");
            }
            const hashPassword =  bcrypt.hashSync(password,bcrypt.genSaltSync(7));
            if(!hashPassword){
                throw new Error("Hash password error");
            }
            const user = new User({name: name, email: email, password: hashPassword, role: role});
            if(!user){
                throw new Error("Error save error")
            }
            await user.save();
            return response.json({message: "Success new User"});
        } catch (error) {
           console.log("Error of registration");
           console.log(error);
           response.sendStatus(400);
        }
    }
    async login(request,response){
        try {

        } catch (error) {
            console.log("Error of login");
            console.log(error);
            response.sendStatus(400);
        }
    }
    async getUsers(request,response){
        try {

        } catch (error) {
            console.log("Error of get users");
            console.log(error);
            response.sendStatus(400);
        }
    }
}

module.exports = new authController();