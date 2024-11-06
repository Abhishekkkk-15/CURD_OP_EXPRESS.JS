import express, { urlencoded } from 'express';
import userRouter from './routs.js';
import connectDB from './db.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const  app = express()
const port = 8000



app.use(cors({
     origin: 'http://localhost:5173', // Adjust this to your frontend URL
     credentials: true // Allow credentials (cookies)
 }))
app.use(cookieParser())
app.use(express.json())
connectDB()
.then(()=>{
     console.log("DataBase Connected")
})
.catch(error=>{
     console.log("MongoDB connection Failed !!!",error)
})


// Routes 
app.use("/CURD",userRouter)



app.listen(port,()=>{
    console.log("server Started",port)
})

