import { ApiResponse } from "../utils/Apiresponse.js";
import { ApiError } from "../utils/ApiError.js";
import {AsyncHandler} from "../utils/AsyncHandler.js"
import {user} from "../models/user.model.js"
import upload from "../utils/fileUpload.js"

const AcessAndRefreshTokenGenrator = async (userid) =>{

    try {
        const User = user.findById(userid);

        const accessToken = User.generateAccessToken();
        const refreshToken = User.generateRefreshToken();

        User.refresh_token = refreshToken;
        User.save({validateBeforeSave : false});

        return {accessToken,refreshToken};
    }catch(error){
        throw new ApiError(500,"something went wrong");
    }
}


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
    const existingUserName = await user.findOne({username});
    const existingEmail = await user.findOne({email});

    if(existingEmail) {
        throw new ApiError(409,"email already exist");
    }
     
    if(existingUserName){
        throw new ApiError(409,"username already exists");
    }

    //acess the images using addition function such as files() given by multer
    const localpath = req?.files.avatar[0].path;

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

const loginUser = AsyncHandler(async(req,res)=>{
    
    const {username,password} = req.body;

    if([username,password].some(field => field?.trim === "")){
        throw new ApiError(400,"username and password both are required")
    }

    const User = user.findOne(username);

    if(!User) throw new ApiError(404,"Usern not found");

    const vlidatePassword = await User.isPasswordCorrect(password); 

    if(!vlidatePassword) throw new ApiError(401,"password is wrong");

    const{access,refresh} = AcessAndRefreshTokenGenrator(User._id);

    User.refresh_token = refresh;
    User.save();

    const loggedInUser = user.findById(User._id).select("-password -refresh_token");

    const options = {
        httpOnly : true,
        secure : true,
    };

    return res.status(200)
              .cookie("accesToken",access,options)
              .cookie("refresh_token",refresh,options)
              .json(new ApiResponse(200,{loggedInUser,access,refresh},"user login successfully"));

})

const logOut = AsyncHandler(async(req,res)=>{

    user.findOneAndUpdate(
        req?.User._id,
        {
            $set: {
                refresh_token : undefined
            }
        },
        {
            new : true,
        }
    )

    const options = {
        httpOnly : true,
        secure : true,
    };

    return res.status(200)
              .clearCookie("accessToken",options)
              .clearCookie("refresh_token",options)
              .json(new ApiResponse(200,{},"user logged out"));

})

export {registeruser,loginUser,logOut};

