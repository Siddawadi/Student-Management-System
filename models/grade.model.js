import mongoose, { model } from "mongoose";
const gradeSchema = new mongoose.Schema({
      student_first_name:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Student",
        required:[true,"enter the student name "],
       
    },
    student_last_name:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Student",
        required:[true,"enter the student name "],
       
    }, course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
        required:[true,"course is empty "],
    },
    marks:{
        type:Number,
        require:[true,"marks should not be empty "]
    },
    grade:{
        type:String,
         require:[true,"grade should not be empty "]
    }
})