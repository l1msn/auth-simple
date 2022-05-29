//Lib require
const mongoose = require("mongoose");



//Scheme User
const User = mongoose.model('User',
    new mongoose.Schema({
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: ['Admin', 'User'], required: true },
        createDate: { type: String, default:
                (new Intl.DateTimeFormat("ru", {dateStyle: "short", timeStyle: "short"}).format(new Date()))
        }
    }, {
        versionKey: false
    })
);

//Export User
module.exports = User;