import express from "express"
import { deleteuser, getProfile, login, logout, register, update,  } from "../controllers/authenticate.controller.js";
import multer from "multer";
import { uploadMiddleware } from "../middlewares/multer.middleware.js";
import { USER_ROLE } from "../config/constant.config.js";
import { getallstudents } from "../controllers/authenticate.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
const router = express.Router()
const upload = uploadMiddleware()

router.post("/register",register)// profile_image hamle banako xam model ma 

router.post("/login",login)
router.patch("/update/:id",update) 
router.delete("/delete/:id",deleteuser)
router.get("/getallstudents",getallstudents)
router.get('/profile',authenticate(USER_ROLE.USER),getProfile)
router.post("/logout",logout)
export default router
