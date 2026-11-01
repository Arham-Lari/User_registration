import { ApiResponse } from "../utils/Apiresponse.js";
import { ApiError } from "../utils/ApiError.js";
import {AsyncHandler} from "../utils/AsyncHandler.js"
import {user} from "../models/user.model.js"
import upload from "../utils/fileUpload.js"


const registeruser = AsyncHandler(async (req,res)=>{

    //get the detail of user from body
    const {username,email,fullname,password} = req.body;

    //validate
    if(
    [username,email,fullname,password].some(field => (
       field?.trim() === ""
    ))
    ){
        throw new ApiError(400,"all field are required");
    }

    //checking if user already exits
    const existingUserName = user.findOne({username});
    const existingEmail = user.findOne({email});

    if(existingEmail) {
        throw new ApiError(409,"email already exist");
    }
     
    if(existingUserName){
        throw new ApiError(409,"username already exists");
    }

    //acess the images using addition function such as files() given by multer
    const localpath = req?.field.avatar[0]?.path;
    console.log(localpath);

    if(!localpath){
        throw new ApiError(400,"Avatar file is required");
    }

    //uploading in cloudnary
    const avatarUrl = await upload(localpath);
    
    if(!avatarUrl){
        throw new ApiError(400,"avatar file is not uploaded");
    }

    //adding avatar url to database
    const User = await user.create({
        fullname,
        avatar: avatarUrl.url,
        email,
        password,
    })

    //removing the field from the user object coming from database 
    const createUser = await user.findById(User._id).select(
        "-password -refreshtoken"
    );

    if(!createUser){
        throw new ApiError(500,"something went wrong in user creation in data base");
    }

    return res.status(201).json(
        new ApiResponse(200,createUser,"user registered succesfully")
    )


})

export {registeruser};

