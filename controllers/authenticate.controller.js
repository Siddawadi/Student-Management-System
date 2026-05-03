import cloudinary from "../config/cloudinary.config.js";
import customError from "../middlewares/error.handler.middleware.js";
import User from "../models/user.model.js";
import { comparePassword, hashPassword } from "../utils/bcrypt.utils.js";
import { c_upload, deleteFile } from "../utils/cloudinary.utils.js";
import { generateToken } from "../utils/jwt.utils.js";
const dir = "/user"
export const register = async (req,res,next)=>{
  try{
    const file= req.file;
    console.log(file)
    const { first_name,
        last_name,
        email,
        password,
        phone  } = req.body
   
console.log(req.body)
      if (!first_name || !last_name || !email || !password) {
      throw new customError("All fields are required", 400);
      }
      const hashPw = await hashPassword(password)

       const user = await User.create({
    first_name,
        last_name,
        email,
        password:hashPw,
        phone,
     
       
        
    })
    if(file){
        const {path,public_id}=await c_upload(file.path,dir)
        user.profile_image={
            path:path, // cloudinary bata tyo const {public_id,secure_url:path} yo 2 ta aauxa ani yeta rakhdine 
            public_id:public_id
        }
        console.log(user.profile_image)
    }
    await user.save()
    res.status(201).json({
        message:"successfully created",
        status:"success",
        data:user
    })

   }catch(error){
    next(error)
   }
}



export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      throw new customError("All fields are required", 400)
    }

    const finduser = await User.findOne({ email })
    if (!finduser) {
      throw new customError("Couldn't find the user", 404)
    }

    const ismatch = await comparePassword(password, finduser.password)
    if (!ismatch) {
      throw new customError("Couldn't find the user", 400)
    }

    const payload = {
      _id: finduser._id,
      role: finduser.role,
      email: finduser.email,
      first_name: finduser.first_name,
      last_name: finduser.last_name,
    }

    const access_token = generateToken(payload)

    res.status(200)
      .cookie('access_token', access_token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV !== 'development',
        maxAge: Number(process.env.COOKIE_MAX_AGE) * 24 * 60 * 60 * 1000,
      })
      .json({
        message: 'Login successful',
        status: 'success',
        data: finduser,
        access_token
      })

  } catch (error) {
    next(error)
  }
}
export const update =async (req,res,next)=>{
try{
    const{id}=req.params
    const {email,first_name,last_name,password,phone} = req.body
    
    const updateuser = await User.findById(id)
    if(!updateuser){
        throw new customError("no user found ",404)
    }
    if(phone!=null){
        updateuser.phone=phone
    }
    if(email!=null){
        updateuser.email=email
    }
    if(first_name!=null){
        updateuser.first_name=first_name
    }
    if(last_name!=null){
        updateuser.last=last_name
    }
    await updateuser.save()
    res.status(200).json({
        message:"succssfuly updated user",
        status:"successful",
        data:updateuser
    })
        
    }
catch(error){
    next(error)
}
}

export const deleteuser = async (req,res,next)=>{
try{
    const {id} = req.params
    
    // yeta bata user remove hunxa tara cloudinary ma tyo remove hudaina 
    //so 1st we remove that user's data from cloudinary
    const removeuser = await User.findById(id)
    if(!removeuser){
        throw new customError("couldn't find the user",404)
    
    }
    console.log(removeuser)
    if(removeuser.profile_image){
        console.log(removeuser.profile_image.path)
        await deleteFile(removeuser.profile_image.public_id)
        
    }

    await removeuser.deleteOne()
res.status(200).json({
    message:"successfuly deleted user",
        status:"successful",
        data:removeuser
})
    
}catch(error){
    next(error)
}
}
    
export const getall =async(req,res,next)=>{
    try{
        const All = await User.find()
        if(!All.length){
            throw new customError("couldn't find student",404)
        }
        res.status(200).json({
            message:"successfully found",
            status:"success",
            data:All
        })
    }catch(error){
        next(error)
    }

}
export const getProfile = async (req, res, next) => {
  try {
    const userId = req.user._id  // ✅ fixed typo
    const user = await User.findById(userId)  // ✅ using userId

    res.status(200).json({
      message: 'Profile fetched',
      data: user,
      status: 'success',
    })
  } catch (error) {
    next(error)
  }
}

export const logout = async (req, res, next) => {
  try {
    res.clearCookie('access_token', {  // ✅ only pass name + options, no value
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV !== 'development',
    })

    res.status(200).json({
      message: 'Logout successful',
      data: null,
      status: 'success',
    })
  } catch (error) {
    next(error)
  }
}