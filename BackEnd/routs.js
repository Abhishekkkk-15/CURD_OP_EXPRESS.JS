import { Router } from "express";
import { createProduct, deleteProduct, getProduct,loginuser, getProducts, replaceProduct,registerUser, updateProduct } from "./controler.js";
import { verifyAccessToken } from "./middleware.js";
import { upload } from "./middleware.js";

const router = Router();


//Routes For  
router.route("/").get(getProducts)
router.route("/:id").get(getProduct)
router.route("/").post(upload.single("thumbnail"),createProduct)
router.route("/:id").patch(updateProduct)
router.route("/:id").put(replaceProduct)
router.route("/:id").delete(deleteProduct)
router.route("/reg").post(upload.single("avatar"),registerUser)
router.route("/login").post(loginuser)

export default router