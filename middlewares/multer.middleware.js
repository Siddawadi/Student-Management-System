import multer from "multer"
import fs from "fs"
export const uploadMiddleware = ()=>{
    const folder="uploads/"
    if (!fs.existsSync(folder)){ // the disk storage doesnt automatically creates folder so 
        // this is used to check whether the folder exists or not 
        fs.mkdirSync(folder)

    }
const myStorage = multer.diskStorage({
    destination:(req,file,cb)=>{ // callback or cb function always takes error first 
        cb(null,folder)

    },
    filename:(req,file,cb)=>{
        const fileName =Date.now()+'-'+file.originalname
        cb(null,fileName)
    }
})
const upload = multer({storage:myStorage})
return upload
}