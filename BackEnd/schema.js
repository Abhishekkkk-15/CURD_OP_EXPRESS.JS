import mongoose from 'mongoose';

const productsSchema = new mongoose.Schema({
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
        set: (value) => {
            // Remove commas from the input and convert it to a number
            const cleanedValue = value.replace(/,/g, '');
            return parseFloat(cleanedValue); // Ensure it's a valid number
        }
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    thumbnail: {
        type: String
    },
    sellerName: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

const userSchema = new mongoose.Schema({
    avatar: {
        type: String
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
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    userCart: [String]
}, { timestamps: true });

export const Products = mongoose.model('Products', productsSchema);
export const User = mongoose.model('User', userSchema)
