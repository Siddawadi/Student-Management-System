import express from "express"
import {deletebyid,getFeeBySemesterAndCourse,findall, updatebyid,add } from "../controllers/fee.controller.js"

const router = express.Router()
router.post("/add",add)

router.post("/getfeebysemandcourse",getFeeBySemesterAndCourse)
router.get("/findall",findall)
router.delete("/deletebyid/:id",deletebyid)
router.patch("/updatebyid/:id",updatebyid)

export default router   