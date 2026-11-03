import { ApiResponse } from "../utils/Apiresponse.js";
import { ApiError } from "../utils/ApiError.js";
import {AsyncHandler} from "../utils/AsyncHandler.js"
import {user} from "../models/user.model.js"
import upload from "../utils/fileUpload.js"

//funtion to generate the acess token and refresh token by getting the id 
const generateAcessTokenAndRefreshToken = async (userId) =>{
    try{

        const User = await user.findById(userId);

        const acessToken = User.generateAccessToken();
        const refreshtoken = User.generateRefreshToken();

        //adding the value of refresh token to our user
        User.refresh_token = refreshtoken;
        //if we not do validate before save false then all other field will become empty
        User.save({validateBeforeSave : false});

        return {acessToken,refreshtoken}


    
    }catch(error){

        throw new ApiError(500,"something went wrong")

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

    //acess the images using addition function such as field() given by multer
    const localpath = req?.field.avatar[0]?.path;

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

    //checking if the user created succesfully
    if(!createUser){
        throw new ApiError(500,"something went wrong in user creation in data base");
    }

    //returning the response
    return res.status(201).json(
        new ApiResponse(200,createUser,"user registered succesfully")
    )


})


const loginUser = AsyncHandler(async () =>{

    //taking the username and password form the user
    const {username,password} = req.body;

    //checking if the user have field all the field or not
    if([username,password].some(field => 
        field?.trim() === ""
    )){
        throw new ApiError(400,"username and password both are requird");
    }

    //finding the user with the same username in data base
    const usernameExits = await user.findOne({username});

    if(!usernameExits){
        throw new ApiError(404,"user not found");
    }


    //checking the password
    const passwordValid = await usernameExits.isPasswordCorrect(password);

    if(!passwordValid) throw new ApiError (401,"password is wrong");

    //taking the genrated acess token and refresh token
    const {acess,refresh} = await generateAcessTokenAndRefreshToken(usernameExits._id);

    //send access token and refresh token through cookie

    usernameExits.refresh_token = refresh;
    usernameExits.save();

    const loggedInUser = await user.findById(usernameExits._id).select("-password -refresh_token");

    //genrating cookie options
    const options = {
        //it enables the cookie to be only modifiabel at the backend
        httpOnly : true,
        secure : true,
    }

    return res.status(200)
        .cookie("acccesToken", acess, options)
        .cookie("refresh_token",refresh ,options)
        .json(
            new ApiResponse(
                200,
                {
                    usernameExits : loggedInUser ,acess,refresh
                },
                "user log in success fully"
            )
        )

})

export {registeruser, loginUser};

