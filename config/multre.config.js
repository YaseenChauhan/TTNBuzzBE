 const multer = require('multer');
 
    const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        if (file)
        cb(null, new Date().toISOString() + file.originalname.toLowerCase())
        else
        cb(new Error("file not attached"), false);

    }

})
const fileFilter = function (req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    }
    else {
        cb(new Error("Not supported"), false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter: fileFilter
});

module.exports = {
    upload
}