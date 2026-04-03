import multer from "multer";
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./public/temp") // temp time ke liye file upload ho jayegi 
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})

 export const upload = multer ({storage,})