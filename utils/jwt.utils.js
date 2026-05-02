import jwt from "jsonwebtoken"
import { Jwt_config } from "../config/config.js"
import customError from "../middlewares/error.handler.middleware.js"
export const generateToken = (payload)=>{
try{
    const token = jwt.sign(payload,Jwt_config.secret,{expiresIn:Jwt_config.expires_in})
    return token

}catch(error){

}
}
export const decode_token=(token)=>{
    try{
        const data = jwt.verify(token,Jwt_config.secret)
        return data
    }catch(error){
        console.log(error)
    }
}