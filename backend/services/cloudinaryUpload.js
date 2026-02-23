const cloudinary = require("../config/cloudinary");

// Upload an image buffer to Cloudinary and return the secure URL
async function uploadImage(imageBuffer) {
  const base64Image = `data:image/webp;base64,${Buffer.from(imageBuffer).toString("base64")}`;

  const uploadRes = await cloudinary.uploader.upload(base64Image, {
    folder: "ad_generator",
  });

  console.log("Cloudinary upload URL:", uploadRes.secure_url);
  return uploadRes.secure_url;
}

module.exports = uploadImage;
