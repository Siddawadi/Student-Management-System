import mongoose from "mongoose";

const feeSchema = new mongoose.Schema({
      student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Student",
        required:[true,"enter the student name "],
       
    },
    course:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Course",
      required:true
    },
    
    amount:{
        type:Number,
        required:[true,"enter the amount  "],
        min:0,
    },
     semester:{
        type:String,
        required:[true,"enter the semester  "],
        
    },
     paidDate:{
        type:Date,
        required:[true,"date should not be empty  "],
     },
      dueDate:{
        type:Date,
        required:[true," due date should not be empty  "],
     },
     status:{
        type:String,
        
        default:"due"
     }

},{timestamps:true})

const Fee = mongoose.model("Fee",feeSchema)
export default Fee