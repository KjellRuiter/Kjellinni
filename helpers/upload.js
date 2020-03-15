const multer = require('multer');
const path = require('path');

module.exports = function() {
    // Configure storage
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join(__dirname, '../static/uploads'))
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
        }
    });

    return multer({ storage });
}