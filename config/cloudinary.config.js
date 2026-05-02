import {v2 as cloudinary} from "cloudinary"
import { configDotenv } from "dotenv"
import { cloudinaryConfig } from "./config.js"
cloudinary.config({
    cloud_name:cloudinaryConfig.CLOUD_NAME,
    api_key:cloudinaryConfig.API_KEY,
    api_secret:cloudinaryConfig.API_SECRET
})


export default cloudinary