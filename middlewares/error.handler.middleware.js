class customError extends Error{
    constructor(message,statusCode){
        super(message)
        const status = `$statusCode`.startsWith("4")?"fail":"error"
        this.isOperational= true
        Error.captureStackTrace(this,customError)
    }
}

export const errorHandler =(error,req,res,next)=>{

    const message =error?.message || "Could not connect "
    const status= error?.status || "failed "
   const statusCode = error?.statusCode || 404
     res.status(statusCode).json({
        message,
        status,
        statusCode,
        success:false,
        data:null
     })
}
export default customError