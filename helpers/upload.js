const multer = require('multer')
const path = require('path')

module.exports = function() {
  // Configure storage
  const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, path.join(__dirname, '../static/uploads'))
    },
    filename(req, file, cb) {
      cb(
        null,
        `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
      )
    },
  })

  return multer({
    storage,
  })
}
