import express, { urlencoded } from 'express';
import userRouter from './routs.js';
import connectDB from './db.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';

config();

const  app = express()

app.use(cors({
     origin: ['https://funecommerce.vercel.app','http://localhost:5173'], // Adjust this to your frontend URL
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



app.listen(process.env.PORT || 8000,()=>{
    console.log("server Started",process.env.PORT)
})

