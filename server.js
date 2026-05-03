import express from "express"

import cors from "cors"
import dotenv from "dotenv"
if(process.env.NODE_ENV !== "production") {
  dotenv.config({ path: '.env' })
}
import courseRoutes from "./routes/course.routes.js"
import { errorHandler } from "./middlewares/error.handler.middleware.js"
import customError from "./middlewares/error.handler.middleware.js"
import authRoutes from "./routes/user.routes.js"
import attRoutes from "./routes/attendance.routes.js"
import feeRoutes from "./routes/fee.routes.js"
import studetnROutes from "./routes/student.routes.js"
import { db_config } from "./config/dbconfig.js"
import cookieParser from "cookie-parser"
import dashRoutes from "./routes/dashboard.routes.js"

db_config()

const app = express()
const port = process.env.PORT 
// app.js
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://student-management-system-front-end-6ahk.onrender.com"
  ],
  credentials: true
}))
app.use(cookieParser())
app.use(express.json({}))
app.use(express.urlencoded({extended:true}))
app.use("/api/uploads",express.static('uploads/')) // yo folder ma aako sabai content lai static banauxa



app.get("/",(req,res)=>{
    res.status(200).json({
        message:"server is up and running ",
        status:"successful"
        
    })
 

})
app.use("/user",authRoutes)
app.use("/course",courseRoutes)

app.use("/attendance",attRoutes)
app.use("/fee",feeRoutes)
app.use("/student",studetnROutes)
app.use('/dashboard',dashRoutes)
app.use((req,res,next)=>{
const message =`could not ${req.method} on ${req.originalUrl}`
const error = new customError(message,400)
next(error)

})
app.use(errorHandler)


app.listen(port,()=>{
    console.log(`server is running at http://localhost:${port}`)


})