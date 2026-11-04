import multer from "multer"

const storage = multer.diskStorage({
    destination : function(_,file,cb){
        cb(null,"./public/temp");

        console.log("the file is uploaded by the multer",file);
    },

    filename: function(_,file,cb){
        cb(null,file.originalname);
    }
})

export const upload = multer({
    storage
})
