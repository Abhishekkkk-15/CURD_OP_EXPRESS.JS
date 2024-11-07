import mongoose from 'mongoose';

const productsSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    price: {
        type: Number,   
        required: true,
        min: 0   
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    thumbnail:{
        type:String
    }
}, { timestamps: true });

const userSchema = new mongoose.Schema({
    avatar:{
        type:String
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3 
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/.+\@.+\..+/, 'Please enter a valid email address'] // Regex for email validation
    },
    password: {
        type: String,
        required: true,
        minlength: 8 
    },
    writePermission: {
        type: Boolean, 
        default: false 
    }
}, { timestamps: true });

export const Products = mongoose.model('Products',productsSchema);
export const User = mongoose.model('User',userSchema)
