const { retrieveUserProfile, signup } = require('../models/user');
const FacebookStrategy = require('passport-facebook').Strategy;

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/facebook/callback', // TODO CHANGE ME
  }, (accessToken, refreshToken, profile, done) => {
    retrieveUserProfile(profile.username, (responseProfile) => {
      if (responseProfile.length > 1) {
        return done(null, responseProfile[0]);
      } else if (responseProfile.length < 1) {
        const newUser = {
          username: profile.username,
          id: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
        };
        signup(newUser, () => {
          return done(null, newUser);
        });
      }
      return null;
    });
  }));
};
