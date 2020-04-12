const passport = require('passport')

module.exports = class {
  static postMethod(req, res, next) {
    passport.authenticate('local', {
      failureRedirect: '/',
      successRedirect: '/profile',
      failureFlash: 'Fout email of wachtwoord.',
    })(req, res, next)
  }
  static getMethod(req, res) {
    res.render('pages/login')
  }
}