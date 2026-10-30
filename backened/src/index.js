import {app} from "./app.js"
import dotennv from "dotenv"
import connectDB from "./db/index.js";

dotennv.config({
    path : "./env"
})

connectDB().then(()=>{

    app.listen(process.env.PORT,()=>{
        console.log("the data base is listing on the port",process.env.PORT);
    });
})
.catch((error)=>{
        console.log("data base connection error",error);
    })
