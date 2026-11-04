import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { user } from "../models/user.model.js";

const verifyJWT = AsyncHandler(async (req,res,next) =>{
    try{
        const token = req.cookies?.acessToken || req.header("Authorization")?.replace("Bearer","");

        if(!token){
            throw new ApiError(401,"unathorized request");
        }

        const deccodedToken = jwt.verify(token,process.env.ACESS_TOKEN_SECREATE);

        const User = await user.findById(deccodedToken?._id).select("-password -refresh_token")

        if(!User){
            throw new ApiError(401,"Invalid Acess Token");
        }
        req.User = User;
        next();
    }catch(error){

        throw new ApiError(401,error?.message || "invalid access token");
    }

})

export default verifyJWT
