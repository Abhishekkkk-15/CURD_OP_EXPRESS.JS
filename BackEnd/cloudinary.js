import { v2 as cloudinary } from "cloudinary";
import fs from 'fs';

cloudinary.config({
  cloud_name: "dha7ofrer",
  api_key: "384591845655678",
  api_secret: "XI1gA2uTSldTNa9e68if_M9Sz4s",
  secure: true,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      console.error("No file path provided");
      return null;
    }

    // Upload the file to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'image',
    });
    
    // Log the uploaded image's secure URL
    console.log("File uploaded successfully:", uploadResponse.secure_url);
    // Return the secure URL to save in the database
    return uploadResponse.secure_url;
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);

    // Remove the locally saved file if upload fails
    if (localFilePath && fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath); // Synchronously delete the file
      console.log("Local file removed due to upload failure");
    }

    return null;
  }
};

export { uploadOnCloudinary };
