import { Cart, Products, User } from "./schema.js";
import { config } from 'dotenv';
import jwt from "jsonwebtoken";
import multer from "multer";
import { uploadOnCloudinary } from "./cloudinary.js";
import nodemailer from "nodemailer"
import { text } from "express";

// Load .env variables
config();

const getProducts = async (req, res) => {
    const prod = await Products.find();
    if (!prod || prod.length === 0) {
        return res.json({ message: "Data Not Available" })
    }
    return res.json(prod)
}

const getProduct = async (req, res) => {
    try {
        const prod = await Products.findOne({ id: req.params.id })
        //  const product = prod.find(p => p.id === parseInt(req.params.id)) //Use find istend of filter because filter will always return an empty array and empty array is not empty
        if (!prod) {
            return res.status(404).json({ message: "Product not found" }); 
        }
        res.status(200).send(prod)
    } catch (error) {
        return res.status(404).json({ message: `Product with id : ${req.params.id} not available` })
    }

}

const createProduct = async (req, res) => {
    const thumbnaillocalPath = req.file?.path

    if (!thumbnaillocalPath) {
        return res.status(200).json({ message: "Thumbnail is required!" })
    }
    console.log(req.user.userName)
    try {
        console.log(req.body.title,req.body.description,req.body.price,req.body.category)
        const thumbnail = await uploadOnCloudinary(thumbnaillocalPath)
        await Products.create({
            sellerName: req.user.userName,
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            thumbnail,
        })
        res.status(200).json({ message: "Product Created" })
    } catch (error) {
        res.json({ message: `Error : ${error.message}`})
    }
}

const updateProduct = async (req, res) => {
    try {
        const id = req.params.id
        const dataFromBody = req.body
        const updatedProduct = await Products.findOneAndUpdate({ id: id }, dataFromBody, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product Not Found" })
        }
        res.status(200).json(updatedProduct)
    } catch (error) {
        return res.status(404).json({ message:  `Can't Update, error.message`})
    }
}

const replaceProduct = async (req, res) => {
    const id = req.params.id
    const dataFromBody = req.body
    try {
        const updatedProduct = await Products.findOneAndReplace({ id: id },
            dataFromBody,
            { new: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product Not Found" })
        }
        res.status(200).send("Product Replaced")
    } catch (error) {
        return res.status(500).json({ message:  `Server Error ${error.message}`})
    }
}

const deleteProduct = async (req, res) => {
    const productID = req.params.id;

    if (!productID) {
        return res.status(400).json({ message:  "Product not found or invalid Product ID provided"})
    }

    try {
        const findProd = await Products.findById(productID);

        if (!findProd) {
            return res.status(404).json({ message:  "Product not found with this ID"})
        }

        await Products.findByIdAndDelete(productID);

        return res.status(200).send("Product Deleted");
    } catch (error) {
        console.error("Error deleting product:", error);
        return res.status(500).json({ message:  "An error occurred while deleting the product"})
    }
};


const registerUser = async (req, res) => {
    const { email, password, userName } = req.body;
    const existedUser = await User.findOne({
        $or: [{ userName }, { email }]    // $or is mongodb query which check if even one condition is true
    })

    if (existedUser) {
        return res.status(200).json({ message:  "User and Email Already Exists!!"})
    }

    const avatarLocalPath = req.file?.path;

    if (!avatarLocalPath) {
        return res.status(200).json({ message:  "Avatar is Required"})
    }

    try {
        const avatar = await uploadOnCloudinary(avatarLocalPath)
        await User.create({
            avatar,
            userName,
            email,
            password,
        })
        res.status(200).json({ message:  "User Regitred"})
    } catch (error) {
        console.log("Error while Registreing User", error)
        res.status(505).json({ message:  "Server Error 505"})
    }
}

const loginuser = async (req, res) => {

    try {
        const userIdentity = req.body.email;
        const user = await User.findOne({ $or: [{ userName:userIdentity }, { email:userIdentity }] })
        const userInfo = {
            userName: user?.userName,
            email: user?.email,
            writePermission: user?.writePermission,
            avatar: user?.avatar,
            isAdmin: user?.isAdmin
        }
    
        if (!user) {
            return res.json(
                {
                    error: "user not found",
                }
            )
        }
    
        if (req.body.password != user.password) {
            return res.json(
                {
                    error: "Email or password are incorrect",
                }
            )
        }
    
        const accessToken = jwt.sign(
            {
                userName:user.userName,
                userId: user._id,
                email: user.email,
                writePermission: user.writePermission,
                isAdmin: user.isAdmin,
                avatar: user.avatar,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        )
    
        const refreshToken = jwt.sign(
            {
                userName:user.userName,
                userId: user._id,
                email: user.email,
                writePermission: user.writePermission,
                isAdmin: user.isAdmin,
                avatar: user.avatar,
            }, 
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: "7d" }
        )
    
        if (user.email && user.password === req.body.password) {
            return res.status(200).cookie('accessToken', accessToken, {
                httpOnly: true, //this is important if you don't want frontend to access cookies in javascript
                secure: process.env.NODE_ENV === 'production', //The secure flag ensures that the cookie is only sent over HTTPS connections.
                maxAge: 3600000,
                sameSite: 'None', // (lax) If is to sent cookies even after refreshing the page in development(//localhost)
                // (None) this is for deployment (https) requests
            }).json(
                {
                    accessToken,
                    userInfo,
                    message: "User loged in",
                    writePermission: user?.writePermission
                })
        }
    } catch (error) {
        return res.json(
            {
                error: `Server Error ${error}`,
            }
        )
    }

}

const logOut = (req, res) => {
    try {
        // Clear the cookie named "accessToken"
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Only use secure cookies in production
            sameSite: 'None', // Needed for cross-site cookies
        });

        // Send a response indicating the user is logged out    
        return res.status(200).json({ message: "User logged out" });
    } catch (error) {
        console.error("Error logging out:", error);
        res.status(505).json({ message: "Error logging out" });
    }
};

