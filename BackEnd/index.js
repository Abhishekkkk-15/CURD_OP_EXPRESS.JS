import express from 'express';
import userRouter from './routs.js';
import connectDB from './db.js';
import cors from 'cors';
const  app = express()
const port = 8000

app.use(cors())
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

