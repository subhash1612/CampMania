//config file for cloudinary


const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
}); // associating account with cloudinary instance

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'YelpCamp', // while folder in cloudinary to store images
        allowedFormats: ['jpeg', 'png', 'jpg']
    }
}); //setting up an instance of cloudinary storage in this file


module.exports = {
    cloudinary,
    storage
}