import dotenv from "dotenv";
dotenv.config()

export const config={
    PORT:process.env.PORT,
    dbName:process.env.DB_NAME,
    db_uri:process.env.DB_URI

}

export const cloudinaryConfig ={
    CLOUD_NAME:process.env.CLOUD_NAME,
    API_KEY:process.env.CLOUDINARY_API_KEY,
    API_SECRET:process.env.CLOUDINARY_API_SECRET
}

export const Jwt_config ={
    secret : process.env.JWT_SECRET,
    expires_in : process.env.JWT_EXPIRES_IN
}



