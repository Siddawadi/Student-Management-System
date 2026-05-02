import express from "express"
import mongoose from "mongoose"

const courseSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxlength:[100,"course name should be less than 100 "],
        trim :true
    },
    code:{
        type:Number,
        required:true
        
    },
   Coordinator:{
    type:String,
    required:[true,"enter teacher's name "]


        
    },
    schedule :{
        type:String,
        required:[true,"schedule is empty "]
    },
 
    duration:{
        type:String,
        required:true,
        
        trim:true
    },
   

},{timestamps:true})

 export const Course = mongoose.model("Course",courseSchema)