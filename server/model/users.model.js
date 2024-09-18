import mongoose from "mongoose";


const usersModel = mongoose.Schema({
    users:{
        type: String,
        required: true,
    },
    gifname:{
        type: String,
        required: true,
        default: 'random gif'
    },
    gifpath:{
        type: String,
        required: false,
        default: "../client-app/assets/images.png"
    }
})

export const Users = mongoose.model("Users", usersModel)