import mongoose from "mongoose"
import {DB_NAME} from "../constant.js"

const connectDB = async () =>{
    try{

        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

        console.log(`\n MongoDB connected !! DB host: ${connectionInstance.host}`);

    }catch(error){
        console.log("moongoDB connection error !",error);
        process.exit(1);
        //we can alse use throw error
    }
}

export default connectDB;
