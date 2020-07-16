const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../routes/users/models/User');

passport.serializeUser((user, done) => {
  // console.log("serializeUser",user)
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  await User.findById(id, (err, user) => {
    // console.log("deserializeUser",user)
    done(err, user);
  });
});

const authenticatePassword = async (inputPassword, user, done, req) => {
  const exists = await bcrypt.compare(inputPassword, user.password);
// console.log(exists)
  if (!exists) {

    console.log('Invalid log');
    return done(null, false, req.flash('errors', 'check email or password'));
  }

  return done(null, user);
};

const verifyCallback = async (req, email, password, done) => {
  await User.findOne({ email }, (err, user) => {
    try {
      if (err) return done(err, null);
      if (!user) {
        return done(null, false, req.flash('errors','No user has been found'));
      }
      authenticatePassword(password, user, done, req);
    } catch (error) {
      done(err, null);
    }
  });
};

passport.use(
  'local-login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    verifyCallback,
  )
  )

