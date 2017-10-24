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
    callbackURL: `${process.env.WEBSITE_URL}/auth/facebook/callback`,
  }, (accessToken, refreshToken, profile, done) => {
    retrieveUserProfile(profile.id, (responseProfile) => {
      if (responseProfile.length >= 1) {
        return done(null, responseProfile[0]);
      } else if (responseProfile.length < 1) {
        const newUser = {
          id: profile.id,
          displayName: profile.displayName,
        };
        signup(newUser, () => {
          return done(null, newUser);
        });
      }
      return null;
    });
  }));
};
