const passport = require('passport')
const userService = require('../../database/utils')

module.export = class {
  static getMethod(req, res) {
    res.render('pages/register')
  }
  static postMethod(req, res) {
    userService
      .create(req.body, req)
      .then(() => {
        passport.authenticate('local', {
          failureRedirect: '/',
          successRedirect: '/profile',
          failureFlash: 'Fout email of wachtwoord.',
        })(req, res, next)
      })
      .catch(err => {
        res.redirect('/register')
      })
  }
}
