import {v2 as fileUpload} from "cloudinary"
import fs from 'fs'


fileUpload.config({

  cloud_name:process.env.CLOUDNARY_NAME,
  api_key:process.env.CLOUDNARY_APIKEY,
  api_secret:process.env.CLOUDNARY_API_SECREATE

});

const uploadFileInCloudnary = async (localPath) =>{
    try{

        if(!localPath) return null;

        const response = await fileUpload.uploader.upload(localPath,{
            resource_type: auto,
        });

        console.log("file is uploaded in cloudnary",response.url);

        fs.unlink(localPath);

        return response;

    }catch(error){
             
        fs.unlinkSync(localPath);//remove file from the local path in case of error

        return null;
    }
}

export default uploadFileInCloudnary;
