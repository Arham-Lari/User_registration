import { Router } from "express";
import {loginUser, logOut, registeruser} from "../controllers/user.controller.js"
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/Auth.middleware.js";

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
router.route("/login").post(loginUser);
router.route("/logOut").post(verifyJWT,logOut);

export default router;
