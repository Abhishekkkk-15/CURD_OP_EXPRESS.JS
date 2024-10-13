import mongoose from 'mongoose';

const productsSchema = new mongoose.Schema({
    id:Number,
    title : {type:String},
    description : {type:String},
    price : {type:String},
    category:{type:String}
})

const userSchema = new mongoose.Schema({
    userName: {type:String},
    email: {type:String},
    password: {type:String}
})

export const Products = mongoose.model('Products',productsSchema);
export const User = mongoose.model('User',userSchema)
