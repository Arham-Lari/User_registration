import { Router } from "express";
import {registeruser} from "../controllers/user.controller.js"

const router = Router();

router.route("/registration").post(registeruser);

export default router;
