const userService = require('../../database/utils')

module.exports = class {
  static putMethod(req, res) {
    userService
      .update(req.params.id, req.body, req.file)
      .then(() => res.redirect('/profile'))
  }
  static deleteMethod(req, res) {
    userService.delete(req.params.id).then()
    res.redirect('/')
  }
}
