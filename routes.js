const express = require('express');
const logger = require('./config/log');
const passport = require('passport');
const { getUserProfile } = require('./src/controllers/user');
const { getHome, postReview, searchForHome } = require('./src/controllers/home');

const router = express.Router();

router.get('/ping', (req, res) => {
  logger.debug('Server is responding.');
  res.send('pong');
});

router.get('/', (req, res) => {
  // res.send('home');
});

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    session: true,
    failureRedirect: '/login',
    successRedirect: '/',
  }),
);


// individual page for a house.
// router.get('/home', getHome);
// // user searches for a house
router.post('/home/search', searchForHome);
// // route to post a new review.
// router.post('/home/review', postReview);

// router for main home page, has feed of most recent reviews.
// router.get('/feed', getFeed);

// // route to get all homes in a suburb to show on a map.
// router.get('/area/:suburb', getHomesInSuburb);


module.exports = router;
