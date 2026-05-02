import { config } from "./config.js";
import mongoose from "mongoose";
export const db_config =()=>{


mongoose.connect(
    config.db_uri,{
        dbName:config.dbName,
        autoCreate:true,
    }
).then(()=>{
    console.log("server is up and running ")}
).catch((error)=>{
    console.log(error)
    console.log("couldnt connect to database")
})
}
