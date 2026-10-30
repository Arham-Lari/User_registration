import mongoose, { Schema } from "mongoose";


const userSchema = new Schema({
   username : {
        type: String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        index : true,
    },
    emai : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
    },
    fullname : {
        type : String,
        required : true,
    },
    avatar : {
        type : "string",
        required : true,
    },
    password : {
        type : String,
        require : [true , "password is required"],
    },
    refresh_token : {
        type : String,
    }
},{timestamps : true});


export const user = mongoose.model("User",userSchema);

