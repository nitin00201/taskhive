import axios from "axios";

const CLOUD_NAME = "dycy19dpp"; 
const UPLOAD_PRESET = "ml_default"; 
const CLOUDINARY_URL='cloudinary://853773455957215:lyWRfX50ccHYYRBKUFce_KSoTUk@dycy19dpp'
export const uploadImageToCloudinary = async (imageUri) => {
    try {
      // Convert local file URI to Blob
      const response = await fetch(imageUri);
      const blob = await response.blob();
  
      const formData = new FormData();
      formData.append("file", blob, "upload.jpg");
      formData.append("upload_preset", UPLOAD_PRESET);
  
      const cloudinaryResponse = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      });
  
      const data = await cloudinaryResponse.json();
      return data.secure_url;
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      return null;
    }
  };
  
