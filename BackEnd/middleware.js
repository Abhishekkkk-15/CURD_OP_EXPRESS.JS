import { error } from "console";
import multer from "multer";
import path from "path"

const verifyAccessToken = async(req,res,next) => {
   try {
     const token = req.cookies?.refreshToken;
     console.log(token)
     next()
   } catch (error) {
    console.log(error)
   }
}

//Multer for Image uploading
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save images to "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Use unique filename with original extension
  },
});

// File filter to restrict to images only
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true); // Allow file
  } else {
    cb(new Error('Only image files are allowed!'), false); // Reject file
  }
};

// Pass storage and fileFilter to multer
const upload = multer({ storage, fileFilter });
export {
  verifyAccessToken,
  upload,
};
