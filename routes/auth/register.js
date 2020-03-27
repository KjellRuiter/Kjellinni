const passport = require('passport')
const userService = require('../../database/utils')

module.exports = class {
  static getMethod(req, res) {
    res.render('pages/register')
  }
  static postMethod(req, res, next) {
    userService
      .create(req.body, req)
      .then(() => {
        console.log(req.body)
        passport.authenticate('local', {
          failureRedirect: '/',
          successRedirect: '/profile',
          failureFlash: 'Fout email of wachtwoord.',
        })(req, res, next)
      })
      .catch(err => {
        console.log(err)
        res.redirect('/register')
      })
  }
}
