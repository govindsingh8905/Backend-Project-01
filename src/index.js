import mongoose from "mongoose";
import {DB_NAME} from "../src/constants.js"
import express from "express"
const app = express()
import connectDB from "../src/db/index.js"


import dotenv from "dotenv"
 dotenv.config({})
connectDB()
.then(()=>{

    // Maan loo database connect hua but express me issue h toh ye error throw krega 
    app.on("error",(error)=>{
            console.log("ERRR:",error);
            throw error
        })

    app.listen(process.env.PORT,()=>{
        console.log(`server is running on port ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("MONGODBCONNECTION FAILED !!! ",err)
});














/*
(async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

        app.on("error",(error)=>{
            console.log("ERRR:",error);
            throw error
        })

        app.listen(process.env.PORT,()=>{
            console.log (`app is listening on port ${process.env.PORT}`)
        })
    } catch (error) {
        console.error("ERROR: ",error)
        throw error
        
    }
})() 
    */