import bcrypt from "bcryptjs"
import customError from "../middlewares/error.handler.middleware.js"

export const hashPassword =async (password)=>{
    try{
const salt = await bcrypt.genSalt(10)
const hash = await bcrypt.hash(password,salt)
return hash
    }catch(error){
        console.log(error)
        throw new Error("bcrypt error")

        }
    }

export const comparePassword =async(password,hash)=>{
    try{
    const ismatch = await bcrypt.compare(password,hash)
    return ismatch
}catch(error){
    throw new Error("bcrypt")
}

}