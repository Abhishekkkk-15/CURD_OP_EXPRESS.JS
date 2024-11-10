import { Router } from "express";
import { createProduct, deleteProduct, getProduct,loginuser, getProducts, replaceProduct,registerUser, updateProduct,addToCart ,getUserInfo, logOut,sendMailForProductAddPermission} from "./controler.js";
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
router.route("/reg").post(upload.single("avatar"),registerUser)
router.route("/login").post(loginuser)
router.route("/logOut").post(logOut)
router.route("/addToCart").post(authenticateToken,addToCart)
router.route("/userInfo").post(authenticateToken,getUserInfo)
router.route("/admin-route").post(authenticateToken,addProductPermission,(req,res)=>{
    res.send("This is an admin-only route.")
})
router.route('/request-admin').post(authenticateToken,sendMailForProductAddPermission)
    
export default router