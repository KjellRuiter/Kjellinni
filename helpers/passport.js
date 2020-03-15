const LocalStrategy = require('passport-local').Strategy;
const db = require('../helpers/db');
const userService = require('../users/user.service');

const { User } = db;

module.exports = function(passport) {
  // Setup passport strategy
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      userService.authenticate({ email, password }).then(user => {
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      });
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
