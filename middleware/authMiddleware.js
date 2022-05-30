//Lib require
const jwt = require("jsonwebtoken")

//Module require
const secret = require("../config")

//Function auth
function authMiddleware (request,response,next){
    if(request.method === "OPTIONS")
        next();

    try {
        const token = request.headers.authorization.split(' ')[1];
        if(!token)
            throw new Error("No token");
        console.log(token);
        const decode = jwt.verify(token,secret.secretKey);
        request.user = decode;
        next();
    } catch (error) {
        console.log("Error of auth");
        console.log(error);
        return response.status(403).json({message: error.message});
    }
}

module.exports = authMiddleware;