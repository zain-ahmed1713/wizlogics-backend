import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadFilesToCloudinary = async (pathToFile) => {
    try {
        if (!pathToFile) return null;

        const uploadResult = await cloudinary.uploader.upload(pathToFile, { resource_type: "auto" })
        fs.unlink(pathToFile);

        return uploadResult;
    } catch (error) {
        fs.unlink(pathToFile);
        console.log("Cloudinary Error:", error)
        return null;
    }
}

export { uploadFilesToCloudinary }