import {AsyncHandler} from "../utils/AsyncHandler.js"


const registeruser = AsyncHandler(async (req,res)=>{

    res.status(200).json({
        message : "ok",
    })
})

