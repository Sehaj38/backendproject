//require('dotenv').config({path: '/.env'})
import dotenv from "dotenv"
import connectDB from "./db/index.js";
import { app } from "./app.js"
dotenv.config({
    path: './.env'
})

connectDB()
.then(()=>{
    try{
        app.on("error", (error)=>{
            console.log('Error: ', error);
            throw error
        })
        app.listen(process.env.PORT || 8000, ()=>{
            console.log(`Server is running at : ${process.env.PORT}`);
        })
    }
    catch(error){
        console.error("Error: ", error);
        throw error
    }
})
.catch((err)=>{
    console.log("MONGODB connection failed!", err);
})















/*
import express from "express";
const app = express()

( async() => {
    try {
        mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error",()=>{
            console.log("ERROR: ", error);
            throw error
        })

        app.listen(process.env.PORT, ()=>{
            console.log(`App is listening on PORT ${process.env.PORT}`);
        })

    } catch (error) {
        console.error("ERROR: ", error)
        throw error
    }
})()
*/