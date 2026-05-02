import { Addstudent, findall } from "../controllers/student.controller.js";
import express from "express";
import { findbySemesterandCourse } from "../controllers/student.controller.js";
import { uploadMiddleware } from "../middlewares/multer.middleware.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { findbcabysem,findbhmbysem,findbbmbysem ,findcsitbysem,findclawbysem,deletestudent} from "../controllers/student.controller.js";
import { USER_ROLE } from "../config/constant.config.js";
const upload = uploadMiddleware()

const router = express.Router()
router.post("/addStudent",upload.single("profile_image"),Addstudent)
router.get("/findbySemesterandCourse",findbySemesterandCourse)
router.get("/findall",findall)
router.post("/findbcabysem",findbcabysem)
router.post("/findbhmbysem",findbhmbysem)
router.post("/findbbmbysem",findbbmbysem)
router.post("/findcsitbysem",findcsitbysem)
router.post("/findclawbysem",findclawbysem)
router.delete("/deletestudent/:id",deletestudent)
export default router