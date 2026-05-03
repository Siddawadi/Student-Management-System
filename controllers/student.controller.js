import Student from "../models/student.model.js";
import customError from "../middlewares/error.handler.middleware.js";
import { hashPassword } from "../utils/bcrypt.utils.js";
import { c_upload } from "../utils/cloudinary.utils.js";
const dir="/student"
export const Addstudent = async (req, res, next) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      phone,
      course,
      semester,
    } = req.body

    // Validate required fields
    if (!first_name || !last_name || !email || !password || !phone || !course || !semester) {
      throw new customError('All fields are required', 400)
    }

    const hashPw = await hashPassword(password)

    // Build user data — role always defaults to "student"
    const userData = {
      first_name,
      last_name,
      email,
      password: hashPw,
      phone,
      course,      
      semester,
    
    }

    // If a profile image was uploaded, attach it before creating
    const file = req.file
    if (file) {
      const { secure_url: path, public_id } = await c_upload(file.path, dir)
      userData.profile_image = { path, public_id }
    }

    // Single save — no double save()
    const user = await Student.create(userData)

    res.status(201).json({
      message: 'Student created successfully',
      status: 'success',
      data: user,
    })
  } catch (error) {
    next(error)
  }
}



export const findall = async (req,res,next)=>{
    try{
        
        const find= await Student.find()
        if(find.length===0){
            throw new customError("couldn't find students",404)

        }
        res.status(200).json({
            message:"successfully found",
            status:"successfull",
            data:find
        })
        

        
         


    }catch(error){
        next(error)
    }
}

export const findbcabysem =async (req,res,next)=>{
    
    try{
        
        const {semester,course}=req.body
        const finduser = await Student.find({semester,course:"69ee15430d92ead10d2f0680"}).populate("course")
        
        if(finduser.length ===0){
            throw new customError("couldn't find details ",404)
        }
        console.log(finduser)

       
        
        res.status(200).json({
            message:"successfully found",
            status:"success",
            data:finduser
        })


    }catch(error){
        next(error)
    }
}
export const findbhmbysem =async (req,res,next)=>{
    
    try{
        
        const {semester,course}=req.body
        const finduser = await Student.find({semester,course:"69ee15d30d92ead10d2f0688"}).populate("course")
        if(finduser.length ===0){
            throw new customError("couldn't find details ",404)
        }
        console.log(finduser)

       
        
        res.status(200).json({
            message:"successfully found",
            status:"success",
            data:finduser
        })


    }catch(error){
        next(error)
    }
}

export const findbbmbysem =async (req,res,next)=>{
    
    try{
        
        const {semester,course}=req.body
        const finduser = await Student.find({semester,course:"69ee15730d92ead10d2f0682"}).populate("course")
        if(finduser.length ===0){
            throw new customError("couldn't find details ",404)
        }
        console.log(finduser)

       
        
        res.status(200).json({
            message:"successfully found",
            status:"success",
            data:finduser
        })


    }catch(error){
        next(error)
    }
}



export const findcsitbysem =async (req,res,next)=>{
    
    try{
        
        const {semester,course}=req.body
        const finduser = await Student.find({semester,course:"69ee158d0d92ead10d2f0684"}).populate("course")
        if(finduser.length ===0){
            throw new customError("couldn't find details ",404)
        }
        console.log(finduser)

       
        
        res.status(200).json({
            message:"successfully found",
            status:"success",
            data:finduser
        })


    }catch(error){
        next(error)
    }
}
export const updateStudent = async (req, res, next) => {
  try {
    const { id } = req.params
    const { first_name, last_name, email, phone, semester } = req.body

    const student = await Student.findById(id)
    if (!student) {
      throw new customError("Student not found", 404)
    }

    if (first_name) student.first_name = first_name
    if (last_name) student.last_name = last_name
    if (email) student.email = email
    if (phone) student.phone = phone
    if (semester) student.semester = semester

    const file = req.file
    if (file) {
      const { secure_url: path, public_id } = await c_upload(file.path, dir)
      student.profile_image = { path, public_id }
    }

    await student.save()

    res.status(200).json({
      message: "Student updated successfully",
      status: "success",
      data: student
    })
  } catch (error) {
    next(error)
  }
}
export const findclawbysem =async (req,res,next)=>{
    
    try{
        
        const {semester,course}=req.body
        const finduser = await Student.find({semester,course:"69ee1fd00d92ead10d2f0693"}).populate("course")
        if(finduser.length ===0){
            throw new customError("couldn't find details ",404)
        }
        console.log(finduser)

       
        
        res.status(200).json({
            message:"successfully found",
            status:"success",
            data:finduser
        })


    }catch(error){
        next(error)
    }
}

export const deletestudent =async (req,res,next)=>{
    try{
        const {id}= req.params
        if(!id){
            throw new customError("id not found",404)
        }

     const del = await Student.findByIdAndDelete(id)

    if(!del){
        throw new customError("student not found",404)
    }
 res.status(200).json({ message: "Student deleted successfully" ,
    status:"successfull",
    data:del
 });



    }catch(error){


    }

}

export const findbySemesterandCourse = async (req, res, next) => {
    try {
        const { semester, course } = req.query;

        if (!semester || !course) {
            throw new customError("Semester and course are required", 400);
        }

        const fees = await Student.find({ semester, course }) // ✅ course is now an ObjectId
            .populate("course", "name")                  // ✅ gets course name
                       

        if (fees.length === 0) {
            throw new customError("No fee records found", 404);
        }

        res.status(200).json({
            message: "Records fetched successfully",
            status: "success",
            data: fees,
        });

    } catch (error) {
        next(error);
    }
};
