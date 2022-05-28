const fs = require("fs");

const logger = (request,response,next)=>{
    let now = new Date();
    let hour = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let data = `${hour}:${minutes}:${seconds} ${request.method} ${request.url} `;
    console.log(data);
    fs.appendFile("server.log", data + "\n", function(){});
    next();
};

module.exports = logger;