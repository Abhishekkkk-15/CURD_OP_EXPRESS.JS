import { Products, User } from "./schema.js";
import { config } from 'dotenv';
import jwt from "jsonwebtoken";

// Load .env variables
config();

const getProducts =async(req,res)=>{
    const prod = await Products.find();
    if(!prod || prod.length === 0){
        return res.json({message:"Data Not Available"})
    }
   return res.json(prod)
    // console.log(await Products.find())
}

const getProduct = async (req,res)=>{
       try {
         const prod = await Products.findOne({id:req.params.id})
        //  const product = prod.find(p => p.id === parseInt(req.params.id)) //Use find istend of filter because filter will always return an empty array and empty array is not empty
         if (!prod) {
            return res.status(404).send("Product not found");  // Send a proper 404 response and return
        }
        res.status(200).send(prod)
       } catch (error) {
        return res.status(404).send(`Product with id : ${req.params.id} not available`)
       }
    
}

const createProduct = async (req, res) => {
    try {
        await Products.create({
            id:req.body.id,
            title : req.body.title,
            description :req.body.description,
            price :req.body.price,
            category:req.body.category
        })
        res.status(200).send("Product Created")
    } catch (error) {
        res.send(`Error : ${error.message}`)
    }
}

const updateProduct = async (req,res)=>{s
   try {
     const id = req.params.id
     const dataFromBody = req.body
     const updatedProduct = await Products.findOneAndUpdate({id:id},dataFromBody,{new : true});
     if(!updatedProduct){
        return res.status(404).send("Product Not Found")
     }
     res.status(200).json(updatedProduct)
   } catch (error) {
    return res.status(404).send("Can't Update",error.message)
   }
}

const replaceProduct = async (req,res)=>{
     const id = req.params.id
     const dataFromBody = req.body
    try {
         const updatedProduct = await Products.findOneAndReplace({id:id},
            dataFromBody,
            { new: true } 
        );
         if(!updatedProduct){
            return res.status(404).json({"message":"Product Not Found"})
    }
        res.status(200).send("Product Replaced")
    } catch (error) {
        return res.status(500).send(`Server Error ${error.message}`)
        // return  res.status(status).send(body)

    }
}

const deleteProduct = async (req,res)=>{
    await Products.findByIdAndDelete(req.params.id)
    res.status(200).send("Product Deleted")
}

const registerUser = async(req,res)=>{
     const { email,password,userName} = req.body
    try {
         await User.create({
            userName,
            email,
            password,
         })
        res.status(200).send("User Regitred")

    } catch (error) {
        console.log("Error while Registreing User",error)
    }
}

const loginuser = async(req,res)=>{
   
    const user = await User.findOne({"email":req.body.email})
    const userInfo = {
        username:user?.userName,
        email:user?.email,
        writePermission:user?.writePermission ? "Permium Member" : "Non-Permimum member" 
    }
    // console.log(user)
    if(!user){
     return res.json(
        {   
            error:"user not found",
        }
     )
    }

    if(req.body.password != user.password){
            return res.json(
                {
               error:"Email or password are incorrect",}
           )      
    }

    //Generating Access Token by JWT
    const accessToken = jwt.sign(
        {userId: user._id, email: user.email},
        process.env.JWT_SECRET,
        {expiresIn : "2m"}
    )

    const refreshToken = jwt.sign(
        {userId: user._id, email: user.email},
        process.env.JWT_REFRESH_SECRET,
        {expiresIn : "7d"}
    )

  
    if( user.email && user.password === req.body.password){
    return res.status(200).cookie('refreshToken',refreshToken,{
        httpOnly:true,
        secure: true,
        // maxAge: 7*24*60*60*1000,
        // sameSite:'strict'
    }).json(
        {
            accessToken,
            userInfo,
            message:"User loged in",
            writePermission : user?.writePermission   
        
        })
    }
    
   
}

export {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    replaceProduct,
    deleteProduct,
    registerUser,
    loginuser
}