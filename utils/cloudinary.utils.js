import customError from "../middlewares/error.handler.middleware.js"
import fs from "fs"
import cloudinary from "../config/cloudinary.config.js"
//cloudinary ma upload vako file multer or our disk ma pani vai rakhxa ani storage ma chaidaina so 

export const c_upload = async(file,dir="/")=>{ // file linxa ra folder ko name magxa so that this can be used dynamically 
try{
    const {public_id,secure_url:path}= await cloudinary.uploader.upload(file,{ // kun file tesko path 
                folder:'/student_management/' + dir, // naya banaune folder ko name cloudinary ma 
                unique_filename:true,
            })
            if(fs.existsSync(file)){
                fs.unlinkSync(file) // tyo file hamro uploads folder ma xa vane tyo chaidaina so
                //  we are removing it
            }
            return{
                public_id,
                path
            }
    
}catch(error){
throw new customError("something went wrong",500)
}
}

export const deleteFile = async (public_id)=>{
    try{
      const {} = await cloudinary.uploader.destroy(public_id)
        return true
    }catch(error){
        throw new customError("couldn't remove data from cloudinary",500)

    }
}