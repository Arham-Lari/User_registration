import dotennv from "dotenv"
import connectDB from "./db/index.js";

dotennv.config({
    path : "./env"
})

connectDB().then(

).catch((error)=>{
        console.log("data base connection error",error);
    })
