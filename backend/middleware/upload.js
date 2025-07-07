const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/post')
    }, 
    filename: function(req, file, cb){
        const suffix = Date.now() + '_' + Math.round(Math.random() * 1E9);
        cb(null, suffix + path.extname(file.originalname)); 
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if(extname && mimetype){
        return cb(null, true);
    } else {
        cb(new Error('Only image files accepted'));
    }
};

const profileStorage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/profile')
    }, 
    filename: function(req, file, cb){
        const suffix = Date.now() + '_' + Math.round(Math.random() * 1E9);
        cb(null, suffix + path.extname(file.originalname)); 
    }
});

const profileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if(extname && mimetype){
        return cb(null, true);
    } else {
        cb(new Error('Only image files accepted'));
    }
};


const uploadPost = multer({ storage: storage, fileFilter: fileFilter });
const uploadProfile = multer({ storage: profileStorage, fileFilter: profileFilter });

module.exports = { uploadPost, uploadProfile };