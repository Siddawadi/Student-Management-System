import customError from "./error.handler.middleware.js"
import { decode_token } from "../utils/jwt.utils.js"
import User from "../models/user.model.js"
export const authenticate=(roles)=>{

    return async (req,res,next )=>{
       try { //1st ma cookie xa ki xaina 
        console.log("header of authenticate ",req['headers'])
        const cookies = req.cookies || {} //xaina vane empty object 
        console.log(cookies)
        const token = cookies['access_token'] // cookies bhitra access token nam le aauxa ni tei ho 
// if token xaina vane 
        if(!token ){
            throw new customError("Unauthorized . Access denied",401)
        }
        
       const decoded_data = decode_token(token) // if hamle pathako token tyo function le decode vayera  verify hunxa  
       console.log("decoded data ",decoded_data)
      if(!decoded_data ){
            throw new customError("Unauthorized . Access denied",401)
        }
        //to check if token has expired or not
        if(decoded_data.exp *1000< Date.now()) {//date.now chai miliseconds ma hunxa nai hamro decofed.data ko exp seconds
        //                                           ma so we multiply miliseconds by 1000
            
            res.clearCookie('access_token',{ // cookie set garda ko same code 

                
        httpOnly:true, // http request le matrai access garna paune ani user side ko js program cant access

       sameSite:'lax',// if this is none then secure must be true if this is lax then secure must be false 

    //    when we debug tyo belama cokkie herna parxa but when it is in production then users cannot acces cookie so 

        secure:process.env.NODE_ENV ==="development"?false :true ,
        maxAge: process.env.COOKIE_MAX_AGE*24*60*60*1000 // 7 days
            })
            throw new customError("session has expired ",401)
        }
      //to check if user exists or not ,na vako user le add garna try garirako xa or paila vako user ko id bata 
      const user = await User.findOne({_id:decoded_data._id,email:decoded_data.email})
      if(!user){
        throw new customError("Unauthorized . Access denied",401)
      }
      if(roles && Array.isArray(roles) && roles.length>0 && !roles.includes(user.role)){
        //roles xa and array ho and roles ko length xa ani tesma tyo user.role xa ki nai vanera check gareko 
        throw new customError("Forbidden access denied",403)
      }
    console.log(decoded_data)
    // downstream routes ma logged in user ko info access garna set gareko
    req.user = user
    next ()
    }catch(error){
            next(error)
        }


    }
}