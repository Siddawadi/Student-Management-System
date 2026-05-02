import mongoose from "mongoose";
import { USER_ROLE } from "../config/constant.config.js";

const StudentSchem = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      maxlength: [50, "Name should be less than 50 characters"],
      trim: true
    },
    semester:{
      type:String,
      required:[true,"Please provide semester"],
      trim:true
      
    },
    course:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Course",
      required:true,
      trim:true

    },

    last_name: {
      type: String,
      required: true,
      maxlength: [50, "Name should be less than 50 characters"],
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: [100, "Email should be no more than 100 characters"]
    },

    password: {
      type: String,
      required: true,
      minlength: [6, "Password should be at least 6 characters"]
    },
    phone: {
      type: String,
      required: true,
      trim:true
      
    },

    role: {
      type: String,
      
      enum: Object.values(USER_ROLE) ,// user roles object ho ani teslai array banauna lai 
      default:USER_ROLE.USER
    },

    
    profile_image:{
      type:{
        path:String,
        public_id:String
      }
    }
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", StudentSchem);
export default Student;
