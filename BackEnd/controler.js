import { Products, User } from "./schema.js";
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
            return res.status(404).send("Product not found");  // Send a proper 404 response and return
        }
        res.status(200).send(prod)
    } catch (error) {
        return res.status(404).send(`Product with id : ${req.params.id} not available`)
    }

}

const createProduct = async (req, res) => {
    const thumbnaillocalPath = req.file?.path


    if (!thumbnaillocalPath) {
        return res.status(200).send("Thumbnail is required!")
    }

    try {
        const thumbnail = await uploadOnCloudinary(thumbnaillocalPath)
        await Products.create({
            sellerName: req.body.sellerName,
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            thumbnail,
            sallerName: req.sellerName
        })

        res.status(200).send("Product Created")
    } catch (error) {
        res.send(`Error : ${error.message}`)
    }
}

const updateProduct = async (req, res) => {
    try {
        const id = req.params.id
        const dataFromBody = req.body
        const updatedProduct = await Products.findOneAndUpdate({ id: id }, dataFromBody, { new: true });
        if (!updatedProduct) {
            return res.status(404).send("Product Not Found")
        }
        res.status(200).json(updatedProduct)
    } catch (error) {
        return res.status(404).send("Can't Update", error.message)
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
            return res.status(404).json({ "message": "Product Not Found" })
        }
        res.status(200).send("Product Replaced")
    } catch (error) {
        return res.status(500).send(`Server Error ${error.message}`)
    }
}

const deleteProduct = async (req, res) => {
    await Products.findByIdAndDelete(req.params.id)
    res.status(200).send("Product Deleted")
}

const registerUser = async (req, res) => {
    const { email, password, userName } = req.body;
    const existedUser = await User.findOne({
        $or: [{ userName }, { email }]    // $or is mongodb query which check if even one condition is true
    })

    if (existedUser) {
        return res.status(200).send("User and Email Already Exists!!")
    }

    const avatarLocalPath = req.file?.path;

    if (!avatarLocalPath) {
        return res.status(200).send("Avatar is Required")
    }

    try {
        const avatar = await uploadOnCloudinary(avatarLocalPath)
        await User.create({
            avatar,
            userName,
            email,
            password,
        })
        res.status(200).send("User Regitred")
    } catch (error) {
        console.log("Error while Registreing User", error)
    }
}

const loginuser = async (req, res) => {

    const user = await User.findOne({ "email": req.body.email })
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
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000,
            sameSite: 'None',
        }).json(
            {
                accessToken,
                userInfo,
                message: "User loged in",
                writePermission: user?.writePermission

            })
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
        res.status(500).json({ message: "Error logging out" });
    }
};

const getUserInfo = (req, res) => {
    // const token = req.cookies.accessToken;
    // if(!token) return;
    const userInfo = req.user;
    if (!userInfo) return null;
    res.status(200).json({
        userInfo
    })
}

const addToCart = async (req, res) => {
    try {
        const email = req.body.email;
        const logedUser = await User.findOne({ email })
        const productToAdd = req.body.id;
        await User.findByIdAndUpdate(logedUser, {
            $push: { userCart: productToAdd }
        })
        return res.send("product added")
    } catch (error) {
        console.log(error);
    }
}

const sendMailForProductAddPermission = async (req,res) =>{

    const {userName, email} = req.user;
    console.log(userName,email)
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
        to: "mrabhi748@gmail.com",
        subject: "Permission Request",
        text:`Name : ${userName}\nEmail:${email}\n${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send("Mail Sent Successfully");
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
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
    loginuser,
    addToCart,
    getUserInfo,
    logOut,
    sendMailForProductAddPermission
}