import mongoose, { Schema } from "mongoose";
import bycrpt from "bcrypt"
import jwt from "jsonwebtoken"


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

userSchema.pre("save", async function (next) {

    if(!this.isModified("password")) return next();

    this.password =  bycrpt.hash(this.password,10);
    next();
})

userSchema.methods.isPasswordCorrect = async function (password) {

    return  await bycrpt.compare(password,this.password);
}

userSchema.methods.generateAccessToken = function(){
  return jwt.sign(
                {
                    _id:this._id,
                    email : this.email,
                    username : this.username,
                },
                process.env.ACESS_TOKEN_SECREATE,
                {
                    expiresIn:process.env.ACESS_TOKEN_EXPIRY
                }
  )
}

userSchema.methods.generateRefreshToken = function (){
  jwt.sign(
        {
            _id:this._id,
            emai:this.email,
            username: this.username,
        },
        process.env.REFRESH_TOKEN_SECREATE,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY,
        }
        
    )
}

export const user = mongoose.model("User",userSchema);

