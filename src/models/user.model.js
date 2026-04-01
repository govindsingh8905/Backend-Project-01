import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

import dotenv from "dotenv"
 dotenv.config({})

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },   
    fullname:{
        type:String,
        required:true,
        trim:true,
        index:true
    },avatar:{
        type:String, // cloudinary service url use krenge 
        required:true,
    },
    coverimage:{
        type:String,// cloudinary service url

    },
    watchHistory:[
        {
            type:Schema.Types.ObjectId,
            ref:"video"
        }
    ],password:{
        type:String,
        required:[true,"passowrd is required"]
    },
    refreshToken:{
        type:String
    }
},{
    timestamps:true
}


)
userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();


    this.password = bcrypt.hash(this.password,10)
    next()
    
})

userSchema.method.isPasswordCorrect = async function (password){
     return await bcrypt.compare(password,this.password)
     // pass truth and false value 
}

userSchema.methods.generateAccessToken= function(){

    return jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.username,
        fullName:this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
    )
}
userSchema.methods.generateRefreshToken= function(){
        return jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.username,
        fullName:this.fullName
    },
    process.env.REFRESH_TOKEN_SCERET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
    )
}
export const User = mongoose.model("User",userSchema)