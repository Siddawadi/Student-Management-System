import express from "express"
import { USER_ROLE } from "../config/constant.config.js"
import { authenticate } from "../middlewares/auth.middleware.js"

const router = express.Router()

import { Add, getByDate,DeleteOne,DeleteAll, getByStudent, getById, FindAttendance } from "../controllers/attendance.controller.js"

router.post("/add",authenticate(USER_ROLE.ADMIN), Add)
router.get("/getbydate",authenticate(USER_ROLE.ADMIN), getByDate)
router.get("/find", FindAttendance)     
router.get("/id/:id",authenticate(USER_ROLE.ADMIN), getById)
router.get("/student/:id",authenticate(USER_ROLE.ADMIN), getByStudent)
router.delete("/delete/:id",authenticate(USER_ROLE.ADMIN), DeleteOne)      
router.delete("/deleteall",authenticate(USER_ROLE.ADMIN), DeleteAll) 

export default router