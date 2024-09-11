const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: 'dha5kfgmo',
    api_key: '832434873825773',
    api_secret: process.env.CLOUDINARY_SECRET,
});

module.exports = cloudinary;