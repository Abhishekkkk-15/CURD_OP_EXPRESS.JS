import { Router } from "express";
import { createProduct, deleteProduct, getProduct,loginuser, getProducts, replaceProduct,registerUser, updateProduct } from "./controler.js";

const router = Router();


//Routes For  
router.route("/").get(getProducts)
router.route("/:id").get(getProduct)
router.route("/").post(createProduct)
router.route("/:id").patch(updateProduct)
router.route("/:id").put(replaceProduct)
router.route("/:id").delete(deleteProduct)
router.route("/reg").post(registerUser)
router.route("/login").post(loginuser)

export default router