const getUserInfo = (req, res) => {
    try {
        const userInfo = req.user;
        if (!userInfo) return null;
        res.status(200).json({
            userInfo
        })
    } catch (error) {
        res.status(505).json({ message: "Error logging out" });
    }
}

const addToCart = async (req, res) => {
    const userId = req.user.userId;
    const { productId, quantity } = req.body;

    try {
        // checking if product exists
        const product = await Products.findById(productId); // use await here to get the actual product data
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // check if the cart exists for the user
        let cart = await Cart.findOne({ userId });

        // if cart does not exist, create a new cart with the product
        if (!cart) {
            cart = new Cart({
                userId,
                products: [{ productId, quantity }],
            });
            await cart.save();
            return res.status(201).json(cart); // Return the created cart
        }

        // if the cart exists, check if the product is already in the cart
        const productIndex = cart.products.findIndex(
            (item) => item.productId.toString() === productId.toString() // Ensure correct comparison
        );

        if (productIndex >= 0) {
            // If the product exists, update the quantity
            cart.products[productIndex].quantity += quantity;
        } else {
            // If the product doesn't exist, add a new product to the cart
            cart.products.push({ productId, quantity });
        }

        // Save the updated cart
        await cart.save();
        return res.status(200).json(cart); // Return the updated cart
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error", error });
    }
};

const showCart = async (req, res) => {
    const userId = req.user.userId; // Assuming user ID is set in req.user after authentication

    try {
        // Find the cart associated with the user and populate product details
        const cart = await Cart.findOne({ userId }).populate({
            path: 'products.productId',
            select: 'title price thumbnail' // Select only necessary fields for product
        });

        // If no cart is found for the user, return an empty cart
        if (!cart) {
            return res.status(200).json({ userId, products: [] });
        }

        // Return the cart with populated product information
        res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};

const removeFromCart = async(req,res) =>{
    const userId = req.user.userId;
    const {productId} = req.body

    try {
        const cart = await Cart.findOne({userId})
     
        if(!cart){
            return res.status(404).json({message:"Cart not found"})
        }

        cart.products = cart.products.filter(item => item.productId.toString() !== productId)

        await cart.save()
        return res.status(200).json({message:"item removed from cart",cart})
    } catch (error) {
        console.log("Error while Removing item from cart",error)
        return res.status(505).json({message:"Server error",error})
    }
}

const sendMailForProductAddPermission = async (req,res) =>{

    const {userName, email} = req.user;
    const message = req.body.message;
    let transporter = nodemailer.createTransport({
        service:"Gmail", 
        auth:{
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: email,
        to: "jangidabhishek276@gmail.com",
        subject: "Fun E-commerce Permission Request",
        text:`Name : ${userName}\nEmail:${email}\n${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message:  "Mail Sent!"})
    } catch (error) {
        console.log(error)
        res.status(505).json({ message:  "Server Error 505"})
    }
}

const getAllUser = async (req,res) =>{

    try {
        const userCount = await User.countDocuments();
        const productCount = await Products.countDocuments();
        const user = await User.find().select("-password -userCart")
        if(!user){
            res.status(404).json({message:"User not found"});
        }
       return res.status(200).json({ userCount, productCount, user})
    } catch (error) {
        console.log("Error while fetching all users")
        return res.status(505).json({message:`error will get user ${error}`})
    }
}

const getUser = async(req,res)=>{
    try {
        const userValue = req.body.userValue
        const userByEmail = await User.findOne({email : userValue}).select("-password -userCart")
        const userByUserName = await User.findOne({userName : userValue}).select("-password -userCart")
        if(userByEmail){
           return res.status(200).send(userByEmail)
        }

        if(userByUserName){
            return res.status(200).send(userByUserName)
         }

         return res.status(404).json({message:"User not found"})

    } catch (error) {
        return res.status(505).json({message:`error while fetching user \n Erro :${error}`})
    }
}

const grantPermission = async (req,res) =>{
    try {
        const userId = req.body.id
        const user = await User.findOne({_id:userId})
    
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
    
        user.writePermission = !user.writePermission
        await user.save()
        return res.status(200).json({message:"Permission changes"})
    } catch (error) {
        console.log("Error while granting permission to user",error)
        return res.status(505).json({message:`Error while granting permission to user \n ${error}`})
    }
}

const deleteUser = async (req, res) => {
    const { id: userId } = req.body;

    console.log("Received userId:", userId);

    try {
        const findUser = await User.findById(userId);

        if (!findUser) {
            return res.status(404).json({ message: "User not found with this ID" });
        }

        await User.findByIdAndDelete(userId);

        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ message: "Error while deleting user" });
    }
};


export {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    replaceProduct,
    deleteProduct,
    registerUser,
    loginuser,
    addToCart,
    showCart,
    getUserInfo,
    logOut,
    sendMailForProductAddPermission,
    removeFromCart,
    getAllUser,
    getUser,
    grantPermission,    
    deleteUser
}