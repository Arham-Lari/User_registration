import { ApiError } from "../utils/ApiError.js";
import {AsyncHandler} from "../utils/AsyncHandler.js"


const registeruser = AsyncHandler(async (req,res)=>{

    //got the detail of user
    const {username,email,fullname,password} = req.body;

    //validate
    if(fullname == ""){
        throw new ApiError(400,"fullname is required");
    }


})

export {registeruser};

