import { Course } from "../models/course.model.js";
import customError from "../middlewares/error.handler.middleware.js";

export const course_add = async (req,res,next)=>{
try{
    console.log("header:",req.headers)
    const {
        name,
    code,
    Coordinator,
    schedule,
    credit,
    duration } = req.body


if(!name ||! schedule ||!code ||!duration|| !Coordinator){
    throw new customError("Enter all the necessary details ",404)

}
const course = await Course.create({
    name,
    code,
   schedule,
   
    duration,
    Coordinator,
    
})
res.status(200).json({
    message:"successfully added a new course",
    status:"successful",
    data:course

})
}catch(error){
    next(error)
}
}


export const view_course =async (req, res,next)=>{
try{
const {id} = req.params
    const find_course = await Course.findById(id)
    if(!find_course){
        throw new customError("This course is not available currently",404)
    }
    res.status(200).json({
        message:"found course",
        status:"successful",
        data:find_course
    })
}catch(error){
    next(error)

}
}
export const delete_course= async (req,res,next)=>{
    try{
        const {id} = req.params
  const del_course = await Course.findByIdAndDelete(id)
        
    }catch(error){
        next(error)
    }

}



export const getall = async (req,res,next)=>{

    try{
        
 const getallcourses = await Course.find()
 if(!getallcourses){
    throw new customError("couldn't get courses",404)
 }
    res.status(200).json({
        message:"successful",
        status:"success",
        data:getallcourses
    })
    
 

    }catch(error){
        next(error)
    }
}

export const updatecourse = async (req,res,next)=>{

    try{
        const {id}=req.params
        const {name,code,Coordinator,schedule,duration}=req.body
 const find = await Course.findById(id)
 if(!find){
    throw new customError("couldn't get courses",404)
 }

 if(name){find.name=name }
 if(code){find.code=code }
 if(Coordinator){find.Coordinator=Coordinator }
 if(schedule){find.schedule=schedule }
 if(duration){find.duration=duration }
 
    await find.save()

    res.status(200).json({
        message:"successful",
        status:"success",
        data:find
    })
    
    if(c){

    }

    }catch(error){
        next(error)
    }
}

