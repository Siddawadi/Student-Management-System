import express from "express"
import { USER_ROLE } from "../config/constant.config.js"
import { authenticate } from "../middlewares/auth.middleware.js"

const router = express.Router()

import { Add, getByDate,DeleteOne,DeleteAll, getByStudent, getById, FindAttendance } from "../controllers/attendance.controller.js"

router.post("/add", Add)
router.get("/getbydate", getByDate)
router.get("/find", FindAttendance)     
router.get("/id/:id", getById)
router.get("/student/:id", getByStudent)
router.delete("/delete/:id", DeleteOne)      
router.delete("/deleteall", DeleteAll) 

export default router