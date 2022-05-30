//Lib require
const bcrypt = require("bcryptjs");
const validator = require("express-validator")
const jwt = require("jsonwebtoken")

//Module require
const User = require("../models/userModel");
const Secret = require("../config");

//authController class
class authController {
    async registration(request,response){
        try {
            const errors = validator.validationResult(request);
            if(!errors.isEmpty())
                throw new Error("Validation error");

            const {name, email, password, role} = request.body;
            console.log("Request is: ",name,email,password,role);
            const candidate = await User.findOne({name: name, email: email, password: password, role: role});
            if(candidate)
                throw new Error("User already exist");


            const hashPassword =  bcrypt.hashSync(password,bcrypt.genSaltSync(7));
            if(!hashPassword)
                throw new Error("Hash password error");

            console.log("New hash password: ", hashPassword);
            const user = new User({name: name, email: email, password: hashPassword, role: role});
            if(!user)
                throw new Error("Error save error");

            await user.save();
            console.log("New user is: ", user);

            return response.json({message: "Success new User"});
        } catch (error) {
           console.log("Error of registration");
           console.log(error);
            return response.status(400).json({message: error.message});
        }
    }
    async login(request,response){
        try {
            const {email, password} = request.body;
            console.log("Request is: ", email, password);

            const user = await User.findOne({email: email});
            console.log("Founded user is: ", user);
            if(!user)
                throw new Error("User not found");

            const validPassword = bcrypt.compareSync(password,user.password);
            if(!validPassword)
                throw new Error("Password invalid");

            const token = ((id, role)=>{
                const payload = {
                    id,
                    role
                }
                return jwt.sign(payload, Secret.secretKey, {expiresIn: "24h"});
            })(user._id,user.role);
            console.log("JWT token is: ",token);

            return response.json({token});
        } catch (error) {
            console.log("Error of login");
            console.log(error);
            return response.status(400).json({message: error.message});
        }
    }
    async getUsers(request,response){
        try {
            const users = await User.find();
            if(!users)
                throw new Error("Without users");

            response.send(users);
        } catch (error) {
            console.log("Error of get users");
            console.log(error);
            return response.status(400).json({message: error.message});
        }
    }
}

module.exports = new authController();