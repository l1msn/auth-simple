//Lib require
const jwt = require("jsonwebtoken");

//Module require

//Function auth
function roleMiddleware(roles){
    return (request,response,next)=>{
        if(request.method === "OPTIONS")
            next();

        try {
            const token = request.headers.authorization.split(' ')[1];
            if(!token)
                throw new Error("No token - Not auth user now");
            console.log(token);
            const {role: userRoles} = jwt.verify(token, process.env.SECRED_CODE);
            console.log(userRoles);
            let hasRole = false;
            Array.prototype.forEach.call(userRoles,(role)=>{
                if(roles.includes(role))
                    hasRole = true;
            });
            if(!hasRole)
                throw new Error("Not access for this function")
            next();
        } catch (error) {
            console.log("Error of auth");
            console.log(error);
            return response.status(403).json({message: error.message});
        }
    }
}

module.exports = roleMiddleware;