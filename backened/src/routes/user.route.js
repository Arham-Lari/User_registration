import { Router } from "express";
import {registeruser} from "../controllers/user.controller.js"
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/registration").post(
    upload.fields([
        {
            name : "avatar",
            maxCount : 1,
        } 
    ]),
    registeruser
);

export default router;
