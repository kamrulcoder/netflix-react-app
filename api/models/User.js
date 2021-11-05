const { Schema, model } = require('mongoose')


const userScheema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String, default: ""
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
},

    {
        timestamps: true
    }
)

module.exports = model("User", userScheema)