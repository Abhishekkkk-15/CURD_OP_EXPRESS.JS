import { error } from "console";
import multer from "multer";
import path from "path"
import jwt from 'jsonwebtoken'
import { config } from "dotenv";

config();

const authenticateToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.user = decoded; // we are basically creating new variable know as req.user so we can access this decoded values in next route , Attach the decoded payload to req.user
    next();
  });
};

const checkAdmin = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(403).json({ error: "Access denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.isAdmin) {
      next();
    } else {
      res.status(403).json({ error: "Admin access required" });
    }
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

const addProductPermission = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(403).json({ error: "Login first" });

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (decode.writePermission) {
      next();
    } else {
      res.status(403).json({ error: "You can't add products" })
    }
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
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
  const allowedTypes = [
    'image/jpeg', 
    'image/pjpeg', 
    'image/png', 
    'image/gif', 
    'image/webp', 
    'image/bmp', 
    'image/tiff', 
    'image/jfif'
  ];
  
  // Check mimetype
  const isMimeTypeAllowed = allowedTypes.includes(file.mimetype);

  // Check file extension as a backup
  const ext = path.extname(file.originalname).toLowerCase();
  const isExtensionAllowed = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.tiff', '.jfif'].includes(ext);

  if (isMimeTypeAllowed || isExtensionAllowed) {
    cb(null, true); // Allow the file
  } else {
    cb(new Error("Only images are allowed"), false); // Reject the file
  }
};


// Pass storage and fileFilter to multer
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
});


export {
  authenticateToken,
  upload,
  checkAdmin,
  addProductPermission
};
