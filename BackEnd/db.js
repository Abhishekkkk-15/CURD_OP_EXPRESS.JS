import mongoose from 'mongoose';
const db = "mongodb+srv://mrabhi748:abhi2193@pratice.sokpe.mongodb.net/?retryWrites=true&w=majority&appName=pratice";
const connectDB = async () =>{
    try {
        const connectionInstance =  await mongoose.connect(db)
        console.log("DataBase connected")
    } catch (error) {
        console.log(`DataBase Error : ${error}`)
    }
}
export default connectDB