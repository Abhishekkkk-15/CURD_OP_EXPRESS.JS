import { Router } from "express";
import { createProduct, deleteProduct, getProduct,loginuser, getProducts, replaceProduct,registerUser, updateProduct,addToCart ,getUserInfo, logOut,sendMailForProductAddPermission, showCart,removeFromCart, grantPermission, getUser, getAllUser, deleteUser} from "./controler.js";
import { authenticateToken, checkAdmin, addProductPermission } from "./middleware.js";
import { upload } from "./middleware.js";

const router = Router();


//Routes For  
router.route("/").get(getProducts)
router.route("/:id").get(getProduct)
router.route("/").post(authenticateToken,addProductPermission,upload.single("thumbnail"),createProduct)
router.route("/:id").patch(checkAdmin,updateProduct)
router.route("/:id").put(checkAdmin,replaceProduct)
router.route("/:id").delete(checkAdmin,deleteProduct)
router.route("/deleteUser").post(checkAdmin,deleteUser)
router.route("/reg").post(upload.single("avatar"),registerUser)
router.route("/login").post(loginuser)
router.route("/logOut").post(authenticateToken,logOut)
router.route("/addToCart").post(authenticateToken,addToCart)
router.route("/showCart").post(authenticateToken,showCart)
router.route("/removeFromCart").post(authenticateToken,removeFromCart)
router.route("/userInfo").post(authenticateToken,getUserInfo)
router.route("/admin-route").post(authenticateToken,addProductPermission,(req,res)=>{
    res.send("This is an admin-only route.")
})
router.route('/request-admin').post(authenticateToken,sendMailForProductAddPermission)
router.route('/getAllUsers').post(authenticateToken,checkAdmin,getAllUser)
router.route('/getUser').post(authenticateToken,checkAdmin,getUser)
router.route('/grantPermission').post(authenticateToken,checkAdmin,grantPermission)
    
export default router