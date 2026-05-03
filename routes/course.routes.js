import { course_add, delete_course, view_course,updatecourse } from "../controllers/course.controller.js";
import express from "express"
import { authenticate } from "../middlewares/auth.middleware.js";
import { USER_ROLE } from "../config/constant.config.js";
import { getall } from "../controllers/course.controller.js";
const router = express.Router()
router.post("/add",authenticate(USER_ROLE.ADMIN),course_add) // THIS IS ARRAY BECAUSE WE CAN PASS MULTIPLE ROLES
//                          if yeta bata authenticate vayesi balla post garna pauxa 
router.get("/getall",getall)
router.get("/view/:id",view_course)
router.delete("/delete/:id",authenticate(USER_ROLE.ADMIN),delete_course)
router.put("/updatecourse/:id",authenticate(USER_ROLE.ADMIN),updatecourse)

export default router